/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ChangeReason","sap/ui/model/Filter","sap/ui/model/odata/Filter","sap/ui/model/FilterType","sap/ui/model/FilterProcessor","sap/ui/model/ListBinding","sap/ui/model/Sorter","./ODataUtils","./CountMode","sap/base/util/deepEqual","sap/base/util/merge","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery"],function(t,e,i,s,a,n,r,h,o,l,f,u,d,p){"use strict";var g=n.extend("sap.ui.model.odata.ODataListBinding",{constructor:function(t,e,i,s,a,r){n.apply(this,arguments);this.sFilterParams=null;this.sSortParams=null;this.sRangeParams=null;this.sCustomParams=this.oModel.createCustomParams(this.mParameters);this.iStartIndex=0;this.bPendingChange=false;this.aKeys=[];this.bInitial=true;this.sCountMode=r&&r.countMode||this.oModel.sDefaultCountMode;this.bRefresh=false;this.bNeedsUpdate=false;this.bDataAvailable=false;this.bIgnoreSuspend=false;this.oCombinedFilter=null;this.oModel.checkFilterOperation(this.aApplicationFilters);if(!this.oModel.getServiceMetadata()){var h=this,o=function(t){h.bInitial=false;h._initSortersFilters();h.oModel.detachMetadataLoaded(o)};this.oModel.attachMetadataLoaded(this,o)}else{this.bInitial=false;this._initSortersFilters()}var l=this.oModel._getObject(this.sPath,this.oContext);this.aExpandRefs=l;if(Array.isArray(l)&&!s&&!a){this.aKeys=l;this.iLength=l.length;this.bLengthFinal=true;this.bDataAvailable=true}else if(l===null&&this.oModel.resolve(this.sPath,this.oContext)){this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this.bDataAvailable=true}else{if(this.oModel.getServiceMetadata()){this.resetData()}}}});g.prototype.getContexts=function(t,e,i){if(this.bInitial){return[]}this.iLastLength=e;this.iLastStartIndex=t;this.iLastThreshold=i;if(!t){t=0}if(!e){e=this.oModel.iSizeLimit;if(this.bLengthFinal&&this.iLength<e){e=this.iLength}}if(!i){i=0}var s=true,a=this._getContexts(t,e),n={},r;r=this.calculateSection(t,e,i,a);s=a.length!=e&&!(this.bLengthFinal&&a.length>=this.iLength-t);if(this.oModel.getServiceMetadata()){if(!this.bPendingRequest&&r.length>0&&(s||e<r.length)){this.loadData(r.startIndex,r.length);a.dataRequested=true}}if(this.bRefresh){if(this.bLengthFinal&&this.iLength==0){this.loadData(r.startIndex,r.length,true);a.dataRequested=true}this.bRefresh=false}else{for(var h=0;h<a.length;h++){n[a[h].getPath()]=a[h].getObject()}if(this.bUseExtendedChangeDetection){if(this.aLastContexts&&t<this.iLastEndIndex){var o=this;var u=p.sap.arrayDiff(this.aLastContexts,a,function(t,e){return l(t&&o.oLastContextData&&o.oLastContextData[t.getPath()],e&&n&&n[e.getPath()])},true);a.diff=u}}this.iLastEndIndex=t+e;this.aLastContexts=a.slice(0);this.oLastContextData=f({},n)}return a};g.prototype.getCurrentContexts=function(){return this.aLastContexts||[]};g.prototype._getContexts=function(t,e){var i=[],s,a;if(!t){t=0}if(!e){e=this.oModel.iSizeLimit;if(this.bLengthFinal&&this.iLength<e){e=this.iLength}}for(var n=t;n<t+e;n++){a=this.aKeys[n];if(!a){break}s=this.oModel.getContext("/"+a);i.push(s)}return i};g.prototype.calculateSection=function(t,e,i,s){var a,n,r,h,o,l={},f;n=t;a=0;for(var u=t;u>=Math.max(t-i,0);u--){f=this.aKeys[u];if(!f){h=u+1;break}}for(var d=t+e;d<t+e+i;d++){f=this.aKeys[d];if(!f){r=d;break}}o=t-h;if(h&&t>i&&o<i){if(s.length!=e){n=t-i}else{n=h-i}a=i}n=Math.max(n,0);if(n==t){n+=s.length}if(s.length!=e){a+=e-s.length}o=r-t-e;if(o==0){a+=i}if(r&&o<i&&o>0){if(n>t){n=r;a+=i}}if(this.bLengthFinal&&this.iLength<a+n){a=this.iLength-n}l.startIndex=n;l.length=a;return l};g.prototype.setContext=function(e){if(this.oContext!=e){this.oContext=e;if(this.isRelative()){this._initSortersFilters();if(!this.bInitial){var i=this.oModel._getObject(this.sPath,this.oContext);this.aExpandRefs=i;if(Array.isArray(i)&&!this.aSorters.length>0&&!this.aFilters.length>0){this.aKeys=i;this.iLength=i.length;this.bLengthFinal=true;this._fireChange({reason:t.Context})}else if(!this.oModel.resolve(this.sPath,this.oContext)||i===null){this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this._fireChange({reason:t.Context})}else{this.refresh()}}}}};g.prototype.getDownloadUrl=function(t){var e=[],i;if(t){e.push("$format="+encodeURIComponent(t))}if(this.sSortParams){e.push(this.sSortParams)}if(this.sFilterParams){e.push(this.sFilterParams)}if(this.sCustomParams){e.push(this.sCustomParams)}i=this.oModel.resolve(this.sPath,this.oContext);if(i){return this.oModel._createRequestUrl(i,null,e)}};g.prototype.loadData=function(e,i,s){var a=this,n=false;if(e||i){this.sRangeParams="$skip="+e+"&$top="+i;this.iStartIndex=e}else{e=this.iStartIndex}var r=[];if(this.sRangeParams){r.push(this.sRangeParams)}if(this.sSortParams){r.push(this.sSortParams)}if(this.sFilterParams){r.push(this.sFilterParams)}if(this.sCustomParams){r.push(this.sCustomParams)}if(!this.bLengthFinal&&(this.sCountMode==o.Inline||this.sCountMode==o.Both)){r.push("$inlinecount=allpages");n=true}function h(t){p.each(t.results,function(t,i){a.aKeys[e+t]=a.oModel._getKey(i)});if(n&&t.__count){a.iLength=parseInt(t.__count);a.bLengthFinal=true}if(a.iLength<e+t.results.length){a.iLength=e+t.results.length;a.bLengthFinal=false}if(t.results.length<i||i===undefined){a.iLength=e+t.results.length;a.bLengthFinal=true}if(e==0&&t.results.length==0){a.iLength=0;a.bLengthFinal=true}a.oRequestHandle=null;a.bPendingRequest=false;a.bNeedsUpdate=true;a.bIgnoreSuspend=true}function l(t){a.fireDataReceived({data:t})}function f(e,i){a.oRequestHandle=null;a.bPendingRequest=false;if(!i){a.aKeys=[];a.iLength=0;a.bLengthFinal=true;a.bDataAvailable=true;a._fireChange({reason:t.Change})}a.fireDataReceived()}function u(t){a.oRequestHandle=t}var d=this.sPath,g=this.oContext;if(this.isRelative()){d=this.oModel.resolve(d,g)}if(d){if(s){var c=this.oModel._createRequestUrl(d,null,r);this.fireDataRequested();this.oModel.fireRequestSent({url:c,method:"GET",async:true});setTimeout(function(){a.bNeedsUpdate=true;a.checkUpdate();a.oModel.fireRequestCompleted({url:c,method:"GET",async:true,success:true});a.fireDataReceived({data:{}})},0)}else{this.bPendingRequest=true;this.fireDataRequested();this.oModel._loadData(d,r,h,f,false,u,l)}}};g.prototype.getLength=function(){if(this.bLengthFinal||this.iLength==0){return this.iLength}else{var t=this.iLastThreshold||this.iLastLength||10;return this.iLength+t}};g.prototype.isLengthFinal=function(){return this.bLengthFinal};g.prototype._getLength=function(){var t=this;var e=[];if(this.sFilterParams){e.push(this.sFilterParams)}if(this.mParameters&&this.mParameters.custom){var i={custom:{}};p.each(this.mParameters.custom,function(t,e){i.custom[t]=e});e.push(this.oModel.createCustomParams(i))}function s(e){t.iLength=parseInt(e);t.bLengthFinal=true}function a(t){var e="Request for $count failed: "+t.message;if(t.response){e+=", "+t.response.statusCode+", "+t.response.statusText+", "+t.response.body}u.warning(e)}var n=this.oModel.resolve(this.sPath,this.oContext);if(n){var r=this.oModel._createRequestUrl(n+"/$count",null,e);var h=this.oModel._createRequest(r,"GET",false);h.headers["Accept"]="text/plain, */*;q=0.5";this.oModel._request(h,s,a,undefined,undefined,this.oModel.getServiceMetadata())}};g.prototype.refresh=function(e,i,s){var a=false;if(!e){if(s){var n=this.oModel.resolve(this.sPath,this.oContext);var r=this.oModel.oMetadata._getEntityTypeByPath(n);if(r&&r.entityType in s){a=true}}if(i&&!a){p.each(this.aKeys,function(t,e){if(e in i){a=true;return false}})}if(!i&&!s){a=true}}if(e||a){this.abortPendingRequest();this.resetData();this._fireRefresh({reason:t.Refresh})}};g.prototype._fireRefresh=function(t){if(this.oModel.resolve(this.sPath,this.oContext)){this.bRefresh=true;this.fireEvent("refresh",t)}};g.prototype.initialize=function(){if(this.oModel.oMetadata.isLoaded()){if(this.bDataAvailable){this._fireChange({reason:t.Change})}else{this._fireRefresh({reason:t.Refresh})}}};g.prototype.checkUpdate=function(e,i){var s=this.sChangeReason?this.sChangeReason:t.Change,a=false,n,r,h=this,o,f;if(this.bSuspended&&!this.bIgnoreSuspend){return}if(!e&&!this.bNeedsUpdate){o=this.oModel._getObject(this.sPath,this.oContext);f=Array.isArray(o)&&!l(o,this.aExpandRefs);this.aExpandRefs=o;if(f){if(this.aSorters.length>0||this.aFilters.length>0){this.refresh();return}else{this.aKeys=o;this.iLength=o.length;this.bLengthFinal=true;a=true}}else if(i){p.each(this.aKeys,function(t,e){if(e in i){a=true;return false}})}else{a=true}if(a&&this.aLastContexts){a=false;var u=this._getContexts(this.iLastStartIndex,this.iLastLength,this.iLastThreshold);if(this.aLastContexts.length!=u.length){a=true}else{p.each(this.aLastContexts,function(t,e){n=h.oLastContextData[e.getPath()];r=u[t].getObject();if(!l(n,r,true)){a=true;return false}})}}}if(e||a||this.bNeedsUpdate){this.bNeedsUpdate=false;this._fireChange({reason:s})}this.sChangeReason=undefined;this.bIgnoreSuspend=false};g.prototype.resetData=function(){this.aKeys=[];this.iLength=0;this.bLengthFinal=false;this.sChangeReason=undefined;this.bDataAvailable=false;if(this.oModel.isCountSupported()&&(this.sCountMode==o.Request||this.sCountMode==o.Both)){this._getLength()}};g.prototype.abortPendingRequest=function(){if(this.oRequestHandle){this.oRequestHandle.abort();this.oRequestHandle=null;this.bPendingRequest=false}};g.prototype.sort=function(e,i){var s=false;if(!e){e=[]}if(e instanceof r){e=[e]}this.aSorters=e;this.createSortParams(e);if(!this.bInitial){this.aKeys=[];this.abortPendingRequest();this.sChangeReason=t.Sort;this._fireRefresh({reason:this.sChangeReason});this._fireSort({sorter:e});s=true}if(i){return s}else{return this}};g.prototype.createSortParams=function(t){this.sSortParams=h.createSortParams(t)};g.prototype.filter=function(i,n,r){var h=false;if(!i){i=[]}if(i instanceof e){i=[i]}this.oModel.checkFilterOperation(i);if(n==s.Application){this.aApplicationFilters=i}else{this.aFilters=i}if(!i||!Array.isArray(i)||i.length==0){this.aFilters=[]}if(!this.aApplicationFilters||!Array.isArray(this.aApplicationFilters)||this.aApplicationFilters.length===0){this.aApplicationFilters=[]}this.convertFilters();this.oCombinedFilter=a.combineFilters(this.aFilters,this.aApplicationFilters);this.createFilterParams(this.oCombinedFilter);if(!this.bInitial){this.resetData();this.abortPendingRequest();this.sChangeReason=t.Filter;this._fireRefresh({reason:this.sChangeReason});if(n==s.Application){this._fireFilter({filters:this.aApplicationFilters})}else{this._fireFilter({filters:this.aFilters})}h=true}if(r){return h}else{return this}};g.prototype.convertFilters=function(){this.aFilters=this.aFilters.map(function(t){return t instanceof i?t.convert():t});this.aApplicationFilters=this.aApplicationFilters.map(function(t){return t instanceof i?t.convert():t})};g.prototype.createFilterParams=function(t){this.sFilterParams=h.createFilterParams(t,this.oModel.oMetadata,this.oEntityType)};g.prototype._initSortersFilters=function(){var t=this.oModel.resolve(this.sPath,this.oContext);if(!t){return}this.oEntityType=this._getEntityType();this.convertFilters();this.oCombinedFilter=a.combineFilters(this.aFilters,this.aApplicationFilters);this.createSortParams(this.aSorters);this.createFilterParams(this.oCombinedFilter)};g.prototype._getEntityType=function(){var t=this.oModel.resolve(this.sPath,this.oContext);if(t){var e=this.oModel.oMetadata._getEntityTypeByPath(t);d(e,"EntityType for path "+t+" could not be found!");return e}return undefined};g.prototype.resume=function(){this.bIgnoreSuspend=false;n.prototype.resume.apply(this,arguments)};return g});
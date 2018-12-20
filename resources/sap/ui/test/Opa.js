/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/thirdparty/URI","sap/ui/thirdparty/jquery","sap/ui/test/_LogCollector","sap/ui/test/_OpaLogger","sap/ui/test/_ParameterValidator","sap/ui/test/_UsageReport"],function(e,t,r,n,i,a,o){"use strict";var s=i.getLogger("sap.ui.test.Opa"),u=n.getInstance(),c=[],f={},l=-1,g,p,d,v,m=new a({errorPrefix:"sap.ui.test.Opa#waitFor"});u.start();function h(e,t){if(window["sap-ui-debug"]){t.timeout=t.debugTimeout}var r=new Date;n();function n(){s.timestamp("opa.check");u.getAndClearLog();var i=e();v=t._stack;if(i.error){p.reject(t);return}if(i.result){_();return}var a=(new Date-r)/1e3;if(t.timeout===0||t.timeout>a){l=setTimeout(n,t.pollingInterval);return}k("Opa timeout after "+t.timeout+" seconds",t);if(t.error){try{t.error(t,i.arguments)}finally{p.reject(t)}}else{p.reject(t)}}}function _(){if(!c.length){if(p){p.resolve()}return true}var e=c.shift();l=setTimeout(function(){h(e.callback,e.options)},(O.config.asyncPolling?e.options.pollingInterval:0)+O.config.executionDelay)}function w(e,t){var r=e.get();if(r){var n=c.splice(c.length-r,r);n.forEach(function(e){e.options._nestedIn=t});c=n.concat(c)}}function y(e){var t=e.toString();if(e.stack){t+="\n"+e.stack}var r="Exception thrown by the testcode:'"+t+"'";return r}function k(e,t,r){var n=u.getAndClearLog();if(n){e+="\nThis is what Opa logged:\n"+n}if(!r&&t._stack){e+=b(t)}if(t.errorMessage){t.errorMessage+="\n"+e}else{t.errorMessage=e}s.error(t.errorMessage,"Opa")}function C(t){t=(t||0)+2;if(e.browser.mozilla){t=t-1}var r=new Error,n=r.stack;if(!n){try{throw r()}catch(e){n=e.stack}}if(!n){return""}n=n.split("\n");n.splice(0,t);return n.join("\n")}function b(e){var t="\nCallstack:\n";if(e._stack){t+=e._stack;delete e._stack}else{t+="Unknown"}if(e._nestedIn){t+=b(e._nestedIn);delete e._nestedIn}return t}var O=function(e){this.and=this;r.extend(this,e)};O.config={};O.extendConfig=function(e){var t=["actions","assertions","arrangements"];t.filter(function(t){return!!e[t]}).forEach(function(t){var r=e[t];var n=Object.getPrototypeOf(e[t]);var i=O.config[t];var a=Object.getPrototypeOf(O.config[t]);for(var o in i){if(!(o in r)){r[o]=i[o]}}for(var s in a){if(!(s in r)){n[s]=a[s]}}});O.config=r.extend(true,O.config,e,x);i.setLevel(O.config.logLevel)};O._parseParam=function(e){if(e&&e.match(/^true$/i)){return true}if(e&&e.match(/^false$/i)){return false}var t=parseInt(e);return typeof t==="number"&&isNaN(t)?e:t};O._extractOpaUriParams=function(){var e="opa";var r={};var n=(new t).search(true);for(var i in n){if(i.indexOf(e)==0){r[i.substr(e.length,1).toLowerCase()+i.substr(e.length+1)]=this._parseParam(n[i])}}return r};var x=O._extractOpaUriParams();var F=0;var I=e.browser.safari&&!e.browser.phantomJS;if(e.browser.msie||e.browser.edge||I){F=50}O.resetConfig=function(){O.config=r.extend({arrangements:new O,actions:new O,assertions:new O,timeout:15,pollingInterval:400,debugTimeout:0,_stackDropCount:0,executionDelay:F,asyncPolling:false},x)};O.getContext=function(){return f};O.emptyQueue=function e(){if(d){throw new Error("Opa is emptying its queue. Calling Opa.emptyQueue() is not supported at this time.")}d=true;g=null;p=r.Deferred();_();return p.promise().fail(function(e){c=[];if(g){var t=g.qunitTimeout?"QUnit timeout after "+g.qunitTimeout+" seconds":"Queue was stopped manually";e._stack=g.qunitTimeout&&v||C(1);k(t,e)}}).always(function(){c=[];l=-1;p=null;v=null;d=false})};O.stopQueue=function e(){O._stopQueue()};O._stopQueue=function(e){c=[];if(!p){s.warning("stopQueue was called before emptyQueue, queued tests have never been executed","Opa")}else{if(l!==-1){clearTimeout(l)}g=e||{};p.reject(g)}};O.resetConfig();O._usageReport=new o(O.config);i.setLevel(O.config.logLevel);O.prototype={getContext:O.getContext,waitFor:function(e){var t=r.Deferred(),n=O._createFilteredConfig(O._aConfigValuesForWaitFor);e=r.extend({},n,e);this._validateWaitFor(e);e._stack=C(1+e._stackDropCount);delete e._stackDropCount;var i=r.extend({},this);t.promise(i);c.push({callback:function(){var r=true;if(e.check){try{r=e.check.apply(this,arguments)}catch(r){var n="Failure in Opa check function\n"+y(r);k(n,e,r.stack);t.reject(e);return{error:true,arguments:arguments}}}if(g){return{result:true,arguments:arguments}}if(!r){return{result:false,arguments:arguments}}if(e.success){var i=O._getWaitForCounter();try{e.success.apply(this,arguments)}catch(r){var n="Failure in Opa success function\n"+y(r);k(n,e,r.stack);t.reject(e);return{error:true,arguments:arguments}}finally{w(i,e)}}t.resolve();return{result:true,arguments:arguments}}.bind(this),options:e});return i},extendConfig:O.extendConfig,emptyQueue:O.emptyQueue,iWaitForPromise:function(e){return this._schedulePromiseOnFlow(e)},_schedulePromiseOnFlow:function(e,t){t=t||{};var r={};t.check=function(){if(!r.started){r.started=true;e.then(function(){r.done=true},function(e){r.errorMessage="Error while waiting for promise scheduled on flow"+(e?", details: "+e:"")})}if(r.errorMessage){throw new Error(r.errorMessage)}else{return!!r.done}};return this.waitFor(t)},_validateWaitFor:function(e){m.validate({validationInfo:O._validationInfo,inputToValidate:e})}};O._createFilteredOptions=function(e,t){var r={};e.forEach(function(e){var n=t[e];if(n===undefined){return}r[e]=n});return r};O._createFilteredConfig=function(e){return O._createFilteredOptions(e,O.config)};O._getWaitForCounter=function(){var e=c.length;return{get:function(){var t=c.length-e;return Math.max(t,0)}}};O._aConfigValuesForWaitFor=["errorMessage","timeout","debugTimeout","pollingInterval","_stackDropCount","asyncPolling"];O._validationInfo={error:"func",check:"func",success:"func",timeout:"numeric",debugTimeout:"numeric",pollingInterval:"numeric",_stackDropCount:"numeric",errorMessage:"string",asyncPolling:"bool"};return O},true);
/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/DataType","sap/ui/base/ManagedObject","sap/ui/core/CustomData","./mvc/View","./mvc/EventHandlerResolver","./ExtensionPoint","./StashedControlSupport","sap/ui/base/SyncPromise","sap/base/Log","sap/base/util/ObjectPath","sap/base/assert","sap/base/security/encodeXML","sap/base/util/LoaderExtensions"],function(e,t,n,r,i,a,o,s,u,l,f,c,p,d){"use strict";function g(e,r,i,a){var o=n.bindingParser(r,a,true);if(o&&typeof o==="object"){return o}var s=r=o||r;var u=t.getType(e);if(u){if(u instanceof t){s=u.parseValue(r,{context:a});if(!u.isValid(s)){l.error("Value '"+r+"' is not valid for type '"+u.getName()+"'.")}}}else{throw new Error("Property "+i+" has unknown type "+e)}return typeof s==="string"?n.bindingParser.escape(s):s}function m(e){return e.localName||e.baseName||e.nodeName}function v(e){if(e.isRejected()){throw e.getResult()}return e.getResult()}function h(e,t){function n(e,n,r){var i,a,o=[];for(i=e.firstChild;i;i=i.nextSibling){a=t(e,n,r,i);if(a){o.push(v(a))}}return u.resolve(o)}function r(e,n,r){var i,a=Promise.resolve(),o=[];for(i=e.firstChild;i;i=i.nextSibling){a=a.then(t.bind(null,e,n,r,i));o.push(a)}return Promise.all(o)}return e?r:n}var w={};w.loadTemplate=function(e,t){var n=e.replace(/\./g,"/")+("."+(t||"view")+".xml");return d.loadResource(n).documentElement};w.loadTemplatePromise=function(e,t){var n=e.replace(/\./g,"/")+("."+(t||"view")+".xml");return d.loadResource(n,{async:true}).then(function(e){return e.documentElement})};w.parseViewAttributes=function(e,t,n){var r=t.getMetadata().getAllProperties();for(var i=0;i<e.attributes.length;i++){var a=e.attributes[i];if(a.name==="controllerName"){t._controllerName=a.value}else if(a.name==="resourceBundleName"){t._resourceBundleName=a.value}else if(a.name==="resourceBundleUrl"){t._resourceBundleUrl=a.value}else if(a.name==="resourceBundleLocale"){t._resourceBundleLocale=a.value}else if(a.name==="resourceBundleAlias"){t._resourceBundleAlias=a.value}else if(a.name==="class"){t.addStyleClass(a.value)}else if(!n[a.name]&&r[a.name]){n[a.name]=g(r[a.name].type,a.value,a.name,t._oContainingView.oController)}}};w.enrichTemplateIds=function(e,t){w.enrichTemplateIdsPromise(e,t,false);return e};w.enrichTemplateIdsPromise=function(e,t,n){return y(e,t,true,n).then(function(){return e})};w.parseTemplate=function(e,t){return v(w.parseTemplatePromise(e,t,false))};w.parseTemplatePromise=function(e,t,n,r){return y(e,t,false,n,r)};function y(t,d,y,C,b){var _=[],x=u.resolve(),I=d._sProcessingMode||sap.ui.getCore().getConfiguration().getXMLProcessingMode();C=C&&I==="sequential";l.debug("XML processing mode is "+(C?"sequential":"default"),"","XMLTemplateProcessor");var N=sap.ui.getCore().getConfiguration().getDesignMode();if(N){d._sapui_declarativeSourceInfo={xmlNode:t,xmlRootNode:d._oContainingView===d?t:d._oContainingView._sapui_declarativeSourceInfo.xmlRootNode}}var R=d.sViewName||d._sFragmentName;if(!R){var V=d;var P=0;while(++P<1e3&&V&&V!==V._oContainingView){V=V._oContainingView}R=V.sViewName}if(d.isSubView()){E(t,true)}else{if(t.localName==="View"&&t.namespaceURI!=="sap.ui.core.mvc"){l.warning("XMLView root node must have the 'sap.ui.core.mvc' namespace, not '"+t.namespaceURI+"'"+(R?" (View name: "+R+")":""))}L(t)}var M=0;function A(){for(;M<_.length;M++){var e=_[M];if(e&&typeof e.then==="function"){return e.then(T).then(A)}}return _}function T(e){var t=[M,1].concat(e);Array.prototype.splice.apply(_,t)}return x.then(A);function S(e){return e}function U(e){return d._oContainingView.createId(e)}function E(e,t,n){if(e.nodeType===1){var r=m(e);if(e.namespaceURI==="http://www.w3.org/1999/xhtml"||e.namespaceURI==="http://www.w3.org/2000/svg"){_.push("<"+r+" ");var i=false;for(var a=0;a<e.attributes.length;a++){var o=e.attributes[a];var s=o.value;if(o.name==="id"){i=true;s=D(d,e)}_.push(o.name+'="'+p(s)+'" ')}if(t===true){_.push("data-sap-ui-preserve"+'="'+d.getId()+'" ');if(!i){_.push("id"+'="'+d.getId()+'" ')}}_.push(">");var u=e;if(window.HTMLTemplateElement&&e instanceof HTMLTemplateElement&&e.content instanceof DocumentFragment){u=e.content}L(u);_.push("</"+r+">")}else if(r==="FragmentDefinition"&&e.namespaceURI==="sap.ui.core"){L(e,false,true)}else{x=x.then(function(){return j(e).then(function(e){for(var t=0;t<e.length;t++){var n=e[t];if(d.getMetadata().hasAggregation("content")){d.addAggregation("content",n)}else if(d.getMetadata().hasAssociation("content")){d.addAssociation("content",n)}}return e})});_.push(x)}}else if(e.nodeType===3&&!n){var l=e.textContent||e.text,f=m(e.parentNode);if(l){if(f!="style"){l=p(l)}_.push(l)}}}function L(e,t,n){var r=e.childNodes;for(var i=0;i<r.length;i++){E(r[i],t,n)}}function B(t,n){var r;var i=sap.ui.getCore().getLoadedLibraries();e.each(i,function(e,i){if(t===i.namespace||t===i.name){r=i.name+"."+(i.tagNames&&i.tagNames[n]||n)}});r=r||t+"."+n;function a(e){if(!e){l.error("Control '"+r+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");e=f.get(r)}if(!e){l.error("Can't find object class '"+r+"' for XML-view","","XMLTemplateProcessor")}return e}var o=r.replace(/\./g,"/");var s=sap.ui.require(o);if(!s){if(C){return new Promise(function(e){sap.ui.require([o],function(t){t=a(t);e(t)})})}else{s=sap.ui.requireSync(o);s=a(s)}}return s}function O(e){if(e.namespaceURI==="http://www.w3.org/1999/xhtml"||e.namespaceURI==="http://www.w3.org/2000/svg"){var t=e.attributes["id"]?e.attributes["id"].textContent||e.attributes["id"].text:null;if(y){return w.enrichTemplateIdsPromise(e,d,C).then(function(){return[]})}else{var n=function(n){var r={id:t?D(d,e,t):undefined,xmlNode:e,containingView:d._oContainingView};if(d.fnScopedRunWithOwner){return d.fnScopedRunWithOwner(function(){return new n(r)})}return new n(r)};if(C){return new Promise(function(e,t){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(t){e([n(t)])})})}else{var r=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return u.resolve([n(r)])}}}else{return j(e)}}function j(e){if(m(e)==="ExtensionPoint"&&e.namespaceURI==="sap.ui.core"){if(y){return u.resolve([])}else{var t=d instanceof i?d._oContainingView:d;return u.resolve(o._factory(t,e.getAttribute("name"),function(){var t=u.resolve();var n=[];var r=e.childNodes;for(var i=0;i<r.length;i++){var a=r[i];if(a.nodeType===1){t=t.then(O.bind(null,a));n.push(t)}}return u.all(n).then(function(e){var t=[];e.forEach(function(e){t=t.concat(e)});return t})}))}}else{var n=B(e.namespaceURI,m(e));if(n&&typeof n.then==="function"){return n.then(function(t){return X(e,t)})}else{return X(e,n)}}}function X(t,o){var f=t.namespaceURI,p={},_="",x=[],I=null,R=null;if(!o){return u.resolve([])}var V=o.getMetadata();var P=V.getAllSettings();if(!y){for(var M=0;M<t.attributes.length;M++){var A=t.attributes[M],T=A.name,E=P[T],L=A.value;if(T==="id"){p[T]=D(d,t,L)}else if(T==="class"){_+=L}else if(T==="viewName"){p[T]=L}else if(T==="fragmentName"){p[T]=L;p["containingView"]=d._oContainingView}else if(T==="binding"&&!E||T==="objectBindings"){var B=n.bindingParser(L,d._oContainingView.oController);if(B){p.objectBindings=p.objectBindings||{};p.objectBindings[B.model||undefined]=B}}else if(T==="metadataContexts"){var j=null;try{j=w._calculatedModelMapping(L,d._oContainingView.oController,true)}catch(e){l.error(d+":"+e.message)}if(j){p.metadataContexts=j;if(w._preprocessMetadataContexts){w._preprocessMetadataContexts(o.getMetadata().getName(),p,d._oContainingView.oController)}}}else if(T.indexOf(":")>-1){if(A.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"){var X=m(A);x.push(new r({key:X,value:g("any",L,X,d._oContainingView.oController)}))}else if(A.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1"){R=L}else if(T.indexOf("xmlns:")!==0){if(!I){I={}}if(!I.hasOwnProperty(A.namespaceURI)){I[A.namespaceURI]={}}I[A.namespaceURI][m(A)]=A.nodeValue;l.debug(d+": XMLView parser encountered unknown attribute '"+T+"' (value: '"+L+"') with unknown namespace, stored as sap-ui-custom-settings of customData")}}else if(E&&E._iKind===0){p[T]=g(E.type,L,T,d._oContainingView.oController)}else if(E&&E._iKind===1&&E.altTypes){p[T]=g(E.altTypes[0],L,T,d._oContainingView.oController)}else if(E&&E._iKind===2){var B=n.bindingParser(L,d._oContainingView.oController);if(B){p[T]=B}else{l.error(d+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+T+"='"+L+"')")}}else if(E&&E._iKind===3){p[T]=U(L)}else if(E&&E._iKind===4){p[T]=L.split(/[\s,]+/g).filter(S).map(U)}else if(E&&E._iKind===5){var W=a.resolveEventHandler(L,d._oContainingView.oController);if(W){p[T]=W}else{l.warning(d+': event handler function "'+L+'" is not a function or does not exist in the controller.')}}else if(E&&E._iKind===-1){if(i.prototype.isPrototypeOf(o.prototype)&&T=="async"){p[T]=g(E.type,L,T,d._oContainingView.oController)}else{l.warning(d+": setting '"+T+"' for class "+V.getName()+" (value:'"+L+"') is not supported")}}else{c(T==="xmlns",d+": encountered unknown setting '"+T+"' for class "+V.getName()+" (value:'"+L+"')");if(w._supportInfo){w._supportInfo({context:t,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+T+"' for class "+V.getName()}})}}}if(I){x.push(new r({key:"sap-ui-custom-settings",value:I}))}if(x.length>0){p.customData=x}}var k=h(C,F);function F(t,n,r,i,a){var o;if(i.nodeType===1){if(i.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1"){p[m(i)]=i.querySelector("*");return}o=i.namespaceURI===f&&r&&r[m(i)];if(o){return k(i,o)}else if(n){if(!a&&i.getAttribute("stashed")==="true"&&!y){s.createStashedControl(D(d,i),{sParentId:p["id"],sParentAggregationName:n.name,fnCreate:function(){var e=C;C=false;try{return v(F(t,n,r,i,true))}finally{C=e}}});return}return O(i).then(function(e){for(var t=0;t<e.length;t++){var r=e[t];var i=n.name;if(n.multiple){if(!p[i]){p[i]=[]}if(typeof p[i].path==="string"){c(!p[i].template,"list bindings support only a single template object");p[i].template=r}else{p[i].push(r)}}else{c(!p[i],"multiple aggregates defined for aggregation with cardinality 0..1");p[i]=r}}return e})}else if(m(t)!=="FragmentDefinition"||t.namespaceURI!=="sap.ui.core"){throw new Error("Cannot add direct child without default aggregation defined for control "+V.getElementName())}}else if(i.nodeType===3){if(e.trim(i.textContent||i.text)){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+e.trim(i.textContent||i.text))}}}var K=V.getDefaultAggregation();var H=V.getAllAggregations();return k(t,K,H).then(function(){var e;if(y&&t.hasAttribute("id")){q(d,t)}else if(!y){if(i.prototype.isPrototypeOf(o.prototype)&&typeof o._sType==="string"){var n=function(){return i._legacyCreate(p,undefined,o._sType)};if(d.fnScopedRunWithOwner){e=d.fnScopedRunWithOwner(n)}else{e=n()}}else{var r=function(){if(d.fnScopedRunWithOwner){return d.fnScopedRunWithOwner(function(){return new o(p)})}else{return new o(p)}};if(b&&b.fnRunWithPreprocessor){e=b.fnRunWithPreprocessor(r)}else{e=r()}}if(_&&e.addStyleClass){e.addStyleClass(_)}}if(!e){e=[]}else if(!Array.isArray(e)){e=[e]}if(w._supportInfo&&e){for(var a=0,s=e.length;a<s;a++){var u=e[a];if(u&&u.getId()){var l=w._supportInfo({context:t,env:{caller:"createRegularControls",nodeid:t.getAttribute("id"),controlid:u.getId()}}),f=R?R+",":"";f+=l;w._supportInfo.addSupportInfo(u.getId(),f)}}}if(N){e.forEach(function(e){if(V.getCompositeAggregationName){var n=t.getElementsByTagName(e.getMetadata().getCompositeAggregationName());for(var r=0;r<n.length;r++){t.removeChild(n[0])}}e._sapui_declarativeSourceInfo={xmlNode:t,xmlRootNode:d._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:V.getName()==="sap.ui.core.Fragment"?p["fragmentName"]:null}})}return e})}function D(e,t,n){if(t.getAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id")){return t.getAttribute("id")}else{return U(n?n:t.getAttribute("id"))}}function q(e,t){t.setAttribute("id",U(t.getAttribute("id")));t.setAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id",true)}}w._preprocessMetadataContexts=null;w._calculatedModelMapping=function(e,t,r){var i,a={},o=n.bindingParser(e,t);function s(e){if(e.length%2===0){throw new Error("The last entry is no binding")}for(var t=1;t<=e.length;t=t+2){if(typeof e[t-1]=="string"){throw new Error("Binding expected not a string")}if(e[t]){if(typeof e[t]!="string"||e[t]!=","){throw new Error("Missing delimiter ','")}}}}if(o){if(!o.formatter){i=o;o={parts:[i]}}else{s(o.formatter.textFragments)}for(var u=0;u<o.parts.length;u++){i=o.parts[u];a[i.model]=a[i.model]||(r?[]:null);if(Array.isArray(a[i.model])){a[i.model].push(i)}else{a[i.model]=i}}}return a};return w},true);
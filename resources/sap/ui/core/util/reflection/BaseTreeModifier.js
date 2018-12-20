/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectMetadata","sap/base/util/ObjectPath","sap/ui/util/XMLHelper","sap/base/Log"],function(e,t,n,r,o){"use strict";return{bySelector:function(e,t,n){var r=this.getControlIdBySelector(e,t);return this._byId(r,n)},getControlIdBySelector:function(e,t){if(!e){return undefined}if(typeof e==="string"){e={id:e}}var n=e.id;if(e.idIsLocal){if(t){n=t.createId(n)}else{throw new Error("App Component instance needed to get a control's ID from selector")}}else{var r=/^application-[^-]*-[^-]*-component---/gim;var o=!!r.exec(e.id);if(o){n=n.replace(/^application-[^-]*-[^-]*-component---/g,"");if(t){n=t.createId(n)}else{throw new Error("App Component instance needed to get a control's ID from selector")}}}return n},getSelector:function(e,t,n){var r=e;if(typeof r!=="string"){r=e?this.getId(e):undefined}else if(!t){throw new Error("App Component instance needed to get a selector from string ID")}if(n&&(n.id||n.idIsLocal)){throw new Error("A selector of control with the ID '"+r+"' was requested, "+"but core properties were overwritten by the additionally passed information.")}var o=this.checkControlId(r,t);if(!o){throw new Error("Generated ID attribute found - to offer flexibility a stable control ID is needed to assign the changes to, but for this control the ID was generated by SAPUI5 "+r)}var i=Object.assign({},n,{id:"",idIsLocal:false});if(this.hasLocalIdSuffix(r,t)){var a=t.getLocalId(r);i.id=a;i.idIsLocal=true}else{i.id=r}return i},checkControlId:function(n,r,i){var a=n instanceof e?n.getId():n;var s=t.isGeneratedId(a);if(!s||this.hasLocalIdSuffix(n,r)){return true}else{var f=a.indexOf("--")!==-1;if(!i&&!f){o.warning("Generated id attribute found, to offer flexibility a stable control id is needed "+"to assign the changes to, but for this control the id was generated by SAPUI5",a)}return false}},hasLocalIdSuffix:function(t,n){var r=t instanceof e?t.getId():t;if(!n){o.error("determination of a local id suffix failed due to missing app component for "+r);return false}return!!n.getLocalId(r)},_checkAndPrefixIdsInFragment:function(e,t){var n=r.getParseError(e);if(n.errorCode!==0){throw new Error(e.parseError.reason)}var o=e.documentElement;var i=[],a=[];if(o.localName==="FragmentDefinition"){i=this._getElementNodeChildren(o)}else{i=[o]}a=[].concat(i);function s(e){a.push(e)}for(var f=0,c=i.length;f<c;f++){this._traverseXmlTree(s,i[f])}for(var l=0,d=a.length;l<d;l++){if(a[l].getAttribute("id")){a[l].setAttribute("id",t+"."+a[l].getAttribute("id"))}else{throw new Error("At least one control does not have a stable ID")}}return o},_getElementNodeChildren:function(e){var t=[];var n=e.childNodes;for(var r=0,o=n.length;r<o;r++){if(n[r].nodeType===1){t.push(n[r])}}return t},_isInstanceOf:function(e,t){var r=n.get(t);if(typeof r==="function"){return e instanceof r}else{return false}},_hasInterface:function(e,t){var n=e.getMetadata().getInterfaces();return n.indexOf(t)!==-1},_getControlMetadataInXml:function(e){var t=this._getControlTypeInXml(e);jQuery.sap.require(t);var r=n.get(t);return r.getMetadata()},_getControlTypeInXml:function(e){var t=e.namespaceURI;t=t?t+".":"";t+=e.localName;return t},_traverseXmlTree:function(e,t){function n(t,r,o){var i;if(!o){var a=this._getControlMetadataInXml(r);i=a.getAllAggregations()}var s=this._getElementNodeChildren(r);s.forEach(function(t){var o=i&&i[t.localName];n.call(this,r,t,o);if(!o){e(t)}}.bind(this))}n.call(this,t,t,false)},setVisible:function(e,t){},getVisible:function(e){},setStashed:function(e,t){},getStashed:function(e){},bindProperty:function(e,t,n){},unbindProperty:function(e,t){},setProperty:function(e,t,n){},getProperty:function(e,t){},isPropertyInitial:function(e,t){},setPropertyBinding:function(e,t,n){},getPropertyBinding:function(e,t){},createControl:function(e,t,n,r,o,i){},applySettings:function(e,t){},getId:function(e){},getParent:function(e){},getControlType:function(e){},getAllAggregations:function(e){},getAggregation:function(e,t){},insertAggregation:function(e,t,n,r,o){},removeAggregation:function(e,t,n){},removeAllAggregation:function(e,t){},getBindingTemplate:function(e,t){},updateAggregation:function(e,t){},findIndexInParentAggregation:function(e){},getParentAggregationName:function(e,t){},validateType:function(e,t,n,r,o){},instantiateFragment:function(e,t,n){},destroy:function(e){},getChangeHandlerModulePath:function(e){}}});
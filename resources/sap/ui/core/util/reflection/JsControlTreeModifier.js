/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseTreeModifier","sap/base/util/ObjectPath","sap/ui/util/XMLHelper","sap/ui/core/Component","sap/base/util/merge","sap/ui/core/Fragment"],function(t,e,n,r,i){"use strict";var a={targets:"jsControlTree",setVisible:function(t,e){if(t.setVisible){this.unbindProperty(t,"visible");t.setVisible(e)}else{throw new Error("Provided control instance has no setVisible method")}},getVisible:function(t){if(t.getVisible){return t.getVisible()}else{throw new Error("Provided control instance has no getVisible method")}},setStashed:function(t,e,n){e=!!e;if(t.setStashed){var i;if(t.getStashed()===true&&e===false){t.setStashed(e);if(n instanceof r){i=this.bySelector(this.getSelector(t,n),n)}}if((i||t)["setVisible"]){this.setVisible(i||t,!e)}return i}else{throw new Error("Provided control instance has no setStashed method")}},getStashed:function(t){if(t.getStashed){return typeof t.getStashed()!=="boolean"?!this.getVisible(t):t.getStashed()}else{throw new Error("Provided control instance has no getStashed method")}},bindProperty:function(t,e,n){t.bindProperty(e,n)},unbindProperty:function(t,e){if(t){t.unbindProperty(e,true)}},setProperty:function(t,e,n){var r=t.getMetadata().getPropertyLikeSetting(e);this.unbindProperty(t,e);if(r){var i=r._sMutator;t[i](n)}},getProperty:function(t,e){var n=t.getMetadata().getPropertyLikeSetting(e);if(n){var r=n._sGetter;return t[r]()}},isPropertyInitial:function(t,e){return t.isPropertyInitial(e)},setPropertyBinding:function(t,e,n){this.unbindProperty(t,e);var r={};r[e]=n;t.applySettings(r)},getPropertyBinding:function(t,e){return t.getBindingInfo(e)},createControl:function(t,n,r,i,a,o){var s;if(this.bySelector(i,n)){s="Can't create a control with duplicated ID "+i;if(o){return Promise.reject(s)}throw new Error(s)}if(o){return new Promise(function(e,r){sap.ui.require([t.replace(/\./g,"/")],function(t){var r=this.getControlIdBySelector(i,n);e(new t(r,a))}.bind(this),function(){r(new Error("Required control '"+t+"' couldn't be created asynchronously"))})}.bind(this))}var g=e.get(t);if(!g){throw new Error("Can't create a control because the matching class object has not yet been loaded. Please preload the '"+t+"' module")}var u=this.getControlIdBySelector(i,n);return new g(u,a)},applySettings:function(t,e){t.applySettings(e)},byId:function(t){return this._byId(t)},_byId:function(t){return sap.ui.getCore().byId(t)},getId:function(t){return t.getId()},getParent:function(t){return t.getParent()},getControlType:function(t){return t&&t.getMetadata().getName()},getAllAggregations:function(t){return t.getMetadata().getAllAggregations()},getAggregation:function(t,e){var n=this.findAggregation(t,e);if(n){return t[n._sGetter]()}},insertAggregation:function(t,e,n,r){var i=this.findAggregation(t,e);if(i){if(i.multiple){var a=r||0;t[i._sInsertMutator](n,a)}else{t[i._sMutator](n)}}},removeAggregation:function(t,e,n){var r=this.findAggregation(t,e);if(r){t[r._sRemoveMutator](n)}},removeAllAggregation:function(t,e){var n=this.findAggregation(t,e);if(n){t[n._sRemoveAllMutator]()}},getBindingTemplate:function(t,e){var n=t.getBindingInfo(e);return n&&n.template},updateAggregation:function(t,e){var n=this.findAggregation(t,e);if(n){t[n._sDestructor]();t.updateAggregation(e)}},findIndexInParentAggregation:function(t){var e=this.getParent(t),n;if(!e){return-1}n=this.getAggregation(e,this.getParentAggregationName(t));if(Array.isArray(n)){return n.indexOf(t)}else{return 0}},getParentAggregationName:function(t){return t.sParentAggregationName},findAggregation:function(t,e){if(t){if(t.getMetadata){var n=t.getMetadata();var r=n.getAllAggregations();if(r){return r[e]}}}},validateType:function(t,e,n,r){var i=e.type;if(e.multiple===false&&this.getAggregation(n,e.name)&&this.getAggregation(n,e.name).length>0){return false}return this._isInstanceOf(t,i)||this._hasInterface(t,i)},instantiateFragment:function(t,e,r){var i=n.parse(t);i=this._checkAndPrefixIdsInFragment(i,e);var a;var o=r&&r.getId();var s=r.getController();a=sap.ui.xmlfragment({fragmentContent:i,sId:o},s);if(!Array.isArray(a)){a=[a]}return a},destroy:function(t){t.destroy()},getChangeHandlerModulePath:function(t){if(typeof t==="object"&&typeof t.data==="function"&&t.data("sap-ui-custom-settings")&&t.data("sap-ui-custom-settings")["sap.ui.fl"]){return t.data("sap-ui-custom-settings")["sap.ui.fl"].flexibility}else{return undefined}}};return i({},t,a)},true);
/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/base/EventProvider","sap/ui/core/mvc/View","sap/ui/core/routing/async/Target","sap/ui/core/routing/sync/Target","sap/base/util/UriParameters","sap/base/Log"],function(t,e,i,r,n,o,s){"use strict";var a=e.extend("sap.ui.core.routing.Target",{constructor:function(t,i){var a;function l(){if(new o(window.location.href).get("sap-ui-xx-asyncRouting")==="true"){s.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","Target");return true}return false}if(t._async===undefined){t._async=l()}if(t.type==="Component"&&!t._async){a="sap.ui.core.routing.Target doesn't support loading component in synchronous mode, please switch routing to async";s.error(a);throw new Error(a)}this._updateOptions(t);this._oCache=i;e.apply(this,arguments);if(this._oOptions.title){this._oTitleProvider=new h({target:this})}var u=this._oOptions._async?r:n;for(var d in u){this[d]=u[d]}this._bIsDisplayed=false},destroy:function(){this._oParent=null;this._oOptions=null;this._oCache=null;if(this._oTitleProvider){this._oTitleProvider.destroy()}this._oTitleProvider=null;e.prototype.destroy.apply(this,arguments);this.bIsDestroyed=true;return this},attachDisplay:function(t,e,i){return this.attachEvent(this.M_EVENTS.DISPLAY,t,e,i)},detachDisplay:function(t,e){return this.detachEvent(this.M_EVENTS.DISPLAY,t,e)},fireDisplay:function(t){var e=this._oTitleProvider&&this._oTitleProvider.getTitle();if(e){this.fireTitleChanged({name:this._oOptions._name,title:e})}this._bIsDisplayed=true;return this.fireEvent(this.M_EVENTS.DISPLAY,t)},attachTitleChanged:function(t,e,i){var r=this.hasListeners("titleChanged"),n=this._oTitleProvider&&this._oTitleProvider.getTitle();this.attachEvent(this.M_EVENTS.TITLE_CHANGED,t,e,i);if(!r&&n&&this._bIsDisplayed){this.fireTitleChanged({name:this._oOptions._name,title:n})}return this},detachTitleChanged:function(t,e){return this.detachEvent(this.M_EVENTS.TITLE_CHANGED,t,e)},fireTitleChanged:function(t){return this.fireEvent(this.M_EVENTS.TITLE_CHANGED,t)},_getEffectiveObjectName:function(t){var e=this._oOptions.path;if(e){t=e+"."+t}return t},_updateOptions:function(t){if(t.viewName){if(t.name){t._name=t.name}t.type="View";t.name=t.viewName;if(t.viewPath){t.path=t.viewPath}if(t.viewId){t.id=t.viewId}}this._oOptions=t},_bindTitleInTitleProvider:function(t){if(this._oTitleProvider&&t instanceof i){this._oTitleProvider.applySettings({title:this._oOptions.title},t.getController())}},_addTitleProviderAsDependent:function(t){if(!this._oTitleProvider){return}var e=this._oTitleProvider.getParent();if(e){e.removeDependent(this._oTitleProvider)}t.addDependent(this._oTitleProvider)},_beforePlacingViewIntoContainer:function(t){},M_EVENTS:{DISPLAY:"display",TITLE_CHANGED:"titleChanged"}});var h=t.extend("sap.ui.core.routing.Target.TitleProvider",{metadata:{library:"sap.ui.core",properties:{title:{type:"string",group:"Data",defaultValue:null}}},constructor:function(e){this._oTarget=e.target;delete e.target;t.prototype.constructor.call(this,e)},setTitle:function(t){this.setProperty("title",t,true);if(this._oTarget._bIsDisplayed){this._oTarget.fireTitleChanged({name:this._oTarget._oOptions._name,title:t})}}});return a});
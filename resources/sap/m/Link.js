/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/InvisibleText","sap/ui/core/EnabledPropagator","sap/ui/core/library","sap/ui/Device","./LinkRenderer","sap/ui/events/KeyCodes","sap/base/Log","sap/base/security/URLWhitelist"],function(e,t,r,i,a,s,o,n,p,l){"use strict";var u=a.TextDirection;var d=a.TextAlign;var h=t.extend("sap.m.Link",{metadata:{interfaces:["sap.ui.core.IShrinkable","sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/Link.designtime",properties:{text:{type:"string",group:"Data",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},target:{type:"string",group:"Behavior",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},href:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},validateUrl:{type:"boolean",group:"Data",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:d.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:u.Inherit},subtle:{type:"boolean",group:"Behavior",defaultValue:false},emphasized:{type:"boolean",group:"Behavior",defaultValue:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{allowPreventDefault:true,parameters:{ctrlKey:{type:"boolean"},metaKey:{type:"boolean"}}}},dnd:{draggable:true,droppable:false}}});i.call(h.prototype);h.prototype.onBeforeRendering=function(){};h.prototype.onsapspace=function(e){if(this.getEnabled()||this.getHref()){e.setMarked();e.preventDefault()}};h.prototype.onkeyup=function(e){if(e.which===n.SPACE){this._handlePress(e);if(this.getHref()&&!e.isDefaultPrevented()){e.preventDefault();e.setMarked();var t=document.createEvent("MouseEvents");t.initEvent("click",false,true);this.getDomRef().dispatchEvent(t)}}};h.prototype._handlePress=function(e){if(this.getEnabled()){e.setMarked();if(!this.firePress({ctrlKey:!!e.ctrlKey,metaKey:!!e.metaKey})||!this.getHref()){e.preventDefault()}}else{e.preventDefault()}};h.prototype.onsapenter=h.prototype._handlePress;if(s.support.touch){h.prototype.ontap=h.prototype._handlePress}else{h.prototype.onclick=h.prototype._handlePress}h.prototype.ontouchstart=function(e){if(this.getEnabled()){e.setMarked()}};h.prototype.setText=function(e){var t=this.$();this.setProperty("text",e,true);e=this.getProperty("text");if(this.writeText){this.writeText(e)}else{t.text(e)}if(e){t.attr("tabindex","0")}else{t.attr("tabindex","-1")}return this};h.prototype.setHref=function(e){var t=this._isHrefValid(e);this.setProperty("href",e,true);if(!t){this.$().removeAttr("href");p.warning(this+": The href tag of the link was not set since it's not valid.");return this}if(this.getEnabled()){e=this.getProperty("href");if(!e){this.$().removeAttr("href")}else{this.$().attr("href",e)}}return this};h.prototype.setSubtle=function(e){this.setProperty("subtle",e,true);var t=this.$();if(t.length){t.toggleClass("sapMLnkSubtle",e);if(e){h._addToDescribedBy(t,this._sAriaLinkSubtleId)}else{h._removeFromDescribedBy(t,this._sAriaLinkSubtleId)}}if(e&&!h.prototype._sAriaLinkSubtleId){h.prototype._sAriaLinkSubtleId=r.getStaticId("sap.m","LINK_SUBTLE")}return this};h.prototype.setEmphasized=function(e){this.setProperty("emphasized",e,true);var t=this.$();if(t.length){t.toggleClass("sapMLnkEmphasized",e);if(e){h._addToDescribedBy(t,this._sAriaLinkEmphasizedId)}else{h._removeFromDescribedBy(t,this._sAriaLinkEmphasizedId)}}if(e&&!h.prototype._sAriaLinkEmphasizedId){h.prototype._sAriaLinkEmphasizedId=r.getStaticId("sap.m","LINK_EMPHASIZED")}return this};h.prototype.setWrapping=function(e){this.setProperty("wrapping",e,true);this.$().toggleClass("sapMLnkWrapping",e);return this};h.prototype.setEnabled=function(e){e=this.validateProperty("enabled",e);if(e!==this.getProperty("enabled")){this.setProperty("enabled",e,true);var t=this.$();t.toggleClass("sapMLnkDsbl",!e);if(e){t.attr("disabled",false);if(this.getText()){t.attr("tabindex","0")}else{t.attr("tabindex","-1")}t.removeAttr("aria-disabled");if(this.getHref()){t.attr("href",this.getHref())}}else{t.attr("disabled",true);t.attr("aria-disabled",true);t.removeAttr("href")}}return this};h.prototype.setWidth=function(e){this.setProperty("width",e,true);this.$().toggleClass("sapMLnkMaxWidth",!e);this.$().css("width",e);return this};h.prototype.setTarget=function(e){this.setProperty("target",e,true);if(!e){this.$().removeAttr("target")}else{this.$().attr("target",e)}return this};h.prototype._isHrefValid=function(e){return this.getValidateUrl()?l.validate(e):true};h._addToDescribedBy=function(e,t){var r=e.attr("aria-describedby");if(r){e.attr("aria-describedby",r+" "+t)}else{e.attr("aria-describedby",t)}};h._removeFromDescribedBy=function(e,t){var r=e.attr("aria-describedby");if(r&&r.indexOf(t)!==-1){r=r.replace(t,"");if(r.length>1){e.attr("aria-describedby",r)}else{e.removeAttr("aria-describedby")}}};h.prototype.getAccessibilityInfo=function(){return{role:"link",type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_LINK"),description:this.getText()||this.getHref()||"",focusable:this.getEnabled(),enabled:this.getEnabled()}};h.prototype.getFormDoNotAdjustWidth=function(){return true};h.prototype._getTabindex=function(){return this.getText()?"0":"-1"};return h});
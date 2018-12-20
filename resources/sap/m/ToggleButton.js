/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./library","sap/ui/core/EnabledPropagator","./ToggleButtonRenderer","sap/ui/events/KeyCodes"],function(e,t,s,i,r){"use strict";var o=e.extend("sap.m.ToggleButton",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ToggleButton.designtime",properties:{pressed:{type:"boolean",group:"Data",defaultValue:false}}}});s.call(o.prototype);o.prototype.ontap=function(e){e.setMarked();if(this.getEnabled()){this.setPressed(!this.getPressed());this.firePress({pressed:this.getPressed()})}};o.prototype.setPressed=function(e){e=!!e;if(e!=this.getPressed()){this.setProperty("pressed",e,true);this.$().attr("aria-pressed",e);this.$("inner").toggleClass("sapMToggleBtnPressed",e&&!this._isUnstyled())}return this};o.prototype.onkeydown=function(e){if(e.which===r.SPACE||e.which===r.ENTER){this.ontap(e)}};o.prototype.onkeyup=function(e){if(e.which===r.SPACE||e.which===r.ENTER){e.setMarked()}};o.prototype.getAccessibilityInfo=function(){var t=e.prototype.getAccessibilityInfo.apply(this,arguments);if(this.getPressed()){t.description=((t.description||"")+" "+sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_STATE_PRESSED")).trim()}return t};return o});
/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","sap/ui/core/library","sap/ui/Device"],function(e,t,i){"use strict";var a=t.ValueState;var r={};r.render=function(t,r){var s=r.getId();var d=r.getEnabled();var l=!r.getProperty("editableParent");var n=!r.getEditable()||l;var u=!d||n;var p=a.Error===r.getValueState();var b=a.Warning===r.getValueState();var o=a.Success===r.getValueState();var c=a.Information===r.getValueState();var w=r.getUseEntireWidth();t.addClass("sapMRb");t.write("<div");t.writeControlData(r);if(w){t.addStyle("width",r.getWidth());t.writeStyles()}var v=e.enrichTooltip(r,r.getTooltip_AsString());if(v){t.writeAttributeEscaped("title",v)}t.writeAccessibilityState(r,{role:"radio",posinset:r.getProperty("posinset"),setsize:r.getProperty("setsize"),readonly:l||undefined,selected:null,checked:r.getSelected()===true?true:undefined,disabled:n?true:undefined,labelledby:{value:s+"-label",append:true},describedby:{value:v?s+"-Descr":undefined,append:true}});if(r.getSelected()){t.addClass("sapMRbSel")}if(!d){t.addClass("sapMRbDis")}if(n){t.addClass("sapMRbRo")}if(p){t.addClass("sapMRbErr")}if(b){t.addClass("sapMRbWarn")}if(o){t.addClass("sapMRbSucc")}if(c){t.addClass("sapMRbInfo")}t.writeClasses();if(d){t.writeAttribute("tabindex",r.hasOwnProperty("_iTabIndex")?r._iTabIndex:0)}t.write(">");t.write("<div class='sapMRbB'");t.write(">");t.write("<div");t.addClass("sapMRbBOut");t.writeAttribute("id",s+"-Button");if(!u&&i.system.desktop){t.addClass("sapMRbHoverable")}t.writeClasses();t.write(">");t.write("<div");t.addClass("sapMRbBInn");t.writeClasses();t.write(">");t.write("<input type='radio' tabindex='-1'");t.writeAttribute("id",s+"-RB");t.writeAttributeEscaped("name",r.getGroupName());if(r.getSelected()){t.writeAttribute("checked","checked")}if(u){t.writeAttribute("readonly","readonly");t.writeAttribute("disabled","disabled")}t.write(" />");t.write("</div></div>");t.write("</div>");t.renderControl(r._oLabel);if(v&&sap.ui.getCore().getConfiguration().getAccessibility()){t.write('<span id="'+s+'-Descr" style="display: none;">');t.writeEscaped(v);t.write("</span>")}t.write("</div>")};return r},true);
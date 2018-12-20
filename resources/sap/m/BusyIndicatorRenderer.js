/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){this.startBusyIndicator(t,e);this.renderBusyIndication(t,e);this.renderLabel(t,e);this.endBusyIndicator(t)};t.startBusyIndicator=function(t,e){t.write("<div ");t.writeControlData(e);t.addClass("sapMBusyIndicator");t.writeClasses();t.addStyle("font-size",e.getSize());t.writeStyles();t.writeAccessibilityState(e);this.renderTooltip(t,e.getTooltip_AsString());t.write(">")};t.renderTooltip=function(t,e){if(e){t.writeAttributeEscaped("title",e)}};t.renderBusyIndication=function(t,e){if(e.getCustomIcon()){t.renderControl(e._iconImage)}else{t.write("<div class='sapMBusyIndicatorBusyArea'");t.writeAttribute("id",e.getId()+"-busy-area");t.write("></div>")}};t.renderLabel=function(t,e){if(e.getText()){t.renderControl(e._busyLabel)}};t.endBusyIndicator=function(t){t.write("</div>")};return t},true);
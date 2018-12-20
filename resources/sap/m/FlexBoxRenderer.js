/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./FlexBoxStylingHelper","sap/m/library","sap/base/security/encodeXML","sap/base/Log"],function(e,t,s,a){"use strict";var i=t.FlexDirection;var l=t.FlexRendertype;var r={};r.render=function(t,s){if(s.getRenderType()===l.List){t.write("<ul")}else{t.write("<div")}t.writeControlData(s);var a=s.getParent();if(a&&a.isA("sap.m.FlexBox")){t.addClass("sapMFlexItem");var d=s.getLayoutData();if(d instanceof sap.m.FlexItemData){e.setFlexItemStyles(t,d)}if(a.getRenderType()===l.List){t.write("<li")}}else if(s.getFitContainer()){t.addClass("sapMFlexBoxFit")}t.addClass("sapMFlexBox");if(s.getDisplayInline()){t.addClass("sapMFlexBoxInline")}if(s.getDirection()===i.Column||s.getDirection()===i.ColumnReverse){t.addClass("sapMVBox")}else{t.addClass("sapMHBox")}if(s.getDirection()===i.RowReverse||s.getDirection()===i.ColumnReverse){t.addClass("sapMFlexBoxReverse")}t.addClass("sapMFlexBoxJustify"+s.getJustifyContent());t.addClass("sapMFlexBoxAlignItems"+s.getAlignItems());t.addClass("sapMFlexBoxWrap"+s.getWrap());t.addClass("sapMFlexBoxAlignContent"+s.getAlignContent());t.addClass("sapMFlexBoxBG"+s.getBackgroundDesign());t.writeClasses();if(s.getHeight()){t.addStyle("height",s.getHeight())}if(s.getWidth()){t.addStyle("width",s.getWidth())}t.writeStyles();var n=s.getTooltip_AsString();if(n){t.writeAttributeEscaped("title",n)}t.write(">");r.renderItems(s,t);if(s.getRenderType()===l.List){t.write("</ul>")}else{t.write("</div>")}};r.renderItems=function(e,t){var s=e.getItems(),a="";for(var i=0;i<s.length;i++){if(s[i].isA("sap.m.FlexBox")||e.getRenderType()===l.Bare){a=""}else if(e.getRenderType()===l.List){a="li"}else{a="div"}r.renderItem(s[i],a,t)}};r.renderItem=function(t,i,l){if(i){l.write("<"+i);if(t instanceof sap.m.ScrollContainer){l.addClass("sapMFlexBoxScroll")}if(!t.getVisible()){l.addClass("sapUiHiddenPlaceholder")}}var d=t.getLayoutData();if(i&&!d){t.setAggregation("layoutData",new sap.m.FlexItemData,true);d=t.getLayoutData()}if(!(d instanceof sap.m.FlexItemData)){if(d){a.warning(d+" set on "+t+" is not of type sap.m.FlexItemData")}}else{if(i&&d.getId()){l.writeAttributeEscaped("id",d.getId())}if(d.getStyleClass()){r.addItemClass(s(d.getStyleClass()),t,i,l)}r.addItemClass("sapMFlexItemAlign"+d.getAlignSelf(),t,i,l);r.addItemClass("sapMFlexBoxBG"+d.getBackgroundDesign(),t,i,l);if(i){e.setFlexItemStyles(l,d)}}r.addItemClass("sapMFlexItem",t,i,l);if(i){l.writeStyles();l.writeClasses();l.write(">")}l.renderControl(t);if(i){l.write("</"+i+">")}};r.addItemClass=function(e,t,s,a){if(s){a.addClass(e)}else{t.addStyleClass(e)}};return r},true);
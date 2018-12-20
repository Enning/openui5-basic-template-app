/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBaseRenderer","sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device"],function(t,e,i,r){"use strict";var s=i.TextDirection;var a=e.extend(t);a.renderAttributesStatuses=function(t,e,i,r){var s;t.write("<div");t.addClass("sapMObjLAttrRow");t.writeClasses();t.write(">");t.write("<div");t.addClass("sapMObjLAttrDiv");t.writeClasses();t.write(">");for(s=0;s<i.length;s++){t.renderControl(i[s])}t.write("</div>");t.write("<div");t.addClass("sapMObjLStatusDiv");t.writeClasses();t.write(">");for(s=0;s<r.length;s++){if(r[s]instanceof Array){while(r[s].length>0){t.renderControl(r[s].shift())}}else{t.renderControl(r[s])}}t.write("</div>");t.write("</div>")};a.renderLIAttributes=function(t,e){t.addClass("sapMObjLItem");t.addClass("sapMObjLListModeDiv")};a.renderLIContent=function(t,e){var i=e.getAggregation("_objectNumber"),r=e.getTitleTextDirection(),a=e.getIntroTextDirection();if(e.getIntro()){t.write("<div");t.addClass("sapMObjLIntro");t.writeClasses();t.writeAttribute("id",e.getId()+"-intro");t.write(">");t.write("<span");if(a!==s.Inherit){t.writeAttribute("dir",a.toLowerCase())}t.write(">");t.writeEscaped(e.getIntro());t.write("</span>");t.write("</div>")}t.write("<div");t.addClass("sapMObjLTopRow");t.writeClasses();t.write(">");if(!!e.getIcon()){t.write("<div");t.addClass("sapMObjLIconDiv");t.writeClasses();t.write(">");t.renderControl(e._getImageControl());t.write("</div>")}t.write("<div");t.addClass("sapMObjLNumberDiv");t.writeClasses();t.write(">");if(i&&i.getNumber()){i.setTextDirection(e.getNumberTextDirection());t.renderControl(i)}t.write("</div>");t.write("<div");t.addStyle("display","-webkit-box");t.addStyle("overflow","hidden");t.writeStyles();t.write(">");var d=e._getTitleText();if(d){d.setTextDirection(r);d.setText(e.getTitle());d.addStyleClass("sapMObjLTitle");t.renderControl(d)}t.write("</div>");t.write("</div>");t.write('<div style="clear: both;"></div>');if(e._hasBottomContent()){t.write("<div");t.addClass("sapMObjLBottomRow");t.writeClasses();t.write(">");var n=e.getAttributes();var o=[];var u=e.getMarkers();u._isEmpty=function(){return!u.length};if(!u._isEmpty()){o.push(u)}e.getFirstStatus()&&o.push(e.getFirstStatus());e.getSecondStatus()&&o.push(e.getSecondStatus());this.renderAttributesStatuses(t,e,n,o);t.write("</div>")}};a.getAriaLabelledBy=function(t){var e=[],i=t.getFirstStatus(),r=t.getSecondStatus();if(t.getIntro()){e.push(t.getId()+"-intro")}if(t.getTitle()){e.push(t.getId()+"-titleText")}if(t.getNumber()){e.push(t.getId()+"-ObjectNumber")}if(t.getAttributes()){t.getAttributes().forEach(function(t){if(!t._isEmpty()){e.push(t.getId())}})}if(i&&!i._isEmpty()){e.push(i.getId())}if(r&&!r._isEmpty()){e.push(r.getId())}if(t.getMarkers()){t.getMarkers().forEach(function(t){e.push(t.getId()+"-text")})}return e.join(" ")};return a},true);
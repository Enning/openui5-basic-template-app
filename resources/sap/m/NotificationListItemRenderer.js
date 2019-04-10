/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(e){"use strict";var r=e.Priority;var t={};var i="sapMNLI";var a="sapMNLB";var s="sapMNLI-TextWrapper";var n="sapMLIB";var o="sapMNLB-AuthorPicture";var d="sapMNLB-Priority";var l="sapMNLB-Header";var u="sapMNLI-Header";var w="sapMNLI-Body";var v="sapMNLI-Description";var g="sapMNLI-Details";var p="sapMNLB-Bullet";var c="sapMNLB-Footer";var C="sapMNLI-Footer";var h="sapMNLI-No-Footer";var f="sapMNLB-CloseButton";var B="sapMNLI-CollapseButton";var N="sapMNLI-TitleWrapper--initial-overwrite";var M="sapMNLI-TextWrapper--initial-overwrite";t.render=function(e,r){if(r.getVisible()){var t=r.getId();var s=t+"-title"+" "+(t+"-body")+" "+(t+"-info");e.write("<li");e.addClass(i);e.addClass(a);e.addClass(n);e.writeControlData(r);e.writeAttribute("tabindex","0");e.writeAccessibilityState(r,{role:"listitem",labelledby:s});e.writeClasses();e.write(">");this.renderCloseButton(e,r);this.renderPriorityArea(e,r);this.renderMessageStrip(e,r);this.renderHeader(e,r);this.renderBody(e,r);this.renderFooter(e,r);e.write("</li>")}else{this.renderInvisibleItem(e,r)}};t.renderPriorityArea=function(e,t){e.write("<div");var i="";switch(t.getPriority()){case r.Low:i="sapMNLB-Low";break;case r.Medium:i="sapMNLB-Medium";break;case r.High:i="sapMNLB-High";break;default:i="sapMNLB-None";break}e.addClass(d);e.addClass(i);e.writeClasses();e.write(">");e.write("</div>")};t.renderMessageStrip=function(e,r){e.renderControl(r.getProcessingMessage())};t.renderAuthorPicture=function(e,r){if(!r.getAuthorPicture()){return}e.write("<div");e.addClass(o);e.writeClasses();e.write(">");e.renderControl(r._getAuthorImage());e.write("</div>")};t.renderCloseButton=function(e,r){if(r.getShowCloseButton()){e.renderControl(r.getAggregation("_closeButton").addStyleClass(f))}};t.renderCollapseButton=function(e,r){e.renderControl(r.getAggregation("_collapseButton").addStyleClass(B))};t.renderHeader=function(e,r){e.write("<div");e.addClass(l);e.addClass(u);e.addClass(N);if(L(r)){e.addClass(h)}e.writeClasses();e.write(">");this.renderTitle(e,r);e.write("</div>")};t.renderTitle=function(e,r){e.renderControl(r._getHeaderTitle())};t.renderBody=function(e,r){if(!r._getDescriptionText().getText()&&!r.getAuthorName()&&!r.getDatetime()&&!r.getAuthorPicture()){return}e.write("<div");e.addClass(w);if(L(r)){e.addClass(h)}e.writeClasses();e.write(">");this.renderAuthorPicture(e,r);e.write("<div class="+v+">");this.renderDescription(e,r);this.renderDetails(e,r);e.write("</div>");this.renderAriaText(e,r);e.write("</div>")};t.renderDescription=function(e,r){if(!r._getDescriptionText().getText()){return}e.write("<div");e.addClass(s);e.addClass(M);e.writeClasses();e.write(">");e.renderControl(r._getDescriptionText());e.write("</div>")};t.renderDetails=function(e,r){if(!r.getAuthorName()&&!r.getDatetime()){return}e.write('<div class="'+g+'">');this.renderAuthorName(e,r);if(r.getAuthorName()){e.write('<span class="'+p+'">&#x00B7</span>')}this.renderDatetime(e,r);e.write("</div>")};t.renderDatetime=function(e,r){e.renderControl(r._getDateTimeText())};t.renderAuthorName=function(e,r){e.renderControl(r._getAuthorName())};t.renderAriaText=function(e,r){e.renderControl(r._ariaDetailsText)};t.renderFooter=function(e,r){var t=r.getButtons();e.write("<div");e.addClass(C);e.addClass(c);e.writeClasses();e.write(">");this.renderCollapseButton(e,r);if(t&&t.length&&r.getShowButtons()){e.renderControl(r.getAggregation("_overflowToolbar"))}e.write("</div>")};t.renderInvisibleItem=function(e,r){e.write("<li");e.writeInvisiblePlaceholderData(r);e.write(">");e.write("</li>")};function L(e){return e.getHideShowMoreButton()&&(!e.getShowButtons()||!e.getButtons())}return t},true);
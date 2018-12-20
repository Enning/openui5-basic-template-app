/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBaseRenderer","sap/ui/core/Renderer","sap/m/library","sap/ui/core/library"],function(e,i,t,s){"use strict";var r=s.TextDirection;var a=t.ListType;var n=i.extend(e);n.openItemTag=function(i,t){if(t.getStartsSection()){i.write("<li ");i.write('role="separator" ');i.write('class="sapUiMnuDiv"><div class="sapUiMnuDivL"></div><hr><div class="sapUiMnuDivR"></div></li>')}e.openItemTag(i,t)};n.renderLIAttributes=function(e,i){e.addClass("sapMSLI");if(i.getIcon()){e.addClass("sapMSLIIcon")}if(i.getType()==a.Detail||i.getType()==a.DetailAndActive){e.addClass("sapMSLIDetail")}if(i._hasSubItems()){e.addClass("sapMMenuLIHasChildren")}};n.renderLIContent=function(e,i){var t=i.getTitleTextDirection();if(i.getIcon()){e.renderControl(i._getImage(i.getId()+"-img","sapMMenuLIImgThumb",i.getIcon(),i.getIconDensityAware()))}e.write("<div");e.addClass("sapMSLIDiv");e.addClass("sapMSLITitleDiv");e.writeClasses();e.write(">");if(i._bNoFlex){e.write('<div class="sapMLIBNoFlex">')}e.write("<div");e.addClass("sapMSLITitleOnly");e.writeClasses();if(t!==r.Inherit){e.writeAttribute("dir",t.toLowerCase())}e.write(">");e.writeEscaped(i.getTitle());e.write("</div>");if(i._bNoFlex){e.write("</div>")}e.write("</div>");if(i._hasSubItems()){e.renderControl(i._getIconArrowRight())}};return n},true);
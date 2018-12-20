/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/date/UniversalDate","sap/ui/unified/CalendarAppointment","sap/ui/unified/CalendarLegendRenderer","sap/ui/Device","sap/ui/unified/library","sap/ui/core/InvisibleText","sap/base/Log"],function(e,t,a,i,r,s,n){"use strict";var d=r.CalendarDayType;var l=r.CalendarIntervalType;var p=r.CalendarAppointmentVisualization;var o={};o.render=function(e,t){var a=t.getTooltip_AsString();var r=t.getAppointmentsVisualization();var s=this.getLegendItems(t);e.write("<div");e.writeControlData(t);e.addClass("sapUiCalendarRow");if(!i.system.phone&&t.getAppointmentsReducedHeight()){e.addClass("sapUiCalendarRowAppsRedHeight")}if(r!=p.Standard){e.addClass("sapUiCalendarRowVis"+r)}if(a){e.writeAttributeEscaped("title",a)}var n=t.getWidth();if(n){e.addStyle("width",n)}var d=t.getHeight();if(d){e.addStyle("height",d)}e.writeAccessibilityState(t);e.writeClasses();e.writeStyles();e.write(">");this.renderAppointmentsRow(e,t,s);e.write("</div>")};o.renderAppointmentsRow=function(e,t,a){var i=t.getId();e.write('<div id="'+i+'-Apps" class="sapUiCalendarRowApps">');this.renderBeforeAppointments(e,t);this.renderAppointments(e,t,a);this.renderAfterAppointments(e,t);e.write("</div>")};o.renderBeforeAppointments=function(e,t){};o.renderAfterAppointments=function(e,t){};o.renderResizeHandle=function(e,t,a){};o.renderAppointments=function(t,a,i){var r=a._getVisibleAppointments();var s=a._getVisibleIntervalHeaders();var n=a._getStartDate();var d=[];var p=0;var o=0;var w=[];var v=0;var C=0;var g=a.getIntervals();var f=a.getIntervalType();var u=100/g;var A=0;var c=new e(n);var T=false;var I=false;switch(f){case l.Hour:d=a.getNonWorkingHours()||[];p=n.getUTCHours();o=24;break;case l.Day:case l.Week:case l.OneMonth:d=a._getNonWorkingDays();p=n.getUTCDay();o=7;w=a.getNonWorkingHours()||[];v=n.getUTCHours();C=24;break;case l.Month:w=a._getNonWorkingDays();v=n.getUTCDay();C=7;break;default:break}if(a._isOneMonthIntervalOnSmallSizes()){this.renderSingleDayInterval(t,a,r,i,s,d,p,o,w,v,C,true,true)}else{for(A=0;A<g;A++){if(I){T=true}else{T=false}I=false;switch(f){case l.Hour:c.setUTCHours(c.getUTCHours()+1);if(c.getUTCHours()==0){I=true}break;case l.Day:case l.Week:case l.OneMonth:c.setUTCDate(c.getUTCDate()+1);if(c.getUTCDate()==1){I=true}break;case l.Month:c.setUTCMonth(c.getUTCMonth()+1);if(c.getUTCMonth()==0){I=true}break;default:break}this.renderInterval(t,a,A,u,s,d,p,o,w,v,C,T,I)}this.renderIntervalHeaders(t,a,u,s,g);t.write('<div id="'+a.getId()+'-Now" class="sapUiCalendarRowNow"></div>');for(A=0;A<r.length;A++){var h=r[A];this.renderAppointment(t,a,h,i)}t.write('<div id="'+a.getId()+'-DummyApp" class="sapUiCalendarApp sapUiCalendarAppTitleOnly sapUiCalendarAppDummy"></div>')}};o.writeCustomAttributes=function(e,t){};o.renderInterval=function(t,a,i,r,s,n,d,p,o,w,v,C,g){var f=a.getId()+"-AppsInt"+i;var u;var A=a.getShowIntervalHeaders()&&(a.getShowEmptyIntervalHeaders()||s.length>0);var c=a.getStartDate().getMonth();var T=new Date(a.getStartDate().getFullYear(),c+1,0).getDate();t.write('<div id="'+f+'"');t.addClass("sapUiCalendarRowAppsInt");t.addStyle("width",r+"%");if(i>=T&&a.getIntervalType()===l.OneMonth){t.addClass("sapUiCalItemOtherMonth")}for(u=0;u<n.length;u++){if((i+d)%p==n[u]){t.addClass("sapUiCalendarRowAppsNoWork");break}}if(!A){t.addClass("sapUiCalendarRowAppsIntNoHead")}if(C){t.addClass("sapUiCalendarRowAppsIntFirst")}if(g){t.addClass("sapUiCalendarRowAppsIntLast")}t.writeClasses();t.writeStyles();this.writeCustomAttributes(t,a);t.write(">");if(A){t.write("<div");t.addClass("sapUiCalendarRowAppsIntHead");t.writeClasses();t.write(">");t.write("</div>")}if(a.getShowSubIntervals()){var I=a.getIntervalType();var h=0;switch(I){case l.Hour:h=4;break;case l.Day:case l.Week:case l.OneMonth:h=24;break;case l.Month:var U=a._getStartDate();var b=new e(U);b.setUTCMonth(b.getUTCMonth()+i+1,0);h=b.getUTCDate();b.setUTCDate(1);d=b.getUTCDay();break;default:break}var y=100/h;for(u=0;u<h;u++){t.write("<div");t.addClass("sapUiCalendarRowAppsSubInt");t.addStyle("width",y+"%");for(var S=0;S<o.length;S++){if((u+w)%v==o[S]){t.addClass("sapUiCalendarRowAppsNoWork");break}}t.writeStyles();t.writeClasses();t.write(">");t.write("</div>")}}t.write("</div>")};o.renderIntervalHeaders=function(e,t,a,i,r){var s=t.getShowIntervalHeaders()&&(t.getShowEmptyIntervalHeaders()||i.length>0);if(s){for(var n=0;n<i.length;n++){var d=i[n],l,p;if(t._bRTL){p=a*d.interval;l=a*(r-d.last-1)}else{l=a*d.interval;p=a*(r-d.last-1)}this.renderIntervalHeader(e,t,d,t._bRTL,l,p)}}};o.renderIntervalHeader=function(e,t,a,i,r,s){var n=a.appointment.getId();var l=t._calculateAppoitnmentVisualCue(a.appointment);e.write("<div");e.addClass("sapUiCalendarRowAppsIntHead");if(r!==undefined){e.addStyle("left",r+"%")}if(s!==undefined){e.addStyle("right",s+"%")}e.writeElementData(a.appointment);e.addClass("sapUiCalendarRowAppsIntHeadFirst");if(a.appointment.getSelected()){e.addClass("sapUiCalendarRowAppsIntHeadSel")}if(a.appointment.getTentative()){e.addClass("sapUiCalendarRowAppsIntHeadTent")}var p=a.appointment.getTooltip_AsString();if(p){e.writeAttributeEscaped("title",p)}var o=a.appointment.getType();var w=a.appointment.getColor();if(!w&&o&&o!=d.None){e.addClass("sapUiCalendarRowAppsIntHead"+o)}if(w){if(i){e.addStyle("border-right-color",w)}else{e.addStyle("border-left-color",w)}}e.writeStyles();e.writeClasses();e.write(">");e.write("<div");e.addClass("sapUiCalendarIntervalHeaderCont");e.writeClasses();if(w){e.addStyle("background-color",a.appointment._getCSSColorForBackground(w));e.writeStyles()}e.write(">");if(l.appTimeUnitsDifRowStart>0){e.writeIcon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null})}var v=a.appointment.getIcon();if(v){var C=["sapUiCalendarRowAppsIntHeadIcon"];var g={};g["id"]=n+"-Icon";g["title"]=null;e.writeIcon(v,C,g)}var f=a.appointment.getTitle();if(f){e.write("<span");e.writeAttribute("id",n+"-Title");e.addClass("sapUiCalendarRowAppsIntHeadTitle");e.writeClasses();e.write(">");e.writeEscaped(f,true);e.write("</span>")}var u=a.appointment.getText();if(u){e.write("<span");e.writeAttribute("id",n+"-Text");e.addClass("sapUiCalendarRowAppsIntHeadText");e.writeClasses();e.write(">");e.writeEscaped(u,true);e.write("</span>")}if(l.appTimeUnitsDifRowEnd>0){e.writeIcon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null})}e.write("</div>");e.write("</div>")};o.renderAppointment=function(e,t,a,i,r){var n=a.appointment;var l=n.getTooltip_AsString();var o=n.getType();var w=n.getColor();var v=n.getTitle();var C=n.getText();var g=n.getIcon();var f=n.getId();var u={labelledby:{value:s.getStaticId("sap.ui.unified","APPOINTMENT")+" "+f+"-Descr",append:true}};var A=t.getAriaLabelledBy();var c=t._calculateAppoitnmentVisualCue(n);if(A.length>0){u["labelledby"].value=u["labelledby"].value+" "+A.join(" ")}if(v){u["labelledby"].value=u["labelledby"].value+" "+f+"-Title"}if(C){u["labelledby"].value=u["labelledby"].value+" "+f+"-Text"}e.write("<div");e.writeElementData(n);e.addClass("sapUiCalendarApp");if(n.getSelected()){e.addClass("sapUiCalendarAppSel");u["labelledby"].value=u["labelledby"].value+" "+s.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}if(n.getTentative()){e.addClass("sapUiCalendarAppTent");u["labelledby"].value=u["labelledby"].value+" "+s.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(!C){e.addClass("sapUiCalendarAppTitleOnly")}if(g){e.addClass("sapUiCalendarAppWithIcon")}if(!r){if(t._bRTL){e.addStyle("right",a.begin+"%");e.addStyle("left",a.end+"%")}else{e.addStyle("left",a.begin+"%");e.addStyle("right",a.end+"%")}}e.writeAttribute("data-sap-level",a.level);if(t._sFocusedAppointmentId==f){e.writeAttribute("tabindex","0")}else{e.writeAttribute("tabindex","-1")}if(l){e.writeAttributeEscaped("title",l)}if(!w&&o&&o!=d.None){e.addClass("sapUiCalendarApp"+o)}if(w){if(t._bRTL){e.addStyle("border-right-color",w)}else{e.addStyle("border-left-color",w)}}e.writeAccessibilityState(n,u);e.writeClasses();e.writeStyles();e.write(">");e.write("<div");e.addClass("sapUiCalendarAppCont");if(w&&t.getAppointmentsVisualization()===p.Filled){e.addStyle("background-color",n._getCSSColorForBackground(w));e.writeStyles()}e.writeClasses();e.write(">");if(c.appTimeUnitsDifRowStart>0){e.writeIcon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null})}if(g){var T=["sapUiCalendarAppIcon"];var I={};I["id"]=f+"-Icon";I["title"]=null;e.writeIcon(g,T,I)}e.write("<div");e.addClass("sapUiCalendarAppTitleWrapper");e.writeClasses();e.write(">");if(v){e.write("<span");e.writeAttribute("id",f+"-Title");e.addClass("sapUiCalendarAppTitle");e.writeClasses();e.write(">");e.writeEscaped(v,true);e.write("</span>")}if(C){e.write("<span");e.writeAttribute("id",f+"-Text");e.addClass("sapUiCalendarAppText");e.writeClasses();e.write(">");e.writeEscaped(C,true);e.write("</span>")}e.write("</div>");if(c.appTimeUnitsDifRowEnd>0){e.writeIcon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null})}var h=t._oRb.getText("CALENDAR_START_TIME")+": "+t._oFormatAria.format(n.getStartDate());h=h+"; "+t._oRb.getText("CALENDAR_END_TIME")+": "+t._oFormatAria.format(n.getEndDate());if(l){h=h+"; "+l}if(o&&o!=d.None){h=h+"; "+this.getAriaTextForType(o,i)}e.write('<span id="'+f+'-Descr" class="sapUiInvisibleText">'+h+"</span>");e.write("</div>");this.renderResizeHandle(e,t,n);e.write("</div>")};o.renderSingleDayInterval=function(a,i,r,s,n,d,p,o,w,v,C,g,f){var u=1,A=100,c=i.getId()+"-AppsInt"+u,T,I=i.getShowIntervalHeaders()&&(i.getShowEmptyIntervalHeaders()||n.length>0),h=i.getStartDate(),U=h.getMonth(),b=new Date(h.getFullYear(),U+1,0).getDate(),y,S=r.concat(i.getIntervalHeaders().filter(function(e){var t=e.getStartDate().getTime(),a=e.getEndDate().getTime(),i=h.getTime(),r=i+1e3*60*60*24;return!(t>=r||a<=i)}).map(function(e){return{appointment:e,isHeader:true}})).sort(t._getComparer(h)),m;a.write('<div id="'+c+'"');a.addClass("sapUiCalendarRowAppsInt");a.addClass("sapUiCalendarMonthRowAppsS");a.addStyle("width",A+"%");if(u>=b&&i.getIntervalType()===l.OneMonth){a.addClass("sapUiCalItemOtherMonth")}for(T=0;T<d.length;T++){if((u+p)%o==d[T]){a.addClass("sapUiCalendarRowAppsNoWork");break}}if(!I){a.addClass("sapUiCalendarRowAppsIntNoHead")}if(g){a.addClass("sapUiCalendarRowAppsIntFirst")}if(f){a.addClass("sapUiCalendarRowAppsIntLast")}a.writeClasses();a.writeStyles();a.write(">");if(I){a.write("<div");a.addClass("sapUiCalendarRowAppsIntHead");a.writeClasses();a.write(">");a.write("</div>")}for(T=0;T<S.length;T++){m=S[T];a.write('<div class="sapUiCalendarAppContainer">');a.write('<div class="sapUiCalendarAppContainerLeft">');a.write("<div>"+m.appointment._getDateRangeIntersectionText(h)+"</div>");a.write("</div>");a.write('<div class="sapUiCalendarAppContainerRight">');if(m.isHeader){this.renderIntervalHeader(a,i,m)}else{this.renderAppointment(a,i,m,s,true)}a.write("</div>");a.write("</div>")}if(r.length===0){a.write('<div class="sapUiCalendarNoApps">');y=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PLANNINGCALENDAR_ROW_NO_APPOINTMENTS");a.write(y);a.write("</div>")}a.write('<div id="'+i.getId()+'-Now" class="sapUiCalendarRowNow"></div>');a.write('<div id="'+i.getId()+'-DummyApp" class="sapUiCalendarApp sapUiCalendarAppTitleOnly sapUiCalendarAppDummy" style=\'margin:0; height:0px;\'></div>');if(i.getShowSubIntervals()){var R=i.getIntervalType();var D=0;switch(R){case l.Hour:D=4;break;case l.Day:case l.Week:case l.OneMonth:D=24;break;case l.Month:var H=new e(h);H.setUTCMonth(H.getUTCMonth()+u+1,0);D=H.getUTCDate();H.setUTCDate(1);p=H.getUTCDay();break;default:break}var k=100/D;for(T=0;T<D;T++){a.write("<div");a.addClass("sapUiCalendarRowAppsSubInt");a.addStyle("width",k+"%");for(var N=0;N<w.length;N++){if((T+v)%C==w[N]){a.addClass("sapUiCalendarRowAppsNoWork");break}}a.writeStyles();a.writeClasses();a.write(">");a.write("</div>")}}a.write("</div>")};o.getLegendItems=function(e){var t=[],a,i=e.getLegend();if(i){a=sap.ui.getCore().byId(i);if(a){t=a.getItems()}else{n.error("CalendarLegend with id '"+i+"' does not exist!",e)}}return t};o.getAriaTextForType=function(e,t){var i,r,s,n;if(t&&t.length){for(var n=0;n<t.length;n++){s=t[n];if(s.getType()===e){i=s.getText();break}}}if(!i){r=a.getTypeAriaText(e);if(r){i=r.getText()}}return i};return o},true);
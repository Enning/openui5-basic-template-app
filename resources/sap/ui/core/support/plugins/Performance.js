/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/support/Plugin","sap/ui/performance/Measurement","sap/base/security/encodeXML"],function(e,t,i){"use strict";var r=[];var a=0;var n=0;var d=250;var s=false;var o;var l={selectedInterval:{start:0,end:0},nodes:{slider:null,handle:null,leftResizeHandle:null,rightResizeHandle:null},consts:{LEFT_HANDLE_ID:"left",RIGHT_HANDLE_ID:"right"},sizes:{width:0,handleWidth:0,handleMinWidth:10},drag:{handleClickOffsetX:0,handleOffsetLeft:0,isResize:false,whichResizeHandle:""}};var u=e.extend("sap.ui.core.support.plugins.Performance",{constructor:function(t){e.apply(this,["sapUiSupportPerf","Performance",t]);o=this;this._oStub=t;if(this.runsAsToolPlugin()){this._aEventIds=[this.getId()+"SetMeasurements",this.getId()+"SetActive"]}else{this._aEventIds=[this.getId()+"Refresh",this.getId()+"Clear",this.getId()+"Start",this.getId()+"End",this.getId()+"Activate"]}}});u.prototype.init=function(t){e.prototype.init.apply(this,arguments);if(this.runsAsToolPlugin()){f.call(this,t)}else{c.call(this,t)}};u.prototype.exit=function(t){e.prototype.exit.apply(this,arguments)};function f(e){var t=sap.ui.getCore().createRenderManager();t.write(y());t.flush(this.$().get(0));t.destroy();x()}function c(e){p.call(this)}function p(e){var i=t.getAllMeasurements(true);this._oStub.sendEvent(this.getId()+"SetMeasurements",{measurements:i})}u.prototype.onsapUiSupportPerfSetMeasurements=function(e){var t=e.getParameter("measurements");this.setData(t)};u.prototype.onsapUiSupportPerfRefresh=function(e){p.call(this)};u.prototype.onsapUiSupportPerfClear=function(e){t.clear();this._oStub.sendEvent(this.getId()+"SetMeasurements",{measurements:[]})};u.prototype.onsapUiSupportPerfStart=function(e){t.start(this.getId()+"-perf","Measurement by support tool")};u.prototype.onsapUiSupportPerfEnd=function(e){t.end(this.getId()+"-perf");p.call(this)};u.prototype.onsapUiSupportPerfActivate=function(e){t.setActive(true)};u.prototype.setData=function(e){var t=document.querySelector("#sapUiSupportNoDataOverlay");var i=document.querySelector("#slider");var a=document.querySelector("#sapUiSupportPerfHeaderTimelineOverview .timeline");if(e.length===0){t.style.display="block";i.classList.add("sapUiSupportHidden");a.innerHTML="";return}else{i.classList.remove("sapUiSupportHidden");t.style.display=""}r=JSON.parse(JSON.stringify(e));r=r.sort(function(e,t){return e.start-t.start});var d=e[0].start;r=r.map(function(e){e.start=parseFloat((e.start-d).toFixed(2));e.end=parseFloat((e.end-d).toFixed(2));e.uid=H();return e});n=r[r.length-1].end-r[0].start;l.selectedInterval.start=r[0].start;l.selectedInterval.end=r[r.length-1].end;k();T(r);z(r);C()};var h=10;var v=0;var m;function g(e){clearInterval(m);if(s){s=false;o._oStub.sendEvent(o.getId()+"End");e.target.setAttribute("data-state","Start recording ("+(v/1e3).toFixed(2)+" s)")}else{v=0;s=true;o._oStub.sendEvent(o.getId()+"Activate");o._oStub.sendEvent(o.getId()+"Clear");o._oStub.sendEvent(o.getId()+"Start");e.target.setAttribute("data-state","Stop recording ("+(v/1e3).toFixed(2)+" s)");m=setInterval(function(){v+=h;e.target.setAttribute("data-state","Stop recording ("+(v/1e3).toFixed(2)+" s)")},h)}}function y(){return""+'<section id="sapUiSupportPerf">'+'<section id="sapUiSupportNoDataOverlay"></section>'+'<section id="sapUiSupportPerfHeader">'+'<div class="sapUiSupportToolbar">'+'<label class="sapUiSupportLabel">Order:</label>'+'<select id="sapUiSupportPerfHeaderFilterSort" class="sapUiSupportTxtFld sapUiSupportSelect" name="orderBy">'+'<option value="chronologically">Chronologically</option>'+'<option value="time">By Time</option>'+'<option value="duration">By Duration</option>'+"</select>"+'<label class="sapUiSupportLabel">Min. Duration:</label>'+'<input id="sapUiSupportPerfHeaderFilterMinDuration" type="number" min="0" value="0" />'+'<label class="sapUiSupportLabel"> ms.</label>'+'<div class="flex-spacer"></div>'+'<div id="categories"></div>'+"</div>"+'<section id="sapUiSupportPerfHeaderTimelineOverview">'+'<div class="timeline"></div>'+'<button id="sapUiSupportPerfToggleRecordingBtn"></button>'+'<div id="slider">'+'<div id="slideHandle">'+'<span id="leftHandle"></span>'+'<span id="rightHandle"></span>'+"</div>"+"</div>"+"</section>"+"</section>"+'<section id="sapUiSupportPerfHeaderTimeline">'+'<div id="sapUiSupportPerfHeaderTimelineBarInfoWrapper"></div>'+'<div id="sapUiSupportPerfHeaderTimelineBarWrapper"></div>'+"</section>"+"</section>"}function S(e){return r.reduce(function(t,i){if(i.uid===e){t=i}return t},null)}function H(){return"uID-"+(H.id!==undefined?++H.id:H.id=0)}function x(){document.querySelector("#sapUiSupportPerfHeaderFilterSort").addEventListener("change",z,false);document.querySelector("#sapUiSupportPerfHeaderFilterMinDuration").addEventListener("change",z,false);document.querySelector("#categories").addEventListener("change",z,false);document.querySelector("#sapUiSupportPerfHeaderTimelineBarWrapper").addEventListener("mouseover",W,false);document.querySelector("#sapUiSupportPerfHeaderTimelineBarInfoWrapper").addEventListener("mouseover",W,false);window.addEventListener("resize",function(){z();X()},false);window.addEventListener("keydown",j);jQuery("#slideHandle").on("dblclick",k);jQuery("#sapUiSupportPerfToggleRecordingBtn").click(g).attr("data-state","Start recording")}function I(e,t){return"Duration: "+e.toFixed(2)+" ms.\nTime: "+t.toFixed(2)+" ms."}function L(e){var t=50;var i=n/t;var r=[];for(var a=0;a<t;a++){var d=i*a;var s=d+i;var o=A({start:d,end:s},e);var l=o.map(function(e){return{category:e.categories[0],duration:e.duration}});var u={_total:0};l.map(function(e){if(!u[e.category]){u[e.category]=0}u._total+=e.duration;u[e.category]=u[e.category]+e.duration});var f=o.map(function(e){return{category:e.categories[0],time:e.time}});var c={_total:0};f.map(function(e){if(!c[e.category]){c[e.category]=0}c._total+=e.time;c[e.category]=c[e.category]+e.time});r.push({duration:u,time:c})}return r}function T(e){var t=document.querySelector("#sapUiSupportPerfHeaderTimelineOverview .timeline");var i="<ol>";var r=JSON.parse(JSON.stringify(e));var a=r.map(function(e){return e.duration}).reduce(function(e,t){return e+t});var n=r.map(function(e){return e.time}).reduce(function(e,t){return e+t});var d=L(r);var s={time:{_total:0}};var o={duration:{_total:0}};d.forEach(function(e){if(s.time._total<e.time._total){s=e}if(o.duration._total<e.duration._total){o=e}});n=s.time._total;a=o.duration._total;function l(e,t){var i="";Object.keys(e.duration).sort().forEach(function(r){if(r!=="_total"){var a=e[t][r]/e[t]._total*100;i+='<div class="'+U(r)+'" style="height: '+a.toFixed(2)+'%;"></div>'}});return i}d.forEach(function(e){var t=Math.ceil(e.duration._total/a*100);var r=Math.ceil(e.time._total/n*100);var d="height: "+t+"%;";if(t>0){d+=" min-height: 1px;"}var s="height: "+r+"%;";if(r>0){s+=" min-height: 1px;"}i+="<li>";i+='<div class="bars-wrapper" title="'+I(e.duration._total,e.time._total)+'">';i+='<div class="duration" style="'+d+'">';i+=l(e,"duration");i+="</div>";i+='<div class="time" style="'+s+'">';i+=l(e,"time");i+="</div>";i+="</div></li>"});i+="</ol>";t.innerHTML=i}function z(){var e="<ol>";var t="<ol>";var i=B();var a=q(r,i);if(a.length===0){e+='<li class="line nodata" data-uid="'+-1+'"></li>';t+='<li class="line nodata" data-uid="'+-1+'"><div class="info line">No data</div></li>'}a.forEach(function(r){var a=S(r.uid);e+='<li data-uid="'+r.uid+'" class="line" title="'+b(a)+'"'+_(a)+"  >";e+='<div class="bar '+P(a.duration)+'" style="width: '+w(r.duration)+" margin-left: "+M(r,i.filterByTime.start)+'">';e+='<div class="sub-bar '+P(a.time)+'" style="width: '+w(r.time)+'"></div>';e+="</div>";e+="</li>";t+='<li data-uid="'+r.uid+'" title="'+b(a)+'" class="line '+U(a.categories[0])+'" '+_(a)+">";t+='<div class="info line">'+E(a)+" ("+a.time.toFixed(0)+" ms)</div>";t+="</li>"});e+="</ol>";t+="</ol>";document.querySelector("#sapUiSupportPerfHeaderTimelineBarWrapper").innerHTML=e;document.querySelector("#sapUiSupportPerfHeaderTimelineBarInfoWrapper").innerHTML=t;N(i);F()}function w(e){var t=e*a;var i=Math.max(t,1);return i+"px;"}function M(e,t){var i=(e.start-t)*a;return i.toFixed(0)+"px"}function b(e){return i(e.info+"\nduration: "+e.duration.toFixed(2)+" ms. \ntime: "+e.time.toFixed(2)+" ms. \nstart: "+e.start.toFixed(2)+" ms.\nend: "+e.end.toFixed(2)+" ms.")}function E(e){var t=e.info;t=t.substring(t.lastIndexOf("/")+1,t.length);t=t.substring(t.lastIndexOf("sap.m."),t.length);t=t.replace("Rendering of ","");return i(t)}function U(e){var t="unknownType";if(e.indexOf("require")!==-1){t="requireModuleType"}else if(e.indexOf("xmlhttprequest")!==-1){t="requestType"}else if(e.indexOf("javascript")!==-1){t="afterRenderingType"}else if(e.indexOf("rendering")!==-1){t="renderingType"}return i(t)}function P(e){var t="";if(e>200){t="oneTimeStyle"}if(e>500){t="twoTimeStyle"}if(e>1e3){t="threeTimeStyle"}if(e>2e3){t="fourTimeStyle"}if(e>3e3){t="fiveTimeStyle"}if(e>4e3){t="sixTimeStyle"}return t}function O(e){var t=[];e.forEach(function(e){if(t.indexOf(e.categories[0])===-1){t.push(e.categories[0])}});return t}function _(e){return"data-item-category = "+e.categories[0]}function W(e){var t=e.srcElement;if(t.classList.contains("info")&&t.nodeName==="DIV"){t=t.parentNode}if(t.nodeName==="LI"){var i=t.getAttribute("data-uid");var r=document.querySelector("#sapUiSupportPerfHeaderTimelineBarInfoWrapper li.hover");var a=document.querySelector("#sapUiSupportPerfHeaderTimelineBarWrapper li.hover");if(r&&a){r.classList.remove("hover");a.classList.remove("hover")}var n=document.querySelector('#sapUiSupportPerfHeaderTimelineBarInfoWrapper li[data-uid="'+i+'"]');var d=document.querySelector('#sapUiSupportPerfHeaderTimelineBarWrapper li[data-uid="'+i+'"]');if(n&&d){n.classList.add("hover");d.classList.add("hover")}}}function q(e,t){var i=JSON.parse(JSON.stringify(e));var r=document.querySelector("#sapUiSupportPerfHeaderTimeline").offsetWidth-document.querySelector("#sapUiSupportPerfHeaderTimelineBarInfoWrapper").offsetWidth;var n=20;var d=1;i=A(t.filterByTime,i);i=R(t.orderByValue,i);i=D(t.minValue,i);if(i.length){d=t.filterByTime.end-t.filterByTime.start}a=(r-n)/d;return i}function B(){var e={};var t=document.querySelector("#sapUiSupportPerfHeaderFilterSort");e.orderByValue=t.options[t.selectedIndex].value;e.minValue=document.querySelector("#sapUiSupportPerfHeaderFilterMinDuration").valueAsNumber||0;e.filterByTime={start:l.selectedInterval.start,end:l.selectedInterval.end};return e}function F(){var e=document.querySelectorAll("#categories input");function t(e,t){var i=U(e);var r=document.querySelectorAll('li[data-item-category="'+e+'"]');var a=document.querySelectorAll(".timeline .bars-wrapper ."+i);for(var n=0;n<r.length;n++){r[n].style.display=t?"":"none"}for(var d=0;d<a.length;d++){a[d].style.display=t?"":"none"}}for(var i=0;i<e.length;i++){t(e[i].name,e[i].checked)}}function R(e,t){if(e==="time"||e==="duration"){document.querySelector("body").classList.add("flattenBarOffset")}else{document.querySelector("body").classList.remove("flattenBarOffset")}if(e==="time"){t=t.sort(function(e,t){if(e.time>t.time){return-1}if(e.time<t.time){return 1}return 0})}if(e==="duration"){t=t.sort(function(e,t){if(e.duration>t.duration){return-1}if(e.duration<t.duration){return 1}return 0})}return t}function D(e,t){return t.filter(function(t){return t.duration>=e})}function A(e,t){return t.filter(function(t){return!(t.end<=e.start||t.start>=e.end)}).map(function(t){var i=Math.max(e.start-t.start,0);var r=Math.max(t.start+t.time-e.end,0);t.time=t.time-i-r;var a=Math.max(e.start-t.start,0);var n=Math.max(t.start+t.duration-e.end,0);t.duration=t.duration-a-n;t.start=Math.max(t.start,e.start);t.end=Math.min(t.end,e.end);return t})}function C(){var e="";var t=O(r);t.forEach(function(t){t=i(t);e+='<label title="'+t+'"><input class="'+U(t)+'" checked type="checkbox" name="'+t+'" />'+t+"</label>"});var a=document.querySelector("#categories");a.innerHTML=e}function N(e){var t=document.getElementById("sapUiSupportPerfHeaderTimelineBarWrapper");var i=Math.round(t.offsetWidth/10);var r=e.filterByTime.end-e.filterByTime.start;var a=parseInt(r/i);if(document.getElementById("grid")){document.getElementById("grid").parentNode.removeChild(document.getElementById("grid"))}var n=document.createElement("div");n.innerHTML='<div class="header"></div><div class="body"></div>';n.id="grid";for(var d=1;d<=i;d++){var s=document.createElement("div");var o=document.createElement("div");if(d%5===0||d===1){var l=parseInt(e.filterByTime.start);if(d!==1){l+=d*a}l=l>500?(l/1e3).toFixed(2)+" s":l+" ms";o.setAttribute("data-time",l)}n.querySelector(".body").appendChild(s);n.querySelector(".header").appendChild(o)}document.querySelector("#sapUiSupportPerf").appendChild(n)}function k(){l.nodes.slider=l.nodes.slider||document.querySelector("#slider");l.nodes.handle=l.nodes.handle||document.querySelector("#slideHandle");l.nodes.leftResizeHandle=l.nodes.leftResizeHandle||document.querySelector("#leftHandle");l.nodes.rightResizeHandle=l.nodes.rightResizeHandle||document.querySelector("#rightHandle");l.nodes.handle.style.left=0;l.nodes.handle.style.width="100%";X();l.nodes.slider.addEventListener("mousedown",J)}function X(){var e=window.getComputedStyle(l.nodes.handle).width;var t=l.sizes.width;l.sizes.handleWidth=parseInt(e);l.sizes.width=l.nodes.slider.offsetWidth;if(l.sizes.width!==l.sizes.handleWidth){K(t)}Q()}function J(e){var t=e.target.id;var i=d+l.sizes.handleWidth/2;var r=Math.max(e.clientX-i,0);var a=l.sizes.width-l.sizes.handleWidth;var n=Math.min(r,a);if(t===l.nodes.slider.id){l.nodes.handle.style.left=n+"px";l.drag.handleOffsetLeft=l.nodes.handle.offsetLeft;l.drag.isResize=false}else if(t===l.nodes.handle.id){l.drag.handleClickOffsetX=e.offsetX;l.drag.isResize=false}else if(t===l.nodes.leftResizeHandle.id){l.drag.whichResizeHandle=l.consts.LEFT_HANDLE_ID;l.drag.isResize=true}else if(t===l.nodes.rightResizeHandle.id){l.drag.whichResizeHandle=l.consts.RIGHT_HANDLE_ID;l.drag.isResize=true}else{return}window.addEventListener("mousemove",V);window.addEventListener("mouseup",G)}function V(e){e.stopImmediatePropagation();var t;var i=e.clientX-d;if(l.drag.isResize){$(e);return}var r=l.sizes.width-l.sizes.handleWidth+l.drag.handleClickOffsetX;t=Math.max(Math.min(i,r),l.drag.handleClickOffsetX);l.nodes.handle.style.left=t-l.drag.handleClickOffsetX+"px"}function j(e){var t=0;var i=37;var r=39;var a=5;if(e.keyCode!=i&&e.keyCode!=r){return}else if(e.keyCode==i){t=-a}else if(e.keyCode==r){t=a}var n=Math.min(l.drag.handleOffsetLeft+t,l.sizes.width-l.sizes.handleWidth);l.drag.handleOffsetLeft=Math.max(n,0);l.nodes.handle.style.left=l.drag.handleOffsetLeft+"px";Y();z()}function G(e){e.stopImmediatePropagation();window.removeEventListener("mousemove",V);window.removeEventListener("mouseup",G);Q()}function Q(){var e=window.getComputedStyle(l.nodes.handle).width;l.sizes.handleWidth=parseInt(e);l.drag.handleOffsetLeft=l.nodes.handle.offsetLeft;var t="(Double click to expand)";l.nodes.slider.setAttribute("title",t);Y();z()}function $(e){e.stopImmediatePropagation();var t;var i;var r;var a;var n;var s;var o=e.clientX-d;var u=9;if(l.drag.whichResizeHandle===l.consts.RIGHT_HANDLE_ID){a=o-l.drag.handleOffsetLeft;t=Math.max(a,l.sizes.handleMinWidth);i=l.sizes.width-l.drag.handleOffsetLeft;r=Math.min(t,i);l.nodes.handle.style.width=r+"px"}if(l.drag.whichResizeHandle===l.consts.LEFT_HANDLE_ID){t=l.drag.handleOffsetLeft+l.sizes.handleWidth-l.sizes.handleMinWidth;o=Math.max(Math.min(o,t),0);i=l.drag.handleOffsetLeft+l.sizes.handleWidth;n=Math.min(o,l.sizes.width);s=Math.max(Math.max(n,-2*l.sizes.handleMinWidth),u);r=i-s+9;if(r<=u+l.sizes.handleMinWidth){r-=u;s+=u}l.nodes.handle.style.left=s-u+"px";l.nodes.handle.style.width=r+"px"}}function K(e){var t=l.sizes.width-e;var i=l.sizes.width-l.drag.handleOffsetLeft;var r=l.sizes.handleWidth+t;l.sizes.handleWidth=Math.max(l.sizes.handleMinWidth,Math.min(r,i));l.nodes.handle.style.width=l.sizes.handleWidth+"px";if(l.sizes.width<l.drag.handleOffsetLeft+l.sizes.handleWidth){l.drag.handleOffsetLeft=l.sizes.width-l.sizes.handleWidth;l.nodes.handle.style.left=l.drag.handleOffsetLeft+"px"}}function Y(){if(!r.length){return}var e=l.drag.handleOffsetLeft/l.sizes.width*100;var t=e+l.sizes.handleWidth/l.sizes.width*100;var i=r[r.length-1].end/100;l.selectedInterval.start=(e*i).toFixed(0);l.selectedInterval.end=(t*i).toFixed(0)}return u});
/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/base/util/ObjectPath","sap/base/Log","sap/ui/VersionInfo"],function(e,i,n,a){"use strict";var t={};t._aControlsThatCannotBeRenderedGenerically=["sap.ui.comp.smartform.Group","sap.ui.comp.smartform.GroupElement","sap.ui.core.UIComponent","sap.ui.core.mvc.HTMLView","sap.ui.core.mvc.JSONView","sap.ui.core.mvc.JSView","sap.ui.core.mvc.XMLView","sap.ui.core.mvc.TemplateView","sap.ui.core.mvc.View","sap.ui.core.tmpl.Template","sap.m.FacetFilterItem","sap.m.LightBox","sap.m.Menu","sap.m.NotificationListItem","sap.m.NotificationListBase","sap.m.internal.NumericInput","sap.m.QuickViewBase","sap.m.QuickViewGroup","sap.m.QuickViewGroupElement","sap.m.TabStripItem","sap.m.TimePickerSlider","sap.m.TimePickerSliders","sap.m.UploadCollectionToolbarPlaceholder","sap.m.Wizard","sap.tnt.NavigationList","sap.ui.demokit.IndexLayout._Tile","sap.ui.layout.BlockLayoutRow","sap.ui.richtexteditor.RichTextEditor","sap.ui.richtexteditor.ToolbarWrapper","sap.ui.suite.TaskCircle","sap.ui.table.ColumnMenu","sap.ui.unified.Menu","sap.ui.ux3.ActionBar","sap.ui.ux3.ExactList.LB","sap.ui.ux3.NotificationBar","sap.ui.rta.ContextMenu","sap.ui.rta.AddElementsDialog","sap.ui.comp.valuehelpdialog.ValueHelpDialog","sap.chart.Chart","sap.makit.Chart","sap.me.TabContainer","sap.suite.ui.microchart.InteractiveBarChart","sap.suite.ui.microchart.InteractiveDonutChart","sap.uxap.AnchorBar","sap.uxap.BlockBase","sap.uxap.BreadCrumbs","sap.uxap.ObjectPageHeader","sap.uxap.ObjectPageSubSection","sap.uiext.inbox.SubstitutionRulesManager","sap.uiext.inbox.composite.InboxTaskTitleControl","sap.uiext.inbox.InboxFormattedTextView","sap.uiext.inbox.InboxToggleTextView","sap.uiext.inbox.InboxTaskDetails","sap.viz.ui5.controls.common.BaseControl","sap.viz.ui5.controls.VizRangeSlider","sap.viz.ui5.core.BaseChart","sap.viz.ui5.controls.VizTooltip"];t.controlCanBeRendered=function(e){if(!t.controlCanBeInstantiated(e)){return false}if(t._aControlsThatCannotBeRenderedGenerically.indexOf(e)>-1){return false}return true};t.controlCanBeInstantiated=function(e){if(["sap.ui.codeeditor.CodeEditor","sap.ui.demokit.IndexLayout._Tile","sap.ui.commons.SearchField","sap.ui.commons.SearchField.CB","sap.ui.commons.SearchFieldCB","sap.ui.commons.Tab","sap.ui.comp.transport.TransportDialog","sap.ui.core.ComponentContainer","sap.ui.core.mvc.View","sap.ui.core.mvc.XMLView","sap.ui.core.XMLComposite","sap.ui.core.mvc.JSView","sap.ui.core.mvc.JSONView","sap.ui.core.mvc.HTMLView","sap.ui.core.mvc.TemplateView","sap.ui.mdc.FilterBar","sap.ui.mdc.XMLComposite","sap.ui.mdc.ValueHelpDialog","sap.ui.mdc.FilterField","sap.ui.mdc.odata.v4.microchart.MicroChart","sap.makit.Chart","sap.ui.rta.AddElementsDialog","sap.ui.rta.ContextMenu"].indexOf(e)>-1){return false}var n=i.get(e);if(!n){return false}var a=n.getMetadata();if(a.isAbstract()){return false}return true};var r=["sap.ui.core","sap.chart","sap.f","sap.m","sap.makit","sap.me","sap.ndc","sap.suite.ui.microchart","sap.tnt","sap.ui.codeeditor","sap.ui.commons","sap.ui.comp","sap.ui.dt","sap.ui.fl","sap.ui.integration","sap.ui.generic.app","sap.ui.generic.template","sap.ui.layout","sap.ui.mdc","sap.ui.richtexteditor","sap.ui.rta","sap.ui.suite","sap.ui.table","sap.ui.unified","sap.ui.ux3","sap.uxap","sap.viz"];t.isKnownRuntimeLayerLibrary=function(e){return r.indexOf(e)>-1};function o(e){return a.load().then(function(i){var a=sap.ui.getCore().getLoadedLibraries(),t,r,o=[],u;var s=function(){u=true};var c=function(){};for(r=0;r<i.libraries.length;r++){t=i.libraries[r].name;if(!a[t]&&(!e||e(t))){n.info("Libary '"+t+"' is not loaded!");try{o.push(sap.ui.getCore().loadLibrary(t,true).then(s)).catch(c)}catch(e){}}}return Promise.all(o).then(function(){if(u){a=sap.ui.getCore().getLoadedLibraries()}for(var i in a){if(e&&!e(i)){delete a[i]}}return a})})}function u(e,i){var a=sap.ui.getCore().getLoadedLibraries(),r,o,u,s;u=sap.ui.getVersionInfo();for(s=0;s<u.libraries.length;s++){r=u.libraries[s].name;if(jQuery.inArray(r,e)===-1&&!a[r]){n.info("Libary '"+r+"' is not loaded!");try{sap.ui.getCore().loadLibrary(r);o=true}catch(e){}}}if(o){a=sap.ui.getCore().getLoadedLibraries()}e.forEach(function(e){a[e]=undefined});if(!i){for(var c in a){if(!t.isKnownRuntimeLayerLibrary(c)){a[c]=undefined}}}return a}function s(e){var i=sap.ui.getCore().getLoadedLibraries(),n,a;for(a=0;a<e.length;a++){if(!i[e[a]]){sap.ui.getCore().loadLibrary(e[a]);n=true}}if(n){i=sap.ui.getCore().getLoadedLibraries()}for(var t in i){if(e.indexOf(t)===-1){i[t]=undefined}}return i}var c=function(e,i,n,a){var t=e?s(e):u(i,n);a.test("Should load at least one library and some controls",function(e){e.expect(2);var i=false;for(var n in t){if(t[n]){if(!i){e.ok(t[n],"Should have loaded at least one library");i=true}var a=t[n].controls?t[n].controls.length:0;if(a>0){e.ok(a>0,"Should find at least 10 controls in a library");break}}}});return t};var l=function(e,i,n,a,r){if(!e){return false}if(i.length){if(i.indexOf(e)===-1){return false}}else if(n.indexOf(e)>-1){return false}if(!a&&!t.controlCanBeRendered(e)){return false}if(!r&&!t.controlCanBeInstantiated(e)){return false}return true};var d=function(e,i,n,a,t,r){return new Promise(function(o,u){var s=0;var c=function(u){if(u<e.length){var l=e[u];p(l,i,n,a,t,r).then(function(e){if(e){s++}c(u+1)})}else{o(s)}};c(0)})};function p(e,n,a,r,o,u){return new Promise(function(s){var c=false;if(l(e,n,a,r,o)){c=true;var d=i.get(e||"");u(e,d,{canInstantiate:t.controlCanBeInstantiated(e),canRender:t.controlCanBeRendered(e)})}window.setTimeout(function(){s(c)},0)})}t.run=function(e,i){window.setTimeout(function(){f(e,i)},1)};t.getAllControlNames=function(e){return o(e).then(function(e){var i=[];Object.keys(e).forEach(function(n){var a=e[n];if(a.controls){i=i.concat(a.controls)}if(a.elements){i=i.concat(a.elements)}});return i})};function f(e,i){if(!i){i={}}var n=i.done||function(){};var a=i.librariesToTest||undefined;var t=i.excludedLibraries||[];var r=i.controlsToTest||[];var o=i.excludedControls||[];var u=i.includeDistLayer!==undefined?i.includeDistLayer:false;var s=i.includeElements!==undefined?i.includeElements:false;var l=i.includeNonRenderable!==undefined?i.includeNonRenderable:true;var d=i.includeNonInstantiable!==undefined?i.includeNonInstantiable:false;var p=i.qunit;if(p){p.test("Checking the given QUnit object",function(e){e.ok(true,"The given QUnit should be able to assert")})}else{var f=function(){};var b={ok:function(e,i){if(!e){throw new Error(i)}},expect:f};p={module:f,test:function(e,i){i(b)}}}p.test("Checking the given options",function(e){e.ok(i.librariesToTest===undefined||jQuery.isArray(i.librariesToTest),"The given librariesToTest must be undefined or an array, but is: "+i.librariesToTest);e.ok(i.excludedLibraries===undefined||jQuery.isArray(i.excludedLibraries),"The given excludedLibraries must be undefined or an array, but is: "+i.excludedLibraries);e.ok(i.excludedControls===undefined||jQuery.isArray(i.excludedControls),"The given excludedControls must be undefined or an array, but is: "+i.excludedControls);e.ok(i.includeDistLayer===undefined||typeof i.includeDistLayer==="boolean","The given includeDistLayer must be undefined or a boolean, but is: "+i.includeDistLayer);e.ok(i.includeElements===undefined||typeof i.includeElements==="boolean","The given includeElements must be undefined or a boolean, but is: "+i.includeElements);e.ok(i.includeNonRenderable===undefined||typeof i.includeNonRenderable==="boolean","The given includeNonRenderable must be undefined or a boolean, but is: "+i.includeNonRenderable);e.ok(i.includeNonInstantiable===undefined||typeof i.includeNonInstantiable==="boolean","The given includeNonInstantiable must be undefined or a boolean, but is: "+i.includeNonInstantiable);e.ok(n===undefined||typeof n==="function","The given done callback must be undefined or a function, but is: "+n)});var v=c(a,t,u,p);m(v,s,r,o,l,d,e).then(function(e){n({testedControlCount:e[0],testedLibraryCount:e[1]})})}function m(e,i,n,a,t,r,o){return new Promise(function(u){var s=0,c=0;var l=[];for(var d in e){l.push(d)}var p=function(d){if(d<l.length){var f=l[d];b(e,f,i,n,a,t,r,o).then(function(e){s+=e[0];if(e[1]){c++}p(d+1)})}else{u([s,c])}};p(0)})}function b(e,i,n,a,t,r,o,u){return new Promise(function(s){var c=e[i];if(!c){s([0,false]);return}var l=c.controls;if(n){l=l.concat(c.elements.slice())}d(l,a,t,r,o,u).then(function(e){s([e,true])})})}return t},true);
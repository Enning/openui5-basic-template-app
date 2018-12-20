/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(n,e){"use strict";var t,i,r,o;t=document.querySelector("[src$='runTest.js']");if(t){i=/^([^?#]*\/)?runTest.js/.exec(t.getAttribute("src"));if(i){r=i[1]+"../../../../"}}if(r==null){throw new Error("runTest.js: could not identify script tag!")}o=/(?:^|\?|&)coverage(?:&|=|$)/.test(window.location.search);function u(n,e){var t=n.length,i=0;function o(n){t--;if(n.type==="error"){i++}n.target.removeEventListener("load",o);n.target.removeEventListener("error",o);if(t===0&&i===0&&e){e()}}for(var u=0;u<n.length;u++){var s=document.createElement("script");s.addEventListener("load",o);s.addEventListener("error",o);s.src=r+n[u];document.head.appendChild(s)}}window["sap-ui-optimized"]=window["sap-ui-optimized"]||/\.head/.test(u)&&!/pending/.test(u);window["sap-ui-debug-no-reboot"]=true;u(["sap/ui/thirdparty/baseuri.js","sap/ui/thirdparty/es6-promise.js","sap/ui/thirdparty/es6-string-methods.js","sap/ui/thirdparty/es6-object-assign.js"],function(){u(["ui5loader.js"],function(){sap.ui.loader.config({async:!o});u(["ui5loader-autoconfig.js"],function(){sap.ui.require(n,e)})})})})(["sap/base/util/UriParameters","sap/ui/test/starter/_utils"],function(n,e){"use strict";function t(n){return Array.isArray(n)?n:[n]}function i(n){return new Promise(function(e,i){sap.ui.require(t(n),function(){e(Array.prototype.slice.call(arguments))},i)})}function r(n,e,t){if(e){for(var i in e){if(Object.prototype.hasOwnProperty.call(t,i)){n[i]=e[i]}}}return n}function o(){function n(n){if(document.body.querySelector("#"+n)==null){var e=document.createElement("div");e.id=n;document.body.insertBefore(e,document.body.firstChild)}}return e.whenDOMReady().then(function(){n("qunit");n("qunit-fixture")})}function u(n){var e=n.sourceFile+":"+n.lineNumber+":"+n.columnNumber,t="Security policy violation: directive '"+n.violatedDirective+"'";if(n.blockedURI){t+=" violated by '"+String(n.blockedURI).slice(0,20)+"'"}if(QUnit.config.current){QUnit.pushFailure(t,e)}else{throw new Error(t+" at "+e)}}var s={altertitle:1,collapse:1,filter:1,fixture:1,hidepassed:1,maxDepth:1,module:1,moduleId:1,notrycatch:1,noglobals:1,seed:1,reorder:1,requireExpects:1,testId:1,testTimeout:1,scrolltop:1};function a(n){var t,a,c,l,f,d,p,h,v,y;document.title=n.title;if(n.loader){sap.ui.loader.config(n.loader)}if(n.runAfterLoader){t=i(n.runAfterLoader)}else{t=Promise.resolve()}if(n.qunit.version==="edge"||n.qunit.version===true){n.qunit.version=2}if(typeof n.qunit.version==="number"){if(n.qunit.version===1){h="sap/ui/thirdparty/qunit";v="sap/ui/thirdparty/qunit.css"}else if(n.qunit.version===2){h="sap/ui/thirdparty/qunit-2";v="sap/ui/thirdparty/qunit-2.css"}else{throw new TypeError("unsupported qunit version "+n.qunit.version)}window.QUnit=window.QUnit||{};QUnit.config=QUnit.config||{};if(n.qunit!=null&&typeof n.qunit==="object"){r(QUnit.config,n.qunit,s)}QUnit.config.autostart=false;a=t.then(function(){e.addStylesheet(v);return i(h)}).then(function(){y=[];QUnit.jUnitDone=function(n){y.push(n)};return i("sap/ui/qunit/qunit-junit")}).then(function(){delete QUnit.jUnitDone;return i("sap/ui/thirdparty/qunit-reporter-junit")}).then(function(){y.forEach(function(n){QUnit.jUnitDone(n)});y=undefined})}if(n.sinon.version==="edge"||n.sinon.version===true){n.sinon.version=4}if(typeof n.sinon.version==="number"){var g,w;if(n.sinon.version===1){g="sap/ui/thirdparty/sinon";w="sap/ui/thirdparty/sinon-qunit"}else if(n.sinon.version===4){g="sap/ui/thirdparty/sinon-4";w="sap/ui/qunit/sinon-qunit-bridge"}else{throw new TypeError("unsupported sinon version "+n.sinon.version)}c=t.then(function(){return i(g)});if(n.sinon.qunitBridge&&a){l=Promise.all([a,c]).then(function(){return i(w)})}if(n.sinon!=null&&typeof n.sinon==="object"){f=Promise.all([c,l]).then(function(){sinon.config=r(sinon.config||{},n.sinon,sinon.defaultConfig);return arguments})}}else if(h){sap.ui.loader.config({shim:{"sap/ui/thirdparty/sinon-qunit":{deps:[h,"sap/ui/thirdparty/sinon"]},"sap/ui/qunit/sinon-qunit-bridge":{deps:[h,"sap/ui/thirdparty/sinon-4"]}}})}d=a.then(function(){if(QUnit.urlParams.coverage){return i("sap/ui/thirdparty/blanket").then(function(){if(n.coverage&&window.blanket){if(n.coverage.only!=null){window.blanket.options("sap-ui-cover-only",n.coverage.only)}if(n.coverage.never!=null){window.blanket.options("sap-ui-cover-never",n.coverage.never)}if(n.coverage.branchTracking){window.blanket.options("branchTracking",true)}}return i("sap/ui/qunit/qunit-coverage")}).then(function(){QUnit.config.autostart=false})}else{return i(["sap/ui/qunit/qunit-coverage"])}}).then(function(){if(QUnit.urlParams["sap-ui-xx-csp-policy"]){document.addEventListener("securitypolicyviolation",u);QUnit.done(function(){document.removeEventListener("securitypolicyviolation",u)})}QUnit.config.urlConfig.push({id:"sap-ui-xx-csp-policy",label:"CSP",value:{"sap-target-level-1:report-only":"Level 1","sap-target-level-2:report-only":"Level 2"},tooltip:"What Content-Security-Policy should the server send"})});p=Promise.all([t,a,c,l,f,d]);if(n.beforeBootstrap){p=p.then(function(){return i(n.beforeBootstrap)})}window["sap-ui-config"]=n.ui5||{};if(Array.isArray(window["sap-ui-config"].libs)){window["sap-ui-config"].libs=window["sap-ui-config"].libs.join(",")}if(n.bootCore){p=p.then(function(){return new Promise(function(n,e){sap.ui.require(["sap/ui/core/Core"],function(e){e.boot();e.attachInit(n)})})})}return p.then(function(){if(n.autostart){return i(n.module).then(function(n){return Promise.all(n)}).then(function(){return o()}).then(function(){QUnit.start()})}else{return o().then(function(){return i(n.module).then(function(n){return Promise.all(n)})})}})}var c=new n(window.location.href),l=e.getAttribute("data-sap-ui-testsuite")||c.get("testsuite"),f=e.getAttribute("data-sap-ui-test")||c.get("test");e.getSuiteConfig(l).then(function(n){var e=n.tests[f];if(!e){throw new TypeError("Invalid test name")}return a(e)}).catch(function(n){console.error(n.stack||n);if(typeof QUnit!=="undefined"){QUnit.test("Test Starter",function(){throw n});QUnit.start()}else{e.whenDOMReady().then(function(){document.body.innerHTML="<pre style='color:red;'>"+e.encode(n.stack||n.message||String(n))+"</pre>"})}})});
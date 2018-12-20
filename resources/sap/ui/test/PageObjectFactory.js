/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/test/Opa","sap/ui/base/Object","sap/base/Log"],function(e,a,t,r){"use strict";var n=t.extend("sap.ui.test.PageObjectFactory");n.create=function(e,a){var t={};for(var r in e){if(!e.hasOwnProperty(r)){continue}var n=e[r].baseClass||a;var i=e[r].namespace||"sap.ui.test.opa.pageObject";var o=e[r].viewName||"";var c=e[r].actions;s(c,"actions",r,n,t,i,o);var p=e[r].assertions;s(p,"assertions",r,n,t,i,o)}return t};function s(e,a,t,r,n,s,p){if(e){var u=i(s,t,a);var f=o(e,u,r,p);c(f,a,t,n)}}function i(a,t,n){var s=a+"."+t+"."+n;var i=e.sap.getObject(s,NaN);if(i){r.error("Opa5 Page Object namespace clash: You have loaded multiple page objects with the same name. To prevent overriding themself, specify the namespace parameter.")}return s}function o(a,t,r,n){var s=r.extend(t);for(var i in a){if(a.hasOwnProperty(i)){s.prototype[i]=a[i]}}var o=new s;if(n&&o.waitFor){var c=o.waitFor;o.waitFor=function(a){return c.call(this,e.extend(true,{viewName:n},a))}}return o}function c(e,t,r,n){if(t==="actions"){a.config.arrangements[r]=e;a.config.actions[r]=e}else if(t==="assertions"){a.config.assertions[r]=e}n[r]=n[r]||{};n[r][t]=e}return n});
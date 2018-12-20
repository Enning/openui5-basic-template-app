/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var r=function(){var r={};r.getBytesFromString=function(r){var t=[];for(var n=0;n<r.length;++n){t.push(r.charCodeAt(n))}return t};r.createHexString=function(r){var t="";for(var n=0;n<r.length;n++){var a=r[n].toString(16);a=Array(2-a.length+1).join("0")+a;t+=a}return t};r.passportHeader=function(t,n,a){var e=[42,84,72,42,3,1,48,0,0,83,65,80,95,69,50,69,95,84,65,95,80,108,117,103,73,110,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,0,83,65,80,95,69,50,69,95,84,65,95,85,115,101,114,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,83,65,80,95,69,50,69,95,84,65,95,82,101,113,117,101,115,116,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,5,83,65,80,95,69,50,69,95,84,65,95,80,108,117,103,73,110,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,52,54,51,53,48,48,48,48,48,48,51,49,49,69,69,48,65,53,68,50,53,48,57,57,57,67,51,57,50,66,54,56,32,32,32,0,7,70,53,0,0,0,49,30,224,165,210,78,219,178,228,75,104,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,226,42,84,72,42,1,0,39,0,0,2,0,3,0,2,0,1,4,0,8,88,0,2,0,2,4,0,8,48,0,2,0,3,2,0,11,0,0,0,0,42,84,72,42,1,0,35,1,0,1,0,1,0,2,0,1,3,0,23,0,171,205,239,171,205,239,171,205,239,171,205,239,171,205,239,42,84,72,42];var o=[372,32];var i=[149,32];var c=[9,32];var u=[117,32];var s=[7,2];var g=r.getBytesFromString("SAP_E2E_TA_UI5LIB");g=g.concat(r.getBytesFromString(new Array(32+1-g.length).join(" ")));e.splice.apply(e,c.concat(g));e.splice.apply(e,u.concat(g));e.splice.apply(e,i.concat(r.getBytesFromString(a)));e.splice.apply(e,s.concat(t));var p=r.createHexString(e).toUpperCase();return p.substring(0,o[0]).concat(n)+p.substring(o[0]+o[1])};r.traceFlags=function(r){switch(r){case"low":return[0,0];case"medium":return[137,10];case"high":return[159,13];default:var t=[];t.push((parseInt(r,16)&65280)/256);t.push(parseInt(r,16)&255);return t}};r.createGUID=function(){var r=function(){var r=Math.floor(Math.random()*65536);return new Array(4+1-r.toString(16).length).join("0")+r.toString(16)};var t=function(){var r=(Math.floor(Math.random()*65536)&4095)+16384;return new Array(4+1-r.toString(16).length).join("0")+r.toString(16)};var n=function(){var r=(Math.floor(Math.random()*65536)&16383)+32768;return new Array(4+1-r.toString(16).length).join("0")+r.toString(16)};var a=r()+r()+r()+t()+n()+r()+r()+r();return a.toUpperCase()};return r}();return r},true);
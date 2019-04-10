/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert"],function(t){"use strict";var e="state.key_";var n=function(r,i){var s="unknown",o=(i||e)+"-",u;if(!r||typeof r==="string"){s=r||n.Type.session;try{u=window[s+"Storage"];if(u){var f=o+"___sapui5TEST___";u.setItem(f,"1");u.removeItem(f)}}catch(t){u=null}}else if(typeof r==="object"){s=r.getType?r.getType():"unknown";u=r}var a=function(t){try{if(this.isSupported()){t();return true}}catch(t){return false}return false}.bind(this);this.isSupported=function(){return typeof u.isSupported=="function"?u.isSupported():true};this.put=function(e,n){t(typeof e==="string"&&e.length>0,"key must be a non-empty string");return a(function(){u.setItem(o+e,JSON.stringify(n))})};this.get=function(e){t(typeof e==="string"&&e.length>0,"key must be a non-empty string");var n;a(function(){n=JSON.parse(u.getItem(o+e))});return n!==undefined?n:null};this.remove=function(e){t(typeof e==="string"&&e.length>0,"key must be a non-empty string");return a(function(){u.removeItem(o+e)})};this.removeAll=function(t){return a(function(){var e,n=o+(t||"");for(var r=0,i=u.length;r<i;){e=u.key(r);if(e&&e.startsWith(n)){u.removeItem(e)}else{r++}}})};this.clear=function(){return a(function(){u.clear()})};this.getType=function(){return s}};n.Type={local:"local",session:"session"};Object.assign(n,new n);return n});
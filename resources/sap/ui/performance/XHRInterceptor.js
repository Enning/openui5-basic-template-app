/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t="XHRInterceptor";var n=Object.create(null);var r=Object.create(null);var i=Object.create(null);function u(e,t){r[e]=[];i[e]=window.XMLHttpRequest.prototype[e];window.XMLHttpRequest.prototype[e]=function(){var t=arguments;i[e].apply(this,t);r[e].forEach(function(e){e.apply(this,t)}.bind(this))}}function f(e,t,i){n[e]=n[e]||{};var u=n[e][t];if(u){var f=r[t].indexOf(u);r[t][f]=i}else{n[e][t]=i;r[t].push(i)}}var o={register:function(n,i,o){e.debug("Register '"+n+"' for XHR function '"+i+"'",t);if(!r[i]){u(i,o)}f(n,i,o)},unregister:function(i,u){var f=this.isRegistered(i,u);if(f){r[u]=r[u].filter(function(e){return e!==n[i][u]});delete n[i][u];if(Object.keys(n[i]).length===0){delete n[i]}}e.debug("Unregister '"+i+"' for XHR function '"+u+(f?"'":"' failed"),t);return f},isRegistered:function(e,t){return n[e]&&n[e][t]}};return o});
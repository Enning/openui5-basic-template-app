/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function e(t,r){if(t.childElementCount!=r.childElementCount||t.tagName!=r.tagName){t.parentNode.replaceChild(r,t);return false}if(t.isEqualNode(r)){return true}var n=t.attributes;for(var i=0,u=n.length;i<u;i++){var l=n[i].name;if(r.getAttribute(l)===null){t.removeAttribute(l);u=u-1;i=i-1}}var a=r.attributes;for(var i=0,u=a.length;i<u;i++){var l=a[i].name,o=t.getAttribute(l),d=r.getAttribute(l);if(o===null||o!==d){t.setAttribute(l,d)}}var f=r.childNodes.length;if(!f&&!t.hasChildNodes()){return true}if(!r.childElementCount){if(!f){t.textContent=""}else if(f==1&&r.firstChild.nodeType==3){t.textContent=r.textContent}else{t.innerHTML=r.innerHTML}return true}for(var i=0,s=0,u=f;i<u;i++){var h=t.childNodes[i],c=r.childNodes[i-s];if(c.nodeType==1){if(!e(h,c)){s=s+1}}else{h.nodeValue=c.nodeValue}}return true}return e});
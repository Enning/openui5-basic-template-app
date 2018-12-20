/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/format/NumberFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/ODataUtils","sap/ui/model/odata/type/ODataType","sap/ui/thirdparty/jquery"],function(t,e,i,n,r,a,o,s){"use strict";var u=/^[-+]?(\d+)(?:\.(\d+))?$/;function l(t){var i,n;if(!t.oFormat){i={groupingEnabled:true,maxIntegerDigits:Infinity};n=m(t);if(n!==Infinity){i.minFractionDigits=i.maxFractionDigits=n}i=s.extend(i,t.oFormatOptions);i.parseAsString=true;t.oFormat=e.getFloatInstance(i)}return t.oFormat}function m(t){return t.oConstraints&&t.oConstraints.scale||0}function f(t,e){return sap.ui.getCore().getLibraryResourceBundle().getText(t,e)}function c(e,i){var n,r,a,o,s;function l(i,n){t.warning("Illegal "+n+": "+i,null,e.getName())}function m(t,e,i,n){var r=typeof t==="string"?parseInt(t):t;if(r===undefined){return e}if(typeof r!=="number"||isNaN(r)||r<i){l(t,n);return e}return r}function f(t,e){if(t){if(t.match(u)){return t}l(t,e)}}function c(t,e){if(t===true||t==="true"){return true}if(t!==undefined&&t!==false&&t!=="false"){l(t,e)}}function p(t,i,n){if(i!==n){e.oConstraints=e.oConstraints||{};e.oConstraints[t]=i}}e.oConstraints=undefined;if(i){n=i.nullable;a=i.precision;s=i.scale;o=s==="variable"?Infinity:m(s,0,0,"scale");r=m(a,Infinity,1,"precision");if(o!==Infinity&&r<=o){t.warning("Illegal scale: must be less than precision (precision="+a+", scale="+s+")",null,e.getName());o=Infinity}p("precision",r,Infinity);p("scale",o,0);if(n===false||n==="false"){p("nullable",false,true)}else if(n!==undefined&&n!==true&&n!=="true"){l(n,"nullable")}p("minimum",f(i.minimum,"minimum"));p("minimumExclusive",c(i.minimumExclusive,"minimumExclusive"));p("maximum",f(i.maximum,"maximum"));p("maximumExclusive",c(i.maximumExclusive,"maximumExclusive"))}e._handleLocalizationChange()}var p=o.extend("sap.ui.model.odata.type.Decimal",{constructor:function(t,e){o.apply(this,arguments);this.oFormatOptions=t;c(this,e)}});p.prototype.formatValue=function(t,e){if(t===null||t===undefined){return null}switch(this.getPrimitiveType(e)){case"any":return t;case"float":return parseFloat(t);case"int":return Math.floor(parseFloat(t));case"string":return l(this).format(t);default:throw new i("Don't know how to format "+this.getName()+" to "+e)}};p.prototype.parseValue=function(t,i){var r;if(t===null||t===""){return null}switch(this.getPrimitiveType(i)){case"string":r=l(this).parse(t);if(!r){throw new n(sap.ui.getCore().getLibraryResourceBundle().getText("EnterNumber"))}if(r.indexOf(".")>=0){r=r.replace(/0+$/,"").replace(/\.$/,"")}break;case"int":case"float":r=e.getFloatInstance({maxIntegerDigits:Infinity,decimalSeparator:".",groupingEnabled:false}).format(t);break;default:throw new n("Don't know how to parse "+this.getName()+" from "+i)}return r};p.prototype._handleLocalizationChange=function(){this.oFormat=null};p.prototype.validateValue=function(t){var e,i,n,o,s,l,c,p,h;if(t===null&&(!this.oConstraints||this.oConstraints.nullable!==false)){return}if(typeof t!=="string"){throw new r(f("EnterNumber"))}n=u.exec(t);if(!n){throw new r(f("EnterNumber"))}i=n[1].length;e=(n[2]||"").length;h=m(this);p=this.oConstraints&&this.oConstraints.precision||Infinity;l=this.oConstraints&&this.oConstraints.minimum;o=this.oConstraints&&this.oConstraints.maximum;if(e>h){if(h===0){throw new r(f("EnterInt"))}else if(i+h>p){throw new r(f("EnterNumberIntegerFraction",[p-h,h]))}throw new r(f("EnterNumberFraction",[h]))}if(h===Infinity){if(i+e>p){throw new r(f("EnterNumberPrecision",[p]))}}else if(i>p-h){throw new r(f("EnterNumberInteger",[p-h]))}if(l){c=this.oConstraints.minimumExclusive;if(a.compare(l,t,true)>=(c?0:1)){throw new r(f(c?"EnterNumberMinExclusive":"EnterNumberMin",[this.formatValue(l,"string")]))}}if(o){s=this.oConstraints.maximumExclusive;if(a.compare(o,t,true)<=(s?0:-1)){throw new r(f(s?"EnterNumberMaxExclusive":"EnterNumberMax",[this.formatValue(o,"string")]))}}};p.prototype.getName=function(){return"sap.ui.model.odata.type.Decimal"};return p});
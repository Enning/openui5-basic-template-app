/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AnnotationHelperBasics","sap/base/Log","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/core/format/DateFormat","sap/ui/model/odata/ODataUtils","sap/ui/performance/Measurement"],function(e,t,r,a,n,i,s){"use strict";var o="sap.ui.model.odata.AnnotationHelper",u="\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])",l="[-+]?\\d+(?:\\.\\d+)?",p="9007199254740991",c="-"+p,d=[o],m=o+"/getExpression",f="(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(\\.\\d{1,12})?)?",g={Bool:/^true$|^false$/i,Float:new RegExp("^"+l+"(?:[eE][-+]?\\d+)?$|^NaN$|^-INF$|^INF$"),Date:new RegExp("^"+u+"$"),DateTimeOffset:new RegExp("^"+u+"T"+f+"(?:Z|[-+](?:0\\d|1[0-3]):[0-5]\\d|[-+]14:00)$","i"),Decimal:new RegExp("^"+l+"$"),Guid:/^[A-F0-9]{8}-(?:[A-F0-9]{4}-){3}[A-F0-9]{12}$/i,Int:/^[-+]?\d{1,19}$/,TimeOfDay:new RegExp("^"+f+"$")},y,E=/^\{@i18n>[^\\\{\}:]+\}$/,v=/^\d+$/,T={And:"&&",Eq:"===",Ge:">=",Gt:">",Le:"<=",Lt:"<",Ne:"!==",Not:"!",Or:"||"},x=/^(\/dataServices\/schema\/\d+)(?:\/|$)/,D={"Edm.Boolean":"boolean","Edm.Byte":"number","Edm.Date":"date","Edm.DateTime":"datetime","Edm.DateTimeOffset":"datetime","Edm.Decimal":"decimal","Edm.Double":"number","Edm.Float":"number","Edm.Guid":"string","Edm.Int16":"number","Edm.Int32":"number","Edm.Int64":"decimal","Edm.SByte":"number","Edm.Single":"number","Edm.String":"string","Edm.Time":"time","Edm.TimeOfDay":"time"},S={Bool:"Edm.Boolean",Float:"Edm.Double",Date:"Edm.Date",DateTimeOffset:"Edm.DateTimeOffset",Decimal:"Edm.Decimal",Guid:"Edm.Guid",Int:"Edm.Int64",String:"Edm.String",TimeOfDay:"Edm.TimeOfDay"},h={boolean:false,date:true,datetime:true,decimal:true,number:false,string:false,time:true};y={adjustOperands:function(e,t){if(e.result!=="constant"&&e.category==="number"&&t.result==="constant"&&t.type==="Edm.Int64"){t.category="number"}if(e.result!=="constant"&&e.category==="decimal"&&t.result==="constant"&&t.type==="Edm.Int32"){t.category="decimal";t.type=e.type}if(e.result==="constant"&&e.category==="date"&&t.result!=="constant"&&t.category==="datetime"){t.category="date"}},apply:function(t,r){var a=e.descend(r,"Name","string"),n=e.descend(r,"Parameters");switch(a.value){case"odata.concat":return y.concat(t,n);case"odata.fillUriTemplate":return y.fillUriTemplate(t,n);case"odata.uriEncode":return y.uriEncode(t,n);default:e.error(a,"unknown function: "+a.value)}},concat:function(t,r){var a=r.asExpression,n=[],i,s=[];e.expectType(r,"array");r.value.forEach(function(e,n){i=y.parameter(t,r,n);a=a||i.result==="expression";s.push(i)});s.forEach(function(t){if(a){y.wrapExpression(t)}if(t.type!=="edm:Null"){n.push(e.resultToString(t,a,r.withType))}});i=a?{result:"expression",value:n.join("+")}:{result:"composite",value:n.join("")};i.type="Edm.String";return i},conditional:function(t,r){var a=y.parameter(t,r,0,"Edm.Boolean"),n=y.parameter(t,r,1),i=y.parameter(t,r,2),s=n.type,o=r.withType;if(n.type==="edm:Null"){s=i.type}else if(i.type!=="edm:Null"&&n.type!==i.type){e.error(r,"Expected same type for second and third parameter, types are '"+n.type+"' and '"+i.type+"'")}return{result:"expression",type:s,value:e.resultToString(y.wrapExpression(a),true,false)+"?"+e.resultToString(y.wrapExpression(n),true,o)+":"+e.resultToString(y.wrapExpression(i),true,o)}},constant:function(t,r,a){var n=r.value;e.expectType(r,"string");if(a==="String"){if(E.test(n)){return{ignoreTypeInPath:true,result:"binding",type:"Edm.String",value:n.slice(1,-1)}}else if(t.getSetting&&t.getSetting("bindTexts")){return{result:"binding",type:"Edm.String",ignoreTypeInPath:true,value:"/##"+y.replaceIndexes(t.getModel(),r.path)}}a="Edm.String"}else if(!g[a].test(n)){e.error(r,"Expected "+a+" value but instead saw '"+n+"'")}else{a=S[a];if(a==="Edm.Int64"&&i.compare(n,c,true)>=0&&i.compare(n,p,true)<=0){a="Edm.Int32"}}return{result:"constant",type:a,value:n}},expression:function(t,r){var a=r.value,n,i;e.expectType(r,"object");if(a.hasOwnProperty("Type")){i=e.property(r,"Type","string");n=e.descend(r,"Value")}else{["And","Apply","Bool","Date","DateTimeOffset","Decimal","Float","Eq","Ge","Gt","Guid","If","Int","Le","Lt","Ne","Not","Null","Or","Path","PropertyPath","String","TimeOfDay"].forEach(function(t){if(a.hasOwnProperty(t)){i=t;n=e.descend(r,t)}})}switch(i){case"Apply":return y.apply(t,n);case"If":return y.conditional(t,n);case"Path":case"PropertyPath":return y.path(t,n);case"Bool":case"Date":case"DateTimeOffset":case"Decimal":case"Float":case"Guid":case"Int":case"String":case"TimeOfDay":return y.constant(t,n,i);case"And":case"Eq":case"Ge":case"Gt":case"Le":case"Lt":case"Ne":case"Or":return y.operator(t,n,i);case"Not":return y.not(t,n);case"Null":return{result:"constant",value:"null",type:"edm:Null"};default:e.error(r,"Unsupported OData expression")}},formatOperand:function(t,r,a,n){var i;if(a.result==="constant"){switch(a.category){case"boolean":case"number":return a.value;case"date":i=y.parseDate(a.value);if(!i){e.error(e.descend(t,r),"Invalid Date "+a.value)}return String(i.getTime());case"datetime":i=y.parseDateTimeOffset(a.value);if(!i){e.error(e.descend(t,r),"Invalid DateTime "+a.value)}return String(i.getTime());case"time":return String(y.parseTimeOfDay(a.value).getTime())}}if(n){y.wrapExpression(a)}return e.resultToString(a,true)},getExpression:function(n,i,u){var l;if(i===undefined){return undefined}s.average(m,"",d);if(!y.simpleParserWarningLogged&&a.bindingParser===r.simpleParser){t.warning("Complex binding syntax not active",null,o);y.simpleParserWarningLogged=true}try{l=y.expression(n,{asExpression:false,path:n.getPath(),value:i,withType:u});s.end(m);return e.resultToString(l,false,u)}catch(t){s.end(m);if(t instanceof SyntaxError){return"Unsupported: "+r.complexParser.escape(e.toErrorString(i))}throw t}},fillUriTemplate:function(t,r){var a,n,i=[],s="",o,u=r.value,l,p=y.parameter(t,r,0,"Edm.String");i.push("odata.fillUriTemplate(",e.resultToString(p,true),",{");for(a=1;a<u.length;a+=1){o=e.descend(r,a,"object");n=e.property(o,"Name","string");l=y.expression(t,e.descend(o,"Value"),true);i.push(s,e.toJSON(n),":",e.resultToString(l,true));s=","}i.push("})");return{result:"expression",value:i.join(""),type:"Edm.String"}},not:function(t,r){var a;r.asExpression=true;a=y.expression(t,r);return{result:"expression",value:"!"+e.resultToString(y.wrapExpression(a),true),type:"Edm.Boolean"}},operator:function(t,r,a){var n=a==="And"||a==="Or"?"Edm.Boolean":undefined,i=y.parameter(t,r,0,n),s=y.parameter(t,r,1,n),o,u,l,p;if(i.type!=="edm:Null"&&s.type!=="edm:Null"){i.category=D[i.type];s.category=D[s.type];y.adjustOperands(i,s);y.adjustOperands(s,i);if(i.category!==s.category){e.error(r,"Expected two comparable parameters but instead saw "+i.type+" and "+s.type)}o=i.category==="decimal"?",true":"";u=h[i.category]}l=y.formatOperand(r,0,i,!u);p=y.formatOperand(r,1,s,!u);return{result:"expression",value:u?"odata.compare("+l+","+p+o+")"+T[a]+"0":l+T[a]+p,type:"Edm.Boolean"}},parameter:function(t,r,a,n){var i=e.descend(r,a),s;i.asExpression=true;s=y.expression(t,i);if(n&&n!==s.type){e.error(i,"Expected "+n+" but instead saw "+s.type)}return s},parseDate:function(e){return n.getDateInstance({pattern:"yyyy-MM-dd",strictParsing:true,UTC:true}).parse(e)},parseDateTimeOffset:function(e){var t=g.DateTimeOffset.exec(e);if(t&&t[1]&&t[1].length>4){e=e.replace(t[1],t[1].slice(0,4))}return n.getDateTimeInstance({pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSX",strictParsing:true}).parse(e.toUpperCase())},parseTimeOfDay:function(e){if(e.length>12){e=e.slice(0,12)}return n.getTimeInstance({pattern:"HH:mm:ss.SSS",strictParsing:true,UTC:true}).parse(e)},path:function(r,a){var n=a.value,i={},s,u,l,p=r.getModel(),c={getModel:function(){return p},getPath:function(){return a.path}},d,m={result:"binding",value:n},f;e.expectType(a,"string");f=e.followPath(c,{Path:n});if(f&&f.resolvedPath){d=p.getProperty(f.resolvedPath);m.type=d.type;switch(d.type){case"Edm.DateTime":i.displayFormat=d["sap:display-format"];break;case"Edm.Decimal":if(d.precision){i.precision=d.precision}if(d.scale){i.scale=d.scale}l=d["Org.OData.Validation.V1.Minimum"];if(l&&(l.Decimal||l.String)){i.minimum=l.Decimal||l.String;s=l["Org.OData.Validation.V1.Exclusive"];if(s){i.minimumExclusive=s.Bool||"true"}}l=d["Org.OData.Validation.V1.Maximum"];if(l&&(l.Decimal||l.String)){i.maximum=l.Decimal||l.String;s=l["Org.OData.Validation.V1.Exclusive"];if(s){i.maximumExclusive=s.Bool||"true"}}break;case"Edm.String":i.maxLength=d.maxLength;u=d["com.sap.vocabularies.Common.v1.IsDigitSequence"];if(u){i.isDigitSequence=u.Bool||"true"}break}if(d.nullable==="false"){i.nullable="false"}m.constraints=i}else{t.warning("Could not find property '"+n+"' starting from '"+a.path+"'",null,o)}return m},replaceIndexes:function(t,r){var a,n=r.split("/"),i,s;function o(r,a){var s=t.getProperty(i+"/"+r);if(typeof s==="string"){n[a]="[${"+r+"}==="+e.toJSON(s)+"]";return true}return false}a=x.exec(r);if(!a){return r}i=a[1];if(!o("namespace",3)){return r}for(var u=4;u<n.length;u++){i=i+"/"+n[u];if(v.test(n[u])&&!o("name",u)){s=t.getProperty(i+"/RecordType");if(s){if(s==="com.sap.vocabularies.UI.v1.DataFieldForAction"){o("Action/String",u)}else if(s==="com.sap.vocabularies.UI.v1.DataFieldForAnnotation"){o("Target/AnnotationPath",u)}else if(s.indexOf("com.sap.vocabularies.UI.v1.DataField")===0){o("Value/Path",u)}}}}return n.join("/")},simpleParserWarningLogged:false,uriEncode:function(t,r){var a=y.parameter(t,r,0);if(a.result==="constant"){if(a.type==="Edm.Date"){a.type="Edm.DateTime";a.value=a.value+"T00:00:00Z"}else if(a.type==="Edm.TimeOfDay"){a.type="Edm.Time";a.value="PT"+a.value.slice(0,2)+"H"+a.value.slice(3,5)+"M"+a.value.slice(6,8)+"S"}}return{result:"expression",value:"odata.uriEncode("+e.resultToString(a,true)+","+e.toJSON(a.type)+")",type:"Edm.String"}},wrapExpression:function(e){if(e.result==="expression"){e.value="("+e.value+")"}return e}};return y},false);
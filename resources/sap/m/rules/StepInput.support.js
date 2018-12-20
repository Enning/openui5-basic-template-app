/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,i=e.Severity,s=e.Audiences;var n={id:"stepInputStepProperty",audiences:[s.Control],categories:[t.Consistency],enabled:true,minversion:"1.46",title:"StepInput: Step property precision is not greater than displayValuePrecision",description:"The value of the step property should not contain more digits after the decimal point than what is set to the displayValuePrecision property, as it may lead to an increase/decrease that is not visible",resolution:"Set step property to a value with less precision than the displayValuePrecision",resolutionurls:[{text:"SAP Fiori Design Guidelines: StepInput",href:"https://experience.sap.com/fiori-design-web/step-input/"}],check:function(e,t,s){s.getElementsByClassName("sap.m.StepInput").forEach(function(t){var s=t.getStep().toString();var n=s.indexOf(".")>=0?s.split(".")[1].length:0;if(n>t.getDisplayValuePrecision()){var r=t.getId(),a=t.getMetadata().getElementName();e.addIssue({severity:i.High,details:"StepInput '"+a+"' ("+r+")'s step precision is greater than displayValuePrecision",context:{id:r}})}})}};var r={id:"stepInputFieldWidth",audiences:[s.Control],categories:[t.Consistency],enabled:true,minversion:"1.46",title:"StepInput: The fieldWidth property takes effect only if the description property is also set.",description:"This property takes effect only if the description property is also set.",resolution:"Set fieldWidth when you want to control the availbale width for the description",resolutionurls:[{text:"SAP Fiori Design Guidelines: StepInput",href:"https://experience.sap.com/fiori-design-web/step-input/"}],check:function(e,t,s){s.getElementsByClassName("sap.m.StepInput").forEach(function(t){if(t.getFieldWidth()!==t.getMetadata().getAllProperties().fieldWidth.defaultValue&&!t.getDescription()){var s=t.getId(),n=t.getMetadata().getElementName();e.addIssue({severity:i.Medium,details:"StepInput '"+n+"' ("+s+") fieldWidth property is set and description is not",context:{id:s}})}})}};return[n,r]},true);
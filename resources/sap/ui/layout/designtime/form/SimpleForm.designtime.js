/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/ChangeHandlerMediator"],function(e){"use strict";var t=function(e){var t=[];var a;var n;if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){a=e.getLabel();if(a){t.push(a)}t=t.concat(e.getFields())}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){n=e.getTitle()||e.getToolbar();if(n){t[0]=n}e.getFormElements().forEach(function(e){a=e.getLabel();if(a){t.push(a)}t=t.concat(e.getFields())})}else if(e.getMetadata().getName()==="sap.ui.layout.form.Form"){t.push(e)}return t};var a={aggregations:{formContainers:{childNames:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},getIndex:function(e,t){var a=e.getFormContainers();if(t){return a.indexOf(t)+1}if(a.length>0&&a[0].getFormElements().length===0&&a[0].getTitle()===null){return 0}return a.length},beforeMove:function(e){if(e){e._bChangedByMe=true}},afterMove:function(e){if(e){e._bChangedByMe=false}},actions:{move:{changeType:"moveSimpleFormGroup"},createContainer:{changeType:"addSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:function(e){var t=e.getFormContainers();for(var a=0;a<t.length;a++){if(t[a].getToolbar&&t[a].getToolbar()){return false}}return true},getCreatedContainerId:function(e){var t=sap.ui.getCore().byId(e);var a=t.getParent().getId();return a}}}}},getStableElements:t};var n={name:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},aggregations:{formElements:{childNames:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},beforeMove:function(e){if(e){e._bChangedByMe=true}},afterMove:function(e){if(e){e._bChangedByMe=false}},actions:{move:{changeType:"moveSimpleFormField"},addODataProperty:function(t){var a=e.getAddODataFieldWithLabelSettings(t);if(a){return{changeType:"addSimpleFormField",changeOnRelevantContainer:true,changeHandlerSettings:a}}}}}},actions:{rename:function(e){return{changeType:"renameTitle",changeOnRelevantContainer:true,isEnabled:!(e.getToolbar()||!e.getTitle()),domRef:function(e){if(e.getTitle&&e.getTitle()){return e.getTitle().getDomRef()}}}},remove:function(e){return{changeType:"removeSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:!!(e.getToolbar()||e.getTitle()),getConfirmationText:function(e){var t=false;if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"&&e.getToolbar&&e.getToolbar()){var a=e.getToolbar().getContent();if(a.length>1){t=true}else if(a.length===1&&(!a[0].getMetadata().isInstanceOf("sap.ui.core.Label")&&!a[0]instanceof sap.ui.core.Title&&!a[0]instanceof sap.m.Title)){t=true}}if(t){var n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout.designtime");return n.getText("MSG_REMOVING_TOOLBAR")}}}}},getStableElements:t};var r={name:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},actions:{rename:{changeType:"renameLabel",changeOnRelevantContainer:true,domRef:function(e){return e.getLabel().getDomRef()}},remove:{changeType:"hideSimpleFormField",changeOnRelevantContainer:true},reveal:{changeType:"unhideSimpleFormField",changeOnRelevantContainer:true}},getStableElements:t};return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/SimpleForm.icon.svg"}},aggregations:{content:{ignore:true},title:{ignore:true},toolbar:{ignore:function(e){return!e.getToolbar()},domRef:function(e){return e.getToolbar().getDomRef()}},form:{ignore:false,propagateMetadata:function(e){var t=e.getMetadata().getName();if(t==="sap.ui.layout.form.Form"){return a}else if(t==="sap.ui.layout.form.FormContainer"){return n}else if(t==="sap.ui.layout.form.FormElement"){return r}else{return{actions:null}}},propagateRelevantContainer:true}}}},false);
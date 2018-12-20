/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","./Button","./SplitButton","sap/ui/Device","sap/ui/core/EnabledPropagator","sap/ui/core/library","sap/ui/core/Popup","sap/ui/core/LabelEnablement","sap/m/Menu","./MenuButtonRenderer"],function(t,e,i,n,o,s,r,u,p,a,l){"use strict";var h=t.MenuButtonMode;var c=r.TextDirection;var f=t.ButtonType;var g=u.Dock;var d=["buttonMode","useDefaultActionOnly","width","menuPosition"];var _=e.extend("sap.m.MenuButton",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:f.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:c.Inherit},buttonMode:{type:"sap.m.MenuButtonMode",group:"Misc",defaultValue:h.Regular},menuPosition:{type:"sap.ui.core.Popup.Dock",group:"Misc",defaultValue:g.BeginBottom},useDefaultActionOnly:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{menu:{type:"sap.m.Menu",multiple:false,singularName:"menu"},_button:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{defaultAction:{}},defaultAggregation:"menu",designtime:"sap/m/designtime/MenuButton.designtime"}});s.call(_.prototype);_.prototype.init=function(){this._initButtonControl()};_.prototype.exit=function(){if(this._sDefaultText){this._sDefaultText=null}if(this._sDefaultIcon){this._sDefaultIcon=null}if(this._iInitialTextBtnContentWidth){this._iInitialTextBtnContentWidth=null}if(this._lastActionItemId){this._lastActionItemId=null}if(this.getMenu()){this.getMenu().detachClosed(this._menuClosed,this)}};_.prototype.onBeforeRendering=function(){if(!this._sDefaultText){this._sDefaultText=this.getText()}if(!this._sDefaultIcon){this._sDefaultIcon=this.getIcon()}this._updateButtonControl();this._attachMenuEvents()};_.prototype._needsWidth=function(){return this._isSplitButton()&&this.getWidth()===""};_.prototype._getTextBtnContentDomRef=function(){return this._getButtonControl()._getTextButton().getDomRef("content")};_.prototype.onAfterRendering=function(){if(this._needsWidth()&&sap.ui.getCore().isThemeApplied()&&this._getTextBtnContentDomRef()&&this._getInitialTextBtnWidth()>0){this._getTextBtnContentDomRef().style.width=this._getInitialTextBtnWidth()+"px"}this._setAriaHasPopup()};_.prototype.onThemeChanged=function(t){if(this._needsWidth()&&this.getDomRef()&&!this._iInitialTextBtnContentWidth&&this._getTextBtnContentDomRef()&&this._getInitialTextBtnWidth()>0){this._getTextBtnContentDomRef().style.width=this._getInitialTextBtnWidth()+"px"}};_.prototype._getInitialTextBtnWidth=function(){if(!this._iInitialTextBtnContentWidth){this._iInitialTextBtnContentWidth=Math.ceil(this._getTextBtnContentDomRef().getBoundingClientRect().width)}return this._iInitialTextBtnContentWidth};_.prototype._setAriaHasPopup=function(){if(this._isSplitButton()){this._getButtonControl()._getArrowButton().$().attr("aria-haspopup","true")}else{this._getButtonControl().$().attr("aria-haspopup","true")}};_.prototype.setButtonMode=function(t){var i=this.getTooltip();e.prototype.setProperty.call(this,"buttonMode",t,true);this._getButtonControl().destroy();this._initButtonControl();for(var n in this.mProperties){if(this.mProperties.hasOwnProperty(n)&&d.indexOf(n)<0){this._getButtonControl().setProperty(n,this.mProperties[n],true)}}if(i){this._getButtonControl().setTooltip(i)}if(!this._isSplitButton()&&this._sDefaultText){this.setText(this._sDefaultText)}else if(!this.getUseDefaultActionOnly()&&this._getLastSelectedItem()){this.setText(sap.ui.getCore().byId(this._getLastSelectedItem()).getText())}if(!this._isSplitButton()&&this._sDefaultIcon){this.setIcon(this._sDefaultIcon)}else if(!this.getUseDefaultActionOnly()&&this._getLastSelectedItem()){this.setIcon(sap.ui.getCore().byId(this._getLastSelectedItem()).getIcon())}this.invalidate();return this};_.prototype._initButton=function(){var t=new i(this.getId()+"-internalBtn",{width:"100%"});t.attachPress(this._handleButtonPress,this);return t};_.prototype._initSplitButton=function(){var t=new n(this.getId()+"-internalSplitBtn",{width:"100%"});t.attachPress(this._handleActionPress,this);t.attachArrowPress(this._handleButtonPress,this);return t};_.prototype._initButtonControl=function(){var t;if(this._isSplitButton()){t=this._initSplitButton()}else{t=this._initButton()}this.setAggregation("_button",t,true)};_.prototype._updateButtonControl=function(){this._getButtonControl().setText(this.getText())};_.prototype._getButtonControl=function(){return this.getAggregation("_button")};_.prototype._handleButtonPress=function(t){var e=this.getMenu(),i={zero:"0 0",plus2_right:"0 +2",minus2_right:"0 -2",plus2_left:"+2 0",minus2_left:"-2 0"};if(this._bPopupOpen){this.getMenu().close();return}if(!e){return}if(!e.getTitle()){e.setTitle(this.getText())}var n=[this,t];switch(this.getMenuPosition()){case g.BeginTop:n.push(g.BeginBottom,g.BeginTop,i.plus2_right);break;case g.BeginCenter:n.push(g.BeginCenter,g.BeginCenter,i.zero);break;case g.LeftTop:n.push(g.RightBottom,g.LeftBottom,i.plus2_left);break;case g.LeftCenter:n.push(g.RightCenter,g.LeftCenter,i.plus2_left);break;case g.LeftBottom:n.push(g.RightTop,g.LeftTop,i.plus2_left);break;case g.CenterTop:n.push(g.CenterBottom,g.CenterTop,i.plus2_left);break;case g.CenterCenter:n.push(g.CenterCenter,g.CenterCenter,i.zero);break;case g.CenterBottom:n.push(g.CenterTop,g.CenterBottom,i.minus2_right);break;case g.RightTop:n.push(g.LeftBottom,g.RightBottom,i.minus2_left);break;case g.RightCenter:n.push(g.LeftCenter,g.RightCenter,i.minus2_left);break;case g.RightBottom:n.push(g.LeftTop,g.RightTop,i.minus2_left);break;case g.EndTop:n.push(g.EndBottom,g.EndTop,i.plus2_right);break;case g.EndCenter:n.push(g.EndCenter,g.EndCenter,i.zero);break;case g.EndBottom:n.push(g.EndTop,g.EndBottom,i.minus2_right);break;default:case g.BeginBottom:n.push(g.BeginTop,g.BeginBottom,i.minus2_right);break}a.prototype.openBy.apply(e,n);this._writeAriaAttributes();if(this._isSplitButton()&&!o.system.phone){this._getButtonControl().setArrowState(true)}};_.prototype._handleActionPress=function(){var t=this._getLastSelectedItem(),e;if(!this.getUseDefaultActionOnly()&&t){e=sap.ui.getCore().byId(t);this.getMenu().fireItemSelected({item:e})}else{this.fireDefaultAction()}};_.prototype._menuClosed=function(){if(this._isSplitButton()){this._getButtonControl().setArrowState(false)}};_.prototype._menuItemSelected=function(t){var e=t.getParameter("item");this.fireEvent("_menuItemSelected",{item:e});this._bPopupOpen=false;if(!this._isSplitButton()||this.getUseDefaultActionOnly()||!e){return}this._lastActionItemId=e.getId();!!this._sDefaultText&&this.setText(e.getText());!!this._sDefaultIcon&&this.setIcon(e.getIcon())};_.prototype._getLastSelectedItem=function(){return this._lastActionItemId};_.prototype._attachMenuEvents=function(){if(this.getMenu()){this.getMenu().attachClosed(this._menuClosed,this);this.getMenu().attachItemSelected(this._menuItemSelected,this)}};_.prototype._isSplitButton=function(){return this.getButtonMode()===h.Split};_.prototype.setProperty=function(t,i,n){function o(t){var e=[f.Up,f.Back,f.Unstyled];return e.indexOf(t)!==-1}if(t==="type"&&o(i)){return this}if(t==="text"){this._sDefaultText=i}switch(t){case"activeIcon":case"iconDensityAware":case"textDirection":case"enabled":this._getButtonControl().setProperty(t,i);break}return e.prototype.setProperty.apply(this,arguments)};_.prototype.setTooltip=function(t){this._getButtonControl().setTooltip(t);return e.prototype.setTooltip.apply(this,arguments)};_.prototype.setText=function(t){i.prototype.setProperty.call(this,"text",t);this._getButtonControl().setText(t);return this};_.prototype.setType=function(t){i.prototype.setProperty.call(this,"type",t);this._getButtonControl().setType(t);return this};_.prototype.setIcon=function(t){i.prototype.setProperty.call(this,"icon",t);this._getButtonControl().setIcon(t);return this};_.prototype.getFocusDomRef=function(){return this._getButtonControl().getDomRef()};_.prototype.onsapup=function(t){this.openMenuByKeyboard()};_.prototype.onsapdown=function(t){this.openMenuByKeyboard()};_.prototype.onsapupmodifiers=function(t){this.openMenuByKeyboard()};_.prototype.onsapdownmodifiers=function(t){this.openMenuByKeyboard()};_.prototype.onsapshow=function(t){this.openMenuByKeyboard();!!t&&t.preventDefault()};_.prototype.ontouchstart=function(){this._bPopupOpen=this.getMenu()&&this.getMenu()._getMenu()&&this.getMenu()._getMenu().getPopup().isOpen()};_.prototype.openMenuByKeyboard=function(){if(!this._isSplitButton()){this._handleButtonPress(true)}};_.prototype._writeAriaAttributes=function(){if(this.getMenu()){this.$().attr("aria-controls",this.getMenu().getDomRefId())}};_.prototype.getIdForLabel=function(){return this.getId()+"-internalBtn"};_.prototype._ensureBackwardsReference=function(){var t=this._getButtonControl(),e=t.getAriaLabelledBy(),i=p.getReferencingLabels(this);i.forEach(function(i){if(e&&e.indexOf(i)===-1){t.addAriaLabelledBy(i)}});return this};return _});
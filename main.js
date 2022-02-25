(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const t=function(){function t(e,n){var r=e.data,o=e.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=r.name,this._link=r.link,this._data=r,this._handleCardClick=o,this._cardSelector=n}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardPhoto=this._element.querySelector(".card__card-image"),this._cardPhoto.src=this._link,this._cardPhoto.alt=this._name,this._cardTitle=this._element.querySelector(".card__card-title"),this._cardTitle.textContent=this._name,this._cardRemoveBtn=this._element.querySelector(".card__remove-btn"),this._cardLikeBtn=this._element.querySelector(".card__like-btn"),this._setEventListeners(),this._element}},{key:"_likeCard",value:function(){this._cardLikeBtn.classList.toggle("card__like-btn_active")}},{key:"_removeCard",value:function(){this._element.remove()}},{key:"_setEventListeners",value:function(){var e=this;this._cardRemoveBtn.addEventListener("click",(function(){return e._removeCard()})),this._cardLikeBtn.addEventListener("click",(function(){return e._likeCard()})),this._cardPhoto.addEventListener("click",(function(){return e._handleCardClick(e._data)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t){var n=t.renderer,r=t.containerSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=n,this._container=document.querySelector(r)}var t,r;return t=e,(r=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"_showInputError",(function(e){r._errorElement=r._formElement.querySelector("#".concat(e.id,"-error")),e.classList.add(r._inputErrorClass),r._errorElement.textContent=e.validationMessage,r._errorElement.classList.add(r._errorClass)})),i(this,"_hideInputError",(function(e){r._errorElement=r._formElement.querySelector("#".concat(e.id,"-error")),e.classList.remove(r._inputErrorClass),r._errorElement.classList.remove(r._errorClass),r._errorElement.textContent=""})),i(this,"_checkInputValidity",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e)})),i(this,"_hasInvalidInput",(function(){return r._inputList.some((function(e){return!e.validity.valid}))})),i(this,"_setEventListeners",(function(){r._buttonElement=r._formElement.querySelector(r._submitButtonSelector),r._inputList.forEach((function(e){e.addEventListener("input",(function(){r._checkInputValidity(e),r._toggleButtonState()}))}))})),this._formElement=document.querySelector(n),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector))}var t,n;return t=e,(n=[{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"disableButtonState",value:function(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"_enableButtonState",value:function(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableButtonState():this._enableButtonState()}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();const s=a;function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){var n=t.userName,r=t.userInfo;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(n),this._userInfo=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this._userValues={},this._userValues.name=this._userName.textContent,this._userValues.info=this._userInfo.textContent,this._userValues}},{key:"setUserInfo",value:function(e){var t=e.newUserName,n=e.newUserInfo;this._userName.textContent=t,this._userInfo.textContent=n}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._handleCloseBtnAndOverlay=this._handleCloseBtnAndOverlay.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("modal_active"),this._setEventListeners()}},{key:"_close",value:function(){this._popup.classList.remove("modal_active"),this._removeEventListeners()}},{key:"_handleEscClose",value:function(e){"Escape"==e.key&&this.close()}},{key:"_handleCloseBtnAndOverlay",value:function(e){(e.target.classList.contains("modal__overlay")||e.target.classList.contains("modal__close-btn"))&&this.close()}},{key:"_setEventListeners",value:function(){this._popup.addEventListener("click",this._handleCloseBtnAndOverlay),document.addEventListener("keyup",this._handleEscClose)}},{key:"_removeEventListeners",value:function(){this._popup.removeEventListener("click",this._handleCloseBtnAndOverlay),document.removeEventListener("keyup",this._handleEscClose)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=h(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},_.apply(this,arguments)}function h(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=v(e)););return e}function m(e,t){return m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},m(e,t)}function y(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&m(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=v(r);if(o){var n=v(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return y(this,e)});function a(e){var t,n=e.popupSelector;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._modalImagePicture=t._popup.querySelector(".modal__image"),t._modalImageCaption=t._popup.querySelector(".modal__caption"),t}return t=a,(n=[{key:"open",value:function(e){_(v(a.prototype),"open",this).call(this),_(v(a.prototype),"_setEventListeners",this).call(this),this._modalImagePicture.src=e.link,this._modalImagePicture.alt=e.name,this._modalImageCaption.textContent=e.name}},{key:"close",value:function(){_(v(a.prototype),"_close",this).call(this),_(v(a.prototype),"_removeEventListeners",this).call(this)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(f),E=document.querySelector(".profile__edit-btn"),k=document.querySelector(".profile__add-btn"),S=document.querySelector(".modal__info_type_user-name"),g=document.querySelector(".modal__info_type_user-job"),w={formSelector:".modal__form",inputSelector:".modal__info",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_inactive",inputErrorClass:"modal__info_type_error",errorClass:"modal__input-error"};function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(){return L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=j(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},L.apply(this,arguments)}function j(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function P(e,t){return P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},P(e,t)}function I(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return B(e)}function B(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function a(e){var t,n,r,o,s=e.popupSelector,l=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),o=function(e){e.preventDefault()},(r="_handleFormSubmit")in(n=B(t=i.call(this,s)))?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,t._handleFormSubmit=l,t._formElement=t._popup.querySelector(w.formSelector),t._inputList=t._popup.querySelectorAll(w.inputSelector),t}return t=a,(n=[{key:"getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){L(q(a.prototype),"_setEventListeners",this).call(this),this._formElement.addEventListener("submit",this._handleFormSubmit)}},{key:"removeEventListeners",value:function(){L(q(a.prototype),"_removeEventListeners",this).call(this),this._formElement.removeEventListener("submit",this._handleFormSubmit)}},{key:"open",value:function(){L(q(a.prototype),"open",this).call(this),this.setEventListeners()}},{key:"close",value:function(){L(q(a.prototype),"_close",this).call(this),this.removeEventListeners(),this._formElement.reset()}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(f),V=new u({userName:".profile__user-name",userInfo:".profile__description"}),x=new R({popupSelector:".modal_type_edit",handleFormSubmit:function(e){e.preventDefault();var t=x.getInputValues();V.setUserInfo({newUserName:t.name,newUserInfo:t.job}),x.close()}});function T(e){return new t({data:e,handleCardClick:function(){A.open(e)}},".elements__template").generateCard()}var A=new b({popupSelector:".modal_type_image"}),N=new R({popupSelector:".modal_type_add",handleFormSubmit:function(){var e=T(N.getInputValues());U.addItem(e),F.disableButtonState(),N.close()}}),U=new r({renderer:function(e){var t=T(e);U.addItem(t)},containerSelector:".elements__cards"});U.renderItems([{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}]);var D=new s(w,".modal__form_type_edit-form");D.enableValidation();var F=new s(w,".modal__form_type_add-form");F.enableValidation(),E.addEventListener("click",(function(){x.open(),V.getUserInfo(),S.value=V._userValues.name,g.value=V._userValues.info,D.resetValidation()})),k.addEventListener("click",(function(){N.open(),F.resetValidation()}))})();
(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{1050:function(t,e,n){"use strict";n.r(e);var r=n(2),a=n.n(r),o=n(149),u=n(150),i=n(51),c=(n(399),n(128)),s=(n(291),n(164));e.default=Object(i.b)(function(t){return{games:t.Games.list,error:t.VipOffers.error,loading:t.VipOffers.loading}},{getGames:s.u})(function(t){var e=t.getGames,n=t.match,i=n.params.record_id?n.params.record_id:null,s=i?"\u7de8\u8f2f":"\u65b0\u589e";return Object(r.useEffect)(function(){e()},[]),a.a.createElement(r.Fragment,null,a.a.createElement(c.a,{breadCrumbItems:[{label:"VIP",path:"/vip/offers",active:!1},{label:"VIP \u65b9\u6848",path:"/vip/offers/offer_list",active:!0},{label:s,path:"/vip/offers/add_offer",active:!0}],title:"".concat(s).concat("VIP \u65b9\u6848")}),a.a.createElement(o.a,{className:"mb-2"},a.a.createElement(u.a,{lg:4})))})},117:function(t,e,n){var r;!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=typeof r;if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)&&r.length){var u=a.apply(null,r);u&&t.push(u)}else if("object"===o)for(var i in r)n.call(r,i)&&r[i]&&t.push(i)}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):void 0===(r=function(){return a}.apply(e,[]))||(t.exports=r)}()},118:function(t,e,n){"use strict";n.r(e),n.d(e,"getScrollbarWidth",function(){return c}),n.d(e,"setScrollbarWidth",function(){return s}),n.d(e,"isBodyOverflowing",function(){return l}),n.d(e,"getOriginalBodyPadding",function(){return d}),n.d(e,"conditionallyUpdateScrollbar",function(){return f}),n.d(e,"setGlobalCssModule",function(){return p}),n.d(e,"mapToCssModules",function(){return m}),n.d(e,"omit",function(){return b}),n.d(e,"pick",function(){return g}),n.d(e,"warnOnce",function(){return v}),n.d(e,"deprecated",function(){return h}),n.d(e,"DOMElement",function(){return O}),n.d(e,"targetPropType",function(){return j}),n.d(e,"tagPropType",function(){return T}),n.d(e,"TransitionTimeouts",function(){return w}),n.d(e,"TransitionPropTypeKeys",function(){return N}),n.d(e,"TransitionStatuses",function(){return x}),n.d(e,"keyCodes",function(){return M}),n.d(e,"PopperPlacements",function(){return P}),n.d(e,"canUseDOM",function(){return C}),n.d(e,"isReactRefObj",function(){return A}),n.d(e,"findDOMElements",function(){return k}),n.d(e,"isArrayOrNodeList",function(){return I}),n.d(e,"getTarget",function(){return G}),n.d(e,"defaultToggleEvents",function(){return S}),n.d(e,"addMultipleEventListeners",function(){return D}),n.d(e,"focusableElements",function(){return z});var r,a=n(139),o=n.n(a),u=n(17),i=n.n(u);function c(){var t=document.createElement("div");t.style.position="absolute",t.style.top="-9999px",t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e}function s(t){document.body.style.paddingRight=t>0?t+"px":null}function l(){return document.body.clientWidth<window.innerWidth}function d(){var t=window.getComputedStyle(document.body,null);return parseInt(t&&t.getPropertyValue("padding-right")||0,10)}function f(){var t=c(),e=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=e?parseInt(e.style.paddingRight||0,10):0;l()&&s(n+t)}function p(t){r=t}function m(t,e){return void 0===t&&(t=""),void 0===e&&(e=r),e?t.split(" ").map(function(t){return e[t]||t}).join(" "):t}function b(t,e){var n={};return Object.keys(t).forEach(function(r){-1===e.indexOf(r)&&(n[r]=t[r])}),n}function g(t,e){for(var n,r=Array.isArray(e)?e:[e],a=r.length,o={};a>0;)o[n=r[a-=1]]=t[n];return o}var y={};function v(t){y[t]||("undefined"!==typeof console&&console.error(t),y[t]=!0)}function h(t,e){return function(n,r,a){null!==n[r]&&"undefined"!==typeof n[r]&&v('"'+r+'" property of "'+a+'" has been deprecated.\n'+e);for(var o=arguments.length,u=new Array(o>3?o-3:0),i=3;i<o;i++)u[i-3]=arguments[i];return t.apply(void 0,[n,r,a].concat(u))}}var E="object"===typeof window&&window.Element||function(){};function O(t,e,n){if(!(t[e]instanceof E))return new Error("Invalid prop `"+e+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")}var j=i.a.oneOfType([i.a.string,i.a.func,O,i.a.shape({current:i.a.any})]),T=i.a.oneOfType([i.a.func,i.a.string,i.a.shape({$$typeof:i.a.symbol,render:i.a.func}),i.a.arrayOf(i.a.oneOfType([i.a.func,i.a.string,i.a.shape({$$typeof:i.a.symbol,render:i.a.func})]))]),w={Fade:150,Collapse:350,Modal:300,Carousel:600},N=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],x={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},M={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},P=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],C=!("undefined"===typeof window||!window.document||!window.document.createElement);function A(t){return!(!t||"object"!==typeof t)&&"current"in t}function k(t){if(A(t))return t.current;if(o()(t))return t();if("string"===typeof t&&C){var e=document.querySelectorAll(t);if(e.length||(e=document.querySelectorAll("#"+t)),!e.length)throw new Error("The target '"+t+"' could not be identified in the dom, tip: check spelling");return e}return t}function I(t){return null!==t&&(Array.isArray(t)||C&&"number"===typeof t.length)}function G(t){var e=k(t);return I(e)?e[0]:e}var S=["touchstart","click"];function D(t,e,n,r){var a=t;I(a)||(a=[a]);var o=n;if("string"===typeof o&&(o=o.split(/\s+/)),!I(a)||"function"!==typeof e||!Array.isArray(o))throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");return Array.prototype.forEach.call(o,function(t){Array.prototype.forEach.call(a,function(n){n.addEventListener(t,e,r)})}),function(){Array.prototype.forEach.call(o,function(t){Array.prototype.forEach.call(a,function(n){n.removeEventListener(t,e,r)})})}}var z=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},128:function(t,e,n){"use strict";var r=n(2),a=n.n(r),o=n(44),u=n(149),i=n(150),c=n(151),s=n(152);n(17);e.a=function(t){return a.a.createElement(u.a,null,a.a.createElement(i.a,null,a.a.createElement("div",{className:"page-title-box"},a.a.createElement("div",{className:"page-title-right"},a.a.createElement(c.a,null,a.a.createElement(s.a,null,a.a.createElement(o.b,{to:"/"},"Hyper")),t.breadCrumbItems.map(function(t,e){return t.active?a.a.createElement(s.a,{active:!0,key:e},t.label):a.a.createElement(s.a,{key:e},a.a.createElement(o.b,{to:t.path},t.label))}))),a.a.createElement("h4",{className:"page-title"},t.title))))}},132:function(t,e){t.exports=function(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}},139:function(t,e,n){(function(e){var n="[object AsyncFunction]",r="[object Function]",a="[object GeneratorFunction]",o="[object Null]",u="[object Proxy]",i="[object Undefined]",c="object"==typeof e&&e&&e.Object===Object&&e,s="object"==typeof self&&self&&self.Object===Object&&self,l=c||s||Function("return this")(),d=Object.prototype,f=d.hasOwnProperty,p=d.toString,m=l.Symbol,b=m?m.toStringTag:void 0;function g(t){return null==t?void 0===t?i:o:b&&b in Object(t)?function(t){var e=f.call(t,b),n=t[b];try{t[b]=void 0;var r=!0}catch(o){}var a=p.call(t);r&&(e?t[b]=n:delete t[b]);return a}(t):function(t){return p.call(t)}(t)}t.exports=function(t){if(!function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}(t))return!1;var e=g(t);return e==r||e==a||e==n||e==u}}).call(this,n(66))},149:function(t,e,n){"use strict";var r=n(11),a=n(16),o=n(2),u=n.n(o),i=n(17),c=n.n(i),s=n(117),l=n.n(s),d=n(118),f={tag:d.tagPropType,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool},p=function(t){var e=t.className,n=t.cssModule,o=t.noGutters,i=t.tag,c=t.form,s=Object(a.a)(t,["className","cssModule","noGutters","tag","form"]),f=Object(d.mapToCssModules)(l()(e,o?"no-gutters":null,c?"form-row":"row"),n);return u.a.createElement(i,Object(r.a)({},s,{className:f}))};p.propTypes=f,p.defaultProps={tag:"div"},e.a=p},150:function(t,e,n){"use strict";var r=n(11),a=n(16),o=n(132),u=n.n(o),i=n(2),c=n.n(i),s=n(17),l=n.n(s),d=n(117),f=n.n(d),p=n(118),m=l.a.oneOfType([l.a.number,l.a.string]),b=l.a.oneOfType([l.a.bool,l.a.number,l.a.string,l.a.shape({size:l.a.oneOfType([l.a.bool,l.a.number,l.a.string]),order:m,offset:m})]),g={tag:p.tagPropType,xs:b,sm:b,md:b,lg:b,xl:b,className:l.a.string,cssModule:l.a.object,widths:l.a.array},y={tag:"div",widths:["xs","sm","md","lg","xl"]},v=function(t,e,n){return!0===n||""===n?t?"col":"col-"+e:"auto"===n?t?"col-auto":"col-"+e+"-auto":t?"col-"+n:"col-"+e+"-"+n},h=function(t){var e=t.className,n=t.cssModule,o=t.widths,i=t.tag,s=Object(a.a)(t,["className","cssModule","widths","tag"]),l=[];o.forEach(function(e,r){var a=t[e];if(delete s[e],a||""===a){var o=!r;if(u()(a)){var i,c=o?"-":"-"+e+"-",d=v(o,e,a.size);l.push(Object(p.mapToCssModules)(f()(((i={})[d]=a.size||""===a.size,i["order"+c+a.order]=a.order||0===a.order,i["offset"+c+a.offset]=a.offset||0===a.offset,i)),n))}else{var m=v(o,e,a);l.push(m)}}}),l.length||l.push("col");var d=Object(p.mapToCssModules)(f()(e,l),n);return c.a.createElement(i,Object(r.a)({},s,{className:d}))};h.propTypes=g,h.defaultProps=y,e.a=h},151:function(t,e,n){"use strict";var r=n(11),a=n(16),o=n(2),u=n.n(o),i=n(17),c=n.n(i),s=n(117),l=n.n(s),d=n(118),f={tag:d.tagPropType,listTag:d.tagPropType,className:c.a.string,listClassName:c.a.string,cssModule:c.a.object,children:c.a.node,"aria-label":c.a.string},p=function(t){var e=t.className,n=t.listClassName,o=t.cssModule,i=t.children,c=t.tag,s=t.listTag,f=t["aria-label"],p=Object(a.a)(t,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),m=Object(d.mapToCssModules)(l()(e),o),b=Object(d.mapToCssModules)(l()("breadcrumb",n),o);return u.a.createElement(c,Object(r.a)({},p,{className:m,"aria-label":f}),u.a.createElement(s,{className:b},i))};p.propTypes=f,p.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},e.a=p},152:function(t,e,n){"use strict";var r=n(11),a=n(16),o=n(2),u=n.n(o),i=n(17),c=n.n(i),s=n(117),l=n.n(s),d=n(118),f={tag:d.tagPropType,active:c.a.bool,className:c.a.string,cssModule:c.a.object},p=function(t){var e=t.className,n=t.cssModule,o=t.active,i=t.tag,c=Object(a.a)(t,["className","cssModule","active","tag"]),s=Object(d.mapToCssModules)(l()(e,!!o&&"active","breadcrumb-item"),n);return u.a.createElement(i,Object(r.a)({},c,{className:s,"aria-current":o?"page":void 0}))};p.propTypes=f,p.defaultProps={tag:"li"},e.a=p},164:function(t,e,n){"use strict";var r=n(38);n.d(e,"n",function(){return r.a}),n.d(e,"F",function(){return r.d}),n.d(e,"G",function(){return r.g}),n.d(e,"L",function(){return r.h});var a=n(35);n.d(e,"d",function(){return a.a}),n.d(e,"e",function(){return a.b}),n.d(e,"f",function(){return a.c}),n.d(e,"g",function(){return a.d}),n.d(e,"D",function(){return a.e});var o=n(46);n.d(e,"c",function(){return o.a}),n.d(e,"E",function(){return o.c});var u=n(54);n.d(e,"t",function(){return u.a});var i=n(55);n.d(e,"O",function(){return i.a});var c=n(39);n.d(e,"m",function(){return c.a}),n.d(e,"s",function(){return c.d}),n.d(e,"v",function(){return c.g});var s=n(56);n.d(e,"u",function(){return s.a});var l=n(57);n.d(e,"y",function(){return l.a});var d=n(58);n.d(e,"o",function(){return d.a});var f=n(18);n.d(e,"h",function(){return f.a}),n.d(e,"p",function(){return f.b}),n.d(e,"q",function(){return f.e}),n.d(e,"H",function(){return f.h}),n.d(e,"I",function(){return f.k}),n.d(e,"K",function(){return f.n}),n.d(e,"N",function(){return f.q});var p=n(15);n.d(e,"b",function(){return p.a}),n.d(e,"i",function(){return p.d}),n.d(e,"k",function(){return p.e}),n.d(e,"r",function(){return p.h}),n.d(e,"w",function(){return p.k}),n.d(e,"x",function(){return p.n}),n.d(e,"z",function(){return p.q}),n.d(e,"M",function(){return p.v}),n.d(e,"P",function(){return p.y}),n.d(e,"Q",function(){return p.B});var m=n(25);n.d(e,"a",function(){return m.a}),n.d(e,"j",function(){return m.d}),n.d(e,"l",function(){return m.e}),n.d(e,"A",function(){return m.h}),n.d(e,"B",function(){return m.j}),n.d(e,"J",function(){return m.n});var b=n(59);n.d(e,"C",function(){return b.a})},291:function(t,e,n){"use strict";var r=n(68),a=n(2),o=n.n(a),u=(n(17),n(117)),i=n.n(u),c=function(t){var e=t.children||null,n=t.tag;return o.a.createElement(n,{role:"status",className:i()({"spinner-border":"bordered"===t.type,"spinner-grow":"grow"===t.type},["text-".concat(t.color)],Object(r.a)({},"avatar-".concat(t.size),t.size),t.className)},e)};c.defaultProps={tag:"div",type:"bordered",color:"primary"},e.a=c}}]);
//# sourceMappingURL=68.9edaafd1.chunk.js.map
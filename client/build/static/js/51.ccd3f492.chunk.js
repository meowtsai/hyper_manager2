(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{1048:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),o=n(51),c=n(164),l=n(686);t.default=Object(o.b)(function(e){return{allocation:e.ServiceAllocate.allocation,allocation_logs:e.ServiceAllocate.allocation_logs,loading:e.ServiceAllocate.loading,error:e.ServiceAllocate.error,updateOKMessage:e.ServiceAllocate.updateOKMessage,user:e.Auth.user}},{getAllocateById:c.p,putAllocation:c.I})(function(e){var t=e.getAllocateById,n=e.putAllocation,o=e.allocation,i=e.allocation_logs,s=e.user;return Object(a.useEffect)(function(){t(312212)},[]),r.a.createElement(a.Fragment,null,r.a.createElement(l.a,{q_id:312212,allocation:o,allocation_logs:i,postAllocation:c.H,putAllocation:n,user:s}))})},117:function(e,t,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var c=r.apply(null,a);c&&e.push(c)}else if("object"===o)for(var l in a)n.call(a,l)&&a[l]&&e.push(l)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},118:function(e,t,n){"use strict";n.r(t),n.d(t,"getScrollbarWidth",function(){return i}),n.d(t,"setScrollbarWidth",function(){return s}),n.d(t,"isBodyOverflowing",function(){return u}),n.d(t,"getOriginalBodyPadding",function(){return d}),n.d(t,"conditionallyUpdateScrollbar",function(){return f}),n.d(t,"setGlobalCssModule",function(){return m}),n.d(t,"mapToCssModules",function(){return p}),n.d(t,"omit",function(){return b}),n.d(t,"pick",function(){return g}),n.d(t,"warnOnce",function(){return y}),n.d(t,"deprecated",function(){return h}),n.d(t,"DOMElement",function(){return O}),n.d(t,"targetPropType",function(){return N}),n.d(t,"tagPropType",function(){return j}),n.d(t,"TransitionTimeouts",function(){return x}),n.d(t,"TransitionPropTypeKeys",function(){return w}),n.d(t,"TransitionStatuses",function(){return T}),n.d(t,"keyCodes",function(){return M}),n.d(t,"PopperPlacements",function(){return A}),n.d(t,"canUseDOM",function(){return _}),n.d(t,"isReactRefObj",function(){return P}),n.d(t,"findDOMElements",function(){return S}),n.d(t,"isArrayOrNodeList",function(){return C}),n.d(t,"getTarget",function(){return k}),n.d(t,"defaultToggleEvents",function(){return R}),n.d(t,"addMultipleEventListeners",function(){return z}),n.d(t,"focusableElements",function(){return D});var a,r=n(139),o=n.n(r),c=n(17),l=n.n(c);function i(){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}function s(e){document.body.style.paddingRight=e>0?e+"px":null}function u(){return document.body.clientWidth<window.innerWidth}function d(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function f(){var e=i(),t=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=t?parseInt(t.style.paddingRight||0,10):0;u()&&s(n+e)}function m(e){a=e}function p(e,t){return void 0===e&&(e=""),void 0===t&&(t=a),t?e.split(" ").map(function(e){return t[e]||e}).join(" "):e}function b(e,t){var n={};return Object.keys(e).forEach(function(a){-1===t.indexOf(a)&&(n[a]=e[a])}),n}function g(e,t){for(var n,a=Array.isArray(t)?t:[t],r=a.length,o={};r>0;)o[n=a[r-=1]]=e[n];return o}var v={};function y(e){v[e]||("undefined"!==typeof console&&console.error(e),v[e]=!0)}function h(e,t){return function(n,a,r){null!==n[a]&&"undefined"!==typeof n[a]&&y('"'+a+'" property of "'+r+'" has been deprecated.\n'+t);for(var o=arguments.length,c=new Array(o>3?o-3:0),l=3;l<o;l++)c[l-3]=arguments[l];return e.apply(void 0,[n,a,r].concat(c))}}var E="object"===typeof window&&window.Element||function(){};function O(e,t,n){if(!(e[t]instanceof E))return new Error("Invalid prop `"+t+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")}var N=l.a.oneOfType([l.a.string,l.a.func,O,l.a.shape({current:l.a.any})]),j=l.a.oneOfType([l.a.func,l.a.string,l.a.shape({$$typeof:l.a.symbol,render:l.a.func}),l.a.arrayOf(l.a.oneOfType([l.a.func,l.a.string,l.a.shape({$$typeof:l.a.symbol,render:l.a.func})]))]),x={Fade:150,Collapse:350,Modal:300,Carousel:600},w=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],T={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},M={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},A=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],_=!("undefined"===typeof window||!window.document||!window.document.createElement);function P(e){return!(!e||"object"!==typeof e)&&"current"in e}function S(e){if(P(e))return e.current;if(o()(e))return e();if("string"===typeof e&&_){var t=document.querySelectorAll(e);if(t.length||(t=document.querySelectorAll("#"+e)),!t.length)throw new Error("The target '"+e+"' could not be identified in the dom, tip: check spelling");return t}return e}function C(e){return null!==e&&(Array.isArray(e)||_&&"number"===typeof e.length)}function k(e){var t=S(e);return C(t)?t[0]:t}var R=["touchstart","click"];function z(e,t,n,a){var r=e;C(r)||(r=[r]);var o=n;if("string"===typeof o&&(o=o.split(/\s+/)),!C(r)||"function"!==typeof t||!Array.isArray(o))throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");return Array.prototype.forEach.call(o,function(e){Array.prototype.forEach.call(r,function(n){n.addEventListener(e,t,a)})}),function(){Array.prototype.forEach.call(o,function(e){Array.prototype.forEach.call(r,function(n){n.removeEventListener(e,t,a)})})}}var D=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},120:function(e,t,n){"use strict";function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n.d(t,"a",function(){return a})},132:function(e,t){e.exports=function(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}},139:function(e,t,n){(function(t){var n="[object AsyncFunction]",a="[object Function]",r="[object GeneratorFunction]",o="[object Null]",c="[object Proxy]",l="[object Undefined]",i="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,u=i||s||Function("return this")(),d=Object.prototype,f=d.hasOwnProperty,m=d.toString,p=u.Symbol,b=p?p.toStringTag:void 0;function g(e){return null==e?void 0===e?l:o:b&&b in Object(e)?function(e){var t=f.call(e,b),n=e[b];try{e[b]=void 0;var a=!0}catch(o){}var r=m.call(e);a&&(t?e[b]=n:delete e[b]);return r}(e):function(e){return m.call(e)}(e)}e.exports=function(e){if(!function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}(e))return!1;var t=g(e);return t==a||t==r||t==n||t==c}}).call(this,n(66))},149:function(e,t,n){"use strict";var a=n(11),r=n(16),o=n(2),c=n.n(o),l=n(17),i=n.n(l),s=n(117),u=n.n(s),d=n(118),f={tag:d.tagPropType,noGutters:i.a.bool,className:i.a.string,cssModule:i.a.object,form:i.a.bool},m=function(e){var t=e.className,n=e.cssModule,o=e.noGutters,l=e.tag,i=e.form,s=Object(r.a)(e,["className","cssModule","noGutters","tag","form"]),f=Object(d.mapToCssModules)(u()(t,o?"no-gutters":null,i?"form-row":"row"),n);return c.a.createElement(l,Object(a.a)({},s,{className:f}))};m.propTypes=f,m.defaultProps={tag:"div"},t.a=m},150:function(e,t,n){"use strict";var a=n(11),r=n(16),o=n(132),c=n.n(o),l=n(2),i=n.n(l),s=n(17),u=n.n(s),d=n(117),f=n.n(d),m=n(118),p=u.a.oneOfType([u.a.number,u.a.string]),b=u.a.oneOfType([u.a.bool,u.a.number,u.a.string,u.a.shape({size:u.a.oneOfType([u.a.bool,u.a.number,u.a.string]),order:p,offset:p})]),g={tag:m.tagPropType,xs:b,sm:b,md:b,lg:b,xl:b,className:u.a.string,cssModule:u.a.object,widths:u.a.array},v={tag:"div",widths:["xs","sm","md","lg","xl"]},y=function(e,t,n){return!0===n||""===n?e?"col":"col-"+t:"auto"===n?e?"col-auto":"col-"+t+"-auto":e?"col-"+n:"col-"+t+"-"+n},h=function(e){var t=e.className,n=e.cssModule,o=e.widths,l=e.tag,s=Object(r.a)(e,["className","cssModule","widths","tag"]),u=[];o.forEach(function(t,a){var r=e[t];if(delete s[t],r||""===r){var o=!a;if(c()(r)){var l,i=o?"-":"-"+t+"-",d=y(o,t,r.size);u.push(Object(m.mapToCssModules)(f()(((l={})[d]=r.size||""===r.size,l["order"+i+r.order]=r.order||0===r.order,l["offset"+i+r.offset]=r.offset||0===r.offset,l)),n))}else{var p=y(o,t,r);u.push(p)}}}),u.length||u.push("col");var d=Object(m.mapToCssModules)(f()(t,u),n);return i.a.createElement(l,Object(a.a)({},s,{className:d}))};h.propTypes=g,h.defaultProps=v,t.a=h},156:function(e,t,n){"use strict";var a=n(11),r=n(16),o=n(2),c=n.n(o),l=n(17),i=n.n(l),s=n(117),u=n.n(s),d=n(118),f={tag:d.tagPropType,inverse:i.a.bool,color:i.a.string,body:i.a.bool,outline:i.a.bool,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])},m=function(e){var t=e.className,n=e.cssModule,o=e.color,l=e.body,i=e.inverse,s=e.outline,f=e.tag,m=e.innerRef,p=Object(r.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),b=Object(d.mapToCssModules)(u()(t,"card",!!i&&"text-white",!!l&&"card-body",!!o&&(s?"border":"bg")+"-"+o),n);return c.a.createElement(f,Object(a.a)({},p,{className:b,ref:m}))};m.propTypes=f,m.defaultProps={tag:"div"},t.a=m},157:function(e,t,n){"use strict";var a=n(11),r=n(16),o=n(2),c=n.n(o),l=n(17),i=n.n(l),s=n(117),u=n.n(s),d=n(118),f={tag:d.tagPropType,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])},m=function(e){var t=e.className,n=e.cssModule,o=e.innerRef,l=e.tag,i=Object(r.a)(e,["className","cssModule","innerRef","tag"]),s=Object(d.mapToCssModules)(u()(t,"card-body"),n);return c.a.createElement(l,Object(a.a)({},i,{className:s,ref:o}))};m.propTypes=f,m.defaultProps={tag:"div"},t.a=m},164:function(e,t,n){"use strict";var a=n(38);n.d(t,"n",function(){return a.a}),n.d(t,"F",function(){return a.d}),n.d(t,"G",function(){return a.g}),n.d(t,"L",function(){return a.h});var r=n(35);n.d(t,"d",function(){return r.a}),n.d(t,"e",function(){return r.b}),n.d(t,"f",function(){return r.c}),n.d(t,"g",function(){return r.d}),n.d(t,"D",function(){return r.e});var o=n(46);n.d(t,"c",function(){return o.a}),n.d(t,"E",function(){return o.c});var c=n(54);n.d(t,"t",function(){return c.a});var l=n(55);n.d(t,"O",function(){return l.a});var i=n(39);n.d(t,"m",function(){return i.a}),n.d(t,"s",function(){return i.d}),n.d(t,"v",function(){return i.g});var s=n(56);n.d(t,"u",function(){return s.a});var u=n(57);n.d(t,"y",function(){return u.a});var d=n(58);n.d(t,"o",function(){return d.a});var f=n(18);n.d(t,"h",function(){return f.a}),n.d(t,"p",function(){return f.b}),n.d(t,"q",function(){return f.e}),n.d(t,"H",function(){return f.h}),n.d(t,"I",function(){return f.k}),n.d(t,"K",function(){return f.n}),n.d(t,"N",function(){return f.q});var m=n(15);n.d(t,"b",function(){return m.a}),n.d(t,"i",function(){return m.d}),n.d(t,"k",function(){return m.e}),n.d(t,"r",function(){return m.h}),n.d(t,"w",function(){return m.k}),n.d(t,"x",function(){return m.n}),n.d(t,"z",function(){return m.q}),n.d(t,"M",function(){return m.v}),n.d(t,"P",function(){return m.y}),n.d(t,"Q",function(){return m.B});var p=n(25);n.d(t,"a",function(){return p.a}),n.d(t,"j",function(){return p.d}),n.d(t,"l",function(){return p.e}),n.d(t,"A",function(){return p.h}),n.d(t,"B",function(){return p.j}),n.d(t,"J",function(){return p.n});var b=n(59);n.d(t,"C",function(){return b.a})},184:function(e,t,n){"use strict";var a=n(11),r=n(16),o=n(120),c=n(24),l=n(2),i=n.n(l),s=n(17),u=n.n(s),d=n(117),f=n.n(d),m=n(118),p={children:u.a.node,type:u.a.string,size:u.a.string,bsSize:u.a.string,valid:u.a.bool,invalid:u.a.bool,tag:m.tagPropType,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),plaintext:u.a.bool,addon:u.a.bool,className:u.a.string,cssModule:u.a.object},b=function(e){function t(t){var n;return(n=e.call(this,t)||this).getRef=n.getRef.bind(Object(o.a)(n)),n.focus=n.focus.bind(Object(o.a)(n)),n}Object(c.a)(t,e);var n=t.prototype;return n.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},n.focus=function(){this.ref&&this.ref.focus()},n.render=function(){var e=this.props,t=e.className,n=e.cssModule,o=e.type,c=e.bsSize,l=e.valid,s=e.invalid,u=e.tag,d=e.addon,p=e.plaintext,b=e.innerRef,g=Object(r.a)(e,["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"]),v=["radio","checkbox"].indexOf(o)>-1,y=new RegExp("\\D","g"),h=u||("select"===o||"textarea"===o?o:"input"),E="form-control";p?(E+="-plaintext",h=u||"input"):"file"===o?E+="-file":v&&(E=d?null:"form-check-input"),g.size&&y.test(g.size)&&(Object(m.warnOnce)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),c=g.size,delete g.size);var O=Object(m.mapToCssModules)(f()(t,s&&"is-invalid",l&&"is-valid",!!c&&"form-control-"+c,E),n);return("input"===h||u&&"function"===typeof u)&&(g.type=o),g.children&&!p&&"select"!==o&&"string"===typeof h&&"select"!==h&&(Object(m.warnOnce)('Input with a type of "'+o+'" cannot have children. Please use "value"/"defaultValue" instead.'),delete g.children),i.a.createElement(h,Object(a.a)({},g,{ref:b,className:O}))},t}(i.a.Component);b.propTypes=p,b.defaultProps={type:"text"},t.a=b},211:function(e,t,n){"use strict";var a=n(11),r=n(16),o=n(2),c=n.n(o),l=n(17),i=n.n(l),s=n(117),u=n.n(s),d=n(118),f={color:i.a.string,pill:i.a.bool,tag:d.tagPropType,innerRef:i.a.oneOfType([i.a.object,i.a.func,i.a.string]),children:i.a.node,className:i.a.string,cssModule:i.a.object},m=function(e){var t=e.className,n=e.cssModule,o=e.color,l=e.innerRef,i=e.pill,s=e.tag,f=Object(r.a)(e,["className","cssModule","color","innerRef","pill","tag"]),m=Object(d.mapToCssModules)(u()(t,"badge","badge-"+o,!!i&&"badge-pill"),n);return f.href&&"span"===s&&(s="a"),c.a.createElement(s,Object(a.a)({},f,{className:m,ref:l}))};m.propTypes=f,m.defaultProps={color:"secondary",pill:!1,tag:"span"},t.a=m},212:function(e,t,n){"use strict";var a=n(11),r=n(16),o=n(2),c=n.n(o),l=n(17),i=n.n(l),s=n(117),u=n.n(s),d=n(118),f={children:i.a.node,tag:d.tagPropType,className:i.a.string,cssModule:i.a.object,valid:i.a.bool,tooltip:i.a.bool},m={tag:"div",valid:void 0},p=function(e){var t=e.className,n=e.cssModule,o=e.valid,l=e.tooltip,i=e.tag,s=Object(r.a)(e,["className","cssModule","valid","tooltip","tag"]),f=l?"tooltip":"feedback",m=Object(d.mapToCssModules)(u()(t,o?"valid-"+f:"invalid-"+f),n);return c.a.createElement(i,Object(a.a)({},s,{className:m}))};p.propTypes=f,p.defaultProps=m,t.a=p},519:function(e,t,n){"use strict";var a=n(2),r=n.n(a),o=(n(17),n(117)),c=n.n(o),l=function(e){var t=e.children||null,n=e.tag;return r.a.createElement(n,Object.assign({className:c()("timeline-alt","pb-0",e.className)},e),t)};l.defaultProps={tag:"div"},t.a=l},520:function(e,t,n){"use strict";var a=n(2),r=n.n(a),o=(n(17),n(117)),c=n.n(o),l=function(e){var t=e.children||null,n=e.tag;return r.a.createElement(n,Object.assign({className:c()("timeline-item",e.className)},e),t)};l.defaultProps={tag:"div"},t.a=l},567:function(e,t,n){"use strict";var a=n(2),r=n.n(a),o=n(211);t.a=function(e){var t=e.status_code,n={0:{name:"Secondary",color:"secondary",text:"\u5f8c\u9001\u521d\u59cb"},1:{name:"Warning",color:"warning",text:"\u5c08\u54e1\u8655\u7406\u4e2d"},2:{name:"Info",color:"info",text:"\u539f\u5ee0\u67e5\u8a62\u4e2d"},3:{name:"Danger",color:"danger",text:"\u5f8c\u9001\u689d\u4ef6\u4e0d\u8db3"},4:{name:"Success",color:"success",text:"\u5f8c\u9001\u8655\u7406\u5b8c\u6210"}};return r.a.createElement(o.a,{color:n[t].color,className:"mr-1"},n[t].text)}},686:function(e,t,n){"use strict";var a=n(3),r=n(283),o=n(2),c=n.n(o),l=n(149),i=n(150),s=n(156),u=n(157),d=n(184),f=n(212),m=n(454),p=n.n(m),b=n(416),g=n.n(b),v=n(519),y=n(520),h=n(567);t.a=function(e){var t=e.q_id,n=e.q_status,m=e.postAllocation,b=e.putAllocation,E=e.allocation,O=e.allocation_logs,N=e.user,j=Object(o.useState)(""),x=Object(r.a)(j,2),w=x[0],T=x[1],M=Object(o.useState)(""),A=Object(r.a)(M,2),_=A[0],P=A[1],S=Object(o.useState)({}),C=Object(r.a)(S,2),k=C[0],R=C[1],z=function(e){""!==_?(R(Object(a.a)({},k,{finishAllocateNote:""})),b({allocation_id:E.id,allocate_status:e,allocate_note:_}),P("")):R(Object(a.a)({},k,{finishAllocateNote:"\u8acb\u586b\u5beb\u5f8c\u9001\u8655\u7406\u63cf\u8ff0...."}))},D={0:"\u5f8c\u9001\u521d\u59cb",1:"\u5c08\u54e1\u8655\u7406\u4e2d",2:"\u539f\u5ee0\u67e5\u8a62\u4e2d",3:"\u5f8c\u9001\u689d\u4ef6\u4e0d\u8db3",4:"\u5f8c\u9001\u8655\u7406\u5b8c\u6210"},I=!0;return"4"===n.toString()&&(I=!1),E&&(0===E.allocate_status&&E.assignor!==N.uid&&(I=!1),1===E.allocate_status&&E.assignee!==N.uid&&(I=!1),3!==E.allocate_status&&4!==E.allocate_status||"admin"===N.role||"ants"===N.role||(I=!1)),c.a.createElement(l.a,null,c.a.createElement(i.a,{sm:12},c.a.createElement(s.a,{className:"font-13 border"},c.a.createElement(u.a,null,c.a.createElement("h5",null,"\u5f8c\u9001\u8655\u7406\u5340"),c.a.createElement("hr",null),!E&&"4"!==n&&c.a.createElement(o.Fragment,null,c.a.createElement(d.a,{type:"textarea",className:"form-control form-control-dark mb-2",rows:"3",placeholder:"\u8acb\u586b\u5beb\u5f8c\u9001\u4e8b\u7531\u4e26\u63d0\u4f9b\u5fc5\u8981\u8cc7\u6599",value:w,onChange:function(e){return T(e.target.value)},invalid:!!k.allocateNote}),c.a.createElement(f.a,null,k.allocateNote),c.a.createElement("div",{className:"text-right"},c.a.createElement("div",{className:"btn-group mb-2 ml-2"},c.a.createElement("button",{type:"button",className:"btn btn-danger btn-sm",onClick:function(e){""!==w?(R(Object(a.a)({},k,{allocateNote:""})),m(t,w)):R(Object(a.a)({},k,{allocateNote:"\u8acb\u586b\u5beb\u5f8c\u9001\u4e8b\u7531\u4e26\u63d0\u4f9b\u5fc5\u8981\u8cc7\u6599"}))}},"\u767c\u8d77\u5f8c\u9001")))),"4"===n&&c.a.createElement("div",{className:"text-muted font-14 m-2"}," \uff0a\u63d0\u554f\u55ae\u5df2\u7d50\u6848\u3002"),E&&c.a.createElement(o.Fragment,null,c.a.createElement("h6",{className:"card-title border p-2 mt-0 mb-0"},c.a.createElement("div",{className:"text-left"},c.a.createElement("p",{className:"text-muted"},c.a.createElement("strong",null,"\u76ee\u524d\u72c0\u614b :"),c.a.createElement("span",{className:"ml-2"},c.a.createElement(h.a,{status_code:E.allocate_status}))),c.a.createElement("p",{className:"text-muted"},c.a.createElement("strong",null,"\u8655\u7406\u5c08\u54e1 :"),c.a.createElement("span",{className:"ml-2"},E.assignee_name||"\u5c1a\u672a\u6307\u6d3e"))),c.a.createElement("span",{className:"ml-2"},E.admin_uname)," \u5728"," ",c.a.createElement("span",{className:"ml-2"},c.a.createElement(g.a,{format:"YYYY-MM-DD HH:mm:ss"},E.create_time))," ","\u767c\u8d77\u5f8c\u9001"),c.a.createElement("p",{className:"mb-2 text-primary font-15 border card p-2",style:{whiteSpace:"pre-line"}},E.allocate_cause),c.a.createElement("hr",null),0===E.allocate_status&&c.a.createElement("div",{className:"text-info mt-2"}," ","\u672c\u5f8c\u9001\u55ae\u9084\u5728\u7b49\u5019\u6d3e\u767c, \u4f46\u767c\u8d77\u4eba\u53ef\u4ee5\u7d50\u675f\u672c\u5f8c\u9001 ...."),Array.isArray(O)&&O.length>0&&c.a.createElement(s.a,null,c.a.createElement(u.a,null,c.a.createElement("h4",{className:"header-title mb-1"},"\u8655\u7406\u6b77\u7a0b"),c.a.createElement(p.a,{style:{maxHeight:"390px",width:"100%"}},c.a.createElement(v.a,null,O.map(function(e,t){return c.a.createElement(y.a,{key:"log-".concat(t)},c.a.createElement("i",{className:"mdi mdi-upload bg-info-lighten text-info timeline-icon"}),c.a.createElement("div",{className:"timeline-item-info"},c.a.createElement("span",{style:{whiteSpace:"pre-line"},className:"text-info font-weight-bold mb-1 d-block"},e.admin_uname," : ",e.allocate_note),c.a.createElement("small",null,"\u5f8c\u9001\u72c0\u614b\u8b8a\u66f4\u70ba \u201c",D[e.allocate_status],"\u201d"),c.a.createElement("p",{className:"mb-0 pb-2"},c.a.createElement("small",{className:"text-muted"},c.a.createElement(g.a,{format:"YYYY-MM-DD HH:mm:ss"},e.create_time)))))}))))),c.a.createElement("hr",null),I&&c.a.createElement(o.Fragment,null,c.a.createElement(d.a,{type:"textarea",className:"form-control form-control-dark mb-2",rows:"3",placeholder:"\u8acb\u586b\u5beb\u5f8c\u9001\u8655\u7406\u63cf\u8ff0....",value:_,onChange:function(e){return P(e.target.value)},invalid:!!k.finishAllocateNote}),c.a.createElement(f.a,null,k.finishAllocateNote),c.a.createElement("div",{className:"text-right"},c.a.createElement("div",{className:"btn-group mb-2 ml-2"},4===E.allocate_status&&c.a.createElement("button",{type:"button",className:"btn btn-danger btn-sm mt-2",onClick:function(e){return z(0)}},"\u518d\u6b21\u767c\u8d77\u5f8c\u9001"),0===E.allocate_status&&c.a.createElement("button",{type:"button",className:"btn btn-success btn-sm mt-2",onClick:function(e){return z(4)}},"\u8655\u7406\u5b8c\u7562"),1===E.allocate_status&&c.a.createElement(o.Fragment,null,c.a.createElement("button",{type:"button",className:"btn btn-primary btn-sm mt-2",onClick:function(e){return z(2)}},"\u5f8c\u9001\u539f\u5ee0")),(2===E.allocate_status||1===E.allocate_status)&&c.a.createElement(o.Fragment,null,c.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm mt-2",onClick:function(e){return z(3)}},"\u689d\u4ef6\u4e0d\u8db3"),c.a.createElement("button",{type:"button",className:"btn btn-success btn-sm mt-2",onClick:function(e){return z(4)}},"\u8655\u7406\u5b8c\u7562")),3===E.allocate_status&&c.a.createElement("button",{type:"button",className:"btn btn-warning btn-sm mt-2",onClick:function(e){return z(0)}},"\u88dc\u8db3\u689d\u4ef6")))))))))}}}]);
//# sourceMappingURL=51.ccd3f492.chunk.js.map
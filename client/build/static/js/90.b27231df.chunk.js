(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{1001:function(e,t,n){"use strict";n.r(t);var a=n(42),r=n(50),o=n(52),i=n(51),c=n(53),s=n(67),l=n(2),u=n.n(l),d=n(218),h=n(49),m=(n(19),n(154)),f=n(29),p=n(590),b=u.a.lazy(function(){return Promise.all([n.e(1),n.e(6),n.e(8)]).then(n.bind(null,697))}),y=u.a.lazy(function(){return Promise.all([n.e(0),n.e(92)]).then(n.bind(null,996))}),g=u.a.lazy(function(){return n.e(9).then(n.bind(null,694))}),v=u.a.lazy(function(){return Promise.all([n.e(6),n.e(11)]).then(n.bind(null,695))}),E=function(){return u.a.createElement("div",{className:"text-center"})},L=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(o.a)(this,Object(i.a)(t).call(this,e))).componentDidMount=function(){n.props.changeLayout(f.b)},n.openMenu=function(e){e.preventDefault(),n.setState({isMenuOpened:!n.state.isMenuOpened})},n.openMenu=n.openMenu.bind(Object(s.a)(Object(s.a)(n))),n.state={isMenuOpened:!1},n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.children||null;return u.a.createElement("div",{className:"app"},u.a.createElement("div",{className:"wrapper"},u.a.createElement("div",{className:"content-page"},u.a.createElement("div",{className:"content"},u.a.createElement(l.Suspense,{fallback:E()},u.a.createElement(b,Object.assign({isMenuOpened:this.state.isMenuOpened,openLeftMenuCallBack:this.openMenu,navCssClasses:"topnav-navbar"},this.props))),u.a.createElement(l.Suspense,{fallback:E()},u.a.createElement(y,Object.assign({isMenuOpened:this.state.isMenuOpened},this.props))),u.a.createElement(d.a,{fluid:!0},u.a.createElement(l.Suspense,{fallback:E()},e))),u.a.createElement(l.Suspense,{fallback:E()},u.a.createElement(g,this.props)),u.a.createElement(l.Suspense,{fallback:E()},u.a.createElement(v,this.props,u.a.createElement(p.a,null))))))}}]),t}(l.Component);t.default=Object(h.b)(function(e){return{layout:e.Layout}},{changeLayout:m.d})(L)},117:function(e,t,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var i=r.apply(null,a);i&&e.push(i)}else if("object"===o)for(var c in a)n.call(a,c)&&a[c]&&e.push(c)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},118:function(e,t,n){"use strict";n.r(t),n.d(t,"getScrollbarWidth",function(){return s}),n.d(t,"setScrollbarWidth",function(){return l}),n.d(t,"isBodyOverflowing",function(){return u}),n.d(t,"getOriginalBodyPadding",function(){return d}),n.d(t,"conditionallyUpdateScrollbar",function(){return h}),n.d(t,"setGlobalCssModule",function(){return m}),n.d(t,"mapToCssModules",function(){return f}),n.d(t,"omit",function(){return p}),n.d(t,"pick",function(){return b}),n.d(t,"warnOnce",function(){return g}),n.d(t,"deprecated",function(){return v}),n.d(t,"DOMElement",function(){return L}),n.d(t,"targetPropType",function(){return S}),n.d(t,"tagPropType",function(){return k}),n.d(t,"TransitionTimeouts",function(){return N}),n.d(t,"TransitionPropTypeKeys",function(){return O}),n.d(t,"TransitionStatuses",function(){return w}),n.d(t,"keyCodes",function(){return T}),n.d(t,"PopperPlacements",function(){return j}),n.d(t,"canUseDOM",function(){return x}),n.d(t,"isReactRefObj",function(){return D}),n.d(t,"findDOMElements",function(){return C}),n.d(t,"isArrayOrNodeList",function(){return M}),n.d(t,"getTarget",function(){return z}),n.d(t,"defaultToggleEvents",function(){return F}),n.d(t,"addMultipleEventListeners",function(){return A}),n.d(t,"focusableElements",function(){return B});var a,r=n(134),o=n.n(r),i=n(19),c=n.n(i);function s(){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}function l(e){document.body.style.paddingRight=e>0?e+"px":null}function u(){return document.body.clientWidth<window.innerWidth}function d(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function h(){var e=s(),t=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=t?parseInt(t.style.paddingRight||0,10):0;u()&&l(n+e)}function m(e){a=e}function f(e,t){return void 0===e&&(e=""),void 0===t&&(t=a),t?e.split(" ").map(function(e){return t[e]||e}).join(" "):e}function p(e,t){var n={};return Object.keys(e).forEach(function(a){-1===t.indexOf(a)&&(n[a]=e[a])}),n}function b(e,t){for(var n,a=Array.isArray(t)?t:[t],r=a.length,o={};r>0;)o[n=a[r-=1]]=e[n];return o}var y={};function g(e){y[e]||("undefined"!==typeof console&&console.error(e),y[e]=!0)}function v(e,t){return function(n,a,r){null!==n[a]&&"undefined"!==typeof n[a]&&g('"'+a+'" property of "'+r+'" has been deprecated.\n'+t);for(var o=arguments.length,i=new Array(o>3?o-3:0),c=3;c<o;c++)i[c-3]=arguments[c];return e.apply(void 0,[n,a,r].concat(i))}}var E="object"===typeof window&&window.Element||function(){};function L(e,t,n){if(!(e[t]instanceof E))return new Error("Invalid prop `"+t+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")}var S=c.a.oneOfType([c.a.string,c.a.func,L,c.a.shape({current:c.a.any})]),k=c.a.oneOfType([c.a.func,c.a.string,c.a.shape({$$typeof:c.a.symbol,render:c.a.func}),c.a.arrayOf(c.a.oneOfType([c.a.func,c.a.string,c.a.shape({$$typeof:c.a.symbol,render:c.a.func})]))]),N={Fade:150,Collapse:350,Modal:300,Carousel:600},O=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],w={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},T={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},j=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],x=!("undefined"===typeof window||!window.document||!window.document.createElement);function D(e){return!(!e||"object"!==typeof e)&&"current"in e}function C(e){if(D(e))return e.current;if(o()(e))return e();if("string"===typeof e&&x){var t=document.querySelectorAll(e);if(t.length||(t=document.querySelectorAll("#"+e)),!t.length)throw new Error("The target '"+e+"' could not be identified in the dom, tip: check spelling");return t}return e}function M(e){return null!==e&&(Array.isArray(e)||x&&"number"===typeof e.length)}function z(e){var t=C(e);return M(t)?t[0]:t}var F=["touchstart","click"];function A(e,t,n,a){var r=e;M(r)||(r=[r]);var o=n;if("string"===typeof o&&(o=o.split(/\s+/)),!M(r)||"function"!==typeof t||!Array.isArray(o))throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");return Array.prototype.forEach.call(o,function(e){Array.prototype.forEach.call(r,function(n){n.addEventListener(e,t,a)})}),function(){Array.prototype.forEach.call(o,function(e){Array.prototype.forEach.call(r,function(n){n.removeEventListener(e,t,a)})})}}var B=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},134:function(e,t,n){(function(t){var n="[object AsyncFunction]",a="[object Function]",r="[object GeneratorFunction]",o="[object Null]",i="[object Proxy]",c="[object Undefined]",s="object"==typeof t&&t&&t.Object===Object&&t,l="object"==typeof self&&self&&self.Object===Object&&self,u=s||l||Function("return this")(),d=Object.prototype,h=d.hasOwnProperty,m=d.toString,f=u.Symbol,p=f?f.toStringTag:void 0;function b(e){return null==e?void 0===e?c:o:p&&p in Object(e)?function(e){var t=h.call(e,p),n=e[p];try{e[p]=void 0;var a=!0}catch(o){}var r=m.call(e);a&&(t?e[p]=n:delete e[p]);return r}(e):function(e){return m.call(e)}(e)}e.exports=function(e){if(!function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}(e))return!1;var t=b(e);return t==a||t==r||t==n||t==i}}).call(this,n(66))},154:function(e,t,n){"use strict";var a=n(39);n.d(t,"q",function(){return a.a}),n.d(t,"O",function(){return a.d}),n.d(t,"P",function(){return a.g}),n.d(t,"U",function(){return a.h});var r=n(36);n.d(t,"d",function(){return r.a}),n.d(t,"e",function(){return r.b}),n.d(t,"f",function(){return r.c}),n.d(t,"g",function(){return r.d}),n.d(t,"M",function(){return r.e});var o=n(48);n.d(t,"c",function(){return o.a}),n.d(t,"N",function(){return o.c});var i=n(56);n.d(t,"y",function(){return i.a});var c=n(57);n.d(t,"X",function(){return c.a});var s=n(40);n.d(t,"o",function(){return s.a}),n.d(t,"w",function(){return s.d}),n.d(t,"A",function(){return s.g});var l=n(41);n.d(t,"i",function(){return l.a}),n.d(t,"n",function(){return l.b}),n.d(t,"u",function(){return l.e}),n.d(t,"z",function(){return l.h});var u=n(58);n.d(t,"E",function(){return u.a});var d=n(59);n.d(t,"r",function(){return d.a});var h=n(20);n.d(t,"h",function(){return h.a}),n.d(t,"s",function(){return h.b}),n.d(t,"t",function(){return h.e}),n.d(t,"Q",function(){return h.h}),n.d(t,"R",function(){return h.k}),n.d(t,"T",function(){return h.n}),n.d(t,"W",function(){return h.q});var m=n(14);n.d(t,"b",function(){return m.a}),n.d(t,"j",function(){return m.d}),n.d(t,"l",function(){return m.e}),n.d(t,"v",function(){return m.h}),n.d(t,"B",function(){return m.k}),n.d(t,"C",function(){return m.n}),n.d(t,"D",function(){return m.o}),n.d(t,"F",function(){return m.t}),n.d(t,"G",function(){return m.v}),n.d(t,"V",function(){return m.A}),n.d(t,"Y",function(){return m.D}),n.d(t,"Z",function(){return m.G});var f=n(27);n.d(t,"a",function(){return f.a}),n.d(t,"k",function(){return f.d}),n.d(t,"m",function(){return f.e}),n.d(t,"H",function(){return f.h}),n.d(t,"I",function(){return f.j}),n.d(t,"S",function(){return f.n});var p=n(28);n.d(t,"p",function(){return p.a}),n.d(t,"x",function(){return p.d}),n.d(t,"J",function(){return p.g}),n.d(t,"K",function(){return p.j}),n.d(t,"L",function(){return p.m})},218:function(e,t,n){"use strict";var a=n(12),r=n(18),o=n(2),i=n.n(o),c=n(19),s=n.n(c),l=n(117),u=n.n(l),d=n(118),h={tag:d.tagPropType,fluid:s.a.bool,className:s.a.string,cssModule:s.a.object},m=function(e){var t=e.className,n=e.cssModule,o=e.fluid,c=e.tag,s=Object(r.a)(e,["className","cssModule","fluid","tag"]),l=Object(d.mapToCssModules)(u()(t,o?"container-fluid":"container"),n);return i.a.createElement(c,Object(a.a)({},s,{className:l}))};m.propTypes=h,m.defaultProps={tag:"div"},t.a=m},590:function(e,t,n){"use strict";var a=n(42),r=n(50),o=n(52),i=n(51),c=n(53),s=n(67),l=n(2),u=n.n(l),d=n(49),h=(n(19),n(154)),m=n(29),f=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(o.a)(this,Object(i.a)(t).call(this,e))).componentDidMount=function(){n._loadStateFromProps()},n.componentDidUpdate=function(e,t){e!==n.props&&n._loadStateFromProps()},n.handleClose=function(e){e.preventDefault(),n.props.hideRightSidebar()},n.changeLayout=function(e){switch(e.currentTarget.value){case"horizontal":n.setState({isHorizontalLayout:!n.state.isHorizontalLayout,isCondensed:!1,isDetachedLayout:!1}),n.props.changeLayout(m.b);break;case"detached":n.setState({isDetachedLayout:!n.state.isDetachedLayout,isHorizontalLayout:!1,isBoxed:!1}),n.props.changeLayout(m.a);break;default:n.setState({isHorizontalLayout:!1,isCondensed:!1,isDetachedLayout:!1}),n.props.changeLayout(m.c)}},n.changeWidthMode=function(e){switch(e.currentTarget.value){case"boxed":n.setState({isBoxed:!0}),n.props.changeLayoutWidth(m.d);break;default:n.setState({isBoxed:!1}),n.props.changeLayoutWidth(m.e)}},n.changeTheme=function(e){switch(e.currentTarget.value){case"light":n.setState({isLight:!0}),n.props.changeSidebarTheme(m.h);break;case"dark":n.setState({isLight:!1,isDark:!0}),n.props.changeSidebarTheme(m.f);break;default:n.setState({isLight:!1,isDark:!1}),n.props.changeSidebarTheme(m.g)}},n.changeLeftSiderbarType=function(e){switch(e.currentTarget.value){case"condensed":n.setState({isCondensed:!0,isSidebarScrollable:!1,isLight:!1,isDark:!1}),n.props.changeSidebarType(m.i);break;case"scrollable":n.setState({isCondensed:!1,isSidebarScrollable:!0}),n.props.changeSidebarType(m.k);break;default:n.setState({isCondensed:!1,isSidebarScrollable:!1}),n.props.changeSidebarType(m.j)}},n.handleClose=n.handleClose.bind(Object(s.a)(Object(s.a)(n))),n.changeLayout=n.changeLayout.bind(Object(s.a)(Object(s.a)(n))),n.changeWidthMode=n.changeWidthMode.bind(Object(s.a)(Object(s.a)(n))),n.changeTheme=n.changeTheme.bind(Object(s.a)(Object(s.a)(n))),n.changeLeftSiderbarType=n.changeLeftSiderbarType.bind(Object(s.a)(Object(s.a)(n))),n.state={isHorizontalLayout:!1,isDetachedLayout:!1,isBoxed:!1,isSidebarScrollable:!1,isCondensed:!1,isLight:!1,isDark:!1},n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"_loadStateFromProps",value:function(){this.setState({isHorizontalLayout:this.props.layoutType===m.b,isDetachedLayout:this.props.layoutType===m.a,isBoxed:this.props.layoutWidth===m.d,isSidebarScrollable:this.props.leftSideBarType===m.k,isCondensed:this.props.leftSideBarType===m.i,isLight:this.props.leftSideBarTheme===m.h,isDark:this.props.leftSideBarTheme===m.f})}},{key:"render",value:function(){return u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"mt-2 p-2"},u.a.createElement("div",{className:"alert alert-primary",role:"alert"},u.a.createElement("strong",null,"Customize the layout, sidebar menu, etc"))),u.a.createElement("h5",{className:"pl-3"},"Layout"),u.a.createElement("div",{className:"pl-3"},u.a.createElement("div",{className:"pt-2"},u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"layout",value:"vertical",id:"vertical-check",onChange:this.changeLayout,checked:!this.state.isHorizontalLayout&&!this.state.isDetachedLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"vertical-check"},"Vertical Layout (Default)")),u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"layout",value:"horizontal",id:"horizontal-check",onChange:this.changeLayout,checked:this.state.isHorizontalLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"horizontal-check"},"Horizontal Layout")),u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"layout",value:"detached",id:"detached-check",onChange:this.changeLayout,checked:this.state.isDetachedLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"detached-check"},"Detached Layout")))),u.a.createElement("hr",{className:"mb-0 mt-2"}),u.a.createElement("h5",{className:"pl-3"},"Width"),u.a.createElement("div",{className:"mt-2 pl-3"},u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"width",value:"fluid",id:"fluid-check",checked:!this.state.isBoxed,onChange:this.changeWidthMode,disabled:this.state.isDetachedLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"fluid-check"},"Fluid")),u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"width",value:"boxed",id:"boxed-check",checked:this.state.isBoxed,onChange:this.changeWidthMode,disabled:this.state.isDetachedLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"boxed-check"},"Boxed"))),u.a.createElement("hr",{className:"mb-0"}),u.a.createElement("h5",{className:"pl-3"},"Left Sidebar"),u.a.createElement("div",{className:"pl-3"},u.a.createElement("div",{className:"pt-2"},u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"theme",value:"default",id:"default-theme-check",checked:!this.state.isLight&&!this.state.isDark,onChange:this.changeTheme,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"default-theme-check"},"Default")),u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"theme",value:"light",id:"light-theme-check",onChange:this.changeTheme,checked:this.state.isLight,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"light-theme-check"},"Light")),u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"theme",value:"dark",id:"dark-theme-check",onChange:this.changeTheme,checked:this.state.isDark,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"dark-theme-check"},"Dark")))),u.a.createElement("div",{className:"pl-3"},u.a.createElement("div",{className:"pt-2"},u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"fixed",id:"left-sidebar-width-fixed",checked:!this.state.isCondensed&&!this.state.isSidebarScrollable,onChange:this.changeLeftSiderbarType,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-fixed"},"Fixed (Default)")),u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"condensed",id:"left-sidebar-width-condensed",onChange:this.changeLeftSiderbarType,checked:this.state.isCondensed,disabled:this.state.isHorizontalLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-condensed"},"Condensed")),u.a.createElement("div",{className:"custom-control custom-switch mb-1"},u.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"scrollable",id:"left-sidebar-width-scrollable",onChange:this.changeLeftSiderbarType,checked:this.state.isSidebarScrollable,disabled:this.state.isHorizontalLayout}),u.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-scrollable"},"Scrollable")))))}}]),t}(l.Component);t.a=Object(d.b)(function(e){return{showRightSidebar:e.Layout.showRightSidebar,layoutType:e.Layout.layoutType,layoutWidth:e.Layout.layoutWidth,leftSideBarTheme:e.Layout.leftSideBarTheme,leftSideBarType:e.Layout.leftSideBarType}},{hideRightSidebar:h.M,changeLayout:h.d,changeLayoutWidth:h.e,changeSidebarType:h.g,changeSidebarTheme:h.f})(f)}}]);
//# sourceMappingURL=90.b27231df.chunk.js.map
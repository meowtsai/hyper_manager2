(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{131:function(e,a){e.exports=function(e){var a=typeof e;return!!e&&("object"==a||"function"==a)}},146:function(e,a,t){"use strict";var o=t(10),s=t(15),r=t(0),n=t.n(r),c=t(16),l=t.n(c),u=t(113),m=t.n(u),f=t(114),i={tag:f.tagPropType,noGutters:l.a.bool,className:l.a.string,cssModule:l.a.object,form:l.a.bool},d=function(e){var a=e.className,t=e.cssModule,r=e.noGutters,c=e.tag,l=e.form,u=Object(s.a)(e,["className","cssModule","noGutters","tag","form"]),i=Object(f.mapToCssModules)(m()(a,r?"no-gutters":null,l?"form-row":"row"),t);return n.a.createElement(c,Object(o.a)({},u,{className:i}))};d.propTypes=i,d.defaultProps={tag:"div"},a.a=d},147:function(e,a,t){"use strict";var o=t(10),s=t(15),r=t(131),n=t.n(r),c=t(0),l=t.n(c),u=t(16),m=t.n(u),f=t(113),i=t.n(f),d=t(114),p=m.a.oneOfType([m.a.number,m.a.string]),g=m.a.oneOfType([m.a.bool,m.a.number,m.a.string,m.a.shape({size:m.a.oneOfType([m.a.bool,m.a.number,m.a.string]),order:p,offset:p})]),b={tag:d.tagPropType,xs:g,sm:g,md:g,lg:g,xl:g,className:m.a.string,cssModule:m.a.object,widths:m.a.array},v={tag:"div",widths:["xs","sm","md","lg","xl"]},w=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},h=function(e){var a=e.className,t=e.cssModule,r=e.widths,c=e.tag,u=Object(s.a)(e,["className","cssModule","widths","tag"]),m=[];r.forEach(function(a,o){var s=e[a];if(delete u[a],s||""===s){var r=!o;if(n()(s)){var c,l=r?"-":"-"+a+"-",f=w(r,a,s.size);m.push(Object(d.mapToCssModules)(i()(((c={})[f]=s.size||""===s.size,c["order"+l+s.order]=s.order||0===s.order,c["offset"+l+s.offset]=s.offset||0===s.offset,c)),t))}else{var p=w(r,a,s);m.push(p)}}}),m.length||m.push("col");var f=Object(d.mapToCssModules)(i()(a,m),t);return l.a.createElement(c,Object(o.a)({},u,{className:f}))};h.propTypes=b,h.defaultProps=v,a.a=h},680:function(e,a,t){"use strict";t.r(a);var o=t(0),s=t.n(o),r=t(146),n=t(147);a.default=function(){var e=(new Date).getFullYear();return s.a.createElement(s.a.Fragment,null,s.a.createElement("footer",{className:"footer"},s.a.createElement("div",{className:"container-fluid"},s.a.createElement(r.a,null,s.a.createElement(n.a,{md:6},e," \xa9 LongE - longeplay.com.tw"),s.a.createElement(n.a,{md:6},s.a.createElement("div",{className:"text-md-right footer-links d-none d-md-block"},s.a.createElement("a",{href:"/"},"About")))))))}}}]);
//# sourceMappingURL=9.ca6d9a4a.chunk.js.map
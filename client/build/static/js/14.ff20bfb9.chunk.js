(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{153:function(e,a,t){"use strict";var s=t(18),o=t(27),r=t(3),n=t.n(r),l=t(43),c=t.n(l),u=t(122),m=t.n(u),d=t(123),i=c.a.oneOfType([c.a.number,c.a.string]),f={tag:d.tagPropType,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool,xs:i,sm:i,md:i,lg:i,xl:i},p={tag:"div",widths:["xs","sm","md","lg","xl"]},g=function(e){var a=e.className,t=e.cssModule,r=e.noGutters,l=e.tag,c=e.form,u=e.widths,i=Object(o.a)(e,["className","cssModule","noGutters","tag","form","widths"]),f=[];u.forEach(function(a,t){var s=e[a];if(delete i[a],s){var o=!t;f.push(o?"row-cols-"+s:"row-cols-"+a+"-"+s)}});var p=Object(d.mapToCssModules)(m()(a,r?"no-gutters":null,c?"form-row":"row",f),t);return n.a.createElement(l,Object(s.a)({},i,{className:p}))};g.propTypes=f,g.defaultProps=p,a.a=g},154:function(e,a,t){"use strict";var s=t(18),o=t(27),r=t(3),n=t.n(r),l=t(43),c=t.n(l),u=t(122),m=t.n(u),d=t(123),i=c.a.oneOfType([c.a.number,c.a.string]),f=c.a.oneOfType([c.a.bool,c.a.number,c.a.string,c.a.shape({size:c.a.oneOfType([c.a.bool,c.a.number,c.a.string]),order:i,offset:i})]),p={tag:d.tagPropType,xs:f,sm:f,md:f,lg:f,xl:f,className:c.a.string,cssModule:c.a.object,widths:c.a.array},g={tag:"div",widths:["xs","sm","md","lg","xl"]},b=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},w=function(e){var a=e.className,t=e.cssModule,r=e.widths,l=e.tag,c=Object(o.a)(e,["className","cssModule","widths","tag"]),u=[];r.forEach(function(a,s){var o=e[a];if(delete c[a],o||""===o){var r=!s;if(Object(d.isObject)(o)){var n,l=r?"-":"-"+a+"-",i=b(r,a,o.size);u.push(Object(d.mapToCssModules)(m()(((n={})[i]=o.size||""===o.size,n["order"+l+o.order]=o.order||0===o.order,n["offset"+l+o.offset]=o.offset||0===o.offset,n)),t))}else{var f=b(r,a,o);u.push(f)}}}),u.length||u.push("col");var i=Object(d.mapToCssModules)(m()(a,u),t);return n.a.createElement(l,Object(s.a)({},c,{className:i}))};w.propTypes=p,w.defaultProps=g,a.a=w},652:function(e,a,t){"use strict";t.r(a);var s=t(3),o=t.n(s),r=t(153),n=t(154);a.default=function(){var e=(new Date).getFullYear();return o.a.createElement(o.a.Fragment,null,o.a.createElement("footer",{className:"footer"},o.a.createElement("div",{className:"container-fluid"},o.a.createElement(r.a,null,o.a.createElement(n.a,{md:6},e," \xa9 LongE - longeplay.com.tw"),o.a.createElement(n.a,{md:6},o.a.createElement("div",{className:"text-md-right footer-links d-none d-md-block"},o.a.createElement("a",{href:"/"},"About")))))))}}}]);
//# sourceMappingURL=14.ff20bfb9.chunk.js.map
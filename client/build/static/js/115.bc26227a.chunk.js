(window.webpackJsonp=window.webpackJsonp||[]).push([[115],{1107:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),r=a(649),c=a(161),m=a(3),s=a.n(m),u=a(129),i=a(153),o=a(154),E=a(151),p=a(152),d=a(166),g=a(176),b=a(174),f=a(177),v=a(175),h=a(150),N=a(53),w=a(433),O=a(650),j=a(7),x=a.n(j);t.default=function(){var e=Object(m.useState)(""),t=Object(c.a)(e,2),a=t[0],l=t[1],j=Object(m.useState)([]),k=Object(c.a)(j,2),y=k[0],I=k[1],S=Object(m.useState)({}),C=Object(c.a)(S,2),D=C[0],F=C[1],J=Object(m.useState)(0),_=Object(c.a)(J,2),A=_[0],H=_[1],R=Object(m.useState)(!1),T=Object(c.a)(R,2),V=T[0],q=T[1],z=Object(m.useState)({}),B=Object(c.a)(z,2),G=B[0],K=B[1],L=Object(m.useState)({gameId:"",gameName:""}),M=Object(c.a)(L,2),P=M[0],Q=M[1],U=function(){var e=Object(r.a)(n.a.mark(function e(t){var a,r,c,m,s,u,i,o;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),x.a.defaults.timeout=18e4,a=0,r=0,e.prev=3,c=0;case 5:if(!(c<y.length/100)){e.next=20;break}return H(c),(m=new FormData).append("site",P.gameId),m.append("lines",JSON.stringify(y.slice(100*c,100*c+100))),e.next=12,x.a.post("/api/vip_upload",m);case 12:s=e.sent,u=s.data,i=u.insertCount,o=u.updateCount,a+=i,r+=o,console.log(c,s.data);case 17:c++,e.next=5;break;case 20:q(!1),K({msg:"\u4f5c\u696d\u5b8c\u6210\uff0c\u5171\u65b0\u589e ".concat(a,"\u7b46, \u66f4\u65b0").concat(r,"\u7b46")}),H(0),I([]),l(""),Q({gameId:"",gameName:""}),e.next=33;break;case 28:e.prev=28,e.t0=e.catch(3),console.log(e.t0),F({msg:e.t0}),q(!1);case 33:case"end":return e.stop()}},e,null,[[3,28]])}));return function(t){return e.apply(this,arguments)}}();return A>0?s.a.createElement(O.a,{value:100/(y.length/100)*A}):V?s.a.createElement(w.a,null):s.a.createElement(m.Fragment,null,s.a.createElement(u.a,{breadCrumbItems:[{label:"\u9be8\u9b5a\u7528\u6236\u540d\u55ae\u4e0a\u50b3",path:"/vip/upload",active:!1}],title:"\u9be8\u9b5a\u7528\u6236\u540d\u55ae\u4e0a\u50b3"}),s.a.createElement(i.a,{className:"mb-2"},s.a.createElement(o.a,{lg:4},s.a.createElement(E.a,null,s.a.createElement(p.a,null,s.a.createElement("h4",{className:"mb-3 header-title"},"\u4e0a\u50b3\u65b0\u540d\u55ae"),D.msg&&s.a.createElement(d.a,{color:"danger",isOpen:!!D.msg},s.a.createElement("div",null,D.msg)),s.a.createElement(g.a,null,s.a.createElement(b.a,null,s.a.createElement(f.a,{for:"file01"},"\u76f8\u95dc\u6a94\u68481"),s.a.createElement(v.a,{type:"file",name:"file01",id:"file01",onChange:function(e){l(e.target.files)}})),s.a.createElement(N.b,{className:"btn btn-secondary mr-2",to:"/vip/whale_users"},"\u53d6\u6d88"),s.a.createElement(h.a,{color:"dark mr-2",onClick:function(){if(console.log("preSubmitValidation \u9a57\u8b49\u8cc7\u6599"),""!==a){var e=new FileReader;e.onload=function(e){I([]);var t=e.target.result.split("\n");try{if(t.length>0){var a,l=t[0].split(","),n=!1;l.forEach(function(e,t){if(e.indexOf("@")>-1)if(a=e,1===t)Q({gameId:"g66naxx2tw",gameName:"\u660e\u65e5\u4e4b\u5f8c"}),n=isNaN(Number.parseInt(5*l[6].replace("\r","")));else{if(5!==t)throw new Error("\u542b\u6709@\u7b26\u865f\u7684uid\u6b04\u4f4d\u4e0d\u5728\u9810\u671f\u7684\u4f4d\u7f6e");Q({gameId:"h55naxx2tw",gameName:"\u7b2c\u4e94\u4eba\u683c"}),n=isNaN(Number.parseInt(l[3]))}if(n)throw new Error("\u5132\u503c\u91d1\u984d\u6b04\u4f4d\u4e0d\u662f\u6578\u503c");if(t===l.length-1&&!a)throw new Error("\u7b2c\u4e00\u5217\u8cc7\u6599\u627e\u4e0d\u5230\u542b\u6709@\u7b26\u865f\u7684uid\u6b04\u4f4d ")})}I(t),F({})}catch(r){F({msg:r+"- \u7121\u6cd5\u89e3\u6790\u6a94\u6848"})}},e.readAsText(a[0])}}},"\u9a57\u8b49\u8cc7\u6599"))))),s.a.createElement(o.a,{lg:8},G.msg&&s.a.createElement(d.a,{color:"success",isOpen:!!G.msg},s.a.createElement("div",null,G.msg)),y.length>0&&!D.msg&&s.a.createElement(h.a,{color:"primary",type:"submit",onClick:U},"\u532f\u5165\u540d\u55ae(",P.gameName,")"),s.a.createElement("table",null,s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"\u5e33\u865f"),s.a.createElement("th",null,"\u66b1\u7a31"),s.a.createElement("th",null,"\u89d2\u8272ID"),s.a.createElement("th",null,"\u4f3a\u670d\u5668"),s.a.createElement("th",null,"\u5132\u503c\u7e3d\u984d"),s.a.createElement("th",null,"\u6700\u5f8c\u767b\u5165"))),s.a.createElement("tbody",null,y.slice(0,10).map(function(e){return e.length>0?s.a.createElement("tr",null,s.a.createElement("td",null,e.split(",")[1].split("@")[0]),s.a.createElement("td",null,e.split(",")[3]),s.a.createElement("td",null,e.split(",")[7]),s.a.createElement("td",null,e.split(",")[0]),s.a.createElement("td",null,Number.parseInt(5*e.split(",")[6].replace("\r",""))),s.a.createElement("td",null,e.split(",")[5])):null}))))))}},129:function(e,t,a){"use strict";var l=a(3),n=a.n(l),r=a(53),c=a(153),m=a(154),s=a(148),u=a(149);a(43);t.a=function(e){return n.a.createElement(c.a,null,n.a.createElement(m.a,null,n.a.createElement("div",{className:"page-title-box"},n.a.createElement("div",{className:"page-title-right"},n.a.createElement(s.a,null,n.a.createElement(u.a,null,n.a.createElement(r.b,{to:"/"},"Hyper")),e.breadCrumbItems.map(function(e,t){return e.active?n.a.createElement(u.a,{active:!0,key:t},e.label):n.a.createElement(u.a,{key:t},n.a.createElement(r.b,{to:e.path},e.label))}))),n.a.createElement("h4",{className:"page-title"},e.title))))}},433:function(e,t,a){"use strict";var l=a(3),n=a.n(l);t.a=function(){return n.a.createElement("div",{className:"preloader"},n.a.createElement("div",{className:"status"},n.a.createElement("div",{className:"bouncing-loader"},n.a.createElement("div",null),n.a.createElement("div",null),n.a.createElement("div",null))))}},650:function(e,t,a){"use strict";var l=a(3),n=a.n(l),r=a(238);t.a=function(e){return console.log(e),n.a.createElement("div",{className:"preloader"},n.a.createElement("div",{className:"status"},n.a.createElement(r.a,{color:"success",value:e.value})))}}}]);
//# sourceMappingURL=115.bc26227a.chunk.js.map
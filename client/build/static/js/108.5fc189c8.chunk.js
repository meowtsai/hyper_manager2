(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{1042:function(n,t,e){"use strict";e.r(t);var r=e(3),u=e(187),a=e(2),c=e.n(a),o=e(50),d=e(47),i=e(126),l=e(147),f=e(148),m=e(165),s=e(157),b=e(158),p=e(182),E=e(181),v=e(188),w=e(174),g=e(206),h=e(191),y=e(149);t.default=Object(o.b)(function(n){return{user:n.Auth.user,updated:n.Platform.updated,loading:n.Platform.loading,error:n.Platform.error}},{updatePassword:y.kb})(function(n){var t=n.user.account,e=n.updatePassword,o=n.updated,y=(n.loading,n.error),j=Object(a.useState)(""),k=Object(u.a)(j,2),x=k[0],O=k[1],_=Object(a.useState)({}),N=Object(u.a)(_,2),P=N[0],C=N[1];Object(a.useEffect)(function(){C(y||{})},[y]);return c.a.createElement(a.Fragment,null,c.a.createElement(i.a,{breadCrumbItems:[{label:"\u4fee\u6539\u5bc6\u78bc",path:"/platform/modify_password",active:!0}],title:"\u4fee\u6539\u5bc6\u78bc"}),c.a.createElement(l.a,{className:"mb-2"},c.a.createElement(f.a,{lg:4},o&&c.a.createElement(m.a,{color:"success"},c.a.createElement("strong",null," \u5bc6\u78bc\u4fee\u6539\u6210\u529f ")),c.a.createElement(s.a,null,c.a.createElement(b.a,null,c.a.createElement(p.a,{onSubmit:function(n){n.preventDefault(),""!==x?e(t,x):C(Object(r.a)({},P,{password:"\u8acb\u586b\u5beb\u65b0\u5bc6\u78bc"}))}},c.a.createElement(E.a,null,c.a.createElement(v.a,{for:"txt_account"},"\u5e33\u865f"),c.a.createElement(w.a,{type:"text",name:"txt_account",id:"txt_account",placeholder:"Readonly value",value:t,readOnly:!0})),c.a.createElement(E.a,null,c.a.createElement(v.a,{for:"txt_password"},"\u5bc6\u78bc"),c.a.createElement(w.a,{type:"password",name:"txt_password",id:"txt_password",value:x,onChange:function(n){return O(n.target.value)},invalid:!!P.password}),c.a.createElement(g.a,null,P.password)),c.a.createElement(d.b,{className:"btn btn-secondary mr-2",to:"/"},"\u53d6\u6d88"),c.a.createElement(h.a,{color:"primary",type:"submit"},"\u78ba\u8a8d\u9001\u51fa")))))))})},126:function(n,t,e){"use strict";var r=e(2),u=e.n(r),a=e(47),c=e(147),o=e(148),d=e(150),i=e(151);e(22);t.a=function(n){return u.a.createElement(c.a,null,u.a.createElement(o.a,null,u.a.createElement("div",{className:"page-title-box"},u.a.createElement("div",{className:"page-title-right"},u.a.createElement(d.a,null,u.a.createElement(i.a,null,u.a.createElement(a.b,{to:"/"},"Hyper")),n.breadCrumbItems.map(function(n,t){return n.active?u.a.createElement(i.a,{active:!0,key:t},n.label):u.a.createElement(i.a,{key:t},u.a.createElement(a.b,{to:n.path},n.label))}))),u.a.createElement("h4",{className:"page-title"},n.title))))}},149:function(n,t,e){"use strict";var r=e(40);e.d(t,"B",function(){return r.a}),e.d(t,"ab",function(){return r.d}),e.d(t,"bb",function(){return r.g}),e.d(t,"hb",function(){return r.h});var u=e(37);e.d(t,"e",function(){return u.a}),e.d(t,"f",function(){return u.b}),e.d(t,"g",function(){return u.c}),e.d(t,"h",function(){return u.d}),e.d(t,"Y",function(){return u.e});var a=e(48);e.d(t,"d",function(){return a.a}),e.d(t,"Z",function(){return a.c});var c=e(57);e.d(t,"J",function(){return c.a});var o=e(58);e.d(t,"kb",function(){return o.a});var d=e(14);e.d(t,"a",function(){return d.a}),e.d(t,"n",function(){return d.d}),e.d(t,"o",function(){return d.g}),e.d(t,"p",function(){return d.i}),e.d(t,"q",function(){return d.m}),e.d(t,"r",function(){return d.p}),e.d(t,"u",function(){return d.s}),e.d(t,"v",function(){return d.v}),e.d(t,"w",function(){return d.y}),e.d(t,"y",function(){return d.B}),e.d(t,"H",function(){return d.E}),e.d(t,"L",function(){return d.H}),e.d(t,"cb",function(){return d.K});var i=e(41);e.d(t,"j",function(){return i.a}),e.d(t,"x",function(){return i.b}),e.d(t,"F",function(){return i.e}),e.d(t,"K",function(){return i.h});var l=e(59);e.d(t,"P",function(){return l.a});var f=e(45);e.d(t,"C",function(){return f.a}),e.d(t,"S",function(){return f.d});var m=e(23);e.d(t,"i",function(){return m.a}),e.d(t,"D",function(){return m.b}),e.d(t,"E",function(){return m.e}),e.d(t,"db",function(){return m.h}),e.d(t,"eb",function(){return m.k}),e.d(t,"gb",function(){return m.n}),e.d(t,"jb",function(){return m.q});var s=e(15);e.d(t,"c",function(){return s.a}),e.d(t,"k",function(){return s.d}),e.d(t,"m",function(){return s.e}),e.d(t,"A",function(){return s.h}),e.d(t,"G",function(){return s.k}),e.d(t,"M",function(){return s.n}),e.d(t,"N",function(){return s.q}),e.d(t,"O",function(){return s.r}),e.d(t,"Q",function(){return s.w}),e.d(t,"R",function(){return s.y}),e.d(t,"ib",function(){return s.D}),e.d(t,"lb",function(){return s.G}),e.d(t,"mb",function(){return s.J});var b=e(30);e.d(t,"b",function(){return b.a}),e.d(t,"l",function(){return b.d}),e.d(t,"s",function(){return b.e}),e.d(t,"T",function(){return b.h}),e.d(t,"U",function(){return b.j}),e.d(t,"fb",function(){return b.n});var p=e(24);e.d(t,"t",function(){return p.a}),e.d(t,"z",function(){return p.d}),e.d(t,"I",function(){return p.g}),e.d(t,"V",function(){return p.j}),e.d(t,"W",function(){return p.m}),e.d(t,"X",function(){return p.p})}}]);
//# sourceMappingURL=108.5fc189c8.chunk.js.map
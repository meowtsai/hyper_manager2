(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{1057:function(e,t,n){"use strict";n.r(t);var a=n(70),r=n(3),c=n(20),l=n(170),u=n(2),i=n.n(u),o=n(53),m=n(486),d=n(152),s=n(153),f=n(186),b=n(173),E=n(187),g=n(171),v=n(213),h=n(191),p=n(228),y=n(229),k=n(223),N=n(231),j=n(232),S=n(161),O=n(162),_=n(185),D=n(119),w=n.n(D),C=n(147),H=n(125),I=n(226);t.default=Object(o.b)(function(e){return{antsHandleData:e.Service.antsHandleData,csHandleData:e.Service.csHandleData,qCountData:e.Service.qCountData,csHandleAllocationData:e.Service.csHandleAllocationData,antsHandleAllocationData:e.Service.antsHandleAllocationData,question_type:e.Service.question_type,allgames:e.Service.allgames,loading:e.Service.loading,error:e.Service.error,user:e.Auth.user}},{getServiceStatistics:C.db})(function(e){var t=e.getServiceStatistics,n=e.antsHandleData,a=e.csHandleData,r=e.qCountData,o=e.csHandleAllocationData,D=e.antsHandleAllocationData,C=e.question_type,F=e.loading,A=e.allgames,x=(e.error,e.user),M=Object(u.useState)("g78naxx2hmt"),z=Object(l.a)(M,2),G=z[0],J=z[1],T=Object(u.useState)("\u6c7a\u6230\u5e73\u5b89\u4eac"),B=Object(l.a)(T,2),L=B[0],P=B[1],V=Object(u.useState)("".concat((new Date).getFullYear(),"-").concat(((new Date).getMonth()+1).toString().padStart(2,"0"))),Y=Object(l.a)(V,2),K=Y[0],Q=Y[1],R=Object(u.useState)("all"),U=Object(l.a)(R,2),W=U[0],X=U[1],Z=Object(u.useState)("1"),$=Object(l.a)(Z,2),ee=$[0],te=$[1];Object(u.useEffect)(function(){t(K),document.title="\u5ba2\u670d\u6848\u4ef6\u7d71\u8a08"},[]);if(F)return i.a.createElement(I.a,{className:"m-2",color:"secondary"});var ne=[],ae=new Date,re=ae.getMonth(),ce=ae.getFullYear();ne.push("".concat(ce,"-").concat((re+1).toString().padStart(2,"0")));for(var le=0;le<5;le++){var ue=ce,ie=re-le;ie<=0&&(ie=12-le,ue=ce-1),ne.push("".concat(ue,"-").concat(ie.toString().padStart(2,"0")))}return i.a.createElement(u.Fragment,null,i.a.createElement(H.a,{breadCrumbItems:[{label:"\u5ba2\u670d",path:"/service",active:!1},{label:"\u5ba2\u670d\u6848\u4ef6\u7d71\u8a08",path:"/service",active:!0}],title:"\u5ba2\u670d\u6848\u4ef6\u7d71\u8a08"}),i.a.createElement(d.a,{className:"mt-2"},i.a.createElement(s.a,{md:6,sm:6},A.length>0&&i.a.createElement(f.a,{inline:!0,className:"mb-2"},i.a.createElement(b.a,{className:"mb-2 mr-sm-2 mb-sm-0"},i.a.createElement(E.a,{htmlFor:"selGameId",className:"mr-sm-2"},"\u904a\u6232:"),i.a.createElement(g.a,{type:"select",name:"selGameId",id:"selGameId",className:"custom-select",value:G,onChange:function(e){var t;""!==(t=e.target.value)&&void 0!==t&&null!==t&&(J(t),P(A.filter(function(e){return e.game_id===t})[0].game_name))}},i.a.createElement("option",{value:""},"\u9078\u64c7\u904a\u6232..."),A.map(function(e){return i.a.createElement("option",{key:"game-"+e.game_id,value:e.game_id},e.game_name)}))),i.a.createElement(v.a,{className:"btn-group mb-2 ml-3"},i.a.createElement(h.a,{onClick:function(e){return X("all")},color:"all"===W?"danger":"light"},"by \u65e5\u671f + \u4eba\u54e1"),i.a.createElement(h.a,{onClick:function(e){return X("date")},color:"date"===W?"danger":"light"},"by \u65e5\u671f"),i.a.createElement(h.a,{onClick:function(e){return X("user")},color:"user"===W?"danger":"light"},"by \u4eba\u54e1")))),i.a.createElement(s.a,{md:6,sm:6},i.a.createElement(f.a,{inline:!0,className:"mb-2  float-right"},i.a.createElement(b.a,{className:"mb-2 mr-sm-2 mb-sm-0"},i.a.createElement(E.a,{htmlFor:"selMonth",className:"mr-sm-2"},"\u6708\u4efd:"),i.a.createElement(g.a,{type:"select",name:"selMonth",id:"selMonth",className:"custom-select",value:K,onChange:function(e){return Q(e.target.value)}},ne.map(function(e){return i.a.createElement("option",{key:"yymm-"+e,value:e},e)}))),i.a.createElement(h.a,{color:"primary",className:"mb-2 mr-1",onClick:function(){t(K)}},"\u641c\u5c0b")))),i.a.createElement(d.a,null,i.a.createElement(s.a,{lg:12},i.a.createElement(p.a,{tabs:!0,className:"nav-bordered"},[{id:"1",title:"\u63d0\u554f\u55ae",icon:"mdi mdi-home-variant"},{id:"2",title:"\u5f8c\u9001\u6848\u4ef6",icon:"mdi mdi-account-circle"}].map(function(e,t){return i.a.createElement(y.a,{key:"tab_".concat(t)},i.a.createElement(k.a,{href:"#",className:w()({active:ee===e.id}),onClick:function(){!function(e){ee!==e&&te(e)}(e.id)}},i.a.createElement("i",{className:w()(e.icon,"d-lg-none","d-block","mr-1")}),i.a.createElement("span",{className:"d-none d-lg-block"},e.title)))})))),i.a.createElement(N.a,{activeTab:ee},i.a.createElement(j.a,{tabId:"1"},i.a.createElement(d.a,{className:"mb-2"},i.a.createElement(s.a,{lg:4},r.length>0&&i.a.createElement(m.CSVLink,{data:r.filter(function(e){return e.game_id===G}),headers:[{label:"\u65e5\u671f",key:"\u6642\u9593"},{label:"\u6578\u91cf",key:"cnt"}].concat(Object(c.a)(Object.keys(C).map(function(e){return{label:C[e],key:C[e]}}))),filename:L+K+"\u63d0\u554f\u55ae\u9032\u4ef6\u91cf"+(new Date).getTime()+".csv"},"\u4e0b\u8f09 csv\u6a94\u6848"),r&&i.a.createElement(S.a,null,i.a.createElement(O.a,null,i.a.createElement("h4",{className:"header-title"},L,"-\u63d0\u554f\u55ae\u9032\u4ef6\u91cf"),i.a.createElement(_.a,{className:"mb-0",bordered:!0,size:"sm"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null,"\u65e5\u671f"),i.a.createElement("th",null,"\u6578\u91cf"))),i.a.createElement("tbody",null,r.filter(function(e){return e.game_id===G}).map(function(e,t){return i.a.createElement("tr",{key:"q_".concat(t)},i.a.createElement("th",null,e.\u6642\u9593),i.a.createElement("td",null,e.cnt))}),i.a.createElement("tr",null,i.a.createElement("th",null,"\u7e3d\u8a08"),i.a.createElement("td",null,r.filter(function(e){return e.game_id===G}).reduce(function(e,t){return e+t.cnt},0)))))))),i.a.createElement(s.a,{lg:4},q(n,"".concat(L,"-\u87fb\u529b\u63d0\u554f\u55ae\u8655\u7406\u91cf"),G,K,W,C)),i.a.createElement(s.a,{lg:4},q(a,"".concat(L,"-\u5ba2\u670d\u63d0\u554f\u55ae\u8655\u7406\u91cf"),G,K,W,C)))),i.a.createElement(j.a,{tabId:"2"},i.a.createElement(d.a,{className:"mb-2"},i.a.createElement(s.a,{lg:4},q(D,"".concat(L,"-\u87fb\u529b\u5f8c\u9001\u6848\u4ef6\u91cf"),G,K,W,{})),("admin"===x.role||"pm"===x.role)&&i.a.createElement(s.a,{lg:4},q(o,"".concat(L,"-\u5ba2\u670d\u5f8c\u9001\u8655\u7406\u91cf"),G,K,W,{}))))))});var q=function(e,t,n,l,o,d){var s=e.filter(function(e){return e.game_id===n}).map(function(e){return Object(r.a)({dt:e.\u6642\u9593,admin_name:e.admin_name,test_cnt:e.test_cnt,cnt:e.cnt},e)}),f=[],b="all"===o?"all":"date"===o?"dt":"admin_name",E="all"===o?"\u65e5\u671f":"\u4eba\u54e1",g="all"===b?s:s.reduce(function(e,t){return f.indexOf(t[b])<0?(f.push(t[b]),[].concat(Object(c.a)(e),[Object(r.a)({},t)])):e=e.map(function(e){var n;return e[b]===t[b]?(n={},Object(a.a)(n,b,e[b]),Object(a.a)(n,"test_cnt",Number.parseInt(e.test_cnt)+Number.parseInt(t.test_cnt)),Object(a.a)(n,"cnt",Number.parseInt(e.cnt)+Number.parseInt(t.cnt)),n):e})},[]);return i.a.createElement(u.Fragment,null,i.a.createElement(m.CSVLink,{data:s,headers:[{label:"\u65e5\u671f",key:"dt"},{label:"\u4eba\u54e1",key:"admin_name"},{label:"\u6578\u91cf",key:"cnt"},{label:"\u6e2c\u8a66",key:"test_cnt"}].concat(Object(c.a)(Object.keys(d).map(function(e){return{label:d[e],key:d[e]}}))),filename:t+l+(new Date).getTime()+".csv"},"\u4e0b\u8f09 csv\u6a94\u6848"),i.a.createElement(S.a,null,i.a.createElement(O.a,null,i.a.createElement("h4",{className:"header-title"},t," "),i.a.createElement(_.a,{className:"mb-0",bordered:!0,size:"sm"},i.a.createElement("thead",null,i.a.createElement("tr",null,"all"===o?i.a.createElement(u.Fragment,null,i.a.createElement("th",null,"\u65e5\u671f")," ",i.a.createElement("th",null,"\u4eba\u54e1")):i.a.createElement("th",null,E),i.a.createElement("th",null,"\u6578\u91cf"),0!==Object.keys(d).length&&i.a.createElement("th",null,"\u6e2c\u8a66"))),i.a.createElement("tbody",null,g.map(function(e,t){return i.a.createElement("tr",{key:"q_".concat(t)},"all"===o?i.a.createElement(u.Fragment,null,i.a.createElement("th",null,e.dt)," ",i.a.createElement("th",null,e.admin_name)):i.a.createElement("th",null,e[b]),i.a.createElement("td",null,e.cnt),0!==Object.keys(d).length&&i.a.createElement("td",null,e.test_cnt))}),i.a.createElement("tr",null,"all"===o?i.a.createElement(u.Fragment,null,i.a.createElement("th",{colSpan:"2"},"\u7e3d\u8a08")):i.a.createElement("th",null,"\u7e3d\u8a08"),i.a.createElement("td",null,g.reduce(function(e,t){return e+Number.parseInt(t.cnt)},0)),0!==Object.keys(d).length&&i.a.createElement("td",null,g.reduce(function(e,t){return e+Number.parseInt(t.test_cnt)},0))))))))}},125:function(e,t,n){"use strict";var a=n(2),r=n.n(a),c=n(50),l=n(152),u=n(153),i=n(145),o=n(146);n(25);t.a=function(e){return r.a.createElement(l.a,null,r.a.createElement(u.a,null,r.a.createElement("div",{className:"page-title-box"},r.a.createElement("div",{className:"page-title-right"},r.a.createElement(i.a,null,r.a.createElement(o.a,null,r.a.createElement(c.b,{to:"/"},"Hyper")),e.breadCrumbItems.map(function(e,t){return e.active?r.a.createElement(o.a,{active:!0,key:t},e.label):r.a.createElement(o.a,{key:t},r.a.createElement(c.b,{to:e.path},e.label))}))),r.a.createElement("h4",{className:"page-title"},e.title))))}},147:function(e,t,n){"use strict";var a=n(43);n.d(t,"K",function(){return a.a}),n.d(t,"mb",function(){return a.d}),n.d(t,"nb",function(){return a.g}),n.d(t,"tb",function(){return a.h});var r=n(40);n.d(t,"h",function(){return r.a}),n.d(t,"i",function(){return r.b}),n.d(t,"j",function(){return r.c}),n.d(t,"k",function(){return r.d}),n.d(t,"kb",function(){return r.e});var c=n(51);n.d(t,"g",function(){return c.a}),n.d(t,"lb",function(){return c.c});var l=n(60);n.d(t,"U",function(){return l.a});var u=n(37);n.d(t,"p",function(){return u.a}),n.d(t,"y",function(){return u.b}),n.d(t,"G",function(){return u.e}),n.d(t,"Y",function(){return u.h}),n.d(t,"zb",function(){return u.k});var i=n(17);n.d(t,"a",function(){return i.a}),n.d(t,"t",function(){return i.d}),n.d(t,"u",function(){return i.g}),n.d(t,"v",function(){return i.i}),n.d(t,"w",function(){return i.m}),n.d(t,"x",function(){return i.p}),n.d(t,"C",function(){return i.s}),n.d(t,"D",function(){return i.v}),n.d(t,"E",function(){return i.y}),n.d(t,"H",function(){return i.B}),n.d(t,"S",function(){return i.E}),n.d(t,"W",function(){return i.H}),n.d(t,"ob",function(){return i.K});var o=n(44);n.d(t,"n",function(){return o.a}),n.d(t,"F",function(){return o.b}),n.d(t,"Q",function(){return o.e}),n.d(t,"V",function(){return o.h});var m=n(61);n.d(t,"bb",function(){return m.a});var d=n(48);n.d(t,"L",function(){return d.a}),n.d(t,"eb",function(){return d.d});var s=n(26);n.d(t,"l",function(){return s.a}),n.d(t,"M",function(){return s.b}),n.d(t,"N",function(){return s.e}),n.d(t,"pb",function(){return s.h}),n.d(t,"qb",function(){return s.k}),n.d(t,"sb",function(){return s.n}),n.d(t,"yb",function(){return s.q});var f=n(15);n.d(t,"b",function(){return f.a}),n.d(t,"c",function(){return f.d}),n.d(t,"e",function(){return f.g}),n.d(t,"o",function(){return f.j}),n.d(t,"r",function(){return f.k}),n.d(t,"J",function(){return f.n}),n.d(t,"R",function(){return f.q}),n.d(t,"X",function(){return f.t}),n.d(t,"Z",function(){return f.w}),n.d(t,"ab",function(){return f.x}),n.d(t,"cb",function(){return f.C}),n.d(t,"db",function(){return f.E}),n.d(t,"wb",function(){return f.J}),n.d(t,"xb",function(){return f.M}),n.d(t,"Ab",function(){return f.P}),n.d(t,"Bb",function(){return f.S});var b=n(33);n.d(t,"d",function(){return b.a}),n.d(t,"q",function(){return b.d}),n.d(t,"z",function(){return b.e}),n.d(t,"fb",function(){return b.h}),n.d(t,"gb",function(){return b.j}),n.d(t,"rb",function(){return b.n});var E=n(27);n.d(t,"A",function(){return E.a}),n.d(t,"I",function(){return E.d}),n.d(t,"T",function(){return E.g}),n.d(t,"hb",function(){return E.j}),n.d(t,"ib",function(){return E.m}),n.d(t,"jb",function(){return E.p});var g=n(24);n.d(t,"f",function(){return g.a}),n.d(t,"m",function(){return g.d}),n.d(t,"s",function(){return g.e}),n.d(t,"B",function(){return g.h}),n.d(t,"O",function(){return g.k}),n.d(t,"P",function(){return g.n}),n.d(t,"ub",function(){return g.q}),n.d(t,"vb",function(){return g.t})},226:function(e,t,n){"use strict";var a=n(70),r=n(2),c=n.n(r),l=(n(25),n(119)),u=n.n(l),i=function(e){var t=e.children||null,n=e.tag;return c.a.createElement(n,{role:"status",className:u()({"spinner-border":"bordered"===e.type,"spinner-grow":"grow"===e.type},["text-".concat(e.color)],Object(a.a)({},"avatar-".concat(e.size),e.size),e.className)},t)};i.defaultProps={tag:"div",type:"bordered",color:"primary"},t.a=i}}]);
//# sourceMappingURL=104.74b2c338.chunk.js.map
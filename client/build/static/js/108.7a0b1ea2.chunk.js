(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{1095:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n.n(r),u=n(55),c=n(52),i=n(298),o=n.n(i),l=n(299),d=n.n(l),m=n(220),s=function(e){var t=e.status_code,n={0:{name:"Danger",color:"danger",text:"\u95dc"},1:{name:"Success",color:"success",text:"\u958b"},2:{name:"Warning",color:"warning",text:"\u5167\u6e2c"}};return a.a.createElement(m.a,{color:n[t].color,className:"mr-1"},n[t].text)},f=n(302),b=n.n(f),g=n(166),p=n(164),E=n(165),v=n(150),h=n(126),N=n(218),_=(t.default=Object(u.b)(function(e){return{games:e.Games.list,loading:e.Games.loading,errors:e.Games.errors}},{getGames:v.Y})(function(e){var t=e.games,n=e.getGames,u=e.loading,i=e.errors;Object(r.useEffect)(function(){n(),document.title="\u904a\u6232"},[]);var l=[{dataField:"game_id",text:"\u904a\u6232ID",filter:Object(f.textFilter)(),headerAttrs:function(e,t){return{width:"10%"}}},{dataField:"game_name",text:"\u904a\u6232\u540d\u7a31",formatter:_,headerAttrs:function(e,t){return{width:"25%"}},filter:Object(f.textFilter)()},{dataField:"is_active",text:"\u904a\u6232\u72c0\u614b",headerStyle:function(e,t){return{width:"118px"}},filter:Object(f.selectFilter)({options:{0:"\u95dc",1:"\u958b",2:"\u5167\u6e2c"}}),formatter:function(e,t){return a.a.createElement(s,{status_code:t.is_active})}},{dataField:"action",isDummyColumn:!0,text:"\u64cd\u4f5c",sort:!1,classes:"table-action",formatter:k}];return u?a.a.createElement(N.a,{className:"m-2",color:"secondary"}):i&&i.msg?a.a.createElement(g.a,{color:"danger",isOpen:!!i.msg},a.a.createElement("div",null,i.msg)):a.a.createElement(r.Fragment,null,a.a.createElement(h.a,{breadCrumbItems:[{label:"\u5ba2\u670d",path:"/games",active:!1},{label:"\u904a\u6232",path:"/games",active:!0}],title:"\u904a\u6232"}),a.a.createElement(p.a,{className:"mt-2"},a.a.createElement(E.a,{sm:4},a.a.createElement(c.b,{to:"".concat("/games","/create"),className:"btn btn-rounded btn-danger mb-3"},a.a.createElement("i",{className:"mdi mdi-plus-circle mr-2"})," \u65b0\u589e","\u904a\u6232")),a.a.createElement(E.a,{md:6,sm:6})),a.a.createElement(p.a,null,a.a.createElement(E.a,{lg:12},a.a.createElement(o.a,{bootstrap4:!0,keyField:"game_id",striped:!0,hover:!0,condensed:!0,data:t,columns:l,defaultSorted:[{dataField:"game_id",order:"desc"}],filter:b()(),pagination:d()({sizePerPage:50,showTotal:!0,paginationTotalRenderer:function(e,t,n){return a.a.createElement("span",{className:"react-bootstrap-table-pagination-total ml-2"},"\u986f\u793a ",n," \u7b46\u7e3d\u6578\u4e2d\u7684 ",e," ~ ",t," \u7d00\u9304")}}),classes:"border-dark",wrapperClasses:"border-dark"}))))}),function(e,t,n,r){t.fanpage;var u=t.logo_path?a.a.createElement("img",{src:t.logo_path,alt:t.name,title:t.name,className:"rounded ",height:"48"}):a.a.createElement("div",{className:"avatar-sm"},a.a.createElement("span",{className:"avatar-title bg-primary-lighten rounded mr-3",height:"48"}));return a.a.createElement(a.a.Fragment,null,a.a.createElement(p.a,{className:"align-items-center"},a.a.createElement(E.a,{className:"col-auto"},u),a.a.createElement(E.a,{className:"col pl-0"},a.a.createElement("p",{className:"m-0 d-inline-block align-middle font-16"},t.game_name,a.a.createElement("br",null),a.a.createElement("a",{href:"https://support.longeplay.com.tw/service_quick?param_game_id=".concat(t.game_id),target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-help-network ml-1"})),t.fanpage&&a.a.createElement("a",{href:t.fanpage,target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-facebook-box ml-1"})),t.site&&a.a.createElement("a",{href:t.site,target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-web ml-1"}))))))}),k=function(e,t,n,u){return a.a.createElement(r.Fragment,null,a.a.createElement(c.b,{to:"/games/edit/".concat(t.game_id),className:"action-icon"},a.a.createElement("i",{className:"mdi mdi-square-edit-outline"})))}},126:function(e,t,n){"use strict";var r=n(3),a=n.n(r),u=n(52),c=n(164),i=n(165),o=n(153),l=n(154);n(26);t.a=function(e){return a.a.createElement(c.a,null,a.a.createElement(i.a,null,a.a.createElement("div",{className:"page-title-box"},a.a.createElement("div",{className:"page-title-right"},a.a.createElement(o.a,null,a.a.createElement(l.a,null,a.a.createElement(u.b,{to:"/"},"Hyper")),e.breadCrumbItems.map(function(e,t){return e.active?a.a.createElement(l.a,{active:!0,key:t},e.label):a.a.createElement(l.a,{key:t},a.a.createElement(u.b,{to:e.path},e.label))}))),a.a.createElement("h4",{className:"page-title"},e.title))))}},150:function(e,t,n){"use strict";var r=n(44);n.d(t,"M",function(){return r.a}),n.d(t,"tb",function(){return r.d}),n.d(t,"ub",function(){return r.g}),n.d(t,"Ab",function(){return r.h});var a=n(41);n.d(t,"i",function(){return a.a}),n.d(t,"j",function(){return a.b}),n.d(t,"k",function(){return a.c}),n.d(t,"l",function(){return a.d}),n.d(t,"rb",function(){return a.e});var u=n(53);n.d(t,"h",function(){return u.a}),n.d(t,"sb",function(){return u.c});var c=n(61);n.d(t,"X",function(){return c.a});var i=n(38);n.d(t,"q",function(){return i.a}),n.d(t,"A",function(){return i.b}),n.d(t,"I",function(){return i.e}),n.d(t,"bb",function(){return i.h}),n.d(t,"Gb",function(){return i.k});var o=n(17);n.d(t,"a",function(){return o.a}),n.d(t,"u",function(){return o.d}),n.d(t,"v",function(){return o.g}),n.d(t,"w",function(){return o.i}),n.d(t,"x",function(){return o.m}),n.d(t,"y",function(){return o.p}),n.d(t,"z",function(){return o.s}),n.d(t,"E",function(){return o.v}),n.d(t,"F",function(){return o.y}),n.d(t,"G",function(){return o.B}),n.d(t,"J",function(){return o.E}),n.d(t,"U",function(){return o.H}),n.d(t,"Z",function(){return o.K}),n.d(t,"vb",function(){return o.N});var l=n(45);n.d(t,"o",function(){return l.a}),n.d(t,"H",function(){return l.b}),n.d(t,"S",function(){return l.e}),n.d(t,"Y",function(){return l.h});var d=n(62);n.d(t,"fb",function(){return d.a});var m=n(46);n.d(t,"N",function(){return m.a}),n.d(t,"jb",function(){return m.d}),n.d(t,"kb",function(){return m.g});var s=n(27);n.d(t,"m",function(){return s.a}),n.d(t,"O",function(){return s.b}),n.d(t,"P",function(){return s.e}),n.d(t,"wb",function(){return s.h}),n.d(t,"xb",function(){return s.k}),n.d(t,"zb",function(){return s.n}),n.d(t,"Fb",function(){return s.q});var f=n(14);n.d(t,"b",function(){return f.a}),n.d(t,"c",function(){return f.d}),n.d(t,"d",function(){return f.g}),n.d(t,"f",function(){return f.h}),n.d(t,"p",function(){return f.k}),n.d(t,"s",function(){return f.l}),n.d(t,"L",function(){return f.o}),n.d(t,"T",function(){return f.r}),n.d(t,"ab",function(){return f.u}),n.d(t,"cb",function(){return f.x}),n.d(t,"db",function(){return f.y}),n.d(t,"gb",function(){return f.D}),n.d(t,"hb",function(){return f.F}),n.d(t,"ib",function(){return f.G}),n.d(t,"Db",function(){return f.N}),n.d(t,"Eb",function(){return f.Q}),n.d(t,"Hb",function(){return f.T}),n.d(t,"Ib",function(){return f.W});var b=n(23);n.d(t,"e",function(){return b.a}),n.d(t,"r",function(){return b.d}),n.d(t,"B",function(){return b.e}),n.d(t,"W",function(){return b.h}),n.d(t,"lb",function(){return b.k}),n.d(t,"mb",function(){return b.m}),n.d(t,"qb",function(){return b.p}),n.d(t,"yb",function(){return b.t}),n.d(t,"Jb",function(){return b.w});var g=n(28);n.d(t,"C",function(){return g.a}),n.d(t,"K",function(){return g.d}),n.d(t,"V",function(){return g.g}),n.d(t,"nb",function(){return g.j}),n.d(t,"ob",function(){return g.m}),n.d(t,"pb",function(){return g.p});var p=n(25);n.d(t,"g",function(){return p.a}),n.d(t,"n",function(){return p.d}),n.d(t,"t",function(){return p.e}),n.d(t,"D",function(){return p.h}),n.d(t,"Q",function(){return p.k}),n.d(t,"R",function(){return p.n}),n.d(t,"Bb",function(){return p.q}),n.d(t,"Cb",function(){return p.t});var E=n(63);n.d(t,"eb",function(){return E.a})},218:function(e,t,n){"use strict";var r=n(72),a=n(3),u=n.n(a),c=(n(26),n(121)),i=n.n(c),o=function(e){var t=e.children||null,n=e.tag;return u.a.createElement(n,{role:"status",className:i()({"spinner-border":"bordered"===e.type,"spinner-grow":"grow"===e.type},["text-".concat(e.color)],Object(r.a)({},"avatar-".concat(e.size),e.size),e.className)},t)};o.defaultProps={tag:"div",type:"bordered",color:"primary"},t.a=o}}]);
//# sourceMappingURL=108.7a0b1ea2.chunk.js.map
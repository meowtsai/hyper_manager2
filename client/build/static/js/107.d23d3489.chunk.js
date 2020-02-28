(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{1094:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n.n(r),c=n(54),u=n(51),i=n(308),o=n.n(i),l=n(309),d=n.n(l),m=n(220),s=function(e){var t=e.status_code,n={0:{name:"Danger",color:"danger",text:"\u95dc"},1:{name:"Success",color:"success",text:"\u958b"},2:{name:"Warning",color:"warning",text:"\u5167\u6e2c"}};return a.a.createElement(m.a,{color:n[t].color,className:"mr-1"},n[t].text)},f=n(402),b=n.n(f),g=n(166),p=n(164),E=n(165),v=n(150),h=n(126),N=n(218),_=(t.default=Object(c.b)(function(e){return{games:e.Games.list,loading:e.Games.loading,errors:e.Games.errors}},{getGames:v.W})(function(e){var t=e.games,n=e.getGames,c=e.loading,i=e.errors;Object(r.useEffect)(function(){n(),document.title="\u904a\u6232"},[]);var l=[{dataField:"game_id",text:"\u904a\u6232ID",filter:Object(f.textFilter)(),headerAttrs:function(e,t){return{width:"10%"}}},{dataField:"game_name",text:"\u904a\u6232\u540d\u7a31",formatter:_,headerAttrs:function(e,t){return{width:"25%"}},filter:Object(f.textFilter)()},{dataField:"is_active",text:"\u904a\u6232\u72c0\u614b",headerStyle:function(e,t){return{width:"118px"}},filter:Object(f.selectFilter)({options:{0:"\u95dc",1:"\u958b",2:"\u5167\u6e2c"}}),formatter:function(e,t){return a.a.createElement(s,{status_code:t.is_active})}},{dataField:"action",isDummyColumn:!0,text:"\u64cd\u4f5c",sort:!1,classes:"table-action",formatter:k}];return c?a.a.createElement(N.a,{className:"m-2",color:"secondary"}):i&&i.msg?a.a.createElement(g.a,{color:"danger",isOpen:!!i.msg},a.a.createElement("div",null,i.msg)):a.a.createElement(r.Fragment,null,a.a.createElement(h.a,{breadCrumbItems:[{label:"\u5ba2\u670d",path:"/games",active:!1},{label:"\u904a\u6232",path:"/games",active:!0}],title:"\u904a\u6232"}),a.a.createElement(p.a,{className:"mt-2"},a.a.createElement(E.a,{sm:4},a.a.createElement(u.b,{to:"".concat("/games","/create"),className:"btn btn-rounded btn-danger mb-3"},a.a.createElement("i",{className:"mdi mdi-plus-circle mr-2"})," \u65b0\u589e","\u904a\u6232")),a.a.createElement(E.a,{md:6,sm:6})),a.a.createElement(p.a,null,a.a.createElement(E.a,{lg:12},a.a.createElement(o.a,{bootstrap4:!0,keyField:"game_id",striped:!0,hover:!0,condensed:!0,data:t,columns:l,defaultSorted:[{dataField:"game_id",order:"desc"}],filter:b()(),pagination:d()({sizePerPage:50,showTotal:!0,paginationTotalRenderer:function(e,t,n){return a.a.createElement("span",{className:"react-bootstrap-table-pagination-total ml-2"},"\u986f\u793a ",n," \u7b46\u7e3d\u6578\u4e2d\u7684 ",e," ~ ",t," \u7d00\u9304")}}),classes:"border-dark",wrapperClasses:"border-dark"}))))}),function(e,t,n,r){t.fanpage;var c=t.logo_path?a.a.createElement("img",{src:t.logo_path,alt:t.name,title:t.name,className:"rounded ",height:"48"}):a.a.createElement("div",{className:"avatar-sm"},a.a.createElement("span",{className:"avatar-title bg-primary-lighten rounded mr-3",height:"48"}));return a.a.createElement(a.a.Fragment,null,a.a.createElement(p.a,{className:"align-items-center"},a.a.createElement(E.a,{className:"col-auto"},c),a.a.createElement(E.a,{className:"col pl-0"},a.a.createElement("p",{className:"m-0 d-inline-block align-middle font-16"},t.game_name,a.a.createElement("br",null),a.a.createElement("a",{href:"https://support.longeplay.com.tw/service_quick?param_game_id=".concat(t.game_id),target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-help-network ml-1"})),t.fanpage&&a.a.createElement("a",{href:t.fanpage,target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-facebook-box ml-1"})),t.site&&a.a.createElement("a",{href:t.site,target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-web ml-1"}))))))}),k=function(e,t,n,c){return a.a.createElement(r.Fragment,null,a.a.createElement(u.b,{to:"/games/edit/".concat(t.game_id),className:"action-icon"},a.a.createElement("i",{className:"mdi mdi-square-edit-outline"})))}},126:function(e,t,n){"use strict";var r=n(3),a=n.n(r),c=n(51),u=n(164),i=n(165),o=n(151),l=n(152);n(26);t.a=function(e){return a.a.createElement(u.a,null,a.a.createElement(i.a,null,a.a.createElement("div",{className:"page-title-box"},a.a.createElement("div",{className:"page-title-right"},a.a.createElement(o.a,null,a.a.createElement(l.a,null,a.a.createElement(c.b,{to:"/"},"Hyper")),e.breadCrumbItems.map(function(e,t){return e.active?a.a.createElement(l.a,{active:!0,key:t},e.label):a.a.createElement(l.a,{key:t},a.a.createElement(c.b,{to:e.path},e.label))}))),a.a.createElement("h4",{className:"page-title"},e.title))))}},150:function(e,t,n){"use strict";var r=n(44);n.d(t,"K",function(){return r.a}),n.d(t,"qb",function(){return r.d}),n.d(t,"rb",function(){return r.g}),n.d(t,"xb",function(){return r.h});var a=n(41);n.d(t,"h",function(){return a.a}),n.d(t,"i",function(){return a.b}),n.d(t,"j",function(){return a.c}),n.d(t,"k",function(){return a.d}),n.d(t,"ob",function(){return a.e});var c=n(52);n.d(t,"g",function(){return c.a}),n.d(t,"pb",function(){return c.c});var u=n(61);n.d(t,"V",function(){return u.a});var i=n(38);n.d(t,"p",function(){return i.a}),n.d(t,"y",function(){return i.b}),n.d(t,"G",function(){return i.e}),n.d(t,"Z",function(){return i.h}),n.d(t,"Db",function(){return i.k});var o=n(18);n.d(t,"a",function(){return o.a}),n.d(t,"t",function(){return o.d}),n.d(t,"u",function(){return o.g}),n.d(t,"v",function(){return o.i}),n.d(t,"w",function(){return o.m}),n.d(t,"x",function(){return o.p}),n.d(t,"C",function(){return o.s}),n.d(t,"D",function(){return o.v}),n.d(t,"E",function(){return o.y}),n.d(t,"H",function(){return o.B}),n.d(t,"S",function(){return o.E}),n.d(t,"X",function(){return o.H}),n.d(t,"sb",function(){return o.K});var l=n(45);n.d(t,"n",function(){return l.a}),n.d(t,"F",function(){return l.b}),n.d(t,"Q",function(){return l.e}),n.d(t,"W",function(){return l.h});var d=n(62);n.d(t,"db",function(){return d.a});var m=n(49);n.d(t,"L",function(){return m.a}),n.d(t,"hb",function(){return m.d});var s=n(27);n.d(t,"l",function(){return s.a}),n.d(t,"M",function(){return s.b}),n.d(t,"N",function(){return s.e}),n.d(t,"tb",function(){return s.h}),n.d(t,"ub",function(){return s.k}),n.d(t,"wb",function(){return s.n}),n.d(t,"Cb",function(){return s.q});var f=n(14);n.d(t,"b",function(){return f.a}),n.d(t,"c",function(){return f.d}),n.d(t,"e",function(){return f.g}),n.d(t,"o",function(){return f.j}),n.d(t,"r",function(){return f.k}),n.d(t,"J",function(){return f.n}),n.d(t,"R",function(){return f.q}),n.d(t,"Y",function(){return f.t}),n.d(t,"ab",function(){return f.w}),n.d(t,"bb",function(){return f.x}),n.d(t,"eb",function(){return f.C}),n.d(t,"fb",function(){return f.E}),n.d(t,"gb",function(){return f.F}),n.d(t,"Ab",function(){return f.M}),n.d(t,"Bb",function(){return f.P}),n.d(t,"Eb",function(){return f.S}),n.d(t,"Fb",function(){return f.V});var b=n(22);n.d(t,"d",function(){return b.a}),n.d(t,"q",function(){return b.d}),n.d(t,"z",function(){return b.e}),n.d(t,"U",function(){return b.h}),n.d(t,"ib",function(){return b.k}),n.d(t,"jb",function(){return b.m}),n.d(t,"nb",function(){return b.p}),n.d(t,"vb",function(){return b.t}),n.d(t,"Gb",function(){return b.w});var g=n(28);n.d(t,"A",function(){return g.a}),n.d(t,"I",function(){return g.d}),n.d(t,"T",function(){return g.g}),n.d(t,"kb",function(){return g.j}),n.d(t,"lb",function(){return g.m}),n.d(t,"mb",function(){return g.p});var p=n(25);n.d(t,"f",function(){return p.a}),n.d(t,"m",function(){return p.d}),n.d(t,"s",function(){return p.e}),n.d(t,"B",function(){return p.h}),n.d(t,"O",function(){return p.k}),n.d(t,"P",function(){return p.n}),n.d(t,"yb",function(){return p.q}),n.d(t,"zb",function(){return p.t});var E=n(63);n.d(t,"cb",function(){return E.a})},218:function(e,t,n){"use strict";var r=n(72),a=n(3),c=n.n(a),u=(n(26),n(121)),i=n.n(u),o=function(e){var t=e.children||null,n=e.tag;return c.a.createElement(n,{role:"status",className:i()({"spinner-border":"bordered"===e.type,"spinner-grow":"grow"===e.type},["text-".concat(e.color)],Object(r.a)({},"avatar-".concat(e.size),e.size),e.className)},t)};o.defaultProps={tag:"div",type:"bordered",color:"primary"},t.a=o}}]);
//# sourceMappingURL=107.d23d3489.chunk.js.map
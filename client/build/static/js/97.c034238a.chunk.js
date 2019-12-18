(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{1078:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),c=n(50),u=n(47),i=n(311),o=n.n(i),l=n(312),d=n.n(l),m=n(211),s=function(e){var t=e.status_code,n={0:{name:"Danger",color:"danger",text:"\u95dc"},1:{name:"Success",color:"success",text:"\u958b"},2:{name:"Warning",color:"warning",text:"\u5167\u6e2c"}};return a.a.createElement(m.a,{color:n[t].color,className:"mr-1"},n[t].text)},f=n(449),g=n.n(f),b=n(165),p=n(147),E=n(148),v=n(149),h=n(126),N=n(235),_=(t.default=Object(c.b)(function(e){return{games:e.Games.list,loading:e.Games.loading,errors:e.Games.errors}},{getGames:v.K})(function(e){var t=e.games,n=e.getGames,c=e.loading,i=e.errors;Object(r.useEffect)(function(){n(),document.title="\u904a\u6232"},[]);var l=[{dataField:"game_id",text:"\u904a\u6232ID",filter:Object(f.textFilter)(),headerAttrs:function(e,t){return{width:"10%"}}},{dataField:"game_name",text:"\u904a\u6232\u540d\u7a31",formatter:_,headerAttrs:function(e,t){return{width:"25%"}},filter:Object(f.textFilter)()},{dataField:"is_active",text:"\u904a\u6232\u72c0\u614b",headerStyle:function(e,t){return{width:"118px"}},filter:Object(f.selectFilter)({options:{0:"\u95dc",1:"\u958b",2:"\u5167\u6e2c"}}),formatter:function(e,t){return a.a.createElement(s,{status_code:t.is_active})}},{dataField:"action",isDummyColumn:!0,text:"\u64cd\u4f5c",sort:!1,classes:"table-action",formatter:w}];return c?a.a.createElement(N.a,{className:"m-2",color:"secondary"}):i&&i.msg?a.a.createElement(b.a,{color:"danger",isOpen:!!i.msg},a.a.createElement("div",null,i.msg)):a.a.createElement(r.Fragment,null,a.a.createElement(h.a,{breadCrumbItems:[{label:"\u5ba2\u670d",path:"/games",active:!1},{label:"\u904a\u6232",path:"/games",active:!0}],title:"\u904a\u6232"}),a.a.createElement(p.a,{className:"mt-2"},a.a.createElement(E.a,{sm:4},a.a.createElement(u.b,{to:"".concat("/games","/create"),className:"btn btn-rounded btn-danger mb-3"},a.a.createElement("i",{className:"mdi mdi-plus-circle mr-2"})," \u65b0\u589e","\u904a\u6232")),a.a.createElement(E.a,{md:6,sm:6})),a.a.createElement(p.a,null,a.a.createElement(E.a,{lg:12},a.a.createElement(o.a,{bootstrap4:!0,keyField:"game_id",striped:!0,hover:!0,condensed:!0,data:t,columns:l,defaultSorted:[{dataField:"game_id",order:"desc"}],filter:g()(),pagination:d()({sizePerPage:50,showTotal:!0,paginationTotalRenderer:function(e,t,n){return a.a.createElement("span",{className:"react-bootstrap-table-pagination-total ml-2"},"\u986f\u793a ",n," \u7b46\u7e3d\u6578\u4e2d\u7684 ",e," ~ ",t," \u7d00\u9304")}}),classes:"border-dark",wrapperClasses:"border-dark"}))))}),function(e,t,n,r){t.fanpage;var c=t.logo_path?a.a.createElement("img",{src:t.logo_path,alt:t.name,title:t.name,className:"rounded ",height:"48"}):a.a.createElement("div",{className:"avatar-sm"},a.a.createElement("span",{className:"avatar-title bg-primary-lighten rounded mr-3",height:"48"}));return a.a.createElement(a.a.Fragment,null,a.a.createElement(p.a,{className:"align-items-center"},a.a.createElement(E.a,{className:"col-auto"},c),a.a.createElement(E.a,{className:"col pl-0"},a.a.createElement("p",{className:"m-0 d-inline-block align-middle font-16"},t.game_name,a.a.createElement("br",null),a.a.createElement("a",{href:"https://support.longeplay.com.tw/service_quick?param_game_id=".concat(t.game_id),target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-help-network ml-1"})),t.fanpage&&a.a.createElement("a",{href:t.fanpage,target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-facebook-box ml-1"})),t.site&&a.a.createElement("a",{href:t.site,target:"_blank",rel:"noopener noreferrer",alt:t.game_name},a.a.createElement("i",{className:"mdi mdi-web ml-1"}))))))}),w=function(e,t,n,c){return a.a.createElement(r.Fragment,null,a.a.createElement(u.b,{to:"/games/edit/".concat(t.game_id),className:"action-icon"},a.a.createElement("i",{className:"mdi mdi-square-edit-outline"})))}},126:function(e,t,n){"use strict";var r=n(2),a=n.n(r),c=n(47),u=n(147),i=n(148),o=n(150),l=n(151);n(22);t.a=function(e){return a.a.createElement(u.a,null,a.a.createElement(i.a,null,a.a.createElement("div",{className:"page-title-box"},a.a.createElement("div",{className:"page-title-right"},a.a.createElement(o.a,null,a.a.createElement(l.a,null,a.a.createElement(c.b,{to:"/"},"Hyper")),e.breadCrumbItems.map(function(e,t){return e.active?a.a.createElement(l.a,{active:!0,key:t},e.label):a.a.createElement(l.a,{key:t},a.a.createElement(c.b,{to:e.path},e.label))}))),a.a.createElement("h4",{className:"page-title"},e.title))))}},149:function(e,t,n){"use strict";var r=n(40);n.d(t,"B",function(){return r.a}),n.d(t,"ab",function(){return r.d}),n.d(t,"bb",function(){return r.g}),n.d(t,"hb",function(){return r.h});var a=n(37);n.d(t,"e",function(){return a.a}),n.d(t,"f",function(){return a.b}),n.d(t,"g",function(){return a.c}),n.d(t,"h",function(){return a.d}),n.d(t,"Y",function(){return a.e});var c=n(48);n.d(t,"d",function(){return c.a}),n.d(t,"Z",function(){return c.c});var u=n(57);n.d(t,"J",function(){return u.a});var i=n(58);n.d(t,"kb",function(){return i.a});var o=n(14);n.d(t,"a",function(){return o.a}),n.d(t,"n",function(){return o.d}),n.d(t,"o",function(){return o.g}),n.d(t,"p",function(){return o.i}),n.d(t,"q",function(){return o.m}),n.d(t,"r",function(){return o.p}),n.d(t,"u",function(){return o.s}),n.d(t,"v",function(){return o.v}),n.d(t,"w",function(){return o.y}),n.d(t,"y",function(){return o.B}),n.d(t,"H",function(){return o.E}),n.d(t,"L",function(){return o.H}),n.d(t,"cb",function(){return o.K});var l=n(41);n.d(t,"j",function(){return l.a}),n.d(t,"x",function(){return l.b}),n.d(t,"F",function(){return l.e}),n.d(t,"K",function(){return l.h});var d=n(59);n.d(t,"P",function(){return d.a});var m=n(45);n.d(t,"C",function(){return m.a}),n.d(t,"S",function(){return m.d});var s=n(23);n.d(t,"i",function(){return s.a}),n.d(t,"D",function(){return s.b}),n.d(t,"E",function(){return s.e}),n.d(t,"db",function(){return s.h}),n.d(t,"eb",function(){return s.k}),n.d(t,"gb",function(){return s.n}),n.d(t,"jb",function(){return s.q});var f=n(15);n.d(t,"c",function(){return f.a}),n.d(t,"k",function(){return f.d}),n.d(t,"m",function(){return f.e}),n.d(t,"A",function(){return f.h}),n.d(t,"G",function(){return f.k}),n.d(t,"M",function(){return f.n}),n.d(t,"N",function(){return f.q}),n.d(t,"O",function(){return f.r}),n.d(t,"Q",function(){return f.w}),n.d(t,"R",function(){return f.y}),n.d(t,"ib",function(){return f.D}),n.d(t,"lb",function(){return f.G}),n.d(t,"mb",function(){return f.J});var g=n(30);n.d(t,"b",function(){return g.a}),n.d(t,"l",function(){return g.d}),n.d(t,"s",function(){return g.e}),n.d(t,"T",function(){return g.h}),n.d(t,"U",function(){return g.j}),n.d(t,"fb",function(){return g.n});var b=n(24);n.d(t,"t",function(){return b.a}),n.d(t,"z",function(){return b.d}),n.d(t,"I",function(){return b.g}),n.d(t,"V",function(){return b.j}),n.d(t,"W",function(){return b.m}),n.d(t,"X",function(){return b.p})},235:function(e,t,n){"use strict";var r=n(68),a=n(2),c=n.n(a),u=(n(22),n(117)),i=n.n(u),o=function(e){var t=e.children||null,n=e.tag;return c.a.createElement(n,{role:"status",className:i()({"spinner-border":"bordered"===e.type,"spinner-grow":"grow"===e.type},["text-".concat(e.color)],Object(r.a)({},"avatar-".concat(e.size),e.size),e.className)},t)};o.defaultProps={tag:"div",type:"bordered",color:"primary"},t.a=o}}]);
//# sourceMappingURL=97.c034238a.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{1022:function(e,a,t){"use strict";t.r(a);var l=t(40),n=t(47),c=t(49),m=t(48),s=t(50),r=t(67),i=t(2),o=t.n(i),u=t(156),E=t(230),d=t(229),b=t(253),p=t(157),g=t(149),N=t(150),f=t(227),h=t(228),v=t(234),k=t(235),T=t(205),q=t(44),y=t(117),C=t.n(y),w=t(128),x=function(){return o.a.createElement("div",{id:"accordion",className:"custom-accordion mb-4"},o.a.createElement(u.a,{className:"mb-0"},o.a.createElement(E.a,null,o.a.createElement("h5",{className:"m-0"},o.a.createElement(d.a,{className:"custom-accordion-title d-block pt-2 pb-2",id:"group1",href:"#"},"Collapsible Group Item #1"," ",o.a.createElement("span",{className:"float-right"},o.a.createElement("i",{className:"mdi mdi-chevron-down accordion-arrow"}))))),o.a.createElement(b.a,{toggler:"#group1"},o.a.createElement(p.a,null,"This is first collapse content"))),o.a.createElement(u.a,{className:"mb-0"},o.a.createElement(E.a,null,o.a.createElement("h5",{className:"m-0"},o.a.createElement(d.a,{className:"custom-accordion-title d-block pt-2 pb-2",id:"group2",href:"#"},"Collapsible Group Item #2"," ",o.a.createElement("span",{className:"float-right"},o.a.createElement("i",{className:"mdi mdi-chevron-down accordion-arrow"}))))),o.a.createElement(b.a,{toggler:"#group2"},o.a.createElement(p.a,null,"This is second collapse content"))),o.a.createElement(u.a,{className:"mb-0"},o.a.createElement(E.a,null,o.a.createElement("h5",{className:"m-0"},o.a.createElement(d.a,{className:"custom-accordion-title d-block pt-2 pb-2",id:"group3",href:"#"},"Collapsible Group Item #3"," ",o.a.createElement("span",{className:"float-right"},o.a.createElement("i",{className:"mdi mdi-chevron-down accordion-arrow"}))))),o.a.createElement(b.a,{toggler:"#group3"},o.a.createElement(p.a,null,"This is third collapse content"))))},I=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(c.a)(this,Object(m.a)(a).call(this,e))).toggle=function(e){t.state.activeTab!==e&&t.setState({activeTab:e})},t.state={activeTab:"2"},t.toggle=t.toggle.bind(Object(r.a)(Object(r.a)(t))),t}return Object(s.a)(a,e),Object(n.a)(a,[{key:"render",value:function(){var e=this,a=[{id:"1",title:"Home",icon:"mdi mdi-home-variant",text:"Home - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."},{id:"2",title:"Profile",icon:"mdi mdi-account-circle",text:"Profile - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."},{id:"3",title:"Settings",icon:"mdi mdi-settings-outline",text:"Settings - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."}];return o.a.createElement(o.a.Fragment,null,o.a.createElement(w.a,{breadCrumbItems:[{label:"UI",path:"/ui/tabs"},{label:"Tabs",path:"/ui/tabs",active:!0}],title:"Tabs"}),o.a.createElement(g.a,null,o.a.createElement(N.a,{lg:6},o.a.createElement(u.a,null,o.a.createElement(p.a,null,o.a.createElement("h4",{className:"header-title mb-3"},"Default Tabs"),o.a.createElement(f.a,{tabs:!0},a.map(function(a,t){return o.a.createElement(h.a,{key:t},o.a.createElement(d.a,{href:"#",className:C()({active:e.state.activeTab===a.id}),onClick:function(){e.toggle(a.id)}},o.a.createElement("i",{className:C()(a.icon,"d-lg-none","d-block","mr-1")}),o.a.createElement("span",{className:"d-none d-lg-block"},a.title)))})),o.a.createElement(v.a,{activeTab:this.state.activeTab},a.map(function(e,a){return o.a.createElement(k.a,{tabId:e.id,key:a},o.a.createElement(g.a,null,o.a.createElement(N.a,{sm:"12"},o.a.createElement("p",{className:"mt-3"},e.text))))}))))),o.a.createElement(N.a,{lg:6},o.a.createElement(u.a,null,o.a.createElement(p.a,null,o.a.createElement("h4",{className:"header-title mb-3"},"Tabs Justified"),o.a.createElement(f.a,{tabs:!0,className:"nav-pills bg-nav-pills nav-justified"},a.map(function(a,t){return o.a.createElement(h.a,{key:t},o.a.createElement(d.a,{href:"#",className:C()({active:e.state.activeTab===a.id}),onClick:function(){e.toggle(a.id)}},o.a.createElement("i",{className:C()(a.icon,"d-lg-none","d-block","mr-1")}),o.a.createElement("span",{className:"d-none d-lg-block"},a.title)))})),o.a.createElement(v.a,{activeTab:this.state.activeTab},a.map(function(e,a){return o.a.createElement(k.a,{tabId:e.id,key:a},o.a.createElement(g.a,null,o.a.createElement(N.a,{sm:"12"},o.a.createElement("p",{className:"mt-3"},e.text))))})))))),o.a.createElement(g.a,null,o.a.createElement(N.a,{lg:6},o.a.createElement(u.a,null,o.a.createElement(p.a,null,o.a.createElement("h4",{className:"header-title mb-3"},"Tabs Vertical Left"),o.a.createElement(g.a,null,o.a.createElement(N.a,{sm:3,className:"mb-2 mb-sm-0"},o.a.createElement(f.a,{tabs:!0,vertical:!0,pills:!0,className:"flex-column"},a.map(function(a,t){return o.a.createElement(h.a,{key:t},o.a.createElement(d.a,{href:"#",className:C()({active:e.state.activeTab===a.id}),onClick:function(){e.toggle(a.id)}},o.a.createElement("i",{className:C()(a.icon,"d-lg-none","d-block","mr-1")}),o.a.createElement("span",{className:"d-none d-lg-block"},a.title)))}))),o.a.createElement(N.a,{sm:9},o.a.createElement(v.a,{activeTab:this.state.activeTab},a.map(function(e,a){return o.a.createElement(k.a,{tabId:e.id,key:a},o.a.createElement(g.a,null,o.a.createElement(N.a,{sm:"12"},o.a.createElement("p",{className:"mt-3"},e.text))))}))))))),o.a.createElement(N.a,{lg:6},o.a.createElement(u.a,null,o.a.createElement(p.a,null,o.a.createElement("h4",{className:"header-title mb-3"},"Tabs Vertical Right"),o.a.createElement(g.a,null,o.a.createElement(N.a,{sm:9},o.a.createElement(v.a,{activeTab:this.state.activeTab},a.map(function(e,a){return o.a.createElement(k.a,{tabId:e.id,key:a},o.a.createElement(g.a,null,o.a.createElement(N.a,{sm:"12"},o.a.createElement("p",{className:"mt-3"},e.text))))}))),o.a.createElement(N.a,{sm:3,className:"mb-2 mb-sm-0"},o.a.createElement(f.a,{tabs:!0,vertical:!0,pills:!0,className:"flex-column"},a.map(function(a,t){return o.a.createElement(h.a,{key:t},o.a.createElement(d.a,{href:"#",className:C()({active:e.state.activeTab===a.id}),onClick:function(){e.toggle(a.id)}},o.a.createElement("i",{className:C()(a.icon,"d-lg-none","d-block","mr-1")}),o.a.createElement("span",{className:"d-none d-lg-block"},a.title)))})))))))),o.a.createElement(g.a,null,o.a.createElement(N.a,{lg:6},o.a.createElement(u.a,null,o.a.createElement(p.a,null,o.a.createElement("h4",{className:"header-title mb-3"},"Tabs Bordered"),o.a.createElement(f.a,{tabs:!0,className:"nav-bordered"},a.map(function(a,t){return o.a.createElement(h.a,{key:t},o.a.createElement(d.a,{href:"#",className:C()({active:e.state.activeTab===a.id}),onClick:function(){e.toggle(a.id)}},o.a.createElement("i",{className:C()(a.icon,"d-lg-none","d-block","mr-1")}),o.a.createElement("span",{className:"d-none d-lg-block"},a.title)))})),o.a.createElement(v.a,{activeTab:this.state.activeTab},a.map(function(e,a){return o.a.createElement(k.a,{tabId:e.id,key:a},o.a.createElement(g.a,null,o.a.createElement(N.a,{sm:"12"},o.a.createElement("p",{className:"mt-3"},e.text))))}))))),o.a.createElement(N.a,{lg:6},o.a.createElement(u.a,null,o.a.createElement(p.a,null,o.a.createElement("h4",{className:"header-title mb-3"},"Tabs Bordered Justified"),o.a.createElement(f.a,{tabs:!0,className:"nav-justified nav-bordered"},a.map(function(a,t){return o.a.createElement(h.a,{key:t},o.a.createElement(d.a,{href:"#",className:C()({active:e.state.activeTab===a.id}),onClick:function(){e.toggle(a.id)}},o.a.createElement("i",{className:C()(a.icon,"d-lg-none","d-block","mr-1")}),o.a.createElement("span",{className:"d-none d-lg-block"},a.title)))})),o.a.createElement(v.a,{activeTab:this.state.activeTab},a.map(function(e,a){return o.a.createElement(k.a,{tabId:e.id,key:a},o.a.createElement(g.a,null,o.a.createElement(N.a,{sm:"12"},o.a.createElement("p",{className:"mt-3"},e.text))))})))))),o.a.createElement(g.a,null,o.a.createElement(N.a,null,o.a.createElement("h4",{className:"mb-4"},"Accordions"))),o.a.createElement(g.a,null,o.a.createElement(N.a,{lg:6},o.a.createElement(x,null)),o.a.createElement(N.a,{lg:6},o.a.createElement("div",{className:"mb-4"},o.a.createElement("p",null,o.a.createElement(q.b,{className:"btn btn-primary sample1",to:"#"},"Link"),o.a.createElement(T.a,{color:"primary",className:"ml-2 sample1"},"Button")),o.a.createElement(b.a,{toggler:".sample1"},o.a.createElement(u.a,null,o.a.createElement(p.a,null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.")))))))}}]),a}(i.Component);a.default=I},128:function(e,a,t){"use strict";var l=t(2),n=t.n(l),c=t(44),m=t(149),s=t(150),r=t(151),i=t(152);t(17);a.a=function(e){return n.a.createElement(m.a,null,n.a.createElement(s.a,null,n.a.createElement("div",{className:"page-title-box"},n.a.createElement("div",{className:"page-title-right"},n.a.createElement(r.a,null,n.a.createElement(i.a,null,n.a.createElement(c.b,{to:"/"},"Hyper")),e.breadCrumbItems.map(function(e,a){return e.active?n.a.createElement(i.a,{active:!0,key:a},e.label):n.a.createElement(i.a,{key:a},n.a.createElement(c.b,{to:e.path},e.label))}))),n.a.createElement("h4",{className:"page-title"},e.title))))}}}]);
//# sourceMappingURL=105.4b854cec.chunk.js.map
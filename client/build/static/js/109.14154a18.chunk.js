(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{1080:function(e,t,a){"use strict";a.r(t);var n=a(171),l=a(2),r=a.n(l),c=a(162),m=a(163),u=a(230),o=a(231),i=a(227),d=a(232),s=a(233),f=a(172),E=a(237),p=a(173),b=a(238),_=a(142),h=a(197),v=a(177),g=a(226),Y=a(223),C=a(224),M=a(155),O=a(156),j=a(225),y=a(50),D=a(53),N=a(288),k=a.n(N),x=a(119),S=a.n(x),w=a(124),H=a(148),q=a(608),R=a(174),T=a(216),I=a(290),z=a.n(I),A=function(e){var t=e.replies,a=e.onEditClick,n=e.onDeleteReplyClick;return r.a.createElement(c.a,{className:"mt-2"},r.a.createElement(m.a,{xl:6},r.a.createElement("h5",{className:"text-primary"},"\u806f\u7d61\u6b77\u7a0b"),r.a.createElement(R.a,{className:"mb-0",bordered:!0},r.a.createElement("tbody",null,t&&t.map(function(e){return r.a.createElement("tr",{key:"reply-".concat(e.id),className:"mt-2"},r.a.createElement("th",null,r.a.createElement(z.a,{format:"YYYY-MM-DD"},e.contact_time),r.a.createElement("br",null),"\u7de8\u8f2f\u8005: ",e.admin_uname),r.a.createElement("td",{colSpan:"3"},r.a.createElement("pre",null,e.note.replace(/<br\s*[\/]?>/gi,""))),r.a.createElement("td",null,r.a.createElement(T.a,null,r.a.createElement(_.a,{size:"sm",color:"secondary",className:"btn-icon",onClick:function(t){return a(e.id)}},r.a.createElement("i",{className:"mdi mdi-square-edit-outline"})),r.a.createElement(_.a,{size:"sm",color:"danger",className:"btn-icon",onClick:function(t){return n(e.id)}},r.a.createElement("i",{className:"mdi mdi-trash-can-outline"})))))}),(!t||0===t.length)&&r.a.createElement("tr",null,r.a.createElement("td",null,"\u5c1a\u7121\u8cc7\u6599"))))))},F=function(e){var t=e.case_id,a=e.onEditMediation,u=e.errors,o=e.selectedMediation,i=e.onDeleteMediation,d=Object(l.useState)(o.o_case_id?o.o_case_id:""),s=Object(n.a)(d,2),E=s[0],b=s[1],g=Object(l.useState)(o.o_case_date?k()(o.o_case_date).format("YYYY-MM-DD"):k()().format("YYYY-MM-DD")),Y=Object(n.a)(g,2),C=Y[0],j=Y[1],y=Object(l.useState)(k()().format("YYYY-MM-DD")),D=Object(n.a)(y,2),N=D[0],x=D[1],S=Object(l.useState)(o.req_date?k()(o.req_date).format("YYYY-MM-DDTHH:mm"):k()().format("YYYY-MM-DDTHH:mm")),w=Object(n.a)(S,2),H=w[0],q=w[1],R=Object(l.useState)(o.req_place?o.req_place:""),T=Object(n.a)(R,2),I=T[0],z=T[1],A=Object(l.useState)(o.o_staff?o.o_staff:""),F=Object(n.a)(A,2),U=F[0],P=F[1],B=Object(l.useState)(o.o_contact?o.o_contact:""),J=Object(n.a)(B,2),K=J[0],L=J[1],V=Object(l.useState)(o.o_phone?o.o_phone:""),Z=Object(n.a)(V,2),G=Z[0],Q=Z[1],W=Object(l.useState)(o.status?o.status:1),X=Object(n.a)(W,2),$=X[0],ee=X[1],te=Object(l.useState)(o.representative?o.representative:""),ae=Object(n.a)(te,2),ne=ae[0],le=ae[1],re=Object(l.useState)(o.note?o.note:""),ce=Object(n.a)(re,2),me=ce[0],ue=ce[1];return r.a.createElement(l.Fragment,null,r.a.createElement(c.a,{className:"mb-2"},r.a.createElement(m.a,{lg:12},r.a.createElement(M.a,{className:"border p-1 mt-2 mb-1 rounded font-13 bg-light"},r.a.createElement(O.a,null,r.a.createElement("h5",null,"\u5354\u8abf\u6703\u7d00\u9304"),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:12},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"txtCaseId"},"\u767c\u6587\u5b57\u865f"),r.a.createElement(p.a,{type:"text",name:"txtCaseId",id:"txtCaseId",value:E,onChange:function(e){return b(e.target.value)},placeholder:"\u4f8b:\u5e9c\u5efa\u884c\u4e8c\u5b57\u7b2c1073906069\u865f",invalid:!!u.o_case_id}),r.a.createElement(h.a,null,u.o_case_id)))),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:6},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"txtCaseDate"},"\u767c\u6587\u65e5\u671f"),r.a.createElement(p.a,{type:"date",name:"txtCaseDate",id:"txtCaseDate",value:C,onChange:function(e){return j(e.target.value)},invalid:!!u.o_case_date}),r.a.createElement(h.a,null,u.o_case_date)))),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:12},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"req_date"},"\u51fa\u5e2d\u6642\u9593"),r.a.createElement(p.a,{type:"datetime-local",name:"req_date",id:"req_date",placeholder:"\u9078\u64c7\u56de\u6587\u671f\u9650",value:k()(H).format("YYYY-MM-DDTHH:mm"),onChange:function(e){return q(e.target.value)},invalid:!!u.req_date}),r.a.createElement(h.a,null,u.req_date)))),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:12},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"req_place"},"\u51fa\u5e2d\u5730\u9ede"),r.a.createElement(p.a,{type:"text",name:"req_place",id:"req_place",value:I,onChange:function(e){return z(e.target.value)},placeholder:"\u4f8b:\u6843\u5712\u5e02\u6843\u5712\u5340\u7e23\u5e9c\u8def\u4e00\u865f\u4e03\u6a13",invalid:!!u.req_place}),r.a.createElement(h.a,null,u.req_place)))),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:6},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"o_staff"},"\u4e3b\u6301\u4eba"),r.a.createElement(p.a,{type:"text",name:"o_staff",id:"o_staff",value:U,onChange:function(e){return P(e.target.value)},placeholder:"\u4f8b:\u5f6d\u65b0\u6a39",invalid:!!u.o_staff}),r.a.createElement(h.a,null,u.o_staff)))),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:6},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"o_contact"},"\u9023\u7d61\u4eba"),r.a.createElement(p.a,{type:"text",name:"o_contact",id:"o_contact",value:K,onChange:function(e){return L(e.target.value)},placeholder:"\u9023\u7d61\u4eba\u59d3\u540d, \u4f8b:\u5b54\u7e41\u51f1",invalid:!!u.o_contact}),r.a.createElement(h.a,null,u.o_contact))),r.a.createElement(m.a,{md:6},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"txtPhone"},"\u96fb\u8a71"),r.a.createElement(p.a,{type:"text",name:"txtPhone",id:"txtPhone",value:G,onChange:function(e){return Q(e.target.value)},placeholder:"\u9023\u7d61\u4eba\u96fb\u8a71, \u4f8b:0922******",invalid:!!u.o_phone}),r.a.createElement(h.a,null,u.o_phone)))),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:12},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"representative"},"\u6211\u65b9\u51fa\u5e2d\u4eba\u54e1"),r.a.createElement(p.a,{type:"text",name:"representative",id:"representative",value:ne,onChange:function(e){return le(e.target.value)},placeholder:"\u4f8b:\u5f35\u5c0f\u83ef",invalid:!!u.representative}),r.a.createElement(h.a,null,u.representative)))),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:6},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"md_status"},"\u72c0\u614b"),r.a.createElement(p.a,{type:"select",name:"md_status",id:"md_status",value:$,onChange:function(e){return ee(e.target.value)},invalid:!!u.status},r.a.createElement("option",{value:"1"},"\u8655\u7406\u4e2d"),r.a.createElement("option",{value:"4"},"\u7d50\u6848")),r.a.createElement(h.a,null,u.status))),r.a.createElement(m.a,{md:6},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"close_date"},"\u7d50\u6848\u65e5\u671f"),r.a.createElement(p.a,{type:"date",name:"close_date",id:"close_date",value:k()(N).format("YYYY-MM-DD"),onChange:function(e){return x(e.target.value)},invalid:!!u.close_date}),r.a.createElement(h.a,null,u.close_date)))),r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:12},r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"txtReason"},"\u5354\u8abf\u7d50\u679c"),r.a.createElement(p.a,{type:"textarea",name:"txtReason",id:"txtReason",value:me,onChange:function(e){return ue(e.target.value)},invalid:!!u.note}),r.a.createElement(h.a,null,u.note)))),r.a.createElement("div",{className:"button-list"},r.a.createElement(_.a,{size:"sm",color:"primary",type:"button",onClick:function(){var e={case_id:t,o_case_id:E,o_case_date:C,req_date:H,req_place:I,o_staff:U,o_contact:K,o_phone:G,representative:ne,close_date:N,note:me,status:$};e.id=o.id?o.id:null,a(e)}},"\u78ba\u8a8d\u9001\u51fa"),r.a.createElement(_.a,{size:"sm",color:"danger",type:"button",onClick:function(){window.confirm("\u78ba\u5b9a\u8981\u522a\u9664#"+o.id+"\u7d00\u9304\u55ce?")&&i(o.id)}},"\u522a\u9664\u6b64\u7b46")))))))};t.default=Object(D.b)(function(e){return{error:e.OfflineCs.error,config_status:e.OfflineCs.config_status,currentRecord:e.OfflineCs.currentRecord}},{getCurrentRecord:H.S,editCplReply:H.E,deleteCplCase:H.u,moveCplCase:H.rb,editCplMediation:H.C,deleteCplCaseReply:H.v,deleteCplMediation:H.w,editCplRef:H.D,deleteCplRef:H.x,addCplAttachment:H.a,deleteCplAttachment:H.t})(function(e){var t=e.getCurrentRecord,a=e.editCplReply,D=e.editCplMediation,N=e.deleteCplCase,x=e.deleteCplCaseReply,H=e.deleteCplMediation,R=e.currentRecord,T=e.moveCplCase,I=e.match,z=e.history,U=e.config_status,P=e.error,B=e.editCplRef,J=e.deleteCplRef,K=e.addCplAttachment,L=e.deleteCplAttachment,V=I.params.record_id?I.params.record_id:null,Z=Object(l.useState)(k()().format("YYYY-MM-DDTHH:mm")),G=Object(n.a)(Z,2),Q=G[0],W=G[1],X=Object(l.useState)(""),$=Object(n.a)(X,2),ee=$[0],te=$[1],ae=Object(l.useState)({}),ne=Object(n.a)(ae,2),le=ne[0],re=ne[1],ce=Object(l.useState)(!1),me=Object(n.a)(ce,2),ue=me[0],oe=me[1],ie=Object(l.useState)(!1),de=Object(n.a)(ie,2),se=de[0],fe=de[1],Ee=Object(l.useState)(null),pe=Object(n.a)(Ee,2),be=pe[0],_e=pe[1],he=Object(l.useState)(k()().format("YYYY-MM-DDTHH:mm")),ve=Object(n.a)(he,2),ge=ve[0],Ye=ve[1],Ce=Object(l.useState)(""),Me=Object(n.a)(Ce,2),Oe=Me[0],je=Me[1],ye=Object(l.useState)({}),De=Object(n.a)(ye,2),Ne=De[0],ke=De[1],xe=Object(l.useState)(1),Se=Object(n.a)(xe,2),we=Se[0],He=Se[1],qe=Object(l.useState)(""),Re=Object(n.a)(qe,2),Te=Re[0],Ie=Re[1],ze=Object(l.useState)(""),Ae=Object(n.a)(ze,2),Fe=Ae[0],Ue=Ae[1],Pe=Object(l.useState)(null),Be=Object(n.a)(Pe,2),Je=Be[0],Ke=Be[1],Le=Object(l.useState)(""),Ve=Object(n.a)(Le,2);Ve[0],Ve[1];Object(l.useEffect)(function(){V&&t("cpl_case",V,z)},[]),Object(l.useEffect)(function(){re(P||{})},[P]),Object(l.useEffect)(function(){te(""),fe(!1),R.attachments&&Ue("\u9644\u4ef6"+Number.parseInt(R.attachments.length+1))},[R]);var Ze=function(e){console.log("changeStatus",e),T(V,{status:e})};return r.a.createElement(l.Fragment,null,r.a.createElement(w.a,{breadCrumbItems:[{label:"\u7dda\u4e0b\u5ba2\u670d",path:"/offline/cpl_case/home",active:!1},{label:"\u6d88\u4fdd",path:"/offline/cpl_case/home",active:!1},{label:"\u6aa2\u8996\u6848\u4ef6",path:"/offline/cpl_case/view",active:!0}],title:"\u6aa2\u8996\u6848\u4ef6"}),r.a.createElement(c.a,{className:"mb-2"},r.a.createElement(m.a,{lg:6})),Object.keys(R).length>0&&r.a.createElement(q.a,{row:R,config_status:U,deleteRef:function(e){window.confirm("\u78ba\u5b9a\u8981\u522a\u9664\u95dc\u806f\u6848\u4ef6#"+e+"\u55ce?")&&J(V,e)},deleteAttach:function(e){window.confirm("\u78ba\u5b9a\u8981\u522a\u9664\u9019\u500b\u9644\u4ef6\u55ce?")&&L(e)}}),r.a.createElement("hr",null),r.a.createElement(c.a,{className:"mb-2"},r.a.createElement(m.a,{lg:12},r.a.createElement(u.a,{tabs:!0},r.a.createElement(o.a,null,r.a.createElement(i.a,{href:"#",className:S()({active:1===we}),onClick:function(){He(1)}},r.a.createElement("i",{className:S()("mdi mdi-folder-plus","d-lg-none","d-block","mr-1")}),r.a.createElement("span",{className:"d-none d-lg-block"},r.a.createElement("i",{className:"mdi mdi-folder-plus mr-1"}),"\u65b0\u589e\u76f8\u95dc\u6848\u4ef6"))),r.a.createElement(o.a,null,r.a.createElement(i.a,{href:"#",className:S()({active:2===we}),onClick:function(){He(2)}},r.a.createElement("i",{className:S()("mdi mdi-attachment","d-lg-none","d-block","mr-1")}),r.a.createElement("span",{className:"d-none d-lg-block"},r.a.createElement("i",{className:"mdi mdi-attachment mr-1"}),"\u65b0\u589e\u9644\u4ef6")))),r.a.createElement(d.a,{activeTab:we},r.a.createElement(s.a,{tabId:1},r.a.createElement(c.a,null,r.a.createElement(m.a,{sm:"4",className:"bg-light m-2"},r.a.createElement(f.a,null,r.a.createElement(E.a,{className:"mt-2"},r.a.createElement(p.a,{type:"select",name:"ref_case_list",id:"ref_case_list",value:Te,onChange:function(e){return Ie(e.target.value)},invalid:!!le.new_ref_case},r.a.createElement("option",{value:""},"\u6848\u4ef6\u5217\u8868"),R.ref_case_list&&R.ref_case_list.map(function(e){return r.a.createElement("option",{key:"refcase_".concat(e.id),value:e.id},"# ",e.id," - ",e.o_case_id," - ",e.appellant)})),r.a.createElement(b.a,{addonType:"append"},r.a.createElement(_.a,{color:"dark",size:"sm",onClick:function(){""!==Te&&B(R.id,Te)}},"\u52a0\u5165")))),r.a.createElement("p",{className:"mt-3"})))),r.a.createElement(s.a,{tabId:2},r.a.createElement(c.a,null,r.a.createElement(m.a,{sm:"4",className:"bg-light m-2"},r.a.createElement(f.a,null,r.a.createElement("label",{className:"mt-2"},"\u9644\u4ef6\u540d\u7a31"),r.a.createElement(p.a,{type:"text",name:"attach_title",id:"attach_title",className:"required",value:Fe,onChange:function(e){return Ue(e.target.value)},autoComplete:"off",invalid:!!le.attach_title})," ",r.a.createElement(h.a,null,le.attach_title),r.a.createElement(v.a,{className:"mt-2",for:"cfile"},"\u9078\u64c7\u9644\u4ef6"),r.a.createElement(E.a,null,r.a.createElement(p.a,{type:"file",name:"file",id:"file01",onChange:function(e){Ke(e.target.files)},invalid:!!le.file01}),r.a.createElement(h.a,null,le.file01)),r.a.createElement(_.a,{color:"dark",size:"sm",className:"mt-2",onClick:function(){var e=new FormData;e.append("attach_title",Fe),e.append("case_id",V),""!==Fe?null!==Je?(e.append("attachment01",Je[0]),K(e),Ke(null),re({})):re({file01:"\u8acb\u9078\u64c7\u6a94\u6848"}):re({attach_title:"\u8acb\u586b\u5beb\u9644\u4ef6\u540d\u7a31"})}},"\u4e0a\u50b3\u9644\u4ef6")))))))),r.a.createElement("hr",null),r.a.createElement(A,{replies:R.replies||[],onEditClick:function(e){oe(!0);var t=R.replies.filter(function(t){return t.id===e})[0];_e(e),Ye(t.contact_time),je(t.note)},onDeleteReplyClick:function(e){window.confirm("\u78ba\u5b9a\u8981\u522a\u9664\u9019\u7b46\u6b77\u7a0b\u55ce?")&&x(e)}}),r.a.createElement(c.a,{className:"mb-2"},r.a.createElement(m.a,{lg:12},r.a.createElement(g.a,{isOpen:ue,toggle:function(e){return oe(!ue)}},r.a.createElement(Y.a,{toggle:function(e){return oe(!ue)}},"\u7de8\u8f2f"),r.a.createElement(C.a,null,r.a.createElement(M.a,{className:"border p-1 mt-2 mb-1 rounded font-13 bg-light"},r.a.createElement(O.a,null,r.a.createElement("h5",null,"\u7de8\u8f2f\u4e8b\u4ef6\u6b77\u7a0b"),r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"txtUpdContactTime"},"\u806f\u7d61\u6642\u9593"),r.a.createElement(p.a,{type:"datetime-local",name:"txtUpdContactTime",id:"txtUpdContactTime",value:k()(ge).format("YYYY-MM-DDTHH:mm"),onChange:function(e){return Ye(e.target.value)},invalid:!!le.upd_contact_time}),r.a.createElement(h.a,null,le.upd_contact_time)),r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"txtUpdNote"},"\u6b77\u7a0b\u7d00\u9304"),r.a.createElement(p.a,{type:"textarea",name:"txtUpdNote",id:"txtUpdNote",rows:"5",value:Oe,onChange:function(e){return je(e.target.value)},placeholder:"\u6b77\u7a0b\u7d00\u9304",invalid:!!le.upd_note}),r.a.createElement(h.a,null,le.upd_note))))),r.a.createElement(j.a,null,r.a.createElement(_.a,{color:"secondary",className:"sm",onClick:function(e){return oe(!ue)}},"\u53d6\u6d88"),r.a.createElement(_.a,{color:"primary",onClick:function(e){return function(){var e={id:be,case_id:V,note:Oe,contact_time:k()(ge).format("YYYY-MM-DD HH:mm:ss"),contact_date:k()(ge).format("YYYY-MM-DD")};oe(!ue),a(e)}()}},"\u78ba\u8a8d\u4fee\u6539")," ")))),("1"===R.status||"2"===R.status)&&r.a.createElement(c.a,{form:!0},r.a.createElement(m.a,{md:6},r.a.createElement(M.a,{className:"border p-1 mt-2 mb-1 rounded font-13 bg-light"},r.a.createElement(O.a,null,r.a.createElement("h5",null,"\u6dfb\u52a0\u806f\u7d61\u6216\u4e8b\u4ef6\u6b77\u7a0b"),r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"txtContactTime"},"\u806f\u7d61\u6642\u9593"),r.a.createElement(p.a,{type:"datetime-local",name:"txtContactTime",id:"txtContactTime",value:k()(Q).format("YYYY-MM-DDTHH:mm"),onChange:function(e){return W(e.target.value)},invalid:!!le.contact_time}),r.a.createElement(h.a,null,le.contact_time)),r.a.createElement(f.a,null,r.a.createElement(v.a,{for:"txtNote"},"\u6b77\u7a0b\u7d00\u9304"),r.a.createElement(p.a,{type:"textarea",name:"txtNote",id:"txtNote",rows:"5",value:ee,onChange:function(e){return te(e.target.value)},placeholder:"\u6b77\u7a0b\u7d00\u9304",invalid:!!le.note}),r.a.createElement(h.a,null,le.note)),r.a.createElement(_.a,{color:"primary",type:"button",onClick:function(){var e={case_id:V,note:ee,contact_time:k()(Q).format("YYYY-MM-DD HH:mm:ss"),contact_date:k()(Q).format("YYYY-MM-DD")};a(e)}},"\u78ba\u8a8d\u9001\u51fa"))))),R.mediations&&R.mediations.length>0&&r.a.createElement(l.Fragment,null,r.a.createElement("h5",{className:"text-primary"},"\u5354\u8abf\u6703\u8cc7\u8a0a"),r.a.createElement("table",{className:"table table-striped table-bordered font-13"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null," #"),r.a.createElement("th",null,"\u7d50\u6848\u65e5\u671f"),r.a.createElement("th",null,"\u767c\u6587\u65e5\u671f"),r.a.createElement("th",null,"\u767c\u6587\u5b57\u865f"),r.a.createElement("th",null,"\u51fa\u5e2d\u65e5\u671f"),r.a.createElement("th",null,"\u51fa\u5e2d\u5730\u9ede"),r.a.createElement("th",null,"\u4e3b\u6301\u4eba"),r.a.createElement("th",null,"\u806f\u7d61\u4eba\u59d3\u540d"),r.a.createElement("th",null,"\u9023\u7d61\u4eba\u96fb\u8a71"),r.a.createElement("th",null,"\u6211\u65b9\u51fa\u5e2d\u4eba\u54e1"),r.a.createElement("th",null,"\u7d50\u679c"),r.a.createElement("th",null,"\u72c0\u614b"),r.a.createElement("th",null,"\u5efa\u7acb\u6642\u9593"))),r.a.createElement("tbody",null,R.mediations.map(function(e){return r.a.createElement("tr",{key:"crmd_".concat(e.id)},r.a.createElement("td",null,r.a.createElement(_.a,{size:"sm",color:"light",onClick:function(t){return function(e){fe(!0);var t=R.mediations.filter(function(t){return t.id===e})[0];ke(t)}(e.id)}},e.id)),r.a.createElement("td",null," ",k()(e.close_date).format("YYYY-MM-DD")),r.a.createElement("td",null," ",k()(e.o_case_date).format("YYYY-MM-DD")," "),r.a.createElement("td",null,e.o_case_id),r.a.createElement("td",null," ",k()(e.req_date).format("YYYY-MM-DD HH:mm:ss")),r.a.createElement("td",null,e.req_place),r.a.createElement("td",null,e.o_staff),r.a.createElement("td",null,e.o_contact),r.a.createElement("td",null,e.o_phone),r.a.createElement("td",null,e.representative),r.a.createElement("td",null,e.note),r.a.createElement("td",null,U[e.status]),r.a.createElement("td",null," ",k()(e.create_time).format("YYYY-MM-DD HH:mm:ss")))})))),r.a.createElement(c.a,{className:"mt-2"},r.a.createElement(m.a,{sm:12},r.a.createElement("hr",null),r.a.createElement(y.b,{className:"btn btn-secondary mr-2",to:"/offline/cpl_case/home"},"\u56de\u6d88\u4fdd\u5217\u8868"),"2"===R.status&&r.a.createElement(_.a,{color:"info",type:"button",onClick:function(e){return Ze(5)}},"\u7121\u5171\u8b58"),"3"===R.status&&r.a.createElement(_.a,{color:"dark",type:"button",onClick:function(e){return fe(!se)}},"\u65b0\u589e\u5354\u8abf\u6703\u7d00\u9304"),("2"===R.status||"5"===R.status)&&r.a.createElement(_.a,{color:"warning",type:"button",onClick:function(e){return Ze(3)}},"\u9032\u5165\u6d88\u4fdd\u5354\u8abf\u958b\u6703\u7a0b\u5e8f"),"3"===R.status&&r.a.createElement(_.a,{color:"success",type:"button",onClick:function(e){return Ze(2)}},"\u7d50\u6848"),r.a.createElement(_.a,{color:"danger",type:"button",onClick:function(e){window.confirm("\u78ba\u5b9a\u8981\u522a\u9664\u55ce?")&&N(V,z)}},r.a.createElement("i",{className:"mdi mdi-trash-can-outline"}),"\u522a\u9664\u672c\u6848"))),r.a.createElement(c.a,{className:"mb-2"},r.a.createElement(m.a,{lg:12},r.a.createElement(g.a,{isOpen:se,toggle:function(e){return fe(!se)}},r.a.createElement(Y.a,{toggle:function(e){return fe(!se)}},"\u7de8\u8f2f"),r.a.createElement(C.a,null,r.a.createElement(F,{selectedMediation:Ne,case_id:V,onEditMediation:function(e){D(e)},onDeleteMediation:function(e){H(e)},errors:le}))))))})},124:function(e,t,a){"use strict";var n=a(2),l=a.n(n),r=a(50),c=a(162),m=a(163),u=a(149),o=a(150);a(26);t.a=function(e){return l.a.createElement(c.a,null,l.a.createElement(m.a,null,l.a.createElement("div",{className:"page-title-box"},l.a.createElement("div",{className:"page-title-right"},l.a.createElement(u.a,null,l.a.createElement(o.a,null,l.a.createElement(r.b,{to:"/"},"Hyper")),e.breadCrumbItems.map(function(e,t){return e.active?l.a.createElement(o.a,{active:!0,key:t},e.label):l.a.createElement(o.a,{key:t},l.a.createElement(r.b,{to:e.path},e.label))}))),l.a.createElement("h4",{className:"page-title"},e.title))))}},148:function(e,t,a){"use strict";var n=a(43);a.d(t,"K",function(){return n.a}),a.d(t,"pb",function(){return n.d}),a.d(t,"qb",function(){return n.g}),a.d(t,"wb",function(){return n.h});var l=a(40);a.d(t,"h",function(){return l.a}),a.d(t,"i",function(){return l.b}),a.d(t,"j",function(){return l.c}),a.d(t,"k",function(){return l.d}),a.d(t,"nb",function(){return l.e});var r=a(51);a.d(t,"g",function(){return r.a}),a.d(t,"ob",function(){return r.c});var c=a(60);a.d(t,"V",function(){return c.a});var m=a(37);a.d(t,"p",function(){return m.a}),a.d(t,"y",function(){return m.b}),a.d(t,"G",function(){return m.e}),a.d(t,"Z",function(){return m.h}),a.d(t,"Cb",function(){return m.k});var u=a(18);a.d(t,"a",function(){return u.a}),a.d(t,"t",function(){return u.d}),a.d(t,"u",function(){return u.g}),a.d(t,"v",function(){return u.i}),a.d(t,"w",function(){return u.m}),a.d(t,"x",function(){return u.p}),a.d(t,"C",function(){return u.s}),a.d(t,"D",function(){return u.v}),a.d(t,"E",function(){return u.y}),a.d(t,"H",function(){return u.B}),a.d(t,"S",function(){return u.E}),a.d(t,"X",function(){return u.H}),a.d(t,"rb",function(){return u.K});var o=a(44);a.d(t,"n",function(){return o.a}),a.d(t,"F",function(){return o.b}),a.d(t,"Q",function(){return o.e}),a.d(t,"W",function(){return o.h});var i=a(61);a.d(t,"cb",function(){return i.a});var d=a(48);a.d(t,"L",function(){return d.a}),a.d(t,"gb",function(){return d.d});var s=a(27);a.d(t,"l",function(){return s.a}),a.d(t,"M",function(){return s.b}),a.d(t,"N",function(){return s.e}),a.d(t,"sb",function(){return s.h}),a.d(t,"tb",function(){return s.k}),a.d(t,"vb",function(){return s.n}),a.d(t,"Bb",function(){return s.q});var f=a(14);a.d(t,"b",function(){return f.a}),a.d(t,"c",function(){return f.d}),a.d(t,"e",function(){return f.g}),a.d(t,"o",function(){return f.j}),a.d(t,"r",function(){return f.k}),a.d(t,"J",function(){return f.n}),a.d(t,"R",function(){return f.q}),a.d(t,"Y",function(){return f.t}),a.d(t,"ab",function(){return f.w}),a.d(t,"bb",function(){return f.x}),a.d(t,"db",function(){return f.C}),a.d(t,"eb",function(){return f.E}),a.d(t,"fb",function(){return f.F}),a.d(t,"zb",function(){return f.M}),a.d(t,"Ab",function(){return f.P}),a.d(t,"Db",function(){return f.S}),a.d(t,"Eb",function(){return f.V});var E=a(22);a.d(t,"d",function(){return E.a}),a.d(t,"q",function(){return E.d}),a.d(t,"z",function(){return E.e}),a.d(t,"U",function(){return E.h}),a.d(t,"hb",function(){return E.k}),a.d(t,"ib",function(){return E.m}),a.d(t,"mb",function(){return E.p}),a.d(t,"ub",function(){return E.t}),a.d(t,"Fb",function(){return E.w});var p=a(28);a.d(t,"A",function(){return p.a}),a.d(t,"I",function(){return p.d}),a.d(t,"T",function(){return p.g}),a.d(t,"jb",function(){return p.j}),a.d(t,"kb",function(){return p.m}),a.d(t,"lb",function(){return p.p});var b=a(25);a.d(t,"f",function(){return b.a}),a.d(t,"m",function(){return b.d}),a.d(t,"s",function(){return b.e}),a.d(t,"B",function(){return b.h}),a.d(t,"O",function(){return b.k}),a.d(t,"P",function(){return b.n}),a.d(t,"xb",function(){return b.q}),a.d(t,"yb",function(){return b.t})},608:function(e,t,a){"use strict";var n=a(2),l=a.n(n),r=a(162),c=a(163),m=a(174),u=a(290),o=a.n(u);t.a=function(e){var t=e.row,a=e.config_status,n=e.deleteRef,u=e.deleteAttach;return l.a.createElement(r.a,null,l.a.createElement(c.a,{xl:6},l.a.createElement(m.a,{className:"mb-0",sm:4,dark:!0},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",null,"\u72c0\u614b"),l.a.createElement("td",{colSpan:"3"},a[t.status],"1899-11-29T16:00:00.000Z"!==t.close_date&&t.close_date&&l.a.createElement("span",null,"(\u7d50\u6848\u65e5\u671f :",l.a.createElement(o.a,{format:"YYYY-MM-DD"},t.close_date),")"))),l.a.createElement("tr",null,l.a.createElement("th",null,"\u767c\u6587\u5b57\u865f\uff1a"),l.a.createElement("td",null,t.o_case_id),l.a.createElement("th",null,"\u7533\u8a34\u4eba\uff1a"),l.a.createElement("td",null,t.appellant)),l.a.createElement("tr",null,l.a.createElement("th",null,"\u767c\u6587\u65e5\u671f\uff1a"),l.a.createElement("td",null,l.a.createElement(o.a,{format:"YYYY-MM-DD"},t.o_case_date)),l.a.createElement("th",null,"\u56de\u8986\u671f\u9650\uff1a"),l.a.createElement("td",null,l.a.createElement(o.a,{format:"YYYY-MM-DD"},t.deadline)," ")),l.a.createElement("tr",null,l.a.createElement("th",null,"\u904a\u6232\u89d2\u8272\uff1a"),l.a.createElement("th",{colSpan:"3"},"\u3010",t.game_name,"\u3011",t.role_name," (",t.server_name,")")),l.a.createElement("tr",null,l.a.createElement("th",null,"\u8655\u7406\u4eba\u54e1\uff1a"),l.a.createElement("td",null,t.admin_name),l.a.createElement("th",null,"\u5efa\u7acb\u6642\u9593\uff1a"),l.a.createElement("td",null,l.a.createElement(o.a,{format:"YYYY-MM-DD HH:mm"},t.create_time))),l.a.createElement("tr",null,l.a.createElement("th",{className:"text-nowrap"},"\u7533\u8a34\u539f\u56e0\uff1a"),l.a.createElement("td",{colSpan:"3"},l.a.createElement("span",{dangerouslySetInnerHTML:{__html:t.reason}})," ")),l.a.createElement("tr",null,l.a.createElement("th",null,"\u76f8\u95dc\u6848\u4ef6\uff1a"),l.a.createElement("td",{colSpan:"3"},t.refs.map(function(e){return l.a.createElement("div",{key:"ref_".concat(e.ref_id)},l.a.createElement("a",{className:"text-light",target:"blank",href:"".concat(e.ref_id)},"* # ",e.ref_id," - ",e.o_case_id)," ",n&&l.a.createElement("span",{className:"ml-2",onClick:function(t){return n(e.ref_id)}},l.a.createElement("i",{className:"text-danger mdi mdi-trash-can-outline"})," "))}))),l.a.createElement("tr",null,l.a.createElement("th",null,"\u76f8\u95dc\u9644\u4ef6\uff1a"),l.a.createElement("td",{colSpan:"3"},t.attachments.map(function(e){return l.a.createElement("div",{key:"attach_".concat(e.id)},l.a.createElement("a",{className:"text-light",target:"blank",href:e.pic_path},"* ",e.title),u&&l.a.createElement("span",{className:"ml-2",onClick:function(t){return u(e.id)}},l.a.createElement("i",{className:"text-danger mdi mdi-trash-can-outline"})," "))})))))))}}}]);
//# sourceMappingURL=109.14154a18.chunk.js.map
import{i as d,W as T,j as e,P as f,B as c,G as w}from"./app-C_DxjwWY.js";import{P as y}from"./PageHeader-OnnDhg3C.js";import{A as P,S as m,T as b,C as _,a as g}from"./AppLayout-HsdZrY7g.js";import{G as o}from"./Grid-yslJ5uJl.js";import{T as S,D as u}from"./Title-gs-8KFVt.js";import{S as B}from"./Select-_gJN92p0.js";import{I as E}from"./IconStatusChange-vrwTvw0m.js";import{T as l}from"./Tabs-HDMTV0PT.js";import{T as R}from"./TextInput-C56idysm.js";import{I as z,F,a as N}from"./IconReceipt-0GuSqs4n.js";import{I as v}from"./IconTrash-kHJMPzU4.js";import{F as I}from"./Flex-1RADBffJ.js";import{I as A}from"./IconPlus-uNG9ZPgt.js";import{I as G,K as L}from"./IconCornerDownLeft-R6alCY5D.js";import"./get-safe-id-KjcUIRmk.js";const se=t=>{console.log(t);const[i,x]=d.useState(null),n=d.useRef(null),s=T({status:t.order.status||"Belum Siap Dikirim",items:!t.order.is_auto&&t.order.items||[{receipt_number:""}],file:i});d.useEffect(()=>{i&&s.setData("file",i)},[i]),console.log(s.data);const C=()=>{s.setData("items",[...s.data.items,{receipt_number:""}])},k=r=>{const a=[...s.data.items];a.splice(r,1),s.setData("items",a)};return e.jsxs(P,{title:t.title,auth:t.auth.user,meta:t.meta,children:[e.jsx(y,{title:t.title,breadcrumbs:[{label:"Pesanan",route:"orders.index"},{label:"Ubah",route:"orders.edit"}]}),e.jsxs("form",{onSubmit:r=>{r.preventDefault(),!s.hasErrors&&s.post(route("orders.store",{order_id:t.order.id}),{_method:"put"})},children:[e.jsxs(m,{children:[e.jsxs(o,{children:[e.jsx(o.Col,{span:{base:12,sm:4},children:e.jsx(S,{order:3,children:"Pesanan"})}),e.jsx(o.Col,{span:{base:12,sm:8},children:e.jsx(f,{p:32,radius:20,withBorder:!0,children:e.jsx(m,{gap:24,children:e.jsx(B,{label:"Status",placeholder:"Pilih status",variant:"filled",radius:"xl",data:["Belum Siap Dikirim","Siap Dikirim"],checkIconPosition:"right",allowDeselect:!1,leftSection:e.jsx(E,{size:16}),withScrollArea:!1,value:s.data.status,styles:{label:{marginBottom:8},dropdown:{padding:4,borderRadius:20},option:{borderRadius:20}},onChange:r=>{s.setData("status",r)},error:s.errors.status})})})})]}),e.jsx(u,{my:32}),e.jsxs(o,{children:[e.jsx(o.Col,{span:{base:12,sm:4},children:e.jsx(S,{order:3,children:"Barang"})}),e.jsx(o.Col,{span:{base:12,sm:8},children:e.jsx(f,{p:32,radius:20,withBorder:!0,children:e.jsxs(l,{color:"red.5",radius:"xs",defaultValue:t.order.is_auto?"automatic":"manual",styles:{tab:{padding:16},panel:{marginTop:32}},children:[e.jsxs(l.List,{grow:!0,children:[e.jsx(l.Tab,{disabled:i||t.order.is_auto,value:"manual",children:"Manual"}),e.jsx(l.Tab,{disabled:s.data.items.some(r=>r.receipt_number),value:"automatic",children:"Excel/CSV"})]}),e.jsxs(l.Panel,{value:"manual",children:[e.jsx(b,{fw:500,mb:8,size:"sm",children:"Nomor Resi"}),e.jsx(m,{gap:24,children:s.data.items.map((r,a)=>e.jsxs(_,{children:[e.jsx(R,{w:"100%",mr:16,placeholder:`Masukkan nomor resi ${a+1}`,variant:"filled",radius:"xl",leftSection:e.jsx(z,{size:16}),value:r.receipt_number,onChange:D=>{const h=D.target.value,j=[...s.data.items];j[a].receipt_number=h,s.setData("items",j);const p=h?"":"Nomor resi tidak boleh kosong";p?s.setError(`items.${a}.receipt_number`,p):s.clearErrors(`items.${a}.receipt_number`)},styles:{label:{marginBottom:8}}}),e.jsx(g,{size:40,radius:"xl",variant:"subtle",color:"red",onClick:()=>k(a),disabled:s.data.items.length===1,children:e.jsx(v,{})})]},a))}),e.jsx(u,{my:32}),e.jsx(I,{justify:"flex-end",children:e.jsx(c,{variant:"outline",leftSection:e.jsx(A,{}),radius:"xl",color:"red.5",onClick:C,disabled:s.processing,children:"Tambah Nomor Resi Lainnya"})})]}),e.jsxs(l.Panel,{value:"automatic",children:[e.jsxs(w,{justify:"center",children:[e.jsx(F,{leftSection:e.jsx(N,{}),color:"green",variant:"outline",resetRef:n,radius:"xl",onChange:x,accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",children:r=>e.jsx(c,{...r,children:"Impor Excel/CSV"})}),e.jsx(g,{size:40,radius:"xl",variant:"subtle",color:"red",onClick:()=>{var r;x(null),(r=n.current)==null||r.call(n)},disabled:!i,children:e.jsx(v,{})})]}),i&&e.jsxs(b,{size:"sm",ta:"center",mt:"sm",children:["Picked file: ",i.name]})]})]})})})]})]}),e.jsx(u,{my:32}),e.jsx(I,{justify:"flex-end",children:e.jsx(c,{leftSection:e.jsx(G,{}),rightSection:e.jsx(L,{children:"Enter"}),loading:s.processing,radius:"xl",color:"red.5",type:"submit",children:"Simpan"})})]})]})};export{se as default};
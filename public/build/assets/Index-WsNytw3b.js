import{i as b,j as e,B as g,y as i,m as f}from"./app-C_DxjwWY.js";import{D as y,I as c,a as I,P as k}from"./DataTable-q0nUR4_e.js";import{P as C}from"./PageHeader-OnnDhg3C.js";import{A as w,a as n,T as d,M as s,f as P}from"./AppLayout-HsdZrY7g.js";import"./DateTimeFormatter-1PhgYEDw.js";import{I as u}from"./IconPlus-uNG9ZPgt.js";import{L as m}from"./List-MY51wW15.js";import{I as _}from"./IconTrash-kHJMPzU4.js";import"./AccordionChevron-TzXOvNPl.js";import"./Select-_gJN92p0.js";import"./Flex-1RADBffJ.js";import"./TextInput-C56idysm.js";import"./Alert-nAAyeiA1.js";import"./Title-gs-8KFVt.js";import"./dayjs.min-wYxT7LQk.js";import"./clamp-153t9aX1.js";import"./id--bwuk72o.js";const G=t=>{console.log(t);const l=t.auth.user.role,h=b.useMemo(()=>{const r=(a,x,j)=>({id:a,header:x,accessorFn:p=>e.jsx(d,{style:{whiteSpace:"nowrap"},children:j(p)})});let o=[r("items_count","Jumlah Barang",a=>a.items_count),r("status","Status",a=>e.jsx(k,{bg:a.status.includes("Belum")?"red":"green",c:"white",children:a.status})),r("created_at","Dibuat Pada",a=>a.created_at),r("updated_at","Diperbarui Pada",a=>a.updated_at)];return l==="admin"&&o.unshift(r("customer","Nama Lengkap",a=>a.customer)),o},[l]);return e.jsxs(w,{title:t.title,auth:t.auth.user,meta:t.meta,children:[e.jsx(C,{title:t.title,actions:t.auth.user.role==="pelanggan"&&e.jsxs(e.Fragment,{children:[e.jsx(g,{disabled:!t.auth.user.phone_number||!t.auth.user.address,radius:"xl",color:"red.5",h:40,leftSection:e.jsx(u,{}),display:{base:"none",xs:"block"},onClick:()=>i.get(route("orders.create")),children:"Tambah"}),e.jsx(n,{disabled:!t.auth.user.phone_number||!t.auth.user.address,size:40,color:"red.5",radius:"xl",display:{base:"block",xs:"none"},onClick:()=>i.get(route("orders.create")),children:e.jsx(u,{})})]})}),e.jsx(y,{columns:h,data:t.orders,renderDetailPanel:({row:r})=>e.jsxs(m,{type:"ordered",children:[e.jsx(d,{mb:16,fw:500,children:"Nomor Resi"}),r.original.items.map(o=>e.jsx(m.Item,{children:o.receipt_number},o.receipt_number))]}),renderRowActions:t.auth.user.role==="admin"?({row:r})=>e.jsxs(s,{position:"bottom-start",styles:{dropdown:{borderRadius:20},item:{borderRadius:20}},children:[e.jsx(s.Target,{children:e.jsx(n,{size:40,radius:"xl",variant:"subtle",color:"gray.9",c:"gray.9",children:e.jsx(c,{})})}),e.jsx(s.Dropdown,{children:e.jsx(s.Item,{leftSection:e.jsx(P,{}),onClick:()=>i.get(route("schedule.create",r.original.id)),children:"Jadwalkan"})})]}):({row:r})=>e.jsxs(s,{position:"bottom-start",styles:{dropdown:{borderRadius:20},item:{borderRadius:20}},children:[e.jsx(s.Target,{children:e.jsx(n,{size:40,radius:"xl",variant:"subtle",color:"gray.9",c:"gray.9",children:e.jsx(c,{})})}),e.jsxs(s.Dropdown,{children:[e.jsx(s.Item,{leftSection:e.jsx(I,{}),onClick:()=>i.get(route("orders.edit",r.original.id)),children:"Ubah"}),e.jsx(s.Item,{leftSection:e.jsx(_,{}),onClick:()=>f.openConfirmModal({styles:{content:{padding:32,borderRadius:20},header:{padding:0,backgroundColor:"transparent"},body:{padding:0}},children:"Apakah anda yakin ingin menghapus pesanan ini?",title:e.jsx(d,{fw:500,children:"Hapus Pesanan"}),centered:!0,withCloseButton:!1,labels:{confirm:"Hapus",cancel:"Batal"},confirmProps:{color:"red"},onConfirm:()=>i.delete(route("orders.destroy",r.original.id))}),children:"Hapus"})]})]})})]})};export{G as default};
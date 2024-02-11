import{a as O,f as P,u as N,R as m,b as D,k as F,U as H,l as z,d as q,e as G,g as J,h as Q,n as X}from"./app-C_DxjwWY.js";import{g as U}from"./get-safe-id-KjcUIRmk.js";import{l as Y,c as Z,u as ee}from"./AppLayout-HsdZrY7g.js";const[te,K]=O("Tabs component was not found in the tree");var f={root:"m-89d60db1","list--default":"m-576c9d4",list:"m-89d33d6d",panel:"m-b0c91715",tab:"m-4ec4dce6",tabSection:"m-fc420b1f","tab--default":"m-539e827b","list--outline":"m-6772fbd5","tab--outline":"m-b59ab47c","tab--pills":"m-c3381914"};const ae={},L=P((l,c)=>{const a=N("TabsList",ae,l),{children:r,className:b,grow:i,justify:n,classNames:o,styles:d,style:v,mod:u,...s}=a,t=K();return m.createElement(D,{...s,...t.getStyles("list",{className:b,style:v,classNames:o,styles:d,props:a,variant:t.variant}),ref:c,role:"tablist",variant:t.variant,mod:[{grow:i,orientation:t.orientation,placement:t.orientation==="vertical"&&t.placement,inverted:t.inverted},u],"aria-orientation":t.orientation,__vars:{"--tabs-justify":n}},r)});L.classes=f;L.displayName="@mantine/core/TabsList";const se={},k=P((l,c)=>{const a=N("TabsPanel",se,l),{children:r,className:b,value:i,classNames:n,styles:o,style:d,mod:v,...u}=a,s=K(),t=s.value===i,y=s.keepMounted||a.keepMounted||t?r:null;return m.createElement(D,{...u,...s.getStyles("panel",{className:b,classNames:n,styles:o,style:[d,t?void 0:{display:"none"}],props:a}),ref:c,mod:[{orientation:s.orientation},v],role:"tabpanel",id:s.getPanelId(i),"aria-labelledby":s.getTabId(i)},y)});k.classes=f;k.displayName="@mantine/core/TabsPanel";const oe={},M=P((l,c)=>{const a=N("TabsTab",oe,l),{className:r,children:b,rightSection:i,leftSection:n,value:o,onClick:d,onKeyDown:v,disabled:u,color:s,style:t,classNames:y,styles:w,vars:C,mod:h,...E}=a,x=F(),{dir:I}=Y(),e=K(),T=o===e.value,R=_=>{e.onChange(e.allowTabDeactivation&&o===e.value?null:o),d==null||d(_)},p={classNames:y,styles:w,props:a};return m.createElement(H,{...E,...e.getStyles("tab",{className:r,style:t,variant:e.variant,...p}),disabled:u,unstyled:e.unstyled,variant:e.variant,mod:[{active:T,disabled:u,orientation:e.orientation,inverted:e.inverted,placement:e.orientation==="vertical"&&e.placement},h],ref:c,role:"tab",id:e.getTabId(o),"aria-selected":T,tabIndex:T||e.value===null?0:-1,"aria-controls":e.getPanelId(o),onClick:R,__vars:{"--tabs-color":s?z(s,x):void 0},onKeyDown:Z({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:e.activateTabWithKeyboard,loop:e.loop,orientation:e.orientation||"horizontal",dir:I,onKeyDown:v})},n&&m.createElement("span",{...e.getStyles("tabSection",p),"data-position":"left"},n),b&&m.createElement("span",{...e.getStyles("tabLabel",p)},b),i&&m.createElement("span",{...e.getStyles("tabSection",p),"data-position":"right"},i))});M.classes=f;M.displayName="@mantine/core/TabsTab";const V="Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",ne={keepMounted:!0,orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,allowTabDeactivation:!1,unstyled:!1,inverted:!1,variant:"default",placement:"left"},le=J((l,{radius:c,color:a,autoContrast:r})=>({root:{"--tabs-radius":Q(c),"--tabs-color":z(a,l),"--tabs-text-color":r?X({color:a,theme:l}):void 0}})),g=P((l,c)=>{const a=N("Tabs",ne,l),{defaultValue:r,value:b,onChange:i,orientation:n,children:o,loop:d,id:v,activateTabWithKeyboard:u,allowTabDeactivation:s,variant:t,color:y,radius:w,inverted:C,placement:h,keepMounted:E,classNames:x,styles:I,unstyled:e,className:T,style:R,vars:p,autoContrast:_,mod:W,...j}=a,S=q(v),[A,B]=ee({value:b,defaultValue:r,finalValue:null,onChange:i}),$=G({name:"Tabs",props:a,classes:f,className:T,style:R,classNames:x,styles:I,unstyled:e,vars:p,varsResolver:le});return m.createElement(te,{value:{placement:h,value:A,orientation:n,id:S,loop:d,activateTabWithKeyboard:u,getTabId:U(`${S}-tab`,V),getPanelId:U(`${S}-panel`,V),onChange:B,allowTabDeactivation:s,variant:t,color:y,radius:w,inverted:C,keepMounted:E,unstyled:e,getStyles:$}},m.createElement(D,{ref:c,id:S,variant:t,mod:[{orientation:n,inverted:n==="horizontal"&&C,placement:n==="vertical"&&h},W],...$("root"),...j},o))});g.classes=f;g.displayName="@mantine/core/Tabs";g.Tab=M;g.Panel=k;g.List=L;export{g as T};
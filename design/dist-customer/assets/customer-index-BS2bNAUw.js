import{r as Hg,g as qg,a as T,R as Wg,b as os,j as f,c as Gg,L as Kg,T as Qg,C as Yg}from"./radix-Ci21W1ou.js";import{c as Jg}from"./recharts-CmP0Wkz3.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var uo={},Nu;function Xg(){if(Nu)return uo;Nu=1;var n=Hg();return uo.createRoot=n.createRoot,uo.hydrateRoot=n.hydrateRoot,uo}var Zg=Xg();const ey=qg(Zg);/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Xd=n=>{throw TypeError(n)},ty=(n,e,t)=>e.has(n)||Xd("Cannot "+t),Ha=(n,e,t)=>(ty(n,e,"read from private field"),t?t.call(n):e.get(n)),ny=(n,e,t)=>e.has(n)?Xd("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),Du="popstate";function ry(n={}){function e(r,s){let{pathname:i,search:o,hash:l}=r.location;return wi("",{pathname:i,search:o,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function t(r,s){return typeof s=="string"?s:xn(s)}return iy(e,t,null,n)}function _e(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function Ye(n,e){if(!n){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function sy(){return Math.random().toString(36).substring(2,10)}function Vu(n,e){return{usr:n.state,key:n.key,idx:e}}function wi(n,e,t=null,r){return{pathname:typeof n=="string"?n:n.pathname,search:"",hash:"",...typeof e=="string"?Er(e):e,state:t,key:e&&e.key||r||sy()}}function xn({pathname:n="/",search:e="",hash:t=""}){return e&&e!=="?"&&(n+=e.charAt(0)==="?"?e:"?"+e),t&&t!=="#"&&(n+=t.charAt(0)==="#"?t:"#"+t),n}function Er(n){let e={};if(n){let t=n.indexOf("#");t>=0&&(e.hash=n.substring(t),n=n.substring(0,t));let r=n.indexOf("?");r>=0&&(e.search=n.substring(r),n=n.substring(0,r)),n&&(e.pathname=n)}return e}function iy(n,e,t,r={}){let{window:s=document.defaultView,v5Compat:i=!1}=r,o=s.history,l="POP",c=null,u=d();u==null&&(u=0,o.replaceState({...o.state,idx:u},""));function d(){return(o.state||{idx:null}).idx}function p(){l="POP";let C=d(),O=C==null?null:C-u;u=C,c&&c({action:l,location:P.location,delta:O})}function _(C,O){l="PUSH";let D=wi(P.location,C,O);u=d()+1;let $=Vu(D,u),M=P.createHref(D);try{o.pushState($,"",M)}catch(q){if(q instanceof DOMException&&q.name==="DataCloneError")throw q;s.location.assign(M)}i&&c&&c({action:l,location:P.location,delta:1})}function b(C,O){l="REPLACE";let D=wi(P.location,C,O);u=d();let $=Vu(D,u),M=P.createHref(D);o.replaceState($,"",M),i&&c&&c({action:l,location:P.location,delta:0})}function A(C){return Zd(C)}let P={get action(){return l},get location(){return n(s,o)},listen(C){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Du,p),c=C,()=>{s.removeEventListener(Du,p),c=null}},createHref(C){return e(s,C)},createURL:A,encodeLocation(C){let O=A(C);return{pathname:O.pathname,search:O.search,hash:O.hash}},push:_,replace:b,go(C){return o.go(C)}};return P}function Zd(n,e=!1){let t="http://localhost";typeof window<"u"&&(t=window.location.origin!=="null"?window.location.origin:window.location.href),_e(t,"No window.location.(origin|href) available to create URL");let r=typeof n=="string"?n:xn(n);return r=r.replace(/ $/,"%20"),!e&&r.startsWith("//")&&(r=t+r),new URL(r,t)}var ei,Ou=class{constructor(n){if(ny(this,ei,new Map),n)for(let[e,t]of n)this.set(e,t)}get(n){if(Ha(this,ei).has(n))return Ha(this,ei).get(n);if(n.defaultValue!==void 0)return n.defaultValue;throw new Error("No value found for context")}set(n,e){Ha(this,ei).set(n,e)}};ei=new WeakMap;var oy=new Set(["lazy","caseSensitive","path","id","index","children"]);function ay(n){return oy.has(n)}var ly=new Set(["lazy","caseSensitive","path","id","index","middleware","children"]);function cy(n){return ly.has(n)}function uy(n){return n.index===!0}function bi(n,e,t=[],r={},s=!1){return n.map((i,o)=>{let l=[...t,String(o)],c=typeof i.id=="string"?i.id:l.join("-");if(_e(i.index!==!0||!i.children,"Cannot specify children on an index route"),_e(s||!r[c],`Found a route id collision on id "${c}".  Route id's must be globally unique within Data Router usages`),uy(i)){let u={...i,id:c};return r[c]=Lu(u,e(u)),u}else{let u={...i,id:c,children:void 0};return r[c]=Lu(u,e(u)),i.children&&(u.children=bi(i.children,e,l,r,s)),u}})}function Lu(n,e){return Object.assign(n,{...e,...typeof e.lazy=="object"&&e.lazy!=null?{lazy:{...n.lazy,...e.lazy}}:{}})}function tr(n,e,t="/"){return ti(n,e,t,!1)}function ti(n,e,t,r){let s=typeof e=="string"?Er(e):e,i=Jt(s.pathname||"/",t);if(i==null)return null;let o=ef(n);dy(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let u=Ty(i);l=by(o[c],u,r)}return l}function hy(n,e){let{route:t,pathname:r,params:s}=n;return{id:t.id,pathname:r,params:s,data:e[t.id],loaderData:e[t.id],handle:t.handle}}function ef(n,e=[],t=[],r="",s=!1){let i=(o,l,c=s,u)=>{let d={relativePath:u===void 0?o.path||"":u,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(r)&&c)return;_e(d.relativePath.startsWith(r),`Absolute route path "${d.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(r.length)}let p=_n([r,d.relativePath]),_=t.concat(d);o.children&&o.children.length>0&&(_e(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),ef(o.children,e,_,p,c)),!(o.path==null&&!o.index)&&e.push({path:p,score:vy(p,o.index),routesMeta:_})};return n.forEach((o,l)=>{var c;if(o.path===""||!((c=o.path)!=null&&c.includes("?")))i(o,l);else for(let u of tf(o.path))i(o,l,!0,u)}),e}function tf(n){let e=n.split("/");if(e.length===0)return[];let[t,...r]=e,s=t.endsWith("?"),i=t.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let o=tf(r.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...o),l.map(c=>n.startsWith("/")&&c===""?"/":c)}function dy(n){n.sort((e,t)=>e.score!==t.score?t.score-e.score:wy(e.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}var fy=/^:[\w-]+$/,my=3,py=2,gy=1,yy=10,_y=-2,Mu=n=>n==="*";function vy(n,e){let t=n.split("/"),r=t.length;return t.some(Mu)&&(r+=_y),e&&(r+=py),t.filter(s=>!Mu(s)).reduce((s,i)=>s+(fy.test(i)?my:i===""?gy:yy),r)}function wy(n,e){return n.length===e.length&&n.slice(0,-1).every((r,s)=>r===e[s])?n[n.length-1]-e[e.length-1]:0}function by(n,e,t=!1){let{routesMeta:r}=n,s={},i="/",o=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,d=i==="/"?e:e.slice(i.length)||"/",p=Fo({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},d),_=c.route;if(!p&&u&&t&&!r[r.length-1].route.index&&(p=Fo({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},d)),!p)return null;Object.assign(s,p.params),o.push({params:s,pathname:_n([i,p.pathname]),pathnameBase:Ry(_n([i,p.pathnameBase])),route:_}),p.pathnameBase!=="/"&&(i=_n([i,p.pathnameBase]))}return o}function Fo(n,e){typeof n=="string"&&(n={path:n,caseSensitive:!1,end:!0});let[t,r]=Ey(n.path,n.caseSensitive,n.end),s=e.match(t);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((u,{paramName:d,isOptional:p},_)=>{if(d==="*"){let A=l[_]||"";o=i.slice(0,i.length-A.length).replace(/(.)\/+$/,"$1")}const b=l[_];return p&&!b?u[d]=void 0:u[d]=(b||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:o,pattern:n}}function Ey(n,e=!1,t=!0){Ye(n==="*"||!n.endsWith("*")||n.endsWith("/*"),`Route path "${n}" will be treated as if it were "${n.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/,"/*")}".`);let r=[],s="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return n.endsWith("*")?(r.push({paramName:"*"}),s+=n==="*"||n==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?s+="\\/*$":n!==""&&n!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),r]}function Ty(n){try{return n.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Ye(!1,`The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),n}}function Jt(n,e){if(e==="/")return n;if(!n.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,r=n.charAt(t);return r&&r!=="/"?null:n.slice(t)||"/"}function xy({basename:n,pathname:e}){return e==="/"?n:_n([n,e])}var nf=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Yl=n=>nf.test(n);function Iy(n,e="/"){let{pathname:t,search:r="",hash:s=""}=typeof n=="string"?Er(n):n,i;return t?(t=t.replace(/\/\/+/g,"/"),t.startsWith("/")?i=ju(t.substring(1),"/"):i=ju(t,e)):i=e,{pathname:i,search:Ay(r),hash:Sy(s)}}function ju(n,e){let t=e.replace(/\/+$/,"").split("/");return n.split("/").forEach(s=>{s===".."?t.length>1&&t.pop():s!=="."&&t.push(s)}),t.length>1?t.join("/"):"/"}function qa(n,e,t,r){return`Cannot include a '${n}' character in a manually specified \`to.${e}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${t}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function rf(n){return n.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Jl(n){let e=rf(n);return e.map((t,r)=>r===e.length-1?t.pathname:t.pathnameBase)}function Xl(n,e,t,r=!1){let s;typeof n=="string"?s=Er(n):(s={...n},_e(!s.pathname||!s.pathname.includes("?"),qa("?","pathname","search",s)),_e(!s.pathname||!s.pathname.includes("#"),qa("#","pathname","hash",s)),_e(!s.search||!s.search.includes("#"),qa("#","search","hash",s)));let i=n===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=t;else{let p=e.length-1;if(!r&&o.startsWith("..")){let _=o.split("/");for(;_[0]==="..";)_.shift(),p-=1;s.pathname=_.join("/")}l=p>=0?e[p]:"/"}let c=Iy(s,l),u=o&&o!=="/"&&o.endsWith("/"),d=(i||o===".")&&t.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}var _n=n=>n.join("/").replace(/\/\/+/g,"/"),Ry=n=>n.replace(/\/+$/,"").replace(/^\/*/,"/"),Ay=n=>!n||n==="?"?"":n.startsWith("?")?n:"?"+n,Sy=n=>!n||n==="#"?"":n.startsWith("#")?n:"#"+n,Di=class{constructor(n,e,t,r=!1){this.status=n,this.statusText=e||"",this.internal=r,t instanceof Error?(this.data=t.toString(),this.error=t):this.data=t}};function Ei(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.internal=="boolean"&&"data"in n}function Vi(n){return n.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var sf=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function of(n,e){let t=n;if(typeof t!="string"||!nf.test(t))return{absoluteURL:void 0,isExternal:!1,to:t};let r=t,s=!1;if(sf)try{let i=new URL(window.location.href),o=t.startsWith("//")?new URL(i.protocol+t):new URL(t),l=Jt(o.pathname,e);o.origin===i.origin&&l!=null?t=l+o.search+o.hash:s=!0}catch{Ye(!1,`<Link to="${t}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:s,to:t}}var ar=Symbol("Uninstrumented");function Cy(n,e){let t={lazy:[],"lazy.loader":[],"lazy.action":[],"lazy.middleware":[],middleware:[],loader:[],action:[]};n.forEach(s=>s({id:e.id,index:e.index,path:e.path,instrument(i){let o=Object.keys(t);for(let l of o)i[l]&&t[l].push(i[l])}}));let r={};if(typeof e.lazy=="function"&&t.lazy.length>0){let s=ds(t.lazy,e.lazy,()=>{});s&&(r.lazy=s)}if(typeof e.lazy=="object"){let s=e.lazy;["middleware","loader","action"].forEach(i=>{let o=s[i],l=t[`lazy.${i}`];if(typeof o=="function"&&l.length>0){let c=ds(l,o,()=>{});c&&(r.lazy=Object.assign(r.lazy||{},{[i]:c}))}})}return["loader","action"].forEach(s=>{let i=e[s];if(typeof i=="function"&&t[s].length>0){let o=i[ar]??i,l=ds(t[s],o,(...c)=>Fu(c[0]));l&&(s==="loader"&&o.hydrate===!0&&(l.hydrate=!0),l[ar]=o,r[s]=l)}}),e.middleware&&e.middleware.length>0&&t.middleware.length>0&&(r.middleware=e.middleware.map(s=>{let i=s[ar]??s,o=ds(t.middleware,i,(...l)=>Fu(l[0]));return o?(o[ar]=i,o):s})),r}function Py(n,e){let t={navigate:[],fetch:[]};if(e.forEach(r=>r({instrument(s){let i=Object.keys(s);for(let o of i)s[o]&&t[o].push(s[o])}})),t.navigate.length>0){let r=n.navigate[ar]??n.navigate,s=ds(t.navigate,r,(...i)=>{let[o,l]=i;return{to:typeof o=="number"||typeof o=="string"?o:o?xn(o):".",...Uu(n,l??{})}});s&&(s[ar]=r,n.navigate=s)}if(t.fetch.length>0){let r=n.fetch[ar]??n.fetch,s=ds(t.fetch,r,(...i)=>{let[o,,l,c]=i;return{href:l??".",fetcherKey:o,...Uu(n,c??{})}});s&&(s[ar]=r,n.fetch=s)}return n}function ds(n,e,t){return n.length===0?null:async(...r)=>{let s=await af(n,t(...r),()=>e(...r),n.length-1);if(s.type==="error")throw s.value;return s.value}}async function af(n,e,t,r){let s=n[r],i;if(s){let o,l=async()=>(o?console.error("You cannot call instrumented handlers more than once"):o=af(n,e,t,r-1),i=await o,_e(i,"Expected a result"),i.type==="error"&&i.value instanceof Error?{status:"error",error:i.value}:{status:"success",error:void 0});try{await s(l,e)}catch(c){console.error("An instrumentation function threw an error:",c)}o||await l(),await o}else try{i={type:"success",value:await t()}}catch(o){i={type:"error",value:o}}return i||{type:"error",value:new Error("No result assigned in instrumentation chain.")}}function Fu(n){let{request:e,context:t,params:r,unstable_pattern:s}=n;return{request:ky(e),params:{...r},unstable_pattern:s,context:Ny(t)}}function Uu(n,e){return{currentUrl:xn(n.state.location),..."formMethod"in e?{formMethod:e.formMethod}:{},..."formEncType"in e?{formEncType:e.formEncType}:{},..."formData"in e?{formData:e.formData}:{},..."body"in e?{body:e.body}:{}}}function ky(n){return{method:n.method,url:n.url,headers:{get:(...e)=>n.headers.get(...e)}}}function Ny(n){if(Vy(n)){let e={...n};return Object.freeze(e),e}else return{get:e=>n.get(e)}}var Dy=Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Vy(n){if(n===null||typeof n!="object")return!1;const e=Object.getPrototypeOf(n);return e===Object.prototype||e===null||Object.getOwnPropertyNames(e).sort().join("\0")===Dy}var lf=["POST","PUT","PATCH","DELETE"],Oy=new Set(lf),Ly=["GET",...lf],My=new Set(Ly),cf=new Set([301,302,303,307,308]),jy=new Set([307,308]),Wa={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},Fy={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},Ks={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},Uy=n=>({hasErrorBoundary:!!n.hasErrorBoundary}),uf="remix-router-transitions",hf=Symbol("ResetLoaderData");function $y(n){const e=n.window?n.window:typeof window<"u"?window:void 0,t=typeof e<"u"&&typeof e.document<"u"&&typeof e.document.createElement<"u";_e(n.routes.length>0,"You must provide a non-empty routes array to createRouter");let r=n.hydrationRouteProperties||[],s=n.mapRouteProperties||Uy,i=s;if(n.unstable_instrumentations){let x=n.unstable_instrumentations;i=k=>({...s(k),...Cy(x.map(V=>V.route).filter(Boolean),k)})}let o={},l=bi(n.routes,i,void 0,o),c,u=n.basename||"/";u.startsWith("/")||(u=`/${u}`);let d=n.dataStrategy||Wy,p={...n.future},_=null,b=new Set,A=null,P=null,C=null,O=n.hydrationData!=null,D=tr(l,n.history.location,u),$=!1,M=null,q;if(D==null&&!n.patchRoutesOnNavigation){let x=Kt(404,{pathname:n.history.location.pathname}),{matches:k,route:V}=ho(l);q=!0,D=k,M={[V.id]:x}}else if(D&&!n.hydrationData&&Zr(D,l,n.history.location.pathname).active&&(D=null),D)if(D.some(x=>x.route.lazy))q=!1;else if(!D.some(x=>Zl(x.route)))q=!0;else{let x=n.hydrationData?n.hydrationData.loaderData:null,k=n.hydrationData?n.hydrationData.errors:null;if(k){let V=D.findIndex(U=>k[U.route.id]!==void 0);q=D.slice(0,V+1).every(U=>!ml(U.route,x,k))}else q=D.every(V=>!ml(V.route,x,k))}else{q=!1,D=[];let x=Zr(null,l,n.history.location.pathname);x.active&&x.matches&&($=!0,D=x.matches)}let G,g={historyAction:n.history.action,location:n.history.location,matches:D,initialized:q,navigation:Wa,restoreScrollPosition:n.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:n.hydrationData&&n.hydrationData.loaderData||{},actionData:n.hydrationData&&n.hydrationData.actionData||null,errors:n.hydrationData&&n.hydrationData.errors||M,fetchers:new Map,blockers:new Map},y="POP",w=null,R=!1,I,S=!1,E=new Map,ee=null,ge=!1,he=!1,Ce=new Set,z=new Map,De=0,Oe=-1,Ve=new Map,Fe=new Set,ve=new Map,we=new Map,Pe=new Set,Je=new Map,Ne,_t=null;function en(){if(_=n.history.listen(({action:x,location:k,delta:V})=>{if(Ne){Ne(),Ne=void 0;return}Ye(Je.size===0||V!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let U=Us({currentLocation:g.location,nextLocation:k,historyAction:x});if(U&&V!=null){let B=new Promise(J=>{Ne=J});n.history.go(V*-1),mn(U,{state:"blocked",location:k,proceed(){mn(U,{state:"proceeding",proceed:void 0,reset:void 0,location:k}),B.then(()=>n.history.go(V))},reset(){let J=new Map(g.blockers);J.set(U,Ks),Le({blockers:J})}}),w==null||w.resolve(),w=null;return}return Ue(x,k)}),t){u_(e,E);let x=()=>h_(e,E);e.addEventListener("pagehide",x),ee=()=>e.removeEventListener("pagehide",x)}return g.initialized||Ue("POP",g.location,{initialHydration:!0}),G}function tn(){_&&_(),ee&&ee(),b.clear(),I&&I.abort(),g.fetchers.forEach((x,k)=>Wn(k)),g.blockers.forEach((x,k)=>Fs(k))}function kn(x){return b.add(x),()=>b.delete(x)}function Le(x,k={}){x.matches&&(x.matches=x.matches.map(B=>{let J=o[B.route.id],re=B.route;return re.element!==J.element||re.errorElement!==J.errorElement||re.hydrateFallbackElement!==J.hydrateFallbackElement?{...B,route:J}:B})),g={...g,...x};let V=[],U=[];g.fetchers.forEach((B,J)=>{B.state==="idle"&&(Pe.has(J)?V.push(J):U.push(J))}),Pe.forEach(B=>{!g.fetchers.has(B)&&!z.has(B)&&V.push(B)}),[...b].forEach(B=>B(g,{deletedFetchers:V,newErrors:x.errors??null,viewTransitionOpts:k.viewTransitionOpts,flushSync:k.flushSync===!0})),V.forEach(B=>Wn(B)),U.forEach(B=>g.fetchers.delete(B))}function qt(x,k,{flushSync:V}={}){var ue,ne;let U=g.actionData!=null&&g.navigation.formMethod!=null&&Rt(g.navigation.formMethod)&&g.navigation.state==="loading"&&((ue=x.state)==null?void 0:ue._isRedirect)!==!0,B;k.actionData?Object.keys(k.actionData).length>0?B=k.actionData:B=null:U?B=g.actionData:B=null;let J=k.loaderData?Yu(g.loaderData,k.loaderData,k.matches||[],k.errors):g.loaderData,re=g.blockers;re.size>0&&(re=new Map(re),re.forEach((de,be)=>re.set(be,Ks)));let K=ge?!1:eo(x,k.matches||g.matches),Y=R===!0||g.navigation.formMethod!=null&&Rt(g.navigation.formMethod)&&((ne=x.state)==null?void 0:ne._isRedirect)!==!0;c&&(l=c,c=void 0),ge||y==="POP"||(y==="PUSH"?n.history.push(x,x.state):y==="REPLACE"&&n.history.replace(x,x.state));let te;if(y==="POP"){let de=E.get(g.location.pathname);de&&de.has(x.pathname)?te={currentLocation:g.location,nextLocation:x}:E.has(x.pathname)&&(te={currentLocation:x,nextLocation:g.location})}else if(S){let de=E.get(g.location.pathname);de?de.add(x.pathname):(de=new Set([x.pathname]),E.set(g.location.pathname,de)),te={currentLocation:g.location,nextLocation:x}}Le({...k,actionData:B,loaderData:J,historyAction:y,location:x,initialized:!0,navigation:Wa,revalidation:"idle",restoreScrollPosition:K,preventScrollReset:Y,blockers:re},{viewTransitionOpts:te,flushSync:V===!0}),y="POP",R=!1,S=!1,ge=!1,he=!1,w==null||w.resolve(),w=null,_t==null||_t.resolve(),_t=null}async function oe(x,k){if(w==null||w.resolve(),w=null,typeof x=="number"){w||(w=eh());let be=w.promise;return n.history.go(x),be}let V=fl(g.location,g.matches,u,x,k==null?void 0:k.fromRouteId,k==null?void 0:k.relative),{path:U,submission:B,error:J}=$u(!1,V,k),re=g.location,K=wi(g.location,U,k&&k.state);K={...K,...n.history.encodeLocation(K)};let Y=k&&k.replace!=null?k.replace:void 0,te="PUSH";Y===!0?te="REPLACE":Y===!1||B!=null&&Rt(B.formMethod)&&B.formAction===g.location.pathname+g.location.search&&(te="REPLACE");let ue=k&&"preventScrollReset"in k?k.preventScrollReset===!0:void 0,ne=(k&&k.flushSync)===!0,de=Us({currentLocation:re,nextLocation:K,historyAction:te});if(de){mn(de,{state:"blocked",location:K,proceed(){mn(de,{state:"proceeding",proceed:void 0,reset:void 0,location:K}),oe(x,k)},reset(){let be=new Map(g.blockers);be.set(de,Ks),Le({blockers:be})}});return}await Ue(te,K,{submission:B,pendingError:J,preventScrollReset:ue,replace:k&&k.replace,enableViewTransition:k&&k.viewTransition,flushSync:ne,callSiteDefaultShouldRevalidate:k&&k.unstable_defaultShouldRevalidate})}function fe(){_t||(_t=eh()),Lt(),Le({revalidation:"loading"});let x=_t.promise;return g.navigation.state==="submitting"?x:g.navigation.state==="idle"?(Ue(g.historyAction,g.location,{startUninterruptedRevalidation:!0}),x):(Ue(y||g.historyAction,g.navigation.location,{overrideNavigation:g.navigation,enableViewTransition:S===!0}),x)}async function Ue(x,k,V){I&&I.abort(),I=null,y=x,ge=(V&&V.startUninterruptedRevalidation)===!0,Rr(g.location,g.matches),R=(V&&V.preventScrollReset)===!0,S=(V&&V.enableViewTransition)===!0;let U=c||l,B=V&&V.overrideNavigation,J=V!=null&&V.initialHydration&&g.matches&&g.matches.length>0&&!$?g.matches:tr(U,k,u),re=(V&&V.flushSync)===!0;if(J&&g.initialized&&!he&&e_(g.location,k)&&!(V&&V.submission&&Rt(V.submission.formMethod))){qt(k,{matches:J},{flushSync:re});return}let K=Zr(J,U,k.pathname);if(K.active&&K.matches&&(J=K.matches),!J){let{error:Ke,notFoundMatches:at,route:Re}=ot(k.pathname);qt(k,{matches:at,loaderData:{},errors:{[Re.id]:Ke}},{flushSync:re});return}I=new AbortController;let Y=as(n.history,k,I.signal,V&&V.submission),te=n.getContext?await n.getContext():new Ou,ue;if(V&&V.pendingError)ue=[nr(J).route.id,{type:"error",error:V.pendingError}];else if(V&&V.submission&&Rt(V.submission.formMethod)){let Ke=await dt(Y,k,V.submission,J,te,K.active,V&&V.initialHydration===!0,{replace:V.replace,flushSync:re});if(Ke.shortCircuited)return;if(Ke.pendingActionResult){let[at,Re]=Ke.pendingActionResult;if($t(Re)&&Ei(Re.error)&&Re.error.status===404){I=null,qt(k,{matches:Ke.matches,loaderData:{},errors:{[at]:Re.error}});return}}J=Ke.matches||J,ue=Ke.pendingActionResult,B=Ga(k,V.submission),re=!1,K.active=!1,Y=as(n.history,Y.url,Y.signal)}let{shortCircuited:ne,matches:de,loaderData:be,errors:We}=await vt(Y,k,J,te,K.active,B,V&&V.submission,V&&V.fetcherSubmission,V&&V.replace,V&&V.initialHydration===!0,re,ue,V&&V.callSiteDefaultShouldRevalidate);ne||(I=null,qt(k,{matches:de||J,...Ju(ue),loaderData:be,errors:We}))}async function dt(x,k,V,U,B,J,re,K={}){Lt();let Y=l_(k,V);if(Le({navigation:Y},{flushSync:K.flushSync===!0}),J){let ne=await rn(U,k.pathname,x.signal);if(ne.type==="aborted")return{shortCircuited:!0};if(ne.type==="error"){if(ne.partialMatches.length===0){let{matches:be,route:We}=ho(l);return{matches:be,pendingActionResult:[We.id,{type:"error",error:ne.error}]}}let de=nr(ne.partialMatches).route.id;return{matches:ne.partialMatches,pendingActionResult:[de,{type:"error",error:ne.error}]}}else if(ne.matches)U=ne.matches;else{let{notFoundMatches:de,error:be,route:We}=ot(k.pathname);return{matches:de,pendingActionResult:[We.id,{type:"error",error:be}]}}}let te,ue=Io(U,k);if(!ue.route.action&&!ue.route.lazy)te={type:"error",error:Kt(405,{method:x.method,pathname:k.pathname,routeId:ue.route.id})};else{let ne=ps(i,o,x,U,ue,re?[]:r,B),de=await Xe(x,ne,B,null);if(te=de[ue.route.id],!te){for(let be of U)if(de[be.route.id]){te=de[be.route.id];break}}if(x.signal.aborted)return{shortCircuited:!0}}if(Or(te)){let ne;return K&&K.replace!=null?ne=K.replace:ne=Gu(te.response.headers.get("Location"),new URL(x.url),u,n.history)===g.location.pathname+g.location.search,await it(x,te,!0,{submission:V,replace:ne}),{shortCircuited:!0}}if($t(te)){let ne=nr(U,ue.route.id);return(K&&K.replace)!==!0&&(y="PUSH"),{matches:U,pendingActionResult:[ne.route.id,te,ue.route.id]}}return{matches:U,pendingActionResult:[ue.route.id,te]}}async function vt(x,k,V,U,B,J,re,K,Y,te,ue,ne,de){let be=J||Ga(k,re),We=re||K||Zu(be),Ke=!ge&&!te;if(B){if(Ke){let ft=me(ne);Le({navigation:be,...ft!==void 0?{actionData:ft}:{}},{flushSync:ue})}let Ee=await rn(V,k.pathname,x.signal);if(Ee.type==="aborted")return{shortCircuited:!0};if(Ee.type==="error"){if(Ee.partialMatches.length===0){let{matches:kt,route:mt}=ho(l);return{matches:kt,loaderData:{},errors:{[mt.id]:Ee.error}}}let ft=nr(Ee.partialMatches).route.id;return{matches:Ee.partialMatches,loaderData:{},errors:{[ft]:Ee.error}}}else if(Ee.matches)V=Ee.matches;else{let{error:ft,notFoundMatches:kt,route:mt}=ot(k.pathname);return{matches:kt,loaderData:{},errors:{[mt.id]:ft}}}}let at=c||l,{dsMatches:Re,revalidatingFetchers:Ze}=Bu(x,U,i,o,n.history,g,V,We,k,te?[]:r,te===!0,he,Ce,Pe,ve,Fe,at,u,n.patchRoutesOnNavigation!=null,ne,de);if(Oe=++De,!n.dataStrategy&&!Re.some(Ee=>Ee.shouldLoad)&&!Re.some(Ee=>Ee.route.middleware&&Ee.route.middleware.length>0)&&Ze.length===0){let Ee=fn();return qt(k,{matches:V,loaderData:{},errors:ne&&$t(ne[1])?{[ne[0]]:ne[1].error}:null,...Ju(ne),...Ee?{fetchers:new Map(g.fetchers)}:{}},{flushSync:ue}),{shortCircuited:!0}}if(Ke){let Ee={};if(!B){Ee.navigation=be;let ft=me(ne);ft!==void 0&&(Ee.actionData=ft)}Ze.length>0&&(Ee.fetchers=ke(Ze)),Le(Ee,{flushSync:ue})}Ze.forEach(Ee=>{wt(Ee.key),Ee.controller&&z.set(Ee.key,Ee.controller)});let sn=()=>Ze.forEach(Ee=>wt(Ee.key));I&&I.signal.addEventListener("abort",sn);let{loaderResults:Ar,fetcherResults:on}=await Ot(Re,Ze,x,U);if(x.signal.aborted)return{shortCircuited:!0};I&&I.signal.removeEventListener("abort",sn),Ze.forEach(Ee=>z.delete(Ee.key));let Ft=fo(Ar);if(Ft)return await it(x,Ft.result,!0,{replace:Y}),{shortCircuited:!0};if(Ft=fo(on),Ft)return Fe.add(Ft.key),await it(x,Ft.result,!0,{replace:Y}),{shortCircuited:!0};let{loaderData:ts,errors:Nn}=Qu(g,V,Ar,ne,Ze,on);te&&g.errors&&(Nn={...g.errors,...Nn});let an=fn(),Sr=js(Oe),Cr=an||Sr||Ze.length>0;return{matches:V,loaderData:ts,errors:Nn,...Cr?{fetchers:new Map(g.fetchers)}:{}}}function me(x){if(x&&!$t(x[1]))return{[x[0]]:x[1].data};if(g.actionData)return Object.keys(g.actionData).length===0?null:g.actionData}function ke(x){return x.forEach(k=>{let V=g.fetchers.get(k.key),U=Qs(void 0,V?V.data:void 0);g.fetchers.set(k.key,U)}),new Map(g.fetchers)}async function nn(x,k,V,U){wt(x);let B=(U&&U.flushSync)===!0,J=c||l,re=fl(g.location,g.matches,u,V,k,U==null?void 0:U.relative),K=tr(J,re,u),Y=Zr(K,J,re);if(Y.active&&Y.matches&&(K=Y.matches),!K){Mt(x,k,Kt(404,{pathname:re}),{flushSync:B});return}let{path:te,submission:ue,error:ne}=$u(!0,re,U);if(ne){Mt(x,k,ne,{flushSync:B});return}let de=n.getContext?await n.getContext():new Ou,be=(U&&U.preventScrollReset)===!0;if(ue&&Rt(ue.formMethod)){await Ct(x,k,te,K,de,Y.active,B,be,ue,U&&U.unstable_defaultShouldRevalidate);return}ve.set(x,{routeId:k,path:te}),await Wt(x,k,te,K,de,Y.active,B,be,ue)}async function Ct(x,k,V,U,B,J,re,K,Y,te){Lt(),ve.delete(x);let ue=g.fetchers.get(x);xt(x,c_(Y,ue),{flushSync:re});let ne=new AbortController,de=as(n.history,V,ne.signal,Y);if(J){let Me=await rn(U,new URL(de.url).pathname,de.signal,x);if(Me.type==="aborted")return;if(Me.type==="error"){Mt(x,k,Me.error,{flushSync:re});return}else if(Me.matches)U=Me.matches;else{Mt(x,k,Kt(404,{pathname:V}),{flushSync:re});return}}let be=Io(U,V);if(!be.route.action&&!be.route.lazy){let Me=Kt(405,{method:Y.formMethod,pathname:V,routeId:k});Mt(x,k,Me,{flushSync:re});return}z.set(x,ne);let We=De,Ke=ps(i,o,de,U,be,r,B),at=await Xe(de,Ke,B,x),Re=at[be.route.id];if(!Re){for(let Me of Ke)if(at[Me.route.id]){Re=at[Me.route.id];break}}if(de.signal.aborted){z.get(x)===ne&&z.delete(x);return}if(Pe.has(x)){if(Or(Re)||$t(Re)){xt(x,Vn(void 0));return}}else{if(Or(Re))if(z.delete(x),Oe>We){xt(x,Vn(void 0));return}else return Fe.add(x),xt(x,Qs(Y)),it(de,Re,!1,{fetcherSubmission:Y,preventScrollReset:K});if($t(Re)){Mt(x,k,Re.error);return}}let Ze=g.navigation.location||g.location,sn=as(n.history,Ze,ne.signal),Ar=c||l,on=g.navigation.state!=="idle"?tr(Ar,g.navigation.location,u):g.matches;_e(on,"Didn't find any matches after fetcher action");let Ft=++De;Ve.set(x,Ft);let ts=Qs(Y,Re.data);g.fetchers.set(x,ts);let{dsMatches:Nn,revalidatingFetchers:an}=Bu(sn,B,i,o,n.history,g,on,Y,Ze,r,!1,he,Ce,Pe,ve,Fe,Ar,u,n.patchRoutesOnNavigation!=null,[be.route.id,Re],te);an.filter(Me=>Me.key!==x).forEach(Me=>{let pn=Me.key,ns=g.fetchers.get(pn),$e=Qs(void 0,ns?ns.data:void 0);g.fetchers.set(pn,$e),wt(pn),Me.controller&&z.set(pn,Me.controller)}),Le({fetchers:new Map(g.fetchers)});let Sr=()=>an.forEach(Me=>wt(Me.key));ne.signal.addEventListener("abort",Sr);let{loaderResults:Cr,fetcherResults:Ee}=await Ot(Nn,an,sn,B);if(ne.signal.aborted)return;if(ne.signal.removeEventListener("abort",Sr),Ve.delete(x),z.delete(x),an.forEach(Me=>z.delete(Me.key)),g.fetchers.has(x)){let Me=Vn(Re.data);g.fetchers.set(x,Me)}let ft=fo(Cr);if(ft)return it(sn,ft.result,!1,{preventScrollReset:K});if(ft=fo(Ee),ft)return Fe.add(ft.key),it(sn,ft.result,!1,{preventScrollReset:K});let{loaderData:kt,errors:mt}=Qu(g,on,Cr,void 0,an,Ee);js(Ft),g.navigation.state==="loading"&&Ft>Oe?(_e(y,"Expected pending action"),I&&I.abort(),qt(g.navigation.location,{matches:on,loaderData:kt,errors:mt,fetchers:new Map(g.fetchers)})):(Le({errors:mt,loaderData:Yu(g.loaderData,kt,on,mt),fetchers:new Map(g.fetchers)}),he=!1)}async function Wt(x,k,V,U,B,J,re,K,Y){let te=g.fetchers.get(x);xt(x,Qs(Y,te?te.data:void 0),{flushSync:re});let ue=new AbortController,ne=as(n.history,V,ue.signal);if(J){let Re=await rn(U,new URL(ne.url).pathname,ne.signal,x);if(Re.type==="aborted")return;if(Re.type==="error"){Mt(x,k,Re.error,{flushSync:re});return}else if(Re.matches)U=Re.matches;else{Mt(x,k,Kt(404,{pathname:V}),{flushSync:re});return}}let de=Io(U,V);z.set(x,ue);let be=De,We=ps(i,o,ne,U,de,r,B),at=(await Xe(ne,We,B,x))[de.route.id];if(z.get(x)===ue&&z.delete(x),!ne.signal.aborted){if(Pe.has(x)){xt(x,Vn(void 0));return}if(Or(at))if(Oe>be){xt(x,Vn(void 0));return}else{Fe.add(x),await it(ne,at,!1,{preventScrollReset:K});return}if($t(at)){Mt(x,k,at.error);return}xt(x,Vn(at.data))}}async function it(x,k,V,{submission:U,fetcherSubmission:B,preventScrollReset:J,replace:re}={}){V||(w==null||w.resolve(),w=null),k.response.headers.has("X-Remix-Revalidate")&&(he=!0);let K=k.response.headers.get("Location");_e(K,"Expected a Location header on the redirect Response"),K=Gu(K,new URL(x.url),u,n.history);let Y=wi(g.location,K,{_isRedirect:!0});if(t){let We=!1;if(k.response.headers.has("X-Remix-Reload-Document"))We=!0;else if(Yl(K)){const Ke=Zd(K,!0);We=Ke.origin!==e.location.origin||Jt(Ke.pathname,u)==null}if(We){re?e.location.replace(K):e.location.assign(K);return}}I=null;let te=re===!0||k.response.headers.has("X-Remix-Replace")?"REPLACE":"PUSH",{formMethod:ue,formAction:ne,formEncType:de}=g.navigation;!U&&!B&&ue&&ne&&de&&(U=Zu(g.navigation));let be=U||B;if(jy.has(k.response.status)&&be&&Rt(be.formMethod))await Ue(te,Y,{submission:{...be,formAction:K},preventScrollReset:J||R,enableViewTransition:V?S:void 0});else{let We=Ga(Y,U);await Ue(te,Y,{overrideNavigation:We,fetcherSubmission:B,preventScrollReset:J||R,enableViewTransition:V?S:void 0})}}async function Xe(x,k,V,U){var re;let B,J={};try{B=await Ky(d,x,k,U,V,!1)}catch(K){return k.filter(Y=>Y.shouldLoad).forEach(Y=>{J[Y.route.id]={type:"error",error:K}}),J}if(x.signal.aborted)return J;if(!Rt(x.method))for(let K of k){if(((re=B[K.route.id])==null?void 0:re.type)==="error")break;!B.hasOwnProperty(K.route.id)&&!g.loaderData.hasOwnProperty(K.route.id)&&(!g.errors||!g.errors.hasOwnProperty(K.route.id))&&K.shouldCallHandler()&&(B[K.route.id]={type:"error",result:new Error(`No result returned from dataStrategy for route ${K.route.id}`)})}for(let[K,Y]of Object.entries(B))if(s_(Y)){let te=Y.result;J[K]={type:"redirect",response:Xy(te,x,K,k,u)}}else J[K]=await Jy(Y);return J}async function Ot(x,k,V,U){let B=Xe(V,x,U,null),J=Promise.all(k.map(async Y=>{if(Y.matches&&Y.match&&Y.request&&Y.controller){let ue=(await Xe(Y.request,Y.matches,U,Y.key))[Y.match.route.id];return{[Y.key]:ue}}else return Promise.resolve({[Y.key]:{type:"error",error:Kt(404,{pathname:Y.path})}})})),re=await B,K=(await J).reduce((Y,te)=>Object.assign(Y,te),{});return{loaderResults:re,fetcherResults:K}}function Lt(){he=!0,ve.forEach((x,k)=>{z.has(k)&&Ce.add(k),wt(k)})}function xt(x,k,V={}){g.fetchers.set(x,k),Le({fetchers:new Map(g.fetchers)},{flushSync:(V&&V.flushSync)===!0})}function Mt(x,k,V,U={}){let B=nr(g.matches,k);Wn(x),Le({errors:{[B.route.id]:V},fetchers:new Map(g.fetchers)},{flushSync:(U&&U.flushSync)===!0})}function Yr(x){return we.set(x,(we.get(x)||0)+1),Pe.has(x)&&Pe.delete(x),g.fetchers.get(x)||Fy}function Jr(x,k){wt(x,k==null?void 0:k.reason),xt(x,Vn(null))}function Wn(x){let k=g.fetchers.get(x);z.has(x)&&!(k&&k.state==="loading"&&Ve.has(x))&&wt(x),ve.delete(x),Ve.delete(x),Fe.delete(x),Pe.delete(x),Ce.delete(x),g.fetchers.delete(x)}function Pt(x){let k=(we.get(x)||0)-1;k<=0?(we.delete(x),Pe.add(x)):we.set(x,k),Le({fetchers:new Map(g.fetchers)})}function wt(x,k){let V=z.get(x);V&&(V.abort(k),z.delete(x))}function Gn(x){for(let k of x){let V=Yr(k),U=Vn(V.data);g.fetchers.set(k,U)}}function fn(){let x=[],k=!1;for(let V of Fe){let U=g.fetchers.get(V);_e(U,`Expected fetcher: ${V}`),U.state==="loading"&&(Fe.delete(V),x.push(V),k=!0)}return Gn(x),k}function js(x){let k=[];for(let[V,U]of Ve)if(U<x){let B=g.fetchers.get(V);_e(B,`Expected fetcher: ${V}`),B.state==="loading"&&(wt(V),Ve.delete(V),k.push(V))}return Gn(k),k.length>0}function Xr(x,k){let V=g.blockers.get(x)||Ks;return Je.get(x)!==k&&Je.set(x,k),V}function Fs(x){g.blockers.delete(x),Je.delete(x)}function mn(x,k){let V=g.blockers.get(x)||Ks;_e(V.state==="unblocked"&&k.state==="blocked"||V.state==="blocked"&&k.state==="blocked"||V.state==="blocked"&&k.state==="proceeding"||V.state==="blocked"&&k.state==="unblocked"||V.state==="proceeding"&&k.state==="unblocked",`Invalid blocker state transition: ${V.state} -> ${k.state}`);let U=new Map(g.blockers);U.set(x,k),Le({blockers:U})}function Us({currentLocation:x,nextLocation:k,historyAction:V}){if(Je.size===0)return;Je.size>1&&Ye(!1,"A router only supports one blocker at a time");let U=Array.from(Je.entries()),[B,J]=U[U.length-1],re=g.blockers.get(B);if(!(re&&re.state==="proceeding")&&J({currentLocation:x,nextLocation:k,historyAction:V}))return B}function ot(x){let k=Kt(404,{pathname:x}),V=c||l,{matches:U,route:B}=ho(V);return{notFoundMatches:U,route:B,error:k}}function Zi(x,k,V){if(A=x,C=k,P=V||null,!O&&g.navigation===Wa){O=!0;let U=eo(g.location,g.matches);U!=null&&Le({restoreScrollPosition:U})}return()=>{A=null,C=null,P=null}}function Kn(x,k){return P&&P(x,k.map(U=>hy(U,g.loaderData)))||x.key}function Rr(x,k){if(A&&C){let V=Kn(x,k);A[V]=C()}}function eo(x,k){if(A){let V=Kn(x,k),U=A[V];if(typeof U=="number")return U}return null}function Zr(x,k,V){if(n.patchRoutesOnNavigation)if(x){if(Object.keys(x[0].params).length>0)return{active:!0,matches:ti(k,V,u,!0)}}else return{active:!0,matches:ti(k,V,u,!0)||[]};return{active:!1,matches:null}}async function rn(x,k,V,U){if(!n.patchRoutesOnNavigation)return{type:"success",matches:x};let B=x;for(;;){let J=c==null,re=c||l,K=o;try{await n.patchRoutesOnNavigation({signal:V,path:k,matches:B,fetcherKey:U,patch:(ue,ne)=>{V.aborted||zu(ue,ne,re,K,i,!1)}})}catch(ue){return{type:"error",error:ue,partialMatches:B}}finally{J&&!V.aborted&&(l=[...l])}if(V.aborted)return{type:"aborted"};let Y=tr(re,k,u),te=null;if(Y){if(Object.keys(Y[0].params).length===0)return{type:"success",matches:Y};if(te=ti(re,k,u,!0),!(te&&B.length<te.length&&to(B,te.slice(0,B.length))))return{type:"success",matches:Y}}if(te||(te=ti(re,k,u,!0)),!te||to(B,te))return{type:"success",matches:null};B=te}}function to(x,k){return x.length===k.length&&x.every((V,U)=>V.route.id===k[U].route.id)}function Ma(x){o={},c=bi(x,i,void 0,o)}function es(x,k,V=!1){let U=c==null;zu(x,k,c||l,o,i,V),U&&(l=[...l],Le({}))}return G={get basename(){return u},get future(){return p},get state(){return g},get routes(){return l},get window(){return e},initialize:en,subscribe:kn,enableScrollRestoration:Zi,navigate:oe,fetch:nn,revalidate:fe,createHref:x=>n.history.createHref(x),encodeLocation:x=>n.history.encodeLocation(x),getFetcher:Yr,resetFetcher:Jr,deleteFetcher:Pt,dispose:tn,getBlocker:Xr,deleteBlocker:Fs,patchRoutes:es,_internalFetchControllers:z,_internalSetRoutes:Ma,_internalSetStateDoNotUseOrYouWillBreakYourApp(x){Le(x)}},n.unstable_instrumentations&&(G=Py(G,n.unstable_instrumentations.map(x=>x.router).filter(Boolean))),G}function By(n){return n!=null&&("formData"in n&&n.formData!=null||"body"in n&&n.body!==void 0)}function fl(n,e,t,r,s,i){let o,l;if(s){o=[];for(let u of e)if(o.push(u),u.route.id===s){l=u;break}}else o=e,l=e[e.length-1];let c=Xl(r||".",Jl(o),Jt(n.pathname,t)||n.pathname,i==="path");if(r==null&&(c.search=n.search,c.hash=n.hash),(r==null||r===""||r===".")&&l){let u=tc(c.search);if(l.route.index&&!u)c.search=c.search?c.search.replace(/^\?/,"?index&"):"?index";else if(!l.route.index&&u){let d=new URLSearchParams(c.search),p=d.getAll("index");d.delete("index"),p.filter(b=>b).forEach(b=>d.append("index",b));let _=d.toString();c.search=_?`?${_}`:""}}return t!=="/"&&(c.pathname=xy({basename:t,pathname:c.pathname})),xn(c)}function $u(n,e,t){if(!t||!By(t))return{path:e};if(t.formMethod&&!a_(t.formMethod))return{path:e,error:Kt(405,{method:t.formMethod})};let r=()=>({path:e,error:Kt(400,{type:"invalid-body"})}),i=(t.formMethod||"get").toUpperCase(),o=yf(e);if(t.body!==void 0){if(t.formEncType==="text/plain"){if(!Rt(i))return r();let p=typeof t.body=="string"?t.body:t.body instanceof FormData||t.body instanceof URLSearchParams?Array.from(t.body.entries()).reduce((_,[b,A])=>`${_}${b}=${A}
`,""):String(t.body);return{path:e,submission:{formMethod:i,formAction:o,formEncType:t.formEncType,formData:void 0,json:void 0,text:p}}}else if(t.formEncType==="application/json"){if(!Rt(i))return r();try{let p=typeof t.body=="string"?JSON.parse(t.body):t.body;return{path:e,submission:{formMethod:i,formAction:o,formEncType:t.formEncType,formData:void 0,json:p,text:void 0}}}catch{return r()}}}_e(typeof FormData=="function","FormData is not available in this environment");let l,c;if(t.formData)l=gl(t.formData),c=t.formData;else if(t.body instanceof FormData)l=gl(t.body),c=t.body;else if(t.body instanceof URLSearchParams)l=t.body,c=Ku(l);else if(t.body==null)l=new URLSearchParams,c=new FormData;else try{l=new URLSearchParams(t.body),c=Ku(l)}catch{return r()}let u={formMethod:i,formAction:o,formEncType:t&&t.formEncType||"application/x-www-form-urlencoded",formData:c,json:void 0,text:void 0};if(Rt(u.formMethod))return{path:e,submission:u};let d=Er(e);return n&&d.search&&tc(d.search)&&l.append("index",""),d.search=`?${l}`,{path:xn(d),submission:u}}function Bu(n,e,t,r,s,i,o,l,c,u,d,p,_,b,A,P,C,O,D,$,M){var ge;let q=$?$t($[1])?$[1].error:$[1].data:void 0,G=s.createURL(i.location),g=s.createURL(c),y;if(d&&i.errors){let he=Object.keys(i.errors)[0];y=o.findIndex(Ce=>Ce.route.id===he)}else if($&&$t($[1])){let he=$[0];y=o.findIndex(Ce=>Ce.route.id===he)-1}let w=$?$[1].statusCode:void 0,R=w&&w>=400,I={currentUrl:G,currentParams:((ge=i.matches[0])==null?void 0:ge.params)||{},nextUrl:g,nextParams:o[0].params,...l,actionResult:q,actionStatus:w},S=Vi(o),E=o.map((he,Ce)=>{let{route:z}=he,De=null;if(y!=null&&Ce>y?De=!1:z.lazy?De=!0:Zl(z)?d?De=ml(z,i.loaderData,i.errors):zy(i.loaderData,i.matches[Ce],he)&&(De=!0):De=!1,De!==null)return pl(t,r,n,S,he,u,e,De);let Oe=!1;typeof M=="boolean"?Oe=M:R?Oe=!1:(p||G.pathname+G.search===g.pathname+g.search||G.search!==g.search||Hy(i.matches[Ce],he))&&(Oe=!0);let Ve={...I,defaultShouldRevalidate:Oe},Fe=ci(he,Ve);return pl(t,r,n,S,he,u,e,Fe,Ve,M)}),ee=[];return A.forEach((he,Ce)=>{if(d||!o.some(Pe=>Pe.route.id===he.routeId)||b.has(Ce))return;let z=i.fetchers.get(Ce),De=z&&z.state!=="idle"&&z.data===void 0,Oe=tr(C,he.path,O);if(!Oe){if(D&&De)return;ee.push({key:Ce,routeId:he.routeId,path:he.path,matches:null,match:null,request:null,controller:null});return}if(P.has(Ce))return;let Ve=Io(Oe,he.path),Fe=new AbortController,ve=as(s,he.path,Fe.signal),we=null;if(_.has(Ce))_.delete(Ce),we=ps(t,r,ve,Oe,Ve,u,e);else if(De)p&&(we=ps(t,r,ve,Oe,Ve,u,e));else{let Pe;typeof M=="boolean"?Pe=M:R?Pe=!1:Pe=p;let Je={...I,defaultShouldRevalidate:Pe};ci(Ve,Je)&&(we=ps(t,r,ve,Oe,Ve,u,e,Je))}we&&ee.push({key:Ce,routeId:he.routeId,path:he.path,matches:we,match:Ve,request:ve,controller:Fe})}),{dsMatches:E,revalidatingFetchers:ee}}function Zl(n){return n.loader!=null||n.middleware!=null&&n.middleware.length>0}function ml(n,e,t){if(n.lazy)return!0;if(!Zl(n))return!1;let r=e!=null&&n.id in e,s=t!=null&&t[n.id]!==void 0;return!r&&s?!1:typeof n.loader=="function"&&n.loader.hydrate===!0?!0:!r&&!s}function zy(n,e,t){let r=!e||t.route.id!==e.route.id,s=!n.hasOwnProperty(t.route.id);return r||s}function Hy(n,e){let t=n.route.path;return n.pathname!==e.pathname||t!=null&&t.endsWith("*")&&n.params["*"]!==e.params["*"]}function ci(n,e){if(n.route.shouldRevalidate){let t=n.route.shouldRevalidate(e);if(typeof t=="boolean")return t}return e.defaultShouldRevalidate}function zu(n,e,t,r,s,i){let o;if(n){let u=r[n];_e(u,`No route found to patch children into: routeId = ${n}`),u.children||(u.children=[]),o=u.children}else o=t;let l=[],c=[];if(e.forEach(u=>{let d=o.find(p=>df(u,p));d?c.push({existingRoute:d,newRoute:u}):l.push(u)}),l.length>0){let u=bi(l,s,[n||"_","patch",String((o==null?void 0:o.length)||"0")],r);o.push(...u)}if(i&&c.length>0)for(let u=0;u<c.length;u++){let{existingRoute:d,newRoute:p}=c[u],_=d,[b]=bi([p],s,[],{},!0);Object.assign(_,{element:b.element?b.element:_.element,errorElement:b.errorElement?b.errorElement:_.errorElement,hydrateFallbackElement:b.hydrateFallbackElement?b.hydrateFallbackElement:_.hydrateFallbackElement})}}function df(n,e){return"id"in n&&"id"in e&&n.id===e.id?!0:n.index===e.index&&n.path===e.path&&n.caseSensitive===e.caseSensitive?(!n.children||n.children.length===0)&&(!e.children||e.children.length===0)?!0:n.children.every((t,r)=>{var s;return(s=e.children)==null?void 0:s.some(i=>df(t,i))}):!1}var Hu=new WeakMap,ff=({key:n,route:e,manifest:t,mapRouteProperties:r})=>{let s=t[e.id];if(_e(s,"No route found in manifest"),!s.lazy||typeof s.lazy!="object")return;let i=s.lazy[n];if(!i)return;let o=Hu.get(s);o||(o={},Hu.set(s,o));let l=o[n];if(l)return l;let c=(async()=>{let u=ay(n),p=s[n]!==void 0&&n!=="hasErrorBoundary";if(u)Ye(!u,"Route property "+n+" is not a supported lazy route property. This property will be ignored."),o[n]=Promise.resolve();else if(p)Ye(!1,`Route "${s.id}" has a static property "${n}" defined. The lazy property will be ignored.`);else{let _=await i();_!=null&&(Object.assign(s,{[n]:_}),Object.assign(s,r(s)))}typeof s.lazy=="object"&&(s.lazy[n]=void 0,Object.values(s.lazy).every(_=>_===void 0)&&(s.lazy=void 0))})();return o[n]=c,c},qu=new WeakMap;function qy(n,e,t,r,s){let i=t[n.id];if(_e(i,"No route found in manifest"),!n.lazy)return{lazyRoutePromise:void 0,lazyHandlerPromise:void 0};if(typeof n.lazy=="function"){let d=qu.get(i);if(d)return{lazyRoutePromise:d,lazyHandlerPromise:d};let p=(async()=>{_e(typeof n.lazy=="function","No lazy route function found");let _=await n.lazy(),b={};for(let A in _){let P=_[A];if(P===void 0)continue;let C=cy(A),D=i[A]!==void 0&&A!=="hasErrorBoundary";C?Ye(!C,"Route property "+A+" is not a supported property to be returned from a lazy route function. This property will be ignored."):D?Ye(!D,`Route "${i.id}" has a static property "${A}" defined but its lazy function is also returning a value for this property. The lazy route property "${A}" will be ignored.`):b[A]=P}Object.assign(i,b),Object.assign(i,{...r(i),lazy:void 0})})();return qu.set(i,p),p.catch(()=>{}),{lazyRoutePromise:p,lazyHandlerPromise:p}}let o=Object.keys(n.lazy),l=[],c;for(let d of o){if(s&&s.includes(d))continue;let p=ff({key:d,route:n,manifest:t,mapRouteProperties:r});p&&(l.push(p),d===e&&(c=p))}let u=l.length>0?Promise.all(l).then(()=>{}):void 0;return u==null||u.catch(()=>{}),c==null||c.catch(()=>{}),{lazyRoutePromise:u,lazyHandlerPromise:c}}async function Wu(n){let e=n.matches.filter(s=>s.shouldLoad),t={};return(await Promise.all(e.map(s=>s.resolve()))).forEach((s,i)=>{t[e[i].route.id]=s}),t}async function Wy(n){return n.matches.some(e=>e.route.middleware)?mf(n,()=>Wu(n)):Wu(n)}function mf(n,e){return Gy(n,e,r=>{if(o_(r))throw r;return r},n_,t);function t(r,s,i){if(i)return Promise.resolve(Object.assign(i.value,{[s]:{type:"error",result:r}}));{let{matches:o}=n,l=Math.min(Math.max(o.findIndex(u=>u.route.id===s),0),Math.max(o.findIndex(u=>u.shouldCallHandler()),0)),c=nr(o,o[l].route.id).route.id;return Promise.resolve({[c]:{type:"error",result:r}})}}}async function Gy(n,e,t,r,s){let{matches:i,request:o,params:l,context:c,unstable_pattern:u}=n,d=i.flatMap(_=>_.route.middleware?_.route.middleware.map(b=>[_.route.id,b]):[]);return await pf({request:o,params:l,context:c,unstable_pattern:u},d,e,t,r,s)}async function pf(n,e,t,r,s,i,o=0){let{request:l}=n;if(l.signal.aborted)throw l.signal.reason??new Error(`Request aborted: ${l.method} ${l.url}`);let c=e[o];if(!c)return await t();let[u,d]=c,p,_=async()=>{if(p)throw new Error("You may only call `next()` once per middleware");try{return p={value:await pf(n,e,t,r,s,i,o+1)},p.value}catch(b){return p={value:await i(b,u,p)},p.value}};try{let b=await d(n,_),A=b!=null?r(b):void 0;return s(A)?A:p?A??p.value:(p={value:await _()},p.value)}catch(b){return await i(b,u,p)}}function gf(n,e,t,r,s){let i=ff({key:"middleware",route:r.route,manifest:e,mapRouteProperties:n}),o=qy(r.route,Rt(t.method)?"action":"loader",e,n,s);return{middleware:i,route:o.lazyRoutePromise,handler:o.lazyHandlerPromise}}function pl(n,e,t,r,s,i,o,l,c=null,u){let d=!1,p=gf(n,e,t,s,i);return{...s,_lazyPromises:p,shouldLoad:l,shouldRevalidateArgs:c,shouldCallHandler(_){return d=!0,c?typeof u=="boolean"?ci(s,{...c,defaultShouldRevalidate:u}):typeof _=="boolean"?ci(s,{...c,defaultShouldRevalidate:_}):ci(s,c):l},resolve(_){let{lazy:b,loader:A,middleware:P}=s.route,C=d||l||_&&!Rt(t.method)&&(b||A),O=P&&P.length>0&&!A&&!b;return C&&(Rt(t.method)||!O)?Qy({request:t,unstable_pattern:r,match:s,lazyHandlerPromise:p==null?void 0:p.handler,lazyRoutePromise:p==null?void 0:p.route,handlerOverride:_,scopedContext:o}):Promise.resolve({type:"data",result:void 0})}}}function ps(n,e,t,r,s,i,o,l=null){return r.map(c=>c.route.id!==s.route.id?{...c,shouldLoad:!1,shouldRevalidateArgs:l,shouldCallHandler:()=>!1,_lazyPromises:gf(n,e,t,c,i),resolve:()=>Promise.resolve({type:"data",result:void 0})}:pl(n,e,t,Vi(r),c,i,o,!0,l))}async function Ky(n,e,t,r,s,i){t.some(u=>{var d;return(d=u._lazyPromises)==null?void 0:d.middleware})&&await Promise.all(t.map(u=>{var d;return(d=u._lazyPromises)==null?void 0:d.middleware}));let o={request:e,unstable_pattern:Vi(t),params:t[0].params,context:s,matches:t},c=await n({...o,fetcherKey:r,runClientMiddleware:u=>{let d=o;return mf(d,()=>u({...d,fetcherKey:r,runClientMiddleware:()=>{throw new Error("Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler")}}))}});try{await Promise.all(t.flatMap(u=>{var d,p;return[(d=u._lazyPromises)==null?void 0:d.handler,(p=u._lazyPromises)==null?void 0:p.route]}))}catch{}return c}async function Qy({request:n,unstable_pattern:e,match:t,lazyHandlerPromise:r,lazyRoutePromise:s,handlerOverride:i,scopedContext:o}){let l,c,u=Rt(n.method),d=u?"action":"loader",p=_=>{let b,A=new Promise((O,D)=>b=D);c=()=>b(),n.signal.addEventListener("abort",c);let P=O=>typeof _!="function"?Promise.reject(new Error(`You cannot call the handler for a route which defines a boolean "${d}" [routeId: ${t.route.id}]`)):_({request:n,unstable_pattern:e,params:t.params,context:o},...O!==void 0?[O]:[]),C=(async()=>{try{return{type:"data",result:await(i?i(D=>P(D)):P())}}catch(O){return{type:"error",result:O}}})();return Promise.race([C,A])};try{let _=u?t.route.action:t.route.loader;if(r||s)if(_){let b,[A]=await Promise.all([p(_).catch(P=>{b=P}),r,s]);if(b!==void 0)throw b;l=A}else{await r;let b=u?t.route.action:t.route.loader;if(b)[l]=await Promise.all([p(b),s]);else if(d==="action"){let A=new URL(n.url),P=A.pathname+A.search;throw Kt(405,{method:n.method,pathname:P,routeId:t.route.id})}else return{type:"data",result:void 0}}else if(_)l=await p(_);else{let b=new URL(n.url),A=b.pathname+b.search;throw Kt(404,{pathname:A})}}catch(_){return{type:"error",result:_}}finally{c&&n.signal.removeEventListener("abort",c)}return l}async function Yy(n){let e=n.headers.get("Content-Type");return e&&/\bapplication\/json\b/.test(e)?n.body==null?null:n.json():n.text()}async function Jy(n){var r,s,i,o,l;let{result:e,type:t}=n;if(ec(e)){let c;try{c=await Yy(e)}catch(u){return{type:"error",error:u}}return t==="error"?{type:"error",error:new Di(e.status,e.statusText,c),statusCode:e.status,headers:e.headers}:{type:"data",data:c,statusCode:e.status,headers:e.headers}}return t==="error"?Xu(e)?e.data instanceof Error?{type:"error",error:e.data,statusCode:(r=e.init)==null?void 0:r.status,headers:(s=e.init)!=null&&s.headers?new Headers(e.init.headers):void 0}:{type:"error",error:t_(e),statusCode:Ei(e)?e.status:void 0,headers:(i=e.init)!=null&&i.headers?new Headers(e.init.headers):void 0}:{type:"error",error:e,statusCode:Ei(e)?e.status:void 0}:Xu(e)?{type:"data",data:e.data,statusCode:(o=e.init)==null?void 0:o.status,headers:(l=e.init)!=null&&l.headers?new Headers(e.init.headers):void 0}:{type:"data",data:e}}function Xy(n,e,t,r,s){let i=n.headers.get("Location");if(_e(i,"Redirects returned/thrown from loaders/actions must have a Location header"),!Yl(i)){let o=r.slice(0,r.findIndex(l=>l.route.id===t)+1);i=fl(new URL(e.url),o,s,i),n.headers.set("Location",i)}return n}function Gu(n,e,t,r){let s=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(Yl(n)){let i=n,o=i.startsWith("//")?new URL(e.protocol+i):new URL(i);if(s.includes(o.protocol))throw new Error("Invalid redirect location");let l=Jt(o.pathname,t)!=null;if(o.origin===e.origin&&l)return o.pathname+o.search+o.hash}try{let i=r.createURL(n);if(s.includes(i.protocol))throw new Error("Invalid redirect location")}catch{}return n}function as(n,e,t,r){let s=n.createURL(yf(e)).toString(),i={signal:t};if(r&&Rt(r.formMethod)){let{formMethod:o,formEncType:l}=r;i.method=o.toUpperCase(),l==="application/json"?(i.headers=new Headers({"Content-Type":l}),i.body=JSON.stringify(r.json)):l==="text/plain"?i.body=r.text:l==="application/x-www-form-urlencoded"&&r.formData?i.body=gl(r.formData):i.body=r.formData}return new Request(s,i)}function gl(n){let e=new URLSearchParams;for(let[t,r]of n.entries())e.append(t,typeof r=="string"?r:r.name);return e}function Ku(n){let e=new FormData;for(let[t,r]of n.entries())e.append(t,r);return e}function Zy(n,e,t,r=!1,s=!1){let i={},o=null,l,c=!1,u={},d=t&&$t(t[1])?t[1].error:void 0;return n.forEach(p=>{if(!(p.route.id in e))return;let _=p.route.id,b=e[_];if(_e(!Or(b),"Cannot handle redirect results in processLoaderData"),$t(b)){let A=b.error;if(d!==void 0&&(A=d,d=void 0),o=o||{},s)o[_]=A;else{let P=nr(n,_);o[P.route.id]==null&&(o[P.route.id]=A)}r||(i[_]=hf),c||(c=!0,l=Ei(b.error)?b.error.status:500),b.headers&&(u[_]=b.headers)}else i[_]=b.data,b.statusCode&&b.statusCode!==200&&!c&&(l=b.statusCode),b.headers&&(u[_]=b.headers)}),d!==void 0&&t&&(o={[t[0]]:d},t[2]&&(i[t[2]]=void 0)),{loaderData:i,errors:o,statusCode:l||200,loaderHeaders:u}}function Qu(n,e,t,r,s,i){let{loaderData:o,errors:l}=Zy(e,t,r);return s.filter(c=>!c.matches||c.matches.some(u=>u.shouldLoad)).forEach(c=>{let{key:u,match:d,controller:p}=c;if(p&&p.signal.aborted)return;let _=i[u];if(_e(_,"Did not find corresponding fetcher result"),$t(_)){let b=nr(n.matches,d==null?void 0:d.route.id);l&&l[b.route.id]||(l={...l,[b.route.id]:_.error}),n.fetchers.delete(u)}else if(Or(_))_e(!1,"Unhandled fetcher revalidation redirect");else{let b=Vn(_.data);n.fetchers.set(u,b)}}),{loaderData:o,errors:l}}function Yu(n,e,t,r){let s=Object.entries(e).filter(([,i])=>i!==hf).reduce((i,[o,l])=>(i[o]=l,i),{});for(let i of t){let o=i.route.id;if(!e.hasOwnProperty(o)&&n.hasOwnProperty(o)&&i.route.loader&&(s[o]=n[o]),r&&r.hasOwnProperty(o))break}return s}function Ju(n){return n?$t(n[1])?{actionData:{}}:{actionData:{[n[0]]:n[1].data}}:{}}function nr(n,e){return(e?n.slice(0,n.findIndex(r=>r.route.id===e)+1):[...n]).reverse().find(r=>r.route.hasErrorBoundary===!0)||n[0]}function ho(n){let e=n.length===1?n[0]:n.find(t=>t.index||!t.path||t.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:e}],route:e}}function Kt(n,{pathname:e,routeId:t,method:r,type:s,message:i}={}){let o="Unknown Server Error",l="Unknown @remix-run/router error";return n===400?(o="Bad Request",r&&e&&t?l=`You made a ${r} request to "${e}" but did not provide a \`loader\` for route "${t}", so there is no way to handle the request.`:s==="invalid-body"&&(l="Unable to encode submission body")):n===403?(o="Forbidden",l=`Route "${t}" does not match URL "${e}"`):n===404?(o="Not Found",l=`No route matches URL "${e}"`):n===405&&(o="Method Not Allowed",r&&e&&t?l=`You made a ${r.toUpperCase()} request to "${e}" but did not provide an \`action\` for route "${t}", so there is no way to handle the request.`:r&&(l=`Invalid request method "${r.toUpperCase()}"`)),new Di(n||500,o,new Error(l),!0)}function fo(n){let e=Object.entries(n);for(let t=e.length-1;t>=0;t--){let[r,s]=e[t];if(Or(s))return{key:r,result:s}}}function yf(n){let e=typeof n=="string"?Er(n):n;return xn({...e,hash:""})}function e_(n,e){return n.pathname!==e.pathname||n.search!==e.search?!1:n.hash===""?e.hash!=="":n.hash===e.hash?!0:e.hash!==""}function t_(n){var e,t;return new Di(((e=n.init)==null?void 0:e.status)??500,((t=n.init)==null?void 0:t.statusText)??"Internal Server Error",n.data)}function n_(n){return n!=null&&typeof n=="object"&&Object.entries(n).every(([e,t])=>typeof e=="string"&&r_(t))}function r_(n){return n!=null&&typeof n=="object"&&"type"in n&&"result"in n&&(n.type==="data"||n.type==="error")}function s_(n){return ec(n.result)&&cf.has(n.result.status)}function $t(n){return n.type==="error"}function Or(n){return(n&&n.type)==="redirect"}function Xu(n){return typeof n=="object"&&n!=null&&"type"in n&&"data"in n&&"init"in n&&n.type==="DataWithResponseInit"}function ec(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.headers=="object"&&typeof n.body<"u"}function i_(n){return cf.has(n)}function o_(n){return ec(n)&&i_(n.status)&&n.headers.has("Location")}function a_(n){return My.has(n.toUpperCase())}function Rt(n){return Oy.has(n.toUpperCase())}function tc(n){return new URLSearchParams(n).getAll("index").some(e=>e==="")}function Io(n,e){let t=typeof e=="string"?Er(e).search:e.search;if(n[n.length-1].route.index&&tc(t||""))return n[n.length-1];let r=rf(n);return r[r.length-1]}function Zu(n){let{formMethod:e,formAction:t,formEncType:r,text:s,formData:i,json:o}=n;if(!(!e||!t||!r)){if(s!=null)return{formMethod:e,formAction:t,formEncType:r,formData:void 0,json:void 0,text:s};if(i!=null)return{formMethod:e,formAction:t,formEncType:r,formData:i,json:void 0,text:void 0};if(o!==void 0)return{formMethod:e,formAction:t,formEncType:r,formData:void 0,json:o,text:void 0}}}function Ga(n,e){return e?{state:"loading",location:n,formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text}:{state:"loading",location:n,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function l_(n,e){return{state:"submitting",location:n,formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text}}function Qs(n,e){return n?{state:"loading",formMethod:n.formMethod,formAction:n.formAction,formEncType:n.formEncType,formData:n.formData,json:n.json,text:n.text,data:e}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:e}}function c_(n,e){return{state:"submitting",formMethod:n.formMethod,formAction:n.formAction,formEncType:n.formEncType,formData:n.formData,json:n.json,text:n.text,data:e?e.data:void 0}}function Vn(n){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:n}}function u_(n,e){try{let t=n.sessionStorage.getItem(uf);if(t){let r=JSON.parse(t);for(let[s,i]of Object.entries(r||{}))i&&Array.isArray(i)&&e.set(s,new Set(i||[]))}}catch{}}function h_(n,e){if(e.size>0){let t={};for(let[r,s]of e)t[r]=[...s];try{n.sessionStorage.setItem(uf,JSON.stringify(t))}catch(r){Ye(!1,`Failed to save applied view transitions in sessionStorage (${r}).`)}}}function eh(){let n,e,t=new Promise((r,s)=>{n=async i=>{r(i);try{await t}catch{}},e=async i=>{s(i);try{await t}catch{}}});return{promise:t,resolve:n,reject:e}}var qr=T.createContext(null);qr.displayName="DataRouter";var Oi=T.createContext(null);Oi.displayName="DataRouterState";var _f=T.createContext(!1);function d_(){return T.useContext(_f)}var nc=T.createContext({isTransitioning:!1});nc.displayName="ViewTransition";var vf=T.createContext(new Map);vf.displayName="Fetchers";var f_=T.createContext(null);f_.displayName="Await";var Zt=T.createContext(null);Zt.displayName="Navigation";var da=T.createContext(null);da.displayName="Location";var Bn=T.createContext({outlet:null,matches:[],isDataRoute:!1});Bn.displayName="Route";var rc=T.createContext(null);rc.displayName="RouteError";var wf="REACT_ROUTER_ERROR",m_="REDIRECT",p_="ROUTE_ERROR_RESPONSE";function g_(n){if(n.startsWith(`${wf}:${m_}:{`))try{let e=JSON.parse(n.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function y_(n){if(n.startsWith(`${wf}:${p_}:{`))try{let e=JSON.parse(n.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new Di(e.status,e.statusText,e.data)}catch{}}function __(n,{relative:e}={}){_e(Li(),"useHref() may be used only in the context of a <Router> component.");let{basename:t,navigator:r}=T.useContext(Zt),{hash:s,pathname:i,search:o}=Mi(n,{relative:e}),l=i;return t!=="/"&&(l=i==="/"?t:_n([t,i])),r.createHref({pathname:l,search:o,hash:s})}function Li(){return T.useContext(da)!=null}function zn(){return _e(Li(),"useLocation() may be used only in the context of a <Router> component."),T.useContext(da).location}var bf="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Ef(n){T.useContext(Zt).static||T.useLayoutEffect(n)}function Tr(){let{isDataRoute:n}=T.useContext(Bn);return n?k_():v_()}function v_(){_e(Li(),"useNavigate() may be used only in the context of a <Router> component.");let n=T.useContext(qr),{basename:e,navigator:t}=T.useContext(Zt),{matches:r}=T.useContext(Bn),{pathname:s}=zn(),i=JSON.stringify(Jl(r)),o=T.useRef(!1);return Ef(()=>{o.current=!0}),T.useCallback((c,u={})=>{if(Ye(o.current,bf),!o.current)return;if(typeof c=="number"){t.go(c);return}let d=Xl(c,JSON.parse(i),s,u.relative==="path");n==null&&e!=="/"&&(d.pathname=d.pathname==="/"?e:_n([e,d.pathname])),(u.replace?t.replace:t.push)(d,u.state,u)},[e,t,i,s,n])}T.createContext(null);function Mi(n,{relative:e}={}){let{matches:t}=T.useContext(Bn),{pathname:r}=zn(),s=JSON.stringify(Jl(t));return T.useMemo(()=>Xl(n,JSON.parse(s),r,e==="path"),[n,s,r,e])}function w_(n,e,t,r,s){_e(Li(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=T.useContext(Zt),{matches:o}=T.useContext(Bn),l=o[o.length-1],c=l?l.params:{},u=l?l.pathname:"/",d=l?l.pathnameBase:"/",p=l&&l.route;{let D=p&&p.path||"";xf(u,!p||D.endsWith("*")||D.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D==="/"?"*":`${D}/*`}">.`)}let _=zn(),b;b=_;let A=b.pathname||"/",P=A;if(d!=="/"){let D=d.replace(/^\//,"").split("/");P="/"+A.replace(/^\//,"").split("/").slice(D.length).join("/")}let C=tr(n,{pathname:P});return Ye(p||C!=null,`No routes matched location "${b.pathname}${b.search}${b.hash}" `),Ye(C==null||C[C.length-1].route.element!==void 0||C[C.length-1].route.Component!==void 0||C[C.length-1].route.lazy!==void 0,`Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`),I_(C&&C.map(D=>Object.assign({},D,{params:Object.assign({},c,D.params),pathname:_n([d,i.encodeLocation?i.encodeLocation(D.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:D.pathname]),pathnameBase:D.pathnameBase==="/"?d:_n([d,i.encodeLocation?i.encodeLocation(D.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:D.pathnameBase])})),o,t,r,s)}function b_(){let n=P_(),e=Ei(n)?`${n.status} ${n.statusText}`:n instanceof Error?n.message:JSON.stringify(n),t=n instanceof Error?n.stack:null,r="rgba(200,200,200, 0.5)",s={padding:"0.5rem",backgroundColor:r},i={padding:"2px 4px",backgroundColor:r},o=null;return console.error("Error handled by React Router default ErrorBoundary:",n),o=T.createElement(T.Fragment,null,T.createElement("p",null,"💿 Hey developer 👋"),T.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",T.createElement("code",{style:i},"ErrorBoundary")," or"," ",T.createElement("code",{style:i},"errorElement")," prop on your route.")),T.createElement(T.Fragment,null,T.createElement("h2",null,"Unexpected Application Error!"),T.createElement("h3",{style:{fontStyle:"italic"}},e),t?T.createElement("pre",{style:s},t):null,o)}var E_=T.createElement(b_,null),Tf=class extends T.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,e){return e.location!==n.location||e.revalidation!=="idle"&&n.revalidation==="idle"?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:n.error!==void 0?n.error:e.error,location:e.location,revalidation:n.revalidation||e.revalidation}}componentDidCatch(n,e){this.props.onError?this.props.onError(n,e):console.error("React Router caught the following error during render",n)}render(){let n=this.state.error;if(this.context&&typeof n=="object"&&n&&"digest"in n&&typeof n.digest=="string"){const t=y_(n.digest);t&&(n=t)}let e=n!==void 0?T.createElement(Bn.Provider,{value:this.props.routeContext},T.createElement(rc.Provider,{value:n,children:this.props.component})):this.props.children;return this.context?T.createElement(T_,{error:n},e):e}};Tf.contextType=_f;var Ka=new WeakMap;function T_({children:n,error:e}){let{basename:t}=T.useContext(Zt);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let r=g_(e.digest);if(r){let s=Ka.get(e);if(s)throw s;let i=of(r.location,t);if(sf&&!Ka.get(e))if(i.isExternal||r.reloadDocument)window.location.href=i.absoluteURL||i.to;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:r.replace}));throw Ka.set(e,o),o}return T.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return n}function x_({routeContext:n,match:e,children:t}){let r=T.useContext(qr);return r&&r.static&&r.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=e.route.id),T.createElement(Bn.Provider,{value:n},t)}function I_(n,e=[],t=null,r=null,s=null){if(n==null){if(!t)return null;if(t.errors)n=t.matches;else if(e.length===0&&!t.initialized&&t.matches.length>0)n=t.matches;else return null}let i=n,o=t==null?void 0:t.errors;if(o!=null){let d=i.findIndex(p=>p.route.id&&(o==null?void 0:o[p.route.id])!==void 0);_e(d>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),i=i.slice(0,Math.min(i.length,d+1))}let l=!1,c=-1;if(t)for(let d=0;d<i.length;d++){let p=i[d];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(c=d),p.route.id){let{loaderData:_,errors:b}=t,A=p.route.loader&&!_.hasOwnProperty(p.route.id)&&(!b||b[p.route.id]===void 0);if(p.route.lazy||A){l=!0,c>=0?i=i.slice(0,c+1):i=[i[0]];break}}}let u=t&&r?(d,p)=>{var _,b;r(d,{location:t.location,params:((b=(_=t.matches)==null?void 0:_[0])==null?void 0:b.params)??{},unstable_pattern:Vi(t.matches),errorInfo:p})}:void 0;return i.reduceRight((d,p,_)=>{let b,A=!1,P=null,C=null;t&&(b=o&&p.route.id?o[p.route.id]:void 0,P=p.route.errorElement||E_,l&&(c<0&&_===0?(xf("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),A=!0,C=null):c===_&&(A=!0,C=p.route.hydrateFallbackElement||null)));let O=e.concat(i.slice(0,_+1)),D=()=>{let $;return b?$=P:A?$=C:p.route.Component?$=T.createElement(p.route.Component,null):p.route.element?$=p.route.element:$=d,T.createElement(x_,{match:p,routeContext:{outlet:d,matches:O,isDataRoute:t!=null},children:$})};return t&&(p.route.ErrorBoundary||p.route.errorElement||_===0)?T.createElement(Tf,{location:t.location,revalidation:t.revalidation,component:P,error:b,children:D(),routeContext:{outlet:null,matches:O,isDataRoute:!0},onError:u}):D()},null)}function sc(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function R_(n){let e=T.useContext(qr);return _e(e,sc(n)),e}function A_(n){let e=T.useContext(Oi);return _e(e,sc(n)),e}function S_(n){let e=T.useContext(Bn);return _e(e,sc(n)),e}function ic(n){let e=S_(n),t=e.matches[e.matches.length-1];return _e(t.route.id,`${n} can only be used on routes that contain a unique "id"`),t.route.id}function C_(){return ic("useRouteId")}function P_(){var r;let n=T.useContext(rc),e=A_("useRouteError"),t=ic("useRouteError");return n!==void 0?n:(r=e.errors)==null?void 0:r[t]}function k_(){let{router:n}=R_("useNavigate"),e=ic("useNavigate"),t=T.useRef(!1);return Ef(()=>{t.current=!0}),T.useCallback(async(s,i={})=>{Ye(t.current,bf),t.current&&(typeof s=="number"?await n.navigate(s):await n.navigate(s,{fromRouteId:e,...i}))},[n,e])}var th={};function xf(n,e,t){!e&&!th[n]&&(th[n]=!0,Ye(!1,t))}var nh={};function rh(n,e){!n&&!nh[e]&&(nh[e]=!0,console.warn(e))}var N_="useOptimistic",sh=Wg[N_],D_=()=>{};function V_(n){return sh?sh(n):[n,D_]}function O_(n){let e={hasErrorBoundary:n.hasErrorBoundary||n.ErrorBoundary!=null||n.errorElement!=null};return n.Component&&(n.element&&Ye(!1,"You should not include both `Component` and `element` on your route - `Component` will be used."),Object.assign(e,{element:T.createElement(n.Component),Component:void 0})),n.HydrateFallback&&(n.hydrateFallbackElement&&Ye(!1,"You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."),Object.assign(e,{hydrateFallbackElement:T.createElement(n.HydrateFallback),HydrateFallback:void 0})),n.ErrorBoundary&&(n.errorElement&&Ye(!1,"You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."),Object.assign(e,{errorElement:T.createElement(n.ErrorBoundary),ErrorBoundary:void 0})),e}var L_=["HydrateFallback","hydrateFallbackElement"],M_=class{constructor(){this.status="pending",this.promise=new Promise((e,t)=>{this.resolve=r=>{this.status==="pending"&&(this.status="resolved",e(r))},this.reject=r=>{this.status==="pending"&&(this.status="rejected",t(r))}})}};function j_({router:n,flushSync:e,onError:t,unstable_useTransitions:r}){r=d_()||r;let[i,o]=T.useState(n.state),[l,c]=V_(i),[u,d]=T.useState(),[p,_]=T.useState({isTransitioning:!1}),[b,A]=T.useState(),[P,C]=T.useState(),[O,D]=T.useState(),$=T.useRef(new Map),M=T.useCallback((y,{deletedFetchers:w,newErrors:R,flushSync:I,viewTransitionOpts:S})=>{R&&t&&Object.values(R).forEach(ee=>{var ge;return t(ee,{location:y.location,params:((ge=y.matches[0])==null?void 0:ge.params)??{},unstable_pattern:Vi(y.matches)})}),y.fetchers.forEach((ee,ge)=>{ee.data!==void 0&&$.current.set(ge,ee.data)}),w.forEach(ee=>$.current.delete(ee)),rh(I===!1||e!=null,'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.');let E=n.window!=null&&n.window.document!=null&&typeof n.window.document.startViewTransition=="function";if(rh(S==null||E,"You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."),!S||!E){e&&I?e(()=>o(y)):r===!1?o(y):T.startTransition(()=>{r===!0&&c(ee=>ih(ee,y)),o(y)});return}if(e&&I){e(()=>{P&&(b==null||b.resolve(),P.skipTransition()),_({isTransitioning:!0,flushSync:!0,currentLocation:S.currentLocation,nextLocation:S.nextLocation})});let ee=n.window.document.startViewTransition(()=>{e(()=>o(y))});ee.finished.finally(()=>{e(()=>{A(void 0),C(void 0),d(void 0),_({isTransitioning:!1})})}),e(()=>C(ee));return}P?(b==null||b.resolve(),P.skipTransition(),D({state:y,currentLocation:S.currentLocation,nextLocation:S.nextLocation})):(d(y),_({isTransitioning:!0,flushSync:!1,currentLocation:S.currentLocation,nextLocation:S.nextLocation}))},[n.window,e,P,b,r,c,t]);T.useLayoutEffect(()=>n.subscribe(M),[n,M]),T.useEffect(()=>{p.isTransitioning&&!p.flushSync&&A(new M_)},[p]),T.useEffect(()=>{if(b&&u&&n.window){let y=u,w=b.promise,R=n.window.document.startViewTransition(async()=>{r===!1?o(y):T.startTransition(()=>{r===!0&&c(I=>ih(I,y)),o(y)}),await w});R.finished.finally(()=>{A(void 0),C(void 0),d(void 0),_({isTransitioning:!1})}),C(R)}},[u,b,n.window,r,c]),T.useEffect(()=>{b&&u&&l.location.key===u.location.key&&b.resolve()},[b,P,l.location,u]),T.useEffect(()=>{!p.isTransitioning&&O&&(d(O.state),_({isTransitioning:!0,flushSync:!1,currentLocation:O.currentLocation,nextLocation:O.nextLocation}),D(void 0))},[p.isTransitioning,O]);let q=T.useMemo(()=>({createHref:n.createHref,encodeLocation:n.encodeLocation,go:y=>n.navigate(y),push:(y,w,R)=>n.navigate(y,{state:w,preventScrollReset:R==null?void 0:R.preventScrollReset}),replace:(y,w,R)=>n.navigate(y,{replace:!0,state:w,preventScrollReset:R==null?void 0:R.preventScrollReset})}),[n]),G=n.basename||"/",g=T.useMemo(()=>({router:n,navigator:q,static:!1,basename:G,onError:t}),[n,q,G,t]);return T.createElement(T.Fragment,null,T.createElement(qr.Provider,{value:g},T.createElement(Oi.Provider,{value:l},T.createElement(vf.Provider,{value:$.current},T.createElement(nc.Provider,{value:p},T.createElement($_,{basename:G,location:l.location,navigationType:l.historyAction,navigator:q,unstable_useTransitions:r},T.createElement(F_,{routes:n.routes,future:n.future,state:l,onError:t})))))),null)}function ih(n,e){return{...n,navigation:e.navigation.state!=="idle"?e.navigation:n.navigation,revalidation:e.revalidation!=="idle"?e.revalidation:n.revalidation,actionData:e.navigation.state!=="submitting"?e.actionData:n.actionData,fetchers:e.fetchers}}var F_=T.memo(U_);function U_({routes:n,future:e,state:t,onError:r}){return w_(n,void 0,t,r,e)}function $_({basename:n="/",children:e=null,location:t,navigationType:r="POP",navigator:s,static:i=!1,unstable_useTransitions:o}){_e(!Li(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=n.replace(/^\/*/,"/"),c=T.useMemo(()=>({basename:l,navigator:s,static:i,unstable_useTransitions:o,future:{}}),[l,s,i,o]);typeof t=="string"&&(t=Er(t));let{pathname:u="/",search:d="",hash:p="",state:_=null,key:b="default"}=t,A=T.useMemo(()=>{let P=Jt(u,l);return P==null?null:{location:{pathname:P,search:d,hash:p,state:_,key:b},navigationType:r}},[l,u,d,p,_,b,r]);return Ye(A!=null,`<Router basename="${l}"> is not able to match the URL "${u}${d}${p}" because it does not start with the basename, so the <Router> won't render anything.`),A==null?null:T.createElement(Zt.Provider,{value:c},T.createElement(da.Provider,{children:e,value:A}))}var Ro="get",Ao="application/x-www-form-urlencoded";function fa(n){return typeof HTMLElement<"u"&&n instanceof HTMLElement}function B_(n){return fa(n)&&n.tagName.toLowerCase()==="button"}function z_(n){return fa(n)&&n.tagName.toLowerCase()==="form"}function H_(n){return fa(n)&&n.tagName.toLowerCase()==="input"}function q_(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}function W_(n,e){return n.button===0&&(!e||e==="_self")&&!q_(n)}function yl(n=""){return new URLSearchParams(typeof n=="string"||Array.isArray(n)||n instanceof URLSearchParams?n:Object.keys(n).reduce((e,t)=>{let r=n[t];return e.concat(Array.isArray(r)?r.map(s=>[t,s]):[[t,r]])},[]))}function G_(n,e){let t=yl(n);return e&&e.forEach((r,s)=>{t.has(s)||e.getAll(s).forEach(i=>{t.append(s,i)})}),t}var mo=null;function K_(){if(mo===null)try{new FormData(document.createElement("form"),0),mo=!1}catch{mo=!0}return mo}var Q_=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Qa(n){return n!=null&&!Q_.has(n)?(Ye(!1,`"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ao}"`),null):n}function Y_(n,e){let t,r,s,i,o;if(z_(n)){let l=n.getAttribute("action");r=l?Jt(l,e):null,t=n.getAttribute("method")||Ro,s=Qa(n.getAttribute("enctype"))||Ao,i=new FormData(n)}else if(B_(n)||H_(n)&&(n.type==="submit"||n.type==="image")){let l=n.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=n.getAttribute("formaction")||l.getAttribute("action");if(r=c?Jt(c,e):null,t=n.getAttribute("formmethod")||l.getAttribute("method")||Ro,s=Qa(n.getAttribute("formenctype"))||Qa(l.getAttribute("enctype"))||Ao,i=new FormData(l,n),!K_()){let{name:u,type:d,value:p}=n;if(d==="image"){let _=u?`${u}.`:"";i.append(`${_}x`,"0"),i.append(`${_}y`,"0")}else u&&i.append(u,p)}}else{if(fa(n))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');t=Ro,r=null,s=Ao,o=n}return i&&s==="text/plain"&&(o=i,i=void 0),{action:r,method:t.toLowerCase(),encType:s,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function oc(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function J_(n,e,t,r){let s=typeof n=="string"?new URL(n,typeof window>"u"?"server://singlefetch/":window.location.origin):n;return t?s.pathname.endsWith("/")?s.pathname=`${s.pathname}_.${r}`:s.pathname=`${s.pathname}.${r}`:s.pathname==="/"?s.pathname=`_root.${r}`:e&&Jt(s.pathname,e)==="/"?s.pathname=`${e.replace(/\/$/,"")}/_root.${r}`:s.pathname=`${s.pathname.replace(/\/$/,"")}.${r}`,s}async function X_(n,e){if(n.id in e)return e[n.id];try{let t=await import(n.module);return e[n.id]=t,t}catch(t){return console.error(`Error loading route module \`${n.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Z_(n){return n==null?!1:n.href==null?n.rel==="preload"&&typeof n.imageSrcSet=="string"&&typeof n.imageSizes=="string":typeof n.rel=="string"&&typeof n.href=="string"}async function ev(n,e,t){let r=await Promise.all(n.map(async s=>{let i=e.routes[s.route.id];if(i){let o=await X_(i,t);return o.links?o.links():[]}return[]}));return sv(r.flat(1).filter(Z_).filter(s=>s.rel==="stylesheet"||s.rel==="preload").map(s=>s.rel==="stylesheet"?{...s,rel:"prefetch",as:"style"}:{...s,rel:"prefetch"}))}function oh(n,e,t,r,s,i){let o=(c,u)=>t[u]?c.route.id!==t[u].route.id:!0,l=(c,u)=>{var d;return t[u].pathname!==c.pathname||((d=t[u].route.path)==null?void 0:d.endsWith("*"))&&t[u].params["*"]!==c.params["*"]};return i==="assets"?e.filter((c,u)=>o(c,u)||l(c,u)):i==="data"?e.filter((c,u)=>{var p;let d=r.routes[c.route.id];if(!d||!d.hasLoader)return!1;if(o(c,u)||l(c,u))return!0;if(c.route.shouldRevalidate){let _=c.route.shouldRevalidate({currentUrl:new URL(s.pathname+s.search+s.hash,window.origin),currentParams:((p=t[0])==null?void 0:p.params)||{},nextUrl:new URL(n,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof _=="boolean")return _}return!0}):[]}function tv(n,e,{includeHydrateFallback:t}={}){return nv(n.map(r=>{let s=e.routes[r.route.id];if(!s)return[];let i=[s.module];return s.clientActionModule&&(i=i.concat(s.clientActionModule)),s.clientLoaderModule&&(i=i.concat(s.clientLoaderModule)),t&&s.hydrateFallbackModule&&(i=i.concat(s.hydrateFallbackModule)),s.imports&&(i=i.concat(s.imports)),i}).flat(1))}function nv(n){return[...new Set(n)]}function rv(n){let e={},t=Object.keys(n).sort();for(let r of t)e[r]=n[r];return e}function sv(n,e){let t=new Set;return new Set(e),n.reduce((r,s)=>{let i=JSON.stringify(rv(s));return t.has(i)||(t.add(i),r.push({key:i,link:s})),r},[])}function If(){let n=T.useContext(qr);return oc(n,"You must render this element inside a <DataRouterContext.Provider> element"),n}function iv(){let n=T.useContext(Oi);return oc(n,"You must render this element inside a <DataRouterStateContext.Provider> element"),n}var ac=T.createContext(void 0);ac.displayName="FrameworkContext";function Rf(){let n=T.useContext(ac);return oc(n,"You must render this element inside a <HydratedRouter> element"),n}function ov(n,e){let t=T.useContext(ac),[r,s]=T.useState(!1),[i,o]=T.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:u,onMouseLeave:d,onTouchStart:p}=e,_=T.useRef(null);T.useEffect(()=>{if(n==="render"&&o(!0),n==="viewport"){let P=O=>{O.forEach(D=>{o(D.isIntersecting)})},C=new IntersectionObserver(P,{threshold:.5});return _.current&&C.observe(_.current),()=>{C.disconnect()}}},[n]),T.useEffect(()=>{if(r){let P=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(P)}}},[r]);let b=()=>{s(!0)},A=()=>{s(!1),o(!1)};return t?n!=="intent"?[i,_,{}]:[i,_,{onFocus:Ys(l,b),onBlur:Ys(c,A),onMouseEnter:Ys(u,b),onMouseLeave:Ys(d,A),onTouchStart:Ys(p,b)}]:[!1,_,{}]}function Ys(n,e){return t=>{n&&n(t),t.defaultPrevented||e(t)}}function av({page:n,...e}){let{router:t}=If(),r=T.useMemo(()=>tr(t.routes,n,t.basename),[t.routes,n,t.basename]);return r?T.createElement(cv,{page:n,matches:r,...e}):null}function lv(n){let{manifest:e,routeModules:t}=Rf(),[r,s]=T.useState([]);return T.useEffect(()=>{let i=!1;return ev(n,e,t).then(o=>{i||s(o)}),()=>{i=!0}},[n,e,t]),r}function cv({page:n,matches:e,...t}){let r=zn(),{future:s,manifest:i,routeModules:o}=Rf(),{basename:l}=If(),{loaderData:c,matches:u}=iv(),d=T.useMemo(()=>oh(n,e,u,i,r,"data"),[n,e,u,i,r]),p=T.useMemo(()=>oh(n,e,u,i,r,"assets"),[n,e,u,i,r]),_=T.useMemo(()=>{if(n===r.pathname+r.search+r.hash)return[];let P=new Set,C=!1;if(e.forEach(D=>{var M;let $=i.routes[D.route.id];!$||!$.hasLoader||(!d.some(q=>q.route.id===D.route.id)&&D.route.id in c&&((M=o[D.route.id])!=null&&M.shouldRevalidate)||$.hasClientLoader?C=!0:P.add(D.route.id))}),P.size===0)return[];let O=J_(n,l,s.unstable_trailingSlashAwareDataRequests,"data");return C&&P.size>0&&O.searchParams.set("_routes",e.filter(D=>P.has(D.route.id)).map(D=>D.route.id).join(",")),[O.pathname+O.search]},[l,s.unstable_trailingSlashAwareDataRequests,c,r,i,d,e,n,o]),b=T.useMemo(()=>tv(p,i),[p,i]),A=lv(p);return T.createElement(T.Fragment,null,_.map(P=>T.createElement("link",{key:P,rel:"prefetch",as:"fetch",href:P,...t})),b.map(P=>T.createElement("link",{key:P,rel:"modulepreload",href:P,...t})),A.map(({key:P,link:C})=>T.createElement("link",{key:P,nonce:t.nonce,...C,crossOrigin:C.crossOrigin??t.crossOrigin})))}function uv(...n){return e=>{n.forEach(t=>{typeof t=="function"?t(e):t!=null&&(t.current=e)})}}var hv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{hv&&(window.__reactRouterVersion="7.13.0")}catch{}function dv(n,e){return $y({basename:e==null?void 0:e.basename,getContext:e==null?void 0:e.getContext,future:e==null?void 0:e.future,history:ry({window:e==null?void 0:e.window}),hydrationData:fv(),routes:n,mapRouteProperties:O_,hydrationRouteProperties:L_,dataStrategy:e==null?void 0:e.dataStrategy,patchRoutesOnNavigation:e==null?void 0:e.patchRoutesOnNavigation,window:e==null?void 0:e.window,unstable_instrumentations:e==null?void 0:e.unstable_instrumentations}).initialize()}function fv(){let n=window==null?void 0:window.__staticRouterHydrationData;return n&&n.errors&&(n={...n,errors:mv(n.errors)}),n}function mv(n){if(!n)return null;let e=Object.entries(n),t={};for(let[r,s]of e)if(s&&s.__type==="RouteErrorResponse")t[r]=new Di(s.status,s.statusText,s.data,s.internal===!0);else if(s&&s.__type==="Error"){if(s.__subType){let i=window[s.__subType];if(typeof i=="function")try{let o=new i(s.message);o.stack="",t[r]=o}catch{}}if(t[r]==null){let i=new Error(s.message);i.stack="",t[r]=i}}else t[r]=s;return t}var Af=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Sf=T.forwardRef(function({onClick:e,discover:t="render",prefetch:r="none",relative:s,reloadDocument:i,replace:o,state:l,target:c,to:u,preventScrollReset:d,viewTransition:p,unstable_defaultShouldRevalidate:_,...b},A){let{basename:P,unstable_useTransitions:C}=T.useContext(Zt),O=typeof u=="string"&&Af.test(u),D=of(u,P);u=D.to;let $=__(u,{relative:s}),[M,q,G]=ov(r,b),g=_v(u,{replace:o,state:l,target:c,preventScrollReset:d,relative:s,viewTransition:p,unstable_defaultShouldRevalidate:_,unstable_useTransitions:C});function y(R){e&&e(R),R.defaultPrevented||g(R)}let w=T.createElement("a",{...b,...G,href:D.absoluteURL||$,onClick:D.isExternal||i?e:y,ref:uv(A,q),target:c,"data-discover":!O&&t==="render"?"true":void 0});return M&&!O?T.createElement(T.Fragment,null,w,T.createElement(av,{page:$})):w});Sf.displayName="Link";var pv=T.forwardRef(function({"aria-current":e="page",caseSensitive:t=!1,className:r="",end:s=!1,style:i,to:o,viewTransition:l,children:c,...u},d){let p=Mi(o,{relative:u.relative}),_=zn(),b=T.useContext(Oi),{navigator:A,basename:P}=T.useContext(Zt),C=b!=null&&xv(p)&&l===!0,O=A.encodeLocation?A.encodeLocation(p).pathname:p.pathname,D=_.pathname,$=b&&b.navigation&&b.navigation.location?b.navigation.location.pathname:null;t||(D=D.toLowerCase(),$=$?$.toLowerCase():null,O=O.toLowerCase()),$&&P&&($=Jt($,P)||$);const M=O!=="/"&&O.endsWith("/")?O.length-1:O.length;let q=D===O||!s&&D.startsWith(O)&&D.charAt(M)==="/",G=$!=null&&($===O||!s&&$.startsWith(O)&&$.charAt(O.length)==="/"),g={isActive:q,isPending:G,isTransitioning:C},y=q?e:void 0,w;typeof r=="function"?w=r(g):w=[r,q?"active":null,G?"pending":null,C?"transitioning":null].filter(Boolean).join(" ");let R=typeof i=="function"?i(g):i;return T.createElement(Sf,{...u,"aria-current":y,className:w,ref:d,style:R,to:o,viewTransition:l},typeof c=="function"?c(g):c)});pv.displayName="NavLink";var gv=T.forwardRef(({discover:n="render",fetcherKey:e,navigate:t,reloadDocument:r,replace:s,state:i,method:o=Ro,action:l,onSubmit:c,relative:u,preventScrollReset:d,viewTransition:p,unstable_defaultShouldRevalidate:_,...b},A)=>{let{unstable_useTransitions:P}=T.useContext(Zt),C=Ev(),O=Tv(l,{relative:u}),D=o.toLowerCase()==="get"?"get":"post",$=typeof l=="string"&&Af.test(l),M=q=>{if(c&&c(q),q.defaultPrevented)return;q.preventDefault();let G=q.nativeEvent.submitter,g=(G==null?void 0:G.getAttribute("formmethod"))||o,y=()=>C(G||q.currentTarget,{fetcherKey:e,method:g,navigate:t,replace:s,state:i,relative:u,preventScrollReset:d,viewTransition:p,unstable_defaultShouldRevalidate:_});P&&t!==!1?T.startTransition(()=>y()):y()};return T.createElement("form",{ref:A,method:D,action:O,onSubmit:r?c:M,...b,"data-discover":!$&&n==="render"?"true":void 0})});gv.displayName="Form";function yv(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Cf(n){let e=T.useContext(qr);return _e(e,yv(n)),e}function _v(n,{target:e,replace:t,state:r,preventScrollReset:s,relative:i,viewTransition:o,unstable_defaultShouldRevalidate:l,unstable_useTransitions:c}={}){let u=Tr(),d=zn(),p=Mi(n,{relative:i});return T.useCallback(_=>{if(W_(_,e)){_.preventDefault();let b=t!==void 0?t:xn(d)===xn(p),A=()=>u(n,{replace:b,state:r,preventScrollReset:s,relative:i,viewTransition:o,unstable_defaultShouldRevalidate:l});c?T.startTransition(()=>A()):A()}},[d,u,p,t,r,e,n,s,i,o,l,c])}function vv(n){Ye(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let e=T.useRef(yl(n)),t=T.useRef(!1),r=zn(),s=T.useMemo(()=>G_(r.search,t.current?null:e.current),[r.search]),i=Tr(),o=T.useCallback((l,c)=>{const u=yl(typeof l=="function"?l(new URLSearchParams(s)):l);t.current=!0,i("?"+u,c)},[i,s]);return[s,o]}var wv=0,bv=()=>`__${String(++wv)}__`;function Ev(){let{router:n}=Cf("useSubmit"),{basename:e}=T.useContext(Zt),t=C_(),r=n.fetch,s=n.navigate;return T.useCallback(async(i,o={})=>{let{action:l,method:c,encType:u,formData:d,body:p}=Y_(i,e);if(o.navigate===!1){let _=o.fetcherKey||bv();await r(_,t,o.action||l,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:d,body:p,formMethod:o.method||c,formEncType:o.encType||u,flushSync:o.flushSync})}else await s(o.action||l,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:d,body:p,formMethod:o.method||c,formEncType:o.encType||u,replace:o.replace,state:o.state,fromRouteId:t,flushSync:o.flushSync,viewTransition:o.viewTransition})},[r,s,e,t])}function Tv(n,{relative:e}={}){let{basename:t}=T.useContext(Zt),r=T.useContext(Bn);_e(r,"useFormAction must be used inside a RouteContext");let[s]=r.matches.slice(-1),i={...Mi(n||".",{relative:e})},o=zn();if(n==null){i.search=o.search;let l=new URLSearchParams(i.search),c=l.getAll("index");if(c.some(d=>d==="")){l.delete("index"),c.filter(p=>p).forEach(p=>l.append("index",p));let d=l.toString();i.search=d?`?${d}`:""}}return(!n||n===".")&&s.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),t!=="/"&&(i.pathname=i.pathname==="/"?t:_n([t,i.pathname])),xn(i)}function xv(n,{relative:e}={}){let t=T.useContext(nc);_e(t!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Cf("useViewTransitionState"),s=Mi(n,{relative:e});if(!t.isTransitioning)return!1;let i=Jt(t.currentLocation.pathname,r)||t.currentLocation.pathname,o=Jt(t.nextLocation.pathname,r)||t.nextLocation.pathname;return Fo(s.pathname,o)!=null||Fo(s.pathname,i)!=null}/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iv=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Rv=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase()),ah=n=>{const e=Rv(n);return e.charAt(0).toUpperCase()+e.slice(1)},Pf=(...n)=>n.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Av={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sv=T.forwardRef(({color:n="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:s="",children:i,iconNode:o,...l},c)=>T.createElement("svg",{ref:c,...Av,width:e,height:e,stroke:n,strokeWidth:r?Number(t)*24/Number(e):t,className:Pf("lucide",s),...l},[...o.map(([u,d])=>T.createElement(u,d)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=(n,e)=>{const t=T.forwardRef(({className:r,...s},i)=>T.createElement(Sv,{ref:i,iconNode:e,className:Pf(`lucide-${Iv(ah(n))}`,`lucide-${n}`,r),...s}));return t.displayName=ah(n),t};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],ma=qe("arrow-left",Cv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pv=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],lh=qe("arrow-right",Pv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kv=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],kf=qe("calendar",kv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],ui=qe("check",Nv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Vv=qe("chevron-left",Dv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ov=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Lv=qe("chevron-right",Ov);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mv=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],jv=qe("circle-alert",Mv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fv=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ch=qe("circle-check",Fv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uv=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Nf=qe("clock",Uv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $v=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],uh=qe("copy",$v);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bv=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],_l=qe("file-text",Bv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zv=[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]],vl=qe("gift",zv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hv=[["path",{d:"M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",key:"tarvll"}]],So=qe("laptop",Hv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qv=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],fs=qe("lock",qv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wv=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],Gv=qe("log-out",Wv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kv=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],Uo=qe("mail",Kv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qv=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Yv=qe("package",Qv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jv=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],lc=qe("refresh-cw",Jv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xv=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],hh=qe("send",Xv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zv=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ew=qe("shield-check",Zv);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tw=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Df=qe("user",tw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nw=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]],rw=qe("wrench",nw);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sw=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],$o=qe("x",sw),iw=()=>{};var dh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ow=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],l=n[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Of={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,l=o?n[s+1]:0,c=s+2<n.length,u=c?n[s+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let _=(l&15)<<2|u>>6,b=u&63;c||(b=64,o||(_=64)),r.push(t[d],t[p],t[_],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Vf(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ow(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const u=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||u==null||p==null)throw new aw;const _=i<<2|l>>4;if(r.push(_),u!==64){const b=l<<4&240|u>>2;if(r.push(b),p!==64){const A=u<<6&192|p;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class aw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const lw=function(n){const e=Vf(n);return Of.encodeByteArray(e,!0)},Bo=function(n){return lw(n).replace(/\./g,"")},Lf=function(n){try{return Of.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uw=()=>cw().__FIREBASE_DEFAULTS__,hw=()=>{if(typeof process>"u"||typeof dh>"u")return;const n=dh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},dw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Lf(n[1]);return e&&JSON.parse(e)},pa=()=>{try{return iw()||uw()||hw()||dw()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Mf=n=>{var e,t;return(t=(e=pa())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},jf=n=>{const e=Mf(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ff=()=>{var n;return(n=pa())==null?void 0:n.config},Uf=n=>{var e;return(e=pa())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Bo(JSON.stringify(t)),Bo(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function mw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(St())}function pw(){var e;const n=(e=pa())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function yw(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function _w(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vw(){const n=St();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ww(){return!pw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function bw(){try{return typeof indexedDB=="object"}catch{return!1}}function Ew(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tw="FirebaseError";class Sn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Tw,Object.setPrototypeOf(this,Sn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ji.prototype.create)}}class ji{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?xw(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Sn(s,l,r)}}function xw(n,e){return n.replace(Iw,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Iw=/\{\$([^}]+)}/g;function Rw(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function jr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(fh(i)&&fh(o)){if(!jr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function fh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ni(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ri(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Aw(n,e){const t=new Sw(n,e);return t.subscribe.bind(t)}class Sw{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Cw(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ya),s.error===void 0&&(s.error=Ya),s.complete===void 0&&(s.complete=Ya);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Cw(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ya(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cc(n){return(await fetch(n,{credentials:"include"})).ok}class mr{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new fw;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Nw(e))try{this.getOrInitializeService({instanceIdentifier:Vr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Vr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Vr){return this.instances.has(e)}getOptions(e=Vr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:kw(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Vr){return this.component?this.component.multipleInstances?e:Vr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kw(n){return n===Vr?void 0:n}function Nw(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Pw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Te;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Te||(Te={}));const Vw={debug:Te.DEBUG,verbose:Te.VERBOSE,info:Te.INFO,warn:Te.WARN,error:Te.ERROR,silent:Te.SILENT},Ow=Te.INFO,Lw={[Te.DEBUG]:"log",[Te.VERBOSE]:"log",[Te.INFO]:"info",[Te.WARN]:"warn",[Te.ERROR]:"error"},Mw=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Lw[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class uc{constructor(e){this.name=e,this._logLevel=Ow,this._logHandler=Mw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Vw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Te.DEBUG,...e),this._logHandler(this,Te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Te.VERBOSE,...e),this._logHandler(this,Te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Te.INFO,...e),this._logHandler(this,Te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Te.WARN,...e),this._logHandler(this,Te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Te.ERROR,...e),this._logHandler(this,Te.ERROR,...e)}}const jw=(n,e)=>e.some(t=>n instanceof t);let mh,ph;function Fw(){return mh||(mh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Uw(){return ph||(ph=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Bf=new WeakMap,wl=new WeakMap,zf=new WeakMap,Ja=new WeakMap,hc=new WeakMap;function $w(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(cr(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Bf.set(t,n)}).catch(()=>{}),hc.set(e,n),e}function Bw(n){if(wl.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});wl.set(n,e)}let bl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return wl.get(n);if(e==="objectStoreNames")return n.objectStoreNames||zf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return cr(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function zw(n){bl=n(bl)}function Hw(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Xa(this),e,...t);return zf.set(r,e.sort?e.sort():[e]),cr(r)}:Uw().includes(n)?function(...e){return n.apply(Xa(this),e),cr(Bf.get(this))}:function(...e){return cr(n.apply(Xa(this),e))}}function qw(n){return typeof n=="function"?Hw(n):(n instanceof IDBTransaction&&Bw(n),jw(n,Fw())?new Proxy(n,bl):n)}function cr(n){if(n instanceof IDBRequest)return $w(n);if(Ja.has(n))return Ja.get(n);const e=qw(n);return e!==n&&(Ja.set(n,e),hc.set(e,n)),e}const Xa=n=>hc.get(n);function Ww(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),l=cr(o);return r&&o.addEventListener("upgradeneeded",c=>{r(cr(o.result),c.oldVersion,c.newVersion,cr(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const Gw=["get","getKey","getAll","getAllKeys","count"],Kw=["put","add","delete","clear"],Za=new Map;function gh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Za.get(e))return Za.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Kw.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Gw.includes(t)))return;const i=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[t](...l),s&&c.done]))[0]};return Za.set(e,i),i}zw(n=>({...n,get:(e,t,r)=>gh(e,t)||n.get(e,t,r),has:(e,t)=>!!gh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Yw(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Yw(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const El="@firebase/app",yh="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn=new uc("@firebase/app"),Jw="@firebase/app-compat",Xw="@firebase/analytics-compat",Zw="@firebase/analytics",eb="@firebase/app-check-compat",tb="@firebase/app-check",nb="@firebase/auth",rb="@firebase/auth-compat",sb="@firebase/database",ib="@firebase/data-connect",ob="@firebase/database-compat",ab="@firebase/functions",lb="@firebase/functions-compat",cb="@firebase/installations",ub="@firebase/installations-compat",hb="@firebase/messaging",db="@firebase/messaging-compat",fb="@firebase/performance",mb="@firebase/performance-compat",pb="@firebase/remote-config",gb="@firebase/remote-config-compat",yb="@firebase/storage",_b="@firebase/storage-compat",vb="@firebase/firestore",wb="@firebase/ai",bb="@firebase/firestore-compat",Eb="firebase",Tb="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tl="[DEFAULT]",xb={[El]:"fire-core",[Jw]:"fire-core-compat",[Zw]:"fire-analytics",[Xw]:"fire-analytics-compat",[tb]:"fire-app-check",[eb]:"fire-app-check-compat",[nb]:"fire-auth",[rb]:"fire-auth-compat",[sb]:"fire-rtdb",[ib]:"fire-data-connect",[ob]:"fire-rtdb-compat",[ab]:"fire-fn",[lb]:"fire-fn-compat",[cb]:"fire-iid",[ub]:"fire-iid-compat",[hb]:"fire-fcm",[db]:"fire-fcm-compat",[fb]:"fire-perf",[mb]:"fire-perf-compat",[pb]:"fire-rc",[gb]:"fire-rc-compat",[yb]:"fire-gcs",[_b]:"fire-gcs-compat",[vb]:"fire-fst",[bb]:"fire-fst-compat",[wb]:"fire-vertex","fire-js":"fire-js",[Eb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti=new Map,Ib=new Map,xl=new Map;function _h(n,e){try{n.container.addComponent(e)}catch(t){jn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Fr(n){const e=n.name;if(xl.has(e))return jn.debug(`There were multiple attempts to register component ${e}.`),!1;xl.set(e,n);for(const t of Ti.values())_h(t,n);for(const t of Ib.values())_h(t,n);return!0}function ga(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ur=new ji("app","Firebase",Rb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ab{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new mr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ur.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=Tb;function dc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Tl,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw ur.create("bad-app-name",{appName:String(s)});if(t||(t=Ff()),!t)throw ur.create("no-options");const i=Ti.get(s);if(i){if(jr(t,i.options)&&jr(r,i.config))return i;throw ur.create("duplicate-app",{appName:s})}const o=new Dw(s);for(const c of xl.values())o.addComponent(c);const l=new Ab(t,r,o);return Ti.set(s,l),l}function fc(n=Tl){const e=Ti.get(n);if(!e&&n===Tl&&Ff())return dc();if(!e)throw ur.create("no-app",{appName:n});return e}function Hf(){return Array.from(Ti.values())}function vn(n,e,t){let r=xb[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),jn.warn(o.join(" "));return}Fr(new mr(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sb="firebase-heartbeat-database",Cb=1,xi="firebase-heartbeat-store";let el=null;function qf(){return el||(el=Ww(Sb,Cb,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xi)}catch(t){console.warn(t)}}}}).catch(n=>{throw ur.create("idb-open",{originalErrorMessage:n.message})})),el}async function Pb(n){try{const t=(await qf()).transaction(xi),r=await t.objectStore(xi).get(Wf(n));return await t.done,r}catch(e){if(e instanceof Sn)jn.warn(e.message);else{const t=ur.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});jn.warn(t.message)}}}async function vh(n,e){try{const r=(await qf()).transaction(xi,"readwrite");await r.objectStore(xi).put(e,Wf(n)),await r.done}catch(t){if(t instanceof Sn)jn.warn(t.message);else{const r=ur.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});jn.warn(r.message)}}}function Wf(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kb=1024,Nb=30;class Db{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ob(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=wh();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Nb){const o=Lb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){jn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=wh(),{heartbeatsToSend:r,unsentEntries:s}=Vb(this._heartbeatsCache.heartbeats),i=Bo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return jn.warn(t),""}}}function wh(){return new Date().toISOString().substring(0,10)}function Vb(n,e=kb){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),bh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),bh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Ob{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return bw()?Ew().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Pb(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return vh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return vh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function bh(n){return Bo(JSON.stringify({version:2,heartbeats:n})).length}function Lb(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mb(n){Fr(new mr("platform-logger",e=>new Qw(e),"PRIVATE")),Fr(new mr("heartbeat",e=>new Db(e),"PRIVATE")),vn(El,yh,n),vn(El,yh,"esm2020"),vn("fire-js","")}Mb("");var Eh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hr,Gf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(g,y){function w(){}w.prototype=y.prototype,g.F=y.prototype,g.prototype=new w,g.prototype.constructor=g,g.D=function(R,I,S){for(var E=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)E[ee-2]=arguments[ee];return y.prototype[I].apply(R,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(g,y,w){w||(w=0);const R=Array(16);if(typeof y=="string")for(var I=0;I<16;++I)R[I]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(I=0;I<16;++I)R[I]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=g.g[0],w=g.g[1],I=g.g[2];let S=g.g[3],E;E=y+(S^w&(I^S))+R[0]+3614090360&4294967295,y=w+(E<<7&4294967295|E>>>25),E=S+(I^y&(w^I))+R[1]+3905402710&4294967295,S=y+(E<<12&4294967295|E>>>20),E=I+(w^S&(y^w))+R[2]+606105819&4294967295,I=S+(E<<17&4294967295|E>>>15),E=w+(y^I&(S^y))+R[3]+3250441966&4294967295,w=I+(E<<22&4294967295|E>>>10),E=y+(S^w&(I^S))+R[4]+4118548399&4294967295,y=w+(E<<7&4294967295|E>>>25),E=S+(I^y&(w^I))+R[5]+1200080426&4294967295,S=y+(E<<12&4294967295|E>>>20),E=I+(w^S&(y^w))+R[6]+2821735955&4294967295,I=S+(E<<17&4294967295|E>>>15),E=w+(y^I&(S^y))+R[7]+4249261313&4294967295,w=I+(E<<22&4294967295|E>>>10),E=y+(S^w&(I^S))+R[8]+1770035416&4294967295,y=w+(E<<7&4294967295|E>>>25),E=S+(I^y&(w^I))+R[9]+2336552879&4294967295,S=y+(E<<12&4294967295|E>>>20),E=I+(w^S&(y^w))+R[10]+4294925233&4294967295,I=S+(E<<17&4294967295|E>>>15),E=w+(y^I&(S^y))+R[11]+2304563134&4294967295,w=I+(E<<22&4294967295|E>>>10),E=y+(S^w&(I^S))+R[12]+1804603682&4294967295,y=w+(E<<7&4294967295|E>>>25),E=S+(I^y&(w^I))+R[13]+4254626195&4294967295,S=y+(E<<12&4294967295|E>>>20),E=I+(w^S&(y^w))+R[14]+2792965006&4294967295,I=S+(E<<17&4294967295|E>>>15),E=w+(y^I&(S^y))+R[15]+1236535329&4294967295,w=I+(E<<22&4294967295|E>>>10),E=y+(I^S&(w^I))+R[1]+4129170786&4294967295,y=w+(E<<5&4294967295|E>>>27),E=S+(w^I&(y^w))+R[6]+3225465664&4294967295,S=y+(E<<9&4294967295|E>>>23),E=I+(y^w&(S^y))+R[11]+643717713&4294967295,I=S+(E<<14&4294967295|E>>>18),E=w+(S^y&(I^S))+R[0]+3921069994&4294967295,w=I+(E<<20&4294967295|E>>>12),E=y+(I^S&(w^I))+R[5]+3593408605&4294967295,y=w+(E<<5&4294967295|E>>>27),E=S+(w^I&(y^w))+R[10]+38016083&4294967295,S=y+(E<<9&4294967295|E>>>23),E=I+(y^w&(S^y))+R[15]+3634488961&4294967295,I=S+(E<<14&4294967295|E>>>18),E=w+(S^y&(I^S))+R[4]+3889429448&4294967295,w=I+(E<<20&4294967295|E>>>12),E=y+(I^S&(w^I))+R[9]+568446438&4294967295,y=w+(E<<5&4294967295|E>>>27),E=S+(w^I&(y^w))+R[14]+3275163606&4294967295,S=y+(E<<9&4294967295|E>>>23),E=I+(y^w&(S^y))+R[3]+4107603335&4294967295,I=S+(E<<14&4294967295|E>>>18),E=w+(S^y&(I^S))+R[8]+1163531501&4294967295,w=I+(E<<20&4294967295|E>>>12),E=y+(I^S&(w^I))+R[13]+2850285829&4294967295,y=w+(E<<5&4294967295|E>>>27),E=S+(w^I&(y^w))+R[2]+4243563512&4294967295,S=y+(E<<9&4294967295|E>>>23),E=I+(y^w&(S^y))+R[7]+1735328473&4294967295,I=S+(E<<14&4294967295|E>>>18),E=w+(S^y&(I^S))+R[12]+2368359562&4294967295,w=I+(E<<20&4294967295|E>>>12),E=y+(w^I^S)+R[5]+4294588738&4294967295,y=w+(E<<4&4294967295|E>>>28),E=S+(y^w^I)+R[8]+2272392833&4294967295,S=y+(E<<11&4294967295|E>>>21),E=I+(S^y^w)+R[11]+1839030562&4294967295,I=S+(E<<16&4294967295|E>>>16),E=w+(I^S^y)+R[14]+4259657740&4294967295,w=I+(E<<23&4294967295|E>>>9),E=y+(w^I^S)+R[1]+2763975236&4294967295,y=w+(E<<4&4294967295|E>>>28),E=S+(y^w^I)+R[4]+1272893353&4294967295,S=y+(E<<11&4294967295|E>>>21),E=I+(S^y^w)+R[7]+4139469664&4294967295,I=S+(E<<16&4294967295|E>>>16),E=w+(I^S^y)+R[10]+3200236656&4294967295,w=I+(E<<23&4294967295|E>>>9),E=y+(w^I^S)+R[13]+681279174&4294967295,y=w+(E<<4&4294967295|E>>>28),E=S+(y^w^I)+R[0]+3936430074&4294967295,S=y+(E<<11&4294967295|E>>>21),E=I+(S^y^w)+R[3]+3572445317&4294967295,I=S+(E<<16&4294967295|E>>>16),E=w+(I^S^y)+R[6]+76029189&4294967295,w=I+(E<<23&4294967295|E>>>9),E=y+(w^I^S)+R[9]+3654602809&4294967295,y=w+(E<<4&4294967295|E>>>28),E=S+(y^w^I)+R[12]+3873151461&4294967295,S=y+(E<<11&4294967295|E>>>21),E=I+(S^y^w)+R[15]+530742520&4294967295,I=S+(E<<16&4294967295|E>>>16),E=w+(I^S^y)+R[2]+3299628645&4294967295,w=I+(E<<23&4294967295|E>>>9),E=y+(I^(w|~S))+R[0]+4096336452&4294967295,y=w+(E<<6&4294967295|E>>>26),E=S+(w^(y|~I))+R[7]+1126891415&4294967295,S=y+(E<<10&4294967295|E>>>22),E=I+(y^(S|~w))+R[14]+2878612391&4294967295,I=S+(E<<15&4294967295|E>>>17),E=w+(S^(I|~y))+R[5]+4237533241&4294967295,w=I+(E<<21&4294967295|E>>>11),E=y+(I^(w|~S))+R[12]+1700485571&4294967295,y=w+(E<<6&4294967295|E>>>26),E=S+(w^(y|~I))+R[3]+2399980690&4294967295,S=y+(E<<10&4294967295|E>>>22),E=I+(y^(S|~w))+R[10]+4293915773&4294967295,I=S+(E<<15&4294967295|E>>>17),E=w+(S^(I|~y))+R[1]+2240044497&4294967295,w=I+(E<<21&4294967295|E>>>11),E=y+(I^(w|~S))+R[8]+1873313359&4294967295,y=w+(E<<6&4294967295|E>>>26),E=S+(w^(y|~I))+R[15]+4264355552&4294967295,S=y+(E<<10&4294967295|E>>>22),E=I+(y^(S|~w))+R[6]+2734768916&4294967295,I=S+(E<<15&4294967295|E>>>17),E=w+(S^(I|~y))+R[13]+1309151649&4294967295,w=I+(E<<21&4294967295|E>>>11),E=y+(I^(w|~S))+R[4]+4149444226&4294967295,y=w+(E<<6&4294967295|E>>>26),E=S+(w^(y|~I))+R[11]+3174756917&4294967295,S=y+(E<<10&4294967295|E>>>22),E=I+(y^(S|~w))+R[2]+718787259&4294967295,I=S+(E<<15&4294967295|E>>>17),E=w+(S^(I|~y))+R[9]+3951481745&4294967295,g.g[0]=g.g[0]+y&4294967295,g.g[1]=g.g[1]+(I+(E<<21&4294967295|E>>>11))&4294967295,g.g[2]=g.g[2]+I&4294967295,g.g[3]=g.g[3]+S&4294967295}r.prototype.v=function(g,y){y===void 0&&(y=g.length);const w=y-this.blockSize,R=this.C;let I=this.h,S=0;for(;S<y;){if(I==0)for(;S<=w;)s(this,g,S),S+=this.blockSize;if(typeof g=="string"){for(;S<y;)if(R[I++]=g.charCodeAt(S++),I==this.blockSize){s(this,R),I=0;break}}else for(;S<y;)if(R[I++]=g[S++],I==this.blockSize){s(this,R),I=0;break}}this.h=I,this.o+=y},r.prototype.A=function(){var g=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);g[0]=128;for(var y=1;y<g.length-8;++y)g[y]=0;y=this.o*8;for(var w=g.length-8;w<g.length;++w)g[w]=y&255,y/=256;for(this.v(g),g=Array(16),y=0,w=0;w<4;++w)for(let R=0;R<32;R+=8)g[y++]=this.g[w]>>>R&255;return g};function i(g,y){var w=l;return Object.prototype.hasOwnProperty.call(w,g)?w[g]:w[g]=y(g)}function o(g,y){this.h=y;const w=[];let R=!0;for(let I=g.length-1;I>=0;I--){const S=g[I]|0;R&&S==y||(w[I]=S,R=!1)}this.g=w}var l={};function c(g){return-128<=g&&g<128?i(g,function(y){return new o([y|0],y<0?-1:0)}):new o([g|0],g<0?-1:0)}function u(g){if(isNaN(g)||!isFinite(g))return p;if(g<0)return C(u(-g));const y=[];let w=1;for(let R=0;g>=w;R++)y[R]=g/w|0,w*=4294967296;return new o(y,0)}function d(g,y){if(g.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(g.charAt(0)=="-")return C(d(g.substring(1),y));if(g.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=u(Math.pow(y,8));let R=p;for(let S=0;S<g.length;S+=8){var I=Math.min(8,g.length-S);const E=parseInt(g.substring(S,S+I),y);I<8?(I=u(Math.pow(y,I)),R=R.j(I).add(u(E))):(R=R.j(w),R=R.add(u(E)))}return R}var p=c(0),_=c(1),b=c(16777216);n=o.prototype,n.m=function(){if(P(this))return-C(this).m();let g=0,y=1;for(let w=0;w<this.g.length;w++){const R=this.i(w);g+=(R>=0?R:4294967296+R)*y,y*=4294967296}return g},n.toString=function(g){if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(A(this))return"0";if(P(this))return"-"+C(this).toString(g);const y=u(Math.pow(g,6));var w=this;let R="";for(;;){const I=M(w,y).g;w=O(w,I.j(y));let S=((w.g.length>0?w.g[0]:w.h)>>>0).toString(g);if(w=I,A(w))return S+R;for(;S.length<6;)S="0"+S;R=S+R}},n.i=function(g){return g<0?0:g<this.g.length?this.g[g]:this.h};function A(g){if(g.h!=0)return!1;for(let y=0;y<g.g.length;y++)if(g.g[y]!=0)return!1;return!0}function P(g){return g.h==-1}n.l=function(g){return g=O(this,g),P(g)?-1:A(g)?0:1};function C(g){const y=g.g.length,w=[];for(let R=0;R<y;R++)w[R]=~g.g[R];return new o(w,~g.h).add(_)}n.abs=function(){return P(this)?C(this):this},n.add=function(g){const y=Math.max(this.g.length,g.g.length),w=[];let R=0;for(let I=0;I<=y;I++){let S=R+(this.i(I)&65535)+(g.i(I)&65535),E=(S>>>16)+(this.i(I)>>>16)+(g.i(I)>>>16);R=E>>>16,S&=65535,E&=65535,w[I]=E<<16|S}return new o(w,w[w.length-1]&-2147483648?-1:0)};function O(g,y){return g.add(C(y))}n.j=function(g){if(A(this)||A(g))return p;if(P(this))return P(g)?C(this).j(C(g)):C(C(this).j(g));if(P(g))return C(this.j(C(g)));if(this.l(b)<0&&g.l(b)<0)return u(this.m()*g.m());const y=this.g.length+g.g.length,w=[];for(var R=0;R<2*y;R++)w[R]=0;for(R=0;R<this.g.length;R++)for(let I=0;I<g.g.length;I++){const S=this.i(R)>>>16,E=this.i(R)&65535,ee=g.i(I)>>>16,ge=g.i(I)&65535;w[2*R+2*I]+=E*ge,D(w,2*R+2*I),w[2*R+2*I+1]+=S*ge,D(w,2*R+2*I+1),w[2*R+2*I+1]+=E*ee,D(w,2*R+2*I+1),w[2*R+2*I+2]+=S*ee,D(w,2*R+2*I+2)}for(g=0;g<y;g++)w[g]=w[2*g+1]<<16|w[2*g];for(g=y;g<2*y;g++)w[g]=0;return new o(w,0)};function D(g,y){for(;(g[y]&65535)!=g[y];)g[y+1]+=g[y]>>>16,g[y]&=65535,y++}function $(g,y){this.g=g,this.h=y}function M(g,y){if(A(y))throw Error("division by zero");if(A(g))return new $(p,p);if(P(g))return y=M(C(g),y),new $(C(y.g),C(y.h));if(P(y))return y=M(g,C(y)),new $(C(y.g),y.h);if(g.g.length>30){if(P(g)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var w=_,R=y;R.l(g)<=0;)w=q(w),R=q(R);var I=G(w,1),S=G(R,1);for(R=G(R,2),w=G(w,2);!A(R);){var E=S.add(R);E.l(g)<=0&&(I=I.add(w),S=E),R=G(R,1),w=G(w,1)}return y=O(g,I.j(y)),new $(I,y)}for(I=p;g.l(y)>=0;){for(w=Math.max(1,Math.floor(g.m()/y.m())),R=Math.ceil(Math.log(w)/Math.LN2),R=R<=48?1:Math.pow(2,R-48),S=u(w),E=S.j(y);P(E)||E.l(g)>0;)w-=R,S=u(w),E=S.j(y);A(S)&&(S=_),I=I.add(S),g=O(g,E)}return new $(I,g)}n.B=function(g){return M(this,g).h},n.and=function(g){const y=Math.max(this.g.length,g.g.length),w=[];for(let R=0;R<y;R++)w[R]=this.i(R)&g.i(R);return new o(w,this.h&g.h)},n.or=function(g){const y=Math.max(this.g.length,g.g.length),w=[];for(let R=0;R<y;R++)w[R]=this.i(R)|g.i(R);return new o(w,this.h|g.h)},n.xor=function(g){const y=Math.max(this.g.length,g.g.length),w=[];for(let R=0;R<y;R++)w[R]=this.i(R)^g.i(R);return new o(w,this.h^g.h)};function q(g){const y=g.g.length+1,w=[];for(let R=0;R<y;R++)w[R]=g.i(R)<<1|g.i(R-1)>>>31;return new o(w,g.h)}function G(g,y){const w=y>>5;y%=32;const R=g.g.length-w,I=[];for(let S=0;S<R;S++)I[S]=y>0?g.i(S+w)>>>y|g.i(S+w+1)<<32-y:g.i(S+w);return new o(I,g.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Gf=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=d,hr=o}).apply(typeof Eh<"u"?Eh:typeof self<"u"?self:typeof window<"u"?window:{});var po=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Kf,si,Qf,Co,Il,Yf,Jf,Xf;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof po=="object"&&po];for(var h=0;h<a.length;++h){var m=a[h];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var m=r;a=a.split(".");for(var v=0;v<a.length-1;v++){var N=a[v];if(!(N in m))break e;m=m[N]}a=a[a.length-1],v=m[a],h=h(v),h!=v&&h!=null&&e(m,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var m=[],v;for(v in h)Object.prototype.hasOwnProperty.call(h,v)&&m.push([v,h[v]]);return m}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function l(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function c(a,h,m){return a.call.apply(a.bind,arguments)}function u(a,h,m){return u=c,u.apply(null,arguments)}function d(a,h){var m=Array.prototype.slice.call(arguments,1);return function(){var v=m.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function p(a,h){function m(){}m.prototype=h.prototype,a.Z=h.prototype,a.prototype=new m,a.prototype.constructor=a,a.Ob=function(v,N,L){for(var H=Array(arguments.length-2),pe=2;pe<arguments.length;pe++)H[pe-2]=arguments[pe];return h.prototype[N].apply(v,H)}}var _=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function b(a){const h=a.length;if(h>0){const m=Array(h);for(let v=0;v<h;v++)m[v]=a[v];return m}return[]}function A(a,h){for(let v=1;v<arguments.length;v++){const N=arguments[v];var m=typeof N;if(m=m!="object"?m:N?Array.isArray(N)?"array":m:"null",m=="array"||m=="object"&&typeof N.length=="number"){m=a.length||0;const L=N.length||0;a.length=m+L;for(let H=0;H<L;H++)a[m+H]=N[H]}else a.push(N)}}class P{constructor(h,m){this.i=h,this.j=m,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function C(a){o.setTimeout(()=>{throw a},0)}function O(){var a=g;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class D{constructor(){this.h=this.g=null}add(h,m){const v=$.get();v.set(h,m),this.h?this.h.next=v:this.g=v,this.h=v}}var $=new P(()=>new M,a=>a.reset());class M{constructor(){this.next=this.g=this.h=null}set(h,m){this.h=h,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let q,G=!1,g=new D,y=()=>{const a=Promise.resolve(void 0);q=()=>{a.then(w)}};function w(){for(var a;a=O();){try{a.h.call(a.g)}catch(m){C(m)}var h=$;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}G=!1}function R(){this.u=this.u,this.C=this.C}R.prototype.u=!1,R.prototype.dispose=function(){this.u||(this.u=!0,this.N())},R.prototype[Symbol.dispose]=function(){this.dispose()},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function I(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const m=()=>{};o.addEventListener("test",m,h),o.removeEventListener("test",m,h)}catch{}return a})();function E(a){return/^[\s\xa0]*$/.test(a)}function ee(a,h){I.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(ee,I),ee.prototype.init=function(a,h){const m=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(m=="mouseover"?h=a.fromElement:m=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&ee.Z.h.call(this)},ee.prototype.h=function(){ee.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ge="closure_listenable_"+(Math.random()*1e6|0),he=0;function Ce(a,h,m,v,N){this.listener=a,this.proxy=null,this.src=h,this.type=m,this.capture=!!v,this.ha=N,this.key=++he,this.da=this.fa=!1}function z(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function De(a,h,m){for(const v in a)h.call(m,a[v],v,a)}function Oe(a,h){for(const m in a)h.call(void 0,a[m],m,a)}function Ve(a){const h={};for(const m in a)h[m]=a[m];return h}const Fe="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ve(a,h){let m,v;for(let N=1;N<arguments.length;N++){v=arguments[N];for(m in v)a[m]=v[m];for(let L=0;L<Fe.length;L++)m=Fe[L],Object.prototype.hasOwnProperty.call(v,m)&&(a[m]=v[m])}}function we(a){this.src=a,this.g={},this.h=0}we.prototype.add=function(a,h,m,v,N){const L=a.toString();a=this.g[L],a||(a=this.g[L]=[],this.h++);const H=Je(a,h,v,N);return H>-1?(h=a[H],m||(h.fa=!1)):(h=new Ce(h,this.src,L,!!v,N),h.fa=m,a.push(h)),h};function Pe(a,h){const m=h.type;if(m in a.g){var v=a.g[m],N=Array.prototype.indexOf.call(v,h,void 0),L;(L=N>=0)&&Array.prototype.splice.call(v,N,1),L&&(z(h),a.g[m].length==0&&(delete a.g[m],a.h--))}}function Je(a,h,m,v){for(let N=0;N<a.length;++N){const L=a[N];if(!L.da&&L.listener==h&&L.capture==!!m&&L.ha==v)return N}return-1}var Ne="closure_lm_"+(Math.random()*1e6|0),_t={};function en(a,h,m,v,N){if(Array.isArray(h)){for(let L=0;L<h.length;L++)en(a,h[L],m,v,N);return null}return m=vt(m),a&&a[ge]?a.J(h,m,l(v)?!!v.capture:!1,N):tn(a,h,m,!1,v,N)}function tn(a,h,m,v,N,L){if(!h)throw Error("Invalid event type");const H=l(N)?!!N.capture:!!N;let pe=Ue(a);if(pe||(a[Ne]=pe=new we(a)),m=pe.add(h,m,v,H,L),m.proxy)return m;if(v=kn(),m.proxy=v,v.src=a,v.listener=m,a.addEventListener)S||(N=H),N===void 0&&(N=!1),a.addEventListener(h.toString(),v,N);else if(a.attachEvent)a.attachEvent(oe(h.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return m}function kn(){function a(m){return h.call(a.src,a.listener,m)}const h=fe;return a}function Le(a,h,m,v,N){if(Array.isArray(h))for(var L=0;L<h.length;L++)Le(a,h[L],m,v,N);else v=l(v)?!!v.capture:!!v,m=vt(m),a&&a[ge]?(a=a.i,L=String(h).toString(),L in a.g&&(h=a.g[L],m=Je(h,m,v,N),m>-1&&(z(h[m]),Array.prototype.splice.call(h,m,1),h.length==0&&(delete a.g[L],a.h--)))):a&&(a=Ue(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Je(h,m,v,N)),(m=a>-1?h[a]:null)&&qt(m))}function qt(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[ge])Pe(h.i,a);else{var m=a.type,v=a.proxy;h.removeEventListener?h.removeEventListener(m,v,a.capture):h.detachEvent?h.detachEvent(oe(m),v):h.addListener&&h.removeListener&&h.removeListener(v),(m=Ue(h))?(Pe(m,a),m.h==0&&(m.src=null,h[Ne]=null)):z(a)}}}function oe(a){return a in _t?_t[a]:_t[a]="on"+a}function fe(a,h){if(a.da)a=!0;else{h=new ee(h,this);const m=a.listener,v=a.ha||a.src;a.fa&&qt(a),a=m.call(v,h)}return a}function Ue(a){return a=a[Ne],a instanceof we?a:null}var dt="__closure_events_fn_"+(Math.random()*1e9>>>0);function vt(a){return typeof a=="function"?a:(a[dt]||(a[dt]=function(h){return a.handleEvent(h)}),a[dt])}function me(){R.call(this),this.i=new we(this),this.M=this,this.G=null}p(me,R),me.prototype[ge]=!0,me.prototype.removeEventListener=function(a,h,m,v){Le(this,a,h,m,v)};function ke(a,h){var m,v=a.G;if(v)for(m=[];v;v=v.G)m.push(v);if(a=a.M,v=h.type||h,typeof h=="string")h=new I(h,a);else if(h instanceof I)h.target=h.target||a;else{var N=h;h=new I(v,a),ve(h,N)}N=!0;let L,H;if(m)for(H=m.length-1;H>=0;H--)L=h.g=m[H],N=nn(L,v,!0,h)&&N;if(L=h.g=a,N=nn(L,v,!0,h)&&N,N=nn(L,v,!1,h)&&N,m)for(H=0;H<m.length;H++)L=h.g=m[H],N=nn(L,v,!1,h)&&N}me.prototype.N=function(){if(me.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const m=a.g[h];for(let v=0;v<m.length;v++)z(m[v]);delete a.g[h],a.h--}}this.G=null},me.prototype.J=function(a,h,m,v){return this.i.add(String(a),h,!1,m,v)},me.prototype.K=function(a,h,m,v){return this.i.add(String(a),h,!0,m,v)};function nn(a,h,m,v){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let N=!0;for(let L=0;L<h.length;++L){const H=h[L];if(H&&!H.da&&H.capture==m){const pe=H.listener,lt=H.ha||H.src;H.fa&&Pe(a.i,H),N=pe.call(lt,v)!==!1&&N}}return N&&!v.defaultPrevented}function Ct(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=u(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Wt(a){a.g=Ct(()=>{a.g=null,a.i&&(a.i=!1,Wt(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class it extends R{constructor(h,m){super(),this.m=h,this.l=m,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Wt(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Xe(a){R.call(this),this.h=a,this.g={}}p(Xe,R);var Ot=[];function Lt(a){De(a.g,function(h,m){this.g.hasOwnProperty(m)&&qt(h)},a),a.g={}}Xe.prototype.N=function(){Xe.Z.N.call(this),Lt(this)},Xe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var xt=o.JSON.stringify,Mt=o.JSON.parse,Yr=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Jr(){}function Wn(){}var Pt={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function wt(){I.call(this,"d")}p(wt,I);function Gn(){I.call(this,"c")}p(Gn,I);var fn={},js=null;function Xr(){return js=js||new me}fn.Ia="serverreachability";function Fs(a){I.call(this,fn.Ia,a)}p(Fs,I);function mn(a){const h=Xr();ke(h,new Fs(h))}fn.STAT_EVENT="statevent";function Us(a,h){I.call(this,fn.STAT_EVENT,a),this.stat=h}p(Us,I);function ot(a){const h=Xr();ke(h,new Us(h,a))}fn.Ja="timingevent";function Zi(a,h){I.call(this,fn.Ja,a),this.size=h}p(Zi,I);function Kn(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Rr(){this.g=!0}Rr.prototype.ua=function(){this.g=!1};function eo(a,h,m,v,N,L){a.info(function(){if(a.g)if(L){var H="",pe=L.split("&");for(let Be=0;Be<pe.length;Be++){var lt=pe[Be].split("=");if(lt.length>1){const pt=lt[0];lt=lt[1];const gn=pt.split("_");H=gn.length>=2&&gn[1]=="type"?H+(pt+"="+lt+"&"):H+(pt+"=redacted&")}}}else H=null;else H=L;return"XMLHTTP REQ ("+v+") [attempt "+N+"]: "+h+`
`+m+`
`+H})}function Zr(a,h,m,v,N,L,H){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+N+"]: "+h+`
`+m+`
`+L+" "+H})}function rn(a,h,m,v){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Ma(a,m)+(v?" "+v:"")})}function to(a,h){a.info(function(){return"TIMEOUT: "+h})}Rr.prototype.info=function(){};function Ma(a,h){if(!a.g)return h;if(!h)return null;try{const L=JSON.parse(h);if(L){for(a=0;a<L.length;a++)if(Array.isArray(L[a])){var m=L[a];if(!(m.length<2)){var v=m[1];if(Array.isArray(v)&&!(v.length<1)){var N=v[0];if(N!="noop"&&N!="stop"&&N!="close")for(let H=1;H<v.length;H++)v[H]=""}}}}return xt(L)}catch{return h}}var es={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},x={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},k;function V(){}p(V,Jr),V.prototype.g=function(){return new XMLHttpRequest},k=new V;function U(a){return encodeURIComponent(String(a))}function B(a){var h=1;a=a.split(":");const m=[];for(;h>0&&a.length;)m.push(a.shift()),h--;return a.length&&m.push(a.join(":")),m}function J(a,h,m,v){this.j=a,this.i=h,this.l=m,this.S=v||1,this.V=new Xe(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new re}function re(){this.i=null,this.g="",this.h=!1}var K={},Y={};function te(a,h,m){a.M=1,a.A=no(mt(h)),a.u=m,a.R=!0,ue(a,null)}function ue(a,h){a.F=Date.now(),We(a),a.B=mt(a.A);var m=a.B,v=a.S;Array.isArray(v)||(v=[String(v)]),uu(m.i,"t",v),a.C=0,m=a.j.L,a.h=new re,a.g=Su(a.j,m?h:null,!a.u),a.P>0&&(a.O=new it(u(a.Y,a,a.g),a.P)),h=a.V,m=a.g,v=a.ba;var N="readystatechange";Array.isArray(N)||(N&&(Ot[0]=N.toString()),N=Ot);for(let L=0;L<N.length;L++){const H=en(m,N[L],v||h.handleEvent,!1,h.h||h);if(!H)break;h.g[H.key]=H}h=a.J?Ve(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),mn(),eo(a.i,a.v,a.B,a.l,a.S,a.u)}J.prototype.ba=function(a){a=a.target;const h=this.O;h&&Yn(a)==3?h.j():this.Y(a)},J.prototype.Y=function(a){try{if(a==this.g)e:{const pe=Yn(this.g),lt=this.g.ya(),Be=this.g.ca();if(!(pe<3)&&(pe!=3||this.g&&(this.h.h||this.g.la()||yu(this.g)))){this.K||pe!=4||lt==7||(lt==8||Be<=0?mn(3):mn(2)),at(this);var h=this.g.ca();this.X=h;var m=ne(this);if(this.o=h==200,Zr(this.i,this.v,this.B,this.l,this.S,pe,h),this.o){if(this.U&&!this.L){t:{if(this.g){var v,N=this.g;if((v=N.g?N.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(v)){var L=v;break t}}L=null}if(a=L)rn(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,sn(this,a);else{this.o=!1,this.m=3,ot(12),Ze(this),Re(this);break e}}if(this.R){a=!0;let pt;for(;!this.K&&this.C<m.length;)if(pt=be(this,m),pt==Y){pe==4&&(this.m=4,ot(14),a=!1),rn(this.i,this.l,null,"[Incomplete Response]");break}else if(pt==K){this.m=4,ot(15),rn(this.i,this.l,m,"[Invalid Chunk]"),a=!1;break}else rn(this.i,this.l,pt,null),sn(this,pt);if(de(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pe!=4||m.length!=0||this.h.h||(this.m=1,ot(16),a=!1),this.o=this.o&&a,!a)rn(this.i,this.l,m,"[Invalid Chunked Response]"),Ze(this),Re(this);else if(m.length>0&&!this.W){this.W=!0;var H=this.j;H.g==this&&H.aa&&!H.P&&(H.j.info("Great, no buffering proxy detected. Bytes received: "+m.length),Ba(H),H.P=!0,ot(11))}}else rn(this.i,this.l,m,null),sn(this,m);pe==4&&Ze(this),this.o&&!this.K&&(pe==4?xu(this.j,this):(this.o=!1,We(this)))}else Bg(this.g),h==400&&m.indexOf("Unknown SID")>0?(this.m=3,ot(12)):(this.m=0,ot(13)),Ze(this),Re(this)}}}catch{}finally{}};function ne(a){if(!de(a))return a.g.la();const h=yu(a.g);if(h==="")return"";let m="";const v=h.length,N=Yn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Ze(a),Re(a),"";a.h.i=new o.TextDecoder}for(let L=0;L<v;L++)a.h.h=!0,m+=a.h.i.decode(h[L],{stream:!(N&&L==v-1)});return h.length=0,a.h.g+=m,a.C=0,a.h.g}function de(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function be(a,h){var m=a.C,v=h.indexOf(`
`,m);return v==-1?Y:(m=Number(h.substring(m,v)),isNaN(m)?K:(v+=1,v+m>h.length?Y:(h=h.slice(v,v+m),a.C=v+m,h)))}J.prototype.cancel=function(){this.K=!0,Ze(this)};function We(a){a.T=Date.now()+a.H,Ke(a,a.H)}function Ke(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Kn(u(a.aa,a),h)}function at(a){a.D&&(o.clearTimeout(a.D),a.D=null)}J.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(to(this.i,this.B),this.M!=2&&(mn(),ot(17)),Ze(this),this.m=2,Re(this)):Ke(this,this.T-a)};function Re(a){a.j.I==0||a.K||xu(a.j,a)}function Ze(a){at(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,Lt(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function sn(a,h){try{var m=a.j;if(m.I!=0&&(m.g==a||Nn(m.h,a))){if(!a.L&&Nn(m.h,a)&&m.I==3){try{var v=m.Ba.g.parse(h)}catch{v=null}if(Array.isArray(v)&&v.length==3){var N=v;if(N[0]==0){e:if(!m.v){if(m.g)if(m.g.F+3e3<a.F)ao(m),io(m);else break e;$a(m),ot(18)}}else m.xa=N[1],0<m.xa-m.K&&N[2]<37500&&m.F&&m.A==0&&!m.C&&(m.C=Kn(u(m.Va,m),6e3));ts(m.h)<=1&&m.ta&&(m.ta=void 0)}else kr(m,11)}else if((a.L||m.g==a)&&ao(m),!E(h))for(N=m.Ba.g.parse(h),h=0;h<N.length;h++){let Be=N[h];const pt=Be[0];if(!(pt<=m.K))if(m.K=pt,Be=Be[1],m.I==2)if(Be[0]=="c"){m.M=Be[1],m.ba=Be[2];const gn=Be[3];gn!=null&&(m.ka=gn,m.j.info("VER="+m.ka));const Nr=Be[4];Nr!=null&&(m.za=Nr,m.j.info("SVER="+m.za));const Jn=Be[5];Jn!=null&&typeof Jn=="number"&&Jn>0&&(v=1.5*Jn,m.O=v,m.j.info("backChannelRequestTimeoutMs_="+v)),v=m;const Xn=a.g;if(Xn){const co=Xn.g?Xn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(co){var L=v.h;L.g||co.indexOf("spdy")==-1&&co.indexOf("quic")==-1&&co.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(an(L,L.h),L.h=null))}if(v.G){const za=Xn.g?Xn.g.getResponseHeader("X-HTTP-Session-Id"):null;za&&(v.wa=za,$e(v.J,v.G,za))}}m.I=3,m.l&&m.l.ra(),m.aa&&(m.T=Date.now()-a.F,m.j.info("Handshake RTT: "+m.T+"ms")),v=m;var H=a;if(v.na=Au(v,v.L?v.ba:null,v.W),H.L){Sr(v.h,H);var pe=H,lt=v.O;lt&&(pe.H=lt),pe.D&&(at(pe),We(pe)),v.g=H}else Eu(v);m.i.length>0&&oo(m)}else Be[0]!="stop"&&Be[0]!="close"||kr(m,7);else m.I==3&&(Be[0]=="stop"||Be[0]=="close"?Be[0]=="stop"?kr(m,7):Ua(m):Be[0]!="noop"&&m.l&&m.l.qa(Be),m.A=0)}}mn(4)}catch{}}var Ar=class{constructor(a,h){this.g=a,this.map=h}};function on(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ft(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ts(a){return a.h?1:a.g?a.g.size:0}function Nn(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function an(a,h){a.g?a.g.add(h):a.h=h}function Sr(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}on.prototype.cancel=function(){if(this.i=Cr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Cr(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const m of a.g.values())h=h.concat(m.G);return h}return b(a.i)}var Ee=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ft(a,h){if(a){a=a.split("&");for(let m=0;m<a.length;m++){const v=a[m].indexOf("=");let N,L=null;v>=0?(N=a[m].substring(0,v),L=a[m].substring(v+1)):N=a[m],h(N,L?decodeURIComponent(L.replace(/\+/g," ")):"")}}}function kt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof kt?(this.l=a.l,Me(this,a.j),this.o=a.o,this.g=a.g,pn(this,a.u),this.h=a.h,ns(this,hu(a.i)),this.m=a.m):a&&(h=String(a).match(Ee))?(this.l=!1,Me(this,h[1]||"",!0),this.o=$s(h[2]||""),this.g=$s(h[3]||"",!0),pn(this,h[4]),this.h=$s(h[5]||"",!0),ns(this,h[6]||"",!0),this.m=$s(h[7]||"")):(this.l=!1,this.i=new zs(null,this.l))}kt.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Bs(h,ou,!0),":");var m=this.g;return(m||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Bs(h,ou,!0),"@"),a.push(U(m).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.u,m!=null&&a.push(":",String(m))),(m=this.h)&&(this.g&&m.charAt(0)!="/"&&a.push("/"),a.push(Bs(m,m.charAt(0)=="/"?Dg:Ng,!0))),(m=this.i.toString())&&a.push("?",m),(m=this.m)&&a.push("#",Bs(m,Og)),a.join("")},kt.prototype.resolve=function(a){const h=mt(this);let m=!!a.j;m?Me(h,a.j):m=!!a.o,m?h.o=a.o:m=!!a.g,m?h.g=a.g:m=a.u!=null;var v=a.h;if(m)pn(h,a.u);else if(m=!!a.h){if(v.charAt(0)!="/")if(this.g&&!this.h)v="/"+v;else{var N=h.h.lastIndexOf("/");N!=-1&&(v=h.h.slice(0,N+1)+v)}if(N=v,N==".."||N==".")v="";else if(N.indexOf("./")!=-1||N.indexOf("/.")!=-1){v=N.lastIndexOf("/",0)==0,N=N.split("/");const L=[];for(let H=0;H<N.length;){const pe=N[H++];pe=="."?v&&H==N.length&&L.push(""):pe==".."?((L.length>1||L.length==1&&L[0]!="")&&L.pop(),v&&H==N.length&&L.push("")):(L.push(pe),v=!0)}v=L.join("/")}else v=N}return m?h.h=v:m=a.i.toString()!=="",m?ns(h,hu(a.i)):m=!!a.m,m&&(h.m=a.m),h};function mt(a){return new kt(a)}function Me(a,h,m){a.j=m?$s(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function pn(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function ns(a,h,m){h instanceof zs?(a.i=h,Lg(a.i,a.l)):(m||(h=Bs(h,Vg)),a.i=new zs(h,a.l))}function $e(a,h,m){a.i.set(h,m)}function no(a){return $e(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function $s(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Bs(a,h,m){return typeof a=="string"?(a=encodeURI(a).replace(h,kg),m&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function kg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ou=/[#\/\?@]/g,Ng=/[#\?:]/g,Dg=/[#\?]/g,Vg=/[#\?@]/g,Og=/#/g;function zs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Pr(a){a.g||(a.g=new Map,a.h=0,a.i&&ft(a.i,function(h,m){a.add(decodeURIComponent(h.replace(/\+/g," ")),m)}))}n=zs.prototype,n.add=function(a,h){Pr(this),this.i=null,a=rs(this,a);let m=this.g.get(a);return m||this.g.set(a,m=[]),m.push(h),this.h+=1,this};function au(a,h){Pr(a),h=rs(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function lu(a,h){return Pr(a),h=rs(a,h),a.g.has(h)}n.forEach=function(a,h){Pr(this),this.g.forEach(function(m,v){m.forEach(function(N){a.call(h,N,v,this)},this)},this)};function cu(a,h){Pr(a);let m=[];if(typeof h=="string")lu(a,h)&&(m=m.concat(a.g.get(rs(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)m=m.concat(a[h]);return m}n.set=function(a,h){return Pr(this),this.i=null,a=rs(this,a),lu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=cu(this,a),a.length>0?String(a[0]):h):h};function uu(a,h,m){au(a,h),m.length>0&&(a.i=null,a.g.set(rs(a,h),b(m)),a.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let v=0;v<h.length;v++){var m=h[v];const N=U(m);m=cu(this,m);for(let L=0;L<m.length;L++){let H=N;m[L]!==""&&(H+="="+U(m[L])),a.push(H)}}return this.i=a.join("&")};function hu(a){const h=new zs;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function rs(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Lg(a,h){h&&!a.j&&(Pr(a),a.i=null,a.g.forEach(function(m,v){const N=v.toLowerCase();v!=N&&(au(this,v),uu(this,N,m))},a)),a.j=h}function Mg(a,h){const m=new Rr;if(o.Image){const v=new Image;v.onload=d(Qn,m,"TestLoadImage: loaded",!0,h,v),v.onerror=d(Qn,m,"TestLoadImage: error",!1,h,v),v.onabort=d(Qn,m,"TestLoadImage: abort",!1,h,v),v.ontimeout=d(Qn,m,"TestLoadImage: timeout",!1,h,v),o.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else h(!1)}function jg(a,h){const m=new Rr,v=new AbortController,N=setTimeout(()=>{v.abort(),Qn(m,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:v.signal}).then(L=>{clearTimeout(N),L.ok?Qn(m,"TestPingServer: ok",!0,h):Qn(m,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(N),Qn(m,"TestPingServer: error",!1,h)})}function Qn(a,h,m,v,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),v(m)}catch{}}function Fg(){this.g=new Yr}function ja(a){this.i=a.Sb||null,this.h=a.ab||!1}p(ja,Jr),ja.prototype.g=function(){return new ro(this.i,this.h)};function ro(a,h){me.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(ro,me),n=ro.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,qs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Hs(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,qs(this)),this.g&&(this.readyState=3,qs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;du(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function du(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Hs(this):qs(this),this.readyState==3&&du(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Hs(this))},n.Na=function(a){this.g&&(this.response=a,Hs(this))},n.ga=function(){this.g&&Hs(this)};function Hs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,qs(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var m=h.next();!m.done;)m=m.value,a.push(m[0]+": "+m[1]),m=h.next();return a.join(`\r
`)};function qs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ro.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function fu(a){let h="";return De(a,function(m,v){h+=v,h+=":",h+=m,h+=`\r
`}),h}function Fa(a,h,m){e:{for(v in m){var v=!1;break e}v=!0}v||(m=fu(m),typeof a=="string"?m!=null&&U(m):$e(a,h,m))}function Ge(a){me.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(Ge,me);var Ug=/^https?$/i,$g=["POST","PUT"];n=Ge.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,m,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():k.g(),this.g.onreadystatechange=_(u(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(L){mu(this,L);return}if(a=m||"",m=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var N in v)m.set(N,v[N]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const L of v.keys())m.set(L,v.get(L));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(m.keys()).find(L=>L.toLowerCase()=="content-type"),N=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call($g,h,void 0)>=0)||v||N||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,H]of m)this.g.setRequestHeader(L,H);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(L){mu(this,L)}};function mu(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,pu(a),so(a)}function pu(a){a.A||(a.A=!0,ke(a,"complete"),ke(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,ke(this,"complete"),ke(this,"abort"),so(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),so(this,!0)),Ge.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?gu(this):this.Xa())},n.Xa=function(){gu(this)};function gu(a){if(a.h&&typeof i<"u"){if(a.v&&Yn(a)==4)setTimeout(a.Ca.bind(a),0);else if(ke(a,"readystatechange"),Yn(a)==4){a.h=!1;try{const L=a.ca();e:switch(L){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var m;if(!(m=h)){var v;if(v=L===0){let H=String(a.D).match(Ee)[1]||null;!H&&o.self&&o.self.location&&(H=o.self.location.protocol.slice(0,-1)),v=!Ug.test(H?H.toLowerCase():"")}m=v}if(m)ke(a,"complete"),ke(a,"success");else{a.o=6;try{var N=Yn(a)>2?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.ca()+"]",pu(a)}}finally{so(a)}}}}function so(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const m=a.g;a.g=null,h||ke(a,"ready");try{m.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Yn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return Yn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Mt(h)}};function yu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Bg(a){const h={};a=(a.g&&Yn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(E(a[v]))continue;var m=B(a[v]);const N=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const L=h[N]||[];h[N]=L,L.push(m)}Oe(h,function(v){return v.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ws(a,h,m){return m&&m.internalChannelParams&&m.internalChannelParams[a]||h}function _u(a){this.za=0,this.i=[],this.j=new Rr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ws("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ws("baseRetryDelayMs",5e3,a),this.Za=Ws("retryDelaySeedMs",1e4,a),this.Ta=Ws("forwardChannelMaxRetries",2,a),this.va=Ws("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new on(a&&a.concurrentRequestLimit),this.Ba=new Fg,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=_u.prototype,n.ka=8,n.I=1,n.connect=function(a,h,m,v){ot(0),this.W=a,this.H=h||{},m&&v!==void 0&&(this.H.OSID=m,this.H.OAID=v),this.F=this.X,this.J=Au(this,null,this.W),oo(this)};function Ua(a){if(vu(a),a.I==3){var h=a.V++,m=mt(a.J);if($e(m,"SID",a.M),$e(m,"RID",h),$e(m,"TYPE","terminate"),Gs(a,m),h=new J(a,a.j,h),h.M=2,h.A=no(mt(m)),m=!1,o.navigator&&o.navigator.sendBeacon)try{m=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!m&&o.Image&&(new Image().src=h.A,m=!0),m||(h.g=Su(h.j,null),h.g.ea(h.A)),h.F=Date.now(),We(h)}Ru(a)}function io(a){a.g&&(Ba(a),a.g.cancel(),a.g=null)}function vu(a){io(a),a.v&&(o.clearTimeout(a.v),a.v=null),ao(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function oo(a){if(!Ft(a.h)&&!a.m){a.m=!0;var h=a.Ea;q||y(),G||(q(),G=!0),g.add(h,a),a.D=0}}function zg(a,h){return ts(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Kn(u(a.Ea,a,h),Iu(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const N=new J(this,this.j,a);let L=this.o;if(this.U&&(L?(L=Ve(L),ve(L,this.U)):L=this.U),this.u!==null||this.R||(N.J=L,L=null),this.S)e:{for(var h=0,m=0;m<this.i.length;m++){t:{var v=this.i[m];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(h+=v,h>4096){h=m;break e}if(h===4096||m===this.i.length-1){h=m+1;break e}}h=1e3}else h=1e3;h=bu(this,N,h),m=mt(this.J),$e(m,"RID",a),$e(m,"CVER",22),this.G&&$e(m,"X-HTTP-Session-Id",this.G),Gs(this,m),L&&(this.R?h="headers="+U(fu(L))+"&"+h:this.u&&Fa(m,this.u,L)),an(this.h,N),this.Ra&&$e(m,"TYPE","init"),this.S?($e(m,"$req",h),$e(m,"SID","null"),N.U=!0,te(N,m,null)):te(N,m,h),this.I=2}}else this.I==3&&(a?wu(this,a):this.i.length==0||Ft(this.h)||wu(this))};function wu(a,h){var m;h?m=h.l:m=a.V++;const v=mt(a.J);$e(v,"SID",a.M),$e(v,"RID",m),$e(v,"AID",a.K),Gs(a,v),a.u&&a.o&&Fa(v,a.u,a.o),m=new J(a,a.j,m,a.D+1),a.u===null&&(m.J=a.o),h&&(a.i=h.G.concat(a.i)),h=bu(a,m,1e3),m.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),an(a.h,m),te(m,v,h)}function Gs(a,h){a.H&&De(a.H,function(m,v){$e(h,v,m)}),a.l&&De({},function(m,v){$e(h,v,m)})}function bu(a,h,m){m=Math.min(a.i.length,m);const v=a.l?u(a.l.Ka,a.l,a):null;e:{var N=a.i;let pe=-1;for(;;){const lt=["count="+m];pe==-1?m>0?(pe=N[0].g,lt.push("ofs="+pe)):pe=0:lt.push("ofs="+pe);let Be=!0;for(let pt=0;pt<m;pt++){var L=N[pt].g;const gn=N[pt].map;if(L-=pe,L<0)pe=Math.max(0,N[pt].g-100),Be=!1;else try{L="req"+L+"_"||"";try{var H=gn instanceof Map?gn:Object.entries(gn);for(const[Nr,Jn]of H){let Xn=Jn;l(Jn)&&(Xn=xt(Jn)),lt.push(L+Nr+"="+encodeURIComponent(Xn))}}catch(Nr){throw lt.push(L+"type="+encodeURIComponent("_badmap")),Nr}}catch{v&&v(gn)}}if(Be){H=lt.join("&");break e}}H=void 0}return a=a.i.splice(0,m),h.G=a,H}function Eu(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;q||y(),G||(q(),G=!0),g.add(h,a),a.A=0}}function $a(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Kn(u(a.Da,a),Iu(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Tu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Kn(u(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ot(10),io(this),Tu(this))};function Ba(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Tu(a){a.g=new J(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=mt(a.na);$e(h,"RID","rpc"),$e(h,"SID",a.M),$e(h,"AID",a.K),$e(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&$e(h,"TO",a.ia),$e(h,"TYPE","xmlhttp"),Gs(a,h),a.u&&a.o&&Fa(h,a.u,a.o),a.O&&(a.g.H=a.O);var m=a.g;a=a.ba,m.M=1,m.A=no(mt(h)),m.u=null,m.R=!0,ue(m,a)}n.Va=function(){this.C!=null&&(this.C=null,io(this),$a(this),ot(19))};function ao(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function xu(a,h){var m=null;if(a.g==h){ao(a),Ba(a),a.g=null;var v=2}else if(Nn(a.h,h))m=h.G,Sr(a.h,h),v=1;else return;if(a.I!=0){if(h.o)if(v==1){m=h.u?h.u.length:0,h=Date.now()-h.F;var N=a.D;v=Xr(),ke(v,new Zi(v,m)),oo(a)}else Eu(a);else if(N=h.m,N==3||N==0&&h.X>0||!(v==1&&zg(a,h)||v==2&&$a(a)))switch(m&&m.length>0&&(h=a.h,h.i=h.i.concat(m)),N){case 1:kr(a,5);break;case 4:kr(a,10);break;case 3:kr(a,6);break;default:kr(a,2)}}}function Iu(a,h){let m=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(m*=2),m*h}function kr(a,h){if(a.j.info("Error code "+h),h==2){var m=u(a.bb,a),v=a.Ua;const N=!v;v=new kt(v||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Me(v,"https"),no(v),N?Mg(v.toString(),m):jg(v.toString(),m)}else ot(2);a.I=0,a.l&&a.l.pa(h),Ru(a),vu(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),ot(2)):(this.j.info("Failed to ping google.com"),ot(1))};function Ru(a){if(a.I=0,a.ja=[],a.l){const h=Cr(a.h);(h.length!=0||a.i.length!=0)&&(A(a.ja,h),A(a.ja,a.i),a.h.i.length=0,b(a.i),a.i.length=0),a.l.oa()}}function Au(a,h,m){var v=m instanceof kt?mt(m):new kt(m);if(v.g!="")h&&(v.g=h+"."+v.g),pn(v,v.u);else{var N=o.location;v=N.protocol,h=h?h+"."+N.hostname:N.hostname,N=+N.port;const L=new kt(null);v&&Me(L,v),h&&(L.g=h),N&&pn(L,N),m&&(L.h=m),v=L}return m=a.G,h=a.wa,m&&h&&$e(v,m,h),$e(v,"VER",a.ka),Gs(a,v),v}function Su(a,h,m){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Ge(new ja({ab:m})):new Ge(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Cu(){}n=Cu.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function lo(){}lo.prototype.g=function(a,h){return new Ut(a,h)};function Ut(a,h){me.call(this),this.g=new _u(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!E(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!E(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new ss(this)}p(Ut,me),Ut.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ut.prototype.close=function(){Ua(this.g)},Ut.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var m={};m.__data__=a,a=m}else this.v&&(m={},m.__data__=xt(a),a=m);h.i.push(new Ar(h.Ya++,a)),h.I==3&&oo(h)},Ut.prototype.N=function(){this.g.l=null,delete this.j,Ua(this.g),delete this.g,Ut.Z.N.call(this)};function Pu(a){wt.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const m in h){a=m;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(Pu,wt);function ku(){Gn.call(this),this.status=1}p(ku,Gn);function ss(a){this.g=a}p(ss,Cu),ss.prototype.ra=function(){ke(this.g,"a")},ss.prototype.qa=function(a){ke(this.g,new Pu(a))},ss.prototype.pa=function(a){ke(this.g,new ku)},ss.prototype.oa=function(){ke(this.g,"b")},lo.prototype.createWebChannel=lo.prototype.g,Ut.prototype.send=Ut.prototype.o,Ut.prototype.open=Ut.prototype.m,Ut.prototype.close=Ut.prototype.close,Xf=function(){return new lo},Jf=function(){return Xr()},Yf=fn,Il={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},es.NO_ERROR=0,es.TIMEOUT=8,es.HTTP_ERROR=6,Co=es,x.COMPLETE="complete",Qf=x,Wn.EventType=Pt,Pt.OPEN="a",Pt.CLOSE="b",Pt.ERROR="c",Pt.MESSAGE="d",me.prototype.listen=me.prototype.J,si=Wn,Ge.prototype.listenOnce=Ge.prototype.K,Ge.prototype.getLastError=Ge.prototype.Ha,Ge.prototype.getLastErrorCode=Ge.prototype.ya,Ge.prototype.getStatus=Ge.prototype.ca,Ge.prototype.getResponseJson=Ge.prototype.La,Ge.prototype.getResponseText=Ge.prototype.la,Ge.prototype.send=Ge.prototype.ea,Ge.prototype.setWithCredentials=Ge.prototype.Fa,Kf=Ge}).apply(typeof po<"u"?po:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ps="12.12.0";function jb(n){Ps=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur=new uc("@firebase/firestore");function ls(){return Ur.logLevel}function Q(n,...e){if(Ur.logLevel<=Te.DEBUG){const t=e.map(mc);Ur.debug(`Firestore (${Ps}): ${n}`,...t)}}function Fn(n,...e){if(Ur.logLevel<=Te.ERROR){const t=e.map(mc);Ur.error(`Firestore (${Ps}): ${n}`,...t)}}function $r(n,...e){if(Ur.logLevel<=Te.WARN){const t=e.map(mc);Ur.warn(`Firestore (${Ps}): ${n}`,...t)}}function mc(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Zf(n,r,t)}function Zf(n,e,t){let r=`FIRESTORE (${Ps}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Fn(r),new Error(r)}function Se(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Zf(e,s,r)}function ce(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends Sn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Fb{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(At.UNAUTHENTICATED)))}shutdown(){}}class Ub{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class $b{constructor(e){this.t=e,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Se(this.o===void 0,42304);let r=this.i;const s=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let i=new Mn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Mn,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},l=c=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Mn)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Se(typeof r.accessToken=="string",31837,{l:r}),new em(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Se(e===null||typeof e=="string",2055,{h:e}),new At(e)}}class Bb{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=At.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class zb{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Bb(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(At.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Th{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Hb{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Se(this.o===void 0,3512);const r=i=>{i.error!=null&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,Q("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Th(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Se(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Th(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qb(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=qb(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function xe(n,e){return n<e?-1:n>e?1:0}function Rl(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return tl(s)===tl(i)?xe(s,i):tl(s)?1:-1}return xe(n.length,e.length)}const Wb=55296,Gb=57343;function tl(n){const e=n.charCodeAt(0);return e>=Wb&&e<=Gb}function Es(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh="__name__";class yn{constructor(e,t,r){t===void 0?t=0:t>e.length&&ie(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&ie(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return yn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof yn?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=yn.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return xe(e.length,t.length)}static compareSegments(e,t){const r=yn.isNumericId(e),s=yn.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?yn.extractNumericId(e).compare(yn.extractNumericId(t)):Rl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return hr.fromString(e.substring(4,e.length-2))}}class je extends yn{construct(e,t,r){return new je(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(j.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new je(t)}static emptyPath(){return new je([])}}const Kb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Et extends yn{construct(e,t,r){return new Et(e,t,r)}static isValidIdentifier(e){return Kb.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Et.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===xh}static keyField(){return new Et([xh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(j.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new W(j.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new W(j.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new W(j.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Et(t)}static emptyPath(){return new Et([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.path=e}static fromPath(e){return new se(je.fromString(e))}static fromName(e){return new se(je.fromString(e).popFirst(5))}static empty(){return new se(je.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&je.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return je.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new se(new je(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(n,e,t){if(!t)throw new W(j.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Qb(n,e,t,r){if(e===!0&&r===!0)throw new W(j.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ih(n){if(!se.isDocumentKey(n))throw new W(j.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Rh(n){if(se.isDocumentKey(n))throw new W(j.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function nm(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ya(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ie(12329,{type:typeof n})}function Br(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(j.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ya(n);throw new W(j.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,e){const t={typeString:n};return e&&(t.value=e),t}function Ui(n,e){if(!nm(n))throw new W(j.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new W(j.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah=-62135596800,Sh=1e6;class ze{static now(){return ze.fromMillis(Date.now())}static fromDate(e){return ze.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Sh);return new ze(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Ah)throw new W(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Sh}_compareTo(e){return this.seconds===e.seconds?xe(this.nanoseconds,e.nanoseconds):xe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ze._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ui(e,ze._jsonSchema))return new ze(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Ah;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ze._jsonSchemaVersion="firestore/timestamp/1.0",ze._jsonSchema={type:nt("string",ze._jsonSchemaVersion),seconds:nt("number"),nanoseconds:nt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{static fromTimestamp(e){return new ae(e)}static min(){return new ae(new ze(0,0))}static max(){return new ae(new ze(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii=-1;function Yb(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=ae.fromTimestamp(r===1e9?new ze(t+1,0):new ze(t,r));return new pr(s,se.empty(),e)}function Jb(n){return new pr(n.readTime,n.key,Ii)}class pr{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new pr(ae.min(),se.empty(),Ii)}static max(){return new pr(ae.max(),se.empty(),Ii)}}function Xb(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=se.comparator(n.documentKey,e.documentKey),t!==0?t:xe(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zb="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class e0{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ks(n){if(n.code!==j.FAILED_PRECONDITION||n.message!==Zb)throw n;Q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ie(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new F(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof F?t:F.resolve(t)}catch(t){return F.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):F.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):F.reject(t)}static resolve(e){return new F(((t,r)=>{t(e)}))}static reject(e){return new F(((t,r)=>{r(e)}))}static waitFor(e){return new F(((t,r)=>{let s=0,i=0,o=!1;e.forEach((l=>{++s,l.next((()=>{++i,o&&i===s&&t()}),(c=>r(c)))})),o=!0,i===s&&t()}))}static or(e){let t=F.resolve(!1);for(const r of e)t=t.next((s=>s?F.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new F(((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const u=c;t(e[u]).next((d=>{o[u]=d,++l,l===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,t){return new F(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function t0(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ns(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}_a.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc=-1;function $i(n){return n==null}function zo(n){return n===0&&1/n==-1/0}function n0(n){return typeof n=="number"&&Number.isInteger(n)&&!zo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rm="";function r0(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Ch(e)),e=s0(n.get(t),e);return Ch(e)}function s0(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case rm:t+="";break;default:t+=i}}return t}function Ch(n){return n+rm+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ph(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function xr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function sm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e,t){this.comparator=e,this.root=t||bt.EMPTY}insert(e,t){return new He(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,bt.BLACK,null,null))}remove(e){return new He(this.comparator,this.root.remove(e,this.comparator).copy(null,null,bt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new go(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new go(this.root,e,this.comparator,!1)}getReverseIterator(){return new go(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new go(this.root,e,this.comparator,!0)}}class go{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class bt{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??bt.RED,this.left=s??bt.EMPTY,this.right=i??bt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new bt(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return bt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return bt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,bt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,bt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ie(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ie(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ie(27949);return e+(this.isRed()?0:1)}}bt.EMPTY=null,bt.RED=!0,bt.BLACK=!1;bt.EMPTY=new class{constructor(){this.size=0}get key(){throw ie(57766)}get value(){throw ie(16141)}get color(){throw ie(16727)}get left(){throw ie(29726)}get right(){throw ie(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new bt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.comparator=e,this.data=new He(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new kh(this.data.getIterator())}getIteratorFrom(e){return new kh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ht)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ht(this.comparator);return t.data=e,t}}class kh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this.fields=e,e.sort(Et.comparator)}static empty(){return new zt([])}unionWith(e){let t=new ht(Et.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new zt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Es(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new im("Invalid base64 string: "+i):i}})(e);return new Tt(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Tt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return xe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Tt.EMPTY_BYTE_STRING=new Tt("");const i0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function gr(n){if(Se(!!n,39018),typeof n=="string"){let e=0;const t=i0.exec(n);if(Se(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Qe(n.seconds),nanos:Qe(n.nanos)}}function Qe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function yr(n){return typeof n=="string"?Tt.fromBase64String(n):Tt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const om="server_timestamp",am="__type__",lm="__previous_value__",cm="__local_write_time__";function yc(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[am])==null?void 0:r.stringValue)===om}function va(n){const e=n.mapValue.fields[lm];return yc(e)?va(e):e}function Ri(n){const e=gr(n.mapValue.fields[cm].timestampValue);return new ze(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o0{constructor(e,t,r,s,i,o,l,c,u,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u,this.isUsingEmulator=d,this.apiKey=p}}const Ho="(default)";class Ai{constructor(e,t){this.projectId=e,this.database=t||Ho}static empty(){return new Ai("","")}get isDefaultDatabase(){return this.database===Ho}isEqual(e){return e instanceof Ai&&e.projectId===this.projectId&&e.database===this.database}}function a0(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new W(j.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ai(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const um="__type__",l0="__max__",yo={mapValue:{}},hm="__vector__",qo="value";function _r(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?yc(n)?4:u0(n)?9007199254740991:c0(n)?10:11:ie(28295,{value:n})}function In(n,e){if(n===e)return!0;const t=_r(n);if(t!==_r(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ri(n).isEqual(Ri(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=gr(s.timestampValue),l=gr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return yr(s.bytesValue).isEqual(yr(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return Qe(s.geoPointValue.latitude)===Qe(i.geoPointValue.latitude)&&Qe(s.geoPointValue.longitude)===Qe(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return Qe(s.integerValue)===Qe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Qe(s.doubleValue),l=Qe(i.doubleValue);return o===l?zo(o)===zo(l):isNaN(o)&&isNaN(l)}return!1})(n,e);case 9:return Es(n.arrayValue.values||[],e.arrayValue.values||[],In);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Ph(o)!==Ph(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!In(o[c],l[c])))return!1;return!0})(n,e);default:return ie(52216,{left:n})}}function Si(n,e){return(n.values||[]).find((t=>In(t,e)))!==void 0}function Ts(n,e){if(n===e)return 0;const t=_r(n),r=_r(e);if(t!==r)return xe(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return xe(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const l=Qe(i.integerValue||i.doubleValue),c=Qe(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(n,e);case 3:return Nh(n.timestampValue,e.timestampValue);case 4:return Nh(Ri(n),Ri(e));case 5:return Rl(n.stringValue,e.stringValue);case 6:return(function(i,o){const l=yr(i),c=yr(o);return l.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const l=i.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const d=xe(l[u],c[u]);if(d!==0)return d}return xe(l.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const l=xe(Qe(i.latitude),Qe(o.latitude));return l!==0?l:xe(Qe(i.longitude),Qe(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Dh(n.arrayValue,e.arrayValue);case 10:return(function(i,o){var _,b,A,P;const l=i.fields||{},c=o.fields||{},u=(_=l[qo])==null?void 0:_.arrayValue,d=(b=c[qo])==null?void 0:b.arrayValue,p=xe(((A=u==null?void 0:u.values)==null?void 0:A.length)||0,((P=d==null?void 0:d.values)==null?void 0:P.length)||0);return p!==0?p:Dh(u,d)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===yo.mapValue&&o===yo.mapValue)return 0;if(i===yo.mapValue)return 1;if(o===yo.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),u=o.fields||{},d=Object.keys(u);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const _=Rl(c[p],d[p]);if(_!==0)return _;const b=Ts(l[c[p]],u[d[p]]);if(b!==0)return b}return xe(c.length,d.length)})(n.mapValue,e.mapValue);default:throw ie(23264,{he:t})}}function Nh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return xe(n,e);const t=gr(n),r=gr(e),s=xe(t.seconds,r.seconds);return s!==0?s:xe(t.nanos,r.nanos)}function Dh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Ts(t[s],r[s]);if(i)return i}return xe(t.length,r.length)}function xs(n){return Al(n)}function Al(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=gr(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return yr(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return se.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Al(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Al(t.fields[o])}`;return s+"}"})(n.mapValue):ie(61005,{value:n})}function Po(n){switch(_r(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=va(n);return e?16+Po(e):16;case 5:return 2*n.stringValue.length;case 6:return yr(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Po(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return xr(r.fields,((i,o)=>{s+=i.length+Po(o)})),s})(n.mapValue);default:throw ie(13486,{value:n})}}function Vh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Sl(n){return!!n&&"integerValue"in n}function _c(n){return!!n&&"arrayValue"in n}function Oh(n){return!!n&&"nullValue"in n}function Lh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ko(n){return!!n&&"mapValue"in n}function c0(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[um])==null?void 0:r.stringValue)===hm}function hi(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return xr(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=hi(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=hi(n.arrayValue.values[t]);return e}return{...n}}function u0(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===l0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.value=e}static empty(){return new Nt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ko(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=hi(t)}setAll(e){let t=Et.emptyPath(),r={},s=[];e.forEach(((o,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,r,s),r={},s=[],t=l.popLast()}o?r[l.lastSegment()]=hi(o):s.push(l.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ko(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return In(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ko(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){xr(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Nt(hi(this.value))}}function dm(n){const e=[];return xr(n.fields,((t,r)=>{const s=new Et([t]);if(ko(r)){const i=dm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new zt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t,r,s,i,o,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new yt(e,0,ae.min(),ae.min(),ae.min(),Nt.empty(),0)}static newFoundDocument(e,t,r,s){return new yt(e,1,t,ae.min(),r,s,0)}static newNoDocument(e,t){return new yt(e,2,t,ae.min(),ae.min(),Nt.empty(),0)}static newUnknownDocument(e,t){return new yt(e,3,t,ae.min(),ae.min(),Nt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ae.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Nt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ae.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof yt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new yt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(e,t){this.position=e,this.inclusive=t}}function Mh(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=se.comparator(se.fromName(o.referenceValue),t.key):r=Ts(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function jh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!In(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(e,t="asc"){this.field=e,this.dir=t}}function h0(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{}class tt extends fm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new f0(e,t,r):t==="array-contains"?new g0(e,r):t==="in"?new y0(e,r):t==="not-in"?new _0(e,r):t==="array-contains-any"?new v0(e,r):new tt(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new m0(e,r):new p0(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Ts(t,this.value)):t!==null&&_r(this.value)===_r(t)&&this.matchesComparison(Ts(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ie(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class hn extends fm{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new hn(e,t)}matches(e){return mm(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function mm(n){return n.op==="and"}function pm(n){return d0(n)&&mm(n)}function d0(n){for(const e of n.filters)if(e instanceof hn)return!1;return!0}function Cl(n){if(n instanceof tt)return n.field.canonicalString()+n.op.toString()+xs(n.value);if(pm(n))return n.filters.map((e=>Cl(e))).join(",");{const e=n.filters.map((t=>Cl(t))).join(",");return`${n.op}(${e})`}}function gm(n,e){return n instanceof tt?(function(r,s){return s instanceof tt&&r.op===s.op&&r.field.isEqual(s.field)&&In(r.value,s.value)})(n,e):n instanceof hn?(function(r,s){return s instanceof hn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,l)=>i&&gm(o,s.filters[l])),!0):!1})(n,e):void ie(19439)}function ym(n){return n instanceof tt?(function(t){return`${t.field.canonicalString()} ${t.op} ${xs(t.value)}`})(n):n instanceof hn?(function(t){return t.op.toString()+" {"+t.getFilters().map(ym).join(" ,")+"}"})(n):"Filter"}class f0 extends tt{constructor(e,t,r){super(e,t,r),this.key=se.fromName(r.referenceValue)}matches(e){const t=se.comparator(e.key,this.key);return this.matchesComparison(t)}}class m0 extends tt{constructor(e,t){super(e,"in",t),this.keys=_m("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class p0 extends tt{constructor(e,t){super(e,"not-in",t),this.keys=_m("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function _m(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>se.fromName(r.referenceValue)))}class g0 extends tt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return _c(t)&&Si(t.arrayValue,this.value)}}class y0 extends tt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Si(this.value.arrayValue,t)}}class _0 extends tt{constructor(e,t){super(e,"not-in",t)}matches(e){if(Si(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Si(this.value.arrayValue,t)}}class v0 extends tt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!_c(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Si(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w0{constructor(e,t=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.Te=null}}function Fh(n,e=null,t=[],r=[],s=null,i=null,o=null){return new w0(n,e,t,r,s,i,o)}function vc(n){const e=ce(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Cl(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),$i(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>xs(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>xs(r))).join(",")),e.Te=t}return e.Te}function wc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!h0(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!gm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!jh(n.startAt,e.startAt)&&jh(n.endAt,e.endAt)}function Pl(n){return se.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t=null,r=[],s=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function b0(n,e,t,r,s,i,o,l){return new Bi(n,e,t,r,s,i,o,l)}function vm(n){return new Bi(n)}function Uh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function E0(n){return se.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function wm(n){return n.collectionGroup!==null}function di(n){const e=ce(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ht(Et.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((u=>{u.isInequality()&&(l=l.add(u.field))}))})),l})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Go(i,r))})),t.has(Et.keyField().canonicalString())||e.Ee.push(new Go(Et.keyField(),r))}return e.Ee}function wn(n){const e=ce(n);return e.Ie||(e.Ie=T0(e,di(n))),e.Ie}function T0(n,e){if(n.limitType==="F")return Fh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Go(s.field,i)}));const t=n.endAt?new Wo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Wo(n.startAt.position,n.startAt.inclusive):null;return Fh(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function kl(n,e){const t=n.filters.concat([e]);return new Bi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Nl(n,e,t){return new Bi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function wa(n,e){return wc(wn(n),wn(e))&&n.limitType===e.limitType}function bm(n){return`${vc(wn(n))}|lt:${n.limitType}`}function cs(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>ym(s))).join(", ")}]`),$i(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>xs(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>xs(s))).join(",")),`Target(${r})`})(wn(n))}; limitType=${n.limitType})`}function ba(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):se.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of di(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,l,c){const u=Mh(o,l,c);return o.inclusive?u<=0:u<0})(r.startAt,di(r),s)||r.endAt&&!(function(o,l,c){const u=Mh(o,l,c);return o.inclusive?u>=0:u>0})(r.endAt,di(r),s))})(n,e)}function x0(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Em(n){return(e,t)=>{let r=!1;for(const s of di(n)){const i=I0(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function I0(n,e,t){const r=n.field.isKeyField()?se.comparator(e.key,t.key):(function(i,o,l){const c=o.data.field(i),u=l.data.field(i);return c!==null&&u!==null?Ts(c,u):ie(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ie(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){xr(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return sm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R0=new He(se.comparator);function Un(){return R0}const Tm=new He(se.comparator);function ii(...n){let e=Tm;for(const t of n)e=e.insert(t.key,t);return e}function xm(n){let e=Tm;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Lr(){return fi()}function Im(){return fi()}function fi(){return new Gr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const A0=new He(se.comparator),S0=new ht(se.comparator);function Ie(...n){let e=S0;for(const t of n)e=e.add(t);return e}const C0=new ht(xe);function P0(){return C0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:zo(e)?"-0":e}}function Rm(n){return{integerValue:""+n}}function k0(n,e){return n0(e)?Rm(e):bc(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(){this._=void 0}}function N0(n,e,t){return n instanceof Ko?(function(s,i){const o={fields:{[am]:{stringValue:om},[cm]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&yc(i)&&(i=va(i)),i&&(o.fields[lm]=i),{mapValue:o}})(t,e):n instanceof Ci?Sm(n,e):n instanceof Pi?Cm(n,e):(function(s,i){const o=Am(s,i),l=$h(o)+$h(s.Ae);return Sl(o)&&Sl(s.Ae)?Rm(l):bc(s.serializer,l)})(n,e)}function D0(n,e,t){return n instanceof Ci?Sm(n,e):n instanceof Pi?Cm(n,e):t}function Am(n,e){return n instanceof Qo?(function(r){return Sl(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class Ko extends Ea{}class Ci extends Ea{constructor(e){super(),this.elements=e}}function Sm(n,e){const t=Pm(e);for(const r of n.elements)t.some((s=>In(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Pi extends Ea{constructor(e){super(),this.elements=e}}function Cm(n,e){let t=Pm(e);for(const r of n.elements)t=t.filter((s=>!In(s,r)));return{arrayValue:{values:t}}}class Qo extends Ea{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function $h(n){return Qe(n.integerValue||n.doubleValue)}function Pm(n){return _c(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function V0(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Ci&&s instanceof Ci||r instanceof Pi&&s instanceof Pi?Es(r.elements,s.elements,In):r instanceof Qo&&s instanceof Qo?In(r.Ae,s.Ae):r instanceof Ko&&s instanceof Ko})(n.transform,e.transform)}class O0{constructor(e,t){this.version=e,this.transformResults=t}}class Dt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Dt}static exists(e){return new Dt(void 0,e)}static updateTime(e){return new Dt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function No(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ta{}function km(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ec(n.key,Dt.none()):new zi(n.key,n.data,Dt.none());{const t=n.data,r=Nt.empty();let s=new ht(Et.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Ir(n.key,r,new zt(s.toArray()),Dt.none())}}function L0(n,e,t){n instanceof zi?(function(s,i,o){const l=s.value.clone(),c=zh(s.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(n,e,t):n instanceof Ir?(function(s,i,o){if(!No(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=zh(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Nm(s)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function mi(n,e,t,r){return n instanceof zi?(function(i,o,l,c){if(!No(i.precondition,o))return l;const u=i.value.clone(),d=Hh(i.fieldTransforms,c,o);return u.setAll(d),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(n,e,t,r):n instanceof Ir?(function(i,o,l,c){if(!No(i.precondition,o))return l;const u=Hh(i.fieldTransforms,c,o),d=o.data;return d.setAll(Nm(i)),d.setAll(u),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,l){return No(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l})(n,e,t)}function M0(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Am(r.transform,s||null);i!=null&&(t===null&&(t=Nt.empty()),t.set(r.field,i))}return t||null}function Bh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Es(r,s,((i,o)=>V0(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class zi extends Ta{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ir extends Ta{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Nm(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function zh(n,e,t){const r=new Map;Se(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,D0(o,l,t[s]))}return r}function Hh(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,N0(i,o,e))}return r}class Ec extends Ta{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Dm extends Ta{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j0{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&L0(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=mi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=mi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Im();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=t.has(s.key)?null:l;const c=km(o,l);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(ae.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ie())}isEqual(e){return this.batchId===e.batchId&&Es(this.mutations,e.mutations,((t,r)=>Bh(t,r)))&&Es(this.baseMutations,e.baseMutations,((t,r)=>Bh(t,r)))}}class Tc{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Se(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return A0})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Tc(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F0{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U0{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,Ae;function Vm(n){switch(n){case j.OK:return ie(64938);case j.CANCELLED:case j.UNKNOWN:case j.DEADLINE_EXCEEDED:case j.RESOURCE_EXHAUSTED:case j.INTERNAL:case j.UNAVAILABLE:case j.UNAUTHENTICATED:return!1;case j.INVALID_ARGUMENT:case j.NOT_FOUND:case j.ALREADY_EXISTS:case j.PERMISSION_DENIED:case j.FAILED_PRECONDITION:case j.ABORTED:case j.OUT_OF_RANGE:case j.UNIMPLEMENTED:case j.DATA_LOSS:return!0;default:return ie(15467,{code:n})}}function Om(n){if(n===void 0)return Fn("GRPC error has no .code"),j.UNKNOWN;switch(n){case et.OK:return j.OK;case et.CANCELLED:return j.CANCELLED;case et.UNKNOWN:return j.UNKNOWN;case et.DEADLINE_EXCEEDED:return j.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return j.RESOURCE_EXHAUSTED;case et.INTERNAL:return j.INTERNAL;case et.UNAVAILABLE:return j.UNAVAILABLE;case et.UNAUTHENTICATED:return j.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return j.INVALID_ARGUMENT;case et.NOT_FOUND:return j.NOT_FOUND;case et.ALREADY_EXISTS:return j.ALREADY_EXISTS;case et.PERMISSION_DENIED:return j.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return j.FAILED_PRECONDITION;case et.ABORTED:return j.ABORTED;case et.OUT_OF_RANGE:return j.OUT_OF_RANGE;case et.UNIMPLEMENTED:return j.UNIMPLEMENTED;case et.DATA_LOSS:return j.DATA_LOSS;default:return ie(39323,{code:n})}}(Ae=et||(et={}))[Ae.OK=0]="OK",Ae[Ae.CANCELLED=1]="CANCELLED",Ae[Ae.UNKNOWN=2]="UNKNOWN",Ae[Ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ae[Ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ae[Ae.NOT_FOUND=5]="NOT_FOUND",Ae[Ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ae[Ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ae[Ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ae[Ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ae[Ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ae[Ae.ABORTED=10]="ABORTED",Ae[Ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ae[Ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ae[Ae.INTERNAL=13]="INTERNAL",Ae[Ae.UNAVAILABLE=14]="UNAVAILABLE",Ae[Ae.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $0(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B0=new hr([4294967295,4294967295],0);function qh(n){const e=$0().encode(n),t=new Gf;return t.update(e),new Uint8Array(t.digest())}function Wh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new hr([t,r],0),new hr([s,i],0)]}class xc{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new oi(`Invalid padding: ${t}`);if(r<0)throw new oi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new oi(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new oi(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=hr.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(hr.fromNumber(r)));return s.compare(B0)===1&&(s=new hr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=qh(e),[r,s]=Wh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new xc(i,s,t);return r.forEach((l=>o.insert(l))),o}insert(e){if(this.ge===0)return;const t=qh(e),[r,s]=Wh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class oi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Hi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new xa(ae.min(),s,new He(xe),Un(),Ie())}}class Hi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Hi(r,t,Ie(),Ie(),Ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Lm{constructor(e,t){this.targetId=e,this.Ce=t}}class Mm{constructor(e,t,r=Tt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Gh{constructor(){this.ve=0,this.Fe=Kh(),this.Me=Tt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Ie(),t=Ie(),r=Ie();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:ie(38017,{changeType:i})}})),new Hi(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Kh()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,Se(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class z0{constructor(e){this.Ge=e,this.ze=new Map,this.je=Un(),this.Je=_o(),this.He=_o(),this.Ze=new He(xe)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:ie(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Pl(i))if(r===0){const o=new se(i.path);this.et(t,o,yt.newNoDocument(o,ae.min()))}else Se(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const l=this.ut(e),c=l?this.ct(l,e,o):1;if(c!==0){this.it(t);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,u)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,l;try{o=yr(r).toUint8Array()}catch(c){if(c instanceof im)return $r("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new xc(o,s,i)}catch(c){return $r(c instanceof oi?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const l=this.ot(o);if(l){if(i.current&&Pl(l.target)){const c=new se(l.target.path);this.Et(c).has(o)||this.It(o,c)||this.et(o,c,yt.newNoDocument(c,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let r=Ie();this.He.forEach(((i,o)=>{let l=!0;o.forEachWhile((c=>{const u=this.ot(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new xa(e,t,this.Ze,this.je,r);return this.je=Un(),this.Je=_o(),this.He=_o(),this.Ze=new He(xe),s}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Gh,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ht(xe),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ht(xe),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||Q("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Gh),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function _o(){return new He(se.comparator)}function Kh(){return new He(se.comparator)}const H0={asc:"ASCENDING",desc:"DESCENDING"},q0={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},W0={and:"AND",or:"OR"};class G0{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Dl(n,e){return n.useProto3Json||$i(e)?e:{value:e}}function Yo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function jm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function K0(n,e){return Yo(n,e.toTimestamp())}function Ht(n){return Se(!!n,49232),ae.fromTimestamp((function(t){const r=gr(t);return new ze(r.seconds,r.nanos)})(n))}function Ic(n,e){return Vl(n,e).canonicalString()}function Vl(n,e){const t=(function(s){return new je(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Fm(n){const e=je.fromString(n);return Se(qm(e),10190,{key:e.toString()}),e}function Jo(n,e){return Ic(n.databaseId,e.path)}function pi(n,e){const t=Fm(e);if(t.get(1)!==n.databaseId.projectId)throw new W(j.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(j.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new se($m(t))}function Um(n,e){return Ic(n.databaseId,e)}function Q0(n){const e=Fm(n);return e.length===4?je.emptyPath():$m(e)}function Ol(n){return new je(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function $m(n){return Se(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Qh(n,e,t){return{name:Jo(n,e),fields:t.value.mapValue.fields}}function Y0(n,e){return"found"in e?(function(r,s){Se(!!s.found,43571),s.found.name,s.found.updateTime;const i=pi(r,s.found.name),o=Ht(s.found.updateTime),l=s.found.createTime?Ht(s.found.createTime):ae.min(),c=new Nt({mapValue:{fields:s.found.fields}});return yt.newFoundDocument(i,o,l,c)})(n,e):"missing"in e?(function(r,s){Se(!!s.missing,3894),Se(!!s.readTime,22933);const i=pi(r,s.missing),o=Ht(s.readTime);return yt.newNoDocument(i,o)})(n,e):ie(7234,{result:e})}function J0(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:ie(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(u,d){return u.useProto3Json?(Se(d===void 0||typeof d=="string",58123),Tt.fromBase64String(d||"")):(Se(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Tt.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&(function(u){const d=u.code===void 0?j.UNKNOWN:Om(u.code);return new W(d,u.message||"")})(o);t=new Mm(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=pi(n,r.document.name),i=Ht(r.document.updateTime),o=r.document.createTime?Ht(r.document.createTime):ae.min(),l=new Nt({mapValue:{fields:r.document.fields}}),c=yt.newFoundDocument(s,i,o,l),u=r.targetIds||[],d=r.removedTargetIds||[];t=new Do(u,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=pi(n,r.document),i=r.readTime?Ht(r.readTime):ae.min(),o=yt.newNoDocument(s,i),l=r.removedTargetIds||[];t=new Do([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=pi(n,r.document),i=r.removedTargetIds||[];t=new Do([],i,s,null)}else{if(!("filter"in e))return ie(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new U0(s,i),l=r.targetId;t=new Lm(l,o)}}return t}function Bm(n,e){let t;if(e instanceof zi)t={update:Qh(n,e.key,e.value)};else if(e instanceof Ec)t={delete:Jo(n,e.key)};else if(e instanceof Ir)t={update:Qh(n,e.key,e.data),updateMask:oE(e.fieldMask)};else{if(!(e instanceof Dm))return ie(16599,{dt:e.type});t={verify:Jo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const l=o.transform;if(l instanceof Ko)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ci)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Pi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Qo)return{fieldPath:o.field.canonicalString(),increment:l.Ae};throw ie(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:K0(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ie(27497)})(n,e.precondition)),t}function X0(n,e){return n&&n.length>0?(Se(e!==void 0,14353),n.map((t=>(function(s,i){let o=s.updateTime?Ht(s.updateTime):Ht(i);return o.isEqual(ae.min())&&(o=Ht(i)),new O0(o,s.transformResults||[])})(t,e)))):[]}function Z0(n,e){return{documents:[Um(n,e.path)]}}function eE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Um(n,s);const i=(function(u){if(u.length!==0)return Hm(hn.create(u,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(u){if(u.length!==0)return u.map((d=>(function(_){return{field:us(_.field),direction:rE(_.dir)}})(d)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=Dl(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{ft:t,parent:s}}function tE(n){let e=Q0(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Se(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(p){const _=zm(p);return _ instanceof hn&&pm(_)?_.getFilters():[_]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((_=>(function(A){return new Go(hs(A.field),(function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(A.direction))})(_)))})(t.orderBy));let l=null;t.limit&&(l=(function(p){let _;return _=typeof p=="object"?p.value:p,$i(_)?null:_})(t.limit));let c=null;t.startAt&&(c=(function(p){const _=!!p.before,b=p.values||[];return new Wo(b,_)})(t.startAt));let u=null;return t.endAt&&(u=(function(p){const _=!p.before,b=p.values||[];return new Wo(b,_)})(t.endAt)),b0(e,s,o,i,l,"F",c,u)}function nE(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ie(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function zm(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=hs(t.unaryFilter.field);return tt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=hs(t.unaryFilter.field);return tt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=hs(t.unaryFilter.field);return tt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=hs(t.unaryFilter.field);return tt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ie(61313);default:return ie(60726)}})(n):n.fieldFilter!==void 0?(function(t){return tt.create(hs(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ie(58110);default:return ie(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return hn.create(t.compositeFilter.filters.map((r=>zm(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ie(1026)}})(t.compositeFilter.op))})(n):ie(30097,{filter:n})}function rE(n){return H0[n]}function sE(n){return q0[n]}function iE(n){return W0[n]}function us(n){return{fieldPath:n.canonicalString()}}function hs(n){return Et.fromServerFormat(n.fieldPath)}function Hm(n){return n instanceof tt?(function(t){if(t.op==="=="){if(Lh(t.value))return{unaryFilter:{field:us(t.field),op:"IS_NAN"}};if(Oh(t.value))return{unaryFilter:{field:us(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Lh(t.value))return{unaryFilter:{field:us(t.field),op:"IS_NOT_NAN"}};if(Oh(t.value))return{unaryFilter:{field:us(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:us(t.field),op:sE(t.op),value:t.value}}})(n):n instanceof hn?(function(t){const r=t.getFilters().map((s=>Hm(s)));return r.length===1?r[0]:{compositeFilter:{op:iE(t.op),filters:r}}})(n):ie(54877,{filter:n})}function oE(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function qm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Wm(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,t,r,s,i=ae.min(),o=ae.min(),l=Tt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new lr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{constructor(e){this.yt=e}}function lE(n){const e=tE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Nl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cE{constructor(){this.bn=new uE}addToCollectionParentIndex(e,t){return this.bn.add(t),F.resolve()}getCollectionParents(e,t){return F.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return F.resolve()}deleteFieldIndex(e,t){return F.resolve()}deleteAllFieldIndexes(e){return F.resolve()}createTargetIndexes(e,t){return F.resolve()}getDocumentsMatchingTarget(e,t){return F.resolve(null)}getIndexType(e,t){return F.resolve(0)}getFieldIndexes(e,t){return F.resolve([])}getNextCollectionGroupToUpdate(e){return F.resolve(null)}getMinOffset(e,t){return F.resolve(pr.min())}getMinOffsetFromCollectionGroup(e,t){return F.resolve(pr.min())}updateCollectionGroup(e,t,r){return F.resolve()}updateIndexEntries(e,t){return F.resolve()}}class uE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ht(je.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ht(je.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Gm=41943040;class jt{static withCacheSize(e){return new jt(e,jt.DEFAULT_COLLECTION_PERCENTILE,jt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */jt.DEFAULT_COLLECTION_PERCENTILE=10,jt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,jt.DEFAULT=new jt(Gm,jt.DEFAULT_COLLECTION_PERCENTILE,jt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),jt.DISABLED=new jt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Is(0)}static ar(){return new Is(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh="LruGarbageCollector",hE=1048576;function Xh([n,e],[t,r]){const s=xe(n,t);return s===0?xe(e,r):s}class dE{constructor(e){this.Pr=e,this.buffer=new ht(Xh),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Xh(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class fE{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){Q(Jh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ns(t)?Q(Jh,"Ignoring IndexedDB error during garbage collection: ",t):await ks(t)}await this.Ar(3e5)}))}}class mE{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return F.resolve(_a.ce);const r=new dE(t);return this.Vr.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(Q("LruGarbageCollector","Garbage collection skipped; disabled"),F.resolve(Yh)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(Q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Yh):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,o,l,c,u;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(Q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,l=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(u=Date.now(),ls()<=Te.DEBUG&&Q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(l-o)+`ms
	Removed ${i} targets in `+(c-l)+`ms
	Removed ${p} documents in `+(u-c)+`ms
Total Duration: ${u-d}ms`),F.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function pE(n,e){return new mE(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(){this.changes=new Gr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,yt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?F.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _E{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&mi(r.mutation,s,zt.empty(),ze.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Ie()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Ie()){const s=Lr();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=ii();return i.forEach(((l,c)=>{o=o.insert(l,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=Lr();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Ie())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,l)=>{t.set(o,l)}))}))}computeViews(e,t,r,s){let i=Un();const o=fi(),l=(function(){return fi()})();return t.forEach(((c,u)=>{const d=r.get(u.key);s.has(u.key)&&(d===void 0||d.mutation instanceof Ir)?i=i.insert(u.key,u):d!==void 0?(o.set(u.key,d.mutation.getFieldMask()),mi(d.mutation,u,d.mutation.getFieldMask(),ze.now())):o.set(u.key,zt.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((u,d)=>o.set(u,d))),t.forEach(((u,d)=>l.set(u,new yE(d,o.get(u)??null)))),l)))}recalculateAndSaveOverlays(e,t){const r=fi();let s=new He(((o,l)=>o-l)),i=Ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const l of o)l.keys().forEach((c=>{const u=t.get(c);if(u===null)return;let d=r.get(c)||zt.empty();d=l.applyToLocalView(u,d),r.set(c,d);const p=(s.get(l.batchId)||Ie()).add(c);s=s.insert(l.batchId,p)}))})).next((()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,d=c.value,p=Im();d.forEach((_=>{if(!i.has(_)){const b=km(t.get(_),r.get(_));b!==null&&p.set(_,b),i=i.add(_)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return F.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return E0(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):wm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):F.resolve(Lr());let l=Ii,c=i;return o.next((u=>F.forEach(u,((d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?F.resolve():this.remoteDocumentCache.getEntry(e,d).next((_=>{c=c.insert(d,_)}))))).next((()=>this.populateOverlays(e,u,i))).next((()=>this.computeViews(e,c,u,Ie()))).next((d=>({batchId:l,changes:xm(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new se(t)).next((r=>{let s=ii();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=ii();return this.indexManager.getCollectionParents(e,i).next((l=>F.forEach(l,(c=>{const u=(function(p,_){return new Bi(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,r,s).next((d=>{d.forEach(((p,_)=>{o=o.insert(p,_)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((c,u)=>{const d=u.getKey();o.get(d)===null&&(o=o.insert(d,yt.newInvalidDocument(d)))}));let l=ii();return o.forEach(((c,u)=>{const d=i.get(c);d!==void 0&&mi(d.mutation,u,zt.empty(),ze.now()),ba(t,u)&&(l=l.insert(c,u))})),l}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return F.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Ht(s.createTime)}})(t)),F.resolve()}getNamedQuery(e,t){return F.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:lE(s.bundledQuery),readTime:Ht(s.readTime)}})(t)),F.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wE{constructor(){this.overlays=new He(se.comparator),this.Lr=new Map}getOverlay(e,t){return F.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Lr();return F.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),F.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(r)),F.resolve()}getOverlaysForCollection(e,t,r){const s=Lr(),i=t.length+1,o=new se(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return F.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new He(((u,d)=>u-d));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>r){let d=i.get(u.largestBatchId);d===null&&(d=Lr(),i=i.insert(u.largestBatchId,d)),d.set(u.getKey(),u)}}const l=Lr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((u,d)=>l.set(u,d))),!(l.size()>=s)););return F.resolve(l)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new F0(t,r));let i=this.Lr.get(t);i===void 0&&(i=Ie(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(){this.sessionToken=Tt.EMPTY_BYTE_STRING}getSessionToken(e){return F.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(){this.kr=new ht(gt.qr),this.Kr=new ht(gt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new gt(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new gt(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new se(new je([])),r=new gt(t,e),s=new gt(t,e+1),i=[];return this.Kr.forEachInRange([r,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new se(new je([])),r=new gt(t,e),s=new gt(t,e+1);let i=Ie();return this.Kr.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new gt(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class gt{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return se.comparator(e.key,t.key)||xe(e.Jr,t.Jr)}static Ur(e,t){return xe(e.Jr,t.Jr)||se.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ht(gt.qr)}checkEmpty(e){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new j0(i,t,r,s);this.mutationQueue.push(o);for(const l of s)this.Hr=this.Hr.add(new gt(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return F.resolve(o)}lookupMutationBatch(e,t){return F.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return F.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?gc:this.Yn-1)}getAllMutationBatches(e){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new gt(t,0),s=new gt(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],(o=>{const l=this.Zr(o.Jr);i.push(l)})),F.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ht(xe);return t.forEach((s=>{const i=new gt(s,0),o=new gt(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(l=>{r=r.add(l.Jr)}))})),F.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;se.isDocumentKey(i)||(i=i.child(""));const o=new gt(new se(i),0);let l=new ht(xe);return this.Hr.forEachWhile((c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(l=l.add(c.Jr)),!0)}),o),F.resolve(this.Yr(l))}Yr(e){const t=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Se(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return F.forEach(t.mutations,(s=>{const i=new gt(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=r}))}nr(e){}containsKey(e,t){const r=new gt(t,0),s=this.Hr.firstAfterOrEqual(r);return F.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,F.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e){this.ti=e,this.docs=(function(){return new He(se.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return F.resolve(r?r.document.mutableCopy():yt.newInvalidDocument(t))}getEntries(e,t){let r=Un();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():yt.newInvalidDocument(s))})),F.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Un();const o=t.path,l=new se(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:d}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||Xb(Jb(d),r)<=0||(s.has(d.key)||ba(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return F.resolve(i)}getAllFromCollectionGroup(e,t,r,s){ie(9500)}ni(e,t){return F.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new xE(this)}getSize(e){return F.resolve(this.size)}}class xE extends gE{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)})),F.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE{constructor(e){this.persistence=e,this.ri=new Gr((t=>vc(t)),wc),this.lastRemoteSnapshotVersion=ae.min(),this.highestTargetId=0,this.ii=0,this.si=new Rc,this.targetCount=0,this.oi=Is._r()}forEachTarget(e,t){return this.ri.forEach(((r,s)=>t(s))),F.resolve()}getLastRemoteSnapshotVersion(e){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return F.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),F.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Is(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,F.resolve()}updateTargetData(e,t){return this.lr(t),F.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,F.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach(((o,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)})),F.waitFor(i).next((()=>s))}getTargetCount(e){return F.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return F.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),F.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),F.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),F.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return F.resolve(r)}containsKey(e,t){return F.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(e,t){this._i={},this.overlays={},this.ai=new _a(0),this.ui=!1,this.ui=!0,this.ci=new bE,this.referenceDelegate=e(this),this.li=new IE(this),this.indexManager=new cE,this.remoteDocumentCache=(function(s){return new TE(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new aE(t),this.Pi=new vE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new wE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new EE(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){Q("MemoryPersistence","Starting transaction:",e);const s=new RE(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return F.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class RE extends e0{constructor(e){super(),this.currentSequenceNumber=e}}class Ac{constructor(e){this.persistence=e,this.Ri=new Rc,this.Ai=null}static Vi(e){return new Ac(e)}get di(){if(this.Ai)return this.Ai;throw ie(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),F.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),F.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),F.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.di,(r=>{const s=se.fromPath(r);return this.mi(e,s).next((i=>{i||t.removeEntry(s,ae.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return F.or([()=>F.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Xo{constructor(e,t){this.persistence=e,this.fi=new Gr((r=>r0(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=pE(this,t)}static Vi(e,t){return new Xo(e,t)}Ti(){}Ei(e){return F.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return F.forEach(this.fi,((r,s)=>this.wr(e,r,s).next((i=>i?F.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((l=>{l||(r++,i.removeEntry(o,ae.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),F.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),F.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),F.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),F.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Po(e.data.value)),t}wr(e,t,r){return F.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return F.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=s}static Is(e,t){let r=Ie(),s=Ie();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Sc(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return ww()?8:t0(St())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new AE;return this.ys(e,t,o).next((l=>{if(i.result=l,this.As)return this.ws(e,t,o,l.size)}))})).next((()=>i.result))}ws(e,t,r,s){return r.documentReadCount<this.Vs?(ls()<=Te.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",cs(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),F.resolve()):(ls()<=Te.DEBUG&&Q("QueryEngine","Query:",cs(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(ls()<=Te.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",cs(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,wn(t))):F.resolve())}gs(e,t){if(Uh(t))return F.resolve(null);let r=wn(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Nl(t,null,"F"),r=wn(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=Ie(...i);return this.fs.getDocuments(e,o).next((l=>this.indexManager.getMinOffset(e,r).next((c=>{const u=this.Ss(t,l);return this.bs(t,u,o,c.readTime)?this.gs(e,Nl(t,null,"F")):this.Ds(e,u,t,c)}))))})))))}ps(e,t,r,s){return Uh(t)||s.isEqual(ae.min())?F.resolve(null):this.fs.getDocuments(e,r).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,r,s)?F.resolve(null):(ls()<=Te.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),cs(t)),this.Ds(e,o,t,Yb(s,Ii)).next((l=>l)))}))}Ss(e,t){let r=new ht(Em(e));return t.forEach(((s,i)=>{ba(e,i)&&(r=r.add(i))})),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return ls()<=Te.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",cs(t)),this.fs.getDocumentsMatchingQuery(e,t,pr.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc="LocalStore",CE=3e8;class PE{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new He(xe),this.Fs=new Gr((i=>vc(i)),wc),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new _E(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function kE(n,e,t,r){return new PE(n,e,t,r)}async function Qm(n,e){const t=ce(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],l=[];let c=Ie();for(const u of s){o.push(u.batchId);for(const d of u.mutations)c=c.add(d.key)}for(const u of i){l.push(u.batchId);for(const d of u.mutations)c=c.add(d.key)}return t.localDocuments.getDocuments(r,c).next((u=>({Ns:u,removedBatchIds:o,addedBatchIds:l})))}))}))}function NE(n,e){const t=ce(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(l,c,u,d){const p=u.batch,_=p.keys();let b=F.resolve();return _.forEach((A=>{b=b.next((()=>d.getEntry(c,A))).next((P=>{const C=u.docVersions.get(A);Se(C!==null,48541),P.version.compareTo(C)<0&&(p.applyToRemoteDocument(P,u),P.isValidDocument()&&(P.setReadTime(u.commitVersion),d.addEntry(P)))}))})),b.next((()=>l.mutationQueue.removeMutationBatch(c,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let c=Ie();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Ym(n){const e=ce(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function DE(n,e){const t=ce(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const l=[];e.targetChanges.forEach(((d,p)=>{const _=s.get(p);if(!_)return;l.push(t.li.removeMatchingKeys(i,d.removedDocuments,p).next((()=>t.li.addMatchingKeys(i,d.addedDocuments,p))));let b=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken(Tt.EMPTY_BYTE_STRING,ae.min()).withLastLimboFreeSnapshotVersion(ae.min()):d.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(d.resumeToken,r)),s=s.insert(p,b),(function(P,C,O){return P.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=CE?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0})(_,b,d)&&l.push(t.li.updateTargetData(i,b))}));let c=Un(),u=Ie();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),l.push(VE(i,o,e.documentUpdates).next((d=>{c=d.Bs,u=d.Ls}))),!r.isEqual(ae.min())){const d=t.li.getLastRemoteSnapshotVersion(i).next((p=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r)));l.push(d)}return F.waitFor(l).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,u))).next((()=>c))})).then((i=>(t.vs=s,i)))}function VE(n,e,t){let r=Ie(),s=Ie();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=Un();return t.forEach(((l,c)=>{const u=i.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(ae.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):Q(Cc,"Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)})),{Bs:o,Ls:s}}))}function OE(n,e){const t=ce(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=gc),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function LE(n,e){const t=ce(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.li.getTargetData(r,e).next((i=>i?(s=i,F.resolve(s)):t.li.allocateTargetId(r).next((o=>(s=new lr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function Ll(n,e,t){const r=ce(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Ns(o))throw o;Q(Cc,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function Zh(n,e,t){const r=ce(n);let s=ae.min(),i=Ie();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,u,d){const p=ce(c),_=p.Fs.get(d);return _!==void 0?F.resolve(p.vs.get(_)):p.li.getTargetData(u,d)})(r,o,wn(e)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,l.targetId).next((c=>{i=c}))})).next((()=>r.Cs.getDocumentsMatchingQuery(o,e,t?s:ae.min(),t?i:Ie()))).next((l=>(ME(r,x0(e),l),{documents:l,ks:i})))))}function ME(n,e,t){let r=n.Ms.get(e)||ae.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Ms.set(e,r)}class ed{constructor(){this.activeTargetIds=P0()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class jE{constructor(){this.vo=new ed,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new ed,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FE{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="ConnectivityMonitor";class nd{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){Q(td,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){Q(td,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vo=null;function Ml(){return vo===null?vo=(function(){return 268435456+Math.round(2147483648*Math.random())})():vo++,"0x"+vo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="RestConnection",UE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class $E{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Ho?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const o=Ml(),l=this.Qo(e,t.toUriEncodedString());Q(nl,`Sending RPC '${e}' ${o}:`,l,r);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(c,s,i);const{host:u}=new URL(l),d=Cs(u);return this.zo(e,l,c,r,d).then((p=>(Q(nl,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw $r(nl,`RPC '${e}' ${o} failed with error: `,p,"url: ",l,"request:",r),p}))}jo(e,t,r,s,i,o){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ps})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const r=UE[e];let s=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It="WebChannelConnection",Js=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class gs extends $E{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!gs.c_){const e=Jf();Js(e,Yf.STAT_EVENT,(t=>{t.stat===Il.PROXY?Q(It,"STAT_EVENT: detected buffering proxy"):t.stat===Il.NOPROXY&&Q(It,"STAT_EVENT: detected no buffering proxy")})),gs.c_=!0}}zo(e,t,r,s,i){const o=Ml();return new Promise(((l,c)=>{const u=new Kf;u.setWithCredentials(!0),u.listenOnce(Qf.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case Co.NO_ERROR:const p=u.getResponseJson();Q(It,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),l(p);break;case Co.TIMEOUT:Q(It,`RPC '${e}' ${o} timed out`),c(new W(j.DEADLINE_EXCEEDED,"Request time out"));break;case Co.HTTP_ERROR:const _=u.getStatus();if(Q(It,`RPC '${e}' ${o} failed with status:`,_,"response text:",u.getResponseText()),_>0){let b=u.getResponseJson();Array.isArray(b)&&(b=b[0]);const A=b==null?void 0:b.error;if(A&&A.status&&A.message){const P=(function(O){const D=O.toLowerCase().replace(/_/g,"-");return Object.values(j).indexOf(D)>=0?D:j.UNKNOWN})(A.status);c(new W(P,A.message))}else c(new W(j.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new W(j.UNAVAILABLE,"Connection failed."));break;default:ie(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{Q(It,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);Q(It,`RPC '${e}' ${o} sending request:`,s),u.send(t,"POST",d,r,15)}))}T_(e,t,r){const s=Ml(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const u=i.join("");Q(It,`Creating RPC '${e}' stream ${s}: ${u}`,l);const d=o.createWebChannel(u,l);this.E_(d);let p=!1,_=!1;const b=new BE({Jo:A=>{_?Q(It,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(p||(Q(It,`Opening RPC '${e}' stream ${s} transport.`),d.open(),p=!0),Q(It,`RPC '${e}' stream ${s} sending:`,A),d.send(A))},Ho:()=>d.close()});return Js(d,si.EventType.OPEN,(()=>{_||(Q(It,`RPC '${e}' stream ${s} transport opened.`),b.i_())})),Js(d,si.EventType.CLOSE,(()=>{_||(_=!0,Q(It,`RPC '${e}' stream ${s} transport closed`),b.o_(),this.I_(d))})),Js(d,si.EventType.ERROR,(A=>{_||(_=!0,$r(It,`RPC '${e}' stream ${s} transport errored. Name:`,A.name,"Message:",A.message),b.o_(new W(j.UNAVAILABLE,"The operation could not be completed")))})),Js(d,si.EventType.MESSAGE,(A=>{var P;if(!_){const C=A.data[0];Se(!!C,16349);const O=C,D=(O==null?void 0:O.error)||((P=O[0])==null?void 0:P.error);if(D){Q(It,`RPC '${e}' stream ${s} received error:`,D);const $=D.status;let M=(function(g){const y=et[g];if(y!==void 0)return Om(y)})($),q=D.message;$==="NOT_FOUND"&&q.includes("database")&&q.includes("does not exist")&&q.includes(this.databaseId.database)&&$r(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),M===void 0&&(M=j.INTERNAL,q="Unknown error status: "+$+" with message "+D.message),_=!0,b.o_(new W(M,q)),d.close()}else Q(It,`RPC '${e}' stream ${s} received:`,C),b.__(C)}})),gs.u_(),setTimeout((()=>{b.s_()}),0),b}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Xf()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zE(n){return new gs(n)}function rl(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(n){return new G0(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gs.c_=!1;class Pc{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&Q("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd="PersistentStream";class Jm{constructor(e,t,r,s,i,o,l,c){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Pc(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===j.RESOURCE_EXHAUSTED?(Fn(t.toString()),Fn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===j.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new W(j.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return Q(rd,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(Q(rd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class HE extends Jm{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=J0(this.serializer,e),r=(function(i){if(!("targetChange"in i))return ae.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ae.min():o.readTime?Ht(o.readTime):ae.min()})(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=Ol(this.serializer),t.addTarget=(function(i,o){let l;const c=o.target;if(l=Pl(c)?{documents:Z0(i,c)}:{query:eE(i,c).ft},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=jm(i,o.resumeToken);const u=Dl(i,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(ae.min())>0){l.readTime=Yo(i,o.snapshotVersion.toTimestamp());const u=Dl(i,o.expectedCount);u!==null&&(l.expectedCount=u)}return l})(this.serializer,e);const r=nE(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=Ol(this.serializer),t.removeTarget=e,this.q_(t)}}class qE extends Jm{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return Se(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Se(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Se(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=X0(e.writeResults,e.commitTime),r=Ht(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Ol(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Bm(this.serializer,r)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{}class GE extends WE{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new W(j.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,Vl(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(j.UNKNOWN,i.toString())}))}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.jo(e,Vl(t,r),s,o,l,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(j.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function KE(n,e,t,r){return new GE(n,e,t,r)}class QE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Fn(t),this.aa=!1):Q("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr="RemoteStore";class YE{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((o=>{r.enqueueAndForget((async()=>{Kr(this)&&(Q(zr,"Restarting streams for network reachability change."),await(async function(c){const u=ce(c);u.Ia.add(4),await qi(u),u.Va.set("Unknown"),u.Ia.delete(4),await Ra(u)})(this))}))})),this.Va=new QE(r,s)}}async function Ra(n){if(Kr(n))for(const e of n.Ra)await e(!0)}async function qi(n){for(const e of n.Ra)await e(!1)}function Xm(n,e){const t=ce(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Vc(t)?Dc(t):Ds(t).O_()&&Nc(t,e))}function kc(n,e){const t=ce(n),r=Ds(t);t.Ea.delete(e),r.O_()&&Zm(t,e),t.Ea.size===0&&(r.O_()?r.L_():Kr(t)&&t.Va.set("Unknown"))}function Nc(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ae.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ds(n).Z_(e)}function Zm(n,e){n.da.$e(e),Ds(n).X_(e)}function Dc(n){n.da=new z0({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Ds(n).start(),n.Va.ua()}function Vc(n){return Kr(n)&&!Ds(n).x_()&&n.Ea.size>0}function Kr(n){return ce(n).Ia.size===0}function ep(n){n.da=void 0}async function JE(n){n.Va.set("Online")}async function XE(n){n.Ea.forEach(((e,t)=>{Nc(n,e)}))}async function ZE(n,e){ep(n),Vc(n)?(n.Va.ha(e),Dc(n)):n.Va.set("Unknown")}async function eT(n,e,t){if(n.Va.set("Online"),e instanceof Mm&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const l of i.targetIds)s.Ea.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.Ea.delete(l),s.da.removeTarget(l))})(n,e)}catch(r){Q(zr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Zo(n,r)}else if(e instanceof Do?n.da.Xe(e):e instanceof Lm?n.da.st(e):n.da.tt(e),!t.isEqual(ae.min()))try{const r=await Ym(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const l=i.da.Tt(o);return l.targetChanges.forEach(((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.Ea.get(u);d&&i.Ea.set(u,d.withResumeToken(c.resumeToken,o))}})),l.targetMismatches.forEach(((c,u)=>{const d=i.Ea.get(c);if(!d)return;i.Ea.set(c,d.withResumeToken(Tt.EMPTY_BYTE_STRING,d.snapshotVersion)),Zm(i,c);const p=new lr(d.target,c,u,d.sequenceNumber);Nc(i,p)})),i.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(r){Q(zr,"Failed to raise snapshot:",r),await Zo(n,r)}}async function Zo(n,e,t){if(!Ns(e))throw e;n.Ia.add(1),await qi(n),n.Va.set("Offline"),t||(t=()=>Ym(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{Q(zr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Ra(n)}))}function tp(n,e){return e().catch((t=>Zo(n,t,e)))}async function Aa(n){const e=ce(n),t=vr(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:gc;for(;tT(e);)try{const s=await OE(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,nT(e,s)}catch(s){await Zo(e,s)}np(e)&&rp(e)}function tT(n){return Kr(n)&&n.Ta.length<10}function nT(n,e){n.Ta.push(e);const t=vr(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function np(n){return Kr(n)&&!vr(n).x_()&&n.Ta.length>0}function rp(n){vr(n).start()}async function rT(n){vr(n).ra()}async function sT(n){const e=vr(n);for(const t of n.Ta)e.ea(t.mutations)}async function iT(n,e,t){const r=n.Ta.shift(),s=Tc.from(r,e,t);await tp(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Aa(n)}async function oT(n,e){e&&vr(n).Y_&&await(async function(r,s){if((function(o){return Vm(o)&&o!==j.ABORTED})(s.code)){const i=r.Ta.shift();vr(r).B_(),await tp(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Aa(r)}})(n,e),np(n)&&rp(n)}async function sd(n,e){const t=ce(n);t.asyncQueue.verifyOperationInProgress(),Q(zr,"RemoteStore received new credentials");const r=Kr(t);t.Ia.add(3),await qi(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Ra(t)}async function aT(n,e){const t=ce(n);e?(t.Ia.delete(2),await Ra(t)):e||(t.Ia.add(2),await qi(t),t.Va.set("Unknown"))}function Ds(n){return n.ma||(n.ma=(function(t,r,s){const i=ce(t);return i.sa(),new HE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:JE.bind(null,n),Yo:XE.bind(null,n),t_:ZE.bind(null,n),H_:eT.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),Vc(n)?Dc(n):n.Va.set("Unknown")):(await n.ma.stop(),ep(n))}))),n.ma}function vr(n){return n.fa||(n.fa=(function(t,r,s){const i=ce(t);return i.sa(),new qE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:rT.bind(null,n),t_:oT.bind(null,n),ta:sT.bind(null,n),na:iT.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await Aa(n)):(await n.fa.stop(),n.Ta.length>0&&(Q(zr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Mn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,l=new Oc(e,t,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(j.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Lc(n,e){if(Fn("AsyncQueue",`${e}: ${n}`),Ns(n))return new W(j.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{static emptySet(e){return new ys(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||se.comparator(t.key,r.key):(t,r)=>se.comparator(t.key,r.key),this.keyedMap=ii(),this.sortedSet=new He(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ys)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new ys;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(){this.ga=new He(se.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):ie(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Rs{constructor(e,t,r,s,i,o,l,c,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((l=>{o.push({type:0,doc:l})})),new Rs(e,t,ys.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&wa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class cT{constructor(){this.queries=od(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=ce(t),i=s.queries;s.queries=od(),i.forEach(((o,l)=>{for(const c of l.Sa)c.onError(r)}))})(this,new W(j.ABORTED,"Firestore shutting down"))}}function od(){return new Gr((n=>bm(n)),wa)}async function uT(n,e){const t=ce(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new lT,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const l=Lc(o,`Initialization of query '${cs(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Mc(t)}async function hT(n,e){const t=ce(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function dT(n,e){const t=ce(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const l of o.Sa)l.Fa(s)&&(r=!0);o.wa=s}}r&&Mc(t)}function fT(n,e,t){const r=ce(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function Mc(n){n.Ca.forEach((e=>{e.next()}))}var jl,ad;(ad=jl||(jl={})).Ma="default",ad.Cache="cache";class mT{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Rs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Rs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==jl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e){this.key=e}}class ip{constructor(e){this.key=e}}class pT{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Ie(),this.mutatedKeys=Ie(),this.eu=Em(e),this.tu=new ys(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new id,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,p)=>{const _=s.get(d),b=ba(this.query,p)?p:null,A=!!_&&this.mutatedKeys.has(_.key),P=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let C=!1;_&&b?_.data.isEqual(b.data)?A!==P&&(r.track({type:3,doc:b}),C=!0):this.su(_,b)||(r.track({type:2,doc:b}),C=!0,(c&&this.eu(b,c)>0||u&&this.eu(b,u)<0)&&(l=!0)):!_&&b?(r.track({type:0,doc:b}),C=!0):_&&!b&&(r.track({type:1,doc:_}),C=!0,(c||u)&&(l=!0)),C&&(b?(o=o.add(b),i=P?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,bs:l,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((d,p)=>(function(b,A){const P=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ie(20277,{Vt:C})}};return P(b)-P(A)})(d.type,p.type)||this.eu(d.doc,p.doc))),this.ou(r),s=s??!1;const l=t&&!s?this._u():[],c=this.Ya.size===0&&this.current&&!s?1:0,u=c!==this.Xa;return this.Xa=c,o.length!==0||u?{snapshot:new Rs(this.query,e.tu,i,o,e.mutatedKeys,c===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new id,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=Ie(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const t=[];return e.forEach((r=>{this.Ya.has(r)||t.push(new ip(r))})),this.Ya.forEach((r=>{e.has(r)||t.push(new sp(r))})),t}cu(e){this.Za=e.ks,this.Ya=Ie();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Rs.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const jc="SyncEngine";class gT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class yT{constructor(e){this.key=e,this.hu=!1}}class _T{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Gr((l=>bm(l)),wa),this.Eu=new Map,this.Iu=new Set,this.Ru=new He(se.comparator),this.Au=new Map,this.Vu=new Rc,this.du={},this.mu=new Map,this.fu=Is.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function vT(n,e,t=!0){const r=hp(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await op(r,e,t,!0),s}async function wT(n,e){const t=hp(n);await op(t,e,!0,!1)}async function op(n,e,t,r){const s=await LE(n.localStore,wn(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await bT(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&Xm(n.remoteStore,s),l}async function bT(n,e,t,r,s){n.pu=(p,_,b)=>(async function(P,C,O,D){let $=C.view.ru(O);$.bs&&($=await Zh(P.localStore,C.query,!1).then((({documents:g})=>C.view.ru(g,$))));const M=D&&D.targetChanges.get(C.targetId),q=D&&D.targetMismatches.get(C.targetId)!=null,G=C.view.applyChanges($,P.isPrimaryClient,M,q);return cd(P,C.targetId,G.au),G.snapshot})(n,p,_,b);const i=await Zh(n.localStore,e,!0),o=new pT(e,i.ks),l=o.ru(i.documents),c=Hi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),u=o.applyChanges(l,n.isPrimaryClient,c);cd(n,t,u.au);const d=new gT(e,t,o);return n.Tu.set(e,d),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),u.snapshot}async function ET(n,e,t){const r=ce(n),s=r.Tu.get(e),i=r.Eu.get(s.targetId);if(i.length>1)return r.Eu.set(s.targetId,i.filter((o=>!wa(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Ll(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&kc(r.remoteStore,s.targetId),Fl(r,s.targetId)})).catch(ks)):(Fl(r,s.targetId),await Ll(r.localStore,s.targetId,!0))}async function TT(n,e){const t=ce(n),r=t.Tu.get(e),s=t.Eu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),kc(t.remoteStore,r.targetId))}async function xT(n,e,t){const r=kT(n);try{const s=await(function(o,l){const c=ce(o),u=ze.now(),d=l.reduce(((b,A)=>b.add(A.key)),Ie());let p,_;return c.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let A=Un(),P=Ie();return c.xs.getEntries(b,d).next((C=>{A=C,A.forEach(((O,D)=>{D.isValidDocument()||(P=P.add(O))}))})).next((()=>c.localDocuments.getOverlayedDocuments(b,A))).next((C=>{p=C;const O=[];for(const D of l){const $=M0(D,p.get(D.key).overlayedDocument);$!=null&&O.push(new Ir(D.key,$,dm($.value.mapValue),Dt.exists(!0)))}return c.mutationQueue.addMutationBatch(b,u,O,l)})).next((C=>{_=C;const O=C.applyToLocalDocumentSet(p,P);return c.documentOverlayCache.saveOverlays(b,C.batchId,O)}))})).then((()=>({batchId:_.batchId,changes:xm(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,l,c){let u=o.du[o.currentUser.toKey()];u||(u=new He(xe)),u=u.insert(l,c),o.du[o.currentUser.toKey()]=u})(r,s.batchId,t),await Wi(r,s.changes),await Aa(r.remoteStore)}catch(s){const i=Lc(s,"Failed to persist write");t.reject(i)}}async function ap(n,e){const t=ce(n);try{const r=await DE(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(Se(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?Se(o.hu,14607):s.removedDocuments.size>0&&(Se(o.hu,42227),o.hu=!1))})),await Wi(t,r,e)}catch(r){await ks(r)}}function ld(n,e,t){const r=ce(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,o)=>{const l=o.view.va(e);l.snapshot&&s.push(l.snapshot)})),(function(o,l){const c=ce(o);c.onlineState=l;let u=!1;c.queries.forEach(((d,p)=>{for(const _ of p.Sa)_.va(l)&&(u=!0)})),u&&Mc(c)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function IT(n,e,t){const r=ce(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new He(se.comparator);o=o.insert(i,yt.newNoDocument(i,ae.min()));const l=Ie().add(i),c=new xa(ae.min(),new Map,new He(xe),o,l);await ap(r,c),r.Ru=r.Ru.remove(i),r.Au.delete(e),Fc(r)}else await Ll(r.localStore,e,!1).then((()=>Fl(r,e,t))).catch(ks)}async function RT(n,e){const t=ce(n),r=e.batch.batchId;try{const s=await NE(t.localStore,e);cp(t,r,null),lp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Wi(t,s)}catch(s){await ks(s)}}async function AT(n,e,t){const r=ce(n);try{const s=await(function(o,l){const c=ce(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let d;return c.mutationQueue.lookupMutationBatch(u,l).next((p=>(Se(p!==null,37113),d=p.keys(),c.mutationQueue.removeMutationBatch(u,p)))).next((()=>c.mutationQueue.performConsistencyCheck(u))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(u,d,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d))).next((()=>c.localDocuments.getDocuments(u,d)))}))})(r.localStore,e);cp(r,e,t),lp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Wi(r,s)}catch(s){await ks(s)}}function lp(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function cp(n,e,t){const r=ce(n);let s=r.du[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.du[r.currentUser.toKey()]=s}}function Fl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Eu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((r=>{n.Vu.containsKey(r)||up(n,r)}))}function up(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(kc(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),Fc(n))}function cd(n,e,t){for(const r of t)r instanceof sp?(n.Vu.addReference(r.key,e),ST(n,r)):r instanceof ip?(Q(jc,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||up(n,r.key)):ie(19791,{wu:r})}function ST(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(r)||(Q(jc,"New document in limbo: "+t),n.Iu.add(r),Fc(n))}function Fc(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new se(je.fromString(e)),r=n.fu.next();n.Au.set(r,new yT(t)),n.Ru=n.Ru.insert(t,r),Xm(n.remoteStore,new lr(wn(vm(t.path)),r,"TargetPurposeLimboResolution",_a.ce))}}async function Wi(n,e,t){const r=ce(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((l,c)=>{o.push(r.pu(c,e,t).then((u=>{var d;if((u||t)&&r.isPrimaryClient){const p=u?!u.fromCache:(d=t==null?void 0:t.targetChanges.get(c.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(u){s.push(u);const p=Sc.Is(c.targetId,u);i.push(p)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(c,u){const d=ce(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>F.forEach(u,(_=>F.forEach(_.Ts,(b=>d.persistence.referenceDelegate.addReference(p,_.targetId,b))).next((()=>F.forEach(_.Es,(b=>d.persistence.referenceDelegate.removeReference(p,_.targetId,b)))))))))}catch(p){if(!Ns(p))throw p;Q(Cc,"Failed to update sequence numbers: "+p)}for(const p of u){const _=p.targetId;if(!p.fromCache){const b=d.vs.get(_),A=b.snapshotVersion,P=b.withLastLimboFreeSnapshotVersion(A);d.vs=d.vs.insert(_,P)}}})(r.localStore,i))}async function CT(n,e){const t=ce(n);if(!t.currentUser.isEqual(e)){Q(jc,"User change. New user:",e.toKey());const r=await Qm(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((l=>{l.forEach((c=>{c.reject(new W(j.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Wi(t,r.Ns)}}function PT(n,e){const t=ce(n),r=t.Au.get(e);if(r&&r.hu)return Ie().add(r.key);{let s=Ie();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const l=t.Tu.get(o);s=s.unionWith(l.view.nu)}return s}}function hp(n){const e=ce(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ap.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=PT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=IT.bind(null,e),e.Pu.H_=dT.bind(null,e.eventManager),e.Pu.yu=fT.bind(null,e.eventManager),e}function kT(n){const e=ce(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=RT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=AT.bind(null,e),e}class ea{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ia(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return kE(this.persistence,new SE,e.initialUser,this.serializer)}Cu(e){return new Km(Ac.Vi,this.serializer)}Du(e){return new jE}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ea.provider={build:()=>new ea};class NT extends ea{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Se(this.persistence.referenceDelegate instanceof Xo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new fE(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?jt.withCacheSize(this.cacheSizeBytes):jt.DEFAULT;return new Km((r=>Xo.Vi(r,t)),this.serializer)}}class Ul{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ld(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=CT.bind(null,this.syncEngine),await aT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new cT})()}createDatastore(e){const t=Ia(e.databaseInfo.databaseId),r=zE(e.databaseInfo);return KE(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,l){return new YE(r,s,i,o,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>ld(this.syncEngine,t,0)),(function(){return nd.v()?new nd:new FE})())}createSyncEngine(e,t){return(function(s,i,o,l,c,u,d){const p=new _T(s,i,o,l,c,u);return d&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=ce(s);Q(zr,"RemoteStore shutting down."),i.Ia.add(5),await qi(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Ul.provider={build:()=>new Ul};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Fn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let VT=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new W(j.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=ce(s),l={documents:i.map((p=>Jo(o.serializer,p)))},c=await o.jo("BatchGetDocuments",o.serializer.databaseId,je.emptyPath(),l,i.length),u=new Map;c.forEach((p=>{const _=Y0(o.serializer,p);u.set(_.key.toString(),_)}));const d=[];return i.forEach((p=>{const _=u.get(p.toString());Se(!!_,55234,{key:p}),d.push(_)})),d})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Ec(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const s=se.fromPath(r);this.mutations.push(new Dm(s,this.precondition(s)))})),await(async function(r,s){const i=ce(r),o={writes:s.map((l=>Bm(i.serializer,l)))};await i.Wo("Commit",i.serializer.databaseId,je.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw ie(50498,{Gu:e.constructor.name});t=ae.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new W(j.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(ae.min())?Dt.exists(!1):Dt.updateTime(t):Dt.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(ae.min()))throw new W(j.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Dt.updateTime(t)}return Dt.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new Pc(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const e=new VT(this.datastore),t=this.Hu(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Zu(s)}))))})).catch((r=>{this.Zu(r)}))}))}Hu(e){try{const t=this.updateFunction(e);return!$i(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Vm(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wr="FirestoreClient";class LT{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=At.UNAUTHENTICATED,this.clientId=pc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{Q(wr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(Q(wr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Mn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Lc(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function sl(n,e){n.asyncQueue.verifyOperationInProgress(),Q(wr,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Qm(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function ud(n,e){n.asyncQueue.verifyOperationInProgress();const t=await MT(n);Q(wr,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>sd(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>sd(e.remoteStore,s))),n._onlineComponents=e}async function MT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){Q(wr,"Using user provided OfflineComponentProvider");try{await sl(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===j.FAILED_PRECONDITION||s.code===j.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;$r("Error using user provided cache. Falling back to memory cache: "+t),await sl(n,new ea)}}else Q(wr,"Using default OfflineComponentProvider"),await sl(n,new NT(void 0));return n._offlineComponents}async function Uc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(Q(wr,"Using user provided OnlineComponentProvider"),await ud(n,n._uninitializedComponentsProvider._online)):(Q(wr,"Using default OnlineComponentProvider"),await ud(n,new Ul))),n._onlineComponents}function jT(n){return Uc(n).then((e=>e.syncEngine))}function FT(n){return Uc(n).then((e=>e.datastore))}async function UT(n){const e=await Uc(n),t=e.eventManager;return t.onListen=vT.bind(null,e.syncEngine),t.onUnlisten=ET.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=wT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=TT.bind(null,e.syncEngine),t}function $T(n,e,t={}){const r=new Mn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,l,c,u){const d=new DT({next:_=>{d.Nu(),o.enqueueAndForget((()=>hT(i,p))),_.fromCache&&c.source==="server"?u.reject(new W(j.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(_)},error:_=>u.reject(_)}),p=new mT(l,d,{includeMetadataChanges:!0,qa:!0});return uT(i,p)})(await UT(n),n.asyncQueue,e,t,r))),r.promise}function BT(n,e){const t=new Mn;return n.asyncQueue.enqueueAndForget((async()=>xT(await jT(n),e,t))),t.promise}function zT(n,e,t){const r=new Mn;return n.asyncQueue.enqueueAndForget((async()=>{const s=await FT(n);new OT(n.asyncQueue,s,t,e,r).ju()})),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dp(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HT="ComponentProvider",hd=new Map;function qT(n,e,t,r,s){return new o0(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,dp(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fp="firestore.googleapis.com",dd=!0;class fd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new W(j.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=fp,this.ssl=dd}else this.host=e.host,this.ssl=e.ssl??dd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Gm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<hE)throw new W(j.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Qb("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=dp(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new W(j.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new W(j.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new W(j.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Sa{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new fd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(j.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(j.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new fd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Fb;switch(r.type){case"firstParty":return new zb(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(j.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=hd.get(t);r&&(Q(HT,"Removing Datastore"),hd.delete(t),r.terminate())})(this),Promise.resolve()}}function WT(n,e,t,r={}){var u;n=Br(n,Sa);const s=Cs(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&cc(`https://${l}`),i.host!==fp&&i.host!==l&&$r("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:l,ssl:s,emulatorOptions:r};if(!jr(c,o)&&(n._setSettings(c),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=At.MOCK_USER;else{d=$f(r.mockUserToken,(u=n._app)==null?void 0:u.options.projectId);const _=r.mockUserToken.sub||r.mockUserToken.user_id;if(!_)throw new W(j.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new At(_)}n._authCredentials=new Ub(new em(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Vs(this.firestore,e,this._query)}}class rt{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new dr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new rt(this.firestore,e,this._key)}toJSON(){return{type:rt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ui(t,rt._jsonSchema))return new rt(e,r||null,new se(je.fromString(t.referencePath)))}}rt._jsonSchemaVersion="firestore/documentReference/1.0",rt._jsonSchema={type:nt("string",rt._jsonSchemaVersion),referencePath:nt("string")};class dr extends Vs{constructor(e,t,r){super(e,t,vm(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new rt(this.firestore,null,new se(e))}withConverter(e){return new dr(this.firestore,e,this._path)}}function Vt(n,e,...t){if(n=st(n),tm("collection","path",e),n instanceof Sa){const r=je.fromString(e,...t);return Rh(r),new dr(n,null,r)}{if(!(n instanceof rt||n instanceof dr))throw new W(j.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(je.fromString(e,...t));return Rh(r),new dr(n.firestore,null,r)}}function gi(n,e,...t){if(n=st(n),arguments.length===1&&(e=pc.newId()),tm("doc","path",e),n instanceof Sa){const r=je.fromString(e,...t);return Ih(r),new rt(n,null,new se(r))}{if(!(n instanceof rt||n instanceof dr))throw new W(j.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(je.fromString(e,...t));return Ih(r),new rt(n.firestore,n instanceof dr?n.converter:null,new se(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md="AsyncQueue";class pd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Pc(this,"async_queue_retry"),this._c=()=>{const r=rl();r&&Q(md,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=rl();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=rl();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Mn;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Ns(e))throw e;Q(md,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,Fn("INTERNAL UNHANDLED ERROR: ",gd(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Oc.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&ie(47125,{Pc:gd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function gd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Gi extends Sa{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new pd,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new pd(e),this._firestoreClient=void 0,await e}}}function GT(n,e){const t=typeof n=="object"?n:fc(),r=typeof n=="string"?n:Ho,s=ga(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=jf("firestore");i&&WT(s,...i)}return s}function $c(n){if(n._terminated)throw new W(j.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||KT(n),n._firestoreClient}function KT(n){var r,s,i,o;const e=n._freezeSettings(),t=qT(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new LT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bt(Tt.fromBase64String(e))}catch(t){throw new W(j.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Bt(Tt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ui(e,Bt._jsonSchema))return Bt.fromBase64String(e.bytes)}}Bt._jsonSchemaVersion="firestore/bytes/1.0",Bt._jsonSchema={type:nt("string",Bt._jsonSchemaVersion),bytes:nt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W(j.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(j.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(j.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return xe(this._lat,e._lat)||xe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:bn._jsonSchemaVersion}}static fromJSON(e){if(Ui(e,bn._jsonSchema))return new bn(e.latitude,e.longitude)}}bn._jsonSchemaVersion="firestore/geoPoint/1.0",bn._jsonSchema={type:nt("string",bn._jsonSchemaVersion),latitude:nt("number"),longitude:nt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:un._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ui(e,un._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new un(e.vectorValues);throw new W(j.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}un._jsonSchemaVersion="firestore/vectorValue/1.0",un._jsonSchema={type:nt("string",un._jsonSchemaVersion),vectorValues:nt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT=/^__.*__$/;class YT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ir(e,this.data,this.fieldMask,t,this.fieldTransforms):new zi(e,this.data,t,this.fieldTransforms)}}class mp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Ir(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function pp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ie(40011,{dataSource:n})}}class zc{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new zc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return ta(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(pp(this.dataSource)&&QT.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class JT{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ia(e)}I(e,t,r,s=!1){return new zc({dataSource:e,methodName:t,targetDoc:r,path:Et.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Pa(n){const e=n._freezeSettings(),t=Ia(n._databaseId);return new JT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function gp(n,e,t,r,s,i={}){const o=n.I(i.merge||i.mergeFields?2:0,e,t,s);Hc("Data must be an object, but it was:",o,r);const l=vp(r,o);let c,u;if(i.merge)c=new zt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const _=As(e,p,t);if(!o.contains(_))throw new W(j.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);Ep(d,_)||d.push(_)}c=new zt(d),u=o.fieldTransforms.filter((p=>c.covers(p.field)))}else c=null,u=o.fieldTransforms;return new YT(new Nt(l),c,u)}class ka extends Bc{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ka}}function yp(n,e,t,r){const s=n.I(1,e,t);Hc("Data must be an object, but it was:",s,r);const i=[],o=Nt.empty();xr(r,((c,u)=>{const d=bp(e,c,t);u=st(u);const p=s.fc(d);if(u instanceof ka)i.push(d);else{const _=Ki(u,p);_!=null&&(i.push(d),o.set(d,_))}}));const l=new zt(i);return new mp(o,l,s.fieldTransforms)}function _p(n,e,t,r,s,i){const o=n.I(1,e,t),l=[As(e,r,t)],c=[s];if(i.length%2!=0)throw new W(j.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)l.push(As(e,i[_])),c.push(i[_+1]);const u=[],d=Nt.empty();for(let _=l.length-1;_>=0;--_)if(!Ep(u,l[_])){const b=l[_];let A=c[_];A=st(A);const P=o.fc(b);if(A instanceof ka)u.push(b);else{const C=Ki(A,P);C!=null&&(u.push(b),d.set(b,C))}}const p=new zt(u);return new mp(d,p,o.fieldTransforms)}function XT(n,e,t,r=!1){return Ki(t,n.I(r?4:3,e))}function Ki(n,e){if(wp(n=st(n)))return Hc("Unsupported field value:",e,n),vp(n,e);if(n instanceof Bc)return(function(r,s){if(!pp(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const l of r){let c=Ki(l,s.gc(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=st(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return k0(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ze.fromDate(r);return{timestampValue:Yo(s.serializer,i)}}if(r instanceof ze){const i=new ze(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Yo(s.serializer,i)}}if(r instanceof bn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Bt)return{bytesValue:jm(s.serializer,r._byteString)};if(r instanceof rt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ic(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof un)return(function(o,l){const c=o instanceof un?o.toArray():o;return{mapValue:{fields:{[um]:{stringValue:hm},[qo]:{arrayValue:{values:c.map((d=>{if(typeof d!="number")throw l.yc("VectorValues must only contain numeric values.");return bc(l.serializer,d)}))}}}}}})(r,s);if(Wm(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${ya(r)}`)})(n,e)}function vp(n,e){const t={};return sm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):xr(n,((r,s)=>{const i=Ki(s,e.dc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function wp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ze||n instanceof bn||n instanceof Bt||n instanceof rt||n instanceof Bc||n instanceof un||Wm(n))}function Hc(n,e,t){if(!wp(t)||!nm(t)){const r=ya(t);throw r==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+r)}}function As(n,e,t){if((e=st(e))instanceof Ca)return e._internalPath;if(typeof e=="string")return bp(n,e);throw ta("Field path arguments must be of type string or ",n,!1,void 0,t)}const ZT=new RegExp("[~\\*/\\[\\]]");function bp(n,e,t){if(e.search(ZT)>=0)throw ta(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ca(...e.split("."))._internalPath}catch{throw ta(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ta(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new W(j.INVALID_ARGUMENT,l+n+c)}function Ep(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{convertValue(e,t="none"){switch(_r(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Qe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(yr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ie(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return xr(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[qo].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>Qe(o.doubleValue)));return new un(t)}convertGeoPoint(e){return new bn(Qe(e.latitude),Qe(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=va(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ri(e));default:return null}}convertTimestamp(e){const t=gr(e);return new ze(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=je.fromString(e);Se(qm(r),9688,{name:e});const s=new Ai(r.get(1),r.get(3)),i=new se(r.popFirst(5));return s.isEqual(t)||Fn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp extends Tp{constructor(e){super(),this.firestore=e}convertBytes(e){return new Bt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new rt(this.firestore,null,t)}}const yd="@firebase/firestore",_d="4.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new ex(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(As("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class ex extends na{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tx(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W(j.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class qc{}class nx extends qc{}function Hn(n,e,...t){let r=[];e instanceof qc&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((c=>c instanceof Wc)).length,l=i.filter((c=>c instanceof Na)).length;if(o>1||o>0&&l>0)throw new W(j.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Na extends nx{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Na(e,t,r)}_apply(e){const t=this._parse(e);return Ip(e._query,t),new Vs(e.firestore,e.converter,kl(e._query,t))}_parse(e){const t=Pa(e.firestore);return(function(i,o,l,c,u,d,p){let _;if(u.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new W(j.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){wd(p,d);const A=[];for(const P of p)A.push(vd(c,i,P));_={arrayValue:{values:A}}}else _=vd(c,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||wd(p,d),_=XT(l,o,p,d==="in"||d==="not-in");return tt.create(u,d,_)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Rn(n,e,t){const r=e,s=As("where",n);return Na._create(s,r,t)}class Wc extends qc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Wc(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:hn.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const l=i.getFlattenedFilters();for(const c of l)Ip(o,c),o=kl(o,c)})(e._query,t),new Vs(e.firestore,e.converter,kl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function vd(n,e,t){if(typeof(t=st(t))=="string"){if(t==="")throw new W(j.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!wm(e)&&t.indexOf("/")!==-1)throw new W(j.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(je.fromString(t));if(!se.isDocumentKey(r))throw new W(j.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Vh(n,new se(r))}if(t instanceof rt)return Vh(n,t._key);throw new W(j.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ya(t)}.`)}function wd(n,e){if(!Array.isArray(n)||n.length===0)throw new W(j.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ip(n,e){const t=(function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new W(j.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(j.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Rp(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class rx extends Tp{constructor(e){super(),this.firestore=e}convertBytes(e){return new Bt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new rt(this.firestore,null,t)}}class ai{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Mr extends na{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Vo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(As("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new W(j.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Mr._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Mr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Mr._jsonSchema={type:nt("string",Mr._jsonSchemaVersion),bundleSource:nt("string","DocumentSnapshot"),bundleName:nt("string"),bundle:nt("string")};class Vo extends Mr{data(e={}){return super.data(e)}}class _s{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ai(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Vo(this._firestore,this._userDataWriter,r.key,r,new ai(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(j.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((l=>{const c=new Vo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ai(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>i||l.type!==3)).map((l=>{const c=new Vo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ai(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,d=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:sx(l.type),doc:c,oldIndex:u,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new W(j.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=_s._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=pc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function sx(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ie(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_s._jsonSchemaVersion="firestore/querySnapshot/1.0",_s._jsonSchema={type:nt("string",_s._jsonSchemaVersion),bundleSource:nt("string","QuerySnapshot"),bundleName:nt("string"),bundle:nt("string")};const ix={maxAttempts:5};function li(n,e){if((n=st(n)).firestore!==e)throw new W(j.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ox{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Pa(e)}get(e){const t=li(e,this._firestore),r=new rx(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return ie(24041);const i=s[0];if(i.isFoundDocument())return new na(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new na(this._firestore,r,t._key,null,t.converter);throw ie(18433,{doc:i})}))}set(e,t,r){const s=li(e,this._firestore),i=Rp(s.converter,t,r),o=gp(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=li(e,this._firestore);let o;return o=typeof(t=st(t))=="string"||t instanceof Ca?_p(this._dataReader,"Transaction.update",i._key,t,r,s):yp(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=li(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ax extends ox{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=li(e,this._firestore),r=new xp(this._firestore);return super.get(e).then((s=>new Mr(this._firestore,r,t._key,s._document,new ai(!1,!1),t.converter)))}}function lx(n,e,t){n=Br(n,Gi);const r={...ix,...t};(function(o){if(o.maxAttempts<1)throw new W(j.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=$c(n);return zT(s,(i=>e(new ax(n,i))),r)}function Xt(n){n=Br(n,Vs);const e=Br(n.firestore,Gi),t=$c(e),r=new xp(e);return tx(n._query),$T(t,n._query).then((s=>new _s(e,r,n,s)))}function cx(n,e,t,...r){n=Br(n,rt);const s=Br(n.firestore,Gi),i=Pa(s);let o;return o=typeof(e=st(e))=="string"||e instanceof Ca?_p(i,"updateDoc",n._key,e,t,r):yp(i,"updateDoc",n._key,e),Sp(s,[o.toMutation(n._key,Dt.exists(!0))])}function Ap(n,e){const t=Br(n.firestore,Gi),r=gi(n),s=Rp(n.converter,e),i=Pa(n.firestore);return Sp(t,[gp(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Dt.exists(!1))]).then((()=>r))}function Sp(n,e){const t=$c(n);return BT(t,e)}(function(e,t=!0){jb(Wr),Fr(new mr("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new Gi(new $b(r.getProvider("auth-internal")),new Hb(o,r.getProvider("app-check-internal")),a0(o,s),o);return i={useFetchStreams:t,...i},l._setSettings(i),l}),"PUBLIC").setMultipleInstances(!0)),vn(yd,_d,e),vn(yd,_d,"esm2020")})();var ux="firebase",hx="12.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vn(ux,hx,"app");function Cp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const dx=Cp,Pp=new ji("auth","Firebase",Cp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra=new uc("@firebase/auth");function fx(n,...e){ra.logLevel<=Te.WARN&&ra.warn(`Auth (${Wr}): ${n}`,...e)}function Oo(n,...e){ra.logLevel<=Te.ERROR&&ra.error(`Auth (${Wr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n,...e){throw Gc(n,...e)}function En(n,...e){return Gc(n,...e)}function kp(n,e,t){const r={...dx(),[e]:t};return new ji("auth","Firebase",r).create(e,{appName:n.name})}function fr(n){return kp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Gc(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Pp.create(n,...e)}function le(n,e,...t){if(!n)throw Gc(e,...t)}function On(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Oo(e),new Error(e)}function $n(n,e){n||On(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $l(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function mx(){return bd()==="http:"||bd()==="https:"}function bd(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function px(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(mx()||yw()||"connection"in navigator)?navigator.onLine:!0}function gx(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,t){this.shortDelay=e,this.longDelay=t,$n(t>e,"Short delay should be less than long delay!"),this.isMobile=mw()||_w()}get(){return px()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kc(n,e){$n(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;On("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;On("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;On("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yx={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _x=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],vx=new Qi(3e4,6e4);function qn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Cn(n,e,t,r,s={}){return Dp(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Fi({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:c,...i};return gw()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&Cs(n.emulatorConfig.host)&&(u.credentials="include"),Np.fetch()(await Vp(n,n.config.apiHost,t,l),u)})}async function Dp(n,e,t){n._canInitEmulator=!1;const r={...yx,...e};try{const s=new bx(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw wo(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw wo(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw wo(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw wo(n,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw kp(n,d,u);dn(n,d)}}catch(s){if(s instanceof Sn)throw s;dn(n,"network-request-failed",{message:String(s)})}}async function Da(n,e,t,r,s={}){const i=await Cn(n,e,t,r,s);return"mfaPendingCredential"in i&&dn(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Vp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?Kc(n.config,s):`${n.config.apiScheme}://${s}`;return _x.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function wx(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class bx{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(En(this.auth,"network-request-failed")),vx.get())})}}function wo(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=En(n,e,r);return s.customData._tokenResponse=t,s}function Ed(n){return n!==void 0&&n.enterprise!==void 0}class Ex{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return wx(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Tx(n,e){return Cn(n,"GET","/v2/recaptchaConfig",qn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xx(n,e){return Cn(n,"POST","/v1/accounts:delete",e)}async function sa(n,e){return Cn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ix(n,e=!1){const t=st(n),r=await t.getIdToken(e),s=Qc(r);le(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:yi(il(s.auth_time)),issuedAtTime:yi(il(s.iat)),expirationTime:yi(il(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function il(n){return Number(n)*1e3}function Qc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Oo("JWT malformed, contained fewer than 3 sections"),null;try{const s=Lf(t);return s?JSON.parse(s):(Oo("Failed to decode base64 JWT payload"),null)}catch(s){return Oo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Td(n){const e=Qc(n);return le(e,"internal-error"),le(typeof e.exp<"u","internal-error"),le(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ki(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Sn&&Rx(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Rx({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ax{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=yi(this.lastLoginAt),this.creationTime=yi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ia(n){var p;const e=n.auth,t=await n.getIdToken(),r=await ki(n,sa(e,{idToken:t}));le(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?Op(s.providerUserInfo):[],o=Cx(n.providerData,i),l=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),u=l?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Bl(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(n,d)}async function Sx(n){const e=st(n);await ia(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Cx(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Op(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Px(n,e){const t=await Dp(n,{},async()=>{const r=Fi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Vp(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return n.emulatorConfig&&Cs(n.emulatorConfig.host)&&(c.credentials="include"),Np.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function kx(n,e){return Cn(n,"POST","/v2/accounts:revokeToken",qn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){le(e.idToken,"internal-error"),le(typeof e.idToken<"u","internal-error"),le(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Td(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){le(e.length!==0,"internal-error");const t=Td(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(le(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Px(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new vs;return r&&(le(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(le(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(le(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new vs,this.toJSON())}_performRefresh(){return On("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zn(n,e){le(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ln{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Ax(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Bl(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ki(this,this.stsTokenManager.getToken(this.auth,e));return le(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ix(this,e)}reload(){return Sx(this)}_assign(e){this!==e&&(le(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ln({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){le(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ia(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qt(this.auth.app))return Promise.reject(fr(this.auth));const e=await this.getIdToken();return await ki(this,xx(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,u=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:p,emailVerified:_,isAnonymous:b,providerData:A,stsTokenManager:P}=t;le(p&&P,e,"internal-error");const C=vs.fromJSON(this.name,P);le(typeof p=="string",e,"internal-error"),Zn(r,e.name),Zn(s,e.name),le(typeof _=="boolean",e,"internal-error"),le(typeof b=="boolean",e,"internal-error"),Zn(i,e.name),Zn(o,e.name),Zn(l,e.name),Zn(c,e.name),Zn(u,e.name),Zn(d,e.name);const O=new ln({uid:p,auth:e,email:s,emailVerified:_,displayName:r,isAnonymous:b,photoURL:o,phoneNumber:i,tenantId:l,stsTokenManager:C,createdAt:u,lastLoginAt:d});return A&&Array.isArray(A)&&(O.providerData=A.map(D=>({...D}))),c&&(O._redirectEventId=c),O}static async _fromIdTokenResponse(e,t,r=!1){const s=new vs;s.updateFromServerResponse(t);const i=new ln({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ia(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];le(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Op(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new vs;l.updateFromIdToken(r);const c=new ln({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Bl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,u),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd=new Map;function Ln(n){$n(n instanceof Function,"Expected a class definition");let e=xd.get(n);return e?($n(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,xd.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Lp.type="NONE";const Id=Lp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(n,e,t){return`firebase:${n}:${e}:${t}`}class ws{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Lo(this.userKey,s.apiKey,i),this.fullPersistenceKey=Lo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await sa(this.auth,{idToken:e}).catch(()=>{});return t?ln._fromGetAccountInfoResponse(this.auth,t,e):null}return ln._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new ws(Ln(Id),e,r);const s=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||Ln(Id);const o=Lo(r,e.config.apiKey,e.name);let l=null;for(const u of t)try{const d=await u._get(o);if(d){let p;if(typeof d=="string"){const _=await sa(e,{idToken:d}).catch(()=>{});if(!_)break;p=await ln._fromGetAccountInfoResponse(e,_,d)}else p=ln._fromJSON(e,d);u!==i&&(l=p),i=u;break}}catch{}const c=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new ws(i,e,r):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(t.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new ws(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Up(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Mp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Bp(e))return"Blackberry";if(zp(e))return"Webos";if(jp(e))return"Safari";if((e.includes("chrome/")||Fp(e))&&!e.includes("edge/"))return"Chrome";if($p(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Mp(n=St()){return/firefox\//i.test(n)}function jp(n=St()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Fp(n=St()){return/crios\//i.test(n)}function Up(n=St()){return/iemobile/i.test(n)}function $p(n=St()){return/android/i.test(n)}function Bp(n=St()){return/blackberry/i.test(n)}function zp(n=St()){return/webos/i.test(n)}function Yc(n=St()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Nx(n=St()){var e;return Yc(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Dx(){return vw()&&document.documentMode===10}function Hp(n=St()){return Yc(n)||$p(n)||zp(n)||Bp(n)||/windows phone/i.test(n)||Up(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qp(n,e=[]){let t;switch(n){case"Browser":t=Rd(St());break;case"Worker":t=`${Rd(St())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Wr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vx{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ox(n,e={}){return Cn(n,"GET","/v2/passwordPolicy",qn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lx=6;class Mx{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Lx,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jx{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ad(this),this.idTokenSubscription=new Ad(this),this.beforeStateQueue=new Vx(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Pp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ln(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await ws.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await sa(this,{idToken:e}),r=await ln._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Qt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return le(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ia(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=gx()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qt(this.app))return Promise.reject(fr(this));const t=e?st(e):null;return t&&le(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&le(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qt(this.app)?Promise.reject(fr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qt(this.app)?Promise.reject(fr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ln(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Ox(this),t=new Mx(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ji("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await kx(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ln(e)||this._popupRedirectResolver;le(t,this,"argument-error"),this.redirectPersistenceManager=await ws.create(this,[Ln(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(le(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return le(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&fx(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Qr(n){return st(n)}class Ad{constructor(e){this.auth=e,this.observer=null,this.addObserver=Aw(t=>this.observer=t)}get next(){return le(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Va={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Fx(n){Va=n}function Wp(n){return Va.loadJS(n)}function Ux(){return Va.recaptchaEnterpriseScript}function $x(){return Va.gapiScript}function Bx(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class zx{constructor(){this.enterprise=new Hx}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Hx{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const qx="recaptcha-enterprise",Gp="NO_RECAPTCHA";class Wx{constructor(e){this.type=qx,this.auth=Qr(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{Tx(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new Ex(c);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(c=>{l(c)})})}function s(i,o,l){const c=window.grecaptcha;Ed(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(Gp)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new zx().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(l=>{if(!t&&Ed(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Ux();c.length!==0&&(c+=l),Wp(c).then(()=>{s(l,i,o)}).catch(u=>{o(u)})}}).catch(l=>{o(l)})})}}async function Sd(n,e,t,r=!1,s=!1){const i=new Wx(n);let o;if(s)o=Gp;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,u=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function zl(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Sd(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Sd(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gx(n,e){const t=ga(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(jr(i,e??{}))return s;dn(s,"already-initialized")}return t.initialize({options:e})}function Kx(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Ln);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Qx(n,e,t){const r=Qr(n);le(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Kp(e),{host:o,port:l}=Yx(e),c=l===null?"":`:${l}`,u={url:`${i}//${o}${c}/`},d=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){le(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),le(jr(u,r.config.emulator)&&jr(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Cs(o)?cc(`${i}//${o}${c}`):Jx()}function Kp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Yx(n){const e=Kp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Cd(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Cd(o)}}}function Cd(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Jx(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return On("not implemented")}_getIdTokenResponse(e){return On("not implemented")}_linkToIdToken(e,t){return On("not implemented")}_getReauthenticationResolver(e){return On("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xx(n,e){return Cn(n,"POST","/v1/accounts:resetPassword",qn(n,e))}async function Zx(n,e){return Cn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eI(n,e){return Da(n,"POST","/v1/accounts:signInWithPassword",qn(n,e))}async function tI(n,e){return Cn(n,"POST","/v1/accounts:sendOobCode",qn(n,e))}async function nI(n,e){return tI(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rI(n,e){return Da(n,"POST","/v1/accounts:signInWithEmailLink",qn(n,e))}async function sI(n,e){return Da(n,"POST","/v1/accounts:signInWithEmailLink",qn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni extends Jc{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Ni(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ni(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return zl(e,t,"signInWithPassword",eI);case"emailLink":return rI(e,{email:this._email,oobCode:this._password});default:dn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return zl(e,r,"signUpPassword",Zx);case"emailLink":return sI(e,{idToken:t,email:this._email,oobCode:this._password});default:dn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bs(n,e){return Da(n,"POST","/v1/accounts:signInWithIdp",qn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iI="http://localhost";class Hr extends Jc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Hr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):dn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new Hr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return bs(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,bs(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,bs(e,t)}buildRequest(){const e={requestUri:iI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Fi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oI(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function aI(n){const e=ni(ri(n)).link,t=e?ni(ri(e)).deep_link_id:null,r=ni(ri(n)).deep_link_id;return(r?ni(ri(r)).link:null)||r||t||e||n}class Xc{constructor(e){const t=ni(ri(e)),r=t.apiKey??null,s=t.oobCode??null,i=oI(t.mode??null);le(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=aI(e);try{return new Xc(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(){this.providerId=Os.PROVIDER_ID}static credential(e,t){return Ni._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Xc.parseLink(t);return le(r,"argument-error"),Ni._fromEmailAndCode(e,r.code,r.tenantId)}}Os.PROVIDER_ID="password";Os.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Os.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi extends Qp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr extends Yi{constructor(){super("facebook.com")}static credential(e){return Hr._fromParams({providerId:rr.PROVIDER_ID,signInMethod:rr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return rr.credentialFromTaggedObject(e)}static credentialFromError(e){return rr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return rr.credential(e.oauthAccessToken)}catch{return null}}}rr.FACEBOOK_SIGN_IN_METHOD="facebook.com";rr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr extends Yi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Hr._fromParams({providerId:sr.PROVIDER_ID,signInMethod:sr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return sr.credentialFromTaggedObject(e)}static credentialFromError(e){return sr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return sr.credential(t,r)}catch{return null}}}sr.GOOGLE_SIGN_IN_METHOD="google.com";sr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir extends Yi{constructor(){super("github.com")}static credential(e){return Hr._fromParams({providerId:ir.PROVIDER_ID,signInMethod:ir.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ir.credentialFromTaggedObject(e)}static credentialFromError(e){return ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ir.credential(e.oauthAccessToken)}catch{return null}}}ir.GITHUB_SIGN_IN_METHOD="github.com";ir.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends Yi{constructor(){super("twitter.com")}static credential(e,t){return Hr._fromParams({providerId:or.PROVIDER_ID,signInMethod:or.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return or.credentialFromTaggedObject(e)}static credentialFromError(e){return or.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return or.credential(t,r)}catch{return null}}}or.TWITTER_SIGN_IN_METHOD="twitter.com";or.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await ln._fromIdTokenResponse(e,r,s),o=Pd(r);return new Ss({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Pd(r);return new Ss({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Pd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa extends Sn{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,oa.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new oa(e,t,r,s)}}function Yp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?oa._fromErrorAndOperation(n,i,e,r):i})}async function lI(n,e,t=!1){const r=await ki(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ss._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cI(n,e,t=!1){const{auth:r}=n;if(Qt(r.app))return Promise.reject(fr(r));const s="reauthenticate";try{const i=await ki(n,Yp(r,s,e,n),t);le(i.idToken,r,"internal-error");const o=Qc(i.idToken);le(o,r,"internal-error");const{sub:l}=o;return le(n.uid===l,r,"user-mismatch"),Ss._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&dn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jp(n,e,t=!1){if(Qt(n.app))return Promise.reject(fr(n));const r="signIn",s=await Yp(n,r,e),i=await Ss._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function uI(n,e){return Jp(Qr(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xp(n){const e=Qr(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function hI(n,e,t){const r=Qr(n);await zl(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",nI)}async function dI(n,e,t){await Xx(st(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Xp(n),r})}function fI(n,e,t){return Qt(n.app)?Promise.reject(fr(n)):uI(st(n),Os.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Xp(n),r})}function mI(n,e,t,r){return st(n).onIdTokenChanged(e,t,r)}function pI(n,e,t){return st(n).beforeAuthStateChanged(e,t)}const aa="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(aa,"1"),this.storage.removeItem(aa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI=1e3,yI=10;class eg extends Zp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Hp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Dx()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,yI):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},gI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}eg.type="LOCAL";const _I=eg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg extends Zp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tg.type="SESSION";const ng=tg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vI(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Oa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async u=>u(t.origin,i)),c=await vI(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Oa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const u=Zc("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const _=p;if(_.data.eventId===u)switch(_.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(_.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(){return window}function bI(n){Tn().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rg(){return typeof Tn().WorkerGlobalScope<"u"&&typeof Tn().importScripts=="function"}async function EI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function TI(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function xI(){return rg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg="firebaseLocalStorageDb",II=1,la="firebaseLocalStorage",ig="fbase_key";class Ji{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function La(n,e){return n.transaction([la],e?"readwrite":"readonly").objectStore(la)}function RI(){const n=indexedDB.deleteDatabase(sg);return new Ji(n).toPromise()}function Hl(){const n=indexedDB.open(sg,II);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(la,{keyPath:ig})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(la)?e(r):(r.close(),await RI(),e(await Hl()))})})}async function kd(n,e,t){const r=La(n,!0).put({[ig]:e,value:t});return new Ji(r).toPromise()}async function AI(n,e){const t=La(n,!1).get(e),r=await new Ji(t).toPromise();return r===void 0?null:r.value}function Nd(n,e){const t=La(n,!0).delete(e);return new Ji(t).toPromise()}const SI=800,CI=3;class og{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Hl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>CI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return rg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oa._getInstance(xI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await EI(),!this.activeServiceWorker)return;this.sender=new wI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||TI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Hl();return await kd(e,aa,"1"),await Nd(e,aa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>kd(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>AI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Nd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=La(s,!1).getAll();return new Ji(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),SI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}og.type="LOCAL";const PI=og;new Qi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kI(n,e){return e?Ln(e):(le(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu extends Jc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return bs(e,this._buildIdpRequest())}_linkToIdToken(e,t){return bs(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return bs(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function NI(n){return Jp(n.auth,new eu(n),n.bypassAuthState)}function DI(n){const{auth:e,user:t}=n;return le(t,e,"internal-error"),cI(t,new eu(n),n.bypassAuthState)}async function VI(n){const{auth:e,user:t}=n;return le(t,e,"internal-error"),lI(t,new eu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return NI;case"linkViaPopup":case"linkViaRedirect":return VI;case"reauthViaPopup":case"reauthViaRedirect":return DI;default:dn(this.auth,"internal-error")}}resolve(e){$n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){$n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OI=new Qi(2e3,1e4);class ms extends ag{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ms.currentPopupAction&&ms.currentPopupAction.cancel(),ms.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return le(e,this.auth,"internal-error"),e}async onExecution(){$n(this.filter.length===1,"Popup operations only handle one event");const e=Zc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(En(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(En(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ms.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(En(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,OI.get())};e()}}ms.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LI="pendingRedirect",Mo=new Map;class MI extends ag{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Mo.get(this.auth._key());if(!e){try{const r=await jI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Mo.set(this.auth._key(),e)}return this.bypassAuthState||Mo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function jI(n,e){const t=$I(e),r=UI(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function FI(n,e){Mo.set(n._key(),e)}function UI(n){return Ln(n._redirectPersistence)}function $I(n){return Lo(LI,n.config.apiKey,n.name)}async function BI(n,e,t=!1){if(Qt(n.app))return Promise.reject(fr(n));const r=Qr(n),s=kI(r,e),o=await new MI(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI=600*1e3;class HI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!qI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!lg(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(En(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=zI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Dd(e))}saveEventToCache(e){this.cachedEventUids.add(Dd(e)),this.lastProcessedEventTime=Date.now()}}function Dd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function lg({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function qI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return lg(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WI(n,e={}){return Cn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,KI=/^https?/;async function QI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await WI(n);for(const t of e)try{if(YI(t))return}catch{}dn(n,"unauthorized-domain")}function YI(n){const e=$l(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!KI.test(t))return!1;if(GI.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JI=new Qi(3e4,6e4);function Vd(){const n=Tn().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function XI(n){return new Promise((e,t)=>{var s,i,o;function r(){Vd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Vd(),t(En(n,"network-request-failed"))},timeout:JI.get()})}if((i=(s=Tn().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=Tn().gapi)!=null&&o.load)r();else{const l=Bx("iframefcb");return Tn()[l]=()=>{gapi.load?r():t(En(n,"network-request-failed"))},Wp(`${$x()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw jo=null,e})}let jo=null;function ZI(n){return jo=jo||XI(n),jo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eR=new Qi(5e3,15e3),tR="__/auth/iframe",nR="emulator/auth/iframe",rR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},sR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function iR(n){const e=n.config;le(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Kc(e,nR):`https://${n.config.authDomain}/${tR}`,r={apiKey:e.apiKey,appName:n.name,v:Wr},s=sR.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Fi(r).slice(1)}`}async function oR(n){const e=await ZI(n),t=Tn().gapi;return le(t,n,"internal-error"),e.open({where:document.body,url:iR(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:rR,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=En(n,"network-request-failed"),l=Tn().setTimeout(()=>{i(o)},eR.get());function c(){Tn().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},lR=500,cR=600,uR="_blank",hR="http://localhost";class Od{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function dR(n,e,t,r=lR,s=cR){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...aR,width:r.toString(),height:s.toString(),top:i,left:o},u=St().toLowerCase();t&&(l=Fp(u)?uR:t),Mp(u)&&(e=e||hR,c.scrollbars="yes");const d=Object.entries(c).reduce((_,[b,A])=>`${_}${b}=${A},`,"");if(Nx(u)&&l!=="_self")return fR(e||"",l),new Od(null);const p=window.open(e||"",l,d);le(p,n,"popup-blocked");try{p.focus()}catch{}return new Od(p)}function fR(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR="__/auth/handler",pR="emulator/auth/handler",gR=encodeURIComponent("fac");async function Ld(n,e,t,r,s,i){le(n.config.authDomain,n,"auth-domain-config-required"),le(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Wr,eventId:s};if(e instanceof Qp){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Rw(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof Yi){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await n._getAppCheckToken(),u=c?`#${gR}=${encodeURIComponent(c)}`:"";return`${yR(n)}?${Fi(l).slice(1)}${u}`}function yR({config:n}){return n.emulator?Kc(n,pR):`https://${n.authDomain}/${mR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol="webStorageSupport";class _R{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ng,this._completeRedirectFn=BI,this._overrideRedirectResult=FI}async _openPopup(e,t,r,s){var o;$n((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Ld(e,t,r,$l(),s);return dR(e,i,Zc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Ld(e,t,r,$l(),s);return bI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):($n(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await oR(e),r=new HI(e);return t.register("authEvent",s=>(le(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ol,{type:ol},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[ol];i!==void 0&&t(!!i),dn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=QI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Hp()||jp()||Yc()}}const vR=_R;var Md="@firebase/auth",jd="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){le(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bR(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ER(n){Fr(new mr("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;le(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qp(n)},u=new jx(r,s,i,c);return Kx(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Fr(new mr("auth-internal",e=>{const t=Qr(e.getProvider("auth").getImmediate());return(r=>new wR(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),vn(Md,jd,bR(n)),vn(Md,jd,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TR=300,xR=Uf("authIdTokenMaxAge")||TR;let Fd=null;const IR=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>xR)return;const s=t==null?void 0:t.token;Fd!==s&&(Fd=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function cg(n=fc()){const e=ga(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Gx(n,{popupRedirectResolver:vR,persistence:[PI,_I,ng]}),r=Uf("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=IR(i.toString());pI(t,o,()=>o(t.currentUser)),mI(t,l=>o(l))}}const s=Mf("auth");return s&&Qx(t,`http://${s}`),t}function RR(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Fx({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=En("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",RR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ER("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug="firebasestorage.googleapis.com",AR="storageBucket",SR=120*1e3,CR=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn extends Sn{constructor(e,t,r=0){super(al(e),`Firebase Storage: ${t} (${al(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Pn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return al(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var An;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(An||(An={}));function al(n){return"storage/"+n}function PR(){const n="An unknown error occurred, please check the error payload for server response.";return new Pn(An.UNKNOWN,n)}function kR(){return new Pn(An.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function NR(){return new Pn(An.CANCELED,"User canceled the upload/download.")}function DR(n){return new Pn(An.INVALID_URL,"Invalid URL '"+n+"'.")}function VR(n){return new Pn(An.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Ud(n){return new Pn(An.INVALID_ARGUMENT,n)}function hg(){return new Pn(An.APP_DELETED,"The Firebase app was deleted.")}function OR(n){return new Pn(An.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=cn.makeFromUrl(e,t)}catch{return new cn(e,"")}if(r.path==="")return r;throw VR(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(M){M.path.charAt(M.path.length-1)==="/"&&(M.path_=M.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function u(M){M.path_=decodeURIComponent(M.path)}const d="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),_="(/([^?#]*).*)?$",b=new RegExp(`^https?://${p}/${d}/b/${s}/o${_}`,"i"),A={bucket:1,path:3},P=t===ug?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",O=new RegExp(`^https?://${P}/${s}/${C}`,"i"),$=[{regex:l,indices:c,postModify:i},{regex:b,indices:A,postModify:u},{regex:O,indices:{bucket:1,path:2},postModify:u}];for(let M=0;M<$.length;M++){const q=$[M],G=q.regex.exec(e);if(G){const g=G[q.indices.bucket];let y=G[q.indices.path];y||(y=""),r=new cn(g,y),q.postModify(r);break}}if(r==null)throw DR(e);return r}}class LR{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MR(n,e,t){let r=1,s=null,i=null,o=!1,l=0;function c(){return l===2}let u=!1;function d(...C){u||(u=!0,e.apply(null,C))}function p(C){s=setTimeout(()=>{s=null,n(b,c())},C)}function _(){i&&clearTimeout(i)}function b(C,...O){if(u){_();return}if(C){_(),d.call(null,C,...O);return}if(c()||o){_(),d.call(null,C,...O);return}r<64&&(r*=2);let $;l===1?(l=2,$=0):$=(r+Math.random())*1e3,p($)}let A=!1;function P(C){A||(A=!0,_(),!u&&(s!==null?(C||(l=2),clearTimeout(s),p(0)):C||(l=1)))}return p(0),i=setTimeout(()=>{o=!0,P(!0)},t),P}function jR(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FR(n){return n!==void 0}function $d(n,e,t,r){if(r<e)throw Ud(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Ud(`Invalid value for '${n}'. Expected ${t} or less.`)}function UR(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var ca;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ca||(ca={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $R(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BR{constructor(e,t,r,s,i,o,l,c,u,d,p,_=!0,b=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=d,this.connectionFactory_=p,this.retry=_,this.isUsingEmulator=b,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((A,P)=>{this.resolve_=A,this.reject_=P,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new bo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const c=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===ca.NO_ERROR,c=i.getStatus();if(!l||$R(c,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===ca.ABORT;r(!1,new bo(!1,null,d));return}const u=this.successCodes_.indexOf(c)!==-1;r(!0,new bo(u,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());FR(c)?i(c):i()}catch(c){o(c)}else if(l!==null){const c=PR();c.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,c)):o(c)}else if(s.canceled){const c=this.appDelete_?hg():NR();o(c)}else{const c=kR();o(c)}};this.canceled_?t(!1,new bo(!1,null,!0)):this.backoffId_=MR(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&jR(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class bo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function zR(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function HR(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function qR(n,e){e&&(n["X-Firebase-GMPID"]=e)}function WR(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function GR(n,e,t,r,s,i,o=!0,l=!1){const c=UR(n.urlParams),u=n.url+c,d=Object.assign({},n.headers);return qR(d,e),zR(d,t),HR(d,i),WR(d,r),new BR(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KR(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function QR(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e,t){this._service=e,t instanceof cn?this._location=t:this._location=cn.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new ua(e,t)}get root(){const e=new cn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return QR(this._location.path)}get storage(){return this._service}get parent(){const e=KR(this._location.path);if(e===null)return null;const t=new cn(this._location.bucket,e);return new ua(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw OR(e)}}function Bd(n,e){const t=e==null?void 0:e[AR];return t==null?null:cn.makeFromBucketSpec(t,n)}function YR(n,e,t,r={}){n.host=`${e}:${t}`;const s=Cs(e);s&&cc(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:$f(i,n.app.options.projectId))}class JR{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=ug,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=SR,this._maxUploadRetryTime=CR,this._requests=new Set,s!=null?this._bucket=cn.makeFromBucketSpec(s,this._host):this._bucket=Bd(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=cn.makeFromBucketSpec(this._url,e):this._bucket=Bd(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){$d("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){$d("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ua(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new LR(hg());{const o=GR(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const zd="@firebase/storage",Hd="0.14.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg="storage";function XR(n=fc(),e){n=st(n);const r=ga(n,dg).getImmediate({identifier:e}),s=jf("storage");return s&&ZR(r,...s),r}function ZR(n,e,t,r={}){YR(n,e,t,r)}function eA(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new JR(t,r,s,e,Wr)}function tA(){Fr(new mr(dg,eA,"PUBLIC").setMultipleInstances(!0)),vn(zd,Hd,""),vn(zd,Hd,"esm2020")}tA();const nA={apiKey:"AIzaSyAsBrjvF26MmV1FfhCmftnlsLfgE9lKFLc",authDomain:"itsupporter-tech.firebaseapp.com",projectId:"itsupporter-tech",storageBucket:"itsupporter-tech.firebasestorage.app",messagingSenderId:"284320506206",appId:"1:284320506206:web:a25dbde712c98a0a66afcf",measurementId:"G-KN1H7T1XKC"},rA={apiKey:"AIzaSyAqi-e-B-FB4QOn2oIuf69Wuf6TA877n_M",authDomain:"itsupport-tech-customers.firebaseapp.com",projectId:"itsupport-tech-customers",storageBucket:"itsupport-tech-customers.firebasestorage.app",messagingSenderId:"475656553307",appId:"1:475656553307:web:8dfa0b073c13d582b5107e",measurementId:"G-H844MT923P"},qd="staff",tu=Hf().find(n=>n.name===qd)||dc(nA,qd);cg(tu);const ut=GT(tu);XR(tu);const Wd="customer",sA=Hf().find(n=>n.name===Wd)||dc(rA,Wd),nu=cg(sA),ql="customers";async function ru(n){const e=n.trim().toLowerCase(),t=Hn(Vt(ut,ql),Rn("email","==",e)),r=await Xt(t);if(!r.empty){const o=r.docs[0];return{id:o.id,...o.data()}}const i=(await Xt(Vt(ut,ql))).docs.find(o=>{const l=o.data().email;return typeof l=="string"&&l.trim().toLowerCase()===e});return i?{id:i.id,...i.data()}:null}async function fg(n,e){const t={...e,...typeof e.email=="string"?{email:e.email.trim().toLowerCase()}:{}};await cx(gi(ut,ql,n),{...t,updatedAt:new Date().toISOString()})}async function iA(n,e){return{user:(await fI(nu,n,e)).user}}async function oA(n){await hI(nu,n)}async function aA(n,e){await dI(nu,n,e)}function lA(n){if(typeof document>"u")return;let e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",e.appendChild(t),t.styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n))}Array(12).fill(0);let Wl=1;class cA{constructor(){this.subscribe=e=>(this.subscribers.push(e),()=>{const t=this.subscribers.indexOf(e);this.subscribers.splice(t,1)}),this.publish=e=>{this.subscribers.forEach(t=>t(e))},this.addToast=e=>{this.publish(e),this.toasts=[...this.toasts,e]},this.create=e=>{var t;const{message:r,...s}=e,i=typeof(e==null?void 0:e.id)=="number"||((t=e.id)==null?void 0:t.length)>0?e.id:Wl++,o=this.toasts.find(c=>c.id===i),l=e.dismissible===void 0?!0:e.dismissible;return this.dismissedToasts.has(i)&&this.dismissedToasts.delete(i),o?this.toasts=this.toasts.map(c=>c.id===i?(this.publish({...c,...e,id:i,title:r}),{...c,...e,id:i,dismissible:l,title:r}):c):this.addToast({title:r,...s,dismissible:l,id:i}),i},this.dismiss=e=>(e?(this.dismissedToasts.add(e),requestAnimationFrame(()=>this.subscribers.forEach(t=>t({id:e,dismiss:!0})))):this.toasts.forEach(t=>{this.subscribers.forEach(r=>r({id:t.id,dismiss:!0}))}),e),this.message=(e,t)=>this.create({...t,message:e}),this.error=(e,t)=>this.create({...t,message:e,type:"error"}),this.success=(e,t)=>this.create({...t,type:"success",message:e}),this.info=(e,t)=>this.create({...t,type:"info",message:e}),this.warning=(e,t)=>this.create({...t,type:"warning",message:e}),this.loading=(e,t)=>this.create({...t,type:"loading",message:e}),this.promise=(e,t)=>{if(!t)return;let r;t.loading!==void 0&&(r=this.create({...t,promise:e,type:"loading",message:t.loading,description:typeof t.description!="function"?t.description:void 0}));const s=Promise.resolve(e instanceof Function?e():e);let i=r!==void 0,o;const l=s.then(async u=>{if(o=["resolve",u],os.isValidElement(u))i=!1,this.create({id:r,type:"default",message:u});else if(hA(u)&&!u.ok){i=!1;const p=typeof t.error=="function"?await t.error(`HTTP error! status: ${u.status}`):t.error,_=typeof t.description=="function"?await t.description(`HTTP error! status: ${u.status}`):t.description,A=typeof p=="object"&&!os.isValidElement(p)?p:{message:p};this.create({id:r,type:"error",description:_,...A})}else if(u instanceof Error){i=!1;const p=typeof t.error=="function"?await t.error(u):t.error,_=typeof t.description=="function"?await t.description(u):t.description,A=typeof p=="object"&&!os.isValidElement(p)?p:{message:p};this.create({id:r,type:"error",description:_,...A})}else if(t.success!==void 0){i=!1;const p=typeof t.success=="function"?await t.success(u):t.success,_=typeof t.description=="function"?await t.description(u):t.description,A=typeof p=="object"&&!os.isValidElement(p)?p:{message:p};this.create({id:r,type:"success",description:_,...A})}}).catch(async u=>{if(o=["reject",u],t.error!==void 0){i=!1;const d=typeof t.error=="function"?await t.error(u):t.error,p=typeof t.description=="function"?await t.description(u):t.description,b=typeof d=="object"&&!os.isValidElement(d)?d:{message:d};this.create({id:r,type:"error",description:p,...b})}}).finally(()=>{i&&(this.dismiss(r),r=void 0),t.finally==null||t.finally.call(t)}),c=()=>new Promise((u,d)=>l.then(()=>o[0]==="reject"?d(o[1]):u(o[1])).catch(d));return typeof r!="string"&&typeof r!="number"?{unwrap:c}:Object.assign(r,{unwrap:c})},this.custom=(e,t)=>{const r=(t==null?void 0:t.id)||Wl++;return this.create({jsx:e(r),id:r,...t}),r},this.getActiveToasts=()=>this.toasts.filter(e=>!this.dismissedToasts.has(e.id)),this.subscribers=[],this.toasts=[],this.dismissedToasts=new Set}}const Gt=new cA,uA=(n,e)=>{const t=(e==null?void 0:e.id)||Wl++;return Gt.addToast({title:n,...e,id:t}),t},hA=n=>n&&typeof n=="object"&&"ok"in n&&typeof n.ok=="boolean"&&"status"in n&&typeof n.status=="number",dA=uA,fA=()=>Gt.toasts,mA=()=>Gt.getActiveToasts(),Yt=Object.assign(dA,{success:Gt.success,info:Gt.info,warning:Gt.warning,error:Gt.error,custom:Gt.custom,message:Gt.message,promise:Gt.promise,dismiss:Gt.dismiss,loading:Gt.loading},{getHistory:fA,getToasts:mA});lA("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}[data-sonner-toaster][data-lifted=true]{transform:translateY(-8px)}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");function pA(){const[n,e]=T.useState(""),[t,r]=T.useState(""),[s,i]=T.useState(""),[o,l]=T.useState("email"),[c,u]=T.useState(""),[d,p]=T.useState(!1),_=Tr(),b=C=>{if(C.preventDefault(),i(""),!n.trim()){i("Vui lòng nhập email");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.trim())){i("Email không hợp lệ");return}const D=n.trim().toLowerCase();u(D),l("password")},A=async C=>{if(C.preventDefault(),i(""),p(!0),!t){i("Vui lòng nhập mật khẩu"),p(!1);return}try{await iA(c,t),sessionStorage.setItem("customer_auth",JSON.stringify({email:c,timestamp:Date.now()}));try{const O=await ru(c);O!=null&&O.id&&await fg(String(O.id),{lastLoginAt:new Date().toISOString()})}catch(O){console.error("Update customer login timestamp error:",O)}Yt.success("Đăng nhập thành công!"),_("/portal")}catch(O){const D=O;D.code==="auth/user-not-found"||D.code==="auth/wrong-password"||D.code==="auth/invalid-credential"?i("Email hoặc mật khẩu không chính xác"):D.code==="auth/too-many-requests"?i("Quá nhiều yêu cầu. Vui lòng thử lại sau."):D.code==="auth/invalid-email"?i("Email không hợp lệ"):(i("Có lỗi xảy ra. Vui lòng thử lại."),console.error("Login error:",O))}finally{p(!1)}},P=()=>{l("email"),r(""),i("")};return o==="password"?f.jsx("div",{className:"min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4",children:f.jsxs("div",{className:"w-full max-w-md",children:[f.jsxs("button",{onClick:P,className:"mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors",children:[f.jsx(ma,{className:"w-5 h-5"}),f.jsx("span",{className:"font-medium",children:"Quay lại"})]}),f.jsxs("div",{className:"text-center mb-8",children:[f.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-4",children:f.jsx(fs,{className:"w-10 h-10 text-white"})}),f.jsx("h1",{className:"font-bold text-gray-900 text-xl mb-2",children:"Đăng nhập"}),f.jsx("p",{className:"text-gray-600",children:"Nhập mật khẩu để tiếp tục"})]}),f.jsxs("div",{className:"bg-gray-100 rounded-lg p-3 mb-6 text-center",children:[f.jsx("span",{className:"text-gray-600 text-sm",children:"Email: "}),f.jsx("span",{className:"text-gray-900 font-medium",children:c})]}),f.jsx("div",{className:"bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6",children:f.jsxs("div",{className:"flex items-start gap-3",children:[f.jsx("div",{className:"w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0",children:f.jsx("span",{className:"text-xl",children:"📧"})}),f.jsxs("div",{children:[f.jsx("p",{className:"text-blue-800 font-semibold text-sm mb-1",children:"Hãy kiểm tra email của bạn!"}),f.jsxs("p",{className:"text-blue-700 text-xs leading-relaxed",children:["Nếu bạn chưa đặt mật khẩu hoặc đã quên mật khẩu, vui lòng vào ",f.jsx("strong",{children:"Quên mật khẩu"})," để nhận",f.jsx("strong",{children:" liên kết đặt mật khẩu"})," qua email."]}),f.jsxs("p",{className:"text-blue-600 text-xs mt-2 italic",children:["💡 Không thấy email? Hãy kiểm tra ",f.jsx("strong",{children:"hộp thư rác (Spam/Junk)"}),"."]})]})]})}),f.jsxs("div",{className:"bg-white rounded-2xl shadow-xl p-8 border border-gray-100",children:[f.jsxs("form",{onSubmit:A,className:"space-y-6",children:[f.jsxs("div",{children:[f.jsx("label",{htmlFor:"password",className:"block font-medium text-gray-700 mb-2",children:"Mật khẩu"}),f.jsxs("div",{className:"relative",children:[f.jsx(fs,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),f.jsx("input",{id:"password",type:"password",value:t,onChange:C=>{r(C.target.value),i("")},placeholder:"Nhập mật khẩu",className:"w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all",disabled:d,autoFocus:!0})]}),s&&f.jsxs("p",{className:"mt-2 text-sm text-red-600 flex items-center gap-1",children:[f.jsx("span",{className:"w-1 h-1 bg-red-600 rounded-full"}),s]})]}),f.jsx("button",{type:"submit",disabled:d,className:"w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",children:d?f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white"}),"Đang đăng nhập..."]}):f.jsxs(f.Fragment,{children:["Đăng nhập",f.jsx(lh,{className:"w-5 h-5"})]})})]}),f.jsx("div",{className:"mt-4 text-center",children:f.jsx("button",{onClick:()=>_("/customer/forgot"),className:"text-sm text-orange-600 hover:text-orange-700 underline",children:"Quên mật khẩu?"})})]})]})}):f.jsx("div",{className:"min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4",children:f.jsxs("div",{className:"w-full max-w-md",children:[f.jsxs("div",{className:"text-center mb-8",children:[f.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-4",children:f.jsx(Uo,{className:"w-10 h-10 text-white"})}),f.jsx("h1",{className:"font-bold text-gray-900 text-xl mb-2",children:"Tra cứu máy sửa chữa"}),f.jsx("p",{className:"text-gray-600",children:"Nhập email đã đăng ký để đăng nhập"})]}),f.jsx("div",{className:"bg-white rounded-2xl shadow-xl p-8 border border-gray-100",children:f.jsxs("form",{onSubmit:b,className:"space-y-6",children:[f.jsxs("div",{children:[f.jsx("label",{htmlFor:"email",className:"block font-medium text-gray-700 mb-2",children:"Email"}),f.jsxs("div",{className:"relative",children:[f.jsx(Uo,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),f.jsx("input",{id:"email",type:"email",value:n,onChange:C=>{e(C.target.value),i("")},placeholder:"email@example.com",className:"w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"})]}),s&&f.jsxs("p",{className:"mt-2 text-sm text-red-600 flex items-center gap-1",children:[f.jsx("span",{className:"w-1 h-1 bg-red-600 rounded-full"}),s]})]}),f.jsxs("button",{type:"submit",className:"w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2",children:["Tiếp tục",f.jsx(lh,{className:"w-5 h-5"})]})]})}),f.jsx("p",{className:"text-center text-sm text-gray-500 mt-6",children:"Chưa có tài khoản? Liên hệ cửa hàng để đăng ký dịch vụ"})]})})}function gA(){const[n,e]=T.useState(""),[t,r]=T.useState(""),[s,i]=T.useState(!1),[o,l]=T.useState(!1),c=Tr(),u=async p=>{if(p.preventDefault(),r(""),l(!0),!n.trim()){r("Vui lòng nhập email"),l(!1);return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.trim())){r("Email không hợp lệ"),l(!1);return}if(!await ru(n.trim())){r("Email chưa đăng ký dịch vụ sửa chữa"),l(!1);return}try{await oA(n.trim()),i(!0),Yt.success("Đã gửi link đặt lại mật khẩu qua email!")}catch(A){const P=A;P.code==="auth/user-not-found"?r("Email chưa đăng ký dịch vụ sửa chữa"):P.code==="auth/invalid-email"?r("Email không hợp lệ"):P.code==="auth/too-many-requests"?r("Quá nhiều yêu cầu. Vui lòng thử lại sau."):(r("Có lỗi xảy ra. Vui lòng thử lại."),console.error("Password reset error:",A))}finally{l(!1)}},d=()=>{c("/login")};return s?f.jsx("div",{className:"min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4",children:f.jsxs("div",{className:"w-full max-w-md space-y-4",children:[f.jsx("div",{className:"bg-blue-50 border-2 border-blue-200 rounded-xl p-4",children:f.jsxs("div",{className:"flex items-start gap-3",children:[f.jsx("div",{className:"w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0",children:f.jsx("span",{className:"text-xl",children:"📧"})}),f.jsxs("div",{children:[f.jsx("p",{className:"text-blue-800 font-semibold text-sm mb-1",children:"Hãy kiểm tra email của bạn!"}),f.jsxs("p",{className:"text-blue-700 text-xs leading-relaxed",children:["Chúng tôi đã gửi ",f.jsx("strong",{children:"liên kết đặt mật khẩu"})," đến email của bạn. Vui lòng mở email và",f.jsx("strong",{children:" click vào liên kết"})," để tạo mật khẩu mới."]}),f.jsxs("p",{className:"text-blue-600 text-xs mt-2 italic",children:["💡 Không thấy email? Hãy kiểm tra ",f.jsx("strong",{children:"hộp thư rác (Spam/Junk)"}),"."]})]})]})}),f.jsxs("div",{className:"bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center",children:[f.jsx("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:f.jsx(hh,{className:"w-8 h-8 text-green-600"})}),f.jsx("h1",{className:"font-bold text-gray-900 text-xl mb-2",children:"Đã gửi link!"}),f.jsx("p",{className:"text-gray-600 mb-6",children:"Vui lòng kiểm tra email và click vào link để đặt mật khẩu mới."}),f.jsx("button",{onClick:d,className:"w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg",children:"Quay lại đăng nhập"})]})]})}):f.jsx("div",{className:"min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4",children:f.jsxs("div",{className:"w-full max-w-md",children:[f.jsxs("button",{onClick:d,className:"mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors",children:[f.jsx(ma,{className:"w-5 h-5"}),f.jsx("span",{className:"font-medium",children:"Quay lại"})]}),f.jsxs("div",{className:"text-center mb-8",children:[f.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-4",children:f.jsx(Uo,{className:"w-10 h-10 text-white"})}),f.jsx("h1",{className:"font-bold text-gray-900 text-xl mb-2",children:"Đặt lại mật khẩu"}),f.jsx("p",{className:"text-gray-600",children:"Nhập email đã đăng ký để nhận link đặt lại mật khẩu"})]}),f.jsx("div",{className:"bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6",children:f.jsxs("div",{className:"flex items-start gap-3",children:[f.jsx("div",{className:"w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0",children:f.jsx("span",{className:"text-xl",children:"📧"})}),f.jsxs("div",{children:[f.jsx("p",{className:"text-blue-800 font-semibold text-sm mb-1",children:"Hãy kiểm tra email của bạn!"}),f.jsxs("p",{className:"text-blue-700 text-xs leading-relaxed",children:["Sau khi gửi yêu cầu, chúng tôi sẽ gửi ",f.jsx("strong",{children:"liên kết đặt mật khẩu"})," đến email của bạn. Vui lòng ",f.jsx("strong",{children:"click vào liên kết trong email"})," để tạo mật khẩu mới."]}),f.jsxs("p",{className:"text-blue-600 text-xs mt-2 italic",children:["💡 Không thấy email? Hãy kiểm tra ",f.jsx("strong",{children:"hộp thư rác (Spam/Junk)"}),"."]})]})]})}),f.jsx("div",{className:"bg-white rounded-2xl shadow-xl p-8 border border-gray-100",children:f.jsxs("form",{onSubmit:u,className:"space-y-6",children:[f.jsxs("div",{children:[f.jsx("label",{htmlFor:"email",className:"block font-medium text-gray-700 mb-2",children:"Email"}),f.jsxs("div",{className:"relative",children:[f.jsx(Uo,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),f.jsx("input",{id:"email",type:"email",value:n,onChange:p=>{e(p.target.value),r("")},placeholder:"email@example.com",className:"w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all",disabled:o})]}),t&&f.jsxs("p",{className:"mt-2 text-sm text-red-600 flex items-center gap-1",children:[f.jsx("span",{className:"w-1 h-1 bg-red-600 rounded-full"}),t]})]}),f.jsx("button",{type:"submit",disabled:o,className:"w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",children:o?f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white"}),"Đang gửi..."]}):f.jsxs(f.Fragment,{children:[f.jsx(hh,{className:"w-5 h-5"}),"Gửi link đặt lại mật khẩu"]})})]})}),f.jsx("p",{className:"text-center text-sm text-gray-500 mt-6",children:"Link sẽ có hiệu lực trong 24 giờ"})]})})}function yA(){const[n]=vv(),e=Tr(),[t,r]=T.useState(null),[s,i]=T.useState(""),[o,l]=T.useState(""),[c,u]=T.useState(""),[d,p]=T.useState(""),[_,b]=T.useState(!1),[A,P]=T.useState(!1);T.useEffect(()=>{const D=n.get("mode"),$=n.get("oobCode"),M=n.get("email");D==="resetPassword"&&$?(r($),M&&i(M)):(Yt.error("Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn"),e("/login"))},[n,e]);const C=async D=>{if(D.preventDefault(),p(""),P(!0),o.length<6){p("Mật khẩu phải có ít nhất 6 ký tự"),P(!1);return}if(o!==c){p("Mật khẩu xác nhận không khớp"),P(!1);return}try{if(t)await aA(t,o);else{p("Link đặt lại mật khẩu không hợp lệ"),P(!1);return}Yt.success("Đặt mật khẩu thành công!"),b(!0),setTimeout(()=>{e("/login")},2e3)}catch($){$.code==="auth/expired-action-code"?p("Link đã hết hạn. Vui lòng yêu cầu link mới."):$.code==="auth/invalid-action-code"?p("Link không hợp lệ. Vui lòng yêu cầu link mới."):(p("Có lỗi xảy ra. Vui lòng thử lại."),console.error("Set password error:",$))}finally{P(!1)}},O=()=>{e("/login")};return _?f.jsx("div",{className:"min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4",children:f.jsx("div",{className:"w-full max-w-md",children:f.jsxs("div",{className:"bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center",children:[f.jsx("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:f.jsx(ui,{className:"w-8 h-8 text-green-600"})}),f.jsx("h1",{className:"font-bold text-gray-900 text-xl mb-2",children:"Đặt mật khẩu thành công!"}),f.jsx("p",{className:"text-gray-600 mb-4",children:"Đang chuyển sang trang đăng nhập..."}),f.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"})]})})}):f.jsx("div",{className:"min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4",children:f.jsxs("div",{className:"w-full max-w-md",children:[f.jsxs("button",{onClick:O,className:"mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors",children:[f.jsx(ma,{className:"w-5 h-5"}),f.jsx("span",{className:"font-medium",children:"Quay lại"})]}),f.jsxs("div",{className:"text-center mb-8",children:[f.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-4",children:f.jsx(fs,{className:"w-10 h-10 text-white"})}),f.jsx("h1",{className:"font-bold text-gray-900 text-xl mb-2",children:"Đặt mật khẩu mới"}),f.jsx("p",{className:"text-gray-600",children:"Nhập mật khẩu mới cho tài khoản của bạn"})]}),s&&f.jsxs("div",{className:"bg-gray-100 rounded-lg p-3 mb-6 text-center",children:[f.jsx("span",{className:"text-gray-600 text-sm",children:"Email: "}),f.jsx("span",{className:"text-gray-900 font-medium",children:s})]}),f.jsx("div",{className:"bg-white rounded-2xl shadow-xl p-8 border border-gray-100",children:f.jsxs("form",{onSubmit:C,className:"space-y-6",children:[f.jsxs("div",{children:[f.jsx("label",{htmlFor:"password",className:"block font-medium text-gray-700 mb-2",children:"Mật khẩu mới"}),f.jsxs("div",{className:"relative",children:[f.jsx(fs,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),f.jsx("input",{id:"password",type:"password",value:o,onChange:D=>{l(D.target.value),p("")},placeholder:"Ít nhất 6 ký tự",className:"w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all",disabled:A})]})]}),f.jsxs("div",{children:[f.jsx("label",{htmlFor:"confirmPassword",className:"block font-medium text-gray-700 mb-2",children:"Xác nhận mật khẩu"}),f.jsxs("div",{className:"relative",children:[f.jsx(fs,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),f.jsx("input",{id:"confirmPassword",type:"password",value:c,onChange:D=>{u(D.target.value),p("")},placeholder:"Nhập lại mật khẩu",className:"w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all",disabled:A})]})]}),f.jsxs("div",{className:"flex gap-4 text-xs",children:[f.jsxs("div",{className:`flex items-center gap-1 ${o.length>=6?"text-green-600":"text-gray-400"}`,children:[o.length>=6?f.jsx(ui,{className:"w-3 h-3"}):f.jsx($o,{className:"w-3 h-3"}),"Tối thiểu 6 ký tự"]}),f.jsxs("div",{className:`flex items-center gap-1 ${o===c&&o.length>0?"text-green-600":"text-gray-400"}`,children:[o===c&&o.length>0?f.jsx(ui,{className:"w-3 h-3"}):f.jsx($o,{className:"w-3 h-3"}),"Khớp nhau"]})]}),d&&f.jsxs("p",{className:"text-sm text-red-600 flex items-center gap-1",children:[f.jsx("span",{className:"w-1 h-1 bg-red-600 rounded-full"}),d]}),f.jsx("button",{type:"submit",disabled:!o||!c||A,className:"w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-3.5 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",children:A?f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white"}),"Đang xử lý..."]}):f.jsxs(f.Fragment,{children:[f.jsx(fs,{className:"w-5 h-5"}),"Đặt mật khẩu"]})})]})})]})})}var _A=Object.defineProperty,vA=Object.defineProperties,wA=Object.getOwnPropertyDescriptors,ha=Object.getOwnPropertySymbols,mg=Object.prototype.hasOwnProperty,pg=Object.prototype.propertyIsEnumerable,Gd=(n,e,t)=>e in n?_A(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,bA=(n,e)=>{for(var t in e||(e={}))mg.call(e,t)&&Gd(n,t,e[t]);if(ha)for(var t of ha(e))pg.call(e,t)&&Gd(n,t,e[t]);return n},EA=(n,e)=>vA(n,wA(e)),TA=(n,e)=>{var t={};for(var r in n)mg.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&ha)for(var r of ha(n))e.indexOf(r)<0&&pg.call(n,r)&&(t[r]=n[r]);return t};function xA(n){let e=setTimeout(n,0),t=setTimeout(n,10),r=setTimeout(n,50);return[e,t,r]}function IA(n){let e=T.useRef();return T.useEffect(()=>{e.current=n}),e.current}var RA=18,gg=40,AA=`${gg}px`,SA=["[data-lastpass-icon-root]","com-1password-button","[data-dashlanecreated]",'[style$="2147483647 !important;"]'].join(",");function CA({containerRef:n,inputRef:e,pushPasswordManagerStrategy:t,isFocused:r}){let[s,i]=T.useState(!1),[o,l]=T.useState(!1),[c,u]=T.useState(!1),d=T.useMemo(()=>t==="none"?!1:(t==="increase-width"||t==="experimental-no-flickering")&&s&&o,[s,o,t]),p=T.useCallback(()=>{let _=n.current,b=e.current;if(!_||!b||c||t==="none")return;let A=_,P=A.getBoundingClientRect().left+A.offsetWidth,C=A.getBoundingClientRect().top+A.offsetHeight/2,O=P-RA,D=C;document.querySelectorAll(SA).length===0&&document.elementFromPoint(O,D)===_||(i(!0),u(!0))},[n,e,c,t]);return T.useEffect(()=>{let _=n.current;if(!_||t==="none")return;function b(){let P=window.innerWidth-_.getBoundingClientRect().right;l(P>=gg)}b();let A=setInterval(b,1e3);return()=>{clearInterval(A)}},[n,t]),T.useEffect(()=>{let _=r||document.activeElement===e.current;if(t==="none"||!_)return;let b=setTimeout(p,0),A=setTimeout(p,2e3),P=setTimeout(p,5e3),C=setTimeout(()=>{u(!0)},6e3);return()=>{clearTimeout(b),clearTimeout(A),clearTimeout(P),clearTimeout(C)}},[e,r,t,p]),{hasPWMBadge:s,willPushPWMBadge:d,PWM_BADGE_SPACE_WIDTH:AA}}var yg=T.createContext({}),_g=T.forwardRef((n,e)=>{var t=n,{value:r,onChange:s,maxLength:i,textAlign:o="left",pattern:l,placeholder:c,inputMode:u="numeric",onComplete:d,pushPasswordManagerStrategy:p="increase-width",pasteTransformer:_,containerClassName:b,noScriptCSSFallback:A=PA,render:P,children:C}=t,O=TA(t,["value","onChange","maxLength","textAlign","pattern","placeholder","inputMode","onComplete","pushPasswordManagerStrategy","pasteTransformer","containerClassName","noScriptCSSFallback","render","children"]),D,$,M,q,G;let[g,y]=T.useState(typeof O.defaultValue=="string"?O.defaultValue:""),w=r??g,R=IA(w),I=T.useCallback(oe=>{s==null||s(oe),y(oe)},[s]),S=T.useMemo(()=>l?typeof l=="string"?new RegExp(l):l:null,[l]),E=T.useRef(null),ee=T.useRef(null),ge=T.useRef({value:w,onChange:I,isIOS:typeof window<"u"&&(($=(D=window==null?void 0:window.CSS)==null?void 0:D.supports)==null?void 0:$.call(D,"-webkit-touch-callout","none"))}),he=T.useRef({prev:[(M=E.current)==null?void 0:M.selectionStart,(q=E.current)==null?void 0:q.selectionEnd,(G=E.current)==null?void 0:G.selectionDirection]});T.useImperativeHandle(e,()=>E.current,[]),T.useEffect(()=>{let oe=E.current,fe=ee.current;if(!oe||!fe)return;ge.current.value!==oe.value&&ge.current.onChange(oe.value),he.current.prev=[oe.selectionStart,oe.selectionEnd,oe.selectionDirection];function Ue(){if(document.activeElement!==oe){Fe(null),we(null);return}let me=oe.selectionStart,ke=oe.selectionEnd,nn=oe.selectionDirection,Ct=oe.maxLength,Wt=oe.value,it=he.current.prev,Xe=-1,Ot=-1,Lt;if(Wt.length!==0&&me!==null&&ke!==null){let Jr=me===ke,Wn=me===Wt.length&&Wt.length<Ct;if(Jr&&!Wn){let Pt=me;if(Pt===0)Xe=0,Ot=1,Lt="forward";else if(Pt===Ct)Xe=Pt-1,Ot=Pt,Lt="backward";else if(Ct>1&&Wt.length>1){let wt=0;if(it[0]!==null&&it[1]!==null){Lt=Pt<it[1]?"backward":"forward";let Gn=it[0]===it[1]&&it[0]<Ct;Lt==="backward"&&!Gn&&(wt=-1)}Xe=wt+Pt,Ot=wt+Pt+1}}Xe!==-1&&Ot!==-1&&Xe!==Ot&&E.current.setSelectionRange(Xe,Ot,Lt)}let xt=Xe!==-1?Xe:me,Mt=Ot!==-1?Ot:ke,Yr=Lt??nn;Fe(xt),we(Mt),he.current.prev=[xt,Mt,Yr]}if(document.addEventListener("selectionchange",Ue,{capture:!0}),Ue(),document.activeElement===oe&&Oe(!0),!document.getElementById("input-otp-style")){let me=document.createElement("style");if(me.id="input-otp-style",document.head.appendChild(me),me.sheet){let ke="background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";Xs(me.sheet,"[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"),Xs(me.sheet,`[data-input-otp]:autofill { ${ke} }`),Xs(me.sheet,`[data-input-otp]:-webkit-autofill { ${ke} }`),Xs(me.sheet,"@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"),Xs(me.sheet,"[data-input-otp] + * { pointer-events: all !important; }")}}let dt=()=>{fe&&fe.style.setProperty("--root-height",`${oe.clientHeight}px`)};dt();let vt=new ResizeObserver(dt);return vt.observe(oe),()=>{document.removeEventListener("selectionchange",Ue,{capture:!0}),vt.disconnect()}},[]);let[Ce,z]=T.useState(!1),[De,Oe]=T.useState(!1),[Ve,Fe]=T.useState(null),[ve,we]=T.useState(null);T.useEffect(()=>{xA(()=>{var oe,fe,Ue,dt;(oe=E.current)==null||oe.dispatchEvent(new Event("input"));let vt=(fe=E.current)==null?void 0:fe.selectionStart,me=(Ue=E.current)==null?void 0:Ue.selectionEnd,ke=(dt=E.current)==null?void 0:dt.selectionDirection;vt!==null&&me!==null&&(Fe(vt),we(me),he.current.prev=[vt,me,ke])})},[w,De]),T.useEffect(()=>{R!==void 0&&w!==R&&R.length<i&&w.length===i&&(d==null||d(w))},[i,d,R,w]);let Pe=CA({containerRef:ee,inputRef:E,pushPasswordManagerStrategy:p,isFocused:De}),Je=T.useCallback(oe=>{let fe=oe.currentTarget.value.slice(0,i);if(fe.length>0&&S&&!S.test(fe)){oe.preventDefault();return}typeof R=="string"&&fe.length<R.length&&document.dispatchEvent(new Event("selectionchange")),I(fe)},[i,I,R,S]),Ne=T.useCallback(()=>{var oe;if(E.current){let fe=Math.min(E.current.value.length,i-1),Ue=E.current.value.length;(oe=E.current)==null||oe.setSelectionRange(fe,Ue),Fe(fe),we(Ue)}Oe(!0)},[i]),_t=T.useCallback(oe=>{var fe,Ue;let dt=E.current;if(!_&&(!ge.current.isIOS||!oe.clipboardData||!dt))return;let vt=oe.clipboardData.getData("text/plain"),me=_?_(vt):vt;oe.preventDefault();let ke=(fe=E.current)==null?void 0:fe.selectionStart,nn=(Ue=E.current)==null?void 0:Ue.selectionEnd,Ct=(ke!==nn?w.slice(0,ke)+me+w.slice(nn):w.slice(0,ke)+me+w.slice(ke)).slice(0,i);if(Ct.length>0&&S&&!S.test(Ct))return;dt.value=Ct,I(Ct);let Wt=Math.min(Ct.length,i-1),it=Ct.length;dt.setSelectionRange(Wt,it),Fe(Wt),we(it)},[i,I,S,w]),en=T.useMemo(()=>({position:"relative",cursor:O.disabled?"default":"text",userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none"}),[O.disabled]),tn=T.useMemo(()=>({position:"absolute",inset:0,width:Pe.willPushPWMBadge?`calc(100% + ${Pe.PWM_BADGE_SPACE_WIDTH})`:"100%",clipPath:Pe.willPushPWMBadge?`inset(0 ${Pe.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:"100%",display:"flex",textAlign:o,opacity:"1",color:"transparent",pointerEvents:"all",background:"transparent",caretColor:"transparent",border:"0 solid transparent",outline:"0 solid transparent",boxShadow:"none",lineHeight:"1",letterSpacing:"-.5em",fontSize:"var(--root-height)",fontFamily:"monospace",fontVariantNumeric:"tabular-nums"}),[Pe.PWM_BADGE_SPACE_WIDTH,Pe.willPushPWMBadge,o]),kn=T.useMemo(()=>T.createElement("input",EA(bA({autoComplete:O.autoComplete||"one-time-code"},O),{"data-input-otp":!0,"data-input-otp-placeholder-shown":w.length===0||void 0,"data-input-otp-mss":Ve,"data-input-otp-mse":ve,inputMode:u,pattern:S==null?void 0:S.source,"aria-placeholder":c,style:tn,maxLength:i,value:w,ref:E,onPaste:oe=>{var fe;_t(oe),(fe=O.onPaste)==null||fe.call(O,oe)},onChange:Je,onMouseOver:oe=>{var fe;z(!0),(fe=O.onMouseOver)==null||fe.call(O,oe)},onMouseLeave:oe=>{var fe;z(!1),(fe=O.onMouseLeave)==null||fe.call(O,oe)},onFocus:oe=>{var fe;Ne(),(fe=O.onFocus)==null||fe.call(O,oe)},onBlur:oe=>{var fe;Oe(!1),(fe=O.onBlur)==null||fe.call(O,oe)}})),[Je,Ne,_t,u,tn,i,ve,Ve,O,S==null?void 0:S.source,w]),Le=T.useMemo(()=>({slots:Array.from({length:i}).map((oe,fe)=>{var Ue;let dt=De&&Ve!==null&&ve!==null&&(Ve===ve&&fe===Ve||fe>=Ve&&fe<ve),vt=w[fe]!==void 0?w[fe]:null,me=w[0]!==void 0?null:(Ue=c==null?void 0:c[fe])!=null?Ue:null;return{char:vt,placeholderChar:me,isActive:dt,hasFakeCaret:dt&&vt===null}}),isFocused:De,isHovering:!O.disabled&&Ce}),[De,Ce,i,ve,Ve,O.disabled,w]),qt=T.useMemo(()=>P?P(Le):T.createElement(yg.Provider,{value:Le},C),[C,Le,P]);return T.createElement(T.Fragment,null,A!==null&&T.createElement("noscript",null,T.createElement("style",null,A)),T.createElement("div",{ref:ee,"data-input-otp-container":!0,style:en,className:b},qt,T.createElement("div",{style:{position:"absolute",inset:0,pointerEvents:"none"}},kn)))});_g.displayName="Input";function Xs(n,e){try{n.insertRule(e)}catch{console.error("input-otp could not insert CSS rule:",e)}}var PA=`
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;const su="-",kA=n=>{const e=DA(n),{conflictingClassGroups:t,conflictingClassGroupModifiers:r}=n;return{getClassGroupId:o=>{const l=o.split(su);return l[0]===""&&l.length!==1&&l.shift(),vg(l,e)||NA(o)},getConflictingClassGroupIds:(o,l)=>{const c=t[o]||[];return l&&r[o]?[...c,...r[o]]:c}}},vg=(n,e)=>{var o;if(n.length===0)return e.classGroupId;const t=n[0],r=e.nextPart.get(t),s=r?vg(n.slice(1),r):void 0;if(s)return s;if(e.validators.length===0)return;const i=n.join(su);return(o=e.validators.find(({validator:l})=>l(i)))==null?void 0:o.classGroupId},Kd=/^\[(.+)\]$/,NA=n=>{if(Kd.test(n)){const e=Kd.exec(n)[1],t=e==null?void 0:e.substring(0,e.indexOf(":"));if(t)return"arbitrary.."+t}},DA=n=>{const{theme:e,classGroups:t}=n,r={nextPart:new Map,validators:[]};for(const s in t)Gl(t[s],r,s,e);return r},Gl=(n,e,t,r)=>{n.forEach(s=>{if(typeof s=="string"){const i=s===""?e:Qd(e,s);i.classGroupId=t;return}if(typeof s=="function"){if(VA(s)){Gl(s(r),e,t,r);return}e.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([i,o])=>{Gl(o,Qd(e,i),t,r)})})},Qd=(n,e)=>{let t=n;return e.split(su).forEach(r=>{t.nextPart.has(r)||t.nextPart.set(r,{nextPart:new Map,validators:[]}),t=t.nextPart.get(r)}),t},VA=n=>n.isThemeGetter,OA=n=>{if(n<1)return{get:()=>{},set:()=>{}};let e=0,t=new Map,r=new Map;const s=(i,o)=>{t.set(i,o),e++,e>n&&(e=0,r=t,t=new Map)};return{get(i){let o=t.get(i);if(o!==void 0)return o;if((o=r.get(i))!==void 0)return s(i,o),o},set(i,o){t.has(i)?t.set(i,o):s(i,o)}}},Kl="!",Ql=":",LA=Ql.length,MA=n=>{const{prefix:e,experimentalParseClassName:t}=n;let r=s=>{const i=[];let o=0,l=0,c=0,u;for(let A=0;A<s.length;A++){let P=s[A];if(o===0&&l===0){if(P===Ql){i.push(s.slice(c,A)),c=A+LA;continue}if(P==="/"){u=A;continue}}P==="["?o++:P==="]"?o--:P==="("?l++:P===")"&&l--}const d=i.length===0?s:s.substring(c),p=jA(d),_=p!==d,b=u&&u>c?u-c:void 0;return{modifiers:i,hasImportantModifier:_,baseClassName:p,maybePostfixModifierPosition:b}};if(e){const s=e+Ql,i=r;r=o=>o.startsWith(s)?i(o.substring(s.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:o,maybePostfixModifierPosition:void 0}}if(t){const s=r;r=i=>t({className:i,parseClassName:s})}return r},jA=n=>n.endsWith(Kl)?n.substring(0,n.length-1):n.startsWith(Kl)?n.substring(1):n,FA=n=>{const e=Object.fromEntries(n.orderSensitiveModifiers.map(r=>[r,!0]));return r=>{if(r.length<=1)return r;const s=[];let i=[];return r.forEach(o=>{o[0]==="["||e[o]?(s.push(...i.sort(),o),i=[]):i.push(o)}),s.push(...i.sort()),s}},UA=n=>({cache:OA(n.cacheSize),parseClassName:MA(n),sortModifiers:FA(n),...kA(n)}),$A=/\s+/,BA=(n,e)=>{const{parseClassName:t,getClassGroupId:r,getConflictingClassGroupIds:s,sortModifiers:i}=e,o=[],l=n.trim().split($A);let c="";for(let u=l.length-1;u>=0;u-=1){const d=l[u],{isExternal:p,modifiers:_,hasImportantModifier:b,baseClassName:A,maybePostfixModifierPosition:P}=t(d);if(p){c=d+(c.length>0?" "+c:c);continue}let C=!!P,O=r(C?A.substring(0,P):A);if(!O){if(!C){c=d+(c.length>0?" "+c:c);continue}if(O=r(A),!O){c=d+(c.length>0?" "+c:c);continue}C=!1}const D=i(_).join(":"),$=b?D+Kl:D,M=$+O;if(o.includes(M))continue;o.push(M);const q=s(O,C);for(let G=0;G<q.length;++G){const g=q[G];o.push($+g)}c=d+(c.length>0?" "+c:c)}return c};function zA(){let n=0,e,t,r="";for(;n<arguments.length;)(e=arguments[n++])&&(t=wg(e))&&(r&&(r+=" "),r+=t);return r}const wg=n=>{if(typeof n=="string")return n;let e,t="";for(let r=0;r<n.length;r++)n[r]&&(e=wg(n[r]))&&(t&&(t+=" "),t+=e);return t};function HA(n,...e){let t,r,s,i=o;function o(c){const u=e.reduce((d,p)=>p(d),n());return t=UA(u),r=t.cache.get,s=t.cache.set,i=l,l(c)}function l(c){const u=r(c);if(u)return u;const d=BA(c,t);return s(c,d),d}return function(){return i(zA.apply(null,arguments))}}const ct=n=>{const e=t=>t[n]||[];return e.isThemeGetter=!0,e},bg=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Eg=/^\((?:(\w[\w-]*):)?(.+)\)$/i,qA=/^\d+\/\d+$/,WA=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,GA=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,KA=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,QA=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,YA=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,is=n=>qA.test(n),ye=n=>!!n&&!Number.isNaN(Number(n)),er=n=>!!n&&Number.isInteger(Number(n)),ll=n=>n.endsWith("%")&&ye(n.slice(0,-1)),Dn=n=>WA.test(n),JA=()=>!0,XA=n=>GA.test(n)&&!KA.test(n),Tg=()=>!1,ZA=n=>QA.test(n),eS=n=>YA.test(n),tS=n=>!X(n)&&!Z(n),nS=n=>Ls(n,Rg,Tg),X=n=>bg.test(n),Dr=n=>Ls(n,Ag,XA),cl=n=>Ls(n,aS,ye),Yd=n=>Ls(n,xg,Tg),rS=n=>Ls(n,Ig,eS),Eo=n=>Ls(n,Sg,ZA),Z=n=>Eg.test(n),Zs=n=>Ms(n,Ag),sS=n=>Ms(n,lS),Jd=n=>Ms(n,xg),iS=n=>Ms(n,Rg),oS=n=>Ms(n,Ig),To=n=>Ms(n,Sg,!0),Ls=(n,e,t)=>{const r=bg.exec(n);return r?r[1]?e(r[1]):t(r[2]):!1},Ms=(n,e,t=!1)=>{const r=Eg.exec(n);return r?r[1]?e(r[1]):t:!1},xg=n=>n==="position"||n==="percentage",Ig=n=>n==="image"||n==="url",Rg=n=>n==="length"||n==="size"||n==="bg-size",Ag=n=>n==="length",aS=n=>n==="number",lS=n=>n==="family-name",Sg=n=>n==="shadow",cS=()=>{const n=ct("color"),e=ct("font"),t=ct("text"),r=ct("font-weight"),s=ct("tracking"),i=ct("leading"),o=ct("breakpoint"),l=ct("container"),c=ct("spacing"),u=ct("radius"),d=ct("shadow"),p=ct("inset-shadow"),_=ct("text-shadow"),b=ct("drop-shadow"),A=ct("blur"),P=ct("perspective"),C=ct("aspect"),O=ct("ease"),D=ct("animate"),$=()=>["auto","avoid","all","avoid-page","page","left","right","column"],M=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],q=()=>[...M(),Z,X],G=()=>["auto","hidden","clip","visible","scroll"],g=()=>["auto","contain","none"],y=()=>[Z,X,c],w=()=>[is,"full","auto",...y()],R=()=>[er,"none","subgrid",Z,X],I=()=>["auto",{span:["full",er,Z,X]},er,Z,X],S=()=>[er,"auto",Z,X],E=()=>["auto","min","max","fr",Z,X],ee=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],ge=()=>["start","end","center","stretch","center-safe","end-safe"],he=()=>["auto",...y()],Ce=()=>[is,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...y()],z=()=>[n,Z,X],De=()=>[...M(),Jd,Yd,{position:[Z,X]}],Oe=()=>["no-repeat",{repeat:["","x","y","space","round"]}],Ve=()=>["auto","cover","contain",iS,nS,{size:[Z,X]}],Fe=()=>[ll,Zs,Dr],ve=()=>["","none","full",u,Z,X],we=()=>["",ye,Zs,Dr],Pe=()=>["solid","dashed","dotted","double"],Je=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],Ne=()=>[ye,ll,Jd,Yd],_t=()=>["","none",A,Z,X],en=()=>["none",ye,Z,X],tn=()=>["none",ye,Z,X],kn=()=>[ye,Z,X],Le=()=>[is,"full",...y()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Dn],breakpoint:[Dn],color:[JA],container:[Dn],"drop-shadow":[Dn],ease:["in","out","in-out"],font:[tS],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Dn],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Dn],shadow:[Dn],spacing:["px",ye],text:[Dn],"text-shadow":[Dn],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",is,X,Z,C]}],container:["container"],columns:[{columns:[ye,X,Z,l]}],"break-after":[{"break-after":$()}],"break-before":[{"break-before":$()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:q()}],overflow:[{overflow:G()}],"overflow-x":[{"overflow-x":G()}],"overflow-y":[{"overflow-y":G()}],overscroll:[{overscroll:g()}],"overscroll-x":[{"overscroll-x":g()}],"overscroll-y":[{"overscroll-y":g()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:w()}],"inset-x":[{"inset-x":w()}],"inset-y":[{"inset-y":w()}],start:[{start:w()}],end:[{end:w()}],top:[{top:w()}],right:[{right:w()}],bottom:[{bottom:w()}],left:[{left:w()}],visibility:["visible","invisible","collapse"],z:[{z:[er,"auto",Z,X]}],basis:[{basis:[is,"full","auto",l,...y()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[ye,is,"auto","initial","none",X]}],grow:[{grow:["",ye,Z,X]}],shrink:[{shrink:["",ye,Z,X]}],order:[{order:[er,"first","last","none",Z,X]}],"grid-cols":[{"grid-cols":R()}],"col-start-end":[{col:I()}],"col-start":[{"col-start":S()}],"col-end":[{"col-end":S()}],"grid-rows":[{"grid-rows":R()}],"row-start-end":[{row:I()}],"row-start":[{"row-start":S()}],"row-end":[{"row-end":S()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":E()}],"auto-rows":[{"auto-rows":E()}],gap:[{gap:y()}],"gap-x":[{"gap-x":y()}],"gap-y":[{"gap-y":y()}],"justify-content":[{justify:[...ee(),"normal"]}],"justify-items":[{"justify-items":[...ge(),"normal"]}],"justify-self":[{"justify-self":["auto",...ge()]}],"align-content":[{content:["normal",...ee()]}],"align-items":[{items:[...ge(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...ge(),{baseline:["","last"]}]}],"place-content":[{"place-content":ee()}],"place-items":[{"place-items":[...ge(),"baseline"]}],"place-self":[{"place-self":["auto",...ge()]}],p:[{p:y()}],px:[{px:y()}],py:[{py:y()}],ps:[{ps:y()}],pe:[{pe:y()}],pt:[{pt:y()}],pr:[{pr:y()}],pb:[{pb:y()}],pl:[{pl:y()}],m:[{m:he()}],mx:[{mx:he()}],my:[{my:he()}],ms:[{ms:he()}],me:[{me:he()}],mt:[{mt:he()}],mr:[{mr:he()}],mb:[{mb:he()}],ml:[{ml:he()}],"space-x":[{"space-x":y()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":y()}],"space-y-reverse":["space-y-reverse"],size:[{size:Ce()}],w:[{w:[l,"screen",...Ce()]}],"min-w":[{"min-w":[l,"screen","none",...Ce()]}],"max-w":[{"max-w":[l,"screen","none","prose",{screen:[o]},...Ce()]}],h:[{h:["screen",...Ce()]}],"min-h":[{"min-h":["screen","none",...Ce()]}],"max-h":[{"max-h":["screen",...Ce()]}],"font-size":[{text:["base",t,Zs,Dr]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,Z,cl]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",ll,X]}],"font-family":[{font:[sS,X,e]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[s,Z,X]}],"line-clamp":[{"line-clamp":[ye,"none",Z,cl]}],leading:[{leading:[i,...y()]}],"list-image":[{"list-image":["none",Z,X]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",Z,X]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:z()}],"text-color":[{text:z()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Pe(),"wavy"]}],"text-decoration-thickness":[{decoration:[ye,"from-font","auto",Z,Dr]}],"text-decoration-color":[{decoration:z()}],"underline-offset":[{"underline-offset":[ye,"auto",Z,X]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:y()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Z,X]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Z,X]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:De()}],"bg-repeat":[{bg:Oe()}],"bg-size":[{bg:Ve()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},er,Z,X],radial:["",Z,X],conic:[er,Z,X]},oS,rS]}],"bg-color":[{bg:z()}],"gradient-from-pos":[{from:Fe()}],"gradient-via-pos":[{via:Fe()}],"gradient-to-pos":[{to:Fe()}],"gradient-from":[{from:z()}],"gradient-via":[{via:z()}],"gradient-to":[{to:z()}],rounded:[{rounded:ve()}],"rounded-s":[{"rounded-s":ve()}],"rounded-e":[{"rounded-e":ve()}],"rounded-t":[{"rounded-t":ve()}],"rounded-r":[{"rounded-r":ve()}],"rounded-b":[{"rounded-b":ve()}],"rounded-l":[{"rounded-l":ve()}],"rounded-ss":[{"rounded-ss":ve()}],"rounded-se":[{"rounded-se":ve()}],"rounded-ee":[{"rounded-ee":ve()}],"rounded-es":[{"rounded-es":ve()}],"rounded-tl":[{"rounded-tl":ve()}],"rounded-tr":[{"rounded-tr":ve()}],"rounded-br":[{"rounded-br":ve()}],"rounded-bl":[{"rounded-bl":ve()}],"border-w":[{border:we()}],"border-w-x":[{"border-x":we()}],"border-w-y":[{"border-y":we()}],"border-w-s":[{"border-s":we()}],"border-w-e":[{"border-e":we()}],"border-w-t":[{"border-t":we()}],"border-w-r":[{"border-r":we()}],"border-w-b":[{"border-b":we()}],"border-w-l":[{"border-l":we()}],"divide-x":[{"divide-x":we()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":we()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...Pe(),"hidden","none"]}],"divide-style":[{divide:[...Pe(),"hidden","none"]}],"border-color":[{border:z()}],"border-color-x":[{"border-x":z()}],"border-color-y":[{"border-y":z()}],"border-color-s":[{"border-s":z()}],"border-color-e":[{"border-e":z()}],"border-color-t":[{"border-t":z()}],"border-color-r":[{"border-r":z()}],"border-color-b":[{"border-b":z()}],"border-color-l":[{"border-l":z()}],"divide-color":[{divide:z()}],"outline-style":[{outline:[...Pe(),"none","hidden"]}],"outline-offset":[{"outline-offset":[ye,Z,X]}],"outline-w":[{outline:["",ye,Zs,Dr]}],"outline-color":[{outline:z()}],shadow:[{shadow:["","none",d,To,Eo]}],"shadow-color":[{shadow:z()}],"inset-shadow":[{"inset-shadow":["none",p,To,Eo]}],"inset-shadow-color":[{"inset-shadow":z()}],"ring-w":[{ring:we()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:z()}],"ring-offset-w":[{"ring-offset":[ye,Dr]}],"ring-offset-color":[{"ring-offset":z()}],"inset-ring-w":[{"inset-ring":we()}],"inset-ring-color":[{"inset-ring":z()}],"text-shadow":[{"text-shadow":["none",_,To,Eo]}],"text-shadow-color":[{"text-shadow":z()}],opacity:[{opacity:[ye,Z,X]}],"mix-blend":[{"mix-blend":[...Je(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Je()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[ye]}],"mask-image-linear-from-pos":[{"mask-linear-from":Ne()}],"mask-image-linear-to-pos":[{"mask-linear-to":Ne()}],"mask-image-linear-from-color":[{"mask-linear-from":z()}],"mask-image-linear-to-color":[{"mask-linear-to":z()}],"mask-image-t-from-pos":[{"mask-t-from":Ne()}],"mask-image-t-to-pos":[{"mask-t-to":Ne()}],"mask-image-t-from-color":[{"mask-t-from":z()}],"mask-image-t-to-color":[{"mask-t-to":z()}],"mask-image-r-from-pos":[{"mask-r-from":Ne()}],"mask-image-r-to-pos":[{"mask-r-to":Ne()}],"mask-image-r-from-color":[{"mask-r-from":z()}],"mask-image-r-to-color":[{"mask-r-to":z()}],"mask-image-b-from-pos":[{"mask-b-from":Ne()}],"mask-image-b-to-pos":[{"mask-b-to":Ne()}],"mask-image-b-from-color":[{"mask-b-from":z()}],"mask-image-b-to-color":[{"mask-b-to":z()}],"mask-image-l-from-pos":[{"mask-l-from":Ne()}],"mask-image-l-to-pos":[{"mask-l-to":Ne()}],"mask-image-l-from-color":[{"mask-l-from":z()}],"mask-image-l-to-color":[{"mask-l-to":z()}],"mask-image-x-from-pos":[{"mask-x-from":Ne()}],"mask-image-x-to-pos":[{"mask-x-to":Ne()}],"mask-image-x-from-color":[{"mask-x-from":z()}],"mask-image-x-to-color":[{"mask-x-to":z()}],"mask-image-y-from-pos":[{"mask-y-from":Ne()}],"mask-image-y-to-pos":[{"mask-y-to":Ne()}],"mask-image-y-from-color":[{"mask-y-from":z()}],"mask-image-y-to-color":[{"mask-y-to":z()}],"mask-image-radial":[{"mask-radial":[Z,X]}],"mask-image-radial-from-pos":[{"mask-radial-from":Ne()}],"mask-image-radial-to-pos":[{"mask-radial-to":Ne()}],"mask-image-radial-from-color":[{"mask-radial-from":z()}],"mask-image-radial-to-color":[{"mask-radial-to":z()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":M()}],"mask-image-conic-pos":[{"mask-conic":[ye]}],"mask-image-conic-from-pos":[{"mask-conic-from":Ne()}],"mask-image-conic-to-pos":[{"mask-conic-to":Ne()}],"mask-image-conic-from-color":[{"mask-conic-from":z()}],"mask-image-conic-to-color":[{"mask-conic-to":z()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:De()}],"mask-repeat":[{mask:Oe()}],"mask-size":[{mask:Ve()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",Z,X]}],filter:[{filter:["","none",Z,X]}],blur:[{blur:_t()}],brightness:[{brightness:[ye,Z,X]}],contrast:[{contrast:[ye,Z,X]}],"drop-shadow":[{"drop-shadow":["","none",b,To,Eo]}],"drop-shadow-color":[{"drop-shadow":z()}],grayscale:[{grayscale:["",ye,Z,X]}],"hue-rotate":[{"hue-rotate":[ye,Z,X]}],invert:[{invert:["",ye,Z,X]}],saturate:[{saturate:[ye,Z,X]}],sepia:[{sepia:["",ye,Z,X]}],"backdrop-filter":[{"backdrop-filter":["","none",Z,X]}],"backdrop-blur":[{"backdrop-blur":_t()}],"backdrop-brightness":[{"backdrop-brightness":[ye,Z,X]}],"backdrop-contrast":[{"backdrop-contrast":[ye,Z,X]}],"backdrop-grayscale":[{"backdrop-grayscale":["",ye,Z,X]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[ye,Z,X]}],"backdrop-invert":[{"backdrop-invert":["",ye,Z,X]}],"backdrop-opacity":[{"backdrop-opacity":[ye,Z,X]}],"backdrop-saturate":[{"backdrop-saturate":[ye,Z,X]}],"backdrop-sepia":[{"backdrop-sepia":["",ye,Z,X]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":y()}],"border-spacing-x":[{"border-spacing-x":y()}],"border-spacing-y":[{"border-spacing-y":y()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",Z,X]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[ye,"initial",Z,X]}],ease:[{ease:["linear","initial",O,Z,X]}],delay:[{delay:[ye,Z,X]}],animate:[{animate:["none",D,Z,X]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[P,Z,X]}],"perspective-origin":[{"perspective-origin":q()}],rotate:[{rotate:en()}],"rotate-x":[{"rotate-x":en()}],"rotate-y":[{"rotate-y":en()}],"rotate-z":[{"rotate-z":en()}],scale:[{scale:tn()}],"scale-x":[{"scale-x":tn()}],"scale-y":[{"scale-y":tn()}],"scale-z":[{"scale-z":tn()}],"scale-3d":["scale-3d"],skew:[{skew:kn()}],"skew-x":[{"skew-x":kn()}],"skew-y":[{"skew-y":kn()}],transform:[{transform:[Z,X,"","none","gpu","cpu"]}],"transform-origin":[{origin:q()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:Le()}],"translate-x":[{"translate-x":Le()}],"translate-y":[{"translate-y":Le()}],"translate-z":[{"translate-z":Le()}],"translate-none":["translate-none"],accent:[{accent:z()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:z()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Z,X]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":y()}],"scroll-mx":[{"scroll-mx":y()}],"scroll-my":[{"scroll-my":y()}],"scroll-ms":[{"scroll-ms":y()}],"scroll-me":[{"scroll-me":y()}],"scroll-mt":[{"scroll-mt":y()}],"scroll-mr":[{"scroll-mr":y()}],"scroll-mb":[{"scroll-mb":y()}],"scroll-ml":[{"scroll-ml":y()}],"scroll-p":[{"scroll-p":y()}],"scroll-px":[{"scroll-px":y()}],"scroll-py":[{"scroll-py":y()}],"scroll-ps":[{"scroll-ps":y()}],"scroll-pe":[{"scroll-pe":y()}],"scroll-pt":[{"scroll-pt":y()}],"scroll-pr":[{"scroll-pr":y()}],"scroll-pb":[{"scroll-pb":y()}],"scroll-pl":[{"scroll-pl":y()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Z,X]}],fill:[{fill:["none",...z()]}],"stroke-w":[{stroke:[ye,Zs,Dr,cl]}],stroke:[{stroke:["none",...z()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},uS=HA(cS);function br(...n){return uS(Jg(n))}function hS({className:n,containerClassName:e,...t}){return f.jsx(_g,{"data-slot":"input-otp",containerClassName:br("flex items-center gap-2 has-disabled:opacity-50",e),className:br("disabled:cursor-not-allowed",n),...t})}function dS({className:n,...e}){return f.jsx("div",{"data-slot":"input-otp-group",className:br("flex items-center gap-1",n),...e})}function xo({index:n,className:e,...t}){const r=T.useContext(yg),{char:s,hasFakeCaret:i,isActive:o}=(r==null?void 0:r.slots[n])??{};return f.jsxs("div",{"data-slot":"input-otp-slot","data-active":o,className:br("data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",e),...t,children:[s,i&&f.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:f.jsx("div",{className:"animate-caret-blink bg-foreground h-4 w-px duration-1000"})})]})}function fS(){var P;const[n,e]=T.useState(""),[t,r]=T.useState(""),[s,i]=T.useState(60),[o,l]=T.useState(!1),c=Tr(),d=(P=zn().state)==null?void 0:P.email;T.useEffect(()=>{d||c("/login")},[d,c]),T.useEffect(()=>{if(s>0){const C=setTimeout(()=>i(s-1),1e3);return()=>clearTimeout(C)}else l(!0)},[s]);const p="123456",_=C=>{e(C),r(""),C===p?(sessionStorage.setItem("customer_auth",JSON.stringify({email:d,timestamp:Date.now()})),setTimeout(()=>{c("/portal")},500)):r("Mã OTP không chính xác")},b=()=>{o&&(i(60),l(!1),e(""),r(""),alert(`Mã OTP mới đã được gửi đến ${d}
Mã OTP demo: ${p}`))},A=()=>{c("/login")};return d?f.jsx("div",{className:"min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4",children:f.jsxs("div",{className:"w-full max-w-md",children:[f.jsxs("button",{onClick:A,className:"mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors",children:[f.jsx(ma,{className:"w-5 h-5"}),f.jsx("span",{className:"font-medium",children:"Quay lại"})]}),f.jsxs("div",{className:"text-center mb-8",children:[f.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-4",children:f.jsx(ew,{className:"w-10 h-10 text-white"})}),f.jsx("h1",{className:"font-bold text-gray-900 mb-2",children:"Xác thực OTP"}),f.jsxs("p",{className:"text-gray-600",children:["Mã OTP đã được gửi đến email ",f.jsx("span",{className:"font-semibold text-gray-900",children:d})]})]}),f.jsxs("div",{className:"bg-white rounded-2xl shadow-xl p-8 border border-gray-100",children:[f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{children:[f.jsx("label",{className:"block font-medium text-gray-700 mb-4 text-center",children:"Nhập mã OTP"}),f.jsx("div",{className:"flex justify-center",children:f.jsx(hS,{maxLength:4,value:n,onChange:C=>{e(C),r(""),C.length===4&&_(C)},children:f.jsxs(dS,{children:[f.jsx(xo,{index:0}),f.jsx(xo,{index:1}),f.jsx(xo,{index:2}),f.jsx(xo,{index:3})]})})}),t&&f.jsxs("p",{className:"mt-4 text-sm text-red-600 text-center flex items-center justify-center gap-1",children:[f.jsx("span",{className:"w-1 h-1 bg-red-600 rounded-full"}),t]})]}),f.jsx("div",{className:"text-center",children:o?f.jsxs("button",{onClick:b,className:"text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 mx-auto transition-colors",children:[f.jsx(lc,{className:"w-4 h-4"}),"Gửi lại mã OTP"]}):f.jsxs("p",{className:"text-sm text-gray-500",children:["Gửi lại mã sau ",f.jsxs("span",{className:"font-semibold text-gray-700",children:[s,"s"]})]})})]}),f.jsx("div",{className:"mt-6 pt-6 border-t border-gray-100",children:f.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3",children:f.jsxs("p",{className:"text-xs text-blue-800",children:[f.jsx("span",{className:"font-semibold",children:"Demo:"})," Mã OTP là ",p]})})}),f.jsx("div",{className:"mt-4 text-center",children:f.jsxs("p",{className:"text-sm text-gray-500",children:["Chưa đăng ký dịch vụ?"," ",f.jsx("button",{type:"button",onClick:()=>c("/dang-ky-dich-vu"),className:"text-orange-600 hover:text-orange-700 font-medium underline",children:"Đăng ký ngay"})]})})]})]})}):null}function mS({className:n,...e}){return f.jsx(Gg,{"data-slot":"tabs",className:br("flex flex-col gap-2",n),...e})}function pS({className:n,...e}){return f.jsx(Kg,{"data-slot":"tabs-list",className:br("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",n),...e})}function ul({className:n,...e}){return f.jsx(Qg,{"data-slot":"tabs-trigger",className:br("data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",n),...e})}function hl({className:n,...e}){return f.jsx(Yg,{"data-slot":"tabs-content",className:br("flex-1 outline-none",n),...e})}const gS={COMPLETE:{label:"Hoàn thành",icon:ch,bgColor:"bg-green-50",borderColor:"border-green-200",textColor:"text-green-700",iconColor:"text-green-600"},RUNNING:{label:"Đang sửa",icon:rw,bgColor:"bg-blue-50",borderColor:"border-blue-200",textColor:"text-blue-700",iconColor:"text-blue-600"},WAITING:{label:"Chờ sửa",icon:Nf,bgColor:"bg-yellow-50",borderColor:"border-yellow-200",textColor:"text-yellow-700",iconColor:"text-yellow-600"},RETURNING:{label:"Chờ trả",icon:Yv,bgColor:"bg-purple-50",borderColor:"border-purple-200",textColor:"text-purple-700",iconColor:"text-purple-600"},RETESTING:{label:"Đang test lại",icon:lc,bgColor:"bg-orange-50",borderColor:"border-orange-200",textColor:"text-orange-700",iconColor:"text-orange-600"},RETURNED:{label:"Đã trả",icon:ch,bgColor:"bg-gray-50",borderColor:"border-gray-200",textColor:"text-gray-700",iconColor:"text-gray-600"}};function yS({machine:n}){const e=gS[n.status],t=e.icon;return f.jsxs("div",{className:`border-2 ${e.borderColor} ${e.bgColor} rounded-xl p-5 transition-all hover:shadow-lg`,children:[f.jsxs("div",{className:"flex items-center justify-between mb-4",children:[f.jsxs("div",{className:`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${e.bgColor} border ${e.borderColor}`,children:[f.jsx(t,{className:`w-4 h-4 ${e.iconColor}`}),f.jsx("span",{className:`font-semibold ${e.textColor}`,children:e.label})]}),f.jsxs("span",{className:"text-sm text-gray-500",children:["#",n.id]})]}),f.jsxs("div",{className:"space-y-3",children:[f.jsxs("div",{children:[f.jsx("h3",{className:"font-semibold text-gray-900 mb-1",children:n.category||"Máy tính"}),f.jsx("p",{className:"text-sm text-gray-600 line-clamp-2",children:n.description})]}),f.jsxs("div",{className:"grid grid-cols-2 gap-3 pt-3 border-t border-gray-200",children:[f.jsxs("div",{className:"flex items-start gap-2",children:[f.jsx(Df,{className:"w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"}),f.jsxs("div",{children:[f.jsx("p",{className:"text-xs text-gray-500",children:"Kỹ thuật viên"}),f.jsx("p",{className:"text-sm font-medium text-gray-900",children:n.technician||"Chưa phân"})]})]}),f.jsxs("div",{className:"flex items-start gap-2",children:[f.jsx(Nf,{className:"w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"}),f.jsxs("div",{children:[f.jsx("p",{className:"text-xs text-gray-500",children:"Thời gian"}),f.jsx("p",{className:"text-sm font-medium text-gray-900",children:n.time})]})]})]}),n.appointmentTime&&f.jsxs("div",{className:`mt-3 p-3 rounded-lg ${e.bgColor} border ${e.borderColor}`,children:[f.jsx("p",{className:"text-xs text-gray-600 mb-1",children:"Hẹn lấy máy"}),f.jsx("p",{className:`font-semibold ${e.textColor}`,children:n.appointmentTime})]}),n.status==="COMPLETE"&&n.finalAmount&&f.jsxs("div",{className:"mt-3 p-3 rounded-lg bg-green-50 border border-green-200",children:[f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsx("span",{className:"text-sm text-green-700",children:"Tổng chi phí"}),f.jsxs("span",{className:"font-bold text-green-700",children:[n.finalAmount.toLocaleString("vi-VN"),"đ"]})]}),n.pointsEarned&&n.pointsEarned>0&&f.jsxs("div",{className:"mt-2 pt-2 border-t border-green-200 flex items-center justify-between",children:[f.jsx("span",{className:"text-sm text-green-600",children:"Điểm tích lũy"}),f.jsxs("span",{className:"font-semibold text-green-600",children:["+",n.pointsEarned," điểm"]})]})]}),n.status==="WAITING"&&f.jsxs("div",{className:"mt-3 flex items-start gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200",children:[f.jsx(jv,{className:"w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0"}),f.jsx("p",{className:"text-xs text-yellow-700",children:"Máy của bạn đang chờ được sửa chữa. Chúng tôi sẽ thông báo khi có cập nhật."})]})]})]})}function _i({total:n,page:e,pageSize:t,onPageChange:r,onPageSizeChange:s,pageSizeOptions:i=[5,10,15,20]}){const o=Math.max(1,Math.ceil(n/t)),l=n===0?0:(e-1)*t+1,c=Math.min(e*t,n),d=(()=>{if(o<=7)return Array.from({length:o},(_,b)=>b+1);const p=[1];e>3&&p.push("...");for(let _=Math.max(2,e-1);_<=Math.min(o-1,e+1);_++)p.push(_);return e<o-2&&p.push("..."),p.push(o),p})();return f.jsxs("div",{className:"flex items-center justify-between gap-4 px-1 pt-3 pb-1 flex-wrap",children:[f.jsxs("div",{className:"flex items-center gap-3 text-sm text-gray-500",children:[f.jsx("span",{children:n===0?"Không có dữ liệu":`Hiển thị ${l}–${c} / ${n} mục`}),f.jsxs("div",{className:"flex items-center gap-1.5",children:[f.jsx("span",{className:"text-gray-400 text-xs",children:"Hiện"}),f.jsx("div",{className:"flex items-center gap-0.5 border border-gray-200 rounded-lg overflow-hidden bg-white",children:i.map(p=>f.jsx("button",{onClick:()=>{s(p),r(1)},className:`px-2.5 py-1 text-xs transition-colors ${t===p?"bg-orange-500 text-white font-semibold":"text-gray-500 hover:bg-orange-50 hover:text-orange-600"}`,children:p},p))}),f.jsx("span",{className:"text-gray-400 text-xs",children:"/ trang"})]})]}),f.jsxs("div",{className:"flex items-center gap-1",children:[f.jsx("button",{onClick:()=>r(e-1),disabled:e<=1,className:"w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",children:f.jsx(Vv,{size:14})}),d.map((p,_)=>p==="..."?f.jsx("span",{className:"w-8 h-8 flex items-center justify-center text-gray-400 text-xs select-none",children:"…"},`ellipsis-${_}`):f.jsx("button",{onClick:()=>r(p),className:`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors border ${e===p?"bg-orange-500 text-white border-orange-500 shadow-sm":"bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"}`,children:p},p)),f.jsx("button",{onClick:()=>r(e+1),disabled:e>=o,className:"w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",children:f.jsx(Lv,{size:14})})]})]})}function vi(n=10){const[e,t]=T.useState(1),[r,s]=T.useState(n),i=u=>t(u),o=u=>{s(u),t(1)},l=()=>t(1);function c(u){return u.slice((e-1)*r,e*r)}return{page:e,pageSize:r,handlePageChange:i,handlePageSizeChange:o,resetPage:l,paginate:c}}function _S({machines:n}){const e=Tr(),[t,r]=T.useState(""),s=vi(5),i=t?n.filter(o=>new Date(o.time).toISOString().split("T")[0]===t):n;return T.useEffect(()=>{s.resetPage()},[t]),n.length===0?f.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100",children:[f.jsx(So,{className:"w-16 h-16 text-gray-300 mx-auto mb-4"}),f.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Chưa có máy nào"}),f.jsx("p",{className:"text-gray-600 mb-6",children:"Bạn chưa đăng ký sửa chữa máy nào"}),f.jsxs("button",{onClick:()=>e("/dang-ky-dich-vu"),className:"inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl",children:[f.jsx(So,{className:"w-5 h-5"}),"Đăng ký sửa máy ngay"]})]}):f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4 border border-gray-200",children:[f.jsxs("div",{className:"flex items-center gap-3",children:[f.jsx(kf,{className:"w-5 h-5 text-orange-600"}),f.jsxs("div",{className:"flex-1",children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1.5",children:"Lọc theo ngày đăng ký"}),f.jsx("input",{type:"date",value:t,onChange:o=>r(o.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"})]}),t&&f.jsx("button",{onClick:()=>r(""),className:"mt-6 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",title:"Xóa bộ lọc",children:f.jsx($o,{className:"w-5 h-5"})})]}),t&&f.jsxs("div",{className:"mt-3 flex items-center gap-2 text-sm",children:[f.jsx("span",{className:"text-gray-600",children:"Hiển thị:"}),f.jsxs("span",{className:"font-semibold text-orange-600",children:[i.length," máy"]}),f.jsxs("span",{className:"text-gray-500",children:["vào ngày ",new Date(t).toLocaleDateString("vi-VN")]})]})]}),f.jsx("div",{className:"grid gap-4",children:s.paginate(i).map(o=>f.jsx(yS,{machine:o},o.id))}),f.jsx(_i,{total:i.length,page:s.page,pageSize:s.pageSize,onPageChange:s.handlePageChange,onPageSizeChange:s.handlePageSizeChange}),f.jsx("div",{className:"bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-dashed border-orange-300 hover:border-orange-400 transition-all",children:f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsxs("div",{children:[f.jsx("h4",{className:"font-semibold text-gray-900 mb-1",children:"Cần sửa máy khác?"}),f.jsx("p",{className:"text-sm text-gray-600",children:"Đăng ký thêm máy mới để được hỗ trợ"})]}),f.jsxs("button",{onClick:()=>e("/dang-ky-dich-vu"),className:"px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2",children:[f.jsx(So,{className:"w-4 h-4"}),"Đăng ký ngay"]})]})})]})}const vS="invoices";async function wS(n){const e=Hn(Vt(ut,vS),Rn("customerEmail","==",n.toLowerCase()));return(await Xt(e)).docs.map(r=>({id:r.id,...r.data()}))}function dl(n){return new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(n)}function bS({invoices:n}){const[e,t]=T.useState(""),r=vi(5),s=e?n.filter(o=>new Date(o.createdAt).toISOString().split("T")[0]===e):n,i=[...s].sort((o,l)=>new Date(l.createdAt).getTime()-new Date(o.createdAt).getTime());return T.useEffect(()=>{r.resetPage()},[e]),n.length===0?f.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100",children:[f.jsx(_l,{className:"w-16 h-16 text-gray-300 mx-auto mb-4"}),f.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Chưa có hóa đơn nào"}),f.jsx("p",{className:"text-gray-600 mb-6",children:"Bạn chưa có hóa đơn nào trong hệ thống"})]}):f.jsxs("div",{className:"space-y-6",children:[n.length>0&&f.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4 border border-gray-200",children:[f.jsxs("div",{className:"flex items-center gap-3",children:[f.jsx(kf,{className:"w-5 h-5 text-orange-600"}),f.jsxs("div",{className:"flex-1",children:[f.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1.5",children:"Lọc theo ngày tạo hóa đơn"}),f.jsx("input",{type:"date",value:e,onChange:o=>t(o.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"})]}),e&&f.jsx("button",{onClick:()=>t(""),className:"mt-6 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",title:"Xóa bộ lọc",children:f.jsx($o,{className:"w-5 h-5"})})]}),e&&f.jsxs("div",{className:"mt-3 flex items-center gap-2 text-sm",children:[f.jsx("span",{className:"text-gray-600",children:"Hiển thị:"}),f.jsxs("span",{className:"font-semibold text-orange-600",children:[s.length," hóa đơn"]}),f.jsxs("span",{className:"text-gray-500",children:["vào ngày ",new Date(e).toLocaleDateString("vi-VN")]})]})]}),f.jsx("div",{className:"space-y-4",children:r.paginate(i).map(o=>f.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow",children:[f.jsxs("div",{className:"flex items-start justify-between mb-4 pb-4 border-b border-gray-100",children:[f.jsxs("div",{children:[f.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[f.jsx(_l,{className:"w-5 h-5 text-orange-600"}),f.jsx("h4",{className:"font-bold text-gray-900",children:o.invoiceNumber})]}),f.jsxs("p",{className:"text-sm text-gray-600",children:[new Date(o.createdAt).toLocaleDateString("vi-VN")," • ",o.createdTime]}),f.jsx("div",{className:"mt-2",children:f.jsx("span",{className:`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${o.registrationType==="online"?"bg-blue-100 text-blue-800":"bg-purple-100 text-purple-800"}`,children:o.registrationType==="online"?"Đăng ký online":"Đăng ký tại quầy"})})]}),f.jsxs("div",{className:"text-right",children:[f.jsx("p",{className:"text-sm text-gray-600 mb-1",children:"Tổng tiền"}),f.jsx("p",{className:"font-bold text-orange-600 text-xl",children:dl(o.finalAmount)}),f.jsx("div",{className:"mt-2",children:f.jsx("span",{className:`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${o.paymentStatus==="paid"?"bg-green-100 text-green-800":o.paymentStatus==="free"?"bg-gray-100 text-gray-800":"bg-yellow-100 text-yellow-800"}`,children:o.paymentStatus==="paid"?"Đã thanh toán":o.paymentStatus==="free"?"Miễn phí":"Chờ thanh toán"})})]})]}),f.jsxs("div",{className:"mb-4",children:[f.jsx("p",{className:"text-sm font-medium text-gray-700 mb-2",children:"Dịch vụ:"}),f.jsx("div",{className:"space-y-2",children:o.services.map((l,c)=>f.jsxs("div",{className:"flex items-center justify-between text-sm",children:[f.jsxs("span",{className:"text-gray-600",children:["• ",l.name]}),f.jsx("span",{className:"font-medium text-gray-900",children:dl(l.price)})]},c))})]}),f.jsxs("div",{className:"grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg",children:[f.jsxs("div",{children:[f.jsx("p",{className:"text-xs text-gray-600 mb-1",children:"Danh mục"}),f.jsx("p",{className:"text-sm font-medium text-gray-900",children:o.category})]}),f.jsxs("div",{children:[f.jsx("p",{className:"text-xs text-gray-600 mb-1",children:"Bảo hành"}),f.jsx("p",{className:"text-sm font-medium text-gray-900",children:o.warranty==="con"?"Còn bảo hành":"Hết bảo hành"})]})]}),o.discountCode&&o.discountAmount>0&&f.jsx("div",{className:"mb-4 p-3 bg-green-50 border border-green-200 rounded-lg",children:f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsxs("div",{children:[f.jsx("p",{className:"text-xs text-green-700 mb-0.5",children:"Mã giảm giá"}),f.jsx("p",{className:"text-sm font-bold text-green-800",children:o.discountCode})]}),f.jsxs("p",{className:"text-sm font-bold text-green-700",children:["-",dl(o.discountAmount)]})]})}),o.pointsEarned&&o.pointsEarned>0&&f.jsxs("div",{className:"flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg",children:[f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsx(vl,{className:"w-4 h-4 text-orange-600"}),f.jsx("span",{className:"text-sm text-orange-900",children:"Điểm thưởng"})]}),f.jsxs("span",{className:"text-sm font-bold text-orange-600",children:["+",o.pointsEarned," điểm"]})]}),o.notes&&f.jsxs("div",{className:"mt-4 pt-4 border-t border-gray-100",children:[f.jsx("p",{className:"text-xs text-gray-600 mb-1",children:"Ghi chú:"}),f.jsx("p",{className:"text-sm text-gray-900",children:o.notes})]})]},o.id))}),f.jsx(_i,{total:i.length,page:r.page,pageSize:r.pageSize,onPageChange:r.handlePageChange,onPageSizeChange:r.handlePageSizeChange})]})}const Xi="redeemed_vouchers",Cg="discounts";async function ES(n){return(await Ap(Vt(ut,Xi),n)).id}async function TS(n){console.log("[DEBUG getFirestoreCustomerRedeemedVouchers] phone:",n);const e=Hn(Vt(ut,Xi),Rn("customerPhone","==",n)),t=await Xt(e);return console.log("[DEBUG getFirestoreCustomerRedeemedVouchers] found:",t.size,"vouchers"),t.docs.map(r=>({id:r.id,...r.data()}))}async function xS(n){const e=n.toLowerCase(),t=Hn(Vt(ut,Xi),Rn("customerEmail","==",e));return(await Xt(t)).docs.map(s=>({id:s.id,...s.data()}))}async function IS(n,e){const t=n.toLowerCase(),r=Hn(Vt(ut,Xi),Rn("customerEmail","==",t),Rn("voucherCode","==",e));return!(await Xt(r)).empty}async function Pg(n){console.log("[DEBUG getCustomerVouchersWithStatus] phone:",n);const e=await TS(n);console.log("[DEBUG getCustomerVouchersWithStatus] vouchers found:",e.length);const t=[];for(const r of e){const s=Hn(Vt(ut,Cg),Rn("code","==",r.voucherCode)),i=await Xt(s);if(i.empty){t.push({...r,status:"expired",statusLabel:"Mã không tồn tại"});continue}const o=i.docs[0].data(),l=new Date,c=new Date(o.validUntil||0);c.setHours(23,59,59,999),console.log("[DEBUG getCustomerVouchersWithStatus] discount validUntil:",o.validUntil,"now:",l.toISOString(),"isExpired:",l>c);const u=o.usageCount||0,d=o.usageLimit||0;r.usedAt?t.push({...r,discountPercent:o.discountPercent,maxDiscount:o.maxDiscount,validUntil:o.validUntil,status:"used",statusLabel:"Đã sử dụng"}):u>=d?t.push({...r,discountPercent:o.discountPercent,maxDiscount:o.maxDiscount,validUntil:o.validUntil,status:"out_of_uses",statusLabel:"Đã hết lượt sử dụng"}):l>c?t.push({...r,discountPercent:o.discountPercent,maxDiscount:o.maxDiscount,validUntil:o.validUntil,status:"expired",statusLabel:"Đã hết hạn"}):t.push({...r,discountPercent:o.discountPercent,maxDiscount:o.maxDiscount,validUntil:o.validUntil,status:"available",statusLabel:"Còn dùng được"})}return t}async function RS(n,e){const t=gi(ut,Xi,n),r=gi(ut,"customers",e);try{return await lx(ut,async i=>{const o=await i.get(t);if(!o.exists())return{success:!1,error:"Voucher không tồn tại"};const l=o.data();if(l.customerPhone!==e)return{success:!1,error:"Không có quyền hoàn điểm voucher này"};if(l.usedAt)return{success:!1,error:"Voucher đã được sử dụng, không thể hoàn điểm"};const c=Hn(Vt(ut,Cg),Rn("code","==",l.voucherCode)),u=await Xt(c);if(!u.empty){const A=u.docs[0].data(),P=new Date(A.validUntil||0);if(P.setHours(23,59,59,999),new Date<=P)return{success:!1,error:"Voucher chưa hết hạn, không thể hoàn điểm"}}const d=l.pointsSpent||0,p=Math.floor(d*(2/3));if(p<=0)return{success:!1,error:"Không có điểm để hoàn"};const _=await i.get(r);if(_.exists()){const A=_.data().points||0;i.update(r,{points:A+p})}i.delete(t);const b=gi(Vt(ut,"point_history"));return i.set(b,{customerPhone:l.customerPhone,customerEmail:l.customerEmail||"",customerName:l.customerName,type:"earn",points:p,date:new Date().toISOString(),description:`Hoàn tiền voucher ${l.voucherCode}`,relatedId:n}),{success:!0,refundPoints:p}})}catch(s){return{success:!1,error:s instanceof Error?s.message:"Không thể hoàn điểm"}}}function AS({customer:n,redeemableVouchers:e,redeemedVouchers:t,vouchersWithStatus:r,pointHistory:s,onRedeem:i}){const[o,l]=T.useState(null),[c,u]=T.useState(null),[d,p]=T.useState(r),[_,b]=T.useState("all"),A=vi(5),P=vi(5),C=vi(10),O=d.filter(M=>_==="available"?M.status==="available":_==="expired"?M.status==="expired"||M.status==="used"||M.status==="out_of_uses":!0);T.useEffect(()=>{p(r)},[r]),T.useEffect(()=>{P.resetPage()},[r.length,_]),T.useEffect(()=>{C.resetPage()},[s.length]);const D=M=>{navigator.clipboard.writeText(M),l(M),setTimeout(()=>l(null),2e3)},$=async M=>{const q=Math.floor(M.pointsSpent*.6666666666666666);if(confirm(`Hoàn ${q} điểm cho voucher ${M.voucherCode}?`)){u(M.id);try{const G=await RS(M.id,n.phone);if(G.success){Yt.success(`Đã hoàn ${G.refundPoints} điểm cho voucher ${M.voucherCode}`);const g=await Pg(n.phone);p(g)}else Yt.error(G.error||"Không thể hoàn điểm")}catch(G){Yt.error("Không thể hoàn điểm: "+(G instanceof Error?G.message:"Lỗi không xác định"))}finally{u(null)}}};return f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-6 border border-gray-100",children:[f.jsx("h3",{className:"font-semibold text-gray-900 mb-4",children:"Thông tin cá nhân"}),f.jsxs("div",{className:"space-y-3",children:[f.jsxs("div",{className:"flex justify-between py-2 border-b border-gray-100",children:[f.jsx("span",{className:"text-gray-600",children:"Họ tên"}),f.jsx("span",{className:"font-medium text-gray-900",children:n.name})]}),f.jsxs("div",{className:"flex justify-between py-2 border-b border-gray-100",children:[f.jsx("span",{className:"text-gray-600",children:"Số điện thoại"}),f.jsx("span",{className:"font-medium text-gray-900",children:n.phone})]}),f.jsxs("div",{className:"flex justify-between py-2 border-b border-gray-100",children:[f.jsx("span",{className:"text-gray-600",children:"Email"}),f.jsx("span",{className:"font-medium text-gray-900",children:n.email})]}),f.jsxs("div",{className:"flex justify-between py-2 border-b border-gray-100",children:[f.jsx("span",{className:"text-gray-600",children:"Tổng số lần sửa"}),f.jsxs("span",{className:"font-medium text-gray-900",children:[n.totalRepairs," lần"]})]}),f.jsxs("div",{className:"flex justify-between py-2",children:[f.jsx("span",{className:"text-gray-600",children:"Điểm tích lũy"}),f.jsxs("span",{className:"font-bold text-orange-600 text-lg",children:[n.points," điểm"]})]})]})]}),f.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-6 border border-gray-100",children:[f.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[f.jsx(vl,{className:"w-5 h-5 text-orange-600"}),f.jsx("h3",{className:"font-semibold text-gray-900",children:"Đổi voucher"})]}),e.length===0?f.jsxs("div",{className:"text-center py-8",children:[f.jsx(vl,{className:"w-12 h-12 text-gray-300 mx-auto mb-3"}),f.jsx("p",{className:"text-gray-600 mb-2",children:"Chưa có voucher khả dụng"}),f.jsx("p",{className:"text-sm text-gray-500",children:"Tích thêm điểm để đổi voucher giảm giá"})]}):f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"space-y-3",children:A.paginate(e).map(M=>{var G,g;const q=t.some(y=>y.voucherCode===M.code);return f.jsxs("div",{className:`border rounded-lg p-4 flex items-center justify-between transition-colors ${q?"border-green-300 bg-green-50":"border-gray-200 hover:border-orange-300"}`,children:[f.jsxs("div",{className:"flex-1",children:[f.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[q?f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsx("span",{className:"font-bold text-orange-600 select-all cursor-pointer",onClick:()=>D(M.code),children:M.code}),f.jsx("button",{onClick:()=>D(M.code),className:"p-1 hover:bg-orange-100 rounded transition-colors",title:"Sao chép mã",children:o===M.code?f.jsx(ui,{className:"w-4 h-4 text-green-600"}):f.jsx(uh,{className:"w-4 h-4 text-orange-600"})})]}):f.jsx("span",{className:"font-bold text-orange-600 select-none",style:{filter:"blur(4px)",userSelect:"none",pointerEvents:"none"},children:M.code}),f.jsxs("span",{className:"text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full",children:["-",M.discountPercent,"%"]}),q&&f.jsx("span",{className:"text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full",children:"Đã đổi"})]}),f.jsx("p",{className:"text-sm text-gray-600",children:M.description}),f.jsxs("div",{className:"flex items-center gap-3 text-xs text-gray-500 mt-1",children:[f.jsxs("span",{children:["Giảm tối đa: ",(G=M.maxDiscount)==null?void 0:G.toLocaleString("vi-VN"),"đ"]}),f.jsx("span",{children:"•"}),f.jsxs("span",{children:["Hết hạn: ",new Date(M.validUntil).toLocaleDateString("vi-VN")]})]}),f.jsx("p",{className:"text-xs text-gray-500 mt-1",children:q?`Đã đổi ${new Date(((g=t.find(y=>y.voucherCode===M.code))==null?void 0:g.redeemedAt)||"").toLocaleDateString("vi-VN")}`:`Cần ${M.pointsRequired} điểm`})]}),!q&&f.jsx("button",{onClick:()=>i(M),disabled:n.points<(M.pointsRequired||0),className:"ml-4 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",children:"Đổi"})]},M.id)})}),f.jsx(_i,{total:e.length,page:A.page,pageSize:A.pageSize,onPageChange:A.handlePageChange,onPageSizeChange:A.handlePageSizeChange})]})]}),r.length>0&&f.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-6 border border-gray-100",children:[f.jsxs("div",{className:"flex items-center justify-between mb-4",children:[f.jsx("h3",{className:"font-semibold text-gray-900",children:"Voucher của tôi"}),f.jsx("div",{className:"flex gap-1 bg-gray-100 p-1 rounded-lg",children:["all","available","expired"].map(M=>f.jsx("button",{onClick:()=>b(M),className:`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${_===M?"bg-white text-orange-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:M==="all"?"Tất cả":M==="available"?"Sử dụng được":"Hết hạn"},M))})]}),O.length===0?f.jsx("div",{className:"text-center py-6 text-gray-500",children:"Không có voucher nào"}):f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"space-y-3",children:P.paginate(O).map(M=>{var y;const q=M.status==="available",G=Math.floor(M.pointsSpent*(2/3)),g=M.status==="expired"&&G>0;return f.jsxs("div",{className:`border rounded-lg p-4 flex items-center justify-between transition-colors ${q?"border-green-300 bg-green-50":"border-red-200 bg-red-50"}`,children:[f.jsxs("div",{className:"flex-1",children:[f.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[f.jsx("span",{className:"font-bold text-orange-600 select-all cursor-pointer",onClick:()=>D(M.voucherCode),children:M.voucherCode}),f.jsx("button",{onClick:()=>D(M.voucherCode),className:"p-1 hover:bg-orange-100 rounded transition-colors",title:"Sao chép mã",children:o===M.voucherCode?f.jsx(ui,{className:"w-4 h-4 text-green-600"}):f.jsx(uh,{className:"w-4 h-4 text-orange-600"})}),f.jsx("span",{className:`text-xs px-2 py-0.5 rounded-full ${q?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:M.statusLabel})]}),f.jsx("p",{className:"text-sm text-gray-600",children:M.voucherName}),f.jsxs("div",{className:"flex items-center gap-3 text-xs text-gray-500 mt-1",children:[f.jsxs("span",{children:["-",M.discountPercent,"% (tối đa ",(y=M.maxDiscount)==null?void 0:y.toLocaleString("vi-VN"),"đ)"]}),f.jsx("span",{children:"•"}),f.jsxs("span",{children:["Hết hạn: ",M.validUntil?new Date(M.validUntil).toLocaleDateString("vi-VN"):"N/A"]})]}),f.jsx("p",{className:"text-xs text-gray-500 mt-1",children:M.usedAt?`Đã dùng: ${new Date(M.usedAt).toLocaleDateString("vi-VN")}`:`Đổi ngày: ${new Date(M.redeemedAt).toLocaleDateString("vi-VN")}`})]}),g&&f.jsxs("button",{onClick:()=>$(M),disabled:c===M.id,className:"flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-3",children:[f.jsx(lc,{size:12,className:c===M.id?"animate-spin":""}),"Hoàn ",G," điểm"]})]},M.id)})}),f.jsx(_i,{total:O.length,page:P.page,pageSize:P.pageSize,onPageChange:P.handlePageChange,onPageSizeChange:P.handlePageSizeChange})]})]}),f.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-6 border border-gray-100",children:[f.jsx("h3",{className:"font-semibold text-gray-900 mb-4",children:"Lịch sử điểm"}),s.length===0?f.jsx("div",{className:"text-center py-8",children:f.jsx("p",{className:"text-gray-600",children:"Chưa có lịch sử tích điểm"})}):f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"space-y-3",children:C.paginate(s).map(M=>f.jsxs("div",{className:"flex items-center justify-between py-3 border-b border-gray-100 last:border-0",children:[f.jsxs("div",{className:"flex-1",children:[f.jsx("p",{className:"text-sm font-medium text-gray-900",children:M.description}),f.jsx("p",{className:"text-xs text-gray-500 mt-0.5",children:new Date(M.date).toLocaleDateString("vi-VN")})]}),f.jsxs("span",{className:`font-semibold ${M.type==="earn"?"text-green-600":"text-red-600"}`,children:[M.type==="earn"?"+":"-",M.points," điểm"]})]},M.id))}),f.jsx(_i,{total:s.length,page:C.page,pageSize:C.pageSize,onPageChange:C.handlePageChange,onPageSizeChange:C.handlePageSizeChange})]})]})]})}const SS="machines";async function CS(){return(await Xt(Vt(ut,SS))).docs.map(e=>{const{id:t,...r}=e.data();return{id:e.id,...r}})}const iu="point_history";async function PS(n){return(await Ap(Vt(ut,iu),{...n,createdAt:new Date().toISOString()})).id}async function kS(n){const e=Hn(Vt(ut,iu),Rn("customerPhone","==",n));return(await Xt(e)).docs.map(r=>({id:r.id,...r.data()}))}async function NS(n){const e=n.toLowerCase(),t=Hn(Vt(ut,iu),Rn("customerEmail","==",e));return(await Xt(t)).docs.map(s=>({id:s.id,...s.data()}))}const DS="discounts";async function VS(){const n=await Xt(Vt(ut,DS));return n.empty?[]:n.docs.map(e=>({id:e.id,...e.data()}))}function OS(n){const[e,t]=T.useState(null),[r,s]=T.useState([]),[i,o]=T.useState([]),[l,c]=T.useState([]),[u,d]=T.useState([]),[p,_]=T.useState([]),[b,A]=T.useState([]),[P,C]=T.useState(!0);return T.useEffect(()=>{if(!n){C(!1);return}async function O(){try{const D=await ru(n);if(!D){C(!1);return}t(D);const M=(await CS()).filter(ee=>ee.phone===D.phone);s(M);const q=await NS(n),G=await kS(D.phone),g=[...q];G.forEach(ee=>{g.find(ge=>ge.id===ee.id)||g.push(ee)}),o(g.sort((ee,ge)=>new Date(ge.date).getTime()-new Date(ee.date).getTime()));const y=await wS(n);A(y);const w=await xS(n);if(d(w),D.phone){const ee=await Pg(D.phone);_(ee)}const R=await VS(),I=new Set(w.map(ee=>ee.voucherCode.toUpperCase())),S=new Date,E=R.filter(ee=>{const ge=new Date(ee.validUntil);return ge.setHours(23,59,59,999),ee.isRedeemable&&ee.pointsRequired&&ee.pointsRequired<=D.points&&!I.has(ee.code.toUpperCase())&&ge>S});c(E),C(!1)}catch(D){console.error("Error loading customer portal data:",D),C(!1)}}O()},[n]),{customer:e,machines:r,pointHistory:i,redeemableVouchers:l,redeemedVouchers:u,vouchersWithStatus:p,invoices:b,loading:P}}function LS(n,e){return{handleRedeem:async r=>{if(!n||!r.pointsRequired)return;if(n.points<r.pointsRequired){Yt.error("Bạn không đủ điểm để đổi voucher này");return}if(!n.email){Yt.error("Không tìm thấy email khách hàng");return}if(await IS(n.email,r.code)){Yt.error("Bạn đã đổi voucher này rồi");return}try{const i={customerPhone:n.phone,customerEmail:n.email,customerName:n.name,voucherCode:r.code,voucherName:r.description||r.code,pointsSpent:r.pointsRequired,redeemedAt:new Date().toISOString()};await ES(i),await PS({customerPhone:n.phone,customerEmail:n.email,customerName:n.name,type:"spend",points:r.pointsRequired,date:new Date().toISOString(),description:`Đổi voucher ${r.code}`,relatedId:r.id}),await fg(String(n.id),{points:n.points-r.pointsRequired}),Yt.success(`Đã đổi voucher ${r.code} thành công!`),e()}catch(i){console.error("Error redeeming voucher:",i),Yt.error("Đã xảy ra lỗi khi đổi voucher")}}}}function MS(){const n=Tr(),[e,t]=T.useState("");T.useEffect(()=>{const A=sessionStorage.getItem("customer_auth");if(!A){n("/customer/login");return}try{const{email:P}=JSON.parse(A);if(!P){n("/customer/login");return}t(P)}catch{n("/customer/login")}},[n]);const{customer:r,machines:s,pointHistory:i,redeemableVouchers:o,redeemedVouchers:l,vouchersWithStatus:c,invoices:u,loading:d}=OS(e),p=()=>{window.location.reload()},{handleRedeem:_}=LS(r,p),b=()=>{sessionStorage.removeItem("customer_auth"),n("/customer/login")};return d?f.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:f.jsxs("div",{className:"text-center",children:[f.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"}),f.jsx("p",{className:"text-gray-600",children:"Đang tải..."})]})}):r?f.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50",children:[f.jsx("div",{className:"bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm",children:f.jsx("div",{className:"max-w-4xl mx-auto px-4 py-4",children:f.jsxs("div",{className:"flex items-center justify-between",children:[f.jsxs("div",{children:[f.jsxs("h1",{className:"font-bold text-gray-900",children:["Xin chào, ",r.name]}),f.jsx("p",{className:"text-sm text-gray-600",children:r.email})]}),f.jsxs("button",{onClick:b,className:"flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:[f.jsx(Gv,{className:"w-4 h-4"}),f.jsx("span",{className:"font-medium",children:"Đăng xuất"})]})]})})}),f.jsx("div",{className:"max-w-4xl mx-auto px-4 py-8",children:f.jsxs(mS,{defaultValue:"machines",className:"w-full",children:[f.jsxs(pS,{className:"grid w-full grid-cols-3 mb-8",children:[f.jsxs(ul,{value:"machines",className:"flex items-center gap-2",children:[f.jsx(So,{className:"w-4 h-4"}),"Máy của tôi"]}),f.jsxs(ul,{value:"invoices",className:"flex items-center gap-2",children:[f.jsx(_l,{className:"w-4 h-4"}),"Hóa đơn"]}),f.jsxs(ul,{value:"profile",className:"flex items-center gap-2",children:[f.jsx(Df,{className:"w-4 h-4"}),"Thông tin cá nhân"]})]}),f.jsx(hl,{value:"machines",children:f.jsx(_S,{machines:s})}),f.jsx(hl,{value:"invoices",children:f.jsx(bS,{invoices:u})}),f.jsx(hl,{value:"profile",children:f.jsx(AS,{customer:r,redeemableVouchers:o,redeemedVouchers:l,vouchersWithStatus:c,pointHistory:i,onRedeem:_})})]})})]}):f.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:f.jsxs("div",{className:"text-center",children:[f.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"}),f.jsx("p",{className:"text-gray-600",children:"Đang tải..."})]})})}const jS=dv([{path:"/login",Component:pA},{path:"/forgot",Component:gA},{path:"/set-password",Component:yA},{path:"/otp",Component:fS},{path:"/portal",Component:MS}]);function FS(){return f.jsx(j_,{router:jS})}ey.createRoot(document.getElementById("root")).render(f.jsx(os.StrictMode,{children:f.jsx(FS,{})}));

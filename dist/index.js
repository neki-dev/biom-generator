(()=>{"use strict";var e={465:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,i)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),i(r(535),t),i(r(771),t),i(r(481),t),i(r(910),t),i(r(309),t)},309:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},24:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.clamp=void 0,t.clamp=function(e,t,r=[0,1]){return Math.max(r[0],Math.min(r[1],null!=e?e:t))}},650:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateNoise=t.generateSeed=void 0;const r=4095,o=4,i=1<<o,s=256,n=.5,a=1.1;function h(e){return.5*(1-Math.cos(e*Math.PI))}t.generateSeed=function(){const e=[];for(let t=0;t<r+1;t++)e.push(Math.random());return e},t.generateNoise=function(e){let{x:t,y:r}=e;const{seed:l,frequency:u,redistribution:d,octaves:c}=e,g=l.length-1;t*=u,r*=u;let f,p,v,y,m,b=Math.floor(t),M=Math.floor(r),_=t-b,x=r-M,w=0,B=.5;for(let e=0;e<c;e++){let e=b+(M<<o);f=h(_),p=h(x),v=l[e&g],v+=f*(l[e+1&g]-v),y=l[e+i&g],y+=f*(l[e+i+1&g]-y),v+=p*(y-v),e+=s,y=l[e&g],y+=f*(l[e+1&g]-y),m=l[e+i&g],m+=f*(l[e+i+1&g]-m),y+=p*(m-y),w+=v*B,B*=n,b<<=1,_*=2,_>=1&&(b++,_--),M<<=1,x*=2,x>=1&&(M++,x--)}return w>.5?w=Math.pow(w,(1.5-w)/a):w<.5&&(w=Math.pow(w,(1.5-w)*a)),w=Math.pow(w,d),w}},910:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorldBiome=void 0;t.WorldBiome=class{constructor(e,t){var r,o;this.lowerBound=Math.max(0,null!==(r=e.lowerBound)&&void 0!==r?r:0),this.upperBound=Math.min(1,null!==(o=e.upperBound)&&void 0!==o?o:1),this.data=t}}},771:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorldGenerator=void 0;const o=r(650),i=r(535);t.WorldGenerator=class{constructor(e){this.layers=[],this.width=e.width,this.height=e.height}addLayer(e){this.layers.push(e)}clearLayers(){this.layers=[]}getLayers(){return this.layers}generate(e){const t=null!=e?e:(0,o.generateSeed)(),r=[];for(const e of this.layers){const o=this.generateLayer(e,t);for(let e=0;e<o.length;e++){r[e]||(r[e]=[]);for(let t=0;t<o[e].length;t++)o[e][t]&&(r[e][t]=o[e][t].data)}}return new i.World(r,t)}generateLayer(e,t){const r=e.getGenerationParams(),i=[];for(let s=0;s<this.height;s++){i[s]=[];for(let n=0;n<this.width;n++){const a=(0,o.generateNoise)(Object.assign(Object.assign({},r),{seed:t,x:n/this.width,y:s/this.height})),h=e.getBiomeByHeight(a);h&&(i[s][n]=h)}}return i}}},481:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorldLayer=void 0;const o=r(24);t.WorldLayer=class{constructor(e={}){this.biomes=[],this.frequency=Math.round(31*(0,o.clamp)(null==e?void 0:e.frequencyChange,.3)+1),this.octaves=Math.round(14*(1-(0,o.clamp)(null==e?void 0:e.borderSmoothness,.5))+1),this.redistribution=2-(0,o.clamp)(null==e?void 0:e.heightRedistribution,1,[.5,1.5])}addBiome(e){this.biomes.push(e)}clearBiomes(){this.biomes=[]}getBiomes(){return this.biomes}getBiomeByHeight(e){return this.getBiomes().find((t=>e>=t.lowerBound&&e<=t.upperBound))}getGenerationParams(){return{frequency:this.frequency,octaves:this.octaves,redistribution:this.redistribution}}}},535:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.World=void 0;t.World=class{constructor(e,t){this.matrix=[],this.width=e[0].length,this.height=e.length,this.matrix=e,this.seed=t}getMatrix(){return this.matrix}getAt(e){var t;return null===(t=this.matrix[e.y])||void 0===t?void 0:t[e.x]}replaceAt(e,t){if(e.y>=this.height||e.x>this.width)throw Error("Указанная позиция биома выходит за границы мира");this.matrix[e.y][e.x]=t}getSeed(){return this.seed}}}},t={};var r=function r(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,r),s.exports}(465);module.exports=r})();
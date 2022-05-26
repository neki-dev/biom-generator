(()=>{"use strict";var t={607:function(t,e,r){var a=this&&this.__createBinding||(Object.create?function(t,e,r,a){void 0===a&&(a=r);var i=Object.getOwnPropertyDescriptor(e,r);i&&!("get"in i?!e.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,a,i)}:function(t,e,r,a){void 0===a&&(a=r),t[a]=e[r]}),i=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),s=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&a(e,t,r);return i(e,t),e},n=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||Object.prototype.hasOwnProperty.call(e,r)||a(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0});const o=s(r(994));class h{width;height;layers;data=[];seed=[];constructor(t){const{width:e,height:r,seed:a,layers:i=[]}=t;this.width=e,this.height=r,this.layers=i,this.seed=a||h.generateRandomSeed()}static generateRandomSeed(){const t=[];for(let e=0;e<o.DEFAULT_PERLIN_SIZE+1;e++)t.push(Math.random());return t}addLayer(t){this.layers.push(t)}clearLayers(){this.layers=[]}generate(){this.data=[];for(const t of this.layers){const e=this.generateLayer(t);for(let t=0;t<e.length;t++)for(let r=0;r<e[t].length;r++)null!==e[t][r]&&(this.data[t]||(this.data[t]=[]),this.data[t][r]=e[t][r])}}getData(){return this.data}setData(t){if(this.data.length!==this.height||this.data[0].length!==this.width)throw Error("Invalid map data size");this.data=t}getTilesMatrix(){if(0===this.data.length)throw Error("Map not generated. First use `generate()`");return this.data.map((t=>t.map((t=>t.tileIndex))))}getCollideMatrix(){if(0===this.data.length)throw Error("Map not generated. First use `generate()`");return this.data.map((t=>t.map((t=>t.collide?1:0))))}getBiomeAt(t,e){if(0===this.data.length)throw Error("Map not generated. First use `generate()`");return void 0===this.data[e]?.[t]?null:this.data[e][t]}setBiomeAt(t,e,r){if(0===this.data.length)throw Error("Map not generated. First use `generate()`");void 0!==this.data[e]?.[t]&&(this.data[e][t]=r)}getBiomes(){return this.layers.map((t=>t.biomes)).flat()}getSeed(){return this.seed}setSeed(t){this.seed=t}generateLayer(t){const{frequencyChange:e=10,sizeDifference:r=1.1,bordersPuriry:a=10}=t.parameters,i=Math.max(1,Math.min(64,e)),s=22-Math.max(2,Math.min(20,a)),n=Math.max(.1,Math.min(3,r)),h=[];for(let e=0;e<this.height;e++){h[e]=[];for(let r=0;r<this.width;r++){let a=(0,o.default)({seed:this.seed,octaves:s,x:r/this.width*i,y:e/this.height*i});a**=n;const d=t.biomes.find((({level:t})=>{const[e,r]=t;return(void 0===e||a>=e)&&(void 0===r||a<r)}));h[e][r]=d||null}}return h}}e.default=h,n(r(699),e)},994:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.DEFAULT_PERLIN_SIZE=void 0,e.DEFAULT_PERLIN_SIZE=4095;function r(t){return.5*(1-Math.cos(t*Math.PI))}e.default=function(t){const{x:e,y:a,seed:i,octaves:s}=t,n=i.length-1;let o,h,d,l,u,c=Math.floor(e),f=Math.floor(a),g=e-c,p=a-f,m=0,v=.5;for(let t=0;t<s;t++){let t=c+(f<<4);o=r(g),h=r(p),d=i[t&n],d+=o*(i[t+1&n]-d),l=i[t+16&n],l+=o*(i[t+16+1&n]-l),d+=h*(l-d),t+=256,l=i[t&n],l+=o*(i[t+1&n]-l),u=i[t+16&n],u+=o*(i[t+16+1&n]-u),l+=h*(u-l),m+=d*v,v*=.5,c<<=1,g*=2,g>=1&&(c++,g--),f<<=1,p*=2,p>=1&&(f++,p--)}return m}},699:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0})}},e={};var r=function r(a){var i=e[a];if(void 0!==i)return i.exports;var s=e[a]={exports:{}};return t[a].call(s.exports,s,s.exports,r),s.exports}(607);module.exports=r})();
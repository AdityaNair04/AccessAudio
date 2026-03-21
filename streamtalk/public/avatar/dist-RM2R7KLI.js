import{$ as Ar,$a as Pi,$b as ws,A as nr,Aa as si,Ab as ji,B as ur,Ba as ai,Bb as Qi,C as pr,Ca as ni,Cb as Zi,Da as ui,Db as Ji,Dc as Vs,Ea as pi,Eb as es,Ej as qs,F as dr,Fa as di,Fb as ts,Fe as Ks,G as lr,Ga as li,Gb as os,H as cr,Ha as ci,Hb as rs,I as hr,Ia as hi,Ib as is,Ic as g,J as mr,Ja as mi,Jb as ss,K as fr,Ka as fi,Kb as as,L as gr,La as gi,Lb as ns,M as xr,Ma as xi,Mb as us,N as Cr,Nb as ps,O as yr,Ob as ds,Oc as ue,P as Sr,Pb as ls,Pc as Hs,Q as wr,Qa as Ci,Qb as cs,R as br,Ra as yi,Rb as hs,Rf as Xs,S as vr,Sb as ms,T as Ir,Ta as Si,Tb as fs,U as kr,Ua as wi,Ub as gs,V as Rr,Va as bi,Vb as xs,W as Dr,Wa as vi,Wb as Cs,X as Pr,Xa as Ii,Xb as ys,Y as $r,Ya as ki,Z as Nr,Za as Ri,_ as zr,_a as Di,_b as Ss,a as Mo,aa as Fr,ab as $i,ac as bs,b as Oo,ba as Lr,bb as Ni,bc as vs,bd as Ke,ca as Tr,cb as zi,cc as Is,ci as be,da as _r,db as Ai,ea as Br,eb as Fi,ec as ks,fa as Er,fb as Li,fc as Rs,g as E,ga as Ur,gb as Ti,ha as Wr,hb as _i,i as Vo,ia as Mr,ic as Ds,j as Ho,ja as Or,jb as Bi,jc as Ps,ji as S,k as Go,ka as Vr,kb as Ei,kc as $s,ki as Xe,l as Ko,la as Hr,lb as Ui,lc as Ns,m as Xo,ma as Gr,mb as Wi,mc as zs,n as qo,na as Kr,nb as Mi,nc as As,o as Yo,oa as Xr,oc as Fs,od as Gs,p as jo,pa as qr,pb as Oi,q as Qo,qa as Yr,qb as Vi,qc as Ls,r as Zo,ra as jr,rb as Hi,rc as Ts,s as Jo,sa as Qr,sd as se,t as er,ta as Zr,tc as _s,u as tr,ua as Jr,uc as Bs,v as or,va as ei,vb as Gi,vc as Es,w as rr,wa as ti,wb as Ki,wc as Us,x as ir,xa as oi,xb as Xi,xc as Ws,y as sr,ya as ri,yb as qi,yc as Ms,z as ar,za as ii,zb as Yi,zc as Os}from"./chunk-23RHG7YY.js";import{b as Qp}from"./chunk-RFBBAUMM.js";var ee=E();ee.registerFlag("WEBGPU_DEFERRED_SUBMIT_BATCH_SIZE",()=>15);ee.registerFlag("WEBGPU_CPU_FORWARD",()=>!0);ee.registerFlag("WEBGPU_MATMUL_PROGRAM_TYPE",()=>-1);ee.registerFlag("WEBGPU_USE_NAIVE_CONV2D_TRANSPOSE",()=>!0);ee.registerFlag("WEBGPU_USE_LOW_POWER_GPU",()=>!1);ee.registerFlag("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e3);ee.registerFlag("WEBGPU_USE_PROFILE_TOOL",()=>!1);ee.registerFlag("WEBGPU_IMPORT_EXTERNAL_TEXTURE",()=>!0);ee.registerFlag("WEBGPU_USE_NAIVE_CONV2D_DEBUG",()=>!1);ee.registerFlag("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL",()=>-1);ee.registerFlag("WEBGPU_CONV_SEPARATE_IM2COL_SHADER",()=>!1);ee.registerFlag("WEBGPU_PRINT_SHADER",()=>"");ee.registerFlag("WEBGPU_ENGINE_COMPILE_ONLY",()=>!1);var qe=class{constructor(t){t&&(this.vendor=t.vendor,this.architecture=t.architecture,this.intelGPUGeneration=this.getIntelGPUGeneration())}getIntelGPUGeneration(){if(this.isIntel()){if(this.architecture.startsWith("gen"))return Number(this.architecture.match(/\d+/));if(this.architecture.startsWith("xe"))return 12}return 0}isIntel(){return this.vendor==="intel"}};var Ye=class{constructor(t){this.device=t,this.numUsedBuffers=0,this.numFreeBuffers=0,this.freeBuffers=new Map,this.usedBuffers=new Map,this.numBytesUsed=0,this.numBytesAllocated=0}acquireBuffer(t,e,i=!1,r=!0){let s,a=Ys(t,e);return r?(this.freeBuffers.has(a)||this.freeBuffers.set(a,[]),this.freeBuffers.get(a).length>0?(s=this.freeBuffers.get(a).pop(),this.numFreeBuffers--):(s=this.device.createBuffer({size:t,usage:e,mappedAtCreation:i}),this.numBytesAllocated+=t)):(s=this.device.createBuffer({size:t,usage:e,mappedAtCreation:i}),this.numBytesAllocated+=t),this.usedBuffers.has(a)||this.usedBuffers.set(a,[]),this.usedBuffers.get(a).push(s),this.numUsedBuffers++,this.numBytesUsed+=t,s}releaseBuffer(t,e=!0){if(this.freeBuffers.size===0)return;let i=t.size,r=t.usage,s=Ys(i,r),a=this.usedBuffers.get(s),n=a.indexOf(t);if(n<0)throw new Error("Cannot find the buffer in buffer manager");a[n]=a[a.length-1],a.pop(),this.numUsedBuffers--,this.numBytesUsed-=i,e?(this.freeBuffers.get(s).push(t),this.numFreeBuffers++):(t.destroy(),this.numBytesAllocated-=i)}getNumUsedBuffers(){return this.numUsedBuffers}getNumFreeBuffers(){return this.numFreeBuffers}dispose(){this.freeBuffers.forEach((t,e)=>{t.forEach(i=>{i.destroy()})}),this.usedBuffers.forEach((t,e)=>{t.forEach(i=>{i.destroy()})}),this.freeBuffers=new Map,this.usedBuffers=new Map,this.numUsedBuffers=0,this.numFreeBuffers=0,this.numBytesUsed=0,this.numBytesAllocated=0}};function Ys(o,t){return`${o}_${t}`}var je=class{constructor(t){this.device=t,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures=new Map,this.usedTextures=new Map,this.numBytesUsed=0,this.numBytesAllocated=0}acquireTexture(t,e,i,r){let s=Qs(i),a=t*e*s,n=js(t,e,i,r);if(this.freeTextures.has(n)||this.freeTextures.set(n,[]),this.usedTextures.has(n)||this.usedTextures.set(n,[]),this.numBytesUsed+=a,this.numUsedTextures++,this.freeTextures.get(n).length>0){this.numFreeTextures--;let p=this.freeTextures.get(n).shift();return this.usedTextures.get(n).push(p),p}this.numBytesAllocated+=a;let u=this.device.createTexture({size:[t,e],format:i,usage:r});return this.usedTextures.get(n).push(u),u}releaseTexture(t){if(this.freeTextures.size===0)return;let e=t.width,i=t.height,r=t.format,s=t.usage,a=js(e,i,r,s);this.freeTextures.has(a)||this.freeTextures.set(a,[]),this.freeTextures.get(a).push(t),this.numFreeTextures++,this.numUsedTextures--;let n=this.usedTextures.get(a),u=n.indexOf(t);if(u<0)throw new Error("Cannot release a texture that was never provided by this texture manager");n.splice(u,1);let p=Qs(r),d=e*i*p;this.numBytesUsed-=d}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){this.freeTextures.forEach((t,e)=>{t.forEach(i=>{i.destroy()})}),this.usedTextures.forEach((t,e)=>{t.forEach(i=>{i.destroy()})}),this.freeTextures=new Map,this.usedTextures=new Map,this.numUsedTextures=0,this.numFreeTextures=0,this.numBytesUsed=0,this.numBytesAllocated=0}};function js(o,t,e,i){return`${o}_${t}_${e}_${i}`}function Qs(o){if(o==="rgba8unorm")return 16;throw new Error(`${o} is not supported!`)}function Zs(o,t){if(Math.max(...o)>5)throw new Error("Cannot symbolically compute strides for rank > 6 tensor.");let e=o.length,i="xyzwuv",r=o.map(a=>`${t}.${i[a]}`),s=new Array(e-1);s[e-2]=r[e-1];for(let a=e-3;a>=0;--a)s[a]=`(${s[a+1]} * ${r[a+1]})`;return s}var j=(o,t,e)=>e==="int32"?`atomicAdd(${o}, bitcast<i32>(${t}));`:`
          {
            var oldValue = 0;
            loop {
              let newValueF32 = bitcast<f32>(oldValue) + (${t});
              let newValue = bitcast<i32>(newValueF32);
              let res = atomicCompareExchangeWeak(${o}, oldValue, newValue);
              if res.exchanged {
                break;
              }
              oldValue = res.old_value;
            }
          }`;var pe;(function(o){o[o.FROM_PIXELS=0]="FROM_PIXELS",o[o.DRAW=1]="DRAW"})(pe||(pe={}));var oa=(o,t,e,i,r)=>{let s={dtype:i.dtype,shape:i.shape},a=Jp(e,s,t),n=o.createShaderModule({code:a,label:t.constructor.name}),u=E().get("WEBGPU_PRINT_SHADER");if(u!==""){u=u.toLowerCase();let p=u.split(",");(u==="all"||p.some(d=>t.shaderKey.toLowerCase().includes(d)))&&(console.group(t.shaderKey),console.debug(a),console.groupEnd())}return r?o.createComputePipelineAsync({compute:{module:n,entryPoint:"_start"},label:t.constructor.name,layout:"auto"}):o.createComputePipeline({compute:{module:n,entryPoint:"_start"},label:t.constructor.name,layout:"auto"})},F=(o,t="f32")=>{switch(o){case 1:return`${t}`;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${o}-component ${t} is not supported.`)}};function B(o){if(o<=1)return"i32";if(o===2)return"vec2<i32>";if(o===3)return"vec3<i32>";if(o===4)return"vec4<i32>";if(o===5)return"vec5";if(o===6)return"vec6";throw Error(`GPU for rank ${o} is not yet supported`)}function oe(o){if(o===0)return"x";if(o===1)return"y";if(o===2)return"z";if(o===3)return"w";if(o===4)return"u";if(o===5)return"v";throw Error(`Index ${o} is not yet supported`)}function C(...o){let t;switch(o.length){case 0:t=`
        fn main()
      `;break;case 1:t=`
        fn main(${o[0]} : i32)
      `;break;default:throw Error("Unreachable")}return t}function Js(o,t){let e;return e=`
     ${Zp(t)}
      fn _start(@builtin(local_invocation_id) LocalId : vec3<u32>,
                @builtin(global_invocation_id) GlobalId : vec3<u32>,
                @builtin(local_invocation_index) LocalIndex: u32,
                @builtin(workgroup_id) WorkgroupId : vec3<u32>,
                @builtin(num_workgroups) NumWorkgroups : vec3<u32>) {
        localId = LocalId;
        localIndex = LocalIndex;
        globalId = GlobalId;
        numWorkgroups = NumWorkgroups;
        workgroupId = WorkgroupId;
        ${o?"main(getGlobalIndex());":"main();"};
      }
    `,e}function Zp(o){return`
  @compute @workgroup_size(${o.workgroupSize[0]}, ${o.workgroupSize[1]}, ${o.workgroupSize[2]})
`}function Jp(o,t,e){let i=[],r=e.workgroupSize[0]*e.workgroupSize[1]*e.workgroupSize[2];if(e.outputComponent=e.outputComponent?e.outputComponent:1,i.push(`

      var<private> localId: vec3<u32>;
      var<private> localIndex: u32;
      var<private> globalId: vec3<u32>;
      var<private> numWorkgroups: vec3<u32>;
      var<private> workgroupId: vec3<u32>;

      // Only used when the y/z dimension of workgroup size is 1.
      fn getGlobalIndex() -> i32 {
        ${ia(e)?"  return i32(globalId.x);":`  return i32((workgroupId.z * numWorkgroups.x * numWorkgroups.y +
                workgroupId.y * numWorkgroups.x + workgroupId.x) * ${r}u +
                localIndex);
        `}
      }
    `),e.pixelsOpType!=null){let m=e.pixelsOpType===pe.FROM_PIXELS?`@group(0) @binding(0) var<storage, read_write> result: array<${he(t.dtype,e.outputComponent)}>;`:`@group(0) @binding(1) var<storage, read> inBuf : array<${he(o[0].dtype,e.outputComponent)}>;`,f=t.shape.length===3?"vec2<i32>":"i32";i.push(`
        struct Uniform {
          outShapeStrides : ${f},
          size            : i32,
          numChannels     : i32,
          alpha           : f32,
        };

        ${m}
        @group(0) @binding(2) var<uniform> uniforms: Uniform;
      `);let x=ta(e);return[ea,i.join(`
`),Le(t.shape),e.getUserCode(),Js(x,e)].join(`
`)}let s,a,n="struct Uniforms { NAN : f32, INFINITY : f32, ";e.variableNames.forEach((m,f)=>{let x=B(o[f].shape.length);n+=`${m.charAt(0).toLowerCase()+m.slice(1)}Shape : ${x}, `,s=o[f].shape.length-1,a=B(s),n+=`${m.charAt(0).toLowerCase()+m.slice(1)}ShapeStrides: ${a}, `});let u=B(t.shape.length);n+=`outShape : ${u}, `,s=t.shape.length-1,a=B(s),n+=`
         outShapeStrides: ${a}, `,e.size&&(n+="size : i32, "),e.uniforms&&(n+=e.uniforms),n+="};",n=nd(n),i.push(n),e.atomic?i.push(`
      @group(0) @binding(0) var<storage, read_write> result: array<atomic<i32>>;
    `):i.push(`
      @group(0) @binding(0) var<storage, read_write> result: array<${he(t.dtype,e.outputComponent)}>;
    `),e.variableNames.forEach((m,f)=>{i.push(`
      @group(0) @binding(${1+f}) var<storage, read> ${m}: array<${e.variableComponents?he(o[f].dtype,e.variableComponents[f]):he(o[f].dtype,e.outputComponent)}>;
        `)}),n!==""&&i.push(`
      @group(0) @binding(${1+e.variableNames.length}) var<uniform> uniforms: Uniforms;
      `);let p=id(t.shape,e.dispatchLayout),d=[ea,i.join(`
`)+ed,Le(t.shape),p,sd(t.shape.length)];e.atomic||d.push(ad(t.shape,t.dtype,e.outputComponent)),e.variableNames.forEach((m,f)=>{d.push(`${Le(o[f].shape,m)}`)});let c=o.map((m,f)=>rd(m,t.shape,e.variableComponents?e.variableComponents[f]:e.outputComponent,e.dispatchLayout.x.length===t.shape.length)).join(`
`);d.push(c),d.push(e.getUserCode());let l=ta(e);return d.push(Js(l,e)),d.join(`
`)}function ra(o,t,e){let i=o.shaderKey;if(o.pixelsOpType!=null)return i;let r=[],s=[];t.forEach(d=>{r.push(d.shape),s.push(d.dtype)}),r.push(e.shape),s.push(e.dtype);let a=t.map(d=>S.getBroadcastDims(d.shape,e.shape)),n=t.map(d=>g.arraysEqual(d.shape,e.shape)).join("_"),u=a.map(d=>d.join("_")).join(";"),p=ia(o)?"flatDispatch":"";return i+="_"+(o.workgroupSize?o.workgroupSize.join(","):"")+r.map(d=>d.length).join(",")+s.join(",")+o.variableNames.join(",")+u+n+p,i}var ea=`
  struct vec5 {x: i32, y: i32, z: i32, w: i32, u: i32};
  struct vec6 {x: i32, y: i32, z: i32, w: i32, u: i32, v: i32};

  // Checks whether coordinates lie within the bounds of the shape.
  fn coordsInBounds2D(coord : vec2<i32>, shape : vec2<i32>) -> bool {
    return all(coord >= vec2<i32>(0)) && all(coord < shape);
  }
  fn coordsInBounds3D(coord : vec3<i32>, shape : vec3<i32>) -> bool {
    return all(coord >= vec3<i32>(0)) && all(coord < shape);
  }
  fn coordsInBounds4D(coord : vec4<i32>, shape : vec4<i32>) -> bool {
    return all(coord >= vec4<i32>(0)) && all(coord < shape);
  }

  fn getIndexFromCoords1D(coord : i32, shape : i32) -> i32 {
    return coord;
  }
  fn getIndexFromCoords2D(coords : vec2<i32>, shape : vec2<i32>) -> i32 {
    return dot(coords, vec2<i32>(shape.y, 1));
  }
  fn getIndexFromCoords3D(coords : vec3<i32>, shape : vec3<i32>) -> i32 {
    return dot(coords, vec3<i32>(shape.y * shape.z, shape.z, 1));
  }
  fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
    return dot(coords, vec4<i32>(
        shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
  }
  fn getIndexFromCoords5D(coords : vec5, shape : vec5) -> i32 {
    let shapeStrides: vec5 = vec5(shape.y * shape.z * shape.w * shape.u, shape.z * shape.w * shape.u, shape.w * shape.u, shape.u, 1);
    return coords.x*shapeStrides.x + coords.y*shapeStrides.y + coords.z*shapeStrides.z + coords.w*shapeStrides.w + coords.u*shapeStrides.u;
  }
  fn getIndexFromCoords6D(coords : vec6, shape : vec6) -> i32 {
    let shapeStrides: vec6 = vec6(shape.y * shape.z * shape.w * shape.u * shape.v, shape.z * shape.w * shape.u * shape.v, shape.w * shape.u * shape.v, shape.u * shape.v, shape.v, 1);
    return coords.x*shapeStrides.x + coords.y*shapeStrides.y + coords.z*shapeStrides.z + coords.w*shapeStrides.w + coords.u*shapeStrides.u + coords.v*shapeStrides.v;
  }

  // NaN defination in IEEE 754-1985 is :
  //   - sign = either 0 or 1.
  //   - biased exponent = all 1 bits.
  //   - fraction = anything except all 0 bits (since all 0 bits represents infinity).
  // https://en.wikipedia.org/wiki/IEEE_754-1985#Representation_of_non-numbers
  fn isnan(val: f32) -> bool {
    let floatToUint: u32 = bitcast<u32>(val);
    return (floatToUint & 0x7fffffffu) > 0x7f800000u;
  }
  fn isnanVec4(val : vec4<f32>) -> vec4<bool> {
    let floatToUint: vec4<u32> = bitcast<vec4<u32>>(val);
    return (floatToUint & vec4<u32>(0x7fffffffu)) > vec4<u32>(0x7f800000u);
  }
`,ed=`
  fn isinf(val: f32) -> bool {
    return abs(val) == uniforms.INFINITY;
  }
`;function Le(o,t=""){let e=o.length,i=t!==""?`get${t.charAt(0).toUpperCase()+t.slice(1)}CoordsFromIndex`:"getCoordsFromIndex",r=t!==""?`${t.charAt(0).toLowerCase()+t.slice(1)}ShapeStrides`:"outShapeStrides";if(e<=1)return`fn ${i}(index : i32) -> i32 { return index; }`;let s=g.computeStrides(o),a=B(e),n=[];for(let p=0;p<e;p++)n.push(`d${p}`);if(s.length===1)return`    fn ${i}(index : i32) -> vec2<i32> {
      let d0 = index / uniforms.${r}; let d1 = index - d0 * uniforms.${r};
      return vec2<i32>(d0, d1);
    }`;let u;return u="var index2 = index;"+s.map((p,d)=>{let c=`let ${n[d]} = index2 / uniforms.${r}.${oe(d)}`,l=d===s.length-1?`let ${n[d+1]} = index2 - ${n[d]} * uniforms.${r}.${oe(d)}`:`index2 = index2 - ${n[d]} * uniforms.${r}.${oe(d)}`;return`${c}; ${l};`}).join(""),`
    fn ${i}(index : i32) -> ${a} {
      ${u}
      return ${a}(${n.join(",")});
    }
  `}function td(o,t){let e=o.name,i=o.shape.length,r=B(i),s="get"+e.charAt(0).toUpperCase()+e.slice(1),a=["d0","d1","d2","d3","d4","d5"].slice(0,i),n=a.map(d=>`${d} : i32`).join(", ");if(i<1)return`
      fn ${s}() -> ${F(t)} {
        return ${F(t)}(${e}[0]);
      }
    `;let u=`uniforms.${e.charAt(0).toLowerCase()+e.slice(1)}Shape`,p=`${i}D`;return i===0&&(p="1D"),`
    fn ${s}(${n}) -> ${F(t)} {
      return ${F(t)}(${e}[getIndexFromCoords${p}(${r}(${a.join(",")}),
        ${u})${t===1?"":` / ${t}`}]);
    }
   `}function od(o,t,e,i){let r=o.name,s=r.charAt(0).toUpperCase()+r.slice(1),a="get"+s+"ByOutput",n=o.shape.length,u=t.length,p=B(u);if(g.arraysEqual(o.shape,t)&&i)return`
    fn ${a}Index(globalIndex : i32) -> ${F(e)} {
      return ${F(e)}(${r}[globalIndex]);
    }

    fn ${a}Coords(coords : ${p}) -> ${F(e)} {
      return ${F(e)}(${r}[${u>1?"getOutputIndexFromCoords(coords)":"coords"}${e===1?"":` / ${e}`}]);
    }
    `;let d=S.getBroadcastDims(o.shape,t),c=u-n,l="";if(n===0)return`
    fn ${a}Index(globalIndex : i32) -> ${F(e)}{
      return get${s}();
    }

    fn ${a}Coords(coords : ${p}) -> ${F(e)}{
      return get${s}();
    }
  `;u<2&&d.length>=1?l="coords = 0;":l=d.map(x=>`coords.${oe(x+c)} = 0;`).join(`
`);let h="";if(u<2&&n>0)h="coords";else if(u>1){let x=B(n),v=o.shape.map((I,k)=>`coords.${oe(k+c)}`).join(", ");h=`${x}(${v})`}else h="coords";let m=`uniforms.${r.charAt(0).toLowerCase()+r.slice(1)}Shape`,f=`${n}D`;return`
  fn ${a}Index(globalIndex : i32) -> ${F(e)} {
    var coords = getCoordsFromIndex(globalIndex);
    ${l}
    return ${F(e)}(${r}[getIndexFromCoords${f}(${h}, ${m})${e===1?"":` / ${e}`}]);
  }

  fn ${a}Coords(coordsIn : ${p}) -> ${F(e)} {
    var coords = coordsIn;
    ${l}
    return ${F(e)}(${r}[getIndexFromCoords${f}(${h}, ${m})${e===1?"":` / ${e}`}]);
  }
`}function rd(o,t,e,i){let r=td(o,e);return o.shape.length<=t.length&&(r+=od(o,t,e,i)),r}function id(o,t){let{x:e,y:i=[],z:r=[]}=t,s=o.length,a=e.length+i.length+r.length;if(a!==s)return"";if(e.length===s)return`fn getOutputCoords() -> ${B(s)}{
    let globalIndex = getGlobalIndex();
    return getCoordsFromIndex(globalIndex);
  }
  `;let n="",u=[e,i,r];for(let l=0;l<u.length;l++){let h=u[l];if(h.length!==0)if(h.length===1)n+=`let d${h[0]} = i32(globalId[${l}]);`;else{let m=Zs(h,"uniforms.outShape");n+=`var index${l} = i32(globalId[${l}]);`;for(let f=0;f<m.length;f++)n+=`let d${h[f]} = index${l} / ${m[f]};`,f===m.length-1?n+=`let d${h[f+1]} = index${l} - d${h[f]} * ${m[f]};`:n+=`index${l} = index${l} - d${h[f]} * ${m[f]};`}}let p=[];for(let l=0;l<a;l++)p.push(`d${l}`);let d=B(a),c=`fn getOutputCoords() -> ${d} {
  ${n}
`;return p.length===0?c+=`return ${d}(0); }`:c+=`return ${d}(${p.join(",")}); }`,c}function sd(o){let t="";switch(o){case 0:case 1:t+=`
        fn getOutputIndexFromCoords(coords : i32) -> i32 {
          return coords;
        }
        `;break;case 2:t+=`
        fn getOutputIndexFromCoords(coords : vec2<i32>) -> i32 {
          return dot(coords, vec2<i32>(uniforms.outShapeStrides, 1));
        }
        `;break;case 3:t+=`
        fn getOutputIndexFromCoords(coords : vec3<i32>) -> i32 {
          return dot(coords, vec3<i32>(uniforms.outShapeStrides.x, uniforms.outShapeStrides.y, 1));
        }
        `;break;case 4:t+=`
        fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
          return dot(coords, vec4<i32>(
            uniforms.outShapeStrides.x, uniforms.outShapeStrides.y, uniforms.outShapeStrides.z, 1));
        }
        `;break;case 5:t+=`
        fn getOutputIndexFromCoords(coords : vec5) -> i32 {
          return coords.x * uniforms.outShapeStrides.x +
              coords.y * uniforms.outShapeStrides.y +
              coords.z * uniforms.outShapeStrides.z +
              coords.w * uniforms.outShapeStrides.w +
              coords.u;
        }
        `;break;case 6:t+=`
        fn getOutputIndexFromCoords(coords : vec6) -> i32 {
          return coords.x * uniforms.outShapeStrides.x +
              coords.y * uniforms.outShapeStrides.y +
              coords.z * uniforms.outShapeStrides.z +
              coords.w * uniforms.outShapeStrides.w +
              coords.u * uniforms.outShapeStrides.u +
              coords.v;
        }
        `;break;default:g.assert(!1,()=>`Unsupported ${o}D shape`);break}return t}function ia(o){return o.dispatch[1]===1&&o.dispatch[2]===1}function he(o,t=1){if(o==="float32")return F(t,"f32");if(o==="int32"||o==="bool")return F(t,"i32");throw new Error(`type ${o} is not supported.`)}function ad(o,t,e){let i=o.length,r=he(t,e),s=`fn setOutputAtIndex(flatIndex : i32, value : ${F(e)}) {
      result[flatIndex] = ${r}(value);
    }

    fn setOutputAtIndexI32(flatIndex : i32, value : ${F(e,"i32")}) {
      result[flatIndex] = ${r}(value);
    }
    `;if(i>=2){let a=["d0","d1","d2","d3","d4","d5"].slice(0,i),n=B(i);s+=`
      fn setOutputAtCoords(${a.map(u=>`${u} : i32`).join(", ")}, value : ${F(e)}) {
        let flatIndex = getOutputIndexFromCoords(${n}(${a.join(", ")}));
        setOutputAtIndex(flatIndex${e===1?"":` / ${e}`}, value);
      }
      fn setOutputAtCoordsI32(${a.map(u=>`${u} : i32`).join(", ")}, value : ${F(e,"i32")}) {
        let flatIndex = getOutputIndexFromCoords(${n}(${a.join(", ")}));
        setOutputAtIndexI32(flatIndex${e===1?"":` / ${e}`}, value);
      }
    `}return s}function nd(o){let t=/(\w+)\s*:\s*vec(5|6)/g;o=o.replace(t,i=>"@align(16) "+i);let e=/vec(5|6)\s*,\s*(\w+)/g;return o=o.replace(e,(i,r,s)=>`vec${r}, @align(16) ${s}`),o}function ta(o){return!(o.dispatchLayout.hasOwnProperty("y")&&o.dispatchLayout.y.length!==0||o.dispatchLayout.hasOwnProperty("z")&&o.dispatchLayout.z.length!==0)}var ko={};Qp(ko,{GPUBytesPerElement:()=>Qe,MatMulProgramType:()=>re,assertNotComplex:()=>Ee,computeDispatch:()=>y,computeWorkPerThreadForConv2d:()=>_e,computeWorkgroupInfoForMatMul:()=>Io,computeWorkgroupSizeForConv2d:()=>Te,flatDispatchLayout:()=>w,isWebGPUSupported:()=>Be,tilesFitEvenlyIntoShape:()=>pd});var fe=o=>{let t=1;for(let e=0;e<o.length;e++)t*=o[e];return t};function pd(o,t){if(o.length!==t.length)throw new Error(`Cannot compute whether rank ${o.length} tiles fit evenly into rank ${t.length} shape - ranks must match.`);return t.every((e,i)=>e%o[i]===0)}function y(o,t,e=[1,1,1],i=[1,1,1]){let[r,s,a]=[Math.ceil(fe(o.x.map(n=>t[n]))/(e[0]*i[0])),o.y?Math.ceil(fe(o.y.map(n=>t[n]))/(e[1]*i[1])):1,o.z?Math.ceil(fe(o.z.map(n=>t[n]))/(e[2]*i[2])):1];return[r,s,a]}function Io(o,t,e,i=!1){let r=[8,8,1],s=[4,4,1];return i||(o<=8&&(s[1]=1),t<=16&&e<=16&&(r[0]=4)),{workgroupSize:r,elementsPerThread:s}}function Te(o,t,e=!1){if(e)return[8,8,1];let i=fe(o.x.map(s=>t[s])),r=fe(o.y.map(s=>t[s]));return i<=4?[4,16,1]:r<=4?[16,4,1]:[16,16,1]}function _e(o,t,e=!1){if(e)return[4,4,1];let i=fe(o.x.map(s=>t[s])),r=fe(o.y.map(s=>t[s]));return i<=4?[1,2,1]:r<=4?[2,1,1]:[2,2,1]}function w(o){return{x:o.map((t,e)=>e)}}function Qe(o){if(o==="float32"||o==="int32"||o==="bool"||o==="string")return 4;if(o==="complex64")return 8;throw new Error(`Unknown dtype ${o}`)}function Be(){return!!(typeof globalThis<"u"&&globalThis.navigator&&globalThis.navigator.gpu)}function Ee(o,t){Array.isArray(o)||(o=[o]),o.forEach(e=>{e!=null&&g.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the WebGPU backend.`)})}var re;(function(o){o[o.MatMulReduceProgram=0]="MatMulReduceProgram",o[o.MatMulSplitKProgram=1]="MatMulSplitKProgram",o[o.MatMulSmallOutputSizeProgram=2]="MatMulSmallOutputSizeProgram",o[o.MatMulPackedProgram=3]="MatMulPackedProgram",o[o.MatMulMax=4]="MatMulMax"})(re||(re={}));var dd=E().getNumber("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD"),ld=(o,t)=>{let e=o.limits.maxComputeWorkgroupsPerDimension,i=t.dispatchLayout,r=t.dispatch;if(r.every(a=>a<=e))return r;g.assert(r[0]>e&&i.y===void 0&&i.z===void 0,()=>"Dispatch size exceeds WebGPU limits in Y or Z dimension.");let s=Math.ceil(Math.sqrt(r[0]));return s>e?(s=Math.ceil(Math.cbrt(r[0])),g.assert(s<=e,()=>"Total dispatch size exceeds WebGPU maximum."),[s,s,s]):[s,s,1]},ve=class o extends Oo{nextDataId(){return o.nextDataId++}constructor(t,e){if(super(),this.commandQueueOwnedIds=new WeakSet,this.dispatchCountInPass=0,this.disposed=!1,this.downloadWaitMs=0,this.tensorDataPendingDisposal=[],this.queryResolveBuffer=null,this.querySet=null,this.querySetCount=2,this.stagingPendingDisposal=[],this.uniformPendingDisposal=[],this.uploadWaitMs=0,this.hasReadSyncWarned=!1,this.hasTimestampQueryWarned=!1,!Be())throw new Error("WebGPU is not supported on this device");this.pipelineCache={},this.device=t,this.queue=t.queue,this.commandEncoder=null,this.computePassEncoder=null,this.adapterInfo=new qe(e),this.supportTimestampQuery=this.device.features.has("timestamp-query"),this.thresholdToIncreaseWorkgroups=this.adapterInfo.intelGPUGeneration>=12?16:8,this.bufferManager=new Ye(this.device),this.textureManager=new je(this.device),this.tensorMap=new Mo(this,Ke()),E().getBool("WEBGPU_USE_PROFILE_TOOL")&&(this.dummyCanvas=document.createElement("canvas"),this.dummyCanvas.width=1,this.dummyCanvas.height=1,this.dummyContext=this.dummyCanvas.getContext("webgpu"),this.dummyContext.configure({device:t,format:"bgra8unorm"}),document.body.appendChild(this.dummyCanvas))}floatPrecision(){return 32}disposeData(t,e=!1){if(!this.tensorMap.has(t))return!0;let i=this.tensorMap.get(t);return e?i.refCount=0:i.refCount--,i.refCount>0?!1:(i.complexTensorInfos!=null&&(this.disposeData(i.complexTensorInfos.real.dataId),this.disposeData(i.complexTensorInfos.imag.dataId)),this.commandQueueOwnedIds.has(t)?(this.tensorDataPendingDisposal.push(t),!0):(this.releaseResource(t),this.tensorMap.delete(t),!0))}memory(){return{numBytesInGPU:this.bufferManager.numBytesUsed,numBytesAllocatedInGPU:this.bufferManager.numBytesAllocated,unreliable:!1}}releaseResource(t){let e=this.tensorMap.get(t);if(!(!e||!e.resource)){if(e.external){e.resource=null;return}e.resource instanceof GPUBuffer?this.bufferManager.releaseBuffer(e.resource):e.resource instanceof GPUTexture&&this.textureManager.releaseTexture(e.resource),e.resource=null}}refCount(t){return this.tensorMap.has(t)?this.tensorMap.get(t).refCount:0}incRef(t){let e=this.tensorMap.get(t);e.refCount++}decRef(t){if(this.tensorMap.has(t)){let e=this.tensorMap.get(t);e.refCount--}}write(t,e,i){if(i==="complex64"&&t!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let r={id:this.nextDataId()};return this.tensorMap.set(r,{dtype:i,shape:e,values:t,refCount:1}),r}move(t,e,i,r,s){if(r==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.tensorMap.set(t,{dtype:r,shape:i,values:e,refCount:s})}submitQueue(){this.queue.submit([this.commandEncoder.finish()]),this.commandEncoder=null,this.dispatchCountInPass=0,this.commandQueueOwnedIds=new WeakSet,this.tensorDataPendingDisposal.forEach(t=>{this.releaseResource(t),this.tensorMap.delete(t)}),this.uniformPendingDisposal.forEach(t=>this.bufferManager.releaseBuffer(t)),this.stagingPendingDisposal.forEach(t=>this.bufferManager.releaseBuffer(t,!1)),this.tensorDataPendingDisposal=[],this.uniformPendingDisposal=[],this.stagingPendingDisposal=[]}ensureCommandEncoderReady(){this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder())}endComputePassEncoder(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}async checkCompileCompletionAsync(){let t;try{t=await Promise.all(Object.values(this.pipelineCache))}catch(e){throw new Error(e.message)}Object.keys(this.pipelineCache).map((e,i)=>{this.pipelineCache[e]=t[i]})}async getBufferData(t){if(E().getBool("WEBGPU_ENGINE_COMPILE_ONLY"))return console.warn("The data may be invalid since WEBGPU_ENGINE_COMPILE_ONLY is true, this can only be called when WEBGPU_ENGINE_COMPILE_ONLY is false"),null;let e=t.size,i=this.bufferManager.acquireBuffer(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ);this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(t,0,i,0,e),this.submitQueue(),await i.mapAsync(GPUMapMode.READ);let r=i.getMappedRange().slice(0);return i.unmap(),i!=null&&this.bufferManager.releaseBuffer(i),E().getBool("WEBGPU_USE_PROFILE_TOOL")&&(g.assert(this.dummyContext!==void 0,()=>"Fail to get context for profiling tool"),this.dummyContext.getCurrentTexture()),r}convertAndCacheOnCPU(t,e){let i=this.tensorMap.get(t);return i.values=e,i.values}readSync(t){let e=this.tensorMap.get(t),{values:i,complexTensorInfos:r}=e;if(i!=null||e.dtype==="string")return i;if(e.dtype==="complex64"){let f=this.readSync(r.real.dataId),x=this.readSync(r.imag.dataId),v=g.convertBackendValuesAndArrayBuffer(S.mergeRealAndImagArrays(f,x).buffer,"float32");return this.convertAndCacheOnCPU(t,v),v}this.hasReadSyncWarned||(this.hasReadSyncWarned=!0,console.warn("The performance of synchronously reading data from GPU to CPU is poor on the webgpu backend, please use asynchronous APIs instead."));let s=["opaque","premultiplied"],a=e.resource,n=a.size;g.assert(n%4===0,()=>"Because there is 4 bytes for one pixel, buffer size must be multiple of 4.");let u=n/4,p=new ArrayBuffer(n),d=256,c=256,l=s.map(f=>new OffscreenCanvas(d,c)),h=new OffscreenCanvas(d,c);this.endComputePassEncoder(),l.map((f,x)=>{let v=f.getContext("webgpu");return v.configure({device:this.device,format:"bgra8unorm",usage:GPUTextureUsage.COPY_DST,alphaMode:s[x]}),v.getCurrentTexture()}).map((f,x)=>{let v=d*4,I=(_,T,M)=>{this.ensureCommandEncoderReady(),this.commandEncoder.copyBufferToTexture({buffer:a,bytesPerRow:v,offset:M},{texture:f},{width:_,height:T}),this.submitQueue();let O=h.getContext("2d",{willReadFrequently:!0});O.clearRect(0,0,_,T),O.drawImage(l[x],0,0);let Y=O.getImageData(0,0,_,T).data,K=s[x],V=new Uint8ClampedArray(p,M,_*T*4);for(let H=0;H<V.length;H+=4)if(K==="premultiplied")V[H+3]=Y[H+3];else{let X=Y[H];V[H]=Y[H+2],V[H+1]=Y[H+1],V[H+2]=X}},k=Math.floor(u/(d*c)),D=d,P=c,z=0;for(let _=0;_<k;_++)I(D,P,z),z+=d*c*4;let A=u%(d*c);P=Math.floor(A/d),P>0&&(I(D,P,z),z+=P*(d*4)),D=A%d,D>0&&I(D,1,z)});let m=g.convertBackendValuesAndArrayBuffer(p,e.dtype);return this.convertAndCacheOnCPU(t,m),m}async read(t){if(!this.tensorMap.has(t))throw new Error(`Tensor ${t} was not registered!`);let e=this.tensorMap.get(t),{values:i}=e;if(i!=null)return i;let r;if(e.dtype==="complex64"){let s=await Promise.all([this.read(e.complexTensorInfos.real.dataId),this.read(e.complexTensorInfos.imag.dataId)]),a=s[0],n=s[1];r=S.mergeRealAndImagArrays(a,n)}else{let s=await this.getBufferData(e.resource);r=g.convertBackendValuesAndArrayBuffer(s,e.dtype)}return this.convertAndCacheOnCPU(t,r),r}copyBuffer(t){let e=t.size,i=t.usage,r=this.bufferManager.acquireBuffer(e,i);return this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(t,0,r,0,e),this.submitQueue(),r}createTensorFromGPUData(t,e,i){let r=t.buffer;if(i==="complex64")throw new Error("Cannot write to a complex64 dtype. ");let s={id:this.nextDataId()};this.tensorMap.set(s,{dtype:i,shape:e,values:null,refCount:1,external:t.zeroCopy});let a=this.tensorMap.get(s),n=Qe(a.dtype)*g.sizeFromShape(a.shape);if(t.buffer.size<n)throw new Error(`GPUBuffer size(${t.buffer.size}) is smaller than tensor size(${n})!`);if((t.buffer.usage&(GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC))!==(GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC))throw new Error("GPUBuffer.usage should include GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC!");return t.zeroCopy!==!0&&(r=this.copyBuffer(r)),a.resource=r,Ke().makeTensorFromDataId(s,e,i,this)}readToGPU(t){let e=this.tensorMap.get(t),{values:i,dtype:r,shape:s,resource:a}=e;if(r==="complex64")throw new Error("Does not support reading buffer for complex64 dtype.");if(a==null)throw i!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");let n=a,u=n.size,p=n.usage,d=this.bufferManager.acquireBuffer(u,p);this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(a,0,d,0,u),this.submitQueue();let c=this.makeTensorInfo(s,r),l=Ke().makeTensorFromTensorInfo(c),h=this.tensorMap.get(c.dataId);return h.resource=d,{tensorRef:l,buffer:d}}bufferSync(t){let e=this.readSync(t.dataId);if(t.dtype==="string")try{let i=e.map(r=>g.decodeString(r));return se(t.shape,t.dtype,i)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return se(t.shape,t.dtype,e)}async time(t){!this.supportTimestampQuery&&!this.hasTimestampQueryWarned&&(console.warn("This device doesn't support timestamp-query extension. Start Chrome browser with flag --enable-dawn-features=allow_unsafe_apis to try it again. Otherwise, zero will be shown for the kernel time when profiling mode is enabled."),this.hasTimestampQueryWarned=!0);let e=this.activeTimers,i=[],r=!1;this.programTimersStack==null?(this.programTimersStack=i,r=!0):this.activeTimers.push(i),this.activeTimers=i,t();let s=g.flatten(this.activeTimers.map(p=>p.query)).filter(p=>p!=null),a=g.flatten(this.activeTimers.map(p=>p.name)).filter(p=>p!=null);this.activeTimers=e,r&&(this.programTimersStack=null);let n={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},u=await Promise.all(s);return n.kernelMs=g.sum(u),n.getExtraProfileInfo=()=>u.map((p,d)=>({name:a[d],ms:p})).map(p=>`${p.name}: ${p.ms}`).join(", "),this.uploadWaitMs=0,this.downloadWaitMs=0,n}makeTensorInfo(t,e,i){return e==="string"&&i!=null&&i.length>0&&g.isString(i[0])&&(i=i.map(s=>g.encodeString(s))),{dataId:this.write(i,t,e),shape:t,dtype:e}}tensorToBinding(t){if(!t)return null;let i=this.tensorMap.get(t.dataId).resource;return i instanceof GPUBuffer?{buffer:i}:i instanceof GPUTexture?i.createView():i}uploadToGPU(t){let e=this.tensorMap.get(t);if(e.resource!=null)return;let i=Qe(e.dtype)*g.sizeFromShape(e.shape),r,s=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST;if(e.values){if(r=this.bufferManager.acquireBuffer(i,s,!0),r.mapState==="unmapped"){let a=this.bufferManager.acquireBuffer(i,GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC,!0,!1),n=a.getMappedRange();e.dtype==="int32"||e.dtype==="bool"?new Int32Array(n).set(e.values):new Float32Array(n).set(e.values),a.unmap(),this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(a,0,r,0,i),this.stagingPendingDisposal.push(a)}else{let a=r.getMappedRange();e.dtype==="int32"||e.dtype==="bool"?new Int32Array(a).set(e.values):new Float32Array(a).set(e.values),r.unmap()}e.values=null}else r=this.bufferManager.acquireBuffer(i,s);e.resource=r}makeUniforms(t){let e=0,i=0,r=[],s=1;t.forEach(u=>{u.data.length===0&&(u.data=[1]);let p;switch(u.data.length){case 1:p=4;break;case 2:p=8;break;case 3:p=16;break;case 4:p=16;break;case 5:p=16;break;case 6:p=16;break;default:g.assert(!1,()=>`Unsupported ${u.data.length}D shape`)}(i===5||i===6)&&(p=16),p>s&&(s=p),e=Math.ceil(e/p)*p,i=u.data.length,r.push(e),e+=u.data.length*4}),e=Math.ceil(e/s)*s;let a=new ArrayBuffer(e);t.forEach((u,p)=>{let d=r[p];u.type==="int32"?new Int32Array(a,d,u.data.length).set(u.data):u.type==="uint32"?new Uint32Array(a,d,u.data.length).set(u.data):new Float32Array(a,d,u.data.length).set(u.data)});let n=this.bufferManager.acquireBuffer(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);return this.queue.writeBuffer(n,0,a,0,e),this.uniformPendingDisposal.push(n),{offset:0,size:e,buffer:n}}runWebGPUProgram(t,e,i,r,s){if(s||(s=this.makeTensorInfo(t.outputShape,i)),g.sizeFromShape(s.shape)===0)return this.tensorMap.get(s.dataId).values=g.getTypedArrayFromDType(s.dtype,0),s;this.uploadToGPU(s.dataId),t.dispatch=ld(this.device,t);let a=e.map((u,p)=>{if(u.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");return this.uploadToGPU(u.dataId),{dtype:this.tensorMap.get(u.dataId).dtype,shape:u.shape,name:t.variableNames[p]}});t.shaderKey=ra(t,a,s);let n=E().getBool("WEBGPU_ENGINE_COMPILE_ONLY");return t.shaderKey in this.pipelineCache||(this.pipelineCache[t.shaderKey]=oa(this.device,t,a,s,n)),t.pipeline=this.pipelineCache[t.shaderKey],n||this.recordAndSubmit(t,s,e,r),s}recordAndSubmit(t,e,i,r){if(t.pipeline instanceof Promise)throw new Error("Please call checkCompileCompletionAsync to ensure parallel compilation is done!");let s=[],a=[],n="int32";if(t.pixelsOpType==null){s.push({type:"float32",data:[NaN]},{type:"float32",data:[1/0]}),a=i.concat(e).map(h=>h.shape);let l="int32";a.map(h=>{s.push({type:l,data:h});let m=g.computeStrides(h);s.push({type:l,data:m})})}else{let l=g.computeStrides(e.shape);s.push({type:n,data:l})}if(t.size){let l=g.sizeFromShape(t.outputShape);s.push({type:n,data:[t.outputComponent?l/t.outputComponent:l]})}r&&(s=[...s,...r]);let u=[this.tensorToBinding(e),...i.map(l=>this.tensorToBinding(l)),this.makeUniforms(s)];i.forEach(l=>{this.commandQueueOwnedIds.add(l.dataId)}),this.commandQueueOwnedIds.add(e.dataId);let p=this.device.createBindGroup({layout:t.pipeline.getBindGroupLayout(0),entries:u.map((l,h)=>({binding:h,resource:l}))}),d=this.activeTimers!=null;this.ensureCommandEncoderReady();let c={};d&&this.supportTimestampQuery?(this.endComputePassEncoder(),this.querySet==null&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.querySetCount})),c.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1},this.computePassEncoder=this.commandEncoder.beginComputePass(c)):this.computePassEncoder||(this.computePassEncoder=this.commandEncoder.beginComputePass(c)),this.computePassEncoder.setPipeline(t.pipeline),this.computePassEncoder.setBindGroup(0,p),this.computePassEncoder.dispatchWorkgroups(t.dispatch[0],t.dispatch[1],t.dispatch[2]),this.dispatchCountInPass++,(d||E().get("WEBGPU_DEFERRED_SUBMIT_BATCH_SIZE")<=this.dispatchCountInPass||t.pixelsOpType===pe.DRAW)&&(this.endComputePassEncoder(),d?this.activeTimers.push({name:t.constructor.name,query:this.getQueryTime()}):this.submitQueue())}async getQueryTime(){if(!this.supportTimestampQuery)return 0;this.queryResolveBuffer==null&&(this.queryResolveBuffer=this.bufferManager.acquireBuffer(this.querySetCount*8,GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST|GPUBufferUsage.QUERY_RESOLVE)),this.commandEncoder.resolveQuerySet(this.querySet,0,this.querySetCount,this.queryResolveBuffer,0);let t=this.bufferManager.acquireBuffer(this.querySetCount*8,GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST);this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.querySetCount*8),this.submitQueue(),await t.mapAsync(GPUMapMode.READ);let e=new BigUint64Array(t.getMappedRange()),i=Number(e[1]-e[0])/1e6;return t.unmap(),this.bufferManager.releaseBuffer(t),i}shouldExecuteOnCPU(t,e=dd){return E().getBool("WEBGPU_CPU_FORWARD")&&t.every(i=>this.tensorMap.get(i.dataId).resource==null&&g.sizeFromShape(i.shape)<e)}numDataIds(){return this.tensorMap.numDataIds()-this.tensorDataPendingDisposal.length}dispose(){this.disposed||(this.querySet!=null&&this.querySet.destroy(),this.bufferManager.dispose(),this.textureManager.dispose(),this.disposed=!0)}};ve.nextDataId=0;Be()&&Gs("webgpu",async()=>{let o={powerPreference:E().get("WEBGPU_USE_LOW_POWER_GPU")?"low-power":"high-performance"},t=await navigator.gpu.requestAdapter(o),e={},i=[];t.features.has("timestamp-query")&&i.push("timestamp-query"),t.features.has("bgra8unorm-storage")&&i.push(["bgra8unorm-storage"]),e.requiredFeatures=i;let r=t.limits;e.requiredLimits={maxComputeWorkgroupStorageSize:r.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.maxStorageBufferBindingSize,maxBufferSize:r.maxBufferSize,maxComputeWorkgroupSizeX:r.maxComputeWorkgroupSizeX,maxComputeInvocationsPerWorkgroup:r.maxComputeInvocationsPerWorkgroup};let s=await t.requestDevice(e),a="info"in t?t.info:"requestAdapterInfo"in t?await t.requestAdapterInfo():void 0;return new ve(s,a)},3);var $;(function(o){o[o.ADD=0]="ADD",o[o.ATAN2=1]="ATAN2",o[o.COMPLEX_MULTIPLY_IMAG=2]="COMPLEX_MULTIPLY_IMAG",o[o.COMPLEX_MULTIPLY_REAL=3]="COMPLEX_MULTIPLY_REAL",o[o.DIV=4]="DIV",o[o.ELU_DER=5]="ELU_DER",o[o.EQUAL=6]="EQUAL",o[o.FLOOR_DIV=7]="FLOOR_DIV",o[o.GREATER=8]="GREATER",o[o.GREATER_EQUAL=9]="GREATER_EQUAL",o[o.LESS=10]="LESS",o[o.LESS_EQUAL=11]="LESS_EQUAL",o[o.LOGICAL_AND=12]="LOGICAL_AND",o[o.LOGICAL_OR=13]="LOGICAL_OR",o[o.MAX=14]="MAX",o[o.MIN=15]="MIN",o[o.MOD=16]="MOD",o[o.MUL=17]="MUL",o[o.NOT_EQUAL=18]="NOT_EQUAL",o[o.POW=19]="POW",o[o.PRELU=20]="PRELU",o[o.SQUARED_DIFFERENCE=21]="SQUARED_DIFFERENCE",o[o.SUB=22]="SUB"})($||($={}));var cd="let resultTemp = a + b;",hd="let resultTemp = atan2(a, b);",md="let resultTemp = areal * breal - aimag * bimag;",fd="let resultTemp = areal * bimag + aimag * breal;",gd="let resultTemp = a / b;",xd="let resultTemp = select(a * (b + 1.0), a, b >= b - b);",Cd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a == b);
`,yd=`
  let remainder =
      select(a % b, round(a % b), (round(a) == a) & (round(b) == b));
  let quotient = (a - remainder) / b;
  let resultTemp =
      round(select(quotient, quotient - 1, sign(remainder) == -sign(b)));
`,Sd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a > b);
`,wd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a >= b);
`,bd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a < b);
`,vd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a <= b);
`,Id="return f32(a >= 1.0 && b >= 1.0);",kd=`return (vec4<f32>(a >= vec4<f32>(1.0)) *
  vec4<f32>(b >= vec4<f32>(1.0)));`,Rd="return f32(a >= 1.0 || b >= 1.0);",Dd=`return min(vec4<f32>(a >= vec4<f32>(1.0)) +
  vec4<f32>(b >= vec4<f32>(1.0)), vec4<f32>(1.0));`,Pd="let resultTemp = max(a, b);",$d="let resultTemp = min(a, b);",Nd=`
  let isNaN = b == 0.;
  var resultTemp = a % b;
  resultTemp = select((resultTemp + b) % b, resultTemp,
      (a < 0. && b < 0.) || (a >= 0. && b > 0.));
`,zd=`
  let isNaN = !vec4<bool>(b);
  var resultTemp = vec4<f32>(a % b);
  if (!((a[0] < 0. && b[0] < 0.) || (a[0] >= 0. && b[0] > 0.))) {
    resultTemp[0] = (resultTemp[0] + b[0]) % b[0];
  }
  if (!((a[1] < 0. && b[1] < 0.) || (a[1] >= 0. && b[1] > 0.))) {
    resultTemp[1] = (resultTemp[1] + b[1]) % b[1];
  }
  if (!((a[2] < 0. && b[2] < 0.) || (a[2] >= 0. && b[2] > 0.))) {
    resultTemp[2] = (resultTemp[2] + b[2]) % b[2];
  }
  if (!((a[3] < 0. && b[3] < 0.) || (a[3] >= 0. && b[3] > 0.))) {
    resultTemp[3] = (resultTemp[3] + b[3]) % b[3];
  }
`,Ad="let resultTemp = a * b;",Fd=`
  var resultTemp = f32(a != b);
  let valueForNaN = 1.0;
`,Ld=`
  var resultTemp = vec4<f32>(a != b);
  let valueForNaN = 1.0;
`,Td=`
  let isNaN = a < 0.0 && floor(b) < b;
  if (b == 0.0) {
    return 1.0;
  }
  var resultTemp = select(sign(a) * pow(abs(a), b), pow(abs(a), b),
      round(abs(b) % 2.0) != 1.0);
`,_d=`
  let isModRound1Bool = vec4<i32>(round(abs(b) % vec4<f32>(2.0))) == vec4<i32>(1);
  let isModRound1 = vec4<f32>(isModRound1Bool);
  let multiplier = sign(a) * isModRound1 + (vec4<f32>(1.0) - isModRound1);
  var resultTemp = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  let isExpZero = b == vec4<f32>(0.0);
  if (isExpZero.r) {
    resultTemp.r = 1.0;
  }
  if (isExpZero.g) {
    resultTemp.g = 1.0;
  }
  if (isExpZero.b) {
    resultTemp.b = 1.0;
  }
  if (isExpZero.a) {
    resultTemp.a = 1.0;
  }
  let isNaN = (a < vec4<f32>(0.0)) & (floor(b) < b);
`,Bd="if (a < 0.0) { return b * a; }  return a;",Ed=`
  let aLessThanZero = vec4<f32>(a < vec4<f32>(0.0));
  return (aLessThanZero * (b * a)) + ((vec4<f32>(1.0) - aLessThanZero) * a);
`,Ud="let resultTemp = (a - b) * (a - b);",Wd="let resultTemp = a - b;";function Ie(o,t){let e;do{switch(o){case $.ATAN2:e=hd;break;case $.MAX:e=Pd;break;case $.MIN:e=$d;break;case $.MOD:e=t?zd:Nd;break;case $.NOT_EQUAL:e=t?Ld:Fd;break;case $.POW:e=t?_d:Td;break;default:continue}let i,r,s;return t?(i="isnanVec4",r="vec4<f32>",s="vec4<bool>"):(i="isnan",r="f32",s="bool"),`
      let aIsNaN = ${i}(a);
      let aPostLegalization = select(a, ${r}(42), aIsNaN);
      let bIsNaN = ${i}(b);
      let bPostLegalization = select(b, ${r}(42), bIsNaN);
      let isNaN = false;
      let valueForNaN = uniforms.NAN;
      {
        let a = aPostLegalization;
        let b = bPostLegalization;
        ${e}
        return select(
            resultTemp, ${r}(valueForNaN),
            ${s}(isNaN) | aIsNaN | bIsNaN);
      }
    `}while(!1);switch(o){case $.ADD:e=cd;break;case $.COMPLEX_MULTIPLY_IMAG:e=fd;break;case $.COMPLEX_MULTIPLY_REAL:e=md;break;case $.DIV:e=gd;break;case $.ELU_DER:e=xd;break;case $.EQUAL:e=Cd;break;case $.FLOOR_DIV:e=yd;break;case $.GREATER:e=Sd;break;case $.GREATER_EQUAL:e=wd;break;case $.LESS:e=bd;break;case $.LESS_EQUAL:e=vd;break;case $.LOGICAL_AND:return t?kd:Id;case $.LOGICAL_OR:return t?Dd:Rd;case $.MUL:e=Ad;break;case $.PRELU:return t?Ed:Bd;case $.SQUARED_DIFFERENCE:e=Ud;break;case $.SUB:e=Wd;break;default:}return`
    ${e}
    return resultTemp;
  `}var b;(function(o){o[o.ABS=0]="ABS",o[o.ACOS=1]="ACOS",o[o.ACOSH=2]="ACOSH",o[o.ASIN=3]="ASIN",o[o.ASINH=4]="ASINH",o[o.ATAN=5]="ATAN",o[o.ATANH=6]="ATANH",o[o.CEIL=7]="CEIL",o[o.COS=8]="COS",o[o.COSH=9]="COSH",o[o.ELU=10]="ELU",o[o.ERF=11]="ERF",o[o.EXP=12]="EXP",o[o.EXPM1=13]="EXPM1",o[o.FLOOR=14]="FLOOR",o[o.IS_FINITE=15]="IS_FINITE",o[o.IS_INF=16]="IS_INF",o[o.IS_NAN=17]="IS_NAN",o[o.LINEAR=18]="LINEAR",o[o.LOG=19]="LOG",o[o.LOG1P=20]="LOG1P",o[o.LOGICAL_NOT=21]="LOGICAL_NOT",o[o.NEG=22]="NEG",o[o.RELU=23]="RELU",o[o.RELU6=24]="RELU6",o[o.LEAKYRELU=25]="LEAKYRELU",o[o.RECIPROCAL=26]="RECIPROCAL",o[o.ROUND=27]="ROUND",o[o.RSQRT=28]="RSQRT",o[o.SELU=29]="SELU",o[o.SIGMOID=30]="SIGMOID",o[o.SIGN=31]="SIGN",o[o.SIN=32]="SIN",o[o.SINH=33]="SINH",o[o.SOFTPLUS=34]="SOFTPLUS",o[o.SQRT=35]="SQRT",o[o.SQUARE=36]="SQUARE",o[o.STEP=37]="STEP",o[o.TAN=38]="TAN",o[o.TANH=39]="TANH",o[o.TO_INT=40]="TO_INT"})(b||(b={}));var Md="return abs(a);",Od=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  return acos(a);
`,Vd=`
  if (a < 1.) {
    return uniforms.NAN;
  }
  return acosh(a);
`,Hd=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  return asin(a);
`,Gd="return asinh(a);",Kd=`
  if (isnan(a)) {
    return uniforms.NAN;
  }
  return atan(a);
`,Xd=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  if (a == 1.) {
    return uniforms.INFINITY;
  }
  if (a == -1.) {
    return -uniforms.INFINITY;
  }
  return atanh(a);
`,qd="return ceil(a);",Yd="return cos(a);",jd=`
  let e2x = exp(-a);
  return (e2x + 1.0 / e2x) / 2.0;
`,Qd="return exp(a) - 1.0;",Zd="if (a >= 0.0) { return a; }  return (exp(a) - 1.0);",Jd=`
  var resFloat = exp(a) - vec4<f32>(1.0);
  if (a.r >= 0.0) {
    resFloat.r = a.r;
  }
  if (a.g >= 0.0) {
    resFloat.g = a.g;
  }
  if (a.b >= 0.0) {
    resFloat.b = a.b;
  }
  if (a.a >= 0.0) {
    resFloat.a = a.a;
  }
  return resFloat;
`,el=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  let p = ${S.ERF_P};
  let a1 = ${S.ERF_A1};
  let a2 = ${S.ERF_A2};
  let a3 = ${S.ERF_A3};
  let a4 = ${S.ERF_A4};
  let a5 = ${S.ERF_A5};

  let sign = sign(a);
  let absA = abs(a);
  let t = 1.0 / (1.0 + p * absA);
  return sign * (1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * exp(-absA * absA));
`,tl="return exp(a);",ol="return floor(a);",rl="return f32(!isnan(a) && !isinf(a));",il="return f32(isinf(a));",sl="return f32(isnan(a));",al="return a;",nl=`if (a < 0.0) { return uniforms.NAN; }
  return log(a);`,ul=`
  if (isnan(a)) { return a; }
  return log(1.0 + a);
`,pl="return f32(!(a >= 1.0));",dl="return -a;",ll="if (a < 0.0) { return uniforms.alpha * a; } return a;",cl=`
  let aLessThanZero = vec4<f32>(a < vec4<f32>(0.0));
  return (aLessThanZero * (uniforms.alpha * a)) + ((vec4<f32>(1.0) - aLessThanZero) * a);
`,hl="return 1.0 / a;",ml="return select(a, 0.0, a < 0.0);",fl="return clamp(a, 0.0, 6.0);",gl="return clamp(a, vec4<f32>(0.0, 0.0, 0.0, 0.0), vec4<f32>(6.0, 6.0, 6.0, 6.0));",xl=`
  return select(a, vec4<f32>(0.0), a < vec4<f32>(0.0));
`,Cl="return round(a);",yl="return inverseSqrt(a);",Sl=`
  if (a >= 0.0) {
    return ${S.SELU_SCALE} * a;
  } else {
    return ${S.SELU_SCALEALPHA} * (exp(a) - 1.0);
  }
`,wl="return 1.0 / (1.0 + exp(-1.0 * a));",bl="return sign(a);",vl="return sin(a);",Il=`
  let e2x = exp(a);
  return (e2x - 1.0 / e2x) / 2.0;
`,kl=`
  let epsilon = 1.1920928955078125e-7;
  let threshold = log(epsilon) + 2.0;

  let too_large = a > -threshold;
  let too_small = a < threshold;
  let exp_a = exp(a);

  if (too_large) {
    return a;
  } else if (too_small) {
    return exp_a;
  } else {
    return log(exp_a + 1.0);
  }
`,Rl="return sqrt(a);",Dl="return a * a;",Pl=`
  if (isnan(a)) {
    return a;
  }

  return select(uniforms.stepAlpha, 1.0, a > 0.0);
`,$l="return tan(a);",Nl=`
  let e2x = exp(-2.0 * abs(a));
  return sign(a) * (1.0 - e2x) / (1.0 + e2x);
`,zl="return f32(i32((a)));";function de(o,t){switch(o){case b.ABS:return Md;case b.ACOS:return Od;case b.ACOSH:return Vd;case b.ASIN:return Hd;case b.ASINH:return Gd;case b.ATAN:return Kd;case b.ATANH:return Xd;case b.COS:return Yd;case b.COSH:return jd;case b.CEIL:return qd;case b.ELU:return t?Jd:Zd;case b.ERF:return el;case b.EXP:return tl;case b.EXPM1:return Qd;case b.FLOOR:return ol;case b.IS_FINITE:return rl;case b.IS_INF:return il;case b.IS_NAN:return sl;case b.LINEAR:return al;case b.LOG:return nl;case b.LOG1P:return ul;case b.LOGICAL_NOT:return pl;case b.NEG:return dl;case b.LEAKYRELU:return t?cl:ll;case b.RECIPROCAL:return hl;case b.RELU:return t?xl:ml;case b.RELU6:return t?gl:fl;case b.ROUND:return Cl;case b.RSQRT:return yl;case b.SELU:return Sl;case b.SIGMOID:return wl;case b.SIGN:return bl;case b.SIN:return vl;case b.SINH:return Il;case b.SOFTPLUS:return kl;case b.SQRT:return Rl;case b.SQUARE:return Dl;case b.STEP:return Pl;case b.TAN:return $l;case b.TANH:return Nl;case b.TO_INT:return zl;default:throw new Error(`BinaryType ${o} is not implemented!`)}}function G(o,t=!1,e=!1,i=3){if(o===null)return"";let r="";if(o==="linear")r=de(b.LINEAR);else if(o==="relu")r=de(b.RELU,e);else if(o==="elu")r=de(b.ELU,e);else if(o==="relu6")r=de(b.RELU6,e);else if(o==="prelu")r=Ie($.PRELU,e);else if(o==="sigmoid")r=de(b.SIGMOID,e);else if(o==="leakyrelu")r=de(b.LEAKYRELU,e);else throw new Error(`Activation ${o} has not been implemented for the WebGPU backend.`);let a=F(e?4:1),n="";return t?n=`
      fn activation(a : ${a}, coords : vec${i}<i32>) -> ${a} {
        let b = getPreluActivationWeightsByOutputCoords(coords);
        ${r}
      }`:n=`
      fn activation(a : ${a}, coords : vec${i}<i32>) -> ${a} {
        ${r}
      }`,n}function Q(o,t){return`
      ${o?"value = value + getBiasByOutputCoords(coords);":""}
      ${t?"value = activation(value, coords);":""}
      `}function Ro(o,t,e=!1,i=!1,r=!1,s=1){g.assert(o&&s===1||!o,()=>`transposeA ${o} is not compatible with component size ${s}`);let a=`
      ${o?"value = getA(batch, col, row);":"value = getA(batch, row, col);"}

    `,n=t?"value = getB(batch, col, row);":"value = getB(batch, row, col);";return`
  fn mm_readA(batch: i32, row: i32, col: i32) -> ${F(s)} {
    var value = ${F(s)}(0.0);
    ${e&&r?a:`
    ${o?"if(row < uniforms.dimAOuter && col < uniforms.dimInner)":"if(row < uniforms.aShape[1] && col < uniforms.aShape[2])"}
    {
      ${a}
    }
    `}
    return value;
  }

  fn mm_readB(batch: i32, row: i32, col: i32) -> ${F(s)} {
    var value = ${F(s)}(0.0);
    ${n}
    return value;
  }
  `}function Ue(o,t,e,i,r=!1,s=!1,a=!1,n=1){return`
  ${Ro(e,i,r,s,a,n)}
  fn mm_write(batch: i32, row: i32, col: i32, valueIn: ${F(n)}) {
    ${r&&s?"":"if (row < uniforms.dimAOuter && col < uniforms.dimBOuter)"}
    {
      var value = valueIn;
      let coords = vec3<i32>(batch, row, col);
      ${Q(o,t)}
      setOutputAtCoords(coords[0], coords[1], coords[2], value);
    }
  }
  `}var Al=(o,t)=>o?`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          kStart + inputRow,
          globalRowStart + inputCol * ${t});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          globalRow + innerRow,
          kStart + inputCol * ${t});
        `,Fl=(o,t,e,i)=>{if(o)return`
      for (var k = 0; k < ${i}; k++) {
        let BCached0 = mm_Bsub[k][tileCol];
        let ACached0 = mm_Asub[k][localRow];
        for (var i = 0; i < ${e}; i++) {
          acc[i] = fma(BCached0, vec4<f32>(ACached0[i]), acc[i]);
        }
      }`;{let r="",s="";for(let a=0;a<t;a++)r+=`let BCached${a} = mm_Bsub[k * ${t} + ${a}][tileCol];`,s+=`acc[i] = fma(BCached${a}, vec4<f32>(ACached[${a}]), acc[i]);`;return`
      for (var k = 0; k < ${i/t}; k++) {
        ${r}
        for (var i = 0; i < ${e}; i++) {
          let ACached = mm_Asub[tileRow + i][k];
          ${s}
        }
      }`}};function ge(o,t,e=!1,i=32,r=!1,s=32,a=!1){let n=t[1]*o[1],u=t[0]*o[0],p=e?n:i,d=e?i:n,c=p/t[0],l=i/t[1],h=o[1],m=o[0];return g.assert((e&&c===4&&o[1]===4||!e&&(c===3||c===4))&&p%t[0]===0&&i%t[1]===0&&o[0]===4,()=>`If transposeA ${e} is true, innerElementSize ${c} and workPerThread[1] ${o[1]} must be 4.
          Otherwise, innerElementSize ${c} must be 3 or 4.
      tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${o[0]} must be 4.`),`
  var<workgroup> mm_Asub : array<array<vec${c}<f32>, ${p/c}>, ${d}>;
  var<workgroup> mm_Bsub : array<array<vec4<f32>, ${u/o[0]}>, ${i}>;

  ${C()} {
    let localRow = i32(localId.y);
    let tileRow = localRow * ${h};
    let tileCol = i32(localId.x);

    let globalRow = i32(globalId.y) * ${h};
    let globalCol = i32(globalId.x) * ${m};
    let batch = ${r?"0":"i32(globalId.z)"};
    let batchA = ${r||!a?"batch":"batch % uniforms.aShape[0]"};
    let batchB = ${r||!a?"batch":"batch % uniforms.bShape[0]"};
    let globalRowStart = i32(workgroupId.y) * ${n};

    let numTiles = ${r?`${Math.ceil(s/i)}`:`(uniforms.dimInner - 1) / ${i} + 1`};
    var kStart = ${r?`i32(globalId.z) * ${s}`:"0"};

    var acc: array<vec4<f32>, ${h}>;

    // Loop over shared dimension.
    let tileRowB = localRow * ${l};
    for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        for (var innerRow = 0; innerRow < ${h}; innerRow++) {
            let inputRow = tileRow + innerRow;
            let inputCol = tileCol;
            ${Al(e,c)}
        }

        // Load one tile of B into local memory.
        for (var innerRow = 0; innerRow < ${l}; innerRow++) {
            let inputRow = tileRowB + innerRow;
            let inputCol = tileCol;
            mm_Bsub[inputRow][inputCol] = mm_readB(batchB, kStart + inputRow, globalCol);
        }
        kStart = kStart + ${i};
        workgroupBarrier();

        // Compute acc values for a single thread.
        ${Fl(e,c,h,i)}
        workgroupBarrier();
    }

    for (var innerRow = 0; innerRow < ${h}; innerRow++) {
        mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
    }
  }`}var sa=o=>o?`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          kStart + inputRow,
          globalRowStart + inputCol);
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          globalRowStart + inputRow,
          kStart + inputCol);
        `,Ll=o=>o?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];";function xe(o,t,e=!1,i=32,r=!1,s=32,a=!1,n=!1){let u=o[1]*t[1],p=o[0]*t[0],d=e?u:i,c=e?i:u;g.assert(c%t[1]===0&&d%t[0]===0&&i%t[1]===0,()=>`tileAHight ${c} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let l=c/t[1],h=d/t[0],m=i/t[1],f=o[1],x=o[0],v=a?`
      let localRow = i32(localId.y);
      let localCol = i32(localId.x);
      let globalRowStart = i32(workgroupId.y) * ${u};
      let globalColStart = i32(workgroupId.x) * ${p};

      // Loop over shared dimension.
      for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${t[1]}) {
          for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
            ${sa(e)}
          }
        }
        // Load one tile of B into local memory.
        for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
              for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
            mm_Bsub[inputRow][inputCol] = mm_readB(batchB,
              kStart + inputRow,
              globalColStart + inputCol);
          }
        }
        kStart = kStart + ${i};
        workgroupBarrier();

        // Compute acc values for a single thread.
        var BCached : array<f32, ${x}>;
        for (var k = 0; k < ${i}; k++) {
          for (var inner = 0; inner < ${x}; inner++) {
            BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
          }
          for (var innerRow = 0; innerRow < ${f}; innerRow++) {
            let ACached = ${e?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
            for (var innerCol = 0; innerCol < ${x}; innerCol++) {
              acc[innerRow][innerCol] =
                  fma(ACached, BCached[innerCol], acc[innerRow][innerCol]);
            }
          }
        }
        workgroupBarrier();
      }
      for (var innerRow = 0; innerRow < ${f}; innerRow++) {
        let gRow = globalRowStart + localRow + innerRow * ${t[1]};
        for (var innerCol = 0; innerCol < ${x}; innerCol++) {
          let gCol = globalColStart + localCol + innerCol * ${t[0]};
          mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
        }
      }
      `:`
  let tileRow = i32(localId.y) * ${f};
  let tileCol = i32(localId.x) * ${x};

  let globalRow = i32(globalId.y) * ${f};
  let globalCol = i32(globalId.x) * ${x};
  let globalRowStart = i32(workgroupId.y) * ${u};

  let tileRowA = i32(localId.y) * ${l};
  let tileColA = i32(localId.x) * ${h};
  let tileRowB = i32(localId.y) * ${m};
  // Loop over shared dimension.
  for (var t = 0; t < numTiles; t++) {
    // Load one tile of A into local memory.
    for (var innerRow = 0; innerRow < ${l}; innerRow++) {
      for (var innerCol = 0; innerCol < ${h}; innerCol++) {
        let inputRow = tileRowA + innerRow;
        let inputCol = tileColA + innerCol;
        ${sa(e)}
      }
    }

    // Load one tile of B into local memory.
    for (var innerRow = 0; innerRow < ${m}; innerRow++) {
      for (var innerCol = 0; innerCol < ${x}; innerCol++) {
        let inputRow = tileRowB + innerRow;
        let inputCol = tileCol + innerCol;
        mm_Bsub[inputRow][inputCol] = mm_readB(batchB,
          kStart + inputRow,
          globalCol + innerCol);
      }
    }
    kStart = kStart + ${i};
    workgroupBarrier();

    // Compute acc values for a single thread.
    var BCached : array<f32, ${x}>;
    for (var k = 0; k < ${i}; k++) {
      for (var inner = 0; inner < ${x}; inner++) {
        BCached[inner] = mm_Bsub[k][tileCol + inner];
      }

      for (var innerRow = 0; innerRow < ${f}; innerRow++) {
        ${Ll(e)}
        for (var innerCol = 0; innerCol < ${x}; innerCol++) {
          acc[innerRow][innerCol] =
              fma(ACached, BCached[innerCol], acc[innerRow][innerCol]);
        }
      }
    }

    workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < ${f}; innerRow++) {
    for (var innerCol = 0; innerCol < ${x}; innerCol++) {
      mm_write(batch, globalRow + innerRow, globalCol + innerCol,
          acc[innerRow][innerCol]);
    }
  }
  `;return`
    var<workgroup> mm_Asub : array<array<f32, ${d}>, ${c}>;
    var<workgroup> mm_Bsub : array<array<f32, ${p}>, ${i}>;

    ${C()} {
      let batch = ${r?"0":"i32(globalId.z)"};
      let batchA = ${r||!n?"batch":"batch % uniforms.aShape[0]"};
      let batchB = ${r||!n?"batch":"batch % uniforms.bShape[0]"};
      let numTiles = ${r?`${Math.ceil(s/i)}`:`(uniforms.dimInner - 1) / ${i} + 1`};
      var kStart = ${r?`i32(globalId.z) * ${s}`:"0"};

      var acc : array<array<f32, ${x}>, ${f}>;

      // Without this initialization strange values show up in acc.
      for (var innerRow = 0; innerRow < ${f}; innerRow++) {
        for (var innerCol = 0; innerCol < ${x}; innerCol++) {
          acc[innerRow][innerCol] = 0.0;
        }
      }
      ${v}
    }
  `}var Tl=o=>o?`
      mm_readA(batchA, colA, globalRow),
      mm_readA(batchA, colA + 1, globalRow),
      mm_readA(batchA, colA + 2, globalRow),
      mm_readA(batchA, colA + 3, globalRow)
  `:`
      mm_readA(batchA, globalRow, colA),
      mm_readA(batchA, globalRow, colA + 1),
      mm_readA(batchA, globalRow, colA + 2),
      mm_readA(batchA, globalRow, colA + 3)
  `;function _l(o,t=!1){g.assert(o[1]===1&&o[2]===1,()=>`A linear work group size is required. But got ${o}.`);let e=o[0]*4;return`
    var<workgroup> mm_Asub : array<vec4<f32>, ${o[0]}>;

    ${C()} {
      let tileCol = i32(localId.x);
      let globalCol = i32(globalId.x);
      let globalRow = i32(globalId.y);

      let numTiles = (uniforms.dimInner - 1) / ${e} + 1;
      let batch = i32(globalId.z);
      let batchA = batch % uniforms.aShape[0];
      let batchB = batch % uniforms.bShape[0];
      // Without this initialization strange values show up in acc.
      var acc = 0.0;

      // Loop over shared dimension.
      for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        let colA = t * ${e} + tileCol * 4;
        mm_Asub[tileCol] = vec4<f32>(${Tl(t)});
        workgroupBarrier();

        // Compute acc values for a single thread.
        for (var k = 0; k < ${e/4}; k++) {
          let rowB = t * ${e} + k * 4;
          let BCached = vec4<f32>(mm_readB(batchB, rowB, globalCol),
                              mm_readB(batchB, rowB + 1, globalCol),
                              mm_readB(batchB, rowB + 2, globalCol),
                              mm_readB(batchB, rowB + 3, globalCol));

          let ACached = mm_Asub[k];
          acc = acc + dot(ACached, BCached);
        }

        workgroupBarrier();
      }

      mm_write(batch, globalRow, globalCol, acc);
    }
  `}var Ze=class{constructor(t,e,i=!1,r=!1,s=null,a=null,n=null,u=!1){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=e,this.dispatchLayout={x:[2],y:[1],z:[0]};let p=i?t[1]:t[2];if(this.isVec4=(p%4===0&&!i||e[1]%4===0&&i)&&e[2]%4===0&&!r,this.outputComponent=this.isVec4?4:1,this.isVectorA=e[1]===1&&!i,!this.isVec4&&this.isVectorA)this.elementsPerThread=[1,1,1],this.workgroupSize=[32,1,1];else{let l=Io(e[1],p,e[2],i);this.workgroupSize=l.workgroupSize,this.elementsPerThread=l.elementsPerThread}this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread);let d=s!=null,c=n!=null;d&&this.variableNames.push("bias"),c&&this.variableNames.push("preluActivationWeights"),this.sequentialAccessByThreads=u,this.transposeA=i,this.transposeB=r,this.addBias=d,this.activation=a,this.hasPreluActivationWeights=c,[this.fitAOuter,this.fitBOuter,this.fitInner]=this.getShapeFit(e[1],e[2],p),this.shaderKey=`matMulPacked_${this.elementsPerThread}_${i}_${r}_${this.activation}_${this.fitAOuter}_${this.fitBOuter}_${this.fitInner}_${this.isVec4}_${this.isVectorA}_${this.sequentialAccessByThreads}`}getShapeFit(t,e,i){let r=this.workgroupSize[1]*this.elementsPerThread[1],s=this.workgroupSize[0]*this.elementsPerThread[0];!this.isVec4&&this.isVectorA?this.tileInner=this.workgroupSize[0]*4:this.tileInner=s;let a=t%r===0,n=e%s===0,u=i%this.tileInner===0;return[a,n,u]}getUserCode(){return`
      ${G(this.activation,this.hasPreluActivationWeights,this.isVec4)}
      ${Ue(this.addBias,this.activation,!1,this.transposeB,this.fitAOuter,this.fitBOuter,this.fitInner,this.isVec4?4:1)}
      ${this.isVec4?ge(this.elementsPerThread,this.workgroupSize,this.transposeA,this.tileInner,!1,null,!0):this.isVectorA?_l(this.workgroupSize,this.transposeA):xe(this.elementsPerThread,this.workgroupSize,this.transposeA,this.tileInner,!1,null,this.sequentialAccessByThreads,!0)}
    `}};function Bl(o){return`
    var<workgroup> sumValues : array<f32, ${o}>;
    ${C()} {
      let coords = getOutputCoords();
      let batch = coords[0];
      let batchA = batch % uniforms.aShape[0];
      let batchB = batch % uniforms.bShape[0];
      let row = coords[1];
      let col = coords[2];
      var sum = 0.0;
      let Length = uniforms.dimInner;
      for (var k = i32(localId.x); k < Length; k = k + ${o}) {
        let dataA = mm_readA(batchA, row, k);
        let dataB = mm_readB(batchB, k, col);
        sum = sum + dataA * dataB;
      }
      sumValues[localId.x] = sum;
      workgroupBarrier();

      for(var currentSize = ${o/2}u; currentSize > 1u;
          currentSize = currentSize / 2u) {
        if (localId.x < currentSize)
        {
          sumValues[localId.x] = sumValues[localId.x] + sumValues[localId.x + currentSize];
        }
        workgroupBarrier();
      }

      if (localId.x == 0u) {
        sum = sumValues[0] + sumValues[1];
        mm_write(batch, row, col, sum);
      }
    }
  `}var Je=class{constructor(t,e=!1,i=!1,r=null,s=null,a=null){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[256,1,1],this.outputShape=t,this.dispatchLayout={x:[],y:[1,2],z:[0]},this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize);let n=r!=null,u=a!=null;n&&this.variableNames.push("bias"),u&&this.variableNames.push("preluActivationWeights"),this.transposeA=e,this.transposeB=i,this.addBias=n,this.activation=s,this.hasPreluActivationWeights=u,this.shaderKey=`matMulReduce_${this.activation}_${e}_${i}`}getUserCode(){return`
      ${G(this.activation,this.hasPreluActivationWeights)}
      ${Ue(this.addBias,this.activation,this.transposeA,this.transposeB)}
      ${Bl(this.workgroupSize[0])}
    `}};function El(o){let t=o[1],e=o[0],i=t>e?t:e;return`
  var<workgroup> mm_Asub : array<array<f32, ${i}>, ${t}>;
  var<workgroup> mm_Bsub : array<array<f32, ${e}>, ${i}>;

  // If the output size is small for matrix multiplication, avoid to use vec4
  // and handle some elements per thread to optimally utilize the ALU.
  // Read data from global memory to registers firstly, then store them into
  // shared memory, so it is instruction-Level parallelism for arithmetic
  // operations and others handle IO operations between barrier api, makes ALU
  // and load/store units work simultaneously, could improves the performance.
  ${C()} {
    let tileRow = i32(localId.y);
    let tileCol = i32(localId.x);
    let globalRow = i32(globalId.y);
    let globalCol = i32(globalId.x);
    let batch = i32(globalId.z);
    let batchA = batch % uniforms.aShape[0];
    let batchB = batch % uniforms.bShape[0];

    // uniforms.dimInner should be greater than 0.
    let numTiles = (uniforms.dimInner - 1) / ${i} + 1;
    var acc = 0.0;

    var globalColA = tileCol;
    var globalRowB = 0;
    var regA = mm_readA(batchA, globalRow, globalColA);
    var regB0 = mm_readB(batchB, globalRowB + 2 * tileRow, globalCol);
    var regB1 = mm_readB(batchB, globalRowB + 2 * tileRow + 1, globalCol);
    globalColA = globalColA + ${i};
    globalRowB = globalRowB + ${i};

    for (var t = 0; t < numTiles; t = t + 1) {
      mm_Asub[tileRow][tileCol] = regA;
      mm_Bsub[2 * tileRow][tileCol] = regB0;
      mm_Bsub[2 * tileRow + 1][tileCol] = regB1;

      workgroupBarrier();

      regA = mm_readA(batchA, globalRow, globalColA);
      regB0 = mm_readB(batchB, globalRowB + 2 * tileRow, globalCol);
      regB1 = mm_readB(batchB, globalRowB + 2 * tileRow + 1, globalCol);
      globalColA = globalColA + ${i};
      globalRowB = globalRowB + ${i};

      for (var k = 0; k < ${i}; k = k + 1) {
        acc = acc + mm_Asub[tileRow][k] * mm_Bsub[k][tileCol];
      }
      workgroupBarrier();
    }

    mm_write(batch, globalRow, globalCol, acc);
  }
  `}var et=class{constructor(t,e,i,r=!1,s=!1,a=null,n=null,u=null){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[16,8,1],this.outputShape=i,this.dispatchLayout={x:[2],y:[1],z:[0]},this.dispatch=[Math.ceil(i[2]/this.workgroupSize[0]),Math.ceil(i[1]/this.workgroupSize[1]),i[0]];let p=a!=null;p&&this.variableNames.push("bias");let d=u!=null;d&&this.variableNames.push("preluActivationWeights"),this.transposeA=r,this.transposeB=s,this.addBias=p,this.activation=n,this.hasPreluActivationWeights=d,this.shaderKey=`matMulSmallOutputSize_${this.activation}_${r}_${s}`}getUserCode(){return`
      ${G(this.activation,this.hasPreluActivationWeights)}
      ${Ue(this.addBias,this.activation,this.transposeA,this.transposeB)}
      ${El(this.workgroupSize)}
    `}};var tt=class{constructor(t,e,i=!1,r=!1){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[8,8,1],this.atomic=!0,this.splitedDimInner=128,g.assert(t[0]===1,()=>"MatMulSplitKProgram only supports batch = 1."),this.outputShape=t,this.dispatchLayout={x:[2],y:[1],z:[0,3]};let s=(i&&this.outputShape[1]%4===0||!i&&e%4===0)&&this.outputShape[2]%4===0;this.elementsPerThread=[4,4,this.splitedDimInner],this.outputComponent=s?4:1,s||(this.outputShape[1]<16&&(this.elementsPerThread[1]=1),this.outputShape[2]<16&&(this.elementsPerThread[0]=1)),this.dispatch=y(this.dispatchLayout,[this.outputShape[0],this.outputShape[1],this.outputShape[2],e],this.workgroupSize,this.elementsPerThread),this.transposeA=i,this.transposeB=r,this.shaderKey=`matMulSplitK_${i}_${r}_${this.elementsPerThread}_${this.outputComponent}`}getUserCode(){let t=this.outputComponent;return`
      ${Ro(!1,this.transposeB,!1,!1,!1,t)}
      fn mm_write(batch: i32, row : i32, col : i32, value : ${F(t)}) {
        if (row < uniforms.dimAOuter && col < uniforms.dimBOuter) {
          let coords = vec3<i32>(batch, row, col);
          let flatIndex = getOutputIndexFromCoords(coords);
          // The problem is that we should initialize output to zero before using.
          // Otherwise, the original value will be added to the result.
          for (var i = 0; i < ${t}; i = i + 1) {
            ${j("&result[flatIndex + i]",`${t>1?"value[i]":"value"}`,"float32")}
          }
        }
      }
      ${t===4?ge(this.elementsPerThread,this.workgroupSize,this.transposeA,32,!0,this.splitedDimInner):xe(this.elementsPerThread,this.workgroupSize,this.transposeA,32,!0,this.splitedDimInner)}
    `}},ot=class{constructor(t,e=null,i=null,r=null){this.uniforms="",this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.addBias=e!=null,this.hasPreluActivationWeights=r!=null,this.activation=i,this.addBias&&this.variableNames.push("bias"),this.hasPreluActivationWeights&&this.variableNames.push("preluActivationWeights"),this.shaderKey=`biasActivation_${i}`}getUserCode(){return`
    ${G(this.activation,this.hasPreluActivationWeights)}
    ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        var value = getXByOutputIndex(index);
        ${Q(this.addBias,this.activation)}
        setOutputAtIndex(index, value);
      }
    }
    `}};var rt=class{constructor(t){this.variableNames=[],this.outputShape=[],this.uniforms="value : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="fill"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.size) {
        setOutputAtIndex(index, uniforms.value);
      }
    }
  `}};function U(o){let{backend:t,attrs:e}=o,{shape:i,value:r}=e,{dtype:s}=e;if(s=s||g.inferDtype(r),s==="string"){let a=g.getArrayFromDType(s,g.sizeFromShape(i));return a.fill(r),t.makeTensorInfo(i,s,a)}else{let a=new rt(i),n=[{type:"float32",data:[r]}];return t.runWebGPUProgram(a,[],s,n)}}var aa={kernelName:qr,backendName:"webgpu",kernelFunc:U};function R(o){let{inputs:t,attrs:e}=o,{x:i}=t,{shape:r}=e,s=g.sizeFromShape(i.shape),a=g.inferFromImplicitShape(r,s),n=g.sizeFromShape(a);return g.assert(s===n,()=>`The new shape (${a}) has ${n} elements and the old shape (${i.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`),o.backend.incRef(i.dataId),{dataId:i.dataId,shape:a,dtype:i.dtype}}var na={kernelName:Yi,backendName:"webgpu",kernelFunc:R};function Ce({a:o,b:t,transposeA:e,transposeB:i,backend:r,bias:s=null,preluActivationWeights:a=null,leakyreluAlpha:n=0,activation:u=null}){let p=o.shape.length,d=t.shape.length,c=e?o.shape[p-2]:o.shape[p-1],l=i?t.shape[d-1]:t.shape[d-2],h=e?o.shape[p-1]:o.shape[p-2],m=i?t.shape[d-2]:t.shape[d-1],f=o.shape.slice(0,-2),x=t.shape.slice(0,-2),v=g.sizeFromShape(f),I=g.sizeFromShape(x),D=Ks.assertAndGetBroadcastShape(o.shape.slice(0,-2),t.shape.slice(0,-2)).concat([h,m]);g.assert(c===l,()=>`Error in matMul: inner shapes (${c}) and (${l}) of Tensors with shapes ${o.shape} and ${t.shape} and transposeA=${e} and transposeB=${i} must match.`);let P=e?[v,c,h]:[v,h,c],z=i?[I,m,l]:[I,l,m],A=R({inputs:{x:o},backend:r,attrs:{shape:P}}),_=R({inputs:{x:t},backend:r,attrs:{shape:z}}),T=[A,_],M=Math.max(v,I),O=[A,_],Y=[{type:"int32",data:[h]},{type:"int32",data:[m]},{type:"int32",data:[c]}],K,V,H=[M,h,m],X=E().get("WEBGPU_MATMUL_PROGRAM_TYPE");if(X<0){let we=E().getNumber("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL"),Ae=we>0?we:r.thresholdToIncreaseWorkgroups,Fe=M*Math.ceil(h/32)*Math.ceil(m/32);Fe<=Ae||h<=8&&Fe<=Ae*2?M*h*m<=128?X=re.MatMulReduceProgram:M===1&&l>=2e3?X=re.MatMulSplitKProgram:X=re.MatMulSmallOutputSizeProgram:X=re.MatMulPackedProgram}switch(X){case re.MatMulReduceProgram:K=new Je(H,e,i,s,u,a);break;case re.MatMulSplitKProgram:{if(V=U({backend:r,attrs:{shape:H,value:0,dtype:o.dtype}}),K=new tt(H,l,e,i),s||u){V=r.runWebGPUProgram(K,O,o.dtype,Y,V);let Ae=new ot(V.shape,s,u,a),Fe=null,Ge=[V];s&&Ge.push(s),a&&Ge.push(a),u==="leakyrelu"&&(Fe=[{type:"float32",data:[n]}],Ae.uniforms+=" alpha : f32,");let Wo=r.runWebGPUProgram(Ae,Ge,V.dtype,Fe);T.push(V);let Yp=R({inputs:{x:Wo},backend:r,attrs:{shape:D}});T.push(Wo);for(let jp of T)r.disposeData(jp.dataId);return Yp}break}case re.MatMulSmallOutputSizeProgram:K=new et(P,z,H,e,i,s,u,a);break;case re.MatMulPackedProgram:let we=r.adapterInfo.isIntel();K=new Ze(P,H,e,i,s,u,a,we);break;default:throw new Error(`Unsupported MatMulProgramType ${X}.`)}s&&O.push(s),a&&O.push(a),u==="leakyrelu"&&(Y.push({type:"float32",data:[n]}),K.uniforms+=" alpha : f32,"),V=r.runWebGPUProgram(K,O,o.dtype,Y,V);let qp=R({inputs:{x:V},backend:r,attrs:{shape:D}});T.push(V);for(let we of T)r.disposeData(we.dataId);return qp}function Ul(o){let{inputs:t,backend:e,attrs:i}=o,{a:r,b:s,bias:a,preluActivationWeights:n}=t,{transposeA:u,transposeB:p,activation:d,leakyreluAlpha:c}=i;return Ce({a:r,b:s,transposeA:u,transposeB:p,backend:e,bias:a,preluActivationWeights:n,leakyreluAlpha:c,activation:d})}var ua={kernelName:Ws,backendName:"webgpu",kernelFunc:Ul};var We=class{constructor(t,e,i){this.variableNames=["AReal","AImag","BReal","BImag"],this.workgroupSize=[128,1,1],this.size=!0,this.outputShape=S.assertAndGetBroadcastShape(e,i),this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`binaryOpComplex_${t}`,this.op=t}getUserCode(){return`
      fn binaryOpComplex(
          areal : f32, aimag : f32, breal : f32, bimag : f32) -> f32 {
        ${Ie(this.op,!1)}
      }

      ${C("index")} {
        if(index < uniforms.size) {
          let areal = getARealByOutputIndex(index);
          let aimag = getAImagByOutputIndex(index);
          let breal = getBRealByOutputIndex(index);
          let bimag = getBImagByOutputIndex(index);
          setOutputAtIndex(index, binaryOpComplex(areal, aimag, breal, bimag));
        }
      }
    `}};var le=class{constructor(t,e,i){if(this.size=!0,this.variableNames=["A","B"],this.outputShape=S.assertAndGetBroadcastShape(e,i),this.dispatchLayout=w(this.outputShape),this.op=t,this.useSharedMemoryWithA=e.length<=1&&i.length>1&&e[0]<128,this.useSharedMemoryWithB=i.length<=1&&e.length>1&&i[0]<128,this.useSharedMemoryWithA||this.useSharedMemoryWithB)this.outputComponent=1,this.variableComponents=[1,1],this.lastDimensionSize=this.useSharedMemoryWithB?i[0]:e[0],this.shaderKey=`binary_${t}_${this.lastDimensionSize}`,this.type="shared",this.workgroupSize=[256,1,1];else{let r=e.length>0&&e[e.length-1]%4===0,s=i.length>0&&i[i.length-1]%4===0;r&&s?(this.outputComponent=4,this.variableComponents=[4,4]):r&&(g.isScalarShape(i)||i[i.length-1]===1)||s&&(g.isScalarShape(e)||e[e.length-1]===1)?(this.outputComponent=4,this.variableComponents=r?[4,1]:[1,4]):(this.outputComponent=1,this.variableComponents=[1,1]),this.type="nonshared",this.shaderKey=`binary_${t}_${this.variableComponents}`,this.workgroupSize=[128,1,1]}this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.outputComponent,1,1])}getUserCode(){let t,e=this.outputComponent===4?"vec4<f32>":"f32",i=`
    fn binaryOperation(a : ${e}, b : ${e}) -> ${e} {
      ${Ie(this.op,this.outputComponent===4)}
    };
    `;if(this.type==="shared"){let r=this.lastDimensionSize>1?`coords[${this.outputShape.length-1}]`:"0",s=this.useSharedMemoryWithB?`let a = getAByOutputIndex(index);
          let b = sharedBuf[${r}];`:`let a = sharedBuf[${r}];
          let b = getBByOutputIndex(index);`;t=`
        ${i}
        var<workgroup> sharedBuf : array<f32, ${this.lastDimensionSize}>;
        ${C("index")} {
          // Fill in the shared memory buffer.
          let localIndex = i32(localId.x);
          if(localIndex < ${this.lastDimensionSize}) {
            sharedBuf[localIndex] = f32(${this.useSharedMemoryWithB?"B":"A"}[localIndex]);
          }
          workgroupBarrier();

          if(index < uniforms.size) {
            let coords = getCoordsFromIndex(index);
            ${s}
            setOutputAtIndex(index, binaryOperation(a, b));
          }
        }
        `}else t=`
       ${i}
       ${C("index")} {
         if (index < uniforms.size) {
           let coords = getCoordsFromIndex(index * ${this.outputComponent});
           let a = ${e}(getAByOutputCoords(coords));
           let b = ${e}(getBByOutputCoords(coords));
           setOutputAtIndex(index, binaryOperation(a, b));
         }
       }
       `;return t}};function W(o){let{inputs:t}=o,{x:e}=t;return o.backend.incRef(e.dataId),{dataId:e.dataId,shape:e.shape,dtype:e.dtype}}var pa={kernelName:ri,backendName:"webgpu",kernelFunc:W};function te(o){let{inputs:t,backend:e}=o,{real:i,imag:r}=t,s=e.makeTensorInfo(i.shape,"complex64"),a=e.tensorMap.get(s.dataId),n=W({inputs:{x:i},backend:e}),u=W({inputs:{x:r},backend:e});return a.complexTensorInfos={real:n,imag:u},s}var da={kernelName:mr,backendName:"webgpu",kernelFunc:te};var Z=class{constructor(t,e,i=""){this.variableNames=["A"],this.size=!0;let r=128;this.workgroupSize=[r,1,1],this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.op=e,i!==""&&(this.uniforms=i),this.shaderKey=`unary_${e}`}getUserCode(){return`
      fn unaryOperation(a : f32) -> f32 {
        ${de(this.op,!1)}
      }
      ${C("index")} {
        if (index < uniforms.size) {
          let a = getAByOutputIndex(index);
          setOutputAtIndex(index, unaryOperation(a));
        }
      }
      `}};function N({opType:o,cpuKernelImpl:t,dtype:e}){return({inputs:i,backend:r})=>{let{x:s}=i,a=r,n=e||s.dtype;if(a.shouldExecuteOnCPU([s])&&t!=null){let p=a.tensorMap.get(s.dataId),d=t(p.values,n);return a.makeTensorInfo(s.shape,n,d)}let u=new Z(s.shape,o);return a.runWebGPUProgram(u,[s],n)}}function L({opType:o,cpuKernelImpl:t,supportsComplex:e=!1,dtype:i}){return({inputs:r,backend:s})=>{let{a,b:n}=r,u=s;if(e&&a.dtype==="complex64"){let c=u.tensorMap.get(a.dataId),l=u.tensorMap.get(n.dataId),h,m;if(o!==$.MUL)[h,m]=[[c.complexTensorInfos.real,l.complexTensorInfos.real],[c.complexTensorInfos.imag,l.complexTensorInfos.imag]].map(x=>{let[v,I]=x,k={dataId:v.dataId,dtype:v.dtype,shape:a.shape},D={dataId:I.dataId,dtype:I.dtype,shape:n.shape},P=new le(o,a.shape,n.shape);return u.runWebGPUProgram(P,[k,D],ue(v.dtype,I.dtype))});else{let x=new We($.COMPLEX_MULTIPLY_REAL,a.shape,n.shape),v=new We($.COMPLEX_MULTIPLY_IMAG,a.shape,n.shape),I=[{dataId:c.complexTensorInfos.real.dataId,dtype:c.complexTensorInfos.real.dtype,shape:a.shape},{dataId:c.complexTensorInfos.imag.dataId,dtype:c.complexTensorInfos.imag.dtype,shape:a.shape},{dataId:l.complexTensorInfos.real.dataId,dtype:l.complexTensorInfos.real.dtype,shape:n.shape},{dataId:l.complexTensorInfos.imag.dataId,dtype:l.complexTensorInfos.imag.dtype,shape:n.shape}];h=u.runWebGPUProgram(x,I,"float32"),m=u.runWebGPUProgram(v,I,"float32")}let f=te({inputs:{real:h,imag:m},backend:u});return u.disposeData(h.dataId),u.disposeData(m.dataId),f}let p=i||ue(a.dtype,n.dtype);if((a.dtype==="string"||n.dtype==="string"||u.shouldExecuteOnCPU([a,n]))&&t!=null){let c=u.tensorMap.get(a.dataId).values,l=u.tensorMap.get(n.dataId).values,h=a.dtype==="string"?S.fromUint8ToStringArray(c):c,m=a.dtype==="string"?S.fromUint8ToStringArray(l):l,[f,x]=t(a.shape,n.shape,h,m,p);return u.makeTensorInfo(x,p,f)}let d=new le(o,a.shape,n.shape);return u.runWebGPUProgram(d,[a,n],p)}}var{addImpl:la,castImpl:ca,ceilImpl:ha,concatImpl:ma,equalImpl:fa,expImpl:ga,expm1Impl:xa,floorImpl:Ca,floorDivImpl:ya,gatherNdImpl:Sa,gatherV2Impl:wa,greaterEqualImpl:ba,greaterImpl:va,lessEqualImpl:Ia,lessImpl:ka,logImpl:Ra,maxImpl:Da,maximumImpl:Pa,minimumImpl:$a,multiplyImpl:Na,negImpl:za,notEqualImpl:Aa,prodImpl:Fa,rangeImpl:La,rsqrtImpl:Ta,scatterImpl:_a,simpleAbsImpl:Ba,sliceImpl:Ea,stridedSliceImpl:Ua,stringNGramsImpl:Wa,subImpl:Ma,tileImpl:Oa,topKImpl:Va,transposeImpl:Ha,uniqueImpl:mg}=qs;var Wl=N({opType:b.ABS,cpuKernelImpl:Ba}),Ga={kernelName:"Abs",backendName:"webgpu",kernelFunc:Wl};var Ml=N({opType:b.ACOS}),Ka={kernelName:Ho,backendName:"webgpu",kernelFunc:Ml};var Ol=N({opType:b.ACOSH}),Xa={kernelName:Go,backendName:"webgpu",kernelFunc:Ol};var Vl=L({opType:$.ADD,cpuKernelImpl:la,supportsComplex:!0}),qa={kernelName:"Add",backendName:"webgpu",kernelFunc:Vl};var it=class{constructor(t){this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t[0],this.variableNames=t.map((e,i)=>`T${i}`),this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.shaderKey="addN"}getUserCode(){let t=[];this.variableNames.forEach(r=>{t.push(`let v${r} = get${r}ByOutputCoords(coords);`)});let e=this.variableNames.map(r=>`v${r}`).join(" + ");return`
      ${C("index")} {
        for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if (flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            ${t.join(`
        `)}
            setOutputAtIndex(flatIndex, ${e});
          }
        }
      }
    `}};function Hl(o){let{inputs:t,backend:e}=o,i=t;if(i.length===1)return W({inputs:{x:i[0]},backend:e});let r=i.map(n=>n.dtype).reduce((n,u)=>ue(n,u)),s=i.map(n=>n.shape),a=new it(s);return e.runWebGPUProgram(a,i,r)}var Ya={kernelName:Xo,backendName:"webgpu",kernelFunc:Hl};var st=class{constructor(t,e){this.variableNames=["A"],this.workgroupSize=[16,16,1];let i=new Array(t.length);for(let r=0;r<i.length;r++)i[r]=t[e[r]];this.outputShape=i,this.dispatchLayout={x:[0],y:[1]},this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[1,1,1]),this.shaderKey="transposeShared"}getUserCode(){g.assert(this.workgroupSize[0]===this.workgroupSize[1],()=>`Must be a square tile, current tile shape is ${this.workgroupSize[0]} x ${this.workgroupSize[1]}`);let t=this.workgroupSize[0];return`
      var<workgroup> tile : array<array<f32, ${this.workgroupSize[0]+1}>, ${this.workgroupSize[0]}>;
      ${C()} {
        var x = i32(workgroupId.x) * ${t} + i32(localId.x);
        var y = i32(workgroupId.y) * ${t} + i32(localId.y);
        let width = uniforms.outShape[0];
        let height = uniforms.outShape[1];
        if (x < width && y < height) {
          tile[localId.y][localId.x] = f32(A[y * width + x]);
        }
        workgroupBarrier();

        x = i32(workgroupId.y) * ${t} + i32(localId.x);
        y = i32(workgroupId.x) * ${t} + i32(localId.y);
        if (x < height && y < width) {
          setOutputAtIndex((y * height + x), tile[localId.x]
            [localId.y]);
        }
      }
    `}};var at=class{constructor(t,e){this.variableNames=["A"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0;let i=new Array(t.length);for(let r=0;r<i.length;r++)i[r]=t[e[r]];this.outputShape=i,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.newDim=e,this.shaderKey=`transpose_${e}`}getUserCode(){let t=B(this.outputShape.length),e=Do(this.newDim);return`
      ${C("index")} {
        for(var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if(flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            setOutputAtIndex(flatIndex, A[getIndexFromCoords${this.outputShape.length}D(
              ${t}(${e}), uniforms.aShape)]);
          }
        }
      }
    `}};function Do(o){let t=o.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let e=new Array(t);for(let i=0;i<o.length;i++)e[o[i]]=`coords.${oe(i)}`;return e.join()}function q(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{perm:s}=i,a=e,n=r.shape.length,u=new Array(n);for(let d=0;d<u.length;d++)u[d]=r.shape[s[d]];if(e.shouldExecuteOnCPU([r])){let c=a.tensorMap.get(r.dataId).values,l=Ha(c,r.shape,r.dtype,s,u);return e.makeTensorInfo(u,r.dtype,l)}if(r.shape.length===2&&g.arraysEqual(s,[1,0])){let d=new st(r.shape,s);return a.runWebGPUProgram(d,[r],r.dtype)}let p=new at(r.shape,s);return a.runWebGPUProgram(p,[r],r.dtype)}var ja={kernelName:Fs,backendName:"webgpu",kernelFunc:q};var nt=class{constructor(t,e,i){this.variableNames=["x"],this.uniforms="reduceSize : i32,",this.size=!0,this.inputShape=[t.batchSize,t.inSize];let[r]=S.computeOutAndReduceShapes(this.inputShape,[1]);this.outputShape=r.length===0?[1]:r,t.inSize>=32768&&i>=512?this.workgroupSize=[512,1,1]:t.inSize>=4096?this.workgroupSize=[256,1,1]:this.workgroupSize=[64,1,1],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,[1,1,1]),this.reduceType=e,this.shaderKey=`reduce_${e}`}getUserCode(){let t="",e="0.0",i=this.workgroupSize[0];this.reduceType==="min"||this.reduceType==="max"?(t=`
         if (isnan(candidate)) {
          bestValue = uniforms.NAN;
         } else if (!isnan(bestValue) && candidate ${this.reduceType==="min"?"<":">"} bestValue)
           {  bestValue = candidate; }`,e="f32(x[offset])"):this.reduceType==="sum"||this.reduceType==="mean"?t=" bestValue = bestValue + candidate; ":this.reduceType==="prod"?(t=" bestValue = bestValue * candidate; ",e="1.0"):this.reduceType==="all"?(t=" bestValue = f32(bestValue >= 1.0 && candidate >= 1.0); ",e="1.0"):this.reduceType==="any"&&(t=" bestValue = f32(bestValue >= 1.0 || candidate >= 1.0); ",e="0.0");let r=this.reduceType==="mean"?"setOutputAtIndex(outputIndex, bestValue / f32(uniforms.reduceSize));":"setOutputAtIndex(outputIndex, bestValue);";return`
       fn DIV_CEIL(a : u32, b : u32) -> u32 {
        return ((a - 1u) / b + 1u);
       }

       ${`
         var<workgroup> xBestValues : array<f32, ${i}>;
       `}
       fn getOffset(outputIndex : i32) -> i32 {
         let outputCoords = getCoordsFromIndex(outputIndex);
         let offset = ${this.outputShape.length===1?"outputCoords":"outputCoords[0]"} * uniforms.reduceSize;
          return offset;
       }
       ${C("index")} {
         let outputIndex = index / ${i};
         let offset = getOffset(outputIndex);
         var bestValue = ${e};
         let Length = uniforms.reduceSize;
         let WorkPerThread = DIV_CEIL(u32(Length), ${i}u);
         for (var k = i32(localId.x); k < Length && outputIndex < uniforms.size;
             k = k + ${i}) {
           let candidate = f32(x[offset + k]);
           ${t}
         }
         xBestValues[localId.x] = bestValue;
         workgroupBarrier();

         var reduceSize = min(u32(Length), ${i}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (localId.x < currentSize) {
            let candidate = xBestValues[localId.x + interval];
            ${t}
            xBestValues[localId.x] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (localId.x == 0u && outputIndex < uniforms.size) {
          ${r}
        }
       }
     `}};var Gl={mean:"float32",all:"bool",any:"bool"};function J(o,t,e,i,r){let s=o.shape.length,a=[],n=g.parseAxisParam(t,o.shape),u=n,p=S.getAxesPermutation(u,s),d=o;p!=null&&(d=q({inputs:{x:o},attrs:{perm:p},backend:r}),u=S.getInnerMostAxes(u.length,s),a.push(d)),S.assertAxesAreInnerMostDims(i,u,s);let[c,l]=S.computeOutAndReduceShapes(d.shape,u),h=c;e&&(h=S.expandShapeToKeepDim(c,n));let m;if((i==="max"||i==="prod")&&r.shouldExecuteOnCPU([d])){let f=r.tensorMap.get(d.dataId).values;switch(i){case"max":let x=Da(f,g.sizeFromShape(l),h,o.dtype);m=r.makeTensorInfo(h,o.dtype,x);break;case"prod":let{outVals:v,outShape:I,outDtype:k}=Fa(d.shape,d.dtype,f,u);m=r.makeTensorInfo(I,k,v);break;default:throw new Error(`${i} CPU implementation is not yet supported.`)}}else{let f=g.sizeFromShape(l),v=g.sizeFromShape(d.shape)/f,I={windowSize:f,inSize:f,batchSize:v,outSize:1},k=Gl[i]||Hs(o.dtype),D=[{type:"int32",data:[f]}],P=new nt(I,i,r.device.limits.maxComputeWorkgroupSizeX),z=r.runWebGPUProgram(P,[d],k,D);a.push(z),m=R({inputs:{x:z},attrs:{shape:h},backend:r})}return a.forEach(f=>r.disposeData(f.dataId)),m}function Kl(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{keepDims:s,axis:a}=i;return J(r,a,s,"all",e)}var Qa={kernelName:"All",backendName:"webgpu",kernelFunc:Kl};function Xl(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{keepDims:s,axis:a}=i;return J(r,a,s,"any",e)}var Za={kernelName:"Any",backendName:"webgpu",kernelFunc:Xl};var ke=class{constructor(t,e,i){this.workgroupSize=[64,1,1],this.variableNames=["x"],this.uniforms="infinityValue : f32,",this.size=!0;let r=[e];this.op=i==="min"?"<":">";let[s,a]=S.computeOutAndReduceShapes(t,r);this.outputShape=s.length===0?[1]:s,this.dispatchLayout=w(this.outputShape),g.sizeFromShape(a)<32?(this.type="plain",this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize)):(this.type="shared",this.dispatch=y(this.dispatchLayout,this.outputShape,[1,1,1])),this.inputShape=t,this.shaderKey=`argMinMax_${this.op}_${this.type}`}getUserCode(){let t=this.workgroupSize[0],e=()=>this.inputShape.length===1?"uniforms.xShape":`uniforms.xShape.${oe(this.inputShape.length-1)}`,i=()=>{let r="";if(this.outputShape.length===1)this.inputShape.length!==1&&(r+="outputCoords,");else for(let s=0;s<this.outputShape.length;s++)r+=`outputCoords.${oe(s)},`;return r};return this.type==="shared"?`
      fn DIV_CEIL(a : u32, b : u32) -> u32 {
        return ((a - 1u) / b + 1u);
      }

      ${`
      var<workgroup> xBestIndices : array<i32, ${t}>;
      var<workgroup> xBestValues : array<f32, ${t}>;
    `}

      ${C("index")} {
        let outputIndex = index / ${t};
        let reduceLength = ${e()};

        var bestIndex = i32(localId.x);
        var bestValue = uniforms.infinityValue;
        let outputCoords = getCoordsFromIndex(outputIndex);
        for (var k = i32(localId.x); k < reduceLength && outputIndex < uniforms.size;
            k = k + ${t}) {
          let candidate = getX(${i()} k);
          if (!isnan(candidate) && candidate ${this.op} bestValue) {
            bestValue = candidate;
            bestIndex = k;
          }
        }
        xBestValues[localId.x] = bestValue;
        xBestIndices[localId.x] = bestIndex;
        workgroupBarrier();

        var reduceSize = min(u32(reduceLength), ${t}u);
        for (var currentSize = reduceSize / 2u; reduceSize > 1u;
            currentSize = reduceSize / 2u) {
          let interval = DIV_CEIL(reduceSize, 2u);
          if (localId.x < currentSize) {
            let candidate = xBestValues[localId.x + interval];
            if (candidate ${this.op} bestValue) {
              bestValue = candidate;
              xBestValues[localId.x] = bestValue;
              xBestIndices[localId.x] = xBestIndices[localId.x + interval];
            }
          }
          reduceSize = interval;
          workgroupBarrier();
        }

        if (localId.x == 0u && outputIndex < uniforms.size) {
          setOutputAtIndexI32(outputIndex, xBestIndices[localId.x]);
        }
      }
    `:`
      ${C("index")} {
        if (index < uniforms.size) {
          let outputCoords = getCoordsFromIndex(index);
          var bestIndex = 0;
          var bestValue = getX(${i()} 0);
          let reduceLength = ${e()};
          for (var i = 1; i < reduceLength; i++) {
            let candidate = getX(${i()} i);
            if (candidate ${this.op} bestValue) {
              bestValue = candidate;
              bestIndex = i;
            }
          }
          setOutputAtIndexI32(index, bestIndex);
        }
      }
      `}};function ql(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{axis:s}=i,a=g.parseAxisParam(s,r.shape),n=S.getAxesPermutation(a,r.shape.length),u=r,p=[];n!=null&&(u=q({inputs:{x:r},backend:e,attrs:{perm:n}}),p.push(u),a=S.getInnerMostAxes(a.length,u.shape.length)),S.assertAxesAreInnerMostDims("argMax",[a[0]],u.shape.length);let d=new ke(u.shape,a[0],"max"),c=[{type:"float32",data:[Number.NEGATIVE_INFINITY]}],l=e.runWebGPUProgram(d,[u],"int32",c);return p.forEach(h=>e.disposeData(h.dataId)),l}var Ja={kernelName:jo,backendName:"webgpu",kernelFunc:ql};function Yl(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{axis:s}=i,a=g.parseAxisParam(s,r.shape),n=S.getAxesPermutation(a,r.shape.length),u=r,p=[];n!=null&&(u=q({inputs:{x:r},backend:e,attrs:{perm:n}}),p.push(u),a=S.getInnerMostAxes(a.length,u.shape.length)),S.assertAxesAreInnerMostDims("argMin",[a[0]],u.shape.length);let d=new ke(u.shape,a[0],"min"),c=[{type:"float32",data:[Number.POSITIVE_INFINITY]}],l=e.runWebGPUProgram(d,[u],"int32",c);return p.forEach(h=>e.disposeData(h.dataId)),l}var en={kernelName:Qo,backendName:"webgpu",kernelFunc:Yl};var jl=N({opType:b.ASIN}),tn={kernelName:Zo,backendName:"webgpu",kernelFunc:jl};var Ql=N({opType:b.ASINH}),on={kernelName:Jo,backendName:"webgpu",kernelFunc:Ql};var Zl=N({opType:b.ATAN}),rn={kernelName:er,backendName:"webgpu",kernelFunc:Zl};var Jl=L({opType:$.ATAN2}),sn={kernelName:or,backendName:"webgpu",kernelFunc:Jl};var ec=N({opType:b.ATANH}),an={kernelName:tr,backendName:"webgpu",kernelFunc:ec};var ut=class{constructor(t){this.variableNames=["x"],this.uniforms="strides : vec2<i32>,",this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="poolWithFilterSizeEqualsOne"}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let batch = coords[0];
          let d = coords[3];

          let xRCCorner = coords.yz * uniforms.strides;
          let xRCorner = xRCCorner.x;
          let xCCorner = xRCCorner.y;

          let value = getX(batch, xRCorner, xCCorner, d);
          setOutputAtIndex(index, value);
        }
      }
    `}};var ae=class{constructor(t,e,i=!1,r=!1,s=!1){if(this.variableNames=["x"],this.uniforms="strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, convDims : vec2<i32>, filterDims : vec2<i32>,",this.workgroupSize=[128,1,1],this.size=!0,e==="avg"&&i)throw new Error("Cannot compute positions for average pool.");this.outputShape=t.outShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.poolType=e,this.computePositions=i,this.flattenPositions=r,this.includeBatchIndex=s,this.shaderKey=`pool2D_${e}_${i}_${r}_${s}`}getUserCode(){let t;this.poolType==="avg"?t="resultValue = resultValue + value; count = count + 1.0;":this.computePositions?t=`let currMaxValue = mix(value, maxValue, maxValueFound);
      if (value >= currMaxValue) {
        maxValue = value;
        maxValueFound = 1.0;
        maxPosition = ${this.flattenPositions?this.includeBatchIndex?"((batch * uniforms.xShape[1] + xR) * uniforms.xShape[2] + xC) * uniforms.xShape[3] + d":"(xR * uniforms.xShape[2] + xC) * uniforms.xShape[3] + d":"wR * uniforms.filterDims.y + wC"};
      }`:t="resultValue = max(value, resultValue);";let e="resultValue";return this.poolType==="avg"&&(e="resultValue / max(count, 1.0)"),`
      ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
          let batch = coords[0];
          let d = coords[3];
          let xRCCorner = vec2<i32>(coords.yz) * uniforms.strides - uniforms.pads;
          let xRCorner = xRCCorner.x;
          let xCCorner = xRCCorner.y;

          ${this.computePositions?`var maxValue = 0.0;
            var maxValueFound = 0.0;
            var maxPosition = 0;`:`var resultValue = ${this.poolType==="avg"?"0.0":"-1.0 / pow(10.0, -20.0)"};`}

          var count = 0.0;
          for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + uniforms.dilations.x) {
            let xR = xRCorner + wR;

            if (xR < 0 || xR >= uniforms.convDims.x) {
              continue;
            }

            for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + uniforms.dilations.y) {
              let xC = xCCorner + wC;
              if (xC < 0 || xC >= uniforms.convDims.y) {
                continue;
              }

              let value = getX(batch, xR, xC, d);
              ${t}
            }
          }

          ${this.computePositions?"setOutputAtIndexI32(index, maxPosition);":`setOutputAtIndex(index, ${e});`}
        }
      }
    `}},me=class{constructor(t,e,i=!1,r=!1,s=!1){if(this.variableNames=["x"],this.uniforms="strides : vec3<i32>, pads : vec3<i32>, convDims : vec3<i32>, filterDims : vec3<i32>,",this.workgroupSize=[128,1,1],this.size=!0,e==="avg"&&i)throw new Error("Cannot compute positions for average pool.");this.outputShape=t.outShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.poolType=e,this.computePositions=i,this.flattenPositions=r,this.includeBatchIndex=s,this.shaderKey=`pool3D_${e}_${i}_${r}_${s}`}getUserCode(){let t;this.poolType==="avg"?t="resultValue += value; count += 1.0;":this.computePositions?t=`let currMaxValue = mix(value, maxValue, maxValueFound);
      if (value >= currMaxValue) {
        maxValue = value;
        maxValueFound = 1.0;
        maxPosition = ${this.flattenPositions?this.includeBatchIndex?"(((batch * uniforms.xShape.y + xD) * uniforms.xShape.z + xR) * uniforms.xShape.w + xC) * uniforms.xShape.u + ch":"((xD * uniforms.xShape.z + xR) * uniforms.xShape.w + xC) * uniforms.xShape.u + ch":"wD * uniforms.filterDims.y * uniforms.filterDims.y + wR * uniforms.filterDims.z + wC"};
      }`:t="resultValue = max(value, resultValue);";let e="resultValue";return this.poolType==="avg"&&(e="resultValue / max(count, 1.0)"),`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let batch = coords.x;
          let ch = coords.u;

          let xCorner = vec3<i32>(coords.y, coords.z, coords.w) * uniforms.strides - uniforms.pads;
          let xDCorner = xCorner.x;
          let xRCorner = xCorner.y;
          let xCCorner = xCorner.z;

          ${this.computePositions?`var maxValue = 0.0;
            var maxValueFound = 0.0;
            var maxPosition = 0;`:`var resultValue = ${this.poolType==="avg"?"0.0":"-1.0 / pow(10.0, -20.0)"};`}

          var count = 0.0;
          for (var wD = 0; wD < uniforms.filterDims.x; wD++) {
            let xD = xDCorner + wD;
            if (xD < 0 || xD >= uniforms.convDims.x) {
              continue;
            }

            for (var wR = 0; wR < uniforms.filterDims.y; wR++) {
              let xR = xRCorner + wR;
              if (xR < 0 || xR >= uniforms.convDims.y) {
                continue;
              }

              for (var wC = 0; wC < uniforms.filterDims.z; wC++) {
                let xC = xCCorner + wC;
                if (xC < 0 || xC >= uniforms.convDims.z) {
                  continue;
                }

                let value = getX(batch, xD, xR, xC, ch);
                ${t}
              }
            }
          }

          ${this.computePositions?"setOutputAtIndexI32(index, maxPosition);":`setOutputAtIndex(index, ${e});`}
        }
      }
    `}};function Po(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{reductionIndices:s,keepDims:a}=i;return J(r,s,a,"max",e)}var nn={kernelName:"Max",backendName:"webgpu",kernelFunc:Po};function $o(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{keepDims:s,axis:a}=i;return J(r,a,s,"mean",e)}var un={kernelName:Di,backendName:"webgpu",kernelFunc:$o};function pt(o,t,e,i){if(t.filterWidth===1&&t.filterHeight===1&&g.arraysEqual(t.inShape,t.outShape))return W({inputs:{x:o},backend:i});if(t.filterWidth===t.inWidth&&t.filterHeight===t.inHeight&&t.batchSize===1&&t.padInfo.type==="VALID"){let a=o.shape.length,n=R({inputs:{x:o},backend:i,attrs:{shape:[o.shape[a-3]*o.shape[a-2],o.shape[a-1]]}}),u;e==="avg"?u=$o({inputs:{x:n},backend:i,attrs:{axis:0,keepDims:!1}}):(g.assert(e==="max",()=>`Invalid pool type ${e}`),u=Po({inputs:{x:n},backend:i,attrs:{reductionIndices:0,keepDims:!1}}));let p=R({inputs:{x:u},backend:i,attrs:{shape:t.outShape}});return i.disposeData(n.dataId),i.disposeData(u.dataId),p}let r,s=[{type:"int32",data:[t.strideHeight,t.strideWidth]}];return t.filterHeight===1&&t.filterWidth===1?r=new ut(t):(e==="avg"?r=new ae(t,"avg"):(g.assert(e==="max",()=>`Invalid pool type ${e}`),r=new ae(t,"max")),s.push({type:"int32",data:[t.padInfo.top,t.padInfo.left]},{type:"int32",data:[t.dilationHeight,t.dilationWidth]},{type:"int32",data:[t.inHeight,t.inWidth]},{type:"int32",data:[t.effectiveFilterHeight,t.effectiveFilterWidth]})),i.runWebGPUProgram(r,[o],o.dtype,s)}function tc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{filterSize:s,strides:a,pad:n,dimRoundingMode:u}=i,d=S.computePool2DInfo(r.shape,s,a,1,n,u);return pt(r,d,"avg",e)}var pn={kernelName:rr,backendName:"webgpu",kernelFunc:tc};function oc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{filterSize:s,strides:a,pad:n,dataFormat:u,dimRoundingMode:p}=i,d=[1,1,1],c=S.computePool3DInfo(r.shape,s,a,d,n,p,u),l=new me(c,"avg"),h=[{type:"int32",data:[c.strideDepth,c.strideHeight,c.strideWidth]},{type:"int32",data:[c.padInfo.front,c.padInfo.top,c.padInfo.left]},{type:"int32",data:[c.inDepth,c.inHeight,c.inWidth]},{type:"int32",data:[c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth]}];return e.runWebGPUProgram(l,[r],r.dtype,h)}var dn={kernelName:sr,backendName:"webgpu",kernelFunc:oc};var dt=class{constructor(t){this.variableNames=["dy"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32, avgMultiplier : f32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="avgPool2DBackprop"}getUserCode(){return`
      ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d = coords[3];

        let dyRCCorner = vec2<i32>(coords.yz) - uniforms.pads;
        let dyRCorner = dyRCCorner.x;
        let dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR = wR + uniforms.dilations[0]) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims[1]; wC = wC + uniforms.dilations[1]) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }
            let idyC = i32(dyC);

            let dyValue = getDy(batch, idyR, idyC, d);

            dotProd = dotProd + dyValue * uniforms.avgMultiplier;
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}},lt=class{constructor(t){this.variableNames=["dy"],this.uniforms=`strides : vec3<i32>, pads : vec3<i32>, filterDims : vec3<i32>,
       outDepth : i32, outHeight : i32, outWidth : i32, avgMultiplier : f32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="avgPool3DBackprop"}getUserCode(){return`
      ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let ch = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyDCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wD = 0; wD < uniforms.filterDims[0]; wD++) {
          let dyD = f32(dyDCorner + wD) / f32(uniforms.strides[0]);

          if (dyD < 0.0 || dyD >= f32(uniforms.outDepth) || fract(dyD) > 0.0) {
            continue;
          }
          let idyD = i32(dyD);

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let dyValue = getDy(batch, idyD, idyR, idyC, ch);
              dotProd += dyValue * uniforms.avgMultiplier;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}};function rc(o){let{inputs:t,backend:e,attrs:i}=o,{dy:r,input:s}=t,a=s,{filterSize:n,strides:u,pad:p,dimRoundingMode:d}=i,c=S.computePool3DInfo(a.shape,n,u,1,p,d),l=new lt(c),h=1/(c.filterDepth*c.filterHeight*c.filterWidth),m=[{type:"int32",data:[c.strideDepth,c.strideHeight,c.strideWidth]},{type:"int32",data:[c.effectiveFilterDepth-1-c.padInfo.front,c.effectiveFilterHeight-1-c.padInfo.top,c.effectiveFilterWidth-1-c.padInfo.left]},{type:"int32",data:[c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth]},{type:"int32",data:[c.outDepth]},{type:"int32",data:[c.outHeight]},{type:"int32",data:[c.outWidth]},{type:"float32",data:[h]}];return e.runWebGPUProgram(l,[r],a.dtype,m)}var ln={kernelName:ar,backendName:"webgpu",kernelFunc:rc};function ic(o){let{inputs:t,backend:e,attrs:i}=o,{dy:r,input:s}=t,a=s;Ee([r,s],"avgPoolGrad");let{filterSize:n,strides:u,pad:p}=i,d=S.computePool2DInfo(a.shape,n,u,1,p),c=new dt(d),l=1/(d.filterHeight*d.filterWidth),h=[{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.effectiveFilterHeight-1-d.padInfo.top,d.effectiveFilterWidth-1-d.padInfo.left]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[d.effectiveFilterHeight,d.effectiveFilterWidth]},{type:"int32",data:[d.outHeight]},{type:"int32",data:[d.outWidth]},{type:"float32",data:[l]}];return e.runWebGPUProgram(c,[r],a.dtype,h)}var cn={kernelName:ir,backendName:"webgpu",kernelFunc:ic};function sc(o){let{inputs:t,backend:e,attrs:i}=o,{a:r,b:s}=t,{transposeA:a,transposeB:n}=i;return Ce({a:r,b:s,transposeA:a,transposeB:n,backend:e})}var hn={kernelName:nr,backendName:"webgpu",kernelFunc:sc};var ct=class{constructor(t,e){this.variableNames=["source"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.rank=e.length,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.start=t,this.uniforms=`start : ${B(t.length)}, `,this.shaderKey="slice"}getUserCode(){let t=B(this.rank),e=ac(this.rank),i;return this.start.length===1?i=this.outputShape.map((s,a)=>"sourceLoc = uniforms.start + coords;"):i=this.outputShape.map((s,a)=>`sourceLoc.${No[a]} = uniforms.start.${oe(a)} + coords.${No[a]};`),`
      ${C("index")} {
        if (index < uniforms.size) {
          var sourceLoc : ${t};
          let coords = getCoordsFromIndex(index);
          ${i.join(`
`)}
          setOutputAtIndex(index, getSource(${e}));
        }
      }
    `}},No=["x","y","z","w","u","v"];function ac(o){if(o===1)return"sourceLoc";if(o<=6)return No.slice(0,o).map(t=>`sourceLoc.${t}`).join(",");throw Error(`Slicing for rank ${o} is not yet supported`)}function ie(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{begin:s,size:a}=i,[n,u]=be.parseSliceParams(r,s,a);if(be.assertParamsValid(r,n,u),e.shouldExecuteOnCPU([r])||r.dtype==="string"){let c=e.tensorMap.get(r.dataId),l=Ea(c.values,n,u,r.shape,r.dtype);return e.makeTensorInfo(u,r.dtype,l)}if(g.sizeFromShape(u)===0)return e.makeTensorInfo(u,r.dtype,[]);let p=new ct(n,u),d=[{type:"int32",data:n}];return e.runWebGPUProgram(p,[r],r.dtype,d)}var mn={kernelName:ps,backendName:"webgpu",kernelFunc:ie};var nc=o=>{let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{blockShape:s,crops:a}=i;g.assert(r.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGPU backend not implemented yet");let n=s.reduce((I,k)=>I*k),u=S.getReshaped(r.shape,s,n),p=S.getPermuted(u.length,s.length),d=S.getReshapedPermuted(r.shape,s,n),c=S.getSliceBeginCoords(a,s.length),l=S.getSliceSize(d,a,s.length),h=[],m=R({inputs:{x:r},backend:e,attrs:{shape:u}}),f=q({inputs:{x:m},backend:e,attrs:{perm:p}}),x=R({inputs:{x:f},backend:e,attrs:{shape:d}}),v=ie({inputs:{x},backend:e,attrs:{begin:c,size:l}});return h.push(m),h.push(f),h.push(x),h.forEach(I=>e.disposeData(I.dataId)),v},fn={kernelName:ur,backendName:"webgpu",kernelFunc:nc};var uc=`
  fn bincount_write(index: i32, value: f32) {
    ${j("&result[index]","value","float32")}
  }
`,pc=`
  fn bincount_write(index: i32, value: f32) {
    atomicStore(&result[index], bitcast<i32>(value));
  }
`,Re=class{constructor(t,e,i=!1){this.outputShape=[],this.variableNames=["x"],this.uniforms="binCountSize : i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.hasWeights=!0,this.binaryOutput=!1,this.outputShape=t,this.rank=t.length,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.binaryOutput=i,i&&(this.atomic=!1),this.hasWeights=e,this.hasWeights&&this.variableNames.push("w"),this.shaderKey=`bincount_${this.hasWeights}_${this.binaryOutput}_${this.rank}`}getUserCode(){return`
    ${this.binaryOutput?pc:uc}
  ${C("index")} {
    ${this.rank===1?`if (index < uniforms.xShape) {
      let indexVal = i32(getX(index));
      if (indexVal < uniforms.binCountSize) {
        let value = ${this.binaryOutput?1:this.hasWeights?"getW(index)":"1."};
        bincount_write(indexVal, value);
      }
    }`:`let coord = getCoordsFromIndex(index);
    if (coordsInBounds2D(coord, uniforms.xShape)) {
      let indexVal = i32(getX(coord[0], coord[1]));
      if (indexVal < uniforms.binCountSize) {
        let value = ${this.binaryOutput?1:this.hasWeights?"getW(coord[0], coord[1])":"1."};
        bincount_write(coord.x * uniforms.binCountSize + indexVal, value);
      }
    }`}
  }
  `}};function dc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,weights:s}=t,{size:a}=i,n=g.sizeFromShape(r.shape),p=g.sizeFromShape(s.shape)>0,d=[a],c=s.dtype,l=U({backend:e,attrs:{shape:d,value:0,dtype:c}}),h=new Re([n],p),m=[{type:"int32",data:[a]}],f=p?[r,s]:[r];return e.runWebGPUProgram(h,f,c,m,l)}var gn={kernelName:pr,backendName:"webgpu",kernelFunc:dc};var ht=class{constructor(t){this.outputShape=[],this.variableNames=["s0","s1"],this.uniforms="s0Size : i32, s1Size : i32, ",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="broadcastArgs"}getUserCode(){return`
  ${C("index")} {
    if (index < uniforms.size) {
      var s0 = 1.0;
      var s1 = 1.0;
      let indexS0 = index - uniforms.size + uniforms.s0Size;
      let indexS1 = index - uniforms.size + uniforms.s1Size;
      if (indexS0 >= 0) {
        s0 = getS0(indexS0);
      }
      if (indexS1 >= 0) {
        s1 = getS1(indexS1);
      }

      if (s0 == 1.0) {
        setOutputAtIndex(index, s1);
      } else if (s1 == 1.0) {
        setOutputAtIndex(index, s0);
      } else if (s0 != s1) {
        setOutputAtIndex(index, uniforms.NAN);
      } else {
        setOutputAtIndex(index, s0);
      }
    }
  }
  `}};function lc(o){let{inputs:t,backend:e}=o,{s0:i,s1:r}=t;if(e.shouldExecuteOnCPU([i,r])){let d=e.tensorMap.get(i.dataId),c=e.tensorMap.get(r.dataId),l=d.values,h=c.values,m=S.assertAndGetBroadcastShape(Array.from(l),Array.from(h));return e.makeTensorInfo([m.length],"int32",Int32Array.from(m))}let s=g.sizeFromShape(i.shape),a=g.sizeFromShape(r.shape),n=Math.max(s,a),u=new ht(n),p=[{type:"int32",data:[s]},{type:"int32",data:[a]}];return e.runWebGPUProgram(u,[i,r],"int32",p)}var xn={kernelName:dr,backendName:"webgpu",kernelFunc:lc};var zo=L({opType:$.NOT_EQUAL,dtype:"bool",cpuKernelImpl:Aa}),Cn={kernelName:Ti,backendName:"webgpu",kernelFunc:zo};function ce(o){let{inputs:t,backend:e}=o,{input:i}=t,r=e.tensorMap.get(i.dataId);return W({inputs:{x:r.complexTensorInfos.real},backend:e})}var yn={kernelName:Ki,backendName:"webgpu",kernelFunc:ce};function Sn(o,t){let e=new Z(o.shape,b.TO_INT),i=t.runWebGPUProgram(e,[o],"int32");return{dataId:i.dataId,shape:i.shape,dtype:i.dtype}}function Ao(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{dtype:s}=i;if(s==="complex64"){if(r.dtype==="complex64")return W({inputs:{x:r},backend:e});let a=Xs(r.shape),n=Ao({inputs:{x:r},backend:e,attrs:{dtype:"float32"}}),u=te({inputs:{real:n,imag:a},backend:e});return a.dispose(),e.disposeData(n.dataId),u}if(r.dtype==="complex64"){let a=ce({inputs:{input:r},backend:e}),n=Ao({inputs:{x:a},backend:e,attrs:{dtype:s}});return e.disposeData(a.dataId),n}if(!g.hasEncodingLoss(r.dtype,s)){let a=W({inputs:{x:r},backend:e});return{dataId:a.dataId,shape:a.shape,dtype:s}}if(e.shouldExecuteOnCPU([r])){let a=e.tensorMap.get(r.dataId).values,[n,u,p]=ca(a,r.shape,r.dtype,s);return e.makeTensorInfo(n,u,p)}if(s==="int32")return Sn(r,e);if(s==="bool"){let a=e.makeTensorInfo([],"bool",g.getTypedArrayFromDType("bool",1)),u=zo({inputs:{a:r,b:a},backend:e});return e.disposeData(a.dataId),u}throw new Error(`Error in Cast: failed to cast ${r.dtype} to ${s}`)}var wn={kernelName:lr,backendName:"webgpu",kernelFunc:Ao};var cc=N({opType:b.CEIL,cpuKernelImpl:ha}),bn={kernelName:cr,backendName:"webgpu",kernelFunc:cc};var mt=class{constructor(t){this.variableNames=["A"],this.uniforms="minVal : f32, maxVal : f32,",this.workPerThread=4,this.workgroupSize=[64,1,1],this.outputComponent=4,this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.shaderKey="clipVec4"}getUserCode(){return`
      ${C("index")} {
        if(index < uniforms.size) {
          let value = getAByOutputIndex(index);
          var clampedValue = clamp(
              value, vec4<f32>(uniforms.minVal), vec4<f32>(uniforms.maxVal));
          clampedValue = select(clampedValue, value, isnanVec4(value));
          setOutputAtIndex(index, clampedValue);
        }
      }
    `}};var ft=class{constructor(t){this.variableNames=["A"],this.uniforms="minVal : f32, maxVal : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="clip"}getUserCode(){return`
      ${C("index")} {
        if(index < uniforms.size) {
          let value = getAByOutputIndex(index);
          if (isnan(value)) {
            setOutputAtIndex(index, value);
            return;
          }
          setOutputAtIndex(index, clamp(value, uniforms.minVal, uniforms.maxVal));
        }
      }
    `}};function hc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{clipValueMin:s,clipValueMax:a}=i,n,u=[{type:"float32",data:[s]},{type:"float32",data:[a]}];return g.sizeFromShape(r.shape)%4===0?n=new mt(r.shape):n=new ft(r.shape),e.runWebGPUProgram(n,[r],r.dtype,u)}var vn={kernelName:hr,backendName:"webgpu",kernelFunc:hc};var gt=class{constructor(t){this.outputShape=[],this.variableNames=["real","imag"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="complexAbs"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.size) {
        let re = abs(getRealByOutputIndex(index));
        let im = abs(getImagByOutputIndex(index));
        let mx = max(re, im);

        // The length function in wgsl may be not underflow-safe on some GPUs.
        // So the safe solution is to ensure underflow-safety in all cases.
        setOutputAtIndex(index, select(mx * length(vec2<f32>(1, min(re, im)/mx)), 0.0, mx == 0.0));
      }
    }
  `}};function In(o,t){return{dataId:t.dataId,dtype:t.dtype,shape:o.shape}}function mc(o){let{inputs:t,backend:e}=o,{x:i}=t,r=e.tensorMap.get(i.dataId),s=new gt(i.shape),a=[In(i,r.complexTensorInfos.real),In(i,r.complexTensorInfos.imag)];return e.runWebGPUProgram(s,a,a[0].dtype)}var kn={kernelName:fr,backendName:"webgpu",kernelFunc:mc};var xt=class{constructor(t){this.uniforms="",this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=S.computeOutShape(t,1),this.variableNames=t.map((e,i)=>`T${i}`),this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.offsetLength=t.length-1;for(let e=0;e<this.offsetLength;e++)this.uniforms+=`offset${e} : i32,`;this.shaderKey="concat"}getUserCode(){let t=[];if(this.offsetLength>0){t.push("if (yC < uniforms.offset0){ setOutputAtCoords(coords.x, coords.y, getT0(yR, yC)); }");for(let s=1;s<this.offsetLength;s++)t.push(`else if (yC < uniforms.offset${[s]}){ setOutputAtCoords(coords.x, coords.y, getT${s}(yR, yC - uniforms.offset${s-1})); }`);let i=this.offsetLength,r=this.offsetLength-1;t.push(`else { setOutputAtCoords(coords.x, coords.y, getT${i}(yR, yC - uniforms.offset${r})); }`)}else t.push("setOutputAtCoords(coords.x, coords.y, getT0(yR, yC));");return`
      ${C("index")} {
        for(var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if(flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            let yR = coords.x;
            let yC = coords.y;

            ${t.join(`
        `)}
          }
        }
      }
    `}};function ye(o){let{inputs:t,backend:e}=o,{input:i}=t,r=e.tensorMap.get(i.dataId);return W({inputs:{x:r.complexTensorInfos.imag},backend:e})}var Rn={kernelName:si,backendName:"webgpu",kernelFunc:ye};function De(o,t,e){let i=o[0].dtype;if(i==="complex64"){let m=o.map(k=>ce({inputs:{input:k},backend:e})),f=o.map(k=>ye({inputs:{input:k},backend:e})),x=De(m,t,e),v=De(f,t,e),I=te({inputs:{real:x,imag:v},backend:e});return m.forEach(k=>e.disposeData(k.dataId)),f.forEach(k=>e.disposeData(k.dataId)),e.disposeData(x.dataId),e.disposeData(v.dataId),I}let r=e.shouldExecuteOnCPU(o);if(i==="string"&&(r=!0),r){let m=o.map(P=>{let A=[-1,g.sizeFromShape(P.shape.slice(t))];return R({inputs:{x:P},backend:e,attrs:{shape:A}})}),f=m.map(P=>({vals:e.readSync(P.dataId),shape:P.shape})),x=S.computeOutShape(m.map(P=>P.shape),1),v=m[0].shape[0]===1,I=ma(f,x,i,v),k=S.computeOutShape(o.map(P=>P.shape),t),D=e.makeTensorInfo(k,i,I);return m.forEach(P=>e.disposeData(P.dataId)),D}let s=e.device.limits.maxStorageBuffersPerShaderStage-1;if(o.length>s){let m=[];for(let x=0;x<o.length;x+=s){let v=o.slice(x,x+s);m.push(De(v,t,e))}let f=De(m,t,e);for(let x of m)e.disposeData(x.dataId);return f}let{tensors2D:a,outShape:n}=fc(o,t,e),u=a.map(m=>m.shape),p=new xt(u),d=[],c=new Array(u.length-1);if(c.length>0){c[0]=u[0][1],d.push({type:"int32",data:[c[0]]});for(let m=1;m<c.length;m++)c[m]=c[m-1]+u[m][1],d.push({type:"int32",data:[c[m]]})}let l=e.runWebGPUProgram(p,a,a[0].dtype,d);a.forEach(m=>e.disposeData(m.dataId));let h=R({inputs:{x:l},backend:e,attrs:{shape:n}});return e.disposeData(l.dataId),h}function fc(o,t,e){let i=S.computeOutShape(o.map(s=>s.shape),t);return{tensors2D:o.map(s=>R({inputs:{x:s},backend:e,attrs:{shape:[g.sizeFromShape(s.shape.slice(0,t)),g.sizeFromShape(s.shape.slice(t))]}})),outShape:i}}function Fo(o){let{inputs:t,backend:e,attrs:i}=o,{axis:r}=i,s=g.parseAxisParam(r,t[0].shape)[0],a=t.map(p=>p.shape);S.assertParamsConsistent(a,s);let n=S.computeOutShape(t.map(p=>p.shape),s);if(g.sizeFromShape(n)===0)return e.makeTensorInfo(n,t[0].dtype,[]);let u=t.filter(p=>g.sizeFromShape(p.shape)>0);return u.length===1?W({inputs:{x:u[0]},backend:e}):De(u,s,e)}var Dn={kernelName:gr,backendName:"webgpu",kernelFunc:Fo};function gc(o,t,e,i,r=!1,s=null,a=!1,n=4,u=4,p=4){let d=T=>{switch(T){case 1:return"resData = f32(x[xIndex]);";case 3:return"resData = vec3<f32>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);";case 4:return"resData = vec4<f32>(x[xIndex / 4]);";default:throw new Error(`innerElementSize ${T} is not supported.`)}},c=T=>{switch(T){case 1:return"return f32(W[row * uniforms.wShape[3] + col]);";case 4:return"return vec4<f32>(W[(row * uniforms.wShape[3] + col) / 4]);";default:throw new Error(`innerElementSize ${T} is not supported.`)}},l=o?`
      let coord = vec4<i32>(batch, xRow, xCol, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, xRow, xCol);
      `,h=o?`
      let coords = vec4<i32>(
        batch,
        row / outWidth,
        row % outWidth,
        col);
      `:`
      let coords = vec4<i32>(
        batch,
        row,
        col / outWidth,
        col % outWidth);
      `,m=o?"uniforms.xShape[1]":"uniforms.xShape[2]",f=o?"uniforms.xShape[2]":"uniforms.xShape[3]",x=o?"row":"col",v=o?"col":"row",I=`
      let inChannels = uniforms.wShape[2];
      let outWidth = ${o?"uniforms.outShape[2]":"uniforms.outShape[3]"};
      let outRow = ${x} / outWidth;
      let outCol = ${x} % outWidth;

      let WRow = ${v} / (uniforms.filterDims[1] * inChannels);
      let WCol = ${v} / inChannels % uniforms.filterDims[1];
      let xRow = outRow * uniforms.strides[0] + uniforms.dilations[0] * WRow - uniforms.pads[0];
      let xCol = outCol * uniforms.strides[1] + uniforms.dilations[1] * WCol - uniforms.pads[1];
      let xCh = ${v} % inChannels;
      var resData = ${F(n)}(0.0);
      // The bounds checking is always needed since we use it to pad zero for
      // the 'same' padding type.
      if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${f}) {
        ${l}
        let xIndex = getIndexFromCoords4D(coord, uniforms.xShape);
        ${d(n)}
      }
      return resData;`,k=o?t&&i?`
      ${I}`:`
      if (row < uniforms.dimAOuter && col < uniforms.dimInner) {
        ${I}
      }
      return ${F(n)}(0.0);`:i&&e?`
      ${I}`:`
      if (row < uniforms.dimInner && col < uniforms.dimBOuter) {
        ${I}
      }
      return ${F(n)}(0.0);`,D=`${c(u)}`,P=F(p),z=o?F(n):F(u),A=o?F(u):F(n);return`
      ${G(s,a,p===4,4)}
      fn mm_readA(batch: i32, row : i32, col : i32) -> ${z} {
        ${o?k:D}
      }

      fn mm_readB(batch: i32, row : i32, col : i32) -> ${A} {
        ${o?D:k}
      }

      fn mm_write(batch: i32, row : i32, col : i32, valueIn : ${P}) {
        if (row < uniforms.dimAOuter && col < uniforms.dimBOuter)
        {
        var value = valueIn;
        let outWidth = ${o?"uniforms.outShape[2]":"uniforms.outShape[3]"};
        ${h}
        ${Q(r,s)}
        setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }`}var Ct=class{constructor(t,e,i,r,s=!1,a=null,n=!1,u=!1){this.variableNames=["x","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, dilations : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=t.outShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.isVec4=((t.inChannels%4===0||t.inChannels%3===0)&&this.isChannelsLast||t.outWidth%4===0&&!this.isChannelsLast)&&t.outChannels%4===0,this.dispatchLayout=this.isChannelsLast?{x:[3],y:[1,2],z:[0]}:{x:[2,3],y:[1],z:[0]},this.workgroupSize=Te(this.dispatchLayout,this.outputShape,this.isVec4),this.elementsPerThread=_e(this.dispatchLayout,this.outputShape,this.isVec4),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread),this.isVec4?(this.outputComponent=4,this.isChannelsLast&&t.inChannels%4!==0?(this.innerElementSize=3,this.variableComponents=[1,4]):(this.innerElementSize=4,this.variableComponents=[4,4]),s&&(this.variableNames.push("bias"),this.variableComponents.push(4)),n&&(this.variableNames.push("preluActivationWeights"),this.variableComponents.push(4))):(this.innerElementSize=this.elementsPerThread[0],s&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights")),this.sequentialAccessByThreads=u,this.addBias=s,this.activation=a,this.hasPreluActivationWeights=n,this.tileAOuter=this.workgroupSize[1]*this.elementsPerThread[1],this.tileBOuter=this.workgroupSize[0]*this.elementsPerThread[0],this.tileInner=Math.max(this.workgroupSize[0]*this.innerElementSize,this.workgroupSize[1]),this.fitAOuter=e%this.tileAOuter===0,this.fitBOuter=i%this.tileBOuter===0,this.fitInner=r%this.tileInner===0,this.shaderKey=`conv2DMM_${this.elementsPerThread}_${this.activation}}_${this.fitAOuter}_${this.fitBOuter}_${this.fitInner}_${this.isVec4}_${this.innerElementSize}_${this.isChannelsLast}_${this.sequentialAccessByThreads}`}getUserCode(){let t=this.isVec4?ge(this.elementsPerThread,this.workgroupSize,!this.isChannelsLast,this.tileInner):xe(this.elementsPerThread,this.workgroupSize,!this.isChannelsLast,this.tileInner,!1,null,this.sequentialAccessByThreads),e=this.isVec4?[this.innerElementSize,4,4]:[1,1,1];return`
    ${gc(this.isChannelsLast,this.fitAOuter,this.fitBOuter,this.fitInner,this.addBias,this.activation,this.hasPreluActivationWeights,e[0],e[1],e[2])}
    ${t}
  `}};var yt=class{constructor(t,e=!1,i=null,r=!1){this.variableNames=["x","W"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>,",this.workgroupSize=[4,4,8],this.outputShape=t.outShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.dispatchLayout=this.isChannelsLast?{x:[2],y:[1],z:[0,3]}:{x:[3],y:[2],z:[0,1]},this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.addBias=e,this.activation=i,this.hasPreluActivationWeights=r,e&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.shaderKey=`conv2dnaive_${this.activation}_${this.isChannelsLast}`}getUserCode(){return`
       ${G(this.activation,this.hasPreluActivationWeights,!1,4)}
       fn readInp(batch : i32, row : i32, col : i32, chan : i32) -> f32{
         let coords = vec4<i32>(batch, row, col, chan);
         if (coordsInBounds4D(coords, uniforms.xShape)) {
           return  getX(batch, row, col, chan);
         } else {
          return 0.0;
         }
       }
       fn readFilt(row : i32, col : i32, xChannel : i32, outChannel : i32) -> f32{
         let coords = vec4<i32>(row, col, xChannel, outChannel);
         if(coordsInBounds4D(coords, uniforms.wShape)) {
           return getW(row, col, xChannel, outChannel);
          } else {
            return 0.0;
          }
       }
       fn writeResult(batch : i32, row : i32, col : i32, chan : i32, valueIn : f32) {
         let coords = ${this.isChannelsLast?"vec4<i32>(batch, row, col, chan);":"vec4<i32>(batch, chan, row, col);"}
         if (coordsInBounds4D(coords, uniforms.outShape)) {
           var value = valueIn;
           ${Q(this.addBias,this.activation)}
           setOutputAtCoords(coords.x, coords.y, coords.z, coords.w, value);
         }
       }
       ${C("index")} {
         let coords = getOutputCoords();
         let batch = coords[0];
         let outChannel = ${this.isChannelsLast?"coords[3];":"coords[1];"}
         let outRow = ${this.isChannelsLast?"coords[1];":"coords[2];"}
         let outCol = ${this.isChannelsLast?"coords[2];":"coords[3];"}
         var acc : f32 = 0.0;
         for (var row = 0; row < uniforms.filterDims[0]; row = row + 1) {
           for (var col = 0; col < uniforms.filterDims[1]; col = col + 1) {
             let xRow = outRow * uniforms.strides[0] + uniforms.dilations[0] * row - uniforms.pads[0];
             let xCol = outCol * uniforms.strides[1] + uniforms.dilations[1] * col - uniforms.pads[1];
             for (var xChannel = 0; xChannel < ${this.isChannelsLast?"uniforms.xShape[3];":"uniforms.xShape[1];"} xChannel = xChannel + 1) {
               ${this.isChannelsLast?"let v = readInp(batch, xRow, xCol, xChannel);":"let v = readInp(batch, xChannel, xRow, xCol);"}
               let f = readFilt(row, col, xChannel, outChannel);
               acc = acc + v * f;
             }
           }
         }
         writeResult(batch, outRow, outCol, outChannel, acc);
       }
     `}};var St=class{constructor(t,e){this.variableNames=["x"],this.uniforms=`pads : vec2<i32>, strides : vec2<i32>, dilations : vec2<i32>, outWidth : i32, itemsPerBlockRow : i32,
       inChannels : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=e,this.shaderKey=`im2col_${this.isChannelsLast}`}getUserCode(){let t=this.isChannelsLast?1:2,e=this.isChannelsLast?2:3,i=this.isChannelsLast?"coords[1]":"coords[2]",r=this.isChannelsLast?"coords[2]":"coords[1]",s=this.isChannelsLast?"getX(batch, xRow, xCol, ch)":"getX(batch, ch, xRow, xCol)";return`
    ${C("index")} {
      let coords = getCoordsFromIndex(index);
      if(index < uniforms.size) {
        let batch = coords[0];
        let row = ${i};
        let col = ${r};
        let offsetY = (row / uniforms.outWidth) * uniforms.strides[0] - uniforms.pads[0];
        let xRow = offsetY + uniforms.dilations[0] * (col / uniforms.itemsPerBlockRow);
        var value = 0.0;
        if(xRow < uniforms.xShape[${t}] && xRow >= 0) {
          let offsetX = (row % uniforms.outWidth) * uniforms.strides[1] -
              uniforms.pads[1];
          let xCol = offsetX + uniforms.dilations[1] * ((col %
              uniforms.itemsPerBlockRow) / uniforms.inChannels);
          let ch = col % uniforms.inChannels;
          if(xCol < uniforms.xShape[${e}] && xCol >= 0) {
            value = ${s};
          }
        }
        setOutputAtIndex(index, value);
      }
    }
   `}};function wt(o,t){let e=o.length;return e>=3?t?[...o.slice(0,-3),o[e-3]*o[e-2],o[e-1]]:[...o.slice(0,-3),o[e-3],o[e-2]*o[e-1]]:!t&&e===1&&o[0]>1?[o[0],1]:null}function xc({x:o,filter:t,convInfo:e,backend:i,bias:r=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:n=null}){let u=e.dataFormat==="channelsLast",p=!u,d=!1,c=u&&e.filterHeight===e.inHeight&&e.filterWidth===e.inWidth&&e.padInfo.type==="VALID",l=[],h,m;if(c){let v=e.inHeight*e.inWidth*e.inChannels;h=R({inputs:{x:o},backend:i,attrs:{shape:[1,e.batchSize,v]}}),m=R({inputs:{x:t},backend:i,attrs:{shape:[1,v,e.outChannels]}})}else h=R({inputs:{x:o},backend:i,attrs:{shape:u?[e.batchSize,e.inHeight*e.inWidth,e.inChannels]:[e.batchSize,e.inChannels,e.inHeight*e.inWidth]}}),m=R({inputs:{x:t},backend:i,attrs:{shape:[1,e.inChannels,e.outChannels]}});if(l.push(h),l.push(m),s!=null){let v=wt(s.shape,u);v!=null&&(s=R({inputs:{x:s},backend:i,attrs:{shape:v}}),l.push(s))}if(r!=null){let v=wt(r.shape,u);v!=null&&(r=R({inputs:{x:r},backend:i,attrs:{shape:v}}),l.push(r))}let f=Ce({a:u?h:m,b:u?m:h,transposeA:p,transposeB:d,backend:i,bias:r,activation:n,preluActivationWeights:s,leakyreluAlpha:a}),x=R({inputs:{x:f},backend:i,attrs:{shape:e.outShape}});l.push(f);for(let v of l)i.disposeData(v.dataId);return x}function Cc({x:o,filter:t,convInfo:e,backend:i,bias:r=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:n=null}){let{filterWidth:u,filterHeight:p,inChannels:d,strideWidth:c,strideHeight:l,padInfo:h,outWidth:m,outHeight:f,dilationWidth:x,dilationHeight:v,dataFormat:I}=e,k=I==="channelsLast",D=u*p*d,P=f*m,z=k?[e.batchSize,P,D]:[e.batchSize,D,P],A=new St(z,k),_=[{type:"int32",data:[h.top,h.left]},{type:"int32",data:[l,c]},{type:"int32",data:[v,x]},{type:"int32",data:[m]},{type:"int32",data:[d*u]},{type:"int32",data:[d]}],T=i.runWebGPUProgram(A,[o],o.dtype,_),M=[];M.push(T);let O=R({inputs:{x:t},backend:i,attrs:{shape:[1,D,-1]}});if(M.push(O),s!=null){let X=wt(s.shape,k);X!=null&&(s=R({inputs:{x:s},backend:i,attrs:{shape:X}}),M.push(s))}if(r!=null){let X=wt(r.shape,k);X!=null&&(r=R({inputs:{x:r},backend:i,attrs:{shape:X}}),M.push(r))}let V=Ce({a:k?T:O,b:k?O:T,transposeA:!k,transposeB:!1,backend:i,bias:r,activation:n,preluActivationWeights:s,leakyreluAlpha:a}),H=R({inputs:{x:V},backend:i,attrs:{shape:e.outShape}});M.push(V);for(let X of M)i.disposeData(X.dataId);return H}function bt({x:o,filter:t,convInfo:e,backend:i,bias:r=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:n=null}){let u=r!=null,p=s!=null,d=e.dataFormat==="channelsLast",c=d&&e.filterHeight===e.inHeight&&e.filterWidth===e.inWidth&&e.padInfo.type==="VALID",l=E().getBool("WEBGPU_USE_NAIVE_CONV2D_DEBUG");if(!l&&(c||e.filterHeight===1&&e.filterWidth===1&&e.dilationHeight===1&&e.dilationWidth===1&&e.strideHeight===1&&e.strideWidth===1&&(e.padInfo.type==="SAME"||e.padInfo.type==="VALID")))return xc({x:o,filter:t,convInfo:e,backend:i,bias:r,activation:n,preluActivationWeights:s,leakyreluAlpha:a});let h=E().getNumber("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL"),m=h>-1?h:i.thresholdToIncreaseWorkgroups,f=e.batchSize*Math.ceil(e.outHeight*e.outWidth/32)*Math.ceil(e.outChannels/32);if(E().getBool("WEBGPU_CONV_SEPARATE_IM2COL_SHADER")||f<=m)return Cc({x:o,filter:t,convInfo:e,backend:i,bias:r,preluActivationWeights:s,leakyreluAlpha:a,activation:n});let x,v=[e.padInfo.top,e.padInfo.left],I=[{type:"int32",data:[e.filterHeight,e.filterWidth]},{type:"int32",data:[...v]},{type:"int32",data:[e.strideHeight,e.strideWidth]},{type:"int32",data:[e.dilationHeight,e.dilationWidth]}];if(l)x=new yt(e,u,n,p);else{let z=d?e.outHeight*e.outWidth:e.outChannels,A=d?e.outChannels:e.outHeight*e.outWidth,_=e.filterHeight*e.filterWidth*e.inChannels;I.push({type:"int32",data:[z]},{type:"int32",data:[A]},{type:"int32",data:[_]});let T=i.adapterInfo.isIntel();x=new Ct(e,z,A,_,u,n,p,T)}let k=[],D=[o,t];u&&(!d&&r.shape.length===1&&(r=R({inputs:{x:r},backend:i,attrs:{shape:[r.shape[0],1,1]}}),k.push(r)),D.push(r)),p&&(!d&&s.shape.length===1&&(s=R({inputs:{x:s},backend:i,attrs:{shape:[s.shape[0],1,1]}}),k.push(s)),D.push(s)),n==="leakyrelu"&&(I.push({type:"float32",data:[a]}),x.uniforms+=" alpha : f32,");let P=i.runWebGPUProgram(x,D,o.dtype,I);for(let z of k)i.disposeData(z.dataId);return P}function yc(o){let{inputs:t,attrs:e,backend:i}=o,{x:r,filter:s}=t,{strides:a,pad:n,dataFormat:u,dilations:p,dimRoundingMode:d}=e,c=S.convertConv2DDataFormat(u),l=S.computeConv2DInfo(r.shape,s.shape,a,p,n,d,!1,c);return bt({x:r,filter:s,convInfo:l,backend:i})}var Pn={kernelName:xr,backendName:"webgpu",kernelFunc:yc};var vt=class{constructor(t){this.variableNames=["dy","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, outBackprop : vec4<i32>,",this.workgroupSize=[64,1,1],this.size=!1,this.isVec4=!1,this.workPerThread=1,this.outputShape=t.inShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.isVec4=this.isChannelsLast&&t.outChannels%4===0&&t.inChannels%4===0,this.isVec4?(this.workPerThread=2,this.outputComponent=4,this.workgroupSize=[4,4,4],this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[4,this.workPerThread,1])):(this.size=!0,this.workPerThread=1,this.workgroupSize=[64,1,1],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize)),this.shaderKey=`conv2DDerInput_${this.isChannelsLast}_${this.isVec4}_${this.workPerThread}`}getUserCode(){let t=this.isChannelsLast?1:2,e=this.isChannelsLast?2:3,i=this.isChannelsLast?3:1,r=`
    ${C()} {
      let batch = i32(globalId.z) / uniforms.outShape[1];
      let r = i32(globalId.z) % uniforms.outShape[1];
      let c = i32(globalId.y) * ${this.workPerThread};
      let d1 = i32(globalId.x) * 4;

      let dyCorner = vec2<i32>(r, c) - uniforms.pads;

      // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
      // ? = to be determined. : = across all values in that axis.
      var dotProd: array<vec4<f32>, ${this.workPerThread}>;
      for (var i = 0; i < ${this.workPerThread}; i++) {
        dotProd[i] = vec4<f32>(0.0);
      }
      for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + 1) {
        let dyR = f32(dyCorner.x + wR) / f32(uniforms.strides.x);
        let wRPerm = uniforms.filterDims.x - 1 - wR;
        if (dyR < 0.0 || dyR >= f32(uniforms.outBackprop[1]) ||
            fract(dyR) > 0.0) {
          continue;
        }
        let idyR = i32(dyR);

        for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + 1) {
          let dyC = f32(dyCorner.y + wC) / f32(uniforms.strides.y);
          let dyC2 = f32(dyCorner.y + 1 + wC) / f32(uniforms.strides.y);
          let wCPerm = uniforms.filterDims.y - 1 - wC;
          var bDyCVal = true;
          var bDyCVal2 = true;
          if (dyC < 0.0 || dyC >= f32(uniforms.outBackprop[2]) ||
              fract(dyC) > 0.0) {
            bDyCVal = false;
          }
          if (dyC2 < 0.0 || dyC2 >= f32(uniforms.outBackprop[2]) ||
              fract(dyC2) > 0.0) {
            bDyCVal2 = false;
          }

          let idyC = i32(dyC);
          let idyC2 = i32(dyC2);
          if (bDyCVal && bDyCVal2) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[0] = dotProd[0] + tmpval;
              xValue = getDy(batch, idyR, idyC2, d2);
              dotProd[1] = dotProd[1] + vec4<f32>(dot(xValue, wValue0),
                                                  dot(xValue, wValue1),
                                                  dot(xValue, wValue2),
                                                  dot(xValue, wValue3));
            }
          } else if (bDyCVal) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[0] = dotProd[0] + tmpval;
            }
          } else if (bDyCVal2) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC2, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[1] = dotProd[1] + tmpval;
            }
          }
        }
      }

      for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
        let coords = vec4<i32>(batch, r, c + i, d1);
        if (coordsInBounds4D(coords, uniforms.outShape)) {
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], dotProd[i]);
        }
      }
    }
    `;return this.isVec4?`
    ${r}
    `:`
    ${C("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d1 = coords[${i}];

        let dyCorner = vec2<i32>(coords[${t}], coords[${e}]) - uniforms.pads;
        let dyRCorner = dyCorner.x;
        let dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + 1) {
          let dyR = (f32(dyRCorner) + f32(wR)) / f32(uniforms.strides.x);
          let wRPerm = uniforms.filterDims.x - 1 - wR;
          if (dyR < 0.0 || dyR >= f32(uniforms.outBackprop[1]) || fract(dyR) > 0.0 ||
              wRPerm < 0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + 1) {
            let dyC = (f32(dyCCorner) + f32(wC)) / f32(uniforms.strides.y);
            let wCPerm = uniforms.filterDims.y - 1 - wC;
            if (dyC < 0.0 || dyC >= f32(uniforms.outBackprop[2]) ||
                fract(dyC) > 0.0 || wCPerm < 0) {
              continue;
            }
            let idyC = i32(dyC);

            for (var d2 = 0; d2 < uniforms.outBackprop[3]; d2 = d2 + 1) {
              let xValue = ${this.isChannelsLast?"getDy(batch, idyR, idyC, d2)":"getDy(batch, d2, idyR, idyC)"};
              let wValue = getW(wRPerm, wCPerm, d1, d2);
              dotProd = dotProd + xValue * wValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}},It=class{constructor(t){this.variableNames=["x","dy"],this.uniforms="pads : vec2<i32>, strides : vec2<i32>, batchSize : i32, outHeight : i32, outWidth : i32, inHeight : i32, inWidth : i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=t.dataFormat==="channelsLast",this.shaderKey=`conv2DDerFilter_${this.isChannelsLast}`}getUserCode(){return`
    ${C("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wR = coords[0];
        let wC = coords[1];
        let d1 = coords[2];
        let d2 = coords[3];

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b = b + 1) {
          for (var yR = 0; yR < uniforms.outHeight; yR = yR + 1) {
            let xR = wR + yR * uniforms.strides[0] - uniforms.pads[0];
            if (xR < 0 || xR >= uniforms.inHeight) {
              continue;
            }

            for (var yC = 0; yC < uniforms.outWidth; yC = yC + 1) {
              let xC = wC + yC * uniforms.strides[1] - uniforms.pads[1];

              if (xC < 0 || xC >= uniforms.inWidth) {
                continue;
              }

              if (${this.isChannelsLast}) {
                let dyValue = getDy(b, yR, yC, d2);
                let xValue = getX(b, xR, xC, d1);
                dotProd = dotProd + xValue * dyValue;
              } else {
                let dyValue = getDy(b, d2, yR, yC);
                let xValue = getX(b, d1, xR, xC);
                dotProd = dotProd + xValue * dyValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}},kt=class{constructor(t){this.variableNames=["x","dy"],this.uniforms=`pads : vec3<i32>, strides : vec3<i32>, batchSize : i32, outDepth : i32,
       outHeight : i32, outWidth : i32, inDepth : i32, inHeight : i32, inWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3DDerFilter"}getUserCode(){return`
    ${C("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wF = coords.x;
        let wR = coords.y;
        let wC = coords.z;
        let d1 = coords.w;
        let d2 = coords.u;

        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b++) {
          for (var yF = 0; yF < uniforms.outDepth; yF++) {
            let xF = wF + yF * uniforms.strides[0] - uniforms.pads[0];
            if (xF < 0 || xF >= uniforms.inDepth) {
              continue;
            }

            for (var yR = 0; yR < uniforms.outHeight; yR++) {
              let xR = wR + yR * uniforms.strides[1] - uniforms.pads[1];
              if (xR < 0 || xR >= uniforms.inHeight) {
                continue;
              }

              for (var yC = 0; yC < uniforms.outWidth; yC++) {
                let xC = wC + yC * uniforms.strides[2] - uniforms.pads[2];
                if (xC < 0 || xC >= uniforms.inWidth) {
                  continue;
                }

                let dyValue = getDy(b, yF, yR, yC, d2);
                let xValue = getX(b, xF, xR, xC, d1);
                dotProd += xValue * dyValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}},Rt=class{constructor(t){this.variableNames=["dy","W"],this.uniforms=`filterDims : vec3<i32>, pads : vec3<i32>, strides : vec3<i32>,
      outDepth : i32, outHeight : i32, outWidth : i32, outChannels : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3DDerInput"}getUserCode(){return`
    ${C("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let d1 = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyFCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        var dotProd = 0.0;
        for (var wF = 0; wF < uniforms.filterDims[0]; wF++) {
          let dyF = f32(dyFCorner + wF) / f32(uniforms.strides[0]);
          if (dyF < 0.0 || dyF >= f32(uniforms.outDepth) || fract(dyF) > 0.0) {
            continue;
          }
          let idyF = i32(dyF);

          let wFPerm = uniforms.filterDims[0] - 1 - wF;

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            let wRPerm = uniforms.filterDims[1] - 1 - wR;

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let wCPerm = uniforms.filterDims[2] - 1 - wC;

              for (var d2 = 0; d2 < uniforms.outChannels; d2++) {
                let xValue = getDy(batch, idyF, idyR, idyC, d2);
                let wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}};function Sc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,dy:s}=t,{strides:a,pad:n,dataFormat:u,dimRoundingMode:p,filterShape:d}=i,c=S.convertConv2DDataFormat(u),l=S.computeConv2DInfo(r.shape,d,a,1,n,p,!1,c),h=new It(l),m=[{type:"int32",data:[l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.batchSize]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]},{type:"int32",data:[l.inHeight]},{type:"int32",data:[l.inWidth]}];return e.runWebGPUProgram(h,[r,s],r.dtype,m)}var $n={kernelName:Cr,backendName:"webgpu",kernelFunc:Sc};function wc(o=4){let t=s=>{switch(s){case 1:return"return W[getIndexFromCoords4D(coord, uniforms.wShape)];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = W[getIndexFromCoords4D(coord, uniforms.wShape)];
            let v1 = W[getIndexFromCoords4D(coord1, uniforms.wShape)];
            let v2 = W[getIndexFromCoords4D(coord2, uniforms.wShape)];
            let v3 = W[getIndexFromCoords4D(coord3, uniforms.wShape)];
            return vec4<f32>(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${s} is not supported.`)}},i=`if (row < uniforms.dimAOuter && col < uniforms.dimInner) {
        ${`
      let outRow = row / uniforms.outShape[2];
      let outCol = row % uniforms.outShape[2];

      let WRow = col / (uniforms.filterDims[1] * uniforms.outBackprop[3]);
      let WCol = col / uniforms.outBackprop[3] % uniforms.filterDims[1];
      let xR = f32(outRow - uniforms.pads[0] + WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(uniforms.outBackprop[1]) || fract(xR) > 0.0) {
        return ${F(o)}(0.0);
      }
      if (xC < 0.0 || xC >= f32(uniforms.outBackprop[2]) || fract(xC) > 0.0) {
        return ${F(o)}(0.0);
      }
      let coord = vec4<i32>(
          batch,
          i32(xR),
          i32(xC),
          col % uniforms.outBackprop[3]);
      return x[getIndexFromCoords4D(coord, uniforms.xShape)/${o}];`}
      }
      return ${F(o)}(0.0);`;return`
  fn mm_readA(batch: i32, row : i32, col : i32) -> ${F(o)} {
    ${i}
  }

  fn mm_readB(batch: i32, row : i32, col : i32) -> ${F(o)} {
    let coordX = uniforms.filterDims.x - 1 -
        row / (uniforms.filterDims[1] * uniforms.outBackprop[3]);
    let coordY = uniforms.filterDims.y - 1 -
        (row / uniforms.outBackprop[3]) % uniforms.filterDims[1];
    if (row < uniforms.dimInner && col < uniforms.dimBOuter &&
        coordX >= 0 && coordY >= 0) {
      let rowInner = row % uniforms.outBackprop[3];
      let coord = vec4<i32>(coordX, coordY, col, rowInner);
      ${t(o)}
    }
    return ${F(o)}(0.0);
  }

  fn mm_write(batch: i32, row : i32, col : i32, valueInput : ${F(o)}) {
    if (row < uniforms.dimAOuter && col < uniforms.dimBOuter) {
      var value = valueInput;
      let outCoord = vec4<i32>(
          batch,
          row / uniforms.outShape[2],
          row % uniforms.outShape[2],
          col);
      result[getIndexFromCoords4D(outCoord, uniforms.outShape)/${o}] = value;
    }
  }`}var Dt=class{constructor(t){this.variableNames=["x","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, outBackprop : vec4<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=t.inShape,g.assert(t.dataFormat==="channelsLast",()=>"TODO: NCHW is unimplemented"),this.isVec4=t.inChannels%4===0&&t.outChannels%4===0,this.dispatchLayout={x:[3],y:[1,2],z:[0]},this.workgroupSize=Te(this.dispatchLayout,this.outputShape,this.isVec4),this.elementsPerThread=_e(this.dispatchLayout,this.outputShape,this.isVec4),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread),this.isVec4&&(this.outputComponent=4,this.variableComponents=[4,1]),this.shaderKey=`conv2DDerInputMM_${this.isVec4}_${this.elementsPerThread}`}getUserCode(){let t=this.isVec4?ge(this.elementsPerThread,this.workgroupSize):xe(this.elementsPerThread,this.workgroupSize);return`
    ${wc(this.isVec4?4:1)}
    ${t}
    `}};function bc(o){let{inputs:t,backend:e,attrs:i}=o,{dy:r,filter:s}=t,{inputShape:a,strides:n,pad:u,dataFormat:p,dimRoundingMode:d}=i,c=S.convertConv2DDataFormat(p),l=S.computeConv2DInfo(a,s.shape,n,1,u,d,!1,c),h=[{type:"int32",data:[l.filterHeight,l.filterWidth]},{type:"int32",data:[l.filterHeight-1-l.padInfo.top,l.filterWidth-1-l.padInfo.left]},{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.batchSize,l.outHeight,l.outWidth,l.outChannels]}],m;if(E().getBool("WEBGPU_USE_NAIVE_CONV2D_TRANSPOSE")||l.dataFormat!=="channelsLast")m=new vt(l);else{m=new Dt(l);let f=l.inHeight*l.inWidth,x=l.inChannels,v=l.filterHeight*l.filterWidth*l.outChannels;h.push({type:"uint32",data:[f]},{type:"uint32",data:[x]},{type:"uint32",data:[v]})}return e.runWebGPUProgram(m,[r,s],"float32",h)}var Nn={kernelName:yr,backendName:"webgpu",kernelFunc:bc};var Pt=class{constructor(t){this.variableNames=["x","W"],this.uniforms="filterDims: vec3<i32>, pads: vec3<i32>, strides: vec3<i32>, dilations: vec3<i32>,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3dnaive"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let batch = coords.x;
        let d2 = coords.u;

        let xFRCCorner = vec3<i32>(coords.y, coords.z, coords.w) * uniforms.strides - uniforms.pads;
        let xFCorner = xFRCCorner.x;
        let xRCorner = xFRCCorner.y;
        let xCCorner = xFRCCorner.z;

        let inputDepthNearestVec4 = (uniforms.xShape.u / 4) * 4;
        let inputDepthVec4Remainder = uniforms.xShape.u % 4;

        var dotProd = 0.0;
        for (var wF = 0; wF < uniforms.filterDims[0]; wF++) {
          let xF = xFCorner + wF * uniforms.dilations[0];
          if (xF < 0 || xF >= uniforms.xShape.y) {
            continue;
          }

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let xR = xRCorner + wR * uniforms.dilations[1];
            if (xR < 0 || xR >= uniforms.xShape.z) {
              continue;
            }

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let xC = xCCorner + wC * uniforms.dilations[2];
              if (xC < 0 || xC >= uniforms.xShape.w) {
                continue;
              }

              for (var d1 = 0; d1 < inputDepthNearestVec4; d1 += 4) {
                let xValues = vec4<f32>(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                let wValues = vec4<f32>(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (inputDepthVec4Remainder == 1) {
                dotProd += getX(batch, xF, xR, xC, inputDepthNearestVec4) *
                  getW(wF, wR, wC, inputDepthNearestVec4, d2);
              } else if (inputDepthVec4Remainder == 2) {
                let xValues = vec2<f32>(
                  getX(batch, xF, xR, xC, inputDepthNearestVec4),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1)
                );
                let wValues = vec2<f32>(
                  getW(wF, wR, wC, inputDepthNearestVec4, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (inputDepthVec4Remainder == 3) {
                let xValues = vec3<f32>(
                  getX(batch, xF, xR, xC, inputDepthNearestVec4),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2)
                );
                let wValues = vec3<f32>(
                  getW(wF, wR, wC, inputDepthNearestVec4, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 1, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }`}};function vc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,filter:s}=t,{strides:a,pad:n,dilations:u}=i,p=S.computeConv3DInfo(r.shape,s.shape,a,u,n),d=[p.padInfo.front,p.padInfo.top,p.padInfo.left],c=[{type:"int32",data:[p.filterDepth,p.filterHeight,p.filterWidth]},{type:"int32",data:[...d]},{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.dilationDepth,p.dilationHeight,p.dilationWidth]}],l=new Pt(p),h=ue(r.dtype,s.dtype);return e.runWebGPUProgram(l,[r,s],h,c)}var zn={kernelName:Sr,backendName:"webgpu",kernelFunc:vc};function Ic(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,dy:s}=t,{strides:a,pad:n,filterShape:u}=i,p=S.computeConv3DInfo(r.shape,u,a,1,n),d=new kt(p),c=[{type:"int32",data:[p.padInfo.front,p.padInfo.top,p.padInfo.left]},{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.batchSize]},{type:"int32",data:[p.outDepth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"int32",data:[p.inDepth]},{type:"int32",data:[p.inHeight]},{type:"int32",data:[p.inWidth]}];return e.runWebGPUProgram(d,[r,s],s.dtype,c)}var An={kernelName:wr,backendName:"webgpu",kernelFunc:Ic};function kc(o){let{inputs:t,backend:e,attrs:i}=o,{dy:r,filter:s}=t,{strides:a,pad:n,inputShape:u}=i,p=S.computeConv3DInfo(u,s.shape,a,1,n),d=new Rt(p),c=[{type:"int32",data:[p.filterDepth,p.filterHeight,p.filterWidth]},{type:"int32",data:[p.filterDepth-1-p.padInfo.front,p.filterHeight-1-p.padInfo.top,p.filterWidth-1-p.padInfo.left]},{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.outDepth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"int32",data:[p.outChannels]}];return e.runWebGPUProgram(d,[r,s],r.dtype,c)}var Fn={kernelName:br,backendName:"webgpu",kernelFunc:kc};var Rc=N({opType:b.COS}),Ln={kernelName:"Cos",backendName:"webgpu",kernelFunc:Rc};var Dc=N({opType:b.COSH}),Tn={kernelName:Ir,backendName:"webgpu",kernelFunc:Dc};var $t=class{constructor(t,e,i,r){this.variableNames=["Image","Boxes","BoxInd"],this.uniforms="extrapolationValue : f32,",this.workgroupSize=[64,1,1],this.size=!0;let[s]=e;this.outputShape=[s,i[0],i[1],t],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.methodId=r==="bilinear"?1:0,this.cropHeightBiggerThan1=this.outputShape[1]>1,this.cropWidthBiggerThan1=this.outputShape[2]>1,this.shaderKey=`cropAndResize_${this.methodId}_${this.cropHeightBiggerThan1}_${this.cropWidthBiggerThan1}`}getUserCode(){let[t,e]=["f32(uniforms.imageShape[1] - 1)","f32(uniforms.imageShape[2] - 1)"],[i,r,s]=this.cropHeightBiggerThan1?[`(${t} / f32(uniforms.outShape[1] - 1))`,"(y2-y1) * height_ratio",`y1*${t} + f32(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${t}`],[a,n,u]=this.cropWidthBiggerThan1?[`(${e} / f32(uniforms.outShape[2] - 1))`,"(x2-x1) * width_ratio",`x1*${e} + f32(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${e}`];return`
    ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let height_ratio = f32(${i});
        let width_ratio = f32(${a});
        let b = coords[0];
        let y = coords[1];
        let x = coords[2];
        let d = coords[3];
        // get box vals
        let y1 = getBoxes(b, 0);
        let x1 = getBoxes(b, 1);
        let y2 = getBoxes(b, 2);
        let x2 = getBoxes(b, 3);
        // get image in batch index
        let bInd = i32(round(getBoxInd(b)));
        if(bInd < 0 || bInd >= uniforms.outShape[0]) {
          return;
        }
        let height_scale = ${r};
        let width_scale = ${n};
        let in_y = ${s};
        if( in_y < 0.0 || in_y > ${t} ) {
          setOutputAtIndex(index, uniforms.extrapolationValue);
          return;
        }
        let in_x = ${u};
        if( in_x < 0.0 || in_x > ${e} ) {
          setOutputAtIndex(index, uniforms.extrapolationValue);
          return;
        }
        let sourceFracIndexCR = vec2<f32>(in_x,in_y);
        if(${this.methodId} == 1) {
          // Compute the four integer indices.
          let sourceFloorCR = vec2<i32>(sourceFracIndexCR);
          let sourceCeilCR = vec2<i32>(ceil(sourceFracIndexCR));
          let topLeft = getImage(bInd, sourceFloorCR.y, sourceFloorCR.x, d);
          let bottomLeft = getImage(bInd, sourceCeilCR.y, sourceFloorCR.x, d);
          let topRight = getImage(bInd, sourceFloorCR.y, sourceCeilCR.x, d);
          let bottomRight = getImage(bInd, sourceCeilCR.y, sourceCeilCR.x, d);
          let fracCR = sourceFracIndexCR - vec2<f32>(sourceFloorCR);
          let top = topLeft + (topRight - topLeft) * fracCR.x;
          let bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          let newValue = top + (bottom - top) * fracCR.y;
          setOutputAtIndex(index, newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          let sourceNearestCR = vec2<i32>(floor(
            sourceFracIndexCR + vec2<f32>(0.5,0.5)));
          let newValue = getImage(
            bInd, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutputAtIndex(index, newValue);
        }
      }
    }
    `}};var Pc=o=>{let{inputs:t,backend:e,attrs:i}=o,{image:r,boxes:s,boxInd:a}=t,{cropSize:n,method:u,extrapolationValue:p}=i,d=new $t(r.shape[3],s.shape,n,u),c=[{type:"float32",data:[p]}];return e.runWebGPUProgram(d,[r,s,a],"float32",c)},_n={kernelName:Dr,backendName:"webgpu",kernelFunc:Pc};var Se;(function(o){o.Prod="*",o.Sum="+"})(Se||(Se={}));var Me=class{constructor(t,e,i,r){this.variableNames=["x"],this.uniforms="index : f32,",this.size=!0,this.workgroupSize=[128,1,1],this.outputShape=e,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.exclusive=i,this.reverse=r,this.op=t,this.shaderKey=`cum_${this.op}_${this.exclusive}_${this.reverse}`}getUserCode(){let t=this.outputShape.length,e=this.op===Se.Prod?"1.0":"0.0",i=this.exclusive?e:`getX(${Bn(t,"coords",this.op)})`,r=this.outputShape[this.outputShape.length-1],s="",a="";return this.exclusive?(s=this.reverse?`end != ${r-1}`:"end != 0",a=this.reverse?"end + 1":"end - 1"):(s=this.reverse?`end + pow2 < ${r}`:"end >= pow2",a=this.reverse?"end + pow2":"end - pow2"),`
      ${C("index")} {
       if (index < uniforms.size) {
         var coords = getCoordsFromIndex(index);

         let end = ${En(t,"coords",this.op)};
         var val = ${i};
         let pow2 = i32(pow(2.0, uniforms.index));
         if (${s}) {
           let idx = ${a};
           ${En(t,"coords",this.op)} = idx;
           val ${this.op}= getX(${Bn(t,"coords",this.op)});
         }
         setOutputAtIndex(index, val);
       }
      }
    `}};function Bn(o,t,e){if(o===1)return`${t}`;if(o===2)return`${t}.x, ${t}.y`;if(o===3)return`${t}.x, ${t}.y, ${t}.z`;if(o===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${e} for rank ${o} is not yet supported`)}function En(o,t,e){if(o===1)return`${t}`;if(o===2)return`${t}.y`;if(o===3)return`${t}.z`;if(o===4)return`${t}.w`;throw Error(`Cumulative ${e} for rank ${o} is not yet supported`)}function Nt(o,t,e,i,r,s){let a=t.shape.length,n=S.getAxesPermutation([i],a),u=t;n!=null&&(u=q({inputs:{x:t},backend:e,attrs:{perm:n}}));let p=S.getInnerMostAxes(1,a)[0];if(p!==a-1)throw new Error(`WebGPU cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${i}`);let d=u.shape[p],c=W({inputs:{x:u},backend:e});for(let l=0;l<=Math.ceil(Math.log2(d))-1;l++){let h=new Me(o,u.shape,!1,s),m=c,f=[{type:"float32",data:[l]}];c=e.runWebGPUProgram(h,[c],c.dtype,f),e.disposeData(m.dataId)}if(r){let l=new Me(o,u.shape,r,s),h=c,m=[{type:"float32",data:[0]}];c=e.runWebGPUProgram(l,[c],c.dtype,m),e.disposeData(h.dataId)}if(n!=null){let l=S.getUndoAxesPermutation(n),h=q({inputs:{x:c},backend:e,attrs:{perm:l}});return e.disposeData(c.dataId),e.disposeData(u.dataId),h}return c}function $c(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{axis:s,exclusive:a,reverse:n}=i;return Nt(Se.Prod,r,e,s,a,n)}var Un={kernelName:kr,backendName:"webgpu",kernelFunc:$c};function Nc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{axis:s,exclusive:a,reverse:n}=i;return Nt(Se.Sum,r,e,s,a,n)}var Wn={kernelName:Rr,backendName:"webgpu",kernelFunc:Nc};function zc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,weights:s}=t,{size:a,binaryOutput:n}=i,u=r.shape.length===1,d=g.sizeFromShape(s.shape)>0,c=s.dtype,l=u?[r.shape[0]]:[r.shape[0],r.shape[1]],h=u?[a]:[r.shape[0],a],m=U({backend:e,attrs:{shape:h,value:0,dtype:c}}),f=new Re(l,d,n),x=[{type:"int32",data:[a]}],v=d?[r,s]:[r];return e.runWebGPUProgram(f,v,c,x,m)}var Mn={kernelName:Pr,backendName:"webgpu",kernelFunc:zc};var zt=class{constructor(t,e){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.uniforms="blockSize : i32,",this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`depthToSpace_${e}`,this.dataFormat=e}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let h = ${this.getHeightCoordString()};
          let w = ${this.getWidthCoordString()};
          let d = ${this.getDepthCoordString()};

          let in_h = h / uniforms.blockSize;
          let offset_h = h % uniforms.blockSize;
          let in_w = w / uniforms.blockSize;
          let offset_w = w % uniforms.blockSize;
          let offset_d = (offset_h * uniforms.blockSize + offset_w) *
            ${this.getOutputDepthSize()};
          let in_d = d + offset_d;

          let rlt = ${this.getInputSamplingString()};
          setOutputAtIndex(index, rlt);
        }
      }`}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?"uniforms.outShape[3]":"uniforms.outShape[1]"}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};function Ac(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{blockSize:s,dataFormat:a}=i,n=r.shape[0],u=a==="NHWC"?r.shape[1]:r.shape[2],p=a==="NHWC"?r.shape[2]:r.shape[3],d=a==="NHWC"?r.shape[3]:r.shape[1],c=u*s,l=p*s,h=d/(s*s),m=a==="NHWC"?[n,c,l,h]:[n,h,c,l],f=[{type:"int32",data:[s]}],x=new zt(m,a);return e.runWebGPUProgram(x,[r],r.dtype,f)}var On={kernelName:$r,backendName:"webgpu",kernelFunc:Ac};var At=class{constructor(t,e,i,r=!1,s=null,a=!1){this.variableNames=["x","W"],this.uniforms="pads : vec2<i32>, inDims : vec2<i32>,",this.workgroupSize=[16,16,1],this.outputShape=t,this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),r&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),this.addBias=r,this.activation=s,this.hasPreluActivation=a,this.filterHeight=e,this.filterWidth=i,this.shaderKey=`depthwiseNCHW_${this.activation}_${this.filterHeight}_${this.filterWidth}`}getUserCode(){let t=this.filterWidth*this.filterHeight,e=this.workgroupSize[0]*this.workgroupSize[1]*this.workgroupSize[2],i=this.workgroupSize[1]+this.filterHeight-1,r=this.workgroupSize[0]+this.filterWidth-1;return`
      ${G(this.activation,this.hasPreluActivation,!1,4)}

      var<workgroup> mm_Asub : array<array<f32, ${r}>, ${i}>;
      var<workgroup> mm_Bsub : array<array<f32, ${this.filterWidth}>, ${this.filterHeight}>;
      fn readX(batch : i32, channel : i32, row : i32, col : i32) -> f32 {
        var value = 0.0;
        if (row >=0 && row < uniforms.inDims[0] && col >=0 && col < uniforms.inDims[1])
        {
          value = getX(batch, channel, row, col);
        }
        return value;
      }

      ${C()} {
        let coords = getOutputCoords();
        let batch = coords[0];
        let xRCCorner = vec2<i32>(coords.zw) - uniforms.pads;
        let channelMul = uniforms.wShape[3];
        let d1 = coords[1] / channelMul;
        let q = coords[1] % channelMul;

        let inputRowStart = xRCCorner.x;
        let inputColStart = xRCCorner.y;

        let localRow = i32(localId.y);
        let localCol = i32(localId.x);

        // Load one tile of X into local memory.
        for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${this.workgroupSize[1]}) {
          for (var inputCol = localCol; inputCol < ${r}; inputCol = inputCol + ${this.workgroupSize[0]}) {
            let rowOffset = inputRow - localRow;
            let colOffset = inputCol - localCol;
            mm_Asub[inputRow][inputCol] = readX(batch, d1, inputRowStart + rowOffset, inputColStart + colOffset);
          }
        }

        // Load one tile of W into local memory.
        var wIndex = i32(localIndex);
        ${t<e?`if (wIndex < ${t})`:`for(; wIndex < ${t}; wIndex = wIndex + ${e})`}

        {
          let wRow = wIndex / ${this.filterWidth};
          let wCol = wIndex % ${this.filterWidth};
          mm_Bsub[wRow][wCol] = getW(wRow, wCol, d1, q);
        }

        workgroupBarrier();

        var value = 0.0;
        for (var wR = 0; wR < ${this.filterHeight}; wR = wR + 1) {
          for (var wC = 0; wC < ${this.filterWidth}; wC = wC + 1) {
            let xVal = mm_Asub[localRow + wR][localCol + wC];
            let wVal = mm_Bsub[wR][wC];
            value = fma(xVal, wVal, value);
          }
        }
        ${Q(this.addBias,this.activation)}
        if (coordsInBounds4D(coords, uniforms.outShape)) {
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }
    `}};var Pe=class{constructor(t,e=!1,i=null,r=!1){this.variableNames=["x","W"],this.uniforms="pads : vec2<i32>, inDims : vec2<i32>, virtualWidth : i32,",this.workgroupSize=[64,1,1],this.workPerThread=4,this.outputComponent=4,this.outputShape=t.outShape,this.virtualWidth=Math.ceil(this.outputShape[2]/this.workPerThread)*this.workPerThread;let s=[this.outputShape[0],this.outputShape[1],this.virtualWidth,this.outputShape[3]];this.dispatchLayout=w(s),this.dispatch=y(this.dispatchLayout,s,this.workgroupSize,[this.outputComponent*this.workPerThread,1,1]),g.assert(t.dataFormat==="channelsLast",()=>"TODO: NCHW is unimplemented"),e&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.convInfo=t,this.addBias=e,this.activation=i,this.hasPreluActivation=r,this.shaderKey=`depthwiseVec4_${i}_${this.convInfo.filterHeight}_${this.convInfo.filterWidth}_${this.convInfo.strideHeight}_${this.convInfo.strideWidth}_${this.workPerThread}`}getUserCode(){let t=(this.workPerThread-1)*this.convInfo.strideWidth+this.convInfo.filterWidth,e=this.convInfo.strideHeight,i=this.convInfo.strideWidth;return`
      ${G(this.activation,this.hasPreluActivation,!0,4)}
      fn readX(batch : i32, row : i32, col : i32, channel : i32) -> vec4<f32> {
        var value = vec4<f32>(0.0);
        if (col >=0 && col < uniforms.inDims[1]) {
          value = getX(batch, row, col, channel);
        }
        return value;
      }

      ${C("index")} {
        let width0 = uniforms.outShape[3] / ${this.outputComponent};
        let d1 = (index % width0) * ${this.outputComponent};
        var index1 = index / width0;
        let width1 = uniforms.virtualWidth / ${this.workPerThread};
        let c = (index1 % width1) * ${this.workPerThread};
        index1 = index1 / width1;
        let r = index1 % uniforms.outShape[1];
        let batch = index1 / uniforms.outShape[1];

        let xRCCorner = vec2<i32>(r, c) * vec2<i32>(${e}, ${i}) - uniforms.pads;

        let xRCorner = xRCCorner.x;
        let xCCorner = xRCCorner.y;
        var xVals : array<vec4<f32>, ${t}>;
        var dotProd : array<vec4<f32>, ${this.workPerThread}>;
        for (var i = 0; i < ${this.workPerThread}; i++) {
          dotProd[i] = vec4<f32>(0.0);
        }

        // Use constant instead of uniform can give better performance.
        for (var wR = 0; wR < ${this.convInfo.filterHeight}; wR = wR + 1) {
          let xR = xRCorner + wR;
          if (xR >=0 && xR < uniforms.inDims[0]) {
            for (var i = 0; i < ${t}; i++) {
              xVals[i] = readX(batch, xR, xCCorner + i, d1);
            }
            for (var wC = 0; wC < ${this.convInfo.filterWidth}; wC = wC + 1) {
              let wValue = getW(wR, wC, d1, 0);
              for (var i = 0; i < ${this.workPerThread}; i++) {
                dotProd[i] = fma(xVals[i * ${i} + wC], wValue, dotProd[i]);
              }
            }
          }
        }

        for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let coords = vec4<i32>(batch, r, c + i, d1);
          if (coordsInBounds4D(coords, uniforms.outShape)) {
            var value = dotProd[i];
            ${Q(this.addBias,this.activation)}
            setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
          }
        }
      }
    `}};var $e=class{constructor(t,e=!1,i=null,r=!1){this.variableNames=["x","W"],this.uniforms=`pads : vec2<i32>, inDims : vec2<i32>, filterHeight : i32,
      filterWidth : i32, strides : vec2<i32>, dilations : vec2<i32>,`,this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=t.dataFormat==="channelsLast",e&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.convInfo=t,this.addBias=e,this.activation=i,this.hasPreluActivation=r,this.shaderKey=`depthwise_${this.activation}_${this.isChannelsLast}`}getUserCode(){let t=this.isChannelsLast?"getX(batch, xR, xC, d1);":"getX(batch, d1, xR, xC);";return`
      ${G(this.activation,this.hasPreluActivation,!1,4)}

      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let batch = coords[0];
          let xRCCorner = vec2<i32>(coords.${this.isChannelsLast?"yz":"zw"}) * uniforms.strides - uniforms.pads;
          let d2 = coords[${this.isChannelsLast?3:1}];
          let channelMul = uniforms.wShape[3];
          let d1 = d2 / channelMul;
          let q = d2 % channelMul;

          let inputRowStart = xRCCorner.x;
          let inputColStart = xRCCorner.y;
          let inputRowEnd = inputRowStart + uniforms.filterHeight *
              uniforms.dilations[0];
          let inputColEnd = inputColStart + uniforms.filterWidth *
              uniforms.dilations[1];

          // Convolve x(?, ?, d1)|x(d1, ?, ?) with w(:, :, d1, q) to get
          // y(yR, yC, d2)|y(d2, yR, yC). ? = to be determined. : = across all
          // values in that axis. x(?, ?, d1) and y(yR, yC, d2) is for NHWC.
          // x(d1, ?, ?) and y(d2, yR, yC) is for NCHW.
          var value = 0.0;

          // Extract if checking out of for loop for performance.
          if (inputRowStart >= 0 && inputColStart >= 0 &&
            inputRowEnd < uniforms.inDims[0] &&
                inputColEnd < uniforms.inDims[1]) {
              for (var wR = 0; wR < uniforms.filterHeight; wR = wR + 1) {
                let xR = inputRowStart + wR * uniforms.dilations[0];

                for (var wC = 0; wC < uniforms.filterWidth; wC = wC + 1) {
                  let xC = inputColStart + wC * uniforms.dilations[1];

                  let xVal = ${t};
                  let wVal = getW(wR, wC, d1, q);
                  value = value + xVal * wVal;
                }
              }
            } else {
              for (var wR = 0; wR < uniforms.filterHeight; wR = wR + 1) {
                let xR = inputRowStart + wR * uniforms.dilations[0];

                if (xR < 0 || xR >= uniforms.inDims[0]) {
                  continue;
                }

                for (var wC = 0; wC < uniforms.filterWidth; wC = wC + 1) {
                  let xC = inputColStart + wC * uniforms.dilations[1];

                  if (xC < 0 || xC >= uniforms.inDims[1]) {
                    continue;
                  }

                  let xVal = ${t};
                  let wVal = getW(wR, wC, d1, q);
                  value = value + xVal * wVal;
                }
              }
            }
            ${Q(this.addBias,this.activation)}
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }
    `}};function Fc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,filter:s}=t,{strides:a,pad:n,dataFormat:u,dilations:p,dimRoundingMode:d}=i,c=S.convertConv2DDataFormat(u),l=p;l==null&&(l=[1,1]);let h=S.computeConv2DInfo(r.shape,s.shape,a,l,n,d,!0,c),m=[{type:"int32",data:[h.padInfo.top,h.padInfo.left]},{type:"int32",data:[h.inHeight,h.inWidth]}],f=h.dataFormat==="channelsLast",x;return!f&&h.inHeight>16&&h.inWidth>16&&h.strideHeight===1&&h.strideWidth===1&&h.dilationWidth===1&&h.dilationHeight===1&&h.inChannels===h.outChannels?x=new At(h.outShape,h.filterHeight,h.filterWidth):f&&h.outHeight>4&&h.outWidth>4&&h.strideWidth<=2&&h.inChannels===h.outChannels&&h.dilationHeight===1&&h.dilationWidth===1&&h.inChannels%4===0?(x=new Pe(h),m.push({type:"int32",data:[x.virtualWidth]})):(x=new $e(h),m.push({type:"int32",data:[h.filterHeight]},{type:"int32",data:[h.filterWidth]},{type:"int32",data:[h.strideHeight,h.strideWidth]},{type:"int32",data:[h.dilationHeight,h.dilationWidth]})),e.runWebGPUProgram(x,[r,s],r.dtype,m)}var Vn={kernelName:Nr,backendName:"webgpu",kernelFunc:Fc};var Ft=class{constructor(t){this.variableNames=["x","dy"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, filterDims : vec2<i32>, outHeight : i32,
      outWidth : i32, inHeight : i32, inWidth : i32, batchSize : i32, channelMul : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="depthwise_conv2d_backprop_filter"}getUserCode(){return`
      ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wR = coords[0];
        let wC = coords[1];
        let d1 = coords[2];
        let dm = coords[3];
        let d2 = d1 * uniforms.channelMul + dm;

        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b++) {
          for (var yR = 0; yR < uniforms.outHeight; yR++) {
            let xR = wR + yR * uniforms.strides[0] - uniforms.pads[0];

            if (xR < 0 || xR >= uniforms.inHeight) {
              continue;
            }

            for (var yC = 0; yC < uniforms.outWidth; yC++) {
              let xC = wC + yC * uniforms.strides[1] - uniforms.pads[1];

              if (xC < 0 || xC >= uniforms.inWidth) {
                continue;
              }

              let dyValue = getDy(b, yR, yC, d2);
              let xValue = getX(b, xR, xC, d1);
              dotProd += xValue * dyValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}},Lt=class{constructor(t){this.variableNames=["dy","W"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32, channelMul : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="depthwise_conv2d_backprop_input"}getUserCode(){return`
      ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d1 = coords[3];
        let dyCorner = coords.yz - uniforms.pads;
        let dyRCorner = dyCorner.x;
        let dyCCorner = dyCorner.y;

        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }

          let idyR = i32(dyR);
          let wRPerm = uniforms.filterDims[0] - 1 - wR;

          for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }

            let idyC = i32(dyC);
            let wCPerm = uniforms.filterDims[1] - 1 - wC;

            for (var dm = 0; dm < uniforms.channelMul; dm++) {
              let d2 = d1 * uniforms.channelMul + dm;
              let xValue = getDy(batch, idyR, idyC, d2);
              let wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}};function Lc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,dy:s}=t,{strides:a,dilations:n,pad:u,dimRoundingMode:p,filterShape:d}=i,c=S.computeConv2DInfo(r.shape,d,a,n,u,p,!0),l=new Ft(c),h=[{type:"int32",data:[c.strideHeight,c.strideWidth]},{type:"int32",data:[c.padInfo.top,c.padInfo.left]},{type:"int32",data:[c.filterHeight,c.filterWidth]},{type:"int32",data:[c.outHeight]},{type:"int32",data:[c.outWidth]},{type:"int32",data:[c.inHeight]},{type:"int32",data:[c.inWidth]},{type:"int32",data:[c.batchSize]},{type:"int32",data:[c.outChannels/c.inChannels]}];return e.runWebGPUProgram(l,[r,s],"float32",h)}var Hn={kernelName:zr,backendName:"webgpu",kernelFunc:Lc};function Tc(o){let{inputs:t,backend:e,attrs:i}=o,{dy:r,filter:s}=t,{strides:a,dilations:n,pad:u,dimRoundingMode:p,inputShape:d}=i,c=S.computeConv2DInfo(d,s.shape,a,n,u,p,!0),l=new Lt(c),h=[{type:"int32",data:[c.strideHeight,c.strideWidth]},{type:"int32",data:[c.filterHeight-1-c.padInfo.top,c.filterWidth-1-c.padInfo.left]},{type:"int32",data:[c.filterHeight,c.filterWidth]},{type:"int32",data:[c.outHeight]},{type:"int32",data:[c.outWidth]},{type:"int32",data:[c.outChannels/c.inChannels]}];return e.runWebGPUProgram(l,[r,s],r.dtype,h)}var Gn={kernelName:Ar,backendName:"webgpu",kernelFunc:Tc};var Tt=class{constructor(t){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,t],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="diag"}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let value = select(0.0, getX(coords[0]), coords[0] == coords[1]);
          setOutputAtIndex(index, value);
        }
      }
    `}};function _c(o){let{inputs:t,backend:e}=o,{x:i}=t,r=[...i.shape,...i.shape],s=g.sizeFromShape(i.shape),a=R({inputs:{x:i},backend:e,attrs:{shape:[s]}}),n=new Tt(s),u=e.runWebGPUProgram(n,[a],a.dtype),p=R({inputs:{x:u},backend:e,attrs:{shape:r}});return e.disposeData(a.dataId),e.disposeData(u.dataId),p}var Kn={kernelName:Fr,backendName:"webgpu",kernelFunc:_c};var _t=class{constructor(t){this.variableNames=["x","w"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="dilation2d"}getUserCode(){return`
       ${C("index")} {
         if (index < uniforms.size) {
           let neg_infinity = -3.4e38;
           let coords = getOutputCoords();
           let batch = coords.x;
           let d1 = coords.w;
           let outTopLeftCorner = coords.yz * uniforms.strides - uniforms.pads;
           let hBeg = outTopLeftCorner.x;
           let wBeg = outTopLeftCorner.y;

           var curVal = neg_infinity;
           for (var h = 0; h < uniforms.filterDims[0]; h = h + 1) {
             let hIn = hBeg + h * uniforms.dilations[0];

             if (hIn >= 0 && hIn < uniforms.xShape[1]) {
               for (var w = 0; w < uniforms.filterDims[1]; w = w + 1) {
                 let wIn = wBeg + w * uniforms.dilations[1];

                 if (wIn >= 0 && wIn < uniforms.xShape[2]) {
                   let val = getX(batch, hIn, wIn, d1) + getW(h, w, d1);
                   if (val > curVal) {
                     curVal = val;
                   }
                 }
               }
             }
           }

           setOutputAtIndex(index, curVal);
         }
       }
     `}};function Bc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,filter:s}=t,{strides:a,pad:n,dilations:u}=i,p=S.computeDilation2DInfo(r.shape,s.shape,a,n,"NHWC",u),d=[p.padInfo.top,p.padInfo.left],c=[{type:"int32",data:[p.filterHeight,p.filterWidth]},{type:"int32",data:[...d]},{type:"int32",data:[p.strideHeight,p.strideWidth]},{type:"int32",data:[p.dilationHeight,p.dilationWidth]}],l=new _t(p);return e.runWebGPUProgram(l,[r,s],r.dtype,c)}var Xn={kernelName:Lr,backendName:"webgpu",kernelFunc:Bc};var Bt=class{constructor(t,e){if(this.variableNames=["x","w","dy"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>, dySize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t.inShape,this.dispatchLayout=w(t.outShape),this.dispatch=y(this.dispatchLayout,t.outShape,this.workgroupSize),e!=="float32"&&e!=="int32")throw new Error(`Dilation2DBackpropInput only supports float32 and int32
          types, does not support ${e} type.`);this.type=e,this.shaderKey="dilation2DBackpropInput"}getUserCode(){return`
       ${C("index")} {
         if (index < uniforms.dySize) {
           let coords = getDyCoordsFromIndex(index);
           let b = coords[0];
           let r = coords[1];
           let c = coords[2];
           let d = coords[3];

           let dyCorner = vec2<i32>(r, c) * uniforms.strides - uniforms.pads;
           var curVal = -3.4e38;  // neg_infinity
           var xRMax = 0;
           var xCMax = 0;

           // In the case of multiple argmax branches, we only back-propagate
           // along the last branch, i.e., the one with largest value of
           // 'wR * uniforms.filterDims[1] + wC', similarly to the max-pooling
           // backward routines.
           for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
             let xR = dyCorner.x + wR * uniforms.dilations[0];

             if (xR >= 0 && xR < uniforms.xShape[1]) {
               for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
                 let xC = dyCorner.y + wC * uniforms.dilations[1];

                 if (xC >= 0 && xC < uniforms.xShape[2]) {
                   let val = getX(b, xR, xC, d) + getW(wR, wC, d);
                   if (val > curVal) {
                     curVal = val;
                     xRMax = xR;
                     xCMax = xC;
                   }
                 }
               }
             }
           }

           let flatIndexIn = d + uniforms.xShape[3] *
               (xCMax + uniforms.xShape[2] * (xRMax + uniforms.xShape[1] * b));
           let value = getDy(b, r, c, d);
           ${j("&result[flatIndexIn]","value",this.type)}
         }
       }
     `}},Et=class{constructor(t,e,i){if(this.variableNames=["x","w","dy"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>, dySize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t.filterShape,this.dispatchLayout=w(t.outShape),this.dispatch=y(this.dispatchLayout,t.outShape,this.workgroupSize),i!=="float32"&&i!=="int32")throw new Error(`Dilation2DBackpropFilter only supports float32 and int32
          types, does not support ${i} type.`);this.type=i,this.shaderKey="dilation2DBackpropFilter"}getUserCode(){return`
       ${C("index")} {
         if (index < uniforms.dySize) {
           let coords = getDyCoordsFromIndex(index);
           let b = coords[0];
           let r = coords[1];
           let c = coords[2];
           let d = coords[3];

           let dyCorner = vec2<i32>(r, c) * uniforms.strides - uniforms.pads;
           var curVal = -3.4e38;  // neg_infinity
           var wRMax = 0;
           var wCMax = 0;

           // In the case of multiple argmax branches, we only back-propagate
           // along the last branch, i.e., the one with largest value of
           // 'wR * uniforms.filterDims[1] + wC', similarly to the max-pooling
           // backward routines.
           for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
             let xR = dyCorner.x + wR * uniforms.dilations[0];

             if (xR >= 0 && xR < uniforms.xShape[1]) {
               for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
                 let xC = dyCorner.y + wC * uniforms.dilations[1];

                 if (xC >= 0 && xC < uniforms.xShape[2]) {
                   let val = getX(b, xR, xC, d) + getW(wR, wC, d);
                   if (val > curVal) {
                     curVal = val;
                     wRMax = wR;
                     wCMax = wC;
                   }
                 }
               }
             }
           }

           let flatIndexIn = d + uniforms.wShape[2] * (wCMax + wRMax * uniforms.wShape[1]);
           let value = getDy(b, r, c, d);
           ${j("&result[flatIndexIn]","value",this.type)}
         }
       }
     `}};function Ec(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,filter:s,dy:a}=t,{strides:n,pad:u,dilations:p}=i,d=S.computeDilation2DInfo(r.shape,s.shape,n,u,"NHWC",p),c=s.dtype,l=new Et(d,s.shape,c),h=[{type:"int32",data:[d.filterHeight,d.filterWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[g.sizeFromShape(d.outShape)]}],m=U({backend:e,attrs:{shape:s.shape,value:0,dtype:c}});return e.runWebGPUProgram(l,[r,s,a],c,h,m)}var qn={kernelName:_r,backendName:"webgpu",kernelFunc:Ec};function Uc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,filter:s,dy:a}=t,{strides:n,pad:u,dilations:p}=i,d=S.computeDilation2DInfo(r.shape,s.shape,n,u,"NHWC",p),c=r.dtype,l=new Bt(d,c),h=[{type:"int32",data:[d.filterHeight,d.filterWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[g.sizeFromShape(d.outShape)]}],m=U({backend:e,attrs:{shape:d.inShape,value:0,dtype:c}});return e.runWebGPUProgram(l,[r,s,a],c,h,m)}var Yn={kernelName:Tr,backendName:"webgpu",kernelFunc:Uc};var Ut=class{constructor(t,e,i){this.variableNames=["Image"],this.uniforms="alpha: f32,",this.workgroupSize=[64,1,1],this.pixelsOpType=pe.DRAW,this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.type=e,this.textureFormat=i,this.shaderKey=`draw_${e}_${i}`}getUserCode(){let t,e=this.type==="float32"?"value":"value / 255.0";return t=`
      if (uniforms.numChannels == 1) {
        rgba[0] = ${e};
        rgba[1] = ${e};
        rgba[2] = ${e};
      } else {
        rgba[d] = ${e};
      }`,`
       @group(0) @binding(0) var outImage : texture_storage_2d<${this.textureFormat}, write>;
       ${C("index")} {
         if (index < uniforms.size) {
           var rgba = vec4<f32>(0.0, 0.0, 0.0, uniforms.alpha);
           for (var d = 0; d < uniforms.numChannels; d = d + 1) {
             let value = f32(inBuf[index * uniforms.numChannels + d]);
             ${t}
           }
           rgba.x = rgba.x * rgba.w;
           rgba.y = rgba.y * rgba.w;
           rgba.z = rgba.z * rgba.w;
           let coords = getCoordsFromIndex(index);
           textureStore(outImage, vec2<i32>(coords.yx), rgba);
         }
       }
      `}};function Wc(o){let{inputs:t,backend:e,attrs:i}=o,{image:r}=t,{canvas:s,options:a}=i,[n,u]=r.shape.slice(0,2),{imageOptions:p}=a||{},d=p?.alpha||1,c=e.device.features.has("bgra8unorm-storage")?"bgra8unorm":"rgba8unorm",l=[n,u],h=new Ut(l,r.dtype,c);s.width=u,s.height=n;let m="webgpu",f=s.getContext(m),x;f||(x=new OffscreenCanvas(u,n),f=x.getContext(m));let v=r.shape.length===3?r.shape[2]:1;f.configure({device:e.device,format:c,usage:GPUTextureUsage.STORAGE_BINDING,alphaMode:"premultiplied"});let I="int32",k=e.makeTensorInfo(l,I),D=e.tensorMap.get(k.dataId);D.resource=f.getCurrentTexture(),D.external=!0;let P=[{type:"uint32",data:[v]},{type:"float32",data:[d]}];if(e.runWebGPUProgram(h,[r],I,P,k),x){let z=s.getContext("2d");if(!z)throw new Error("Please make sure this canvas has only been used for 2d or webgpu context!");z.drawImage(x,0,0)}return e.disposeData(k.dataId),r}var jn={kernelName:Br,backendName:"webgpu",kernelFunc:Wc};var Lo=L({opType:$.MUL,cpuKernelImpl:Na,supportsComplex:!0}),Qn={kernelName:Fi,backendName:"webgpu",kernelFunc:Lo};function To(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{axis:s,keepDims:a}=i;return J(r,s,a,"sum",e)}var Zn={kernelName:"Sum",backendName:"webgpu",kernelFunc:To};function Mc(o){let{inputs:t,backend:e,attrs:i}=o,{equation:r}=i,s=t,{allDims:a,summedDims:n,idDims:u}=S.decodeEinsumEquation(r,s.length);S.checkEinsumDimSizes(a.length,u,s);let{path:p,steps:d}=S.getEinsumComputePath(n,u),c=d.length,l=null,h=a.length,m=[];for(let f=0;f<c;++f){for(let x of d[f]){let{permutationIndices:v,expandDims:I}=S.getEinsumPermutation(h,u[x]),k;S.isIdentityPermutation(v)?k=s[x]:(k=q({inputs:{x:s[x]},backend:e,attrs:{perm:v}}),m.push(k));let D=k.shape.slice();for(let P=0;P<I.length;++P)D.splice(I[P],0,1);g.arraysEqual(k.shape,D)||(k=R({inputs:{x:k},backend:e,attrs:{shape:D}}),m.push(k)),l===null?l=k:(l=Lo({inputs:{a:k,b:l},backend:e}),m.push(l))}f<c-1&&(p[f]>=0&&(l=To({inputs:{x:l},backend:e,attrs:{axis:p[f]-(a.length-h),keepDims:!1}}),m.push(l)),h--)}for(let f of m)f!==l&&e.disposeData(f.dataId);return l}var Jn={kernelName:Ur,backendName:"webgpu",kernelFunc:Mc};var Oc=N({opType:b.ELU}),eu={kernelName:"Elu",backendName:"webgpu",kernelFunc:Oc};var Vc=o=>{let{inputs:t,backend:e}=o,{dy:i,y:r}=t,s=new le($.ELU_DER,i.shape,r.shape);return e.runWebGPUProgram(s,[i,r],i.dtype)},tu={kernelName:Mr,backendName:"webgpu",kernelFunc:Vc};var Hc=L({opType:$.EQUAL,dtype:"bool",cpuKernelImpl:fa}),ou={kernelName:Vr,backendName:"webgpu",kernelFunc:Hc};var Gc=N({opType:b.ERF}),ru={kernelName:"Erf",backendName:"webgpu",kernelFunc:Gc};var Kc=N({opType:b.EXP,cpuKernelImpl:ga,dtype:"float32"}),iu={kernelName:"Exp",backendName:"webgpu",kernelFunc:Kc};function Wt(o){let{inputs:t,attrs:e,backend:i}=o,{dim:r}=e,{input:s}=t,a=s.shape.length,n=s.shape.slice(),u=r;return r<0&&(g.assert(-(a+1)<=r,()=>`Axis must be in the interval [${-(a+1)}, ${a}]`),u=a+r+1),n.splice(u,0,1),R({inputs:{x:s},backend:i,attrs:{shape:n}})}var su={kernelName:Gr,backendName:"webgpu",kernelFunc:Wt};var Xc=N({opType:b.EXPM1,cpuKernelImpl:xa}),au={kernelName:Kr,backendName:"webgpu",kernelFunc:Xc};var Oe=class{constructor(t,e){this.variableNames=["real","imag"],this.outputShape=[],this.uniforms="exponentMultiplier : f32, denominator: f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.component=t,this.shaderKey=`fft_${t}`}getUserCode(){return`
    fn unaryOpComplex(real: f32, expR: f32, imag: f32, expI: f32) -> f32 {
      ${this.component==="real"?"return real * expR - imag * expI;":"return real * expI + imag * expR;"}
    }

    fn mulMatDFT(batch: i32, index: i32) -> f32 {
      let indexRatio = f32(index) / f32(uniforms.realShape[1]);
      let exponentMultiplierTimesIndexRatio =
          uniforms.exponentMultiplier * indexRatio;

      var result = 0.0;

      for (var i = 0; i < uniforms.realShape[1]; i = i + 1) {
        // x = (-2|2 * PI / N) * index * i;
        let x = exponentMultiplierTimesIndexRatio * f32(i);
        let expR = cos(x);
        let expI = sin(x);
        let real = getReal(batch, i);
        let imag = getImag(batch, i);

        result = result +
            unaryOpComplex(real, expR, imag, expI) / uniforms.denominator;
      }

      return result;
    }

    ${C("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        setOutputAtIndex(index, mulMatDFT(coords[0], coords[1]));
      }
    }
  `}};function Mt(o,t,e){let i=e.tensorMap.get(o.dataId),r=g.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],a=r/s,n=[],u=R({inputs:{x:o},backend:e,attrs:{shape:[a,s]}});n.push(u);let p=u.shape,d=new Oe("real",p),c=new Oe("imag",p),l=[{dataId:i.complexTensorInfos.real.dataId,dtype:i.complexTensorInfos.real.dtype,shape:p},{dataId:i.complexTensorInfos.imag.dataId,dtype:i.complexTensorInfos.imag.dtype,shape:p}],h=t?2*Math.PI:-2*Math.PI,m=t?p[1]:1,f=[{type:"float32",data:[h]},{type:"float32",data:[m]}],x=e.runWebGPUProgram(d,l,"float32",f);n.push(x);let v=e.runWebGPUProgram(c,l,"float32",f);n.push(v);let I=te({inputs:{real:x,imag:v},backend:e});n.push(I);let k=R({inputs:{x:I},backend:e,attrs:{shape:o.shape}});return n.forEach(D=>e.disposeData(D.dataId)),k}function qc(o){let{inputs:t,backend:e}=o,{input:i}=t;return Mt(i,!1,e)}var nu={kernelName:"FFT",backendName:"webgpu",kernelFunc:qc};var Ot=class{constructor(t){this.outputShape=[],this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="flipLeftRight"}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let coordX = uniforms.xShape[2] - coords[2] - 1;
          let outputValue = getX(coords[0], coords[1], coordX, coords[3]);
          setOutputAtIndex(index, outputValue);
        }
      }
    `}};var uu={kernelName:Yr,backendName:"webgpu",kernelFunc:({inputs:o,backend:t})=>{let{image:e}=o,i=t,r=new Ot(e.shape);return i.runWebGPUProgram(r,[e],e.dtype)}};var Yc=N({opType:b.FLOOR,cpuKernelImpl:Ca}),pu={kernelName:jr,backendName:"webgpu",kernelFunc:Yc};var jc=L({opType:$.FLOOR_DIV,cpuKernelImpl:ya,dtype:"int32"}),du={kernelName:Qr,backendName:"webgpu",kernelFunc:jc};var Vt=class{constructor(t,e,i=!1){this.pixelsOpType=pe.FROM_PIXELS,this.outputShape=[0],this.variableNames=[],this.workgroupSize=[256,1,1],this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[e,1,1]),this.importVideo=i,this.shaderKey=`fromPixels_${this.importVideo}`}getUserCode(){let t=this.importVideo?"textureLoad(src, vec2<i32>(coords.yx));":"textureLoad(src, vec2<i32>(coords.yx), 0)";return`
      @binding(1) @group(0) var src: ${this.importVideo?"texture_external":"texture_2d<f32>"};
      ${C("index")} {
        let flatIndex = index * uniforms.numChannels;
        if (flatIndex < uniforms.size) {
          let coords = getCoordsFromIndex(flatIndex);
          let values = ${t};
          for (var i = 0; i < uniforms.numChannels; i = i + 1) {
            result[flatIndex + i] = i32(floor(255.0 * values[i]));
          }
        }
      }
  `}};var lu={kernelName:Es,backendName:"webgpu",kernelFunc:Qc},Ne,_o=E().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function Qc(o){let{inputs:t,backend:e,attrs:i}=o,{pixels:r}=t,{numChannels:s}=i;if(r==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let a=typeof HTMLVideoElement<"u"&&r instanceof HTMLVideoElement,n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,u=typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&r instanceof OffscreenCanvas,p=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,[d,c]=a?[r.videoWidth,r.videoHeight]:[r.width,r.height],l=[c,d,s],h=E().getBool("WEBGPU_IMPORT_EXTERNAL_TEXTURE")&&a,m=a||n;if(p||u||m){let I;if(h)I=e.device.importExternalTexture({source:r});else{if(m){let K=E().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(Ne==null||K!==_o)&&(_o=K,Ne=document.createElement("canvas").getContext("2d",{willReadFrequently:_o})),Ne.canvas.width=d,Ne.canvas.height=c,Ne.drawImage(r,0,0,d,c),r=Ne.canvas}let M=GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,Y=e.textureManager.acquireTexture(l[1],l[0],"rgba8unorm",M);e.queue.copyExternalImageToTexture({source:r},{texture:Y},[l[1],l[0]]),I=Y}let k=g.sizeFromShape(l),D=g.computeStrides(l),P=new Vt(l,s,h),z=[{type:"uint32",data:[k]},{type:"uint32",data:[s]},{type:"uint32",data:[...D]}],A=e.makeTensorInfo([c,d],"int32"),_=e.tensorMap.get(A.dataId);_.resource=I;let T=e.runWebGPUProgram(P,[A],"int32",z);return e.disposeData(A.dataId),T}let f=r.data,x=f;if(s!=null&&s!==4){x=new Uint8Array(r.width*r.height*s);let I=f.length,k=0;for(let D=0;D<I;D++)D%4<s&&(x[k++]=f[D])}let v=e.makeTensorInfo(l,"int32",new Int32Array(x));return e.uploadToGPU(v.dataId),v}var Ht=class{constructor(t,e,i,r,s){this.uniforms="varianceEpsilon : f32,",this.workgroupSize=[128,1,1],this.size=!0,this.variableNames=["x","mean","variance"],S.assertAndGetBroadcastShape(t,e),S.assertAndGetBroadcastShape(t,i),this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),r!=null&&(S.assertAndGetBroadcastShape(t,r),this.variableNames.push("offset")),s!=null&&(S.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale")),this.offsetShape=r,this.scaleShape=s,this.shaderKey="batchNorm"}getUserCode(){let t="0.0";this.offsetShape!=null&&(t="getOffsetByOutputIndex(index)");let e="1.0";return this.scaleShape!=null&&(e="getScaleByOutputIndex(index)"),`
      ${C("index")} {
        if (index < uniforms.size)
        {
          let xValue = getXByOutputIndex(index);
          let meanValue = getMeanByOutputIndex(index);
          let varianValue = getVarianceByOutputIndex(index);
          let offsetValue = ${t};
          let scaleValue = ${e};
          let inv = scaleValue * inverseSqrt(varianValue + f32(uniforms.varianceEpsilon));
          setOutputAtIndex(index,dot(vec3<f32>(xValue, -meanValue, offsetValue), vec3<f32>(inv, inv, 1.0)));
        }
      }
  `}};var cu={kernelName:Zr,backendName:"webgpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{x:i,scale:r,offset:s,mean:a,variance:n}=o,{varianceEpsilon:u}=t,p=e,d=[i,a,n],c=null;s!=null&&(c=s.shape,d.push(s));let l=null;r!=null&&(l=r.shape,d.push(r));let h=new Ht(i.shape,a.shape,n.shape,c,l),m=[{type:"float32",data:[u]}];return p.runWebGPUProgram(h,d,i.dtype,m)}};function Zc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,filter:s,bias:a,preluActivationWeights:n}=t,{strides:u,pad:p,dataFormat:d,dilations:c,dimRoundingMode:l,activation:h,leakyreluAlpha:m}=i,f=S.convertConv2DDataFormat(d),x=S.computeConv2DInfo(r.shape,s.shape,u,c,p,l,!1,f);return bt({x:r,filter:s,convInfo:x,backend:e,bias:a,preluActivationWeights:n,leakyreluAlpha:m,activation:h})}var hu={kernelName:Ms,backendName:"webgpu",kernelFunc:Zc};function Jc(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,filter:s,bias:a,preluActivationWeights:n}=t,{strides:u,pad:p,dilations:d,dimRoundingMode:c,activation:l,leakyreluAlpha:h}=i,m=d;m==null&&(m=[1,1]),g.assert(S.eitherStridesOrDilationsAreOne(u,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${u} and dilations '${m}'`);let f=S.computeConv2DInfo(r.shape,s.shape,u,m,p,c,!0),x=[r,s],v=a!=null,I=n!=null;v&&x.push(a),I&&x.push(n);let k=[{type:"int32",data:[f.padInfo.top,f.padInfo.left]},{type:"int32",data:[f.inHeight,f.inWidth]}],D;return f.outHeight>4&&f.outWidth>4&&f.strideWidth<=2&&f.inChannels===f.outChannels&&f.dilationHeight===1&&f.dilationWidth===1&&f.inChannels%4===0?(D=new Pe(f,v,l,I),k.push({type:"int32",data:[D.virtualWidth]})):(D=new $e(f,v,l,I),k.push({type:"int32",data:[f.filterHeight]},{type:"int32",data:[f.filterWidth]},{type:"int32",data:[f.strideHeight,f.strideWidth]},{type:"int32",data:[f.dilationHeight,f.dilationWidth]})),l==="leakyrelu"&&(k.push({type:"float32",data:[h]}),D.uniforms+=" alpha : f32,"),e.runWebGPUProgram(D,x,"float32",k)}var mu={kernelName:Os,backendName:"webgpu",kernelFunc:Jc};var Gt=class{constructor(t,e){this.variableNames=["A","indices"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`gathernd_${t}`,this.sliceDim=t,this.uniforms=`sliceDim : i32, strides : ${B(t)},`}getUserCode(){let t;return this.sliceDim>1?t="uniforms.strides[j]":t="uniforms.strides",`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          var flattenIndex = 0;
          for (var j = 0; j < uniforms.sliceDim; j = j + 1) {
            let indexTemp = i32(round(getIndices(coords[0], j)));
            let strideNum = ${t};
            flattenIndex = flattenIndex + indexTemp * strideNum;
          }

          setOutputAtIndex(index, getA(flattenIndex, coords[1]));
        }
      }
      `}};function eh(o){let{inputs:t,backend:e}=o,{params:i,indices:r}=t,s=r.shape,a=s[s.length-1],n=g.sizeFromShape(i.shape),[u,p,d,c]=S.prepareAndValidate(i,r),l=R({inputs:{x:r},backend:e,attrs:{shape:[p,a]}}),h=R({inputs:{x:i},backend:e,attrs:{shape:[g.sizeFromShape(i.shape)/d,d]}});if(e.shouldExecuteOnCPU([i,r])||i.dtype==="string"){let I=e.readSync(r.dataId),k=e.bufferSync(i),D=Sa(I,k,i.dtype,p,a,d,c,i.shape,n);return e.makeTensorInfo(u,i.dtype,D.values)}let m=new Gt(a,[p,d]),f=[{type:"int32",data:[a]},{type:"int32",data:c}],x=e.runWebGPUProgram(m,[h,l],h.dtype,f),v=R({inputs:{x},backend:e,attrs:{shape:u}});return e.disposeData(l.dataId),e.disposeData(h.dataId),e.disposeData(x.dataId),v}var fu={kernelName:ei,backendName:"webgpu",kernelFunc:eh};var Kt=class{constructor(t,e){this.variableNames=["A","indices"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.slice(),this.aShape=t,this.outputShape=e,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="gather"}getUserCode(){let t=th(this.aShape);return`
      ${C("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          let indexZ = i32(getIndices(resRC.x, resRC.z));
          let inBounds = select(0.0, 1.0, indexZ >= 0 && indexZ < uniforms.aShape[2]);
          setOutputAtIndex(index, inBounds * getA(${t}));
        }
      }
    `}};function th(o){let t=["resRC.x","resRC.y","resRC.z","resRC.w"],e=[];for(let i=0;i<o.length;i++)i===2?e.push("indexZ"):e.push(`${t[i]}`);return e.join()}function Bo(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,indices:s}=t,{axis:a,batchDims:n}=i,u=g.parseAxisParam(a,r.shape)[0],p=S.segment_util.collectGatherOpShapeInfo(r,s,u,n),d=g.sizeFromShape(s.shape),c=[],l=R({inputs:{x:r},backend:e,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),h=R({inputs:{x:s},backend:e,attrs:{shape:[p.batchSize,d/p.batchSize]}});c.push(l),c.push(h);let m=[p.batchSize,p.outerSize,d/p.batchSize,p.sliceSize];if(e.shouldExecuteOnCPU([r,s])){let k=e.tensorMap.get(h.dataId).values,D=se(h.shape,h.dtype,k),z=e.tensorMap.get(l.dataId).values,A=se(l.shape,l.dtype,z),_=wa(A,D,m);return c.forEach(T=>e.disposeData(T.dataId)),e.makeTensorInfo(p.outputShape,_.dtype,_.values)}let f=new Kt(l.shape,m),x=e.runWebGPUProgram(f,[l,h],l.dtype);c.push(x);let v=R({inputs:{x},backend:e,attrs:{shape:p.outputShape}});return c.forEach(I=>e.disposeData(I.dataId)),v}var gu={kernelName:Jr,backendName:"webgpu",kernelFunc:Bo};var oh=L({opType:$.GREATER,cpuKernelImpl:va,dtype:"bool"}),xu={kernelName:ti,backendName:"webgpu",kernelFunc:oh};var rh=L({opType:$.GREATER_EQUAL,dtype:"bool",cpuKernelImpl:ba}),Cu={kernelName:oi,backendName:"webgpu",kernelFunc:rh};function ih(o){let{inputs:t,backend:e}=o,{input:i}=t;return Mt(i,!0,e)}var yu={kernelName:ii,backendName:"webgpu",kernelFunc:ih};var sh=N({opType:b.IS_FINITE,dtype:"bool"}),Su={kernelName:ai,backendName:"webgpu",kernelFunc:sh};var ah=N({opType:b.IS_INF,dtype:"bool"}),wu={kernelName:ni,backendName:"webgpu",kernelFunc:ah};var nh=N({opType:b.IS_NAN,dtype:"bool"}),bu={kernelName:ui,backendName:"webgpu",kernelFunc:nh};function uh(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{alpha:s}=i,a=[{type:"float32",data:[s]}],n=new Z(r.shape,b.LEAKYRELU,"alpha : f32,");return e.runWebGPUProgram(n,[r],"float32",a)}var vu={kernelName:pi,backendName:"webgpu",kernelFunc:uh};var ph=L({opType:$.LESS,dtype:"bool",cpuKernelImpl:ka}),Iu={kernelName:di,backendName:"webgpu",kernelFunc:ph};var dh=L({opType:$.LESS_EQUAL,dtype:"bool",cpuKernelImpl:Ia}),ku={kernelName:li,backendName:"webgpu",kernelFunc:dh};var Xt=class{constructor(t){this.variableNames=[],this.outputShape=[],this.uniforms="start : f32, step : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="linSpace"}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
          setOutputAtIndex(index, uniforms.start + f32(index) * uniforms.step);
        }
      }
    `}};function lh(o){let{backend:t,attrs:e}=o,{start:i,stop:r,num:s}=e,a=(r-i)/(s-1),n=new Xt(s),u=[{type:"float32",data:[i]},{type:"float32",data:[a]}];return t.runWebGPUProgram(n,[],"float32",u)}var Ru={kernelName:ci,backendName:"webgpu",kernelFunc:lh};var ch=N({opType:b.LOG,cpuKernelImpl:Ra}),Du={kernelName:"Log",backendName:"webgpu",kernelFunc:ch};var hh=N({opType:b.LOG1P}),Pu={kernelName:mi,backendName:"webgpu",kernelFunc:hh};var mh=L({opType:$.LOGICAL_AND,dtype:"bool"}),$u={kernelName:fi,backendName:"webgpu",kernelFunc:mh};var fh=N({opType:b.LOGICAL_NOT}),Nu={kernelName:gi,backendName:"webgpu",kernelFunc:fh};var gh=L({opType:$.LOGICAL_OR}),zu={kernelName:xi,backendName:"webgpu",kernelFunc:gh};var Au=`
  var powValue = 0.0;
  let basis = uniforms.bias + uniforms.alpha * sum;
  if (uniforms.beta == 0.5) {
    powValue = inverseSqrt(basis);
  } else if (uniforms.beta == 1.0) {
    powValue = 1.0 / basis;
  } else {
    powValue = exp(log(basis) * (-uniforms.beta));
  }
`,qt=class{constructor(t){this.outputShape=[],this.variableNames=["x"],this.uniforms="radius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="lrn"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let b = coords[0];
        let r = coords[1];
        let c = coords[2];
        let d = coords[3];

        let x = getX(b, r, c, d);
        var sum = 0.0;
        for (var i = -uniforms.radius; i <= uniforms.radius; i = i + 1) {
          let idx = d + i;
          if (idx >= 0 && idx < uniforms.xShape[3]) {
            let z = getX(b, r, c, idx);
            sum = sum + z * z;
          }
        }
        ${Au}

        setOutputAtIndex(index, x * powValue);
      }
    }
  `}},Yt=class{constructor(t,e){this.outputShape=[],this.variableNames=["x"],this.uniforms="radius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[256,1,1],this.maxAllowRadius=16,g.assert(e<=this.maxAllowRadius,()=>`Radius must be less than or equal to ${this.maxAllowRadius}, current radius is ${e}`),this.outputShape=t,this.elementsPerWorkgroup=this.workgroupSize[0]-2*this.maxAllowRadius,this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=y(this.dispatchLayout,this.outputShape,[this.elementsPerWorkgroup,this.workgroupSize[1],this.workgroupSize[2]]),this.shaderKey="lrn_shared"}getUserCode(){return`
    var <workgroup>lrnSub: array<f32, ${this.workgroupSize[0]}>;
    const elementsPerWorkgroup = ${this.elementsPerWorkgroup};
    const maxAllowRadius = ${this.maxAllowRadius};

    ${C()} {
      let localDepth = i32(localId.x);
      let workgroupDepth = i32(workgroupId.x) * elementsPerWorkgroup;
      let xDepth = workgroupDepth + localDepth - maxAllowRadius;
      let b = i32(globalId.z) / uniforms.xShape[1];
      let r = i32(globalId.z) - b * uniforms.xShape[1];
      let c = i32(globalId.y);
      let d = workgroupDepth + localDepth;

      var x = 0.0;
      if (xDepth >= 0 && xDepth < uniforms.xShape[3]) {
        x = getX(b, r, c, xDepth);
      }
      lrnSub[localDepth] = x;
      workgroupBarrier();

      if (localDepth < elementsPerWorkgroup && d < uniforms.outShape[3]) {
        var sum = 0.0;
        let index = localDepth + maxAllowRadius;
        for (var i = -uniforms.radius; i <= uniforms.radius; i = i + 1) {
          let z = lrnSub[index + i];
          sum = sum + z * z;
        }
        ${Au}

        setOutputAtCoords(b, r, c, d, lrnSub[index] * powValue);
      }
    } `}};function xh(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{depthRadius:s,bias:a,alpha:n,beta:u}=i,p;s>16?p=new qt(r.shape):p=new Yt(r.shape,s);let d=[{type:"int32",data:[s]},{type:"float32",data:[a]},{type:"float32",data:[n]},{type:"float32",data:[u]}];return e.runWebGPUProgram(p,[r],r.dtype,d)}var Fu={kernelName:"LRN",backendName:"webgpu",kernelFunc:xh};var jt=class{constructor(t){this.outputShape=[],this.variableNames=["inputImage","outputImage","dy"],this.uniforms="depthRadius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="lrn_grad"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let b = coords[0];
        let r = coords[1];
        let c = coords[2];

        let MIN_DEPTH_BEGIN = 0;
        let MAX_DEPTH_END = uniforms.outShape[3];
        var result = 0.0;
        for (var d = MIN_DEPTH_BEGIN; d < MAX_DEPTH_END; d++) {
          let depthBegin = max(MIN_DEPTH_BEGIN, d - uniforms.depthRadius);
          let depthEnd = min(MAX_DEPTH_END, d + uniforms.depthRadius + 1);

          var norm = 0.0;
          for (var k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; k++) {
            if (k < depthBegin) {
              continue;
            } else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            } else {
              break;
            }
          }

          norm = uniforms.alpha * norm + uniforms.bias;

          for (var k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; k++) {
            if (k < depthBegin) {
              continue;
            } else if (k >= depthBegin && k < depthEnd) {
              var dyi = -2.0 * uniforms.alpha * uniforms.beta
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d) / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * uniforms.beta);
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            } else {
              break;
            }
          }
        }

        setOutputAtIndex(index, result);
      }
    }
  `}};function Ch(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,y:s,dy:a}=t,{depthRadius:n,bias:u,alpha:p,beta:d}=i,c=new jt(r.shape),l=[{type:"int32",data:[n]},{type:"float32",data:[u]},{type:"float32",data:[p]},{type:"float32",data:[d]}];return e.runWebGPUProgram(c,[r,s,a],r.dtype,l)}var Lu={kernelName:yi,backendName:"webgpu",kernelFunc:Ch};var yh=L({opType:$.MAX,cpuKernelImpl:Pa}),Tu={kernelName:wi,backendName:"webgpu",kernelFunc:yh};function Sh(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{filterSize:s,strides:a,pad:n,dimRoundingMode:u}=i,d=S.computePool2DInfo(r.shape,s,a,1,n,u);return pt(r,d,"max",e)}var _u={kernelName:bi,backendName:"webgpu",kernelFunc:Sh};function wh(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{filterSize:s,strides:a,pad:n,dataFormat:u,dimRoundingMode:p}=i,d=[1,1,1],c=S.computePool3DInfo(r.shape,s,a,d,n,p,u),l=new me(c,"max"),h=[{type:"int32",data:[c.strideDepth,c.strideHeight,c.strideWidth]},{type:"int32",data:[c.padInfo.front,c.padInfo.top,c.padInfo.left]},{type:"int32",data:[c.inDepth,c.inHeight,c.inWidth]},{type:"int32",data:[c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth]}];return e.runWebGPUProgram(l,[r],r.dtype,h)}var Bu={kernelName:Ii,backendName:"webgpu",kernelFunc:wh};var Qt=class{constructor(t){this.variableNames=["dy","maxPos"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="maxPool2DBackprop"}getUserCode(){return`
      ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d = coords[3];

        let dyRCCorner = vec2<i32>(coords.yz) - uniforms.pads;
        let dyRCorner = dyRCCorner.x;
        let dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        let lastIndex = uniforms.filterDims[0] * uniforms.filterDims[1] - 1;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR += uniforms.dilations[0]) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims[1]; wC += uniforms.dilations[1]) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }
            let idyC = i32(dyC);

            let dyValue = getDy(batch, idyR, idyC, d);
            let maxPosValue = lastIndex - i32(getMaxPos(batch, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            let curPosValue = wR * uniforms.filterDims[1] + wC;
            let mask = select(0.0, 1.0, maxPosValue == curPosValue);
            dotProd += dyValue * mask;
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `}},Zt=class{constructor(t){this.variableNames=["dy","maxPos"],this.uniforms=`strides : vec3<i32>, pads : vec3<i32>, filterDims : vec3<i32>,
      outDepth : i32, outHeight : i32, outWidth : i32`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="maxPool3DBackprop"}getUserCode(){return`
      ${C("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let ch = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyDCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        let lastIndex = uniforms.filterDims[0] * uniforms.filterDims[1] * uniforms.filterDims[2] - 1;

        for (var wD = 0; wD < uniforms.filterDims[0]; wD++) {
          let dyD = f32(dyDCorner + wD) / f32(uniforms.strides[0]);

          if (dyD < 0.0 || dyD >= f32(uniforms.outDepth) || fract(dyD) > 0.0) {
            continue;
          }
          let idyD = i32(dyD);

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let dyValue = getDy(batch, idyD, idyR, idyC, ch);
              let maxPosValue = lastIndex - i32(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              let curPosValue = wD * uniforms.filterDims[1] * uniforms.filterDims[2] + wR * uniforms.filterDims[2] + wC;
              let mask = select(0.0, 1.0, maxPosValue == curPosValue);
              dotProd += dyValue * mask;
            }
          }
        }

        setOutputAtIndex(index, dotProd);
      }
    }
    `}};function bh(o){let{inputs:t,backend:e,attrs:i}=o,{dy:r,input:s}=t,a=s,{filterSize:n,strides:u,pad:p,dimRoundingMode:d}=i,c=[1,1,1],l=S.computePool3DInfo(a.shape,n,u,c,p,d),h=new me(l,"max",!0),m=[{type:"int32",data:[l.strideDepth,l.strideHeight,l.strideWidth]},{type:"int32",data:[l.padInfo.front,l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.inDepth,l.inHeight,l.inWidth]},{type:"int32",data:[l.effectiveFilterDepth,l.effectiveFilterHeight,l.effectiveFilterWidth]}],f=e.runWebGPUProgram(h,[a],"int32",m),x=new Zt(l);m=[{type:"int32",data:[l.strideDepth,l.strideHeight,l.strideWidth]},{type:"int32",data:[l.effectiveFilterDepth-1-l.padInfo.front,l.effectiveFilterHeight-1-l.padInfo.top,l.effectiveFilterWidth-1-l.padInfo.left]},{type:"int32",data:[l.effectiveFilterDepth,l.effectiveFilterHeight,l.effectiveFilterWidth]},{type:"int32",data:[l.outDepth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]}];let v=e.runWebGPUProgram(x,[r,f],a.dtype,m);return e.disposeData(f.dataId),v}var Eu={kernelName:ki,backendName:"webgpu",kernelFunc:bh};function vh(o){let{inputs:t,backend:e,attrs:i}=o,{dy:r,input:s,output:a}=t,n=s;Ee([s,a],"maxPoolGrad");let{filterSize:u,strides:p,pad:d,dimRoundingMode:c}=i,l=S.computePool2DInfo(n.shape,u,p,1,d,c),h=new ae(l,"max",!0),m=[{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.dilationHeight,l.dilationWidth]},{type:"int32",data:[l.inHeight,l.inWidth]},{type:"int32",data:[l.effectiveFilterHeight,l.effectiveFilterWidth]}],f=e.runWebGPUProgram(h,[n],"int32",m),x=new Qt(l);m=[{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.effectiveFilterHeight-1-l.padInfo.top,l.effectiveFilterWidth-1-l.padInfo.left]},{type:"int32",data:[l.dilationHeight,l.dilationWidth]},{type:"int32",data:[l.effectiveFilterHeight,l.effectiveFilterWidth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]}];let v=e.runWebGPUProgram(x,[r,f],n.dtype,m);return e.disposeData(f.dataId),v}var Uu={kernelName:vi,backendName:"webgpu",kernelFunc:vh};function Ih(o){let{inputs:t,backend:e,attrs:i}=o,{filterSize:r,strides:s,pad:a,includeBatchInIndex:n}=i,{x:u}=t;g.assert(u.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${u.shape.length}.`);let p=[1,1];g.assert(S.eitherStridesOrDilationsAreOne(s,p),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${p}'`);let d=S.computePool2DInfo(u.shape,r,s,p,a),c=[{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[d.inHeight,d.inWidth]},{type:"int32",data:[d.effectiveFilterHeight,d.effectiveFilterWidth]}],l=new ae(d,"max",!1),h=e.runWebGPUProgram(l,[u],u.dtype,c);l=new ae(d,"max",!0,!0,n);let m=e.runWebGPUProgram(l,[u],"int32",c);return[h,m]}var Wu={kernelName:Ri,backendName:"webgpu",kernelFunc:Ih};function kh(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{axis:s,keepDims:a}=i;return J(r,s,a,"min",e)}var Mu={kernelName:"Min",backendName:"webgpu",kernelFunc:kh};var Rh=L({opType:$.MIN,cpuKernelImpl:$a}),Ou={kernelName:$i,backendName:"webgpu",kernelFunc:Rh};var Jt=class{constructor(t,e,i){this.uniforms="",this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.map((r,s)=>r[0]+t[s]+r[1]),this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.xShape=t,e.map((r,s)=>{this.uniforms+=` pad${s} : vec2<i32>,`}),this.offset=i==="reflect"?0:1,this.shaderKey=`mirrorPad_${i}`}getUserCode(){let t=this.xShape.length,e=this.xShape.map((p,d)=>`uniforms.pad${d}[0]`).join(","),i=this.xShape.map((p,d)=>`uniforms.pad${d}[0] + uniforms.xShape${t>1?`[${d}]`:""}`).join(","),r=t===1?"start":"start[i]",s=t===1?"end":"end[i]",a=t===1?"outC":"outC[i]",n=B(t),u=t>1?["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,t):"coords";return`
      ${C("index")} {
        if (index < uniforms.size) {
          let start = ${n}(${e});
          let end = ${n}(${i});
          var outC = getCoordsFromIndex(index);
          for (var i = 0; i < ${t}; i = i + 1) {
            if (${a} < ${r}) {
              ${a} = ${r} * 2 - ${a} - ${this.offset};
            } else if(${a} >= ${s}) {
              ${a} = (${s} - 1) * 2 - ${a} + ${this.offset};
            }
          }
          let coords = outC - start;
          setOutputAtIndex(index, getX(${u}));
        }
      }
    `}};var Vu={kernelName:Ni,backendName:"webgpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{x:i}=o,{paddings:r,mode:s}=t,a=e,n=r.map(d=>({type:"int32",data:[d[0],d[1]]})),u=new Jt(i.shape,r,s);return a.runWebGPUProgram(u,[i],i.dtype,n)}};var Dh=L({opType:$.MOD}),Hu={kernelName:"Mod",backendName:"webgpu",kernelFunc:Dh};var eo=class{constructor(t,e){this.variableNames=["probs"],this.outputShape=[],this.uniforms="seed : f32, numOutcomes: i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,e],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="multinomial"}getUserCode(){return`
    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    fn random (seed : f32, resultUV : vec2<f32>) -> f32 {
      let HASHSCALE1 = 443.8975;
      let p = resultUV * seed;
      var p3  = fract(vec3<f32>(p.xyx) * HASHSCALE1);
      p3 = p3 + dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${C("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let batch = coords[0];

        let resUV = vec2<f32>(f32(coords[1]) / f32(uniforms.outShape[1]),
            f32(coords[0]) / f32(uniforms.outShape[0]));
        let r = random(uniforms.seed, resUV);
        var cdf = 0.0;
        for (var i = 0; i < uniforms.numOutcomes - 1; i = i + 1) {
          cdf = cdf + getProbs(batch, i);

          if (r < cdf) {
            setOutputAtIndexI32(index, i);
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutputAtIndexI32(index, uniforms.numOutcomes - 1);
      }
    }
  `}};var to=class{constructor(t){this.variableNames=["logits"],this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=[this.outputShape[0],1,1],this.outputShape[1]>=4096?this.workgroupSize=[256,1,1]:this.workgroupSize=[64,1,1],this.shaderKey="softmax"}getUserCode(){return`
    var<workgroup> buf : array<f32, ${this.workgroupSize[0]}>;
    var<workgroup> rowMaxShared : f32;
    var<workgroup> rowSumShared : f32;
    const blockSize = ${this.workgroupSize[0]};
    ${C("index")} {
      let row = index / blockSize;
      let tid = i32(localId.x);
      let cols = uniforms.outShape[1];

      var threadMax = -3.402823e+38f;
      for (var col = tid; col < cols; col += blockSize) {
        let value = getLogits(row, col);
        threadMax = max(threadMax, value);
      }
      if (tid < cols) {
        buf[tid] = threadMax;
      }
      workgroupBarrier();

      var reduceSize = min(cols, blockSize);
      for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
        reduceSize = currSize + (reduceSize & 1);
        if (tid < currSize) {
          buf[tid] = max(buf[tid], buf[tid + reduceSize]);
        }
        workgroupBarrier();
      }

      if (tid == 0) {
        rowMaxShared = buf[0];
      }
      workgroupBarrier();

      var threadSum = 0.0;
      for (var col = tid; col < cols; col += blockSize) {
        let subExp = exp(getLogits(row, col) - rowMaxShared);
        threadSum += subExp;
      }
      buf[tid] = threadSum;
      workgroupBarrier();

      for (var currSize = blockSize >> 1;  currSize > 0; currSize = currSize >> 1) {
        if (tid < currSize) {
          buf[tid] = buf[tid] + buf[tid + currSize];
        }
        workgroupBarrier();
      }

      if (tid == 0) {
        rowSumShared = buf[0];
      }
      workgroupBarrier();

      for (var col = tid; col < cols; col += blockSize) {
        let value = exp(getLogits(row, col) - rowMaxShared) / rowSumShared;
        setOutputAtCoords(row, col, value);
      }
  }
    `}};function Eo(o){let{inputs:t,backend:e,attrs:i}=o,{logits:r}=t,{dim:s}=i,a=R({inputs:{x:r},backend:e,attrs:{shape:[g.sizeFromShape(r.shape)/r.shape[s],r.shape[s]]}}),n=new to(a.shape),u=e.runWebGPUProgram(n,[a],r.dtype),p=R({inputs:{x:u},backend:e,attrs:{shape:r.shape}});return e.disposeData(a.dataId),e.disposeData(u.dataId),p}var Gu={kernelName:ys,backendName:"webgpu",kernelFunc:Eo};function Ph(o){let{inputs:t,backend:e,attrs:i}=o,{logits:r}=t,{numSamples:s,seed:a,normalized:n}=i,u=n?r:Eo({inputs:{logits:r},backend:e,attrs:{dim:r.shape.length-1}}),p=u.shape[0],d=u.shape[1],c=new eo(p,s),l=[{type:"float32",data:[a]},{type:"int32",data:[d]}],h=e.runWebGPUProgram(c,[u],"int32",l);return n||e.disposeData(u.dataId),h}var Ku={kernelName:Ai,backendName:"webgpu",kernelFunc:Ph};function $h(o){let{inputs:t,backend:e}=o,{x:i}=t;if(e.shouldExecuteOnCPU([i])){let s=e.tensorMap.get(i.dataId),[a,n]=za(s.values,i.shape,i.dtype);return e.makeTensorInfo(n,i.dtype,a)}let r=new Z(i.shape,b.NEG);return e.runWebGPUProgram(r,[i],i.dtype)}var Xu={kernelName:"Neg",backendName:"webgpu",kernelFunc:$h};function Nh(o){console.warn("tf.nonMaxSuppression() in webgpu locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:i}=o,{boxes:r,scores:s}=t,{maxOutputSize:a,iouThreshold:n,scoreThreshold:u}=i,p=e.readSync(r.dataId),d=e.readSync(s.dataId),{selectedIndices:c}=Xe.nonMaxSuppressionV3Impl(p,d,a,n,u);return e.makeTensorInfo([c.length],"int32",new Int32Array(c))}var qu={kernelName:_i,backendName:"webgpu",kernelFunc:Nh};function zh(o){console.warn("tf.nonMaxSuppression() in webgpu locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:i}=o,{boxes:r,scores:s}=t,{maxOutputSize:a,iouThreshold:n,scoreThreshold:u,softNmsSigma:p}=i,d=e.readSync(r.dataId),c=e.readSync(s.dataId),l=a,h=n,m=u,f=p,{selectedIndices:x,selectedScores:v}=Xe.nonMaxSuppressionV5Impl(d,c,l,h,m,f);return[e.makeTensorInfo([x.length],"int32",new Int32Array(x)),e.makeTensorInfo([v.length],"float32",new Float32Array(v))]}var Yu={kernelName:Bi,backendName:"webgpu",kernelFunc:zh};var oo=class{constructor(t,e){this.variableNames=["x"],this.uniforms="onValue : f32, offValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,e],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="onehot"}getUserCode(){return`
      ${C("index")} {
        if(index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          setOutputAtIndex(index, mix(uniforms.offValue, uniforms.onValue,
                                      f32(i32(round(getX(coords.x))) == coords.y)));
        }
      }
    `}};function Ah(o){let{inputs:t,backend:e,attrs:i}=o,{indices:r}=t,{dtype:s,depth:a,onValue:n,offValue:u}=i,p=g.sizeFromShape(r.shape),d=new oo(p,a),c=R({inputs:{x:r},backend:e,attrs:{shape:[p]}}),l=[{type:"float32",data:[n]},{type:"float32",data:[u]}],h=e.runWebGPUProgram(d,[c],s,l);e.disposeData(c.dataId);let m=[...r.shape,a],f=R({inputs:{x:h},backend:e,attrs:{shape:m}});return e.disposeData(h.dataId),f}var ju={kernelName:Ui,backendName:"webgpu",kernelFunc:Ah};function Ve(o){let{inputs:t,backend:e}=o,{x:i}=t;if(i.dtype==="complex64"){let r=ce({inputs:{input:i},backend:e}),s=Ve({inputs:{x:r},backend:e}),a=ye({inputs:{input:i},backend:e}),n=Ve({inputs:{x:a},backend:e}),u=te({inputs:{real:s,imag:n},backend:e});return e.disposeData(r.dataId),e.disposeData(s.dataId),e.disposeData(a.dataId),e.disposeData(n.dataId),u}else return U({attrs:{shape:i.shape,dtype:i.dtype,value:i.dtype==="string"?"":0},backend:e})}var Qu={kernelName:_s,backendName:"webgpu",kernelFunc:Ve};function Zu(o){let{inputs:t,backend:e}=o,{x:i}=t;if(i.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(i.dtype==="complex64"){let r=ce({inputs:{input:i},backend:e}),s=Zu({inputs:{x:r},backend:e}),a=ye({inputs:{input:i},backend:e}),n=Ve({inputs:{x:a},backend:e}),u=te({inputs:{real:s,imag:n},backend:e});return e.disposeData(r.dataId),e.disposeData(s.dataId),e.disposeData(a.dataId),e.disposeData(n.dataId),u}else return U({attrs:{shape:i.shape,dtype:i.dtype,value:1},backend:e})}var Ju={kernelName:Ei,backendName:"webgpu",kernelFunc:Zu};function Fh(o){let{inputs:t,backend:e,attrs:i}=o,{axis:r}=i;if(t.length===1)return Wt({inputs:{input:t[0]},backend:e,attrs:{dim:r}});let s=t[0].shape,a=t[0].dtype;t.forEach(d=>{g.assertShapesMatch(s,d.shape,"All tensors passed to stack must have matching shapes"),g.assert(a===d.dtype,()=>"All tensors passed to stack must have matching dtypes")});let n=[],u=t.map(d=>{let c=Wt({inputs:{input:d},backend:e,attrs:{dim:r}});return n.push(c),c}),p=Fo({inputs:u,backend:e,attrs:{axis:r}});return n.forEach(d=>e.disposeData(d.dataId)),p}var ep={kernelName:Wi,backendName:"webgpu",kernelFunc:Fh};function Uo(o,t=!1){let e=o.length,i=B(e),r=o.map((c,l)=>`uniforms.pad${l}[0]`).join(","),s=o.map((c,l)=>`uniforms.pad${l}[0] + uniforms.xShape${e>1?`[${l}]`:""}`).join(","),a=e>1?`${i}(${r})`:`${r}`,n=e>1?`${i}(${s})`:`${s}`,u=e>1?"any(paddedCoords < start)":"paddedCoords < start",p=e>1?"any(paddedCoords >= end)":"paddedCoords >= end",d=e>1?["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,e):"coords";return`
        let start = ${a};
        let end = ${n};
        if (${u} || ${p}) {
          setOutputAtIndex(index, ${t?0:"uniforms.constantValue"});
        } else {
          let coords = paddedCoords - start;
          setOutputAtIndex(index, getX(${d}));
        }
  `}var ro=class{constructor(t,e){this.variableNames=["x"],this.uniforms="constantValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.map((i,r)=>i[0]+t[r]+i[1]),this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),e.map((i,r)=>{this.uniforms+=` pad${r} : vec2<i32>,`}),this.xShape=t,this.shaderKey="pad"}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
          let paddedCoords = getCoordsFromIndex(index);
          ${Uo(this.xShape)}
        }
      }
    `}};var Lh=o=>{let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{paddings:s,constantValue:a}=i;if(s.every(p=>g.arraysEqual(p,[0,0])))return W({inputs:{x:r},backend:e});if(g.sizeFromShape(r.shape)===0){let p=s.map((d,c)=>d[0]+r.shape[c]+d[1]);return U({backend:e,attrs:{shape:p,value:a,dtype:r.dtype}})}let n=[{type:"float32",data:[a]}];s.map(p=>n.push({type:"int32",data:[p[0],p[1]]}));let u=new ro(r.shape,s);return e.runWebGPUProgram(u,[r],r.dtype,n)},tp={kernelName:Mi,backendName:"webgpu",kernelFunc:Lh};var Th=L({opType:$.POW}),op={kernelName:"Pow",backendName:"webgpu",kernelFunc:Th};function _h(o){let{inputs:t,backend:e}=o,{x:i,alpha:r}=t,s=new le($.PRELU,i.shape,r.shape);return e.runWebGPUProgram(s,[i,r],"float32")}var rp={kernelName:Vi,backendName:"webgpu",kernelFunc:_h};function Bh(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{axis:s,keepDims:a}=i;return J(r,s,a,"prod",e)}var ip={kernelName:Hi,backendName:"webgpu",kernelFunc:Bh};var Eh=o=>{let{backend:t,attrs:e}=o,{start:i,stop:r,step:s,dtype:a}=e,n=La(i,r,s,a);return t.makeTensorInfo([n.length],a,n)},sp={kernelName:Gi,backendName:"webgpu",kernelFunc:Eh};var Uh=L({opType:$.DIV}),ap={kernelName:Er,backendName:"webgpu",kernelFunc:Uh};var Wh=N({opType:b.RECIPROCAL}),np={kernelName:Xi,backendName:"webgpu",kernelFunc:Wh};var Mh=N({opType:b.RELU}),up={kernelName:qi,backendName:"webgpu",kernelFunc:Mh};var Oh=N({opType:b.RELU6}),pp={kernelName:es,backendName:"webgpu",kernelFunc:Oh};var io=class{constructor(t,e,i){this.variableNames=["x"],this.uniforms="adjustHeightWidth : vec2<f32>, halfPixelCenters : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t[0],e,i,t[3]],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="resizeBilinear"}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let d = coords[3];
          let rc = coords.yz;

          let effectiveInSize = vec2<f32>(
            f32(uniforms.xShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.xShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveOutSize = vec2<f32>(
            f32(uniforms.outShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.outShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveInputOverOutputRatioRC =
              effectiveInSize / effectiveOutSize;

          // Fractional source index
          let sourceFracIndexRC =
            (vec2<f32>(rc) + vec2<f32>(uniforms.halfPixelCenters)) *
            effectiveInputOverOutputRatioRC - vec2<f32>(uniforms.halfPixelCenters);

          // Compute the four integer indices.
          let sourceFloorRC = vec2<i32>(sourceFracIndexRC);
          let sourceCeilRC = vec2<i32>(
            min(vec2<f32>(uniforms.xShape.yz) - vec2<f32>(1.0), ceil(sourceFracIndexRC)));

          let topLeft = getX(b, sourceFloorRC.x, sourceFloorRC.y, d);
          let bottomLeft = getX(b, sourceCeilRC.x, sourceFloorRC.y, d);
          let topRight = getX(b, sourceFloorRC.x, sourceCeilRC.y, d);
          let bottomRight = getX(b, sourceCeilRC.x, sourceCeilRC.y, d);

          let fracRC = sourceFracIndexRC - vec2<f32>(sourceFloorRC);

          let top = topLeft + (topRight - topLeft) * fracRC.y;
          let bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
          let newValue = top + (bottom - top) * fracRC.x;

          setOutputAtIndex(index, newValue);
        }
      }
    `}};function Vh(o){let{inputs:t,backend:e,attrs:i}=o,{images:r}=t,{alignCorners:s,size:a,halfPixelCenters:n}=i,[u,p]=a,d=s&&u>1?1:0,c=s&&p>1?1:0,h=[{type:"float32",data:[d,c]},{type:"float32",data:[n?.5:0]}],m=new io(r.shape,u,p);return e.runWebGPUProgram(m,[r],"float32",h)}var dp={kernelName:Zi,backendName:"webgpu",kernelFunc:Vh};var so=class{constructor(t,e){this.variableNames=["dy"],this.uniforms=`effectiveXSize : vec2<i32>, effectiveYSize : vec2<i32>, heightScale : f32, widthScale : f32,
       invHeightScale : f32, invWidthScale : f32, winHeight : i32, winWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.alignCorners=e,this.shaderKey=`resizeBilinearBackprop_${e}`}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let b = coords[0];
          let d = coords[3];
          let r = coords[1];
          let c = coords[2];

          var accumulator = 0.0;

          // Compute bounds for where in dy we will look
          let startRLerp = floor(f32(r) * uniforms.invHeightScale);
          let startDyR = i32(startRLerp - f32(uniforms.winHeight / 2));

          let startCLerp = floor(f32(c) * uniforms.invWidthScale);
          let startDyC = i32(startCLerp - f32(uniforms.winWidth / 2));

          // Loop over dy
          for (var dyROffset = 0; dyROffset < uniforms.winHeight; dyROffset++) {
            let dyR = startDyR + dyROffset;

            // Guard against the window exceeding the bounds of dy
            if (dyR < 0 || dyR >= uniforms.dyShape[1]) {
              continue;
            }

            for (var dyCOffset = 0; dyCOffset < uniforms.winWidth; dyCOffset++) {
              let dyC = startDyC + dyCOffset;

              // Guard against the window exceeding the bounds of dy
              if (dyC < 0 || dyC >= uniforms.dyShape[2]) {
                continue;
              }

              let dxR = f32(dyR) * uniforms.heightScale;
              let topDxRIndex = i32(floor(dxR));
              let bottomDxRIndex = i32(min(ceil(dxR), f32(uniforms.outShape[1] - 1)));
              let dxRLerp = dxR - f32(topDxRIndex);
              let inverseDxRLerp = 1.0 - dxRLerp;

              let dxC = f32(dyC) * uniforms.widthScale;
              let leftDxCIndex = i32(floor(dxC));
              let rightDxCIndex = i32(min(ceil(dxC), f32(uniforms.outShape[2] - 1)));
              let dxCLerp = dxC - f32(leftDxCIndex);
              let inverseDxCLerp = 1.0 - dxCLerp;

              if (r == topDxRIndex && c == leftDxCIndex) {
                // topLeft
                accumulator +=
                  getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
              }

              if (r == topDxRIndex && c == rightDxCIndex) {
                // topRight
                accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
              }

              if (r == bottomDxRIndex && c == leftDxCIndex) {
                // bottomLeft
                accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
              }

              if (r == bottomDxRIndex && c == rightDxCIndex) {
                // bottomRight
                accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
              }
            }
          }
          // End loop over dy

          setOutputAtIndex(index, accumulator);
        }
      }
    `}};function Hh(o){let{inputs:t,backend:e,attrs:i}=o,{images:r,dy:s}=t,{alignCorners:a}=i,[,n,u]=r.shape,[,p,d]=s.shape,c=[a&&p>1?n-1:n,a&&d>1?u-1:u],l=[a&&p>1?p-1:p,a&&d>1?d-1:d],h=c[0]/l[0],m=c[1]/l[1],f=1/h,x=1/m,v=Math.ceil(f)*2+2,I=Math.ceil(x)*2+2,k=new so(r.shape,a),D=[{type:"int32",data:c},{type:"int32",data:l},{type:"float32",data:[h]},{type:"float32",data:[m]},{type:"float32",data:[f]},{type:"float32",data:[x]},{type:"int32",data:[v]},{type:"int32",data:[I]}];return e.runWebGPUProgram(k,[s],s.dtype,D)}var lp={kernelName:Ji,backendName:"webgpu",kernelFunc:Hh};var ao=class{constructor(t,e,i,r){this.variableNames=["x"],this.uniforms="adjustHeightWidth : vec2<f32>, roundBase : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t[0],e,i,t[3]],this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.halfPixelCenters=r,this.shaderKey=`resizeNearest_${r}`}getUserCode(){let t;return this.halfPixelCenters?t="max((vec2<f32>(rc) + vec2<f32>(0.5)) * effectiveInputOverOutputRatioRC, vec2<f32>(0.0))":t="vec2<f32>(rc) * effectiveInputOverOutputRatioRC",`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let d = coords[3];
          let rc = coords.yz;

          let effectiveInSize = vec2<f32>(
            f32(uniforms.xShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.xShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveOutSize = vec2<f32>(
            f32(uniforms.outShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.outShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveInputOverOutputRatioRC =
              effectiveInSize / effectiveOutSize;

          // Fractional source index
          let sourceFracIndexRC = ${t};

          // Compute the coordinators of nearest neighbor point.
          let inputShapeRC = vec2<f32>(f32(uniforms.xShape.y), f32(uniforms.xShape.z));
          let sourceNearestRC = vec2<i32>(
            min(inputShapeRC - 1.0, floor(sourceFracIndexRC + uniforms.roundBase)));
          let newValue = getX(b, sourceNearestRC.x, sourceNearestRC.y, d);

          setOutputAtIndex(index, newValue);
        }
      }
    `}};function Gh(o){let{inputs:t,backend:e,attrs:i}=o,{images:r}=t,{alignCorners:s,halfPixelCenters:a,size:n}=i,[u,p]=n,d=s&&u>1?1:0,c=s&&p>1?1:0,h=[{type:"float32",data:[d,c]},{type:"float32",data:[s?.5:0]}],m=new ao(r.shape,u,p,a);return e.runWebGPUProgram(m,[r],r.dtype,h)}var cp={kernelName:ji,backendName:"webgpu",kernelFunc:Gh};var no=class{constructor(t,e){this.variableNames=["dy"],this.uniforms=`effectiveXSize : vec2<i32>, effectiveYSize : vec2<i32>, invHeightScale : f32, invWidthScale : f32,
       winHeight : i32, winWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.alignCorners=e,this.shaderKey=`resizeNearestNeigborBackprop_${e}`}getUserCode(){return`
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let b = coords[0];
          let d = coords[3];
          let r = coords[1];
          let c = coords[2];

          var accumulator = 0.0;

          // Compute bounds for where in dy we will look
          let startRLerp = floor(f32(r) * uniforms.invHeightScale);
          let startDyR = i32(floor(startRLerp - f32(uniforms.winHeight / 2)));

          let startCLerp = floor(f32(c) * uniforms.invWidthScale);
          let startDyC = i32(floor(startCLerp - f32(uniforms.winWidth / 2)));

          // Loop over dy
          for (var dyROffset = 0; dyROffset < uniforms.winHeight; dyROffset++) {
            let dyR = startDyR + dyROffset;

            // Guard against the window exceeding the bounds of dy
            if (dyR < 0 || dyR >= uniforms.dyShape[1]) {
              continue;
            }

            for (var dyCOffset = 0; dyCOffset < uniforms.winWidth; dyCOffset++) {
              let dyC = startDyC + dyCOffset;

              // Guard against the window exceeding the bounds of dy
              if (dyC < 0 || dyC >= uniforms.dyShape[2]) {
                continue;
              }

              let sourceFracRow = f32(uniforms.effectiveXSize[0]) *
                  (f32(dyR) / f32(uniforms.effectiveYSize[0]));

              let sourceFracCol = f32(uniforms.effectiveXSize[1]) *
                  (f32(dyC) / f32(uniforms.effectiveYSize[1]));

              let sourceNearestRow =
                  i32(min(f32(uniforms.outShape[1] - 1),
                  ${this.alignCorners?"floor(sourceFracRow + 0.5)":"floor(sourceFracRow)"}));

              let sourceNearestCol =
                  i32(min(f32(uniforms.outShape[2] - 1),
                  ${this.alignCorners?"floor(sourceFracCol + 0.5)":"floor(sourceFracCol)"}));

              if (r == sourceNearestRow && c == sourceNearestCol) {
                accumulator += getDy(b, dyR, dyC, d);
              }
            }
          }
          // End loop over dy

          setOutputAtIndex(index, accumulator);
        }
      }
    `}};function Kh(o){let{inputs:t,backend:e,attrs:i}=o,{images:r,dy:s}=t,{alignCorners:a}=i,[,n,u]=r.shape,[,p,d]=s.shape,c=[a&&p>1?n-1:n,a&&d>1?u-1:u],l=[a&&p>1?p-1:p,a&&d>1?d-1:d],h=c[0]/l[0],m=c[1]/l[1],f=1/h,x=1/m,v=Math.ceil(f)*2+2,I=Math.ceil(x)*2+2,k=new no(r.shape,a),D=[{type:"int32",data:c},{type:"int32",data:l},{type:"float32",data:[f]},{type:"float32",data:[x]},{type:"int32",data:[v]},{type:"int32",data:[I]}];return e.runWebGPUProgram(k,[s],s.dtype,D)}var hp={kernelName:Qi,backendName:"webgpu",kernelFunc:Kh};var uo=class{constructor(t){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=" axis : vec4<i32>,",this.shaderKey="reverse"}getUserCode(){return`
      
      // Using uniform variables as judging conditions, so the function has
      // coherent execution within all threads.
      fn getReverseCoords(coords : vec4<i32>) -> vec4<i32> {
        var reverseCoords = coords;
        if (uniforms.axis[0] == 1) {
          reverseCoords[0] = uniforms.xShape[0] - coords[0] - 1;
        }
        if (uniforms.axis[1] == 1) {
          reverseCoords[1] = uniforms.xShape[1] - coords[1] - 1;
        }
        if (uniforms.axis[2] == 1) {
          reverseCoords[2] = uniforms.xShape[2] - coords[2] - 1;
        }
        if (uniforms.axis[3] == 1) {
          reverseCoords[3] = uniforms.xShape[3] - coords[3] - 1;
        }

        return reverseCoords;
      }
    
      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let reverseCoords = getReverseCoords(coords);
          setOutputAtIndex(index, getX(reverseCoords[0],
              reverseCoords[1], reverseCoords[2], reverseCoords[3]));
        }
      }
    `}};function Xh(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{dims:s}=i,a=r.shape.length;if(a===0)return W({inputs:{x:r},backend:e});let n=r.shape,u=[1,1,1,1];n.forEach((x,v)=>{let I=v+4-a;u[I]=x});let p=g.parseAxisParam(s,r.shape),d=[0,0,0,0];p.forEach(x=>{let v=x+4-a;d[v]=1});let c=[{type:"int32",data:d}],l=R({inputs:{x:r},backend:e,attrs:{shape:u}}),h=new uo(u),m=e.runWebGPUProgram(h,[l],l.dtype,c);e.disposeData(l.dataId);let f=R({inputs:{x:m},backend:e,attrs:{shape:n}});return e.disposeData(m.dataId),f}var mp={kernelName:ts,backendName:"webgpu",kernelFunc:Xh};var po=class{constructor(t,e){this.outputShape=[],this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=`centerX : f32, centerY : f32, sinRadians : f32,
          cosRadians : f32,`,this.shaderKey="rotate",this.outputShape=t,typeof e=="number"?(this.uniforms+=" fillValue : f32,",this.fillSnippet="var outputValue = uniforms.fillValue;",this.shaderKey+="_float"):(this.uniforms+=" fillValue : vec3<f32>,",this.fillSnippet="var outputValue = uniforms.fillValue[coords[3]];",this.shaderKey+="_vec3")}getUserCode(){return`
        ${C("index")} {
          if (index < uniforms.size) {
            let coords = getCoordsFromIndex(index);
            let coordXFloat = (f32(coords[2]) - uniforms.centerX) *
                uniforms.cosRadians - (f32(coords[1]) - uniforms.centerY) *
                uniforms.sinRadians;
            let coordYFloat = (f32(coords[2]) - uniforms.centerX) *
                uniforms.sinRadians + (f32(coords[1]) - uniforms.centerY) *
                uniforms.cosRadians;
            let coordX = i32(round(coordXFloat + uniforms.centerX));
            let coordY = i32(round(coordYFloat + uniforms.centerY));
            ${this.fillSnippet}
            if(coordX >= 0 && coordX < uniforms.xShape[2] && coordY >= 0 &&
                coordY < uniforms.xShape[1]) {
              outputValue = getX(coords[0], coordY, coordX, coords[3]);
            }
            setOutputAtIndex(index, outputValue);
          }
        }
      `}};var fp={kernelName:Us,backendName:"webgpu",kernelFunc:({inputs:o,attrs:t,backend:e})=>{let{image:i}=o,{radians:r,fillValue:s,center:a}=t,n=e,u=new po(i.shape,s),[p,d]=S.getImageCenter(a,i.shape[1],i.shape[2]),c=[{type:"float32",data:[p]},{type:"float32",data:[d]},{type:"float32",data:[Math.sin(r)]},{type:"float32",data:[Math.cos(r)]}];return typeof s=="number"?c.push({type:"float32",data:[Number.parseFloat(s.toFixed(2))]}):c.push({type:"float32",data:s}),n.runWebGPUProgram(u,[i],i.dtype,c)}};var qh=N({opType:b.ROUND}),gp={kernelName:os,backendName:"webgpu",kernelFunc:qh};var Yh=N({opType:b.RSQRT,cpuKernelImpl:Ta}),xp={kernelName:rs,backendName:"webgpu",kernelFunc:Yh};var ne=class{constructor(t,e,i,r,s,a,n,u=!0){this.variableNames=["updates","indices"],this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=a,this.type=n,this.sumDupeIndices=u,this.dispatchLayout=w(t),this.dispatch=y(this.dispatchLayout,t,this.workgroupSize),this.sliceDimGreaterThanOne=e>1,this.shaderKey=`scatter_${i}_${r}_${this.sliceDimGreaterThanOne}_${n}_${u}_${s.length}`;let p=B(s.length);this.uniforms=`sliceDim : i32, strides: ${p}, updatesSize: i32,`,this.updatesRank=r,this.indicesRank=i}getUserCode(){let t="";this.indicesRank===1?t="coords[0]":this.indicesRank===2&&(t="coords[0], j");let e=`getIndices(${t})`,i=this.sliceDimGreaterThanOne?"uniforms.strides[j]":"uniforms.strides",r="",s="";this.dispatchLayout.x.length===1?(r="flattenedIndex",s=`
      fn getUpdatesCoordsFromFlatIndex(index : i32) -> i32 {
        return index;
      }
      `):this.dispatchLayout.x.length===2&&(r="vec2<i32>(flattenedIndex, coords[1])",s=`
      fn getUpdatesCoordsFromFlatIndex(index : i32) -> vec2<i32> {
        // N.B. |updates| could be a scalar tensor, conceptually representing a
        // 2D tensor with all values equal to that. By design, its size must be
        // the same as |outShape[1]| in one dimension, and |indicesShape[0]|
        // gives the other.
        let sliceSize = uniforms.outShape[1];
        let d0 = index / sliceSize;
        let d1 = index - d0 * sliceSize;
        return vec2<i32>(d0, d1);
      }
      `);let n=`getUpdates(${Array.from({length:this.updatesRank},(p,d)=>`coords[${d}]`).join(", ")})`;return`
    ${s}
      ${C("index")} {
        if (index < uniforms.updatesSize) {
          let coords = getUpdatesCoordsFromFlatIndex(index);
          var flattenedIndex = 0;
          for (var j = 0; j < uniforms.sliceDim; j = j + 1) {
            let indexInside = i32(round(${e}));
            flattenedIndex = flattenedIndex + indexInside * ${i};
          }
          let updateValue =
              ${he(this.type)}(${n});
          let flatIndex = getOutputIndexFromCoords(${r});

          ${this.sumDupeIndices?j("&result[flatIndex]","updateValue",this.type):"atomicStore(&result[flatIndex], bitcast<i32>(updateValue));"}
        }
      }`}};function jh(o){let{inputs:t,backend:e,attrs:i}=o,{indices:r,updates:s}=t,{shape:a}=i,{sliceRank:n,numUpdates:u,sliceSize:p,strides:d,outputSize:c}=S.calculateShapes(s,r,a),l=[c/p,p];if(c===0)return e.makeTensorInfo(a,r.dtype);let h=R({inputs:{x:r},backend:e,attrs:{shape:[u,n]}}),m=R({inputs:{x:s},backend:e,attrs:{shape:[u,p]}}),f=m.dtype,x=U({backend:e,attrs:{shape:l,value:0,dtype:f}}),v=g.sizeFromShape(m.shape),I=[{type:"int32",data:[n]},{type:"int32",data:d},{type:"int32",data:[v]}],k=new ne(m.shape,n,h.shape.length,m.shape.length,d,l,f),D=e.runWebGPUProgram(k,[m,h],f,I,x),P=R({inputs:{x:D},backend:e,attrs:{shape:a}});return e.disposeData(h.dataId),e.disposeData(m.dataId),e.disposeData(D.dataId),P}var Cp={kernelName:is,backendName:"webgpu",kernelFunc:jh};var lo=class{constructor(t,e){this.outputShape=[],this.variableNames=["sortedSequence","values"],this.uniforms="numInputs : i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.side=e,this.shaderKey=`search_sorted_${e}`}getUserCode(){return`
      fn findBound(batch: i32, value: f32) -> i32 {
        var left = i32(0);
        var right = uniforms.numInputs;
        while (left < right) {
          var mid = (left + right) / 2;
          if (getSortedSequence(batch, mid) ${this.side==="left"?"<":"<="} value) {
            left = mid + 1;
          } else {
            right = mid;
          }
        }
        return right;
      }

      ${C("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let value = getValuesByOutputIndex(index);
          setOutputAtIndexI32(index, findBound(coords[0], value));
        }
      }
    `}};function Qh(o){let{inputs:t,backend:e,attrs:i}=o,{sortedSequence:r,values:s}=t,{side:a}=i,n=new lo([s.shape[0],s.shape[1]],a),u=[{type:"int32",data:[r.shape[1]]}];return e.runWebGPUProgram(n,[r,s],"int32",u)}var yp={kernelName:as,backendName:"webgpu",kernelFunc:Qh};var co=class{constructor(t,e,i){this.variableNames=["c","a","b"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.cRank=t,this.rank=i,this.shaderKey="select"}getUserCode(){let t,e;if(this.rank>4)throw Error(`Where for rank ${this.rank} is not yet supported`);if(this.rank===1)e="resRC",t="resRC";else{let r=["resRC.x","resRC.y","resRC.z","resRC.w"],s=[],a=[];for(let n=0;n<this.outputShape.length;n++)a.push(`${r[n]}`),n<this.cRank&&s.push(`${r[n]}`);t=s.join(),e=a.join()}return`
      ${C("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          let cVal = getC(${t});
          if (cVal >= 1.0) {
            setOutputAtIndex(index, getA(${e}));
          } else {
            setOutputAtIndex(index, getB(${e}));
          }
        }
      }
    `}};function Zh(o){let{inputs:t,backend:e}=o,{condition:i,t:r,e:s}=t,a=new co(i.shape.length,r.shape,r.shape.length);return e.runWebGPUProgram(a,[i,r,s],ue(r.dtype,s.dtype))}var Sp={kernelName:ns,backendName:"webgpu",kernelFunc:Zh};var Jh=N({opType:b.SELU}),wp={kernelName:us,backendName:"webgpu",kernelFunc:Jh};var em=N({opType:b.SIGMOID}),bp={kernelName:hs,backendName:"webgpu",kernelFunc:em};var tm=N({opType:b.SIGN}),vp={kernelName:cs,backendName:"webgpu",kernelFunc:tm};var om=N({opType:b.SIN}),Ip={kernelName:"Sin",backendName:"webgpu",kernelFunc:om};var rm=N({opType:b.SINH}),kp={kernelName:ls,backendName:"webgpu",kernelFunc:rm};var im=N({opType:b.SOFTPLUS}),Rp={kernelName:ms,backendName:"webgpu",kernelFunc:im};var ho=class{constructor(t,e,i,r,s,a){this.variableNames=["x"],this.outputShape=[],this.uniforms="",this.workgroupSize=[64,1,1],this.size=!0;let n=new Array(r.length);for(let u=0;u<n.length;u++)n[u]=r[s[u]];this.outputShape=n,this.newDim=s,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.xShape=t,this.paddedXShape=e,this.uniforms+=`reshapedPaddedXShape : ${B(r.length)}, paddedXShapeStrides : ${B(a)}, `,i.map((u,p)=>{this.uniforms+=` pad${p} : vec2<i32>,`}),this.shaderKey=`spaceToBatchND_${s}`}getUserCode(){let t=B(this.outputShape.length),e=Do(this.newDim);return`
      ${Le(this.paddedXShape,"PaddedX")}
      ${C("index")} {
        if(index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let switchedIndex = getIndexFromCoords${this.outputShape.length}D(${t}(${e}), uniforms.reshapedPaddedXShape);
          let paddedCoords = getPaddedXCoordsFromIndex(switchedIndex);
          ${Uo(this.xShape,!0)}
        }
      }
    `}};var sm=o=>{let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{blockShape:s,paddings:a}=i;g.assert(r.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGPU backend not implemented yet");let n=s.reduce((I,k)=>I*k),u=[[0,0]];u.push(...a);for(let I=1+s.length;I<r.shape.length;++I)u.push([0,0]);let p=u.map((I,k)=>I[0]+r.shape[k]+I[1]),d=S.getReshaped(p,s,n,!1),c=S.getPermuted(d.length,s.length,!1),l=S.getReshapedPermuted(p,s,n,!1),h=g.computeStrides(p),m=new ho(r.shape,p,u,d,c,h.length),f=[{type:"int32",data:d},{type:"int32",data:h}];u.map(I=>f.push({type:"int32",data:[I[0],I[1]]}));let x=e.runWebGPUProgram(m,[r],r.dtype,f),v=R({inputs:{x},backend:e,attrs:{shape:l}});return e.disposeData(x.dataId),v},Dp={kernelName:xs,backendName:"webgpu",kernelFunc:sm};var mo=class{constructor(t,e,i){this.variableNames=["input","indices","segmentIds"],this.outputShape=[],this.uniforms="segmentSize : i32, sparseSize : i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t,this.type=i,this.dispatchLayout=w([e]),this.dispatch=y(this.dispatchLayout,[e],this.workgroupSize),this.shaderKey="sparseSegmentSum"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.sparseSize) {
        let indexInSegmentIds = index / uniforms.segmentSize;
        let indexInSegment = index % uniforms.segmentSize;
        let indexInInput = indices[indexInSegmentIds];
        let segmentId = segmentIds[indexInSegmentIds];

        let value = input[indexInInput * uniforms.segmentSize + indexInSegment];
        let outIndex = segmentId * uniforms.segmentSize + indexInSegment;
        ${j("&result[outIndex]","value",this.type)}
      }
    }
  `}},fo=class{constructor(t,e){this.variableNames=["segmentIds"],this.outputShape=[],this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=[t],this.dispatchLayout=w(e),this.dispatch=y(this.dispatchLayout,e,this.workgroupSize),this.shaderKey="sparseSegmentIdCountProgram"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.segmentIdsShape) {
        let segmentId = segmentIds[index];
        ${j("&result[segmentId]","1","int32")}
      }
    }
  `}},go=class{constructor(t,e){this.variableNames=["segmentSum","sameSegmentIdCount"],this.outputShape=[],this.uniforms="segmentSize : i32",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.type=e,this.dispatchLayout=w(t),this.dispatch=y(this.dispatchLayout,t,this.workgroupSize),this.shaderKey="sparseSegmentMean"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.size) {
        let segmentId = index / uniforms.segmentSize;
        let count = sameSegmentIdCount[segmentId];
        if (count != 0) {
          ${this.type==="float32"?"setOutputAtIndex(index, segmentSum[index] / f32(count));":"setOutputAtIndexI32(index, segmentSum[index] / count);"}
        }
      }
    }
  `}};function xo(o,t,e,i=!1,r){let a=g.sizeFromShape(o.shape)/o.shape[0],n=o.dtype,u=g.sizeFromShape(t.shape),p=r.readSync(e.dataId),c=u>0?p[u-1]+1:0,l,h=o.shape.slice();h[0]=c;let m=u*a,f=U({backend:r,attrs:{shape:h,value:0,dtype:n}});l=new mo(h,m,n);let x=[{type:"int32",data:[a]},{type:"int32",data:[m]}],v=r.runWebGPUProgram(l,[o,t,e],n,x,f);if(i)return v;let I=U({backend:r,attrs:{shape:[c],value:0,dtype:"int32"}});l=new fo(c,e.shape);let k=r.runWebGPUProgram(l,[e],"int32",null,I),D=U({backend:r,attrs:{shape:h,value:0,dtype:n}});l=new go(h,n),x=[{type:"int32",data:[a]}];let P=r.runWebGPUProgram(l,[v,k],n,x,D);return r.disposeData(v.dataId),r.disposeData(k.dataId),P}function am(o){let{inputs:t,backend:e}=o,{data:i,indices:r,segmentIds:s}=t;return xo(i,r,s,!1,e)}var Pp={kernelName:Ss,backendName:"webgpu",kernelFunc:am};function nm(o){let{inputs:t,backend:e}=o,{data:i,indices:r,segmentIds:s}=t;return xo(i,r,s,!0,e)}var $p={kernelName:ws,backendName:"webgpu",kernelFunc:nm};var Co=class{constructor(t,e){this.variableNames=["A"],this.workgroupSize=[64,1,1],this.size=!0;let i=new Array(t.length);for(let r=0;r<i.length;r++)i[r]=t[r]*e[r];this.outputShape=i,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.rank=this.outputShape.length,this.shaderKey="tile"}getUserCode(){let t=um(this.rank,"uniforms.");return`
      ${C("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          setOutputAtIndex(index, getA(${t}));
        }
      }
    `}};function um(o,t=""){if(o>=5)throw Error(`Tile for rank ${o} is not yet supported`);if(o===1)return`(resRC % ${t}aShape)`;let e=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[];for(let r=0;r<o;r++)i.push(`(${e[r]} % ${t}aShape[${r}])`);return i.join()}function He(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{reps:s}=i;if(e.shouldExecuteOnCPU([r])||r.dtype==="string"||r.shape.length>=5){let u=e.readSync(r.dataId),p=r.dtype==="string"?u.map(l=>g.decodeString(l)):u,d=se(r.shape,r.dtype,p),c=Oa(d,s);return e.makeTensorInfo(c.shape,c.dtype,c.values)}let a=new Co(r.shape,s);return e.runWebGPUProgram(a,[r],r.dtype)}var Np={kernelName:Ns,backendName:"webgpu",kernelFunc:He};function pm(o){let{inputs:t,backend:e,attrs:i}=o,{sparseIndices:r,sparseValues:s,defaultValue:a}=t,{outputShape:n}=i,{sliceRank:u,numUpdates:p,sliceSize:d,strides:c,outputSize:l}=S.calculateShapes(s,r,n),h=!1;if(s.dtype==="string"){let _=e.bufferSync(r),T=e.bufferSync(s),M=g.decodeString(e.readSync(a.dataId)[0]),O=_a(_,T,n,l,d,p,u,c,M,h);return e.makeTensorInfo(n,O.dtype,O.values)}let m=[l/d,d],f=R({inputs:{x:r},backend:e,attrs:{shape:[p,u]}}),x=s.shape.length?R({inputs:{x:s},backend:e,attrs:{shape:[p,d]}}):W({inputs:{x:s},backend:e}),v=x.dtype,I=e.makeTensorInfo([],v,g.makeZerosTypedArray(1,v)),k=R({inputs:{x:a},backend:e,attrs:{shape:Array(m.length).fill(1)}}),D=He({inputs:{x:k},backend:e,attrs:{reps:m}}),P=g.sizeFromShape([p,d]),z=[{type:"int32",data:[u]},{type:"int32",data:c},{type:"int32",data:[P]}];switch(p){case 0:break;case 1:{let _=new ne([p,d],u,f.shape.length,x.shape.length,c,m,v,h);e.runWebGPUProgram(_,[x,f],v,z,D)}break;default:{let _=new ne([p,d],u,f.shape.length,I.shape.length,c,m,v,h);e.runWebGPUProgram(_,[I,f],v,z,D)}{let _=new ne([p,d],u,f.shape.length,x.shape.length,c,m,v);e.runWebGPUProgram(_,[x,f],v,z,D)}}let A=R({inputs:{x:D},backend:e,attrs:{shape:n}});return e.disposeData(f.dataId),e.disposeData(x.dataId),e.disposeData(k.dataId),e.disposeData(I.dataId),e.disposeData(D.dataId),A}var zp={kernelName:bs,backendName:"webgpu",kernelFunc:pm};function dm(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{numOrSizeSplits:s,axis:a}=i,n=g.parseAxisParam(a,r.shape)[0],u=S.prepareSplitSize(r,s,n),p=r.shape.length,d=new Array(p).fill(0),c=r.shape.slice();return u.map(l=>{let h=[...c];h[n]=l;let m=ie({inputs:{x:r},backend:e,attrs:{begin:d,size:h}});return d[n]+=l,m})}var Ap={kernelName:Cs,backendName:"webgpu",kernelFunc:dm};var lm=N({opType:b.SQRT}),Fp={kernelName:fs,backendName:"webgpu",kernelFunc:lm};var Lp={kernelName:Is,backendName:"webgpu",kernelFunc:({inputs:o,backend:t})=>{let{x:e}=o,i=t,r=new Z(e.shape,b.SQUARE);return i.runWebGPUProgram(r,[e],e.dtype)}};var cm=L({opType:$.SQUARED_DIFFERENCE}),Tp={kernelName:vs,backendName:"webgpu",kernelFunc:cm};function hm({inputs:o,attrs:t,backend:e}){let{x:i}=o,r=new Z(i.shape,b.STEP,"stepAlpha : f32,"),s=[{type:"float32",data:[t.alpha]}];return e.runWebGPUProgram(r,[i],i.dtype,s)}var _p={kernelName:Bs,backendName:"webgpu",kernelFunc:hm};var yo=class{constructor(t){this.variableNames=["x"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]);let e=B(this.outputShape.length);this.uniforms=`begin : ${e},  strides : ${e}, `,this.shaderKey="stridedSlice"}getUserCode(){let t=this.outputShape.length,e="";if(t===1)e="coords * uniforms.strides + uniforms.begin";else{let r=0;e=this.outputShape.map((s,a)=>(r++,this.outputShape.length===1?`coords * uniforms.strides[${a}] + uniforms.begin[${a}]`:`coords[${r-1}] * uniforms.strides[${a}] + uniforms.begin[${a}]`)).join(",")}return`
       ${C("index")} {
         if (index < uniforms.size) {
           let coords = getCoordsFromIndex(index);
           setOutputAtIndex(index, getX(${e}));
         }
       }
     `}};function mm(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{begin:s,end:a,strides:n,beginMask:u,endMask:p,ellipsisMask:d,newAxisMask:c,shrinkAxisMask:l}=i,{finalShapeSparse:h,finalShape:m,isIdentity:f,sliceDim0:x,isSimpleSlice:v,begin:I,end:k,strides:D}=be.sliceInfo(r.shape,s,a,n,u,p,d,c,l),P;if(f)P=R({inputs:{x:r},backend:e,attrs:{shape:m}});else if(x||v){g.assert(r.shape.length>=1,()=>`Input must have rank at least 1, got: ${r.shape.length}`);let z=be.computeOutShape(I,k,D),A=ie({inputs:{x:r},backend:e,attrs:{begin:I,size:z}});P=R({inputs:{x:A},backend:e,attrs:{shape:m}}),e.disposeData(A.dataId)}else if(e.shouldExecuteOnCPU([r])){let A=e.readSync(r.dataId),_=se(r.shape,r.dtype,A),T=Ua(h,_,D,I);P=e.makeTensorInfo(m,r.dtype,T.values)}else{let A=new yo(h),_=[{type:"int32",data:I},{type:"int32",data:D}],T=e.runWebGPUProgram(A,[r],r.dtype,_);P=R({inputs:{x:T},backend:e,attrs:{shape:m}}),e.disposeData(T.dataId)}return P}var Bp={kernelName:ks,backendName:"webgpu",kernelFunc:mm};function fm(o){let{inputs:t,backend:e,attrs:i}=o,{separator:r,nGramWidths:s,leftPad:a,rightPad:n,padWidth:u,preserveShortSequences:p}=i,{data:d,dataSplits:c}=t,l=e.readSync(d.dataId),h=e.readSync(c.dataId),[m,f]=Wa(l,h,r,s,a,n,u,p);return[e.makeTensorInfo([m.length],"string",m),e.makeTensorInfo(c.shape,"int32",f)]}var Ep={kernelName:Rs,backendName:"webgpu",kernelFunc:fm};var gm=L({opType:$.SUB,cpuKernelImpl:Ma,supportsComplex:!0}),Up={kernelName:"Sub",backendName:"webgpu",kernelFunc:gm};var xm=N({opType:b.TAN}),Wp={kernelName:"Tan",backendName:"webgpu",kernelFunc:xm};var Cm=N({opType:b.TANH}),Mp={kernelName:$s,backendName:"webgpu",kernelFunc:Cm};function ym(o){let{inputs:t,backend:e,attrs:i}=o,{tensor:r,indices:s,updates:a}=t,{}=i,{sliceRank:n,numUpdates:u,sliceSize:p,strides:d,outputSize:c}=S.calculateShapes(a,s,r.shape),l=[c/p,p];if(c===0)return e.makeTensorInfo(r.shape,s.dtype);let h=[],m=R({inputs:{x:s},backend:e,attrs:{shape:[u,n]}});h.push(m);let f=R({inputs:{x:a},backend:e,attrs:{shape:[u,p]}});h.push(f);let x=R({inputs:{x:r},backend:e,attrs:{shape:l}});h.push(x);let v=He({inputs:{x},backend:e,attrs:{reps:Array(l.length).fill(1)}}),I=new ne([u,p],n,m.shape.length,f.shape.length,d,l,r.dtype,!1),k=g.sizeFromShape([u,p]),D=[{type:"int32",data:[n]},{type:"int32",data:d},{type:"int32",data:[k]}],P=e.runWebGPUProgram(I,[f,m],x.dtype,D,v);h.push(P);let z=R({inputs:{x:P},backend:e,attrs:{shape:r.shape}});return h.forEach(A=>e.disposeData(A.dataId)),z}var Op={kernelName:ss,backendName:"webgpu",kernelFunc:ym};var So=class{constructor(t){this.variableNames=["x","indices"],this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=`inputSize : i32, firstPass : i32, negativeInf : f32,
        dir : i32, inc : i32,`,this.shaderKey="swap"}getUserCode(){return`
        ${C("index")} {
          if (index < uniforms.size) {
            let outC = getCoordsFromIndex(index);
            let batch = outC[0];
            let elemIdx = outC[1];
            // We compare elements pair-wise within a group of size 2 * inc.
            // The comparing rule for each group alternates between ascending
            // and descending. Within each group, we compare each pair at
            // positions i and i+inc. To decide whether an element at position i
            // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
            // inc, it is in the first half of the group, we denote it as x0,
            // otherwise we denote it as x1.
            // For example, as shown in the Bitonic top K paper referenced
            // above, Figure5(a) shows that element[1] is in the second half of
            // the group when group size is 2, but it is in the first half of
            // the group when group size is 4.
            let isFirstInPair = elemIdx % (2 * uniforms.inc) < uniforms.inc;
            var i = 0;
            if (isFirstInPair) {
              i = elemIdx;
            } else {
              i = elemIdx - uniforms.inc;
            }

            var i0 = 0;
            if (uniforms.firstPass == 1) {
              i0 = i;
            } else {
              i0 = i32(getIndices(batch, i));
            }

            var i1 = 0;
            if (uniforms.firstPass == 1) {
              i1 = i + uniforms.inc;
            } else {
              i1 = i32(getIndices(batch, i + uniforms.inc));
            }

            var x0 = f32(0.0);
            var x1 = f32(0.0);
            if (i0 < uniforms.inputSize) {
              x0 = getX(batch, i0);
            } else {
              x0 = uniforms.negativeInf;
            }
            if (i1 < uniforms.inputSize) {
              x1 = getX(batch, i1);
            } else {
              x1 = uniforms.negativeInf;
            }

            let reverse = elemIdx % (2 * uniforms.dir) >= uniforms.dir;
            let isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
            if (reverse == isGreater) {
              // Elements in opposite order of direction
              let iTemp = i0;
              i0 = i1;
              i1 = iTemp;
            }
            if (isFirstInPair) {
              setOutputAtIndex(index, f32(i0));
            } else {
              setOutputAtIndex(index, f32(i1));
            }
          }
        }
      `}},wo=class{constructor(t){this.variableNames=["x","indices"],this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms="inputSize : i32, firstPass : i32, k : i32,",this.shaderKey="merge"}getUserCode(){return`
        ${C("index")} {
          if (index < uniforms.size) {
            let outC = getCoordsFromIndex(index);
            let batch = outC[0];
            let elemIdx = outC[1];
            // The output size is half of the previous size.
            // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _
            // (k=4), we only need to output the indices at positions |, the
            // indices at positions _ can be thrown away, see Figure5(b) After
            // Phase 2 (Merge phase) in the Bitonic Top K paper referenced
            // above.
            // For example, the paper shows we only need to output the orange
            // bars. The output sequence should look like this | | | | | | | |.
            // Because the sequence is halved, to map the output index back to
            // the previous sequence to find the corresponding value, we need
            // to double the index. When we double the index, we basically
            // interpolate a position, so 2i looks like
            // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k
            // position of each 2k positions by - elemIdx % k. E.g. for output
            // at index 4,5,6,7, we want to get the corresponding element at
            // original index 8,9,10,11, for output at index 8,9,10,11,
            // we want to get the corresponding element at original index
            // 16,17,18,19, so on and so forth.

            var i = 0;
            if (elemIdx < uniforms.k) {
              i = elemIdx;
            } else {
              i = elemIdx * 2 - elemIdx % uniforms.k;
            }
            var i0 = 0;
            if (uniforms.firstPass == 1) {
              i0 = i;
            } else {
              i0 = i32(getIndices(batch, i));
            }
            var i1 = 0;
            if (uniforms.firstPass == 1) {
              i1 = i + uniforms.k;
            } else {
              i1 = i32(getIndices(batch, i + uniforms.k));
            }

            let x0 = getX(batch, i0);
            var x1 = f32(0.0);
            if (i1 < uniforms.inputSize) {
              x1 = getX(batch, i1);
            } else {
              x1 = x0;
            }

            if (x0 >= x1) {
              setOutputAtIndex(index, f32(i0));
            } else {
              setOutputAtIndex(index, f32(i1));
            }
          }
        }
      `}};function ze(o,t){t!==null&&o.disposeData(t.dataId)}function Vp(o){let t=1;for(;t<o;)t*=2;return t}function Sm(o){let{inputs:t,backend:e,attrs:i}=o,{x:r}=t,{k:s,sorted:a}=i,n=r.shape,u=n[n.length-1];if(e.shouldExecuteOnCPU([r])){let P=e.readSync(r.dataId),[z,A]=Va(P,n,r.dtype,s,a);return[e.makeTensorInfo(z.shape,z.dtype,z.values),e.makeTensorInfo(A.shape,A.dtype,A.values)]}if(s===0)return n[n.length-1]=0,[e.makeTensorInfo(n,r.dtype,[]),e.makeTensorInfo(n,"int32",[])];if(u===1)return[r,U({attrs:{shape:n,dtype:"int32",value:0},backend:e})];let d=g.sizeFromShape(n)/u,c=R({inputs:{x:r},attrs:{shape:[d,u]},backend:e}),l=Vp(s),h=Vp(u),m=null,f=()=>m===null?[c,c]:[c,m],x=(P,z,A)=>{let _=f(),T=new So(A),O=[{type:"int32",data:[u]},{type:"int32",data:[m===null?1:0]},{type:"float32",data:[Number.NEGATIVE_INFINITY]},{type:"int32",data:[P]},{type:"int32",data:[z]}],Y=m;m=e.runWebGPUProgram(T,_,"int32",O),ze(e,Y)};for(let P=1;P<l;P*=2){let z=P*2;for(let A=P;A>=1;A/=2)x(z,A,[d,h])}for(let P=h;P>l;P/=2){let z=f(),A=new wo([d,P/2]),T=[{type:"int32",data:[u]},{type:"int32",data:[m===null?1:0]},{type:"int32",data:[l]}],M=m;m=e.runWebGPUProgram(A,z,"int32",T),ze(e,M);let O=l/2,Y=O*2;for(let K=O;K>=1;K/=2)x(Y,K,m.shape)}let v=m;m=ie({inputs:{x:m},backend:e,attrs:{begin:0,size:[d,s]}}),ze(e,v);let I=Bo({inputs:{x:c,indices:m},backend:e,attrs:{axis:1,batchDims:1}});ze(e,c);let k=n.slice(0,-1);k.push(s),v=m,m=R({inputs:{x:m},attrs:{shape:k},backend:e}),ze(e,v);let D=I;return I=R({inputs:{x:I},attrs:{shape:k},backend:e}),ze(e,D),[I,m]}var Hp={kernelName:zs,backendName:"webgpu",kernelFunc:Sm};var bo=class{constructor(t){this.variableNames=["Image","Transforms"],this.uniforms="interpolationModeId : i32, fillModeId : i32, fillValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=w(this.outputShape),this.dispatch=y(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="transform"}getUserCode(){return`
          fn mapCoord(outCoord : f32, len : f32) -> f32{
            var inCoord = outCoord;
            if(uniforms.fillModeId == 2) {
              if (inCoord < 0.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz2 = 2.0 * len;
                  if (inCoord < sz2) {
                    inCoord = sz2 * f32(i32(f32(-inCoord / sz2))) +
                    inCoord;
                  }
                  if (inCoord < -len) {
                    inCoord = inCoord + sz2;
                  } else {
                    inCoord = -inCoord - 1.0;
                  }
                }
              } else if (inCoord > len - 1.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz2 = 2.0 * len;
                  inCoord = inCoord - sz2 * f32(i32(f32(inCoord / sz2)));
                  if (inCoord >= len) {
                    inCoord = sz2 - inCoord - 1.0;
                  }
                }
              }
              return clamp(inCoord, 0.0, len - 1.0);
            } else if (uniforms.fillModeId == 3) {
              if (inCoord < 0.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz = len - 1.0;
                  inCoord = inCoord + len * (f32(i32(f32(-inCoord / sz))) + 1.0);
                }
              } else if (inCoord > len - 1.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz = len - 1.0;
                  inCoord = inCoord - len * f32(i32(f32(inCoord / sz)));
                }
              }
              return clamp(inCoord, 0.0, len - 1.0);
            } else if (uniforms.fillModeId == 4) {
              return clamp(outCoord, 0.0, len - 1.0);
            }
            return outCoord;
          }
          fn readWithFillValue(batch : i32, coordY : i32, coordX : i32,
            channel : i32) -> f32 {
            var outputValue : f32;
            if (0 <= coordY && coordY < uniforms.imageShape[1] && 0 <= coordX && coordX < uniforms.imageShape[2]) {
                outputValue = getImage(batch, coordY, coordX, channel);
            } else {
              outputValue = uniforms.fillValue;
            }
            return outputValue;
          }

          ${C("index")} {
            if (index < uniforms.size) {
              let coords = getCoordsFromIndex(index);
              var outputValue : f32;
              let batch = coords[0];
              let x = coords[2];
              let y = coords[1];
              let channel = coords[3];
              let xf = f32(x);
              let yf = f32(y);
              let a1 = getTransforms(batch, 0);
              let a2 = getTransforms(batch, 1);
              let a3 = getTransforms(batch, 2);
              let b1 = getTransforms(batch, 3);
              let b2 = getTransforms(batch, 4);
              let b3 = getTransforms(batch, 5);
              let c1 = getTransforms(batch, 6);
              let c2 = getTransforms(batch, 7);
              let projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = uniforms.fillValue;
              } else {
                let inX = (a1 * xf + a2 * yf + a3) / projection;
                let inY = (b1 * xf + b2 * yf + b3) / projection;
                let mapX = mapCoord(inX, f32(uniforms.imageShape[2]));
                let mapY = mapCoord(inY, f32(uniforms.imageShape[1]));

                if (uniforms.interpolationModeId == 1) {
                  let coordY = i32(round(mapY));
                  let coordX = i32(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  let yFloor = floor(mapY);
                  let xFloor = floor(mapX);
                  let yCeil = yFloor + 1.0;
                  let xCeil = xFloor + 1.0;
                  let valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, i32(yFloor), i32(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, i32(yFloor), i32(xCeil), channel);
                  let valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, i32(yCeil), i32(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, i32(yCeil), i32(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutputAtIndex(index, outputValue);
            }
          }
        `}};function wm(o){let{inputs:t,backend:e,attrs:i}=o,{image:r,transforms:s}=t,{interpolation:a,fillMode:n,fillValue:u,outputShape:p}=i,[d,c,l,h]=r.shape,[m,f]=p??[c,l],x=[d,m,f,h],v=new bo(x),I=a==="nearest"?1:2,k;switch(n){case"constant":k=1;break;case"reflect":k=2;break;case"wrap":k=3;break;case"nearest":k=4;break;default:k=1;break}let D=[{type:"int32",data:[I]},{type:"int32",data:[k]},{type:"float32",data:[u]}];return e.runWebGPUProgram(v,[r,s],"float32",D)}var Gp={kernelName:As,backendName:"webgpu",kernelFunc:wm};function bm(o){let{inputs:t,backend:e,attrs:i}=o,{value:r}=t,{axis:s}=i;s<0&&(s+=r.shape.length);let a=r,n=a.shape.length,u=r.shape[s],p=new Array(n-1),d=0;for(let f=0;f<n;f++)f!==s&&(p[d++]=a.shape[f]);let c=[],l=new Array(n).fill(0),h=a.shape.slice();h[s]=1;let m=new Array(u);for(let f=0;f<m.length;f++){l[s]=f;let x=ie({inputs:{x:a},backend:e,attrs:{begin:l,size:h}}),v=R({inputs:{x},backend:e,attrs:{shape:p}});m[f]=v,c.push(x)}return c.forEach(f=>e.disposeData(f.dataId)),m}var Kp={kernelName:Ls,backendName:"webgpu",kernelFunc:bm};var vo=class{constructor(t,e,i){if(this.outputShape=[],this.variableNames=["x","segmentIds"],this.uniforms="numSegments : i32, xSize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=e,this.dispatchLayout=w(t),this.dispatch=y(this.dispatchLayout,t,this.workgroupSize),i!=="float32"&&i!=="int32")throw new Error(`UnsortedSegmentSum only supports float32 and int32
              types, does not support ${i} type.`);this.type=i,this.shaderKey="unsortedSegmentSum"}getUserCode(){return`
    ${C("index")} {
      if (index < uniforms.xSize) {
        let coords = getXCoordsFromIndex(index);
        let b = coords[0];
        let inCol = coords[1];

        let segmentId = i32(getSegmentIds(inCol));
        if (segmentId >= 0) {
          let flatIndex = b * uniforms.numSegments + segmentId % uniforms.numSegments;
          let value = getX(b, inCol);

          ${j("&result[flatIndex]","value",this.type)}
        }
      }
    }
  `}};function vm(o){let{inputs:t,backend:e,attrs:i}=o,{x:r,segmentIds:s}=t,{numSegments:a}=i,n=r.shape.length,u=[],p=0,d=S.getAxesPermutation([p],n),c=r;d!=null&&(c=q({inputs:{x:r},backend:e,attrs:{perm:d}}),u.push(c),p=S.getInnerMostAxes(1,n)[0]);let l=S.segment_util.computeOutShape(c.shape,p,a),h=g.sizeFromShape([c.shape[p]]),m=R({inputs:{x:c},backend:e,attrs:{shape:[-1,h]}});u.push(m);let f=r.dtype,x=[m.shape[0],a],v=U({backend:e,attrs:{shape:x,value:0,dtype:f}}),I=new vo(m.shape,x,f),k=[{type:"int32",data:[a]},{type:"int32",data:[g.sizeFromShape(m.shape)]}],D=e.runWebGPUProgram(I,[m,s],f,k,v),P=R({inputs:{x:D},backend:e,attrs:{shape:l}});u.push(D);let z=P;if(d!=null){u.push(P);let A=S.getUndoAxesPermutation(d);z=q({inputs:{x:z},backend:e,attrs:{perm:A}})}return u.forEach(A=>e.disposeData(A.dataId)),z}var Xp={kernelName:Ts,backendName:"webgpu",kernelFunc:vm};var Im=[ua,Ga,Ka,Xa,qa,Ya,Qa,Za,Ja,en,tn,on,rn,sn,an,pn,dn,ln,cn,hn,fn,gn,xn,wn,bn,vn,da,kn,Dn,Pn,$n,Nn,zn,An,Fn,Ln,Tn,_n,Un,Wn,Mn,On,Hn,Gn,Vn,Kn,Xn,qn,Yn,jn,Jn,eu,tu,ou,ru,iu,su,au,nu,aa,uu,lu,pu,du,cu,hu,mu,fu,gu,xu,Cu,pa,yu,Rn,Su,wu,bu,vu,Iu,ku,Ru,Pu,Du,$u,Nu,zu,Fu,Lu,nn,Tu,_u,Uu,Bu,Eu,Wu,un,Mu,Ou,Vu,Hu,Ku,Qn,Xu,qu,Yu,Cn,ju,Ju,ep,tp,op,rp,ip,sp,yn,ap,np,up,pp,na,dp,lp,cp,hp,mp,fp,gp,xp,Cp,yp,Sp,wp,bp,vp,Ip,kp,mn,_p,Bp,Ep,Gu,Rp,Dp,Pp,$p,zp,Ap,Fp,Lp,Tp,Up,Zn,Wp,Mp,Op,Np,Hp,Gp,ja,Kp,Xp,Qu];for(let o of Im)Vs(o);export{ve as WebGPUBackend,ko as webgpu_util};
//# sourceMappingURL=dist-RM2R7KLI.js.map

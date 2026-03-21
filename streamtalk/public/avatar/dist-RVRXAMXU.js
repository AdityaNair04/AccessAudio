import{$ as Tr,$a as zi,$b as Is,A as dr,Aa as ui,Ab as Ji,Ad as ae,B as lr,Ba as pi,Bb as es,C as cr,Ca as di,Cb as ts,Da as li,Db as os,Ea as ci,Eb as rs,Ec as Ks,F as hr,Fa as hi,Fb as is,G as mr,Ga as mi,Gb as ss,H as fr,Ha as fi,Hb as as,I as gr,Ia as gi,Ib as ns,J as xr,Ja as xi,Jb as us,K as Cr,Ka as Ci,Kb as ps,Kc as x,L as yr,La as yi,Lb as ds,M as Sr,Ma as Si,Mb as ls,N as wr,Nb as cs,O as br,Ob as hs,Ol as Qs,P as vr,Pb as ms,Q as Ir,Qa as wi,Qb as fs,R as kr,Ra as bi,Rb as gs,S as Rr,Sb as xs,Sc as pe,T as Dr,Ta as vi,Tb as Cs,Tc as Xs,U as Pr,Ua as Ii,Ub as ys,V as $r,Va as ki,Vb as Ss,W as Nr,Wa as Ri,Wb as ws,X as zr,Xa as Di,Xb as bs,Y as Ar,Ya as Pi,Z as Fr,Za as $i,_ as Lr,_a as Ni,_b as vs,a as Go,aa as _r,ab as Ai,ac as ks,b as Ho,ba as Br,bb as Fi,bc as Rs,ca as Er,cb as Li,cc as Ds,da as Ur,db as Ti,ea as Wr,eb as _i,ec as Ps,fa as Mr,fb as Bi,fc as $s,g as U,ga as Or,gb as Ei,ha as Vr,hb as Ui,i as Ko,ia as Gr,ic as Ns,id as Xe,ik as ve,j as Xo,ja as Hr,jb as Wi,jc as zs,k as qo,ka as Kr,kb as Mi,kc as As,l as Yo,la as Xr,lb as Oi,lc as Fs,m as jo,ma as qr,mb as Vi,mc as Ls,n as Qo,na as Yr,nb as Gi,nc as Ts,nh as js,o as Zo,oa as jr,oc as _s,p as Jo,pa as Qr,pb as Hi,q as er,qa as Zr,qb as Ki,qc as Bs,r as tr,ra as Jr,rb as Xi,rc as Es,rf as Ys,rk as w,s as or,sa as ei,sk as qe,t as rr,ta as ti,tc as Us,u as ir,ua as oi,uc as Ws,uk as g,v as sr,va as ri,vb as qi,vc as Ms,vd as qs,w as ar,wa as ii,wb as Yi,wc as Os,x as nr,xa as si,xb as ji,xc as Vs,y as ur,ya as ai,yb as Qi,yc as Gs,z as pr,za as ni,zb as Zi,zc as Hs}from"./chunk-NC2NXIRF.js";import{h as Jp,l as he}from"./chunk-YEX4KB3F.js";g();var te=U();te.registerFlag("WEBGPU_DEFERRED_SUBMIT_BATCH_SIZE",()=>15);te.registerFlag("WEBGPU_CPU_FORWARD",()=>!0);te.registerFlag("WEBGPU_MATMUL_PROGRAM_TYPE",()=>-1);te.registerFlag("WEBGPU_USE_NAIVE_CONV2D_TRANSPOSE",()=>!0);te.registerFlag("WEBGPU_USE_LOW_POWER_GPU",()=>!1);te.registerFlag("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e3);te.registerFlag("WEBGPU_USE_PROFILE_TOOL",()=>!1);te.registerFlag("WEBGPU_IMPORT_EXTERNAL_TEXTURE",()=>!0);te.registerFlag("WEBGPU_USE_NAIVE_CONV2D_DEBUG",()=>!1);te.registerFlag("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL",()=>-1);te.registerFlag("WEBGPU_CONV_SEPARATE_IM2COL_SHADER",()=>!1);te.registerFlag("WEBGPU_PRINT_SHADER",()=>"");te.registerFlag("WEBGPU_ENGINE_COMPILE_ONLY",()=>!1);g();g();var Ye=class{constructor(t){t&&(this.vendor=t.vendor,this.architecture=t.architecture,this.intelGPUGeneration=this.getIntelGPUGeneration())}getIntelGPUGeneration(){if(this.isIntel()){if(this.architecture.startsWith("gen"))return Number(this.architecture.match(/\d+/));if(this.architecture.startsWith("xe"))return 12}return 0}isIntel(){return this.vendor==="intel"}};var je=class{constructor(t){this.device=t,this.numUsedBuffers=0,this.numFreeBuffers=0,this.freeBuffers=new Map,this.usedBuffers=new Map,this.numBytesUsed=0,this.numBytesAllocated=0}acquireBuffer(t,e,i=!1,o=!0){let s,a=Zs(t,e);return o?(this.freeBuffers.has(a)||this.freeBuffers.set(a,[]),this.freeBuffers.get(a).length>0?(s=this.freeBuffers.get(a).pop(),this.numFreeBuffers--):(s=this.device.createBuffer({size:t,usage:e,mappedAtCreation:i}),this.numBytesAllocated+=t)):(s=this.device.createBuffer({size:t,usage:e,mappedAtCreation:i}),this.numBytesAllocated+=t),this.usedBuffers.has(a)||this.usedBuffers.set(a,[]),this.usedBuffers.get(a).push(s),this.numUsedBuffers++,this.numBytesUsed+=t,s}releaseBuffer(t,e=!0){if(this.freeBuffers.size===0)return;let i=t.size,o=t.usage,s=Zs(i,o),a=this.usedBuffers.get(s),n=a.indexOf(t);if(n<0)throw new Error("Cannot find the buffer in buffer manager");a[n]=a[a.length-1],a.pop(),this.numUsedBuffers--,this.numBytesUsed-=i,e?(this.freeBuffers.get(s).push(t),this.numFreeBuffers++):(t.destroy(),this.numBytesAllocated-=i)}getNumUsedBuffers(){return this.numUsedBuffers}getNumFreeBuffers(){return this.numFreeBuffers}dispose(){this.freeBuffers.forEach((t,e)=>{t.forEach(i=>{i.destroy()})}),this.usedBuffers.forEach((t,e)=>{t.forEach(i=>{i.destroy()})}),this.freeBuffers=new Map,this.usedBuffers=new Map,this.numUsedBuffers=0,this.numFreeBuffers=0,this.numBytesUsed=0,this.numBytesAllocated=0}};function Zs(r,t){return`${r}_${t}`}var Qe=class{constructor(t){this.device=t,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures=new Map,this.usedTextures=new Map,this.numBytesUsed=0,this.numBytesAllocated=0}acquireTexture(t,e,i,o){let s=ea(i),a=t*e*s,n=Js(t,e,i,o);if(this.freeTextures.has(n)||this.freeTextures.set(n,[]),this.usedTextures.has(n)||this.usedTextures.set(n,[]),this.numBytesUsed+=a,this.numUsedTextures++,this.freeTextures.get(n).length>0){this.numFreeTextures--;let p=this.freeTextures.get(n).shift();return this.usedTextures.get(n).push(p),p}this.numBytesAllocated+=a;let u=this.device.createTexture({size:[t,e],format:i,usage:o});return this.usedTextures.get(n).push(u),u}releaseTexture(t){if(this.freeTextures.size===0)return;let e=t.width,i=t.height,o=t.format,s=t.usage,a=Js(e,i,o,s);this.freeTextures.has(a)||this.freeTextures.set(a,[]),this.freeTextures.get(a).push(t),this.numFreeTextures++,this.numUsedTextures--;let n=this.usedTextures.get(a),u=n.indexOf(t);if(u<0)throw new Error("Cannot release a texture that was never provided by this texture manager");n.splice(u,1);let p=ea(o),d=e*i*p;this.numBytesUsed-=d}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){this.freeTextures.forEach((t,e)=>{t.forEach(i=>{i.destroy()})}),this.usedTextures.forEach((t,e)=>{t.forEach(i=>{i.destroy()})}),this.freeTextures=new Map,this.usedTextures=new Map,this.numUsedTextures=0,this.numFreeTextures=0,this.numBytesUsed=0,this.numBytesAllocated=0}};function Js(r,t,e,i){return`${r}_${t}_${e}_${i}`}function ea(r){if(r==="rgba8unorm")return 16;throw new Error(`${r} is not supported!`)}g();function ta(r,t){if(Math.max(...r)>5)throw new Error("Cannot symbolically compute strides for rank > 6 tensor.");let e=r.length,i="xyzwuv",o=r.map(a=>`${t}.${i[a]}`),s=new Array(e-1);s[e-2]=o[e-1];for(let a=e-3;a>=0;--a)s[a]=`(${s[a+1]} * ${o[a+1]})`;return s}var j=(r,t,e)=>e==="int32"?`atomicAdd(${r}, bitcast<i32>(${t}));`:`
          {
            var oldValue = 0;
            loop {
              let newValueF32 = bitcast<f32>(oldValue) + (${t});
              let newValue = bitcast<i32>(newValueF32);
              let res = atomicCompareExchangeWeak(${r}, oldValue, newValue);
              if res.exchanged {
                break;
              }
              oldValue = res.old_value;
            }
          }`;var fe=(function(r){return r[r.FROM_PIXELS=0]="FROM_PIXELS",r[r.DRAW=1]="DRAW",r})(fe||{}),sa=(r,t,e,i,o)=>{let s={dtype:i.dtype,shape:i.shape},a=td(e,s,t),n=r.createShaderModule({code:a,label:t.constructor.name}),u=U().get("WEBGPU_PRINT_SHADER");if(u!==""){u=u.toLowerCase();let p=u.split(",");(u==="all"||p.some(d=>t.shaderKey.toLowerCase().includes(d)))&&(console.group(t.shaderKey),console.debug(a),console.groupEnd())}return o?r.createComputePipelineAsync({compute:{module:n,entryPoint:"_start"},label:t.constructor.name,layout:"auto"}):r.createComputePipeline({compute:{module:n,entryPoint:"_start"},label:t.constructor.name,layout:"auto"})},L=(r,t="f32")=>{switch(r){case 1:return`${t}`;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${r}-component ${t} is not supported.`)}};function E(r){if(r<=1)return"i32";if(r===2)return"vec2<i32>";if(r===3)return"vec3<i32>";if(r===4)return"vec4<i32>";if(r===5)return"vec5";if(r===6)return"vec6";throw Error(`GPU for rank ${r} is not yet supported`)}function re(r){if(r===0)return"x";if(r===1)return"y";if(r===2)return"z";if(r===3)return"w";if(r===4)return"u";if(r===5)return"v";throw Error(`Index ${r} is not yet supported`)}function y(...r){let t;switch(r.length){case 0:t=`
        fn main()
      `;break;case 1:t=`
        fn main(${r[0]} : i32)
      `;break;default:throw Error("Unreachable")}return t}function oa(r,t){let e;return e=`
     ${ed(t)}
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
        ${r?"main(getGlobalIndex());":"main();"};
      }
    `,e}function ed(r){return`
  @compute @workgroup_size(${r.workgroupSize[0]}, ${r.workgroupSize[1]}, ${r.workgroupSize[2]})
`}function td(r,t,e){let i=[],o=e.workgroupSize[0]*e.workgroupSize[1]*e.workgroupSize[2];if(e.outputComponent=e.outputComponent?e.outputComponent:1,i.push(`

      var<private> localId: vec3<u32>;
      var<private> localIndex: u32;
      var<private> globalId: vec3<u32>;
      var<private> numWorkgroups: vec3<u32>;
      var<private> workgroupId: vec3<u32>;

      // Only used when the y/z dimension of workgroup size is 1.
      fn getGlobalIndex() -> i32 {
        ${na(e)?"  return i32(globalId.x);":`  return i32((workgroupId.z * numWorkgroups.x * numWorkgroups.y +
                workgroupId.y * numWorkgroups.x + workgroupId.x) * ${o}u +
                localIndex);
        `}
      }
    `),e.pixelsOpType!=null){let m=e.pixelsOpType===fe.FROM_PIXELS?`@group(0) @binding(0) var<storage, read_write> result: array<${me(t.dtype,e.outputComponent)}>;`:`@group(0) @binding(1) var<storage, read> inBuf : array<${me(r[0].dtype,e.outputComponent)}>;`,f=t.shape.length===3?"vec2<i32>":"i32";i.push(`
        struct Uniform {
          outShapeStrides : ${f},
          size            : i32,
          numChannels     : i32,
          alpha           : f32,
        };

        ${m}
        @group(0) @binding(2) var<uniform> uniforms: Uniform;
      `);let C=ia(e);return[ra,i.join(`
`),Te(t.shape),e.getUserCode(),oa(C,e)].join(`
`)}let s,a,n="struct Uniforms { NAN : f32, INFINITY : f32, ";e.variableNames.forEach((m,f)=>{let C=E(r[f].shape.length);n+=`${m.charAt(0).toLowerCase()+m.slice(1)}Shape : ${C}, `,s=r[f].shape.length-1,a=E(s),n+=`${m.charAt(0).toLowerCase()+m.slice(1)}ShapeStrides: ${a}, `});let u=E(t.shape.length);n+=`outShape : ${u}, `,s=t.shape.length-1,a=E(s),n+=`
         outShapeStrides: ${a}, `,e.size&&(n+="size : i32, "),e.uniforms&&(n+=e.uniforms),n+="};",n=pd(n),i.push(n),e.atomic?i.push(`
      @group(0) @binding(0) var<storage, read_write> result: array<atomic<i32>>;
    `):i.push(`
      @group(0) @binding(0) var<storage, read_write> result: array<${me(t.dtype,e.outputComponent)}>;
    `),e.variableNames.forEach((m,f)=>{i.push(`
      @group(0) @binding(${1+f}) var<storage, read> ${m}: array<${e.variableComponents?me(r[f].dtype,e.variableComponents[f]):me(r[f].dtype,e.outputComponent)}>;
        `)}),n!==""&&i.push(`
      @group(0) @binding(${1+e.variableNames.length}) var<uniform> uniforms: Uniforms;
      `);let p=ad(t.shape,e.dispatchLayout),d=[ra,i.join(`
`)+od,Te(t.shape),p,nd(t.shape.length)];e.atomic||d.push(ud(t.shape,t.dtype,e.outputComponent)),e.variableNames.forEach((m,f)=>{d.push(`${Te(r[f].shape,m)}`)});let l=r.map((m,f)=>sd(m,t.shape,e.variableComponents?e.variableComponents[f]:e.outputComponent,e.dispatchLayout.x.length===t.shape.length)).join(`
`);d.push(l),d.push(e.getUserCode());let c=ia(e);return d.push(oa(c,e)),d.join(`
`)}function aa(r,t,e){let i=r.shaderKey;if(r.pixelsOpType!=null)return i;let o=[],s=[];t.forEach(d=>{o.push(d.shape),s.push(d.dtype)}),o.push(e.shape),s.push(e.dtype);let a=t.map(d=>w.getBroadcastDims(d.shape,e.shape)),n=t.map(d=>x.arraysEqual(d.shape,e.shape)).join("_"),u=a.map(d=>d.join("_")).join(";"),p=na(r)?"flatDispatch":"";return i+="_"+(r.workgroupSize?r.workgroupSize.join(","):"")+o.map(d=>d.length).join(",")+s.join(",")+r.variableNames.join(",")+u+n+p,i}var ra=`
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
`,od=`
  fn isinf(val: f32) -> bool {
    return abs(val) == uniforms.INFINITY;
  }
`;function Te(r,t=""){let e=r.length,i=t!==""?`get${t.charAt(0).toUpperCase()+t.slice(1)}CoordsFromIndex`:"getCoordsFromIndex",o=t!==""?`${t.charAt(0).toLowerCase()+t.slice(1)}ShapeStrides`:"outShapeStrides";if(e<=1)return`fn ${i}(index : i32) -> i32 { return index; }`;let s=x.computeStrides(r),a=E(e),n=[];for(let p=0;p<e;p++)n.push(`d${p}`);if(s.length===1)return`    fn ${i}(index : i32) -> vec2<i32> {
      let d0 = index / uniforms.${o}; let d1 = index - d0 * uniforms.${o};
      return vec2<i32>(d0, d1);
    }`;let u;return u="var index2 = index;"+s.map((p,d)=>{let l=`let ${n[d]} = index2 / uniforms.${o}.${re(d)}`,c=d===s.length-1?`let ${n[d+1]} = index2 - ${n[d]} * uniforms.${o}.${re(d)}`:`index2 = index2 - ${n[d]} * uniforms.${o}.${re(d)}`;return`${l}; ${c};`}).join(""),`
    fn ${i}(index : i32) -> ${a} {
      ${u}
      return ${a}(${n.join(",")});
    }
  `}function rd(r,t){let e=r.name,i=r.shape.length,o=E(i),s="get"+e.charAt(0).toUpperCase()+e.slice(1),a=["d0","d1","d2","d3","d4","d5"].slice(0,i),n=a.map(d=>`${d} : i32`).join(", ");if(i<1)return`
      fn ${s}() -> ${L(t)} {
        return ${L(t)}(${e}[0]);
      }
    `;let u=`uniforms.${e.charAt(0).toLowerCase()+e.slice(1)}Shape`,p=`${i}D`;return i===0&&(p="1D"),`
    fn ${s}(${n}) -> ${L(t)} {
      return ${L(t)}(${e}[getIndexFromCoords${p}(${o}(${a.join(",")}),
        ${u})${t===1?"":` / ${t}`}]);
    }
   `}function id(r,t,e,i){let o=r.name,s=o.charAt(0).toUpperCase()+o.slice(1),a="get"+s+"ByOutput",n=r.shape.length,u=t.length,p=E(u);if(x.arraysEqual(r.shape,t)&&i)return`
    fn ${a}Index(globalIndex : i32) -> ${L(e)} {
      return ${L(e)}(${o}[globalIndex]);
    }

    fn ${a}Coords(coords : ${p}) -> ${L(e)} {
      return ${L(e)}(${o}[${u>1?"getOutputIndexFromCoords(coords)":"coords"}${e===1?"":` / ${e}`}]);
    }
    `;let d=w.getBroadcastDims(r.shape,t),l=u-n,c="";if(n===0)return`
    fn ${a}Index(globalIndex : i32) -> ${L(e)}{
      return get${s}();
    }

    fn ${a}Coords(coords : ${p}) -> ${L(e)}{
      return get${s}();
    }
  `;u<2&&d.length>=1?c="coords = 0;":c=d.map(C=>`coords.${re(C+l)} = 0;`).join(`
`);let h="";if(u<2&&n>0)h="coords";else if(u>1){let C=E(n),I=r.shape.map((k,R)=>`coords.${re(R+l)}`).join(", ");h=`${C}(${I})`}else h="coords";let m=`uniforms.${o.charAt(0).toLowerCase()+o.slice(1)}Shape`,f=`${n}D`;return`
  fn ${a}Index(globalIndex : i32) -> ${L(e)} {
    var coords = getCoordsFromIndex(globalIndex);
    ${c}
    return ${L(e)}(${o}[getIndexFromCoords${f}(${h}, ${m})${e===1?"":` / ${e}`}]);
  }

  fn ${a}Coords(coordsIn : ${p}) -> ${L(e)} {
    var coords = coordsIn;
    ${c}
    return ${L(e)}(${o}[getIndexFromCoords${f}(${h}, ${m})${e===1?"":` / ${e}`}]);
  }
`}function sd(r,t,e,i){let o=rd(r,e);return r.shape.length<=t.length&&(o+=id(r,t,e,i)),o}function ad(r,t){let{x:e,y:i=[],z:o=[]}=t,s=r.length,a=e.length+i.length+o.length;if(a!==s)return"";if(e.length===s)return`fn getOutputCoords() -> ${E(s)}{
    let globalIndex = getGlobalIndex();
    return getCoordsFromIndex(globalIndex);
  }
  `;let n="",u=[e,i,o];for(let c=0;c<u.length;c++){let h=u[c];if(h.length!==0)if(h.length===1)n+=`let d${h[0]} = i32(globalId[${c}]);`;else{let m=ta(h,"uniforms.outShape");n+=`var index${c} = i32(globalId[${c}]);`;for(let f=0;f<m.length;f++)n+=`let d${h[f]} = index${c} / ${m[f]};`,f===m.length-1?n+=`let d${h[f+1]} = index${c} - d${h[f]} * ${m[f]};`:n+=`index${c} = index${c} - d${h[f]} * ${m[f]};`}}let p=[];for(let c=0;c<a;c++)p.push(`d${c}`);let d=E(a),l=`fn getOutputCoords() -> ${d} {
  ${n}
`;return p.length===0?l+=`return ${d}(0); }`:l+=`return ${d}(${p.join(",")}); }`,l}function nd(r){let t="";switch(r){case 0:case 1:t+=`
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
        `;break;default:x.assert(!1,()=>`Unsupported ${r}D shape`);break}return t}function na(r){return r.dispatch[1]===1&&r.dispatch[2]===1}function me(r,t=1){if(r==="float32")return L(t,"f32");if(r==="int32"||r==="bool")return L(t,"i32");throw new Error(`type ${r} is not supported.`)}function ud(r,t,e){let i=r.length,o=me(t,e),s=`fn setOutputAtIndex(flatIndex : i32, value : ${L(e)}) {
      result[flatIndex] = ${o}(value);
    }

    fn setOutputAtIndexI32(flatIndex : i32, value : ${L(e,"i32")}) {
      result[flatIndex] = ${o}(value);
    }
    `;if(i>=2){let a=["d0","d1","d2","d3","d4","d5"].slice(0,i),n=E(i);s+=`
      fn setOutputAtCoords(${a.map(u=>`${u} : i32`).join(", ")}, value : ${L(e)}) {
        let flatIndex = getOutputIndexFromCoords(${n}(${a.join(", ")}));
        setOutputAtIndex(flatIndex${e===1?"":` / ${e}`}, value);
      }
      fn setOutputAtCoordsI32(${a.map(u=>`${u} : i32`).join(", ")}, value : ${L(e,"i32")}) {
        let flatIndex = getOutputIndexFromCoords(${n}(${a.join(", ")}));
        setOutputAtIndexI32(flatIndex${e===1?"":` / ${e}`}, value);
      }
    `}return s}function pd(r){let t=/(\w+)\s*:\s*vec(5|6)/g;r=r.replace(t,i=>"@align(16) "+i);let e=/vec(5|6)\s*,\s*(\w+)/g;return r=r.replace(e,(i,o,s)=>`vec${o}, @align(16) ${s}`),r}function ia(r){return!(r.dispatchLayout.hasOwnProperty("y")&&r.dispatchLayout.y.length!==0||r.dispatchLayout.hasOwnProperty("z")&&r.dispatchLayout.z.length!==0)}var Do={};Jp(Do,{GPUBytesPerElement:()=>Ze,MatMulProgramType:()=>ie,assertNotComplex:()=>Ue,computeDispatch:()=>S,computeWorkPerThreadForConv2d:()=>Be,computeWorkgroupInfoForMatMul:()=>Ro,computeWorkgroupSizeForConv2d:()=>_e,flatDispatchLayout:()=>b,isWebGPUSupported:()=>Ee,tilesFitEvenlyIntoShape:()=>ld});g();var xe=r=>{let t=1;for(let e=0;e<r.length;e++)t*=r[e];return t};function ld(r,t){if(r.length!==t.length)throw new Error(`Cannot compute whether rank ${r.length} tiles fit evenly into rank ${t.length} shape - ranks must match.`);return t.every((e,i)=>e%r[i]===0)}function S(r,t,e=[1,1,1],i=[1,1,1]){let[o,s,a]=[Math.ceil(xe(r.x.map(n=>t[n]))/(e[0]*i[0])),r.y?Math.ceil(xe(r.y.map(n=>t[n]))/(e[1]*i[1])):1,r.z?Math.ceil(xe(r.z.map(n=>t[n]))/(e[2]*i[2])):1];return[o,s,a]}function Ro(r,t,e,i=!1){let o=[8,8,1],s=[4,4,1];return i||(r<=8&&(s[1]=1),t<=16&&e<=16&&(o[0]=4)),{workgroupSize:o,elementsPerThread:s}}function _e(r,t,e=!1){if(e)return[8,8,1];let i=xe(r.x.map(s=>t[s])),o=xe(r.y.map(s=>t[s]));return i<=4?[4,16,1]:o<=4?[16,4,1]:[16,16,1]}function Be(r,t,e=!1){if(e)return[4,4,1];let i=xe(r.x.map(s=>t[s])),o=xe(r.y.map(s=>t[s]));return i<=4?[1,2,1]:o<=4?[2,1,1]:[2,2,1]}function b(r){return{x:r.map((t,e)=>e)}}function Ze(r){if(r==="float32"||r==="int32"||r==="bool"||r==="string")return 4;if(r==="complex64")return 8;throw new Error(`Unknown dtype ${r}`)}function Ee(){return!!(typeof globalThis<"u"&&globalThis.navigator&&globalThis.navigator.gpu)}function Ue(r,t){Array.isArray(r)||(r=[r]),r.forEach(e=>{e!=null&&x.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the WebGPU backend.`)})}var ie=(function(r){return r[r.MatMulReduceProgram=0]="MatMulReduceProgram",r[r.MatMulSplitKProgram=1]="MatMulSplitKProgram",r[r.MatMulSmallOutputSizeProgram=2]="MatMulSmallOutputSizeProgram",r[r.MatMulPackedProgram=3]="MatMulPackedProgram",r[r.MatMulMax=4]="MatMulMax",r})(ie||{});var cd=U().getNumber("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD"),hd=(r,t)=>{let e=r.limits.maxComputeWorkgroupsPerDimension,i=t.dispatchLayout,o=t.dispatch;if(o.every(a=>a<=e))return o;x.assert(o[0]>e&&i.y===void 0&&i.z===void 0,()=>"Dispatch size exceeds WebGPU limits in Y or Z dimension.");let s=Math.ceil(Math.sqrt(o[0]));return s>e?(s=Math.ceil(Math.cbrt(o[0])),x.assert(s<=e,()=>"Total dispatch size exceeds WebGPU maximum."),[s,s,s]):[s,s,1]},Po=(()=>{class r extends Ho{nextDataId(){return r.nextDataId++}constructor(e,i){if(super(),this.commandQueueOwnedIds=new WeakSet,this.dispatchCountInPass=0,this.disposed=!1,this.downloadWaitMs=0,this.tensorDataPendingDisposal=[],this.queryResolveBuffer=null,this.querySet=null,this.querySetCount=2,this.stagingPendingDisposal=[],this.uniformPendingDisposal=[],this.uploadWaitMs=0,this.hasReadSyncWarned=!1,this.hasTimestampQueryWarned=!1,!Ee())throw new Error("WebGPU is not supported on this device");this.pipelineCache={},this.device=e,this.queue=e.queue,this.commandEncoder=null,this.computePassEncoder=null,this.adapterInfo=new Ye(i),this.supportTimestampQuery=this.device.features.has("timestamp-query"),this.thresholdToIncreaseWorkgroups=this.adapterInfo.intelGPUGeneration>=12?16:8,this.bufferManager=new je(this.device),this.textureManager=new Qe(this.device),this.tensorMap=new Go(this,Xe()),U().getBool("WEBGPU_USE_PROFILE_TOOL")&&(this.dummyCanvas=document.createElement("canvas"),this.dummyCanvas.width=1,this.dummyCanvas.height=1,this.dummyContext=this.dummyCanvas.getContext("webgpu"),this.dummyContext.configure({device:e,format:"bgra8unorm"}),document.body.appendChild(this.dummyCanvas))}floatPrecision(){return 32}disposeData(e,i=!1){if(!this.tensorMap.has(e))return!0;let o=this.tensorMap.get(e);return i?o.refCount=0:o.refCount--,o.refCount>0?!1:(o.complexTensorInfos!=null&&(this.disposeData(o.complexTensorInfos.real.dataId),this.disposeData(o.complexTensorInfos.imag.dataId)),this.commandQueueOwnedIds.has(e)?(this.tensorDataPendingDisposal.push(e),!0):(this.releaseResource(e),this.tensorMap.delete(e),!0))}memory(){return{numBytesInGPU:this.bufferManager.numBytesUsed,numBytesAllocatedInGPU:this.bufferManager.numBytesAllocated,unreliable:!1}}releaseResource(e){let i=this.tensorMap.get(e);if(!(!i||!i.resource)){if(i.external){i.resource=null;return}i.resource instanceof GPUBuffer?this.bufferManager.releaseBuffer(i.resource):i.resource instanceof GPUTexture&&this.textureManager.releaseTexture(i.resource),i.resource=null}}refCount(e){return this.tensorMap.has(e)?this.tensorMap.get(e).refCount:0}incRef(e){let i=this.tensorMap.get(e);i.refCount++}decRef(e){if(this.tensorMap.has(e)){let i=this.tensorMap.get(e);i.refCount--}}write(e,i,o){if(o==="complex64"&&e!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let s={id:this.nextDataId()};return this.tensorMap.set(s,{dtype:o,shape:i,values:e,refCount:1}),s}move(e,i,o,s,a){if(s==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.tensorMap.set(e,{dtype:s,shape:o,values:i,refCount:a})}submitQueue(){this.queue.submit([this.commandEncoder.finish()]),this.commandEncoder=null,this.dispatchCountInPass=0,this.commandQueueOwnedIds=new WeakSet,this.tensorDataPendingDisposal.forEach(e=>{this.releaseResource(e),this.tensorMap.delete(e)}),this.uniformPendingDisposal.forEach(e=>this.bufferManager.releaseBuffer(e)),this.stagingPendingDisposal.forEach(e=>this.bufferManager.releaseBuffer(e,!1)),this.tensorDataPendingDisposal=[],this.uniformPendingDisposal=[],this.stagingPendingDisposal=[]}ensureCommandEncoderReady(){this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder())}endComputePassEncoder(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}checkCompileCompletionAsync(){return he(this,null,function*(){let e;try{e=yield Promise.all(Object.values(this.pipelineCache))}catch(i){throw new Error(i.message)}Object.keys(this.pipelineCache).map((i,o)=>{this.pipelineCache[i]=e[o]})})}getBufferData(e){return he(this,null,function*(){if(U().getBool("WEBGPU_ENGINE_COMPILE_ONLY"))return console.warn("The data may be invalid since WEBGPU_ENGINE_COMPILE_ONLY is true, this can only be called when WEBGPU_ENGINE_COMPILE_ONLY is false"),null;let i=e.size,o=this.bufferManager.acquireBuffer(i,GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ);this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(e,0,o,0,i),this.submitQueue(),yield o.mapAsync(GPUMapMode.READ);let s=o.getMappedRange().slice(0);return o.unmap(),o!=null&&this.bufferManager.releaseBuffer(o),U().getBool("WEBGPU_USE_PROFILE_TOOL")&&(x.assert(this.dummyContext!==void 0,()=>"Fail to get context for profiling tool"),this.dummyContext.getCurrentTexture()),s})}convertAndCacheOnCPU(e,i){let o=this.tensorMap.get(e);return o.values=i,o.values}readSync(e){let i=this.tensorMap.get(e),{values:o,complexTensorInfos:s}=i;if(o!=null||i.dtype==="string")return o;if(i.dtype==="complex64"){let C=this.readSync(s.real.dataId),I=this.readSync(s.imag.dataId),k=x.convertBackendValuesAndArrayBuffer(w.mergeRealAndImagArrays(C,I).buffer,"float32");return this.convertAndCacheOnCPU(e,k),k}this.hasReadSyncWarned||(this.hasReadSyncWarned=!0,console.warn("The performance of synchronously reading data from GPU to CPU is poor on the webgpu backend, please use asynchronous APIs instead."));let a=["opaque","premultiplied"],n=i.resource,u=n.size;x.assert(u%4===0,()=>"Because there is 4 bytes for one pixel, buffer size must be multiple of 4.");let p=u/4,d=new ArrayBuffer(u),l=256,c=256,h=a.map(C=>new OffscreenCanvas(l,c)),m=new OffscreenCanvas(l,c);this.endComputePassEncoder(),h.map((C,I)=>{let k=C.getContext("webgpu");return k.configure({device:this.device,format:"bgra8unorm",usage:GPUTextureUsage.COPY_DST,alphaMode:a[I]}),k.getCurrentTexture()}).map((C,I)=>{let k=l*4,R=(T,V,G)=>{this.ensureCommandEncoderReady(),this.commandEncoder.copyBufferToTexture({buffer:n,bytesPerRow:k,offset:G},{texture:C},{width:T,height:V}),this.submitQueue();let Y=m.getContext("2d",{willReadFrequently:!0});Y.clearRect(0,0,T,V),Y.drawImage(h[I],0,0);let H=Y.getImageData(0,0,T,V).data,q=a[I],ee=new Uint8ClampedArray(d,G,T*V*4);for(let M=0;M<ee.length;M+=4)if(q==="premultiplied")ee[M+3]=H[M+3];else{let ko=H[M];ee[M]=H[M+2],ee[M+1]=H[M+1],ee[M+2]=ko}},P=Math.floor(p/(l*c)),$=l,A=c,F=0;for(let T=0;T<P;T++)R($,A,F),F+=l*c*4;let B=p%(l*c);A=Math.floor(B/l),A>0&&(R($,A,F),F+=A*(l*4)),$=B%l,$>0&&R($,1,F)});let f=x.convertBackendValuesAndArrayBuffer(d,i.dtype);return this.convertAndCacheOnCPU(e,f),f}read(e){return he(this,null,function*(){if(!this.tensorMap.has(e))throw new Error(`Tensor ${e} was not registered!`);let i=this.tensorMap.get(e),{values:o}=i;if(o!=null)return o;let s;if(i.dtype==="complex64"){let a=yield Promise.all([this.read(i.complexTensorInfos.real.dataId),this.read(i.complexTensorInfos.imag.dataId)]),n=a[0],u=a[1];s=w.mergeRealAndImagArrays(n,u)}else{let a=yield this.getBufferData(i.resource);s=x.convertBackendValuesAndArrayBuffer(a,i.dtype)}return this.convertAndCacheOnCPU(e,s),s})}copyBuffer(e){let i=e.size,o=e.usage,s=this.bufferManager.acquireBuffer(i,o);return this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(e,0,s,0,i),this.submitQueue(),s}createTensorFromGPUData(e,i,o){let s=e.buffer;if(o==="complex64")throw new Error("Cannot write to a complex64 dtype. ");let a={id:this.nextDataId()};this.tensorMap.set(a,{dtype:o,shape:i,values:null,refCount:1,external:e.zeroCopy});let n=this.tensorMap.get(a),u=Ze(n.dtype)*x.sizeFromShape(n.shape);if(e.buffer.size<u)throw new Error(`GPUBuffer size(${e.buffer.size}) is smaller than tensor size(${u})!`);if((e.buffer.usage&(GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC))!==(GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC))throw new Error("GPUBuffer.usage should include GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC!");return e.zeroCopy!==!0&&(s=this.copyBuffer(s)),n.resource=s,Xe().makeTensorFromDataId(a,i,o,this)}readToGPU(e){let i=this.tensorMap.get(e),{values:o,dtype:s,shape:a,resource:n}=i;if(s==="complex64")throw new Error("Does not support reading buffer for complex64 dtype.");if(n==null)throw o!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");let u=n,p=u.size,d=u.usage,l=this.bufferManager.acquireBuffer(p,d);this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(n,0,l,0,p),this.submitQueue();let c=this.makeTensorInfo(a,s),h=Xe().makeTensorFromTensorInfo(c),m=this.tensorMap.get(c.dataId);return m.resource=l,{tensorRef:h,buffer:l}}bufferSync(e){let i=this.readSync(e.dataId);if(e.dtype==="string")try{let o=i.map(s=>x.decodeString(s));return ae(e.shape,e.dtype,o)}catch(o){throw new Error("Failed to decode encoded string bytes into utf-8")}return ae(e.shape,e.dtype,i)}time(e){return he(this,null,function*(){!this.supportTimestampQuery&&!this.hasTimestampQueryWarned&&(console.warn("This device doesn't support timestamp-query extension. Start Chrome browser with flag --enable-dawn-features=allow_unsafe_apis to try it again. Otherwise, zero will be shown for the kernel time when profiling mode is enabled."),this.hasTimestampQueryWarned=!0);let i=this.activeTimers,o=[],s=!1;this.programTimersStack==null?(this.programTimersStack=o,s=!0):this.activeTimers.push(o),this.activeTimers=o,e();let a=x.flatten(this.activeTimers.map(d=>d.query)).filter(d=>d!=null),n=x.flatten(this.activeTimers.map(d=>d.name)).filter(d=>d!=null);this.activeTimers=i,s&&(this.programTimersStack=null);let u={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},p=yield Promise.all(a);return u.kernelMs=x.sum(p),u.getExtraProfileInfo=()=>p.map((d,l)=>({name:n[l],ms:d})).map(d=>`${d.name}: ${d.ms}`).join(", "),this.uploadWaitMs=0,this.downloadWaitMs=0,u})}makeTensorInfo(e,i,o){return i==="string"&&o!=null&&o.length>0&&x.isString(o[0])&&(o=o.map(a=>x.encodeString(a))),{dataId:this.write(o,e,i),shape:e,dtype:i}}tensorToBinding(e){if(!e)return null;let o=this.tensorMap.get(e.dataId).resource;return o instanceof GPUBuffer?{buffer:o}:o instanceof GPUTexture?o.createView():o}uploadToGPU(e){let i=this.tensorMap.get(e);if(i.resource!=null)return;let o=Ze(i.dtype)*x.sizeFromShape(i.shape),s,a=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST;if(i.values){if(s=this.bufferManager.acquireBuffer(o,a,!0),s.mapState==="unmapped"){let n=this.bufferManager.acquireBuffer(o,GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC,!0,!1),u=n.getMappedRange();i.dtype==="int32"||i.dtype==="bool"?new Int32Array(u).set(i.values):new Float32Array(u).set(i.values),n.unmap(),this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(n,0,s,0,o),this.stagingPendingDisposal.push(n)}else{let n=s.getMappedRange();i.dtype==="int32"||i.dtype==="bool"?new Int32Array(n).set(i.values):new Float32Array(n).set(i.values),s.unmap()}i.values=null}else s=this.bufferManager.acquireBuffer(o,a);i.resource=s}makeUniforms(e){let i=0,o=0,s=[],a=1;e.forEach(p=>{p.data.length===0&&(p.data=[1]);let d;switch(p.data.length){case 1:d=4;break;case 2:d=8;break;case 3:d=16;break;case 4:d=16;break;case 5:d=16;break;case 6:d=16;break;default:x.assert(!1,()=>`Unsupported ${p.data.length}D shape`)}(o===5||o===6)&&(d=16),d>a&&(a=d),i=Math.ceil(i/d)*d,o=p.data.length,s.push(i),i+=p.data.length*4}),i=Math.ceil(i/a)*a;let n=new ArrayBuffer(i);e.forEach((p,d)=>{let l=s[d];p.type==="int32"?new Int32Array(n,l,p.data.length).set(p.data):p.type==="uint32"?new Uint32Array(n,l,p.data.length).set(p.data):new Float32Array(n,l,p.data.length).set(p.data)});let u=this.bufferManager.acquireBuffer(i,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);return this.queue.writeBuffer(u,0,n,0,i),this.uniformPendingDisposal.push(u),{offset:0,size:i,buffer:u}}runWebGPUProgram(e,i,o,s,a){if(a||(a=this.makeTensorInfo(e.outputShape,o)),x.sizeFromShape(a.shape)===0)return this.tensorMap.get(a.dataId).values=x.getTypedArrayFromDType(a.dtype,0),a;this.uploadToGPU(a.dataId),e.dispatch=hd(this.device,e);let n=i.map((p,d)=>{if(p.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");return this.uploadToGPU(p.dataId),{dtype:this.tensorMap.get(p.dataId).dtype,shape:p.shape,name:e.variableNames[d]}});e.shaderKey=aa(e,n,a);let u=U().getBool("WEBGPU_ENGINE_COMPILE_ONLY");return e.shaderKey in this.pipelineCache||(this.pipelineCache[e.shaderKey]=sa(this.device,e,n,a,u)),e.pipeline=this.pipelineCache[e.shaderKey],u||this.recordAndSubmit(e,a,i,s),a}recordAndSubmit(e,i,o,s){if(e.pipeline instanceof Promise)throw new Error("Please call checkCompileCompletionAsync to ensure parallel compilation is done!");let a=[],n=[],u="int32";if(e.pixelsOpType==null){a.push({type:"float32",data:[NaN]},{type:"float32",data:[1/0]}),n=o.concat(i).map(m=>m.shape);let h="int32";n.map(m=>{a.push({type:h,data:m});let f=x.computeStrides(m);a.push({type:h,data:f})})}else{let h=x.computeStrides(i.shape);a.push({type:u,data:h})}if(e.size){let h=x.sizeFromShape(e.outputShape);a.push({type:u,data:[e.outputComponent?h/e.outputComponent:h]})}s&&(a=[...a,...s]);let p=[this.tensorToBinding(i),...o.map(h=>this.tensorToBinding(h)),this.makeUniforms(a)];o.forEach(h=>{this.commandQueueOwnedIds.add(h.dataId)}),this.commandQueueOwnedIds.add(i.dataId);let d=this.device.createBindGroup({layout:e.pipeline.getBindGroupLayout(0),entries:p.map((h,m)=>({binding:m,resource:h}))}),l=this.activeTimers!=null;this.ensureCommandEncoderReady();let c={};l&&this.supportTimestampQuery?(this.endComputePassEncoder(),this.querySet==null&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.querySetCount})),c.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1},this.computePassEncoder=this.commandEncoder.beginComputePass(c)):this.computePassEncoder||(this.computePassEncoder=this.commandEncoder.beginComputePass(c)),this.computePassEncoder.setPipeline(e.pipeline),this.computePassEncoder.setBindGroup(0,d),this.computePassEncoder.dispatchWorkgroups(e.dispatch[0],e.dispatch[1],e.dispatch[2]),this.dispatchCountInPass++,(l||U().get("WEBGPU_DEFERRED_SUBMIT_BATCH_SIZE")<=this.dispatchCountInPass||e.pixelsOpType===fe.DRAW)&&(this.endComputePassEncoder(),l?this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime()}):this.submitQueue())}getQueryTime(){return he(this,null,function*(){if(!this.supportTimestampQuery)return 0;this.queryResolveBuffer==null&&(this.queryResolveBuffer=this.bufferManager.acquireBuffer(this.querySetCount*8,GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST|GPUBufferUsage.QUERY_RESOLVE)),this.commandEncoder.resolveQuerySet(this.querySet,0,this.querySetCount,this.queryResolveBuffer,0);let e=this.bufferManager.acquireBuffer(this.querySetCount*8,GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST);this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.querySetCount*8),this.submitQueue(),yield e.mapAsync(GPUMapMode.READ);let i=new BigUint64Array(e.getMappedRange()),o=Number(i[1]-i[0])/1e6;return e.unmap(),this.bufferManager.releaseBuffer(e),o})}shouldExecuteOnCPU(e,i=cd){return U().getBool("WEBGPU_CPU_FORWARD")&&e.every(o=>this.tensorMap.get(o.dataId).resource==null&&x.sizeFromShape(o.shape)<i)}numDataIds(){return this.tensorMap.numDataIds()-this.tensorDataPendingDisposal.length}dispose(){this.disposed||(this.querySet!=null&&this.querySet.destroy(),this.bufferManager.dispose(),this.textureManager.dispose(),this.disposed=!0)}}return r.nextDataId=0,r})();Ee()&&qs("webgpu",()=>he(null,null,function*(){let r={powerPreference:U().get("WEBGPU_USE_LOW_POWER_GPU")?"low-power":"high-performance"},t=yield navigator.gpu.requestAdapter(r),e={},i=[];t.features.has("timestamp-query")&&i.push("timestamp-query"),t.features.has("bgra8unorm-storage")&&i.push(["bgra8unorm-storage"]),e.requiredFeatures=i;let o=t.limits;e.requiredLimits={maxComputeWorkgroupStorageSize:o.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:o.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:o.maxStorageBufferBindingSize,maxBufferSize:o.maxBufferSize,maxComputeWorkgroupSizeX:o.maxComputeWorkgroupSizeX,maxComputeInvocationsPerWorkgroup:o.maxComputeInvocationsPerWorkgroup};let s=yield t.requestDevice(e),a="info"in t?t.info:"requestAdapterInfo"in t?yield t.requestAdapterInfo():void 0;return new Po(s,a)}),3);g();g();g();g();var N=(function(r){return r[r.ADD=0]="ADD",r[r.ATAN2=1]="ATAN2",r[r.COMPLEX_MULTIPLY_IMAG=2]="COMPLEX_MULTIPLY_IMAG",r[r.COMPLEX_MULTIPLY_REAL=3]="COMPLEX_MULTIPLY_REAL",r[r.DIV=4]="DIV",r[r.ELU_DER=5]="ELU_DER",r[r.EQUAL=6]="EQUAL",r[r.FLOOR_DIV=7]="FLOOR_DIV",r[r.GREATER=8]="GREATER",r[r.GREATER_EQUAL=9]="GREATER_EQUAL",r[r.LESS=10]="LESS",r[r.LESS_EQUAL=11]="LESS_EQUAL",r[r.LOGICAL_AND=12]="LOGICAL_AND",r[r.LOGICAL_OR=13]="LOGICAL_OR",r[r.MAX=14]="MAX",r[r.MIN=15]="MIN",r[r.MOD=16]="MOD",r[r.MUL=17]="MUL",r[r.NOT_EQUAL=18]="NOT_EQUAL",r[r.POW=19]="POW",r[r.PRELU=20]="PRELU",r[r.SQUARED_DIFFERENCE=21]="SQUARED_DIFFERENCE",r[r.SUB=22]="SUB",r})(N||{}),md="let resultTemp = a + b;",fd="let resultTemp = atan2(a, b);",gd="let resultTemp = areal * breal - aimag * bimag;",xd="let resultTemp = areal * bimag + aimag * breal;",Cd="let resultTemp = a / b;",yd="let resultTemp = select(a * (b + 1.0), a, b >= b - b);",Sd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a == b);
`,wd=`
  let remainder =
      select(a % b, round(a % b), (round(a) == a) & (round(b) == b));
  let quotient = (a - remainder) / b;
  let resultTemp =
      round(select(quotient, quotient - 1, sign(remainder) == -sign(b)));
`,bd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a > b);
`,vd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a >= b);
`,Id=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a < b);
`,kd=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a <= b);
`,Rd="return f32(a >= 1.0 && b >= 1.0);",Dd=`return (vec4<f32>(a >= vec4<f32>(1.0)) *
  vec4<f32>(b >= vec4<f32>(1.0)));`,Pd="return f32(a >= 1.0 || b >= 1.0);",$d=`return min(vec4<f32>(a >= vec4<f32>(1.0)) +
  vec4<f32>(b >= vec4<f32>(1.0)), vec4<f32>(1.0));`,Nd="let resultTemp = max(a, b);",zd="let resultTemp = min(a, b);",Ad=`
  let isNaN = b == 0.;
  var resultTemp = a % b;
  resultTemp = select((resultTemp + b) % b, resultTemp,
      (a < 0. && b < 0.) || (a >= 0. && b > 0.));
`,Fd=`
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
`,Ld="let resultTemp = a * b;",Td=`
  var resultTemp = f32(a != b);
  let valueForNaN = 1.0;
`,_d=`
  var resultTemp = vec4<f32>(a != b);
  let valueForNaN = 1.0;
`,Bd=`
  let isNaN = a < 0.0 && floor(b) < b;
  if (b == 0.0) {
    return 1.0;
  }
  var resultTemp = select(sign(a) * pow(abs(a), b), pow(abs(a), b),
      round(abs(b) % 2.0) != 1.0);
`,Ed=`
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
`,Ud="if (a < 0.0) { return b * a; }  return a;",Wd=`
  let aLessThanZero = vec4<f32>(a < vec4<f32>(0.0));
  return (aLessThanZero * (b * a)) + ((vec4<f32>(1.0) - aLessThanZero) * a);
`,Md="let resultTemp = (a - b) * (a - b);",Od="let resultTemp = a - b;";function Ie(r,t){let e;do{switch(r){case N.ATAN2:e=fd;break;case N.MAX:e=Nd;break;case N.MIN:e=zd;break;case N.MOD:e=t?Fd:Ad;break;case N.NOT_EQUAL:e=t?_d:Td;break;case N.POW:e=t?Ed:Bd;break;default:continue}let i,o,s;return t?(i="isnanVec4",o="vec4<f32>",s="vec4<bool>"):(i="isnan",o="f32",s="bool"),`
      let aIsNaN = ${i}(a);
      let aPostLegalization = select(a, ${o}(42), aIsNaN);
      let bIsNaN = ${i}(b);
      let bPostLegalization = select(b, ${o}(42), bIsNaN);
      let isNaN = false;
      let valueForNaN = uniforms.NAN;
      {
        let a = aPostLegalization;
        let b = bPostLegalization;
        ${e}
        return select(
            resultTemp, ${o}(valueForNaN),
            ${s}(isNaN) | aIsNaN | bIsNaN);
      }
    `}while(!1);switch(r){case N.ADD:e=md;break;case N.COMPLEX_MULTIPLY_IMAG:e=xd;break;case N.COMPLEX_MULTIPLY_REAL:e=gd;break;case N.DIV:e=Cd;break;case N.ELU_DER:e=yd;break;case N.EQUAL:e=Sd;break;case N.FLOOR_DIV:e=wd;break;case N.GREATER:e=bd;break;case N.GREATER_EQUAL:e=vd;break;case N.LESS:e=Id;break;case N.LESS_EQUAL:e=kd;break;case N.LOGICAL_AND:return t?Dd:Rd;case N.LOGICAL_OR:return t?$d:Pd;case N.MUL:e=Ld;break;case N.PRELU:return t?Wd:Ud;case N.SQUARED_DIFFERENCE:e=Md;break;case N.SUB:e=Od;break;default:}return`
    ${e}
    return resultTemp;
  `}g();var v=(function(r){return r[r.ABS=0]="ABS",r[r.ACOS=1]="ACOS",r[r.ACOSH=2]="ACOSH",r[r.ASIN=3]="ASIN",r[r.ASINH=4]="ASINH",r[r.ATAN=5]="ATAN",r[r.ATANH=6]="ATANH",r[r.CEIL=7]="CEIL",r[r.COS=8]="COS",r[r.COSH=9]="COSH",r[r.ELU=10]="ELU",r[r.ERF=11]="ERF",r[r.EXP=12]="EXP",r[r.EXPM1=13]="EXPM1",r[r.FLOOR=14]="FLOOR",r[r.IS_FINITE=15]="IS_FINITE",r[r.IS_INF=16]="IS_INF",r[r.IS_NAN=17]="IS_NAN",r[r.LINEAR=18]="LINEAR",r[r.LOG=19]="LOG",r[r.LOG1P=20]="LOG1P",r[r.LOGICAL_NOT=21]="LOGICAL_NOT",r[r.NEG=22]="NEG",r[r.RELU=23]="RELU",r[r.RELU6=24]="RELU6",r[r.LEAKYRELU=25]="LEAKYRELU",r[r.RECIPROCAL=26]="RECIPROCAL",r[r.ROUND=27]="ROUND",r[r.RSQRT=28]="RSQRT",r[r.SELU=29]="SELU",r[r.SIGMOID=30]="SIGMOID",r[r.SIGN=31]="SIGN",r[r.SIN=32]="SIN",r[r.SINH=33]="SINH",r[r.SOFTPLUS=34]="SOFTPLUS",r[r.SQRT=35]="SQRT",r[r.SQUARE=36]="SQUARE",r[r.STEP=37]="STEP",r[r.TAN=38]="TAN",r[r.TANH=39]="TANH",r[r.TO_INT=40]="TO_INT",r})(v||{}),Vd="return abs(a);",Gd=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  return acos(a);
`,Hd=`
  if (a < 1.) {
    return uniforms.NAN;
  }
  return acosh(a);
`,Kd=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  return asin(a);
`,Xd="return asinh(a);",qd=`
  if (isnan(a)) {
    return uniforms.NAN;
  }
  return atan(a);
`,Yd=`
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
`,jd="return ceil(a);",Qd="return cos(a);",Zd=`
  let e2x = exp(-a);
  return (e2x + 1.0 / e2x) / 2.0;
`,Jd="return exp(a) - 1.0;",el="if (a >= 0.0) { return a; }  return (exp(a) - 1.0);",tl=`
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
`,ol=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  let p = ${w.ERF_P};
  let a1 = ${w.ERF_A1};
  let a2 = ${w.ERF_A2};
  let a3 = ${w.ERF_A3};
  let a4 = ${w.ERF_A4};
  let a5 = ${w.ERF_A5};

  let sign = sign(a);
  let absA = abs(a);
  let t = 1.0 / (1.0 + p * absA);
  return sign * (1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * exp(-absA * absA));
`,rl="return exp(a);",il="return floor(a);",sl="return f32(!isnan(a) && !isinf(a));",al="return f32(isinf(a));",nl="return f32(isnan(a));",ul="return a;",pl=`if (a < 0.0) { return uniforms.NAN; }
  return log(a);`,dl=`
  if (isnan(a)) { return a; }
  return log(1.0 + a);
`,ll="return f32(!(a >= 1.0));",cl="return -a;",hl="if (a < 0.0) { return uniforms.alpha * a; } return a;",ml=`
  let aLessThanZero = vec4<f32>(a < vec4<f32>(0.0));
  return (aLessThanZero * (uniforms.alpha * a)) + ((vec4<f32>(1.0) - aLessThanZero) * a);
`,fl="return 1.0 / a;",gl="return select(a, 0.0, a < 0.0);",xl="return clamp(a, 0.0, 6.0);",Cl="return clamp(a, vec4<f32>(0.0, 0.0, 0.0, 0.0), vec4<f32>(6.0, 6.0, 6.0, 6.0));",yl=`
  return select(a, vec4<f32>(0.0), a < vec4<f32>(0.0));
`,Sl="return round(a);",wl="return inverseSqrt(a);",bl=`
  if (a >= 0.0) {
    return ${w.SELU_SCALE} * a;
  } else {
    return ${w.SELU_SCALEALPHA} * (exp(a) - 1.0);
  }
`,vl="return 1.0 / (1.0 + exp(-1.0 * a));",Il="return sign(a);",kl="return sin(a);",Rl=`
  let e2x = exp(a);
  return (e2x - 1.0 / e2x) / 2.0;
`,Dl=`
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
`,Pl="return sqrt(a);",$l="return a * a;",Nl=`
  if (isnan(a)) {
    return a;
  }

  return select(uniforms.stepAlpha, 1.0, a > 0.0);
`,zl="return tan(a);",Al=`
  let e2x = exp(-2.0 * abs(a));
  return sign(a) * (1.0 - e2x) / (1.0 + e2x);
`,Fl="return f32(i32((a)));";function de(r,t){switch(r){case v.ABS:return Vd;case v.ACOS:return Gd;case v.ACOSH:return Hd;case v.ASIN:return Kd;case v.ASINH:return Xd;case v.ATAN:return qd;case v.ATANH:return Yd;case v.COS:return Qd;case v.COSH:return Zd;case v.CEIL:return jd;case v.ELU:return t?tl:el;case v.ERF:return ol;case v.EXP:return rl;case v.EXPM1:return Jd;case v.FLOOR:return il;case v.IS_FINITE:return sl;case v.IS_INF:return al;case v.IS_NAN:return nl;case v.LINEAR:return ul;case v.LOG:return pl;case v.LOG1P:return dl;case v.LOGICAL_NOT:return ll;case v.NEG:return cl;case v.LEAKYRELU:return t?ml:hl;case v.RECIPROCAL:return fl;case v.RELU:return t?yl:gl;case v.RELU6:return t?Cl:xl;case v.ROUND:return Sl;case v.RSQRT:return wl;case v.SELU:return bl;case v.SIGMOID:return vl;case v.SIGN:return Il;case v.SIN:return kl;case v.SINH:return Rl;case v.SOFTPLUS:return Dl;case v.SQRT:return Pl;case v.SQUARE:return $l;case v.STEP:return Nl;case v.TAN:return zl;case v.TANH:return Al;case v.TO_INT:return Fl;default:throw new Error(`BinaryType ${r} is not implemented!`)}}function K(r,t=!1,e=!1,i=3){if(r===null)return"";let o="";if(r==="linear")o=de(v.LINEAR);else if(r==="relu")o=de(v.RELU,e);else if(r==="elu")o=de(v.ELU,e);else if(r==="relu6")o=de(v.RELU6,e);else if(r==="prelu")o=Ie(N.PRELU,e);else if(r==="sigmoid")o=de(v.SIGMOID,e);else if(r==="leakyrelu")o=de(v.LEAKYRELU,e);else throw new Error(`Activation ${r} has not been implemented for the WebGPU backend.`);let a=L(e?4:1),n="";return t?n=`
      fn activation(a : ${a}, coords : vec${i}<i32>) -> ${a} {
        let b = getPreluActivationWeightsByOutputCoords(coords);
        ${o}
      }`:n=`
      fn activation(a : ${a}, coords : vec${i}<i32>) -> ${a} {
        ${o}
      }`,n}function Q(r,t){return`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      ${t?"value = activation(value, coords);":""}
      `}function $o(r,t,e=!1,i=!1,o=!1,s=1){x.assert(r&&s===1||!r,()=>`transposeA ${r} is not compatible with component size ${s}`);let a=`
      ${r?"value = getA(batch, col, row);":"value = getA(batch, row, col);"}

    `,n=t?"value = getB(batch, col, row);":"value = getB(batch, row, col);";return`
  fn mm_readA(batch: i32, row: i32, col: i32) -> ${L(s)} {
    var value = ${L(s)}(0.0);
    ${e&&o?a:`
    ${r?"if(row < uniforms.dimAOuter && col < uniforms.dimInner)":"if(row < uniforms.aShape[1] && col < uniforms.aShape[2])"}
    {
      ${a}
    }
    `}
    return value;
  }

  fn mm_readB(batch: i32, row: i32, col: i32) -> ${L(s)} {
    var value = ${L(s)}(0.0);
    ${n}
    return value;
  }
  `}function We(r,t,e,i,o=!1,s=!1,a=!1,n=1){return`
  ${$o(e,i,o,s,a,n)}
  fn mm_write(batch: i32, row: i32, col: i32, valueIn: ${L(n)}) {
    ${o&&s?"":"if (row < uniforms.dimAOuter && col < uniforms.dimBOuter)"}
    {
      var value = valueIn;
      let coords = vec3<i32>(batch, row, col);
      ${Q(r,t)}
      setOutputAtCoords(coords[0], coords[1], coords[2], value);
    }
  }
  `}var Ll=(r,t)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          kStart + inputRow,
          globalRowStart + inputCol * ${t});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          globalRow + innerRow,
          kStart + inputCol * ${t});
        `,Tl=(r,t,e,i)=>{if(r)return`
      for (var k = 0; k < ${i}; k++) {
        let BCached0 = mm_Bsub[k][tileCol];
        let ACached0 = mm_Asub[k][localRow];
        for (var i = 0; i < ${e}; i++) {
          acc[i] = fma(BCached0, vec4<f32>(ACached0[i]), acc[i]);
        }
      }`;{let o="",s="";for(let a=0;a<t;a++)o+=`let BCached${a} = mm_Bsub[k * ${t} + ${a}][tileCol];`,s+=`acc[i] = fma(BCached${a}, vec4<f32>(ACached[${a}]), acc[i]);`;return`
      for (var k = 0; k < ${i/t}; k++) {
        ${o}
        for (var i = 0; i < ${e}; i++) {
          let ACached = mm_Asub[tileRow + i][k];
          ${s}
        }
      }`}};function Ce(r,t,e=!1,i=32,o=!1,s=32,a=!1){let n=t[1]*r[1],u=t[0]*r[0],p=e?n:i,d=e?i:n,l=p/t[0],c=i/t[1],h=r[1],m=r[0];return x.assert((e&&l===4&&r[1]===4||!e&&(l===3||l===4))&&p%t[0]===0&&i%t[1]===0&&r[0]===4,()=>`If transposeA ${e} is true, innerElementSize ${l} and workPerThread[1] ${r[1]} must be 4.
          Otherwise, innerElementSize ${l} must be 3 or 4.
      tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${r[0]} must be 4.`),`
  var<workgroup> mm_Asub : array<array<vec${l}<f32>, ${p/l}>, ${d}>;
  var<workgroup> mm_Bsub : array<array<vec4<f32>, ${u/r[0]}>, ${i}>;

  ${y()} {
    let localRow = i32(localId.y);
    let tileRow = localRow * ${h};
    let tileCol = i32(localId.x);

    let globalRow = i32(globalId.y) * ${h};
    let globalCol = i32(globalId.x) * ${m};
    let batch = ${o?"0":"i32(globalId.z)"};
    let batchA = ${o||!a?"batch":"batch % uniforms.aShape[0]"};
    let batchB = ${o||!a?"batch":"batch % uniforms.bShape[0]"};
    let globalRowStart = i32(workgroupId.y) * ${n};

    let numTiles = ${o?`${Math.ceil(s/i)}`:`(uniforms.dimInner - 1) / ${i} + 1`};
    var kStart = ${o?`i32(globalId.z) * ${s}`:"0"};

    var acc: array<vec4<f32>, ${h}>;

    // Loop over shared dimension.
    let tileRowB = localRow * ${c};
    for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        for (var innerRow = 0; innerRow < ${h}; innerRow++) {
            let inputRow = tileRow + innerRow;
            let inputCol = tileCol;
            ${Ll(e,l)}
        }

        // Load one tile of B into local memory.
        for (var innerRow = 0; innerRow < ${c}; innerRow++) {
            let inputRow = tileRowB + innerRow;
            let inputCol = tileCol;
            mm_Bsub[inputRow][inputCol] = mm_readB(batchB, kStart + inputRow, globalCol);
        }
        kStart = kStart + ${i};
        workgroupBarrier();

        // Compute acc values for a single thread.
        ${Tl(e,l,h,i)}
        workgroupBarrier();
    }

    for (var innerRow = 0; innerRow < ${h}; innerRow++) {
        mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
    }
  }`}var ua=r=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          kStart + inputRow,
          globalRowStart + inputCol);
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          globalRowStart + inputRow,
          kStart + inputCol);
        `,_l=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];";function ye(r,t,e=!1,i=32,o=!1,s=32,a=!1,n=!1){let u=r[1]*t[1],p=r[0]*t[0],d=e?u:i,l=e?i:u;x.assert(l%t[1]===0&&d%t[0]===0&&i%t[1]===0,()=>`tileAHight ${l} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let c=l/t[1],h=d/t[0],m=i/t[1],f=r[1],C=r[0],I=a?`
      let localRow = i32(localId.y);
      let localCol = i32(localId.x);
      let globalRowStart = i32(workgroupId.y) * ${u};
      let globalColStart = i32(workgroupId.x) * ${p};

      // Loop over shared dimension.
      for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        for (var inputRow = localRow; inputRow < ${l}; inputRow = inputRow + ${t[1]}) {
          for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
            ${ua(e)}
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
        var BCached : array<f32, ${C}>;
        for (var k = 0; k < ${i}; k++) {
          for (var inner = 0; inner < ${C}; inner++) {
            BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
          }
          for (var innerRow = 0; innerRow < ${f}; innerRow++) {
            let ACached = ${e?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
            for (var innerCol = 0; innerCol < ${C}; innerCol++) {
              acc[innerRow][innerCol] =
                  fma(ACached, BCached[innerCol], acc[innerRow][innerCol]);
            }
          }
        }
        workgroupBarrier();
      }
      for (var innerRow = 0; innerRow < ${f}; innerRow++) {
        let gRow = globalRowStart + localRow + innerRow * ${t[1]};
        for (var innerCol = 0; innerCol < ${C}; innerCol++) {
          let gCol = globalColStart + localCol + innerCol * ${t[0]};
          mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
        }
      }
      `:`
  let tileRow = i32(localId.y) * ${f};
  let tileCol = i32(localId.x) * ${C};

  let globalRow = i32(globalId.y) * ${f};
  let globalCol = i32(globalId.x) * ${C};
  let globalRowStart = i32(workgroupId.y) * ${u};

  let tileRowA = i32(localId.y) * ${c};
  let tileColA = i32(localId.x) * ${h};
  let tileRowB = i32(localId.y) * ${m};
  // Loop over shared dimension.
  for (var t = 0; t < numTiles; t++) {
    // Load one tile of A into local memory.
    for (var innerRow = 0; innerRow < ${c}; innerRow++) {
      for (var innerCol = 0; innerCol < ${h}; innerCol++) {
        let inputRow = tileRowA + innerRow;
        let inputCol = tileColA + innerCol;
        ${ua(e)}
      }
    }

    // Load one tile of B into local memory.
    for (var innerRow = 0; innerRow < ${m}; innerRow++) {
      for (var innerCol = 0; innerCol < ${C}; innerCol++) {
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
    var BCached : array<f32, ${C}>;
    for (var k = 0; k < ${i}; k++) {
      for (var inner = 0; inner < ${C}; inner++) {
        BCached[inner] = mm_Bsub[k][tileCol + inner];
      }

      for (var innerRow = 0; innerRow < ${f}; innerRow++) {
        ${_l(e)}
        for (var innerCol = 0; innerCol < ${C}; innerCol++) {
          acc[innerRow][innerCol] =
              fma(ACached, BCached[innerCol], acc[innerRow][innerCol]);
        }
      }
    }

    workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < ${f}; innerRow++) {
    for (var innerCol = 0; innerCol < ${C}; innerCol++) {
      mm_write(batch, globalRow + innerRow, globalCol + innerCol,
          acc[innerRow][innerCol]);
    }
  }
  `;return`
    var<workgroup> mm_Asub : array<array<f32, ${d}>, ${l}>;
    var<workgroup> mm_Bsub : array<array<f32, ${p}>, ${i}>;

    ${y()} {
      let batch = ${o?"0":"i32(globalId.z)"};
      let batchA = ${o||!n?"batch":"batch % uniforms.aShape[0]"};
      let batchB = ${o||!n?"batch":"batch % uniforms.bShape[0]"};
      let numTiles = ${o?`${Math.ceil(s/i)}`:`(uniforms.dimInner - 1) / ${i} + 1`};
      var kStart = ${o?`i32(globalId.z) * ${s}`:"0"};

      var acc : array<array<f32, ${C}>, ${f}>;

      // Without this initialization strange values show up in acc.
      for (var innerRow = 0; innerRow < ${f}; innerRow++) {
        for (var innerCol = 0; innerCol < ${C}; innerCol++) {
          acc[innerRow][innerCol] = 0.0;
        }
      }
      ${I}
    }
  `}var Bl=r=>r?`
      mm_readA(batchA, colA, globalRow),
      mm_readA(batchA, colA + 1, globalRow),
      mm_readA(batchA, colA + 2, globalRow),
      mm_readA(batchA, colA + 3, globalRow)
  `:`
      mm_readA(batchA, globalRow, colA),
      mm_readA(batchA, globalRow, colA + 1),
      mm_readA(batchA, globalRow, colA + 2),
      mm_readA(batchA, globalRow, colA + 3)
  `;function El(r,t=!1){x.assert(r[1]===1&&r[2]===1,()=>`A linear work group size is required. But got ${r}.`);let e=r[0]*4;return`
    var<workgroup> mm_Asub : array<vec4<f32>, ${r[0]}>;

    ${y()} {
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
        mm_Asub[tileCol] = vec4<f32>(${Bl(t)});
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
  `}var Je=class{constructor(t,e,i=!1,o=!1,s=null,a=null,n=null,u=!1){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=e,this.dispatchLayout={x:[2],y:[1],z:[0]};let p=i?t[1]:t[2];if(this.isVec4=(p%4===0&&!i||e[1]%4===0&&i)&&e[2]%4===0&&!o,this.outputComponent=this.isVec4?4:1,this.isVectorA=e[1]===1&&!i,!this.isVec4&&this.isVectorA)this.elementsPerThread=[1,1,1],this.workgroupSize=[32,1,1];else{let c=Ro(e[1],p,e[2],i);this.workgroupSize=c.workgroupSize,this.elementsPerThread=c.elementsPerThread}this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread);let d=s!=null,l=n!=null;d&&this.variableNames.push("bias"),l&&this.variableNames.push("preluActivationWeights"),this.sequentialAccessByThreads=u,this.transposeA=i,this.transposeB=o,this.addBias=d,this.activation=a,this.hasPreluActivationWeights=l,[this.fitAOuter,this.fitBOuter,this.fitInner]=this.getShapeFit(e[1],e[2],p),this.shaderKey=`matMulPacked_${this.elementsPerThread}_${i}_${o}_${this.activation}_${this.fitAOuter}_${this.fitBOuter}_${this.fitInner}_${this.isVec4}_${this.isVectorA}_${this.sequentialAccessByThreads}`}getShapeFit(t,e,i){let o=this.workgroupSize[1]*this.elementsPerThread[1],s=this.workgroupSize[0]*this.elementsPerThread[0];!this.isVec4&&this.isVectorA?this.tileInner=this.workgroupSize[0]*4:this.tileInner=s;let a=t%o===0,n=e%s===0,u=i%this.tileInner===0;return[a,n,u]}getUserCode(){return`
      ${K(this.activation,this.hasPreluActivationWeights,this.isVec4)}
      ${We(this.addBias,this.activation,!1,this.transposeB,this.fitAOuter,this.fitBOuter,this.fitInner,this.isVec4?4:1)}
      ${this.isVec4?Ce(this.elementsPerThread,this.workgroupSize,this.transposeA,this.tileInner,!1,null,!0):this.isVectorA?El(this.workgroupSize,this.transposeA):ye(this.elementsPerThread,this.workgroupSize,this.transposeA,this.tileInner,!1,null,this.sequentialAccessByThreads,!0)}
    `}};function Ul(r){return`
    var<workgroup> sumValues : array<f32, ${r}>;
    ${y()} {
      let coords = getOutputCoords();
      let batch = coords[0];
      let batchA = batch % uniforms.aShape[0];
      let batchB = batch % uniforms.bShape[0];
      let row = coords[1];
      let col = coords[2];
      var sum = 0.0;
      let Length = uniforms.dimInner;
      for (var k = i32(localId.x); k < Length; k = k + ${r}) {
        let dataA = mm_readA(batchA, row, k);
        let dataB = mm_readB(batchB, k, col);
        sum = sum + dataA * dataB;
      }
      sumValues[localId.x] = sum;
      workgroupBarrier();

      for(var currentSize = ${r/2}u; currentSize > 1u;
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
  `}var et=class{constructor(t,e=!1,i=!1,o=null,s=null,a=null){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[256,1,1],this.outputShape=t,this.dispatchLayout={x:[],y:[1,2],z:[0]},this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize);let n=o!=null,u=a!=null;n&&this.variableNames.push("bias"),u&&this.variableNames.push("preluActivationWeights"),this.transposeA=e,this.transposeB=i,this.addBias=n,this.activation=s,this.hasPreluActivationWeights=u,this.shaderKey=`matMulReduce_${this.activation}_${e}_${i}`}getUserCode(){return`
      ${K(this.activation,this.hasPreluActivationWeights)}
      ${We(this.addBias,this.activation,this.transposeA,this.transposeB)}
      ${Ul(this.workgroupSize[0])}
    `}};function Wl(r){let t=r[1],e=r[0],i=t>e?t:e;return`
  var<workgroup> mm_Asub : array<array<f32, ${i}>, ${t}>;
  var<workgroup> mm_Bsub : array<array<f32, ${e}>, ${i}>;

  // If the output size is small for matrix multiplication, avoid to use vec4
  // and handle some elements per thread to optimally utilize the ALU.
  // Read data from global memory to registers firstly, then store them into
  // shared memory, so it is instruction-Level parallelism for arithmetic
  // operations and others handle IO operations between barrier api, makes ALU
  // and load/store units work simultaneously, could improves the performance.
  ${y()} {
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
  `}var tt=class{constructor(t,e,i,o=!1,s=!1,a=null,n=null,u=null){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[16,8,1],this.outputShape=i,this.dispatchLayout={x:[2],y:[1],z:[0]},this.dispatch=[Math.ceil(i[2]/this.workgroupSize[0]),Math.ceil(i[1]/this.workgroupSize[1]),i[0]];let p=a!=null;p&&this.variableNames.push("bias");let d=u!=null;d&&this.variableNames.push("preluActivationWeights"),this.transposeA=o,this.transposeB=s,this.addBias=p,this.activation=n,this.hasPreluActivationWeights=d,this.shaderKey=`matMulSmallOutputSize_${this.activation}_${o}_${s}`}getUserCode(){return`
      ${K(this.activation,this.hasPreluActivationWeights)}
      ${We(this.addBias,this.activation,this.transposeA,this.transposeB)}
      ${Wl(this.workgroupSize)}
    `}};g();var ot=class{constructor(t,e,i=!1,o=!1){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[8,8,1],this.atomic=!0,this.splitedDimInner=128,x.assert(t[0]===1,()=>"MatMulSplitKProgram only supports batch = 1."),this.outputShape=t,this.dispatchLayout={x:[2],y:[1],z:[0,3]};let s=(i&&this.outputShape[1]%4===0||!i&&e%4===0)&&this.outputShape[2]%4===0;this.elementsPerThread=[4,4,this.splitedDimInner],this.outputComponent=s?4:1,s||(this.outputShape[1]<16&&(this.elementsPerThread[1]=1),this.outputShape[2]<16&&(this.elementsPerThread[0]=1)),this.dispatch=S(this.dispatchLayout,[this.outputShape[0],this.outputShape[1],this.outputShape[2],e],this.workgroupSize,this.elementsPerThread),this.transposeA=i,this.transposeB=o,this.shaderKey=`matMulSplitK_${i}_${o}_${this.elementsPerThread}_${this.outputComponent}`}getUserCode(){let t=this.outputComponent;return`
      ${$o(!1,this.transposeB,!1,!1,!1,t)}
      fn mm_write(batch: i32, row : i32, col : i32, value : ${L(t)}) {
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
      ${t===4?Ce(this.elementsPerThread,this.workgroupSize,this.transposeA,32,!0,this.splitedDimInner):ye(this.elementsPerThread,this.workgroupSize,this.transposeA,32,!0,this.splitedDimInner)}
    `}},rt=class{constructor(t,e=null,i=null,o=null){this.uniforms="",this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.addBias=e!=null,this.hasPreluActivationWeights=o!=null,this.activation=i,this.addBias&&this.variableNames.push("bias"),this.hasPreluActivationWeights&&this.variableNames.push("preluActivationWeights"),this.shaderKey=`biasActivation_${i}`}getUserCode(){return`
    ${K(this.activation,this.hasPreluActivationWeights)}
    ${y("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        var value = getXByOutputIndex(index);
        ${Q(this.addBias,this.activation)}
        setOutputAtIndex(index, value);
      }
    }
    `}};g();var it=class{constructor(t){this.variableNames=[],this.outputShape=[],this.uniforms="value : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="fill"}getUserCode(){return`
    ${y("index")} {
      if (index < uniforms.size) {
        setOutputAtIndex(index, uniforms.value);
      }
    }
  `}};function W(r){let{backend:t,attrs:e}=r,{shape:i,value:o}=e,{dtype:s}=e;if(s=s||x.inferDtype(o),s==="string"){let a=x.getArrayFromDType(s,x.sizeFromShape(i));return a.fill(o),t.makeTensorInfo(i,s,a)}else{let a=new it(i),n=[{type:"float32",data:[o]}];return t.runWebGPUProgram(a,[],s,n)}}var pa={kernelName:Qr,backendName:"webgpu",kernelFunc:W};g();function D(r){let{inputs:t,attrs:e}=r,{x:i}=t,{shape:o}=e,s=x.sizeFromShape(i.shape),a=x.inferFromImplicitShape(o,s),n=x.sizeFromShape(a);return x.assert(s===n,()=>`The new shape (${a}) has ${n} elements and the old shape (${i.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`),r.backend.incRef(i.dataId),{dataId:i.dataId,shape:a,dtype:i.dtype}}var da={kernelName:Zi,backendName:"webgpu",kernelFunc:D};function Se({a:r,b:t,transposeA:e,transposeB:i,backend:o,bias:s=null,preluActivationWeights:a=null,leakyreluAlpha:n=0,activation:u=null}){let p=r.shape.length,d=t.shape.length,l=e?r.shape[p-2]:r.shape[p-1],c=i?t.shape[d-1]:t.shape[d-2],h=e?r.shape[p-1]:r.shape[p-2],m=i?t.shape[d-2]:t.shape[d-1],f=r.shape.slice(0,-2),C=t.shape.slice(0,-2),I=x.sizeFromShape(f),k=x.sizeFromShape(C),P=Ys.assertAndGetBroadcastShape(r.shape.slice(0,-2),t.shape.slice(0,-2)).concat([h,m]);x.assert(l===c,()=>`Error in matMul: inner shapes (${l}) and (${c}) of Tensors with shapes ${r.shape} and ${t.shape} and transposeA=${e} and transposeB=${i} must match.`);let $=e?[I,l,h]:[I,h,l],A=i?[k,m,c]:[k,c,m],F=D({inputs:{x:r},backend:o,attrs:{shape:$}}),B=D({inputs:{x:t},backend:o,attrs:{shape:A}}),T=[F,B],V=Math.max(I,k),G=[F,B],Y=[{type:"int32",data:[h]},{type:"int32",data:[m]},{type:"int32",data:[l]}],H,q,ee=[V,h,m],M=U().get("WEBGPU_MATMUL_PROGRAM_TYPE");if(M<0){let be=U().getNumber("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL"),Fe=be>0?be:o.thresholdToIncreaseWorkgroups,Le=V*Math.ceil(h/32)*Math.ceil(m/32);Le<=Fe||h<=8&&Le<=Fe*2?V*h*m<=128?M=ie.MatMulReduceProgram:V===1&&c>=2e3?M=ie.MatMulSplitKProgram:M=ie.MatMulSmallOutputSizeProgram:M=ie.MatMulPackedProgram}switch(M){case ie.MatMulReduceProgram:H=new et(ee,e,i,s,u,a);break;case ie.MatMulSplitKProgram:{if(q=W({backend:o,attrs:{shape:ee,value:0,dtype:r.dtype}}),H=new ot(ee,c,e,i),s||u){q=o.runWebGPUProgram(H,G,r.dtype,Y,q);let Fe=new rt(q.shape,s,u,a),Le=null,Ke=[q];s&&Ke.push(s),a&&Ke.push(a),u==="leakyrelu"&&(Le=[{type:"float32",data:[n]}],Fe.uniforms+=" alpha : f32,");let Vo=o.runWebGPUProgram(Fe,Ke,q.dtype,Le);T.push(q);let Qp=D({inputs:{x:Vo},backend:o,attrs:{shape:P}});T.push(Vo);for(let Zp of T)o.disposeData(Zp.dataId);return Qp}break}case ie.MatMulSmallOutputSizeProgram:H=new tt($,A,ee,e,i,s,u,a);break;case ie.MatMulPackedProgram:let be=o.adapterInfo.isIntel();H=new Je($,ee,e,i,s,u,a,be);break;default:throw new Error(`Unsupported MatMulProgramType ${M}.`)}s&&G.push(s),a&&G.push(a),u==="leakyrelu"&&(Y.push({type:"float32",data:[n]}),H.uniforms+=" alpha : f32,"),q=o.runWebGPUProgram(H,G,r.dtype,Y,q);let ko=D({inputs:{x:q},backend:o,attrs:{shape:P}});T.push(q);for(let be of T)o.disposeData(be.dataId);return ko}function Ml(r){let{inputs:t,backend:e,attrs:i}=r,{a:o,b:s,bias:a,preluActivationWeights:n}=t,{transposeA:u,transposeB:p,activation:d,leakyreluAlpha:l}=i;return Se({a:o,b:s,transposeA:u,transposeB:p,backend:e,bias:a,preluActivationWeights:n,leakyreluAlpha:l,activation:d})}var la={kernelName:Vs,backendName:"webgpu",kernelFunc:Ml};g();g();g();var Me=class{constructor(t,e,i){this.variableNames=["AReal","AImag","BReal","BImag"],this.workgroupSize=[128,1,1],this.size=!0,this.outputShape=w.assertAndGetBroadcastShape(e,i),this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`binaryOpComplex_${t}`,this.op=t}getUserCode(){return`
      fn binaryOpComplex(
          areal : f32, aimag : f32, breal : f32, bimag : f32) -> f32 {
        ${Ie(this.op,!1)}
      }

      ${y("index")} {
        if(index < uniforms.size) {
          let areal = getARealByOutputIndex(index);
          let aimag = getAImagByOutputIndex(index);
          let breal = getBRealByOutputIndex(index);
          let bimag = getBImagByOutputIndex(index);
          setOutputAtIndex(index, binaryOpComplex(areal, aimag, breal, bimag));
        }
      }
    `}};g();var le=class{constructor(t,e,i){if(this.size=!0,this.variableNames=["A","B"],this.outputShape=w.assertAndGetBroadcastShape(e,i),this.dispatchLayout=b(this.outputShape),this.op=t,this.useSharedMemoryWithA=e.length<=1&&i.length>1&&e[0]<128,this.useSharedMemoryWithB=i.length<=1&&e.length>1&&i[0]<128,this.useSharedMemoryWithA||this.useSharedMemoryWithB)this.outputComponent=1,this.variableComponents=[1,1],this.lastDimensionSize=this.useSharedMemoryWithB?i[0]:e[0],this.shaderKey=`binary_${t}_${this.lastDimensionSize}`,this.type="shared",this.workgroupSize=[256,1,1];else{let o=e.length>0&&e[e.length-1]%4===0,s=i.length>0&&i[i.length-1]%4===0;o&&s?(this.outputComponent=4,this.variableComponents=[4,4]):o&&(x.isScalarShape(i)||i[i.length-1]===1)||s&&(x.isScalarShape(e)||e[e.length-1]===1)?(this.outputComponent=4,this.variableComponents=o?[4,1]:[1,4]):(this.outputComponent=1,this.variableComponents=[1,1]),this.type="nonshared",this.shaderKey=`binary_${t}_${this.variableComponents}`,this.workgroupSize=[128,1,1]}this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.outputComponent,1,1])}getUserCode(){let t,e=this.outputComponent===4?"vec4<f32>":"f32",i=`
    fn binaryOperation(a : ${e}, b : ${e}) -> ${e} {
      ${Ie(this.op,this.outputComponent===4)}
    };
    `;if(this.type==="shared"){let o=this.lastDimensionSize>1?`coords[${this.outputShape.length-1}]`:"0",s=this.useSharedMemoryWithB?`let a = getAByOutputIndex(index);
          let b = sharedBuf[${o}];`:`let a = sharedBuf[${o}];
          let b = getBByOutputIndex(index);`;t=`
        ${i}
        var<workgroup> sharedBuf : array<f32, ${this.lastDimensionSize}>;
        ${y("index")} {
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
       ${y("index")} {
         if (index < uniforms.size) {
           let coords = getCoordsFromIndex(index * ${this.outputComponent});
           let a = ${e}(getAByOutputCoords(coords));
           let b = ${e}(getBByOutputCoords(coords));
           setOutputAtIndex(index, binaryOperation(a, b));
         }
       }
       `;return t}};g();g();function O(r){let{inputs:t}=r,{x:e}=t;return r.backend.incRef(e.dataId),{dataId:e.dataId,shape:e.shape,dtype:e.dtype}}var ca={kernelName:ai,backendName:"webgpu",kernelFunc:O};function oe(r){let{inputs:t,backend:e}=r,{real:i,imag:o}=t,s=e.makeTensorInfo(i.shape,"complex64"),a=e.tensorMap.get(s.dataId),n=O({inputs:{x:i},backend:e}),u=O({inputs:{x:o},backend:e});return a.complexTensorInfos={real:n,imag:u},s}var ha={kernelName:xr,backendName:"webgpu",kernelFunc:oe};var Z=class{constructor(t,e,i=""){this.variableNames=["A"],this.size=!0;let o=128;this.workgroupSize=[o,1,1],this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.op=e,i!==""&&(this.uniforms=i),this.shaderKey=`unary_${e}`}getUserCode(){return`
      fn unaryOperation(a : f32) -> f32 {
        ${de(this.op,!1)}
      }
      ${y("index")} {
        if (index < uniforms.size) {
          let a = getAByOutputIndex(index);
          setOutputAtIndex(index, unaryOperation(a));
        }
      }
      `}};function z({opType:r,cpuKernelImpl:t,dtype:e}){return({inputs:i,backend:o})=>{let{x:s}=i,a=o,n=e||s.dtype;if(a.shouldExecuteOnCPU([s])&&t!=null){let p=a.tensorMap.get(s.dataId),d=t(p.values,n);return a.makeTensorInfo(s.shape,n,d)}let u=new Z(s.shape,r);return a.runWebGPUProgram(u,[s],n)}}function _({opType:r,cpuKernelImpl:t,supportsComplex:e=!1,dtype:i}){return({inputs:o,backend:s})=>{let{a,b:n}=o,u=s;if(e&&a.dtype==="complex64"){let l=u.tensorMap.get(a.dataId),c=u.tensorMap.get(n.dataId),h,m;if(r!==N.MUL)[h,m]=[[l.complexTensorInfos.real,c.complexTensorInfos.real],[l.complexTensorInfos.imag,c.complexTensorInfos.imag]].map(C=>{let[I,k]=C,R={dataId:I.dataId,dtype:I.dtype,shape:a.shape},P={dataId:k.dataId,dtype:k.dtype,shape:n.shape},$=new le(r,a.shape,n.shape);return u.runWebGPUProgram($,[R,P],pe(I.dtype,k.dtype))});else{let C=new Me(N.COMPLEX_MULTIPLY_REAL,a.shape,n.shape),I=new Me(N.COMPLEX_MULTIPLY_IMAG,a.shape,n.shape),k=[{dataId:l.complexTensorInfos.real.dataId,dtype:l.complexTensorInfos.real.dtype,shape:a.shape},{dataId:l.complexTensorInfos.imag.dataId,dtype:l.complexTensorInfos.imag.dtype,shape:a.shape},{dataId:c.complexTensorInfos.real.dataId,dtype:c.complexTensorInfos.real.dtype,shape:n.shape},{dataId:c.complexTensorInfos.imag.dataId,dtype:c.complexTensorInfos.imag.dtype,shape:n.shape}];h=u.runWebGPUProgram(C,k,"float32"),m=u.runWebGPUProgram(I,k,"float32")}let f=oe({inputs:{real:h,imag:m},backend:u});return u.disposeData(h.dataId),u.disposeData(m.dataId),f}let p=i||pe(a.dtype,n.dtype);if((a.dtype==="string"||n.dtype==="string"||u.shouldExecuteOnCPU([a,n]))&&t!=null){let l=u.tensorMap.get(a.dataId).values,c=u.tensorMap.get(n.dataId).values,h=a.dtype==="string"?w.fromUint8ToStringArray(l):l,m=a.dtype==="string"?w.fromUint8ToStringArray(c):c,[f,C]=t(a.shape,n.shape,h,m,p);return u.makeTensorInfo(C,p,f)}let d=new le(r,a.shape,n.shape);return u.runWebGPUProgram(d,[a,n],p)}}var{addImpl:ma,castImpl:fa,ceilImpl:ga,concatImpl:xa,equalImpl:Ca,expImpl:ya,expm1Impl:Sa,floorImpl:wa,floorDivImpl:ba,gatherNdImpl:va,gatherV2Impl:Ia,greaterEqualImpl:ka,greaterImpl:Ra,lessEqualImpl:Da,lessImpl:Pa,logImpl:$a,maxImpl:Na,maximumImpl:za,minimumImpl:Aa,multiplyImpl:Fa,negImpl:La,notEqualImpl:Ta,prodImpl:_a,rangeImpl:Ba,rsqrtImpl:Ea,scatterImpl:Ua,simpleAbsImpl:Wa,sliceImpl:Ma,stridedSliceImpl:Oa,stringNGramsImpl:Va,subImpl:Ga,tileImpl:Ha,topKImpl:Ka,transposeImpl:Xa,uniqueImpl:Cg}=Qs;var Ol=z({opType:v.ABS,cpuKernelImpl:Wa}),qa={kernelName:"Abs",backendName:"webgpu",kernelFunc:Ol};g();var Vl=z({opType:v.ACOS}),Ya={kernelName:Xo,backendName:"webgpu",kernelFunc:Vl};g();var Gl=z({opType:v.ACOSH}),ja={kernelName:qo,backendName:"webgpu",kernelFunc:Gl};g();var Hl=_({opType:N.ADD,cpuKernelImpl:ma,supportsComplex:!0}),Qa={kernelName:"Add",backendName:"webgpu",kernelFunc:Hl};g();var st=class{constructor(t){this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t[0],this.variableNames=t.map((e,i)=>`T${i}`),this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.shaderKey="addN"}getUserCode(){let t=[];this.variableNames.forEach(o=>{t.push(`let v${o} = get${o}ByOutputCoords(coords);`)});let e=this.variableNames.map(o=>`v${o}`).join(" + ");return`
      ${y("index")} {
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
    `}};function Kl(r){let{inputs:t,backend:e}=r,i=t;if(i.length===1)return O({inputs:{x:i[0]},backend:e});let o=i.map(n=>n.dtype).reduce((n,u)=>pe(n,u)),s=i.map(n=>n.shape),a=new st(s);return e.runWebGPUProgram(a,i,o)}var Za={kernelName:jo,backendName:"webgpu",kernelFunc:Kl};g();g();g();g();var at=class{constructor(t,e){this.variableNames=["A"],this.workgroupSize=[16,16,1];let i=new Array(t.length);for(let o=0;o<i.length;o++)i[o]=t[e[o]];this.outputShape=i,this.dispatchLayout={x:[0],y:[1]},this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[1,1,1]),this.shaderKey="transposeShared"}getUserCode(){x.assert(this.workgroupSize[0]===this.workgroupSize[1],()=>`Must be a square tile, current tile shape is ${this.workgroupSize[0]} x ${this.workgroupSize[1]}`);let t=this.workgroupSize[0];return`
      var<workgroup> tile : array<array<f32, ${this.workgroupSize[0]+1}>, ${this.workgroupSize[0]}>;
      ${y()} {
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
    `}};var nt=class{constructor(t,e){this.variableNames=["A"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0;let i=new Array(t.length);for(let o=0;o<i.length;o++)i[o]=t[e[o]];this.outputShape=i,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.newDim=e,this.shaderKey=`transpose_${e}`}getUserCode(){let t=E(this.outputShape.length),e=No(this.newDim);return`
      ${y("index")} {
        for(var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if(flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            setOutputAtIndex(flatIndex, A[getIndexFromCoords${this.outputShape.length}D(
              ${t}(${e}), uniforms.aShape)]);
          }
        }
      }
    `}};function No(r){let t=r.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let e=new Array(t);for(let i=0;i<r.length;i++)e[r[i]]=`coords.${re(i)}`;return e.join()}function X(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{perm:s}=i,a=e,n=o.shape.length,u=new Array(n);for(let d=0;d<u.length;d++)u[d]=o.shape[s[d]];if(e.shouldExecuteOnCPU([o])){let l=a.tensorMap.get(o.dataId).values,c=Xa(l,o.shape,o.dtype,s,u);return e.makeTensorInfo(u,o.dtype,c)}if(o.shape.length===2&&x.arraysEqual(s,[1,0])){let d=new at(o.shape,s);return a.runWebGPUProgram(d,[o],o.dtype)}let p=new nt(o.shape,s);return a.runWebGPUProgram(p,[o],o.dtype)}var Ja={kernelName:_s,backendName:"webgpu",kernelFunc:X};g();var ut=class{constructor(t,e,i){this.variableNames=["x"],this.uniforms="reduceSize : i32,",this.size=!0,this.inputShape=[t.batchSize,t.inSize];let[o]=w.computeOutAndReduceShapes(this.inputShape,[1]);this.outputShape=o.length===0?[1]:o,t.inSize>=32768&&i>=512?this.workgroupSize=[512,1,1]:t.inSize>=4096?this.workgroupSize=[256,1,1]:this.workgroupSize=[64,1,1],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,[1,1,1]),this.reduceType=e,this.shaderKey=`reduce_${e}`}getUserCode(){let t="",e="0.0",i=this.workgroupSize[0];this.reduceType==="min"||this.reduceType==="max"?(t=`
         if (isnan(candidate)) {
          bestValue = uniforms.NAN;
         } else if (!isnan(bestValue) && candidate ${this.reduceType==="min"?"<":">"} bestValue)
           {  bestValue = candidate; }`,e="f32(x[offset])"):this.reduceType==="sum"||this.reduceType==="mean"?t=" bestValue = bestValue + candidate; ":this.reduceType==="prod"?(t=" bestValue = bestValue * candidate; ",e="1.0"):this.reduceType==="all"?(t=" bestValue = f32(bestValue >= 1.0 && candidate >= 1.0); ",e="1.0"):this.reduceType==="any"&&(t=" bestValue = f32(bestValue >= 1.0 || candidate >= 1.0); ",e="0.0");let o=this.reduceType==="mean"?"setOutputAtIndex(outputIndex, bestValue / f32(uniforms.reduceSize));":"setOutputAtIndex(outputIndex, bestValue);";return`
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
       ${y("index")} {
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
          ${o}
        }
       }
     `}};var Xl={mean:"float32",all:"bool",any:"bool"};function J(r,t,e,i,o){let s=r.shape.length,a=[],n=x.parseAxisParam(t,r.shape),u=n,p=w.getAxesPermutation(u,s),d=r;p!=null&&(d=X({inputs:{x:r},attrs:{perm:p},backend:o}),u=w.getInnerMostAxes(u.length,s),a.push(d)),w.assertAxesAreInnerMostDims(i,u,s);let[l,c]=w.computeOutAndReduceShapes(d.shape,u),h=l;e&&(h=w.expandShapeToKeepDim(l,n));let m;if((i==="max"||i==="prod")&&o.shouldExecuteOnCPU([d])){let f=o.tensorMap.get(d.dataId).values;switch(i){case"max":let C=Na(f,x.sizeFromShape(c),h,r.dtype);m=o.makeTensorInfo(h,r.dtype,C);break;case"prod":let{outVals:I,outShape:k,outDtype:R}=_a(d.shape,d.dtype,f,u);m=o.makeTensorInfo(k,R,I);break;default:throw new Error(`${i} CPU implementation is not yet supported.`)}}else{let f=x.sizeFromShape(c),I=x.sizeFromShape(d.shape)/f,k={windowSize:f,inSize:f,batchSize:I,outSize:1},R=Xl[i]||Xs(r.dtype),P=[{type:"int32",data:[f]}],$=new ut(k,i,o.device.limits.maxComputeWorkgroupSizeX),A=o.runWebGPUProgram($,[d],R,P);a.push(A),m=D({inputs:{x:A},attrs:{shape:h},backend:o})}return a.forEach(f=>o.disposeData(f.dataId)),m}function ql(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{keepDims:s,axis:a}=i;return J(o,a,s,"all",e)}var en={kernelName:"All",backendName:"webgpu",kernelFunc:ql};g();function Yl(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{keepDims:s,axis:a}=i;return J(o,a,s,"any",e)}var tn={kernelName:"Any",backendName:"webgpu",kernelFunc:Yl};g();g();var ke=class{constructor(t,e,i){this.workgroupSize=[64,1,1],this.variableNames=["x"],this.uniforms="infinityValue : f32,",this.size=!0;let o=[e];this.op=i==="min"?"<":">";let[s,a]=w.computeOutAndReduceShapes(t,o);this.outputShape=s.length===0?[1]:s,this.dispatchLayout=b(this.outputShape),x.sizeFromShape(a)<32?(this.type="plain",this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize)):(this.type="shared",this.dispatch=S(this.dispatchLayout,this.outputShape,[1,1,1])),this.inputShape=t,this.shaderKey=`argMinMax_${this.op}_${this.type}`}getUserCode(){let t=this.workgroupSize[0],e=()=>this.inputShape.length===1?"uniforms.xShape":`uniforms.xShape.${re(this.inputShape.length-1)}`,i=()=>{let o="";if(this.outputShape.length===1)this.inputShape.length!==1&&(o+="outputCoords,");else for(let s=0;s<this.outputShape.length;s++)o+=`outputCoords.${re(s)},`;return o};return this.type==="shared"?`
      fn DIV_CEIL(a : u32, b : u32) -> u32 {
        return ((a - 1u) / b + 1u);
      }

      ${`
      var<workgroup> xBestIndices : array<i32, ${t}>;
      var<workgroup> xBestValues : array<f32, ${t}>;
    `}

      ${y("index")} {
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
      ${y("index")} {
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
      `}};function jl(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{axis:s}=i,a=x.parseAxisParam(s,o.shape),n=w.getAxesPermutation(a,o.shape.length),u=o,p=[];n!=null&&(u=X({inputs:{x:o},backend:e,attrs:{perm:n}}),p.push(u),a=w.getInnerMostAxes(a.length,u.shape.length)),w.assertAxesAreInnerMostDims("argMax",[a[0]],u.shape.length);let d=new ke(u.shape,a[0],"max"),l=[{type:"float32",data:[Number.NEGATIVE_INFINITY]}],c=e.runWebGPUProgram(d,[u],"int32",l);return p.forEach(h=>e.disposeData(h.dataId)),c}var on={kernelName:Jo,backendName:"webgpu",kernelFunc:jl};g();function Ql(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{axis:s}=i,a=x.parseAxisParam(s,o.shape),n=w.getAxesPermutation(a,o.shape.length),u=o,p=[];n!=null&&(u=X({inputs:{x:o},backend:e,attrs:{perm:n}}),p.push(u),a=w.getInnerMostAxes(a.length,u.shape.length)),w.assertAxesAreInnerMostDims("argMin",[a[0]],u.shape.length);let d=new ke(u.shape,a[0],"min"),l=[{type:"float32",data:[Number.POSITIVE_INFINITY]}],c=e.runWebGPUProgram(d,[u],"int32",l);return p.forEach(h=>e.disposeData(h.dataId)),c}var rn={kernelName:er,backendName:"webgpu",kernelFunc:Ql};g();var Zl=z({opType:v.ASIN}),sn={kernelName:tr,backendName:"webgpu",kernelFunc:Zl};g();var Jl=z({opType:v.ASINH}),an={kernelName:or,backendName:"webgpu",kernelFunc:Jl};g();var ec=z({opType:v.ATAN}),nn={kernelName:rr,backendName:"webgpu",kernelFunc:ec};g();var tc=_({opType:N.ATAN2}),un={kernelName:sr,backendName:"webgpu",kernelFunc:tc};g();var oc=z({opType:v.ATANH}),pn={kernelName:ir,backendName:"webgpu",kernelFunc:oc};g();g();var pt=class{constructor(t){this.variableNames=["x"],this.uniforms="strides : vec2<i32>,",this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="poolWithFilterSizeEqualsOne"}getUserCode(){return`
      ${y("index")} {
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
    `}};var ne=class{constructor(t,e,i=!1,o=!1,s=!1){if(this.variableNames=["x"],this.uniforms="strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, convDims : vec2<i32>, filterDims : vec2<i32>,",this.workgroupSize=[128,1,1],this.size=!0,e==="avg"&&i)throw new Error("Cannot compute positions for average pool.");this.outputShape=t.outShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.poolType=e,this.computePositions=i,this.flattenPositions=o,this.includeBatchIndex=s,this.shaderKey=`pool2D_${e}_${i}_${o}_${s}`}getUserCode(){let t;this.poolType==="avg"?t="resultValue = resultValue + value; count = count + 1.0;":this.computePositions?t=`let currMaxValue = mix(value, maxValue, maxValueFound);
      if (value >= currMaxValue) {
        maxValue = value;
        maxValueFound = 1.0;
        maxPosition = ${this.flattenPositions?this.includeBatchIndex?"((batch * uniforms.xShape[1] + xR) * uniforms.xShape[2] + xC) * uniforms.xShape[3] + d":"(xR * uniforms.xShape[2] + xC) * uniforms.xShape[3] + d":"wR * uniforms.filterDims.y + wC"};
      }`:t="resultValue = max(value, resultValue);";let e="resultValue";return this.poolType==="avg"&&(e="resultValue / max(count, 1.0)"),`
      ${y("index")} {
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
    `}},ge=class{constructor(t,e,i=!1,o=!1,s=!1){if(this.variableNames=["x"],this.uniforms="strides : vec3<i32>, pads : vec3<i32>, convDims : vec3<i32>, filterDims : vec3<i32>,",this.workgroupSize=[128,1,1],this.size=!0,e==="avg"&&i)throw new Error("Cannot compute positions for average pool.");this.outputShape=t.outShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.poolType=e,this.computePositions=i,this.flattenPositions=o,this.includeBatchIndex=s,this.shaderKey=`pool3D_${e}_${i}_${o}_${s}`}getUserCode(){let t;this.poolType==="avg"?t="resultValue += value; count += 1.0;":this.computePositions?t=`let currMaxValue = mix(value, maxValue, maxValueFound);
      if (value >= currMaxValue) {
        maxValue = value;
        maxValueFound = 1.0;
        maxPosition = ${this.flattenPositions?this.includeBatchIndex?"(((batch * uniforms.xShape.y + xD) * uniforms.xShape.z + xR) * uniforms.xShape.w + xC) * uniforms.xShape.u + ch":"((xD * uniforms.xShape.z + xR) * uniforms.xShape.w + xC) * uniforms.xShape.u + ch":"wD * uniforms.filterDims.y * uniforms.filterDims.y + wR * uniforms.filterDims.z + wC"};
      }`:t="resultValue = max(value, resultValue);";let e="resultValue";return this.poolType==="avg"&&(e="resultValue / max(count, 1.0)"),`
      ${y("index")} {
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
    `}};g();function zo(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{reductionIndices:s,keepDims:a}=i;return J(o,s,a,"max",e)}var dn={kernelName:"Max",backendName:"webgpu",kernelFunc:zo};g();function Ao(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{keepDims:s,axis:a}=i;return J(o,a,s,"mean",e)}var ln={kernelName:Ni,backendName:"webgpu",kernelFunc:Ao};function dt(r,t,e,i){if(t.filterWidth===1&&t.filterHeight===1&&x.arraysEqual(t.inShape,t.outShape))return O({inputs:{x:r},backend:i});if(t.filterWidth===t.inWidth&&t.filterHeight===t.inHeight&&t.batchSize===1&&t.padInfo.type==="VALID"){let a=r.shape.length,n=D({inputs:{x:r},backend:i,attrs:{shape:[r.shape[a-3]*r.shape[a-2],r.shape[a-1]]}}),u;e==="avg"?u=Ao({inputs:{x:n},backend:i,attrs:{axis:0,keepDims:!1}}):(x.assert(e==="max",()=>`Invalid pool type ${e}`),u=zo({inputs:{x:n},backend:i,attrs:{reductionIndices:0,keepDims:!1}}));let p=D({inputs:{x:u},backend:i,attrs:{shape:t.outShape}});return i.disposeData(n.dataId),i.disposeData(u.dataId),p}let o,s=[{type:"int32",data:[t.strideHeight,t.strideWidth]}];return t.filterHeight===1&&t.filterWidth===1?o=new pt(t):(e==="avg"?o=new ne(t,"avg"):(x.assert(e==="max",()=>`Invalid pool type ${e}`),o=new ne(t,"max")),s.push({type:"int32",data:[t.padInfo.top,t.padInfo.left]},{type:"int32",data:[t.dilationHeight,t.dilationWidth]},{type:"int32",data:[t.inHeight,t.inWidth]},{type:"int32",data:[t.effectiveFilterHeight,t.effectiveFilterWidth]})),i.runWebGPUProgram(o,[r],r.dtype,s)}function rc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{filterSize:s,strides:a,pad:n,dimRoundingMode:u}=i,d=w.computePool2DInfo(o.shape,s,a,1,n,u);return dt(o,d,"avg",e)}var cn={kernelName:ar,backendName:"webgpu",kernelFunc:rc};g();function ic(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{filterSize:s,strides:a,pad:n,dataFormat:u,dimRoundingMode:p}=i,d=[1,1,1],l=w.computePool3DInfo(o.shape,s,a,d,n,p,u),c=new ge(l,"avg"),h=[{type:"int32",data:[l.strideDepth,l.strideHeight,l.strideWidth]},{type:"int32",data:[l.padInfo.front,l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.inDepth,l.inHeight,l.inWidth]},{type:"int32",data:[l.effectiveFilterDepth,l.effectiveFilterHeight,l.effectiveFilterWidth]}];return e.runWebGPUProgram(c,[o],o.dtype,h)}var hn={kernelName:ur,backendName:"webgpu",kernelFunc:ic};g();var lt=class{constructor(t){this.variableNames=["dy"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32, avgMultiplier : f32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="avgPool2DBackprop"}getUserCode(){return`
      ${y("index")} {
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
    `}},ct=class{constructor(t){this.variableNames=["dy"],this.uniforms=`strides : vec3<i32>, pads : vec3<i32>, filterDims : vec3<i32>,
       outDepth : i32, outHeight : i32, outWidth : i32, avgMultiplier : f32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="avgPool3DBackprop"}getUserCode(){return`
      ${y("index")} {
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
    `}};function sc(r){let{inputs:t,backend:e,attrs:i}=r,{dy:o,input:s}=t,a=s,{filterSize:n,strides:u,pad:p,dimRoundingMode:d}=i,l=w.computePool3DInfo(a.shape,n,u,1,p,d),c=new ct(l),h=1/(l.filterDepth*l.filterHeight*l.filterWidth),m=[{type:"int32",data:[l.strideDepth,l.strideHeight,l.strideWidth]},{type:"int32",data:[l.effectiveFilterDepth-1-l.padInfo.front,l.effectiveFilterHeight-1-l.padInfo.top,l.effectiveFilterWidth-1-l.padInfo.left]},{type:"int32",data:[l.effectiveFilterDepth,l.effectiveFilterHeight,l.effectiveFilterWidth]},{type:"int32",data:[l.outDepth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]},{type:"float32",data:[h]}];return e.runWebGPUProgram(c,[o],a.dtype,m)}var mn={kernelName:pr,backendName:"webgpu",kernelFunc:sc};g();function ac(r){let{inputs:t,backend:e,attrs:i}=r,{dy:o,input:s}=t,a=s;Ue([o,s],"avgPoolGrad");let{filterSize:n,strides:u,pad:p}=i,d=w.computePool2DInfo(a.shape,n,u,1,p),l=new lt(d),c=1/(d.filterHeight*d.filterWidth),h=[{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.effectiveFilterHeight-1-d.padInfo.top,d.effectiveFilterWidth-1-d.padInfo.left]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[d.effectiveFilterHeight,d.effectiveFilterWidth]},{type:"int32",data:[d.outHeight]},{type:"int32",data:[d.outWidth]},{type:"float32",data:[c]}];return e.runWebGPUProgram(l,[o],a.dtype,h)}var fn={kernelName:nr,backendName:"webgpu",kernelFunc:ac};g();function nc(r){let{inputs:t,backend:e,attrs:i}=r,{a:o,b:s}=t,{transposeA:a,transposeB:n}=i;return Se({a:o,b:s,transposeA:a,transposeB:n,backend:e})}var gn={kernelName:dr,backendName:"webgpu",kernelFunc:nc};g();g();var ht=class{constructor(t,e){this.variableNames=["source"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.rank=e.length,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.start=t,this.uniforms=`start : ${E(t.length)}, `,this.shaderKey="slice"}getUserCode(){let t=E(this.rank),e=uc(this.rank),i;return this.start.length===1?i=this.outputShape.map((s,a)=>"sourceLoc = uniforms.start + coords;"):i=this.outputShape.map((s,a)=>`sourceLoc.${Fo[a]} = uniforms.start.${re(a)} + coords.${Fo[a]};`),`
      ${y("index")} {
        if (index < uniforms.size) {
          var sourceLoc : ${t};
          let coords = getCoordsFromIndex(index);
          ${i.join(`
`)}
          setOutputAtIndex(index, getSource(${e}));
        }
      }
    `}},Fo=["x","y","z","w","u","v"];function uc(r){if(r===1)return"sourceLoc";if(r<=6)return Fo.slice(0,r).map(t=>`sourceLoc.${t}`).join(",");throw Error(`Slicing for rank ${r} is not yet supported`)}function se(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{begin:s,size:a}=i,[n,u]=ve.parseSliceParams(o,s,a);if(ve.assertParamsValid(o,n,u),e.shouldExecuteOnCPU([o])||o.dtype==="string"){let l=e.tensorMap.get(o.dataId),c=Ma(l.values,n,u,o.shape,o.dtype);return e.makeTensorInfo(u,o.dtype,c)}if(x.sizeFromShape(u)===0)return e.makeTensorInfo(u,o.dtype,[]);let p=new ht(n,u),d=[{type:"int32",data:n}];return e.runWebGPUProgram(p,[o],o.dtype,d)}var xn={kernelName:cs,backendName:"webgpu",kernelFunc:se};var pc=r=>{let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{blockShape:s,crops:a}=i;x.assert(o.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGPU backend not implemented yet");let n=s.reduce((k,R)=>k*R),u=w.getReshaped(o.shape,s,n),p=w.getPermuted(u.length,s.length),d=w.getReshapedPermuted(o.shape,s,n),l=w.getSliceBeginCoords(a,s.length),c=w.getSliceSize(d,a,s.length),h=[],m=D({inputs:{x:o},backend:e,attrs:{shape:u}}),f=X({inputs:{x:m},backend:e,attrs:{perm:p}}),C=D({inputs:{x:f},backend:e,attrs:{shape:d}}),I=se({inputs:{x:C},backend:e,attrs:{begin:l,size:c}});return h.push(m),h.push(f),h.push(C),h.forEach(k=>e.disposeData(k.dataId)),I},Cn={kernelName:lr,backendName:"webgpu",kernelFunc:pc};g();var dc=`
  fn bincount_write(index: i32, value: f32) {
    ${j("&result[index]","value","float32")}
  }
`,lc=`
  fn bincount_write(index: i32, value: f32) {
    atomicStore(&result[index], bitcast<i32>(value));
  }
`,Re=class{constructor(t,e,i=!1){this.outputShape=[],this.variableNames=["x"],this.uniforms="binCountSize : i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.hasWeights=!0,this.binaryOutput=!1,this.outputShape=t,this.rank=t.length,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.binaryOutput=i,i&&(this.atomic=!1),this.hasWeights=e,this.hasWeights&&this.variableNames.push("w"),this.shaderKey=`bincount_${this.hasWeights}_${this.binaryOutput}_${this.rank}`}getUserCode(){return`
    ${this.binaryOutput?lc:dc}
  ${y("index")} {
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
  `}};function cc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,weights:s}=t,{size:a}=i,n=x.sizeFromShape(o.shape),p=x.sizeFromShape(s.shape)>0,d=[a],l=s.dtype,c=W({backend:e,attrs:{shape:d,value:0,dtype:l}}),h=new Re([n],p),m=[{type:"int32",data:[a]}],f=p?[o,s]:[o];return e.runWebGPUProgram(h,f,l,m,c)}var yn={kernelName:cr,backendName:"webgpu",kernelFunc:cc};g();var mt=class{constructor(t){this.outputShape=[],this.variableNames=["s0","s1"],this.uniforms="s0Size : i32, s1Size : i32, ",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="broadcastArgs"}getUserCode(){return`
  ${y("index")} {
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
  `}};function hc(r){let{inputs:t,backend:e}=r,{s0:i,s1:o}=t;if(e.shouldExecuteOnCPU([i,o])){let d=e.tensorMap.get(i.dataId),l=e.tensorMap.get(o.dataId),c=d.values,h=l.values,m=w.assertAndGetBroadcastShape(Array.from(c),Array.from(h));return e.makeTensorInfo([m.length],"int32",Int32Array.from(m))}let s=x.sizeFromShape(i.shape),a=x.sizeFromShape(o.shape),n=Math.max(s,a),u=new mt(n),p=[{type:"int32",data:[s]},{type:"int32",data:[a]}];return e.runWebGPUProgram(u,[i,o],"int32",p)}var Sn={kernelName:hr,backendName:"webgpu",kernelFunc:hc};g();g();g();var Lo=_({opType:N.NOT_EQUAL,dtype:"bool",cpuKernelImpl:Ta}),wn={kernelName:Ei,backendName:"webgpu",kernelFunc:Lo};g();function ce(r){let{inputs:t,backend:e}=r,{input:i}=t,o=e.tensorMap.get(i.dataId);return O({inputs:{x:o.complexTensorInfos.real},backend:e})}var bn={kernelName:Yi,backendName:"webgpu",kernelFunc:ce};function vn(r,t){let e=new Z(r.shape,v.TO_INT),i=t.runWebGPUProgram(e,[r],"int32");return{dataId:i.dataId,shape:i.shape,dtype:i.dtype}}function To(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{dtype:s}=i;if(s==="complex64"){if(o.dtype==="complex64")return O({inputs:{x:o},backend:e});let a=js(o.shape),n=To({inputs:{x:o},backend:e,attrs:{dtype:"float32"}}),u=oe({inputs:{real:n,imag:a},backend:e});return a.dispose(),e.disposeData(n.dataId),u}if(o.dtype==="complex64"){let a=ce({inputs:{input:o},backend:e}),n=To({inputs:{x:a},backend:e,attrs:{dtype:s}});return e.disposeData(a.dataId),n}if(!x.hasEncodingLoss(o.dtype,s)){let a=O({inputs:{x:o},backend:e});return{dataId:a.dataId,shape:a.shape,dtype:s}}if(e.shouldExecuteOnCPU([o])){let a=e.tensorMap.get(o.dataId).values,[n,u,p]=fa(a,o.shape,o.dtype,s);return e.makeTensorInfo(n,u,p)}if(s==="int32")return vn(o,e);if(s==="bool"){let a=e.makeTensorInfo([],"bool",x.getTypedArrayFromDType("bool",1)),u=Lo({inputs:{a:o,b:a},backend:e});return e.disposeData(a.dataId),u}throw new Error(`Error in Cast: failed to cast ${o.dtype} to ${s}`)}var In={kernelName:mr,backendName:"webgpu",kernelFunc:To};g();var mc=z({opType:v.CEIL,cpuKernelImpl:ga}),kn={kernelName:fr,backendName:"webgpu",kernelFunc:mc};g();var ft=class{constructor(t){this.variableNames=["A"],this.uniforms="minVal : f32, maxVal : f32,",this.workPerThread=4,this.workgroupSize=[64,1,1],this.outputComponent=4,this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.shaderKey="clipVec4"}getUserCode(){return`
      ${y("index")} {
        if(index < uniforms.size) {
          let value = getAByOutputIndex(index);
          var clampedValue = clamp(
              value, vec4<f32>(uniforms.minVal), vec4<f32>(uniforms.maxVal));
          clampedValue = select(clampedValue, value, isnanVec4(value));
          setOutputAtIndex(index, clampedValue);
        }
      }
    `}};var gt=class{constructor(t){this.variableNames=["A"],this.uniforms="minVal : f32, maxVal : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="clip"}getUserCode(){return`
      ${y("index")} {
        if(index < uniforms.size) {
          let value = getAByOutputIndex(index);
          if (isnan(value)) {
            setOutputAtIndex(index, value);
            return;
          }
          setOutputAtIndex(index, clamp(value, uniforms.minVal, uniforms.maxVal));
        }
      }
    `}};function fc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{clipValueMin:s,clipValueMax:a}=i,n,u=[{type:"float32",data:[s]},{type:"float32",data:[a]}];return x.sizeFromShape(o.shape)%4===0?n=new ft(o.shape):n=new gt(o.shape),e.runWebGPUProgram(n,[o],o.dtype,u)}var Rn={kernelName:gr,backendName:"webgpu",kernelFunc:fc};g();var xt=class{constructor(t){this.outputShape=[],this.variableNames=["real","imag"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="complexAbs"}getUserCode(){return`
    ${y("index")} {
      if (index < uniforms.size) {
        let re = abs(getRealByOutputIndex(index));
        let im = abs(getImagByOutputIndex(index));
        let mx = max(re, im);

        // The length function in wgsl may be not underflow-safe on some GPUs.
        // So the safe solution is to ensure underflow-safety in all cases.
        setOutputAtIndex(index, select(mx * length(vec2<f32>(1, min(re, im)/mx)), 0.0, mx == 0.0));
      }
    }
  `}};function Dn(r,t){return{dataId:t.dataId,dtype:t.dtype,shape:r.shape}}function gc(r){let{inputs:t,backend:e}=r,{x:i}=t,o=e.tensorMap.get(i.dataId),s=new xt(i.shape),a=[Dn(i,o.complexTensorInfos.real),Dn(i,o.complexTensorInfos.imag)];return e.runWebGPUProgram(s,a,a[0].dtype)}var Pn={kernelName:Cr,backendName:"webgpu",kernelFunc:gc};g();g();g();var Ct=class{constructor(t){this.uniforms="",this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=w.computeOutShape(t,1),this.variableNames=t.map((e,i)=>`T${i}`),this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.offsetLength=t.length-1;for(let e=0;e<this.offsetLength;e++)this.uniforms+=`offset${e} : i32,`;this.shaderKey="concat"}getUserCode(){let t=[];if(this.offsetLength>0){t.push("if (yC < uniforms.offset0){ setOutputAtCoords(coords.x, coords.y, getT0(yR, yC)); }");for(let s=1;s<this.offsetLength;s++)t.push(`else if (yC < uniforms.offset${[s]}){ setOutputAtCoords(coords.x, coords.y, getT${s}(yR, yC - uniforms.offset${s-1})); }`);let i=this.offsetLength,o=this.offsetLength-1;t.push(`else { setOutputAtCoords(coords.x, coords.y, getT${i}(yR, yC - uniforms.offset${o})); }`)}else t.push("setOutputAtCoords(coords.x, coords.y, getT0(yR, yC));");return`
      ${y("index")} {
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
    `}};g();function we(r){let{inputs:t,backend:e}=r,{input:i}=t,o=e.tensorMap.get(i.dataId);return O({inputs:{x:o.complexTensorInfos.imag},backend:e})}var $n={kernelName:ui,backendName:"webgpu",kernelFunc:we};function De(r,t,e){let i=r[0].dtype;if(i==="complex64"){let m=r.map(R=>ce({inputs:{input:R},backend:e})),f=r.map(R=>we({inputs:{input:R},backend:e})),C=De(m,t,e),I=De(f,t,e),k=oe({inputs:{real:C,imag:I},backend:e});return m.forEach(R=>e.disposeData(R.dataId)),f.forEach(R=>e.disposeData(R.dataId)),e.disposeData(C.dataId),e.disposeData(I.dataId),k}let o=e.shouldExecuteOnCPU(r);if(i==="string"&&(o=!0),o){let m=r.map($=>{let F=[-1,x.sizeFromShape($.shape.slice(t))];return D({inputs:{x:$},backend:e,attrs:{shape:F}})}),f=m.map($=>({vals:e.readSync($.dataId),shape:$.shape})),C=w.computeOutShape(m.map($=>$.shape),1),I=m[0].shape[0]===1,k=xa(f,C,i,I),R=w.computeOutShape(r.map($=>$.shape),t),P=e.makeTensorInfo(R,i,k);return m.forEach($=>e.disposeData($.dataId)),P}let s=e.device.limits.maxStorageBuffersPerShaderStage-1;if(r.length>s){let m=[];for(let C=0;C<r.length;C+=s){let I=r.slice(C,C+s);m.push(De(I,t,e))}let f=De(m,t,e);for(let C of m)e.disposeData(C.dataId);return f}let{tensors2D:a,outShape:n}=xc(r,t,e),u=a.map(m=>m.shape),p=new Ct(u),d=[],l=new Array(u.length-1);if(l.length>0){l[0]=u[0][1],d.push({type:"int32",data:[l[0]]});for(let m=1;m<l.length;m++)l[m]=l[m-1]+u[m][1],d.push({type:"int32",data:[l[m]]})}let c=e.runWebGPUProgram(p,a,a[0].dtype,d);a.forEach(m=>e.disposeData(m.dataId));let h=D({inputs:{x:c},backend:e,attrs:{shape:n}});return e.disposeData(c.dataId),h}function xc(r,t,e){let i=w.computeOutShape(r.map(s=>s.shape),t);return{tensors2D:r.map(s=>D({inputs:{x:s},backend:e,attrs:{shape:[x.sizeFromShape(s.shape.slice(0,t)),x.sizeFromShape(s.shape.slice(t))]}})),outShape:i}}function _o(r){let{inputs:t,backend:e,attrs:i}=r,{axis:o}=i,s=x.parseAxisParam(o,t[0].shape)[0],a=t.map(p=>p.shape);w.assertParamsConsistent(a,s);let n=w.computeOutShape(t.map(p=>p.shape),s);if(x.sizeFromShape(n)===0)return e.makeTensorInfo(n,t[0].dtype,[]);let u=t.filter(p=>x.sizeFromShape(p.shape)>0);return u.length===1?O({inputs:{x:u[0]},backend:e}):De(u,s,e)}var Nn={kernelName:yr,backendName:"webgpu",kernelFunc:_o};g();g();function Cc(r,t,e,i,o=!1,s=null,a=!1,n=4,u=4,p=4){let d=T=>{switch(T){case 1:return"resData = f32(x[xIndex]);";case 3:return"resData = vec3<f32>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);";case 4:return"resData = vec4<f32>(x[xIndex / 4]);";default:throw new Error(`innerElementSize ${T} is not supported.`)}},l=T=>{switch(T){case 1:return"return f32(W[row * uniforms.wShape[3] + col]);";case 4:return"return vec4<f32>(W[(row * uniforms.wShape[3] + col) / 4]);";default:throw new Error(`innerElementSize ${T} is not supported.`)}},c=r?`
      let coord = vec4<i32>(batch, xRow, xCol, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, xRow, xCol);
      `,h=r?`
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
      `,m=r?"uniforms.xShape[1]":"uniforms.xShape[2]",f=r?"uniforms.xShape[2]":"uniforms.xShape[3]",C=r?"row":"col",I=r?"col":"row",k=`
      let inChannels = uniforms.wShape[2];
      let outWidth = ${r?"uniforms.outShape[2]":"uniforms.outShape[3]"};
      let outRow = ${C} / outWidth;
      let outCol = ${C} % outWidth;

      let WRow = ${I} / (uniforms.filterDims[1] * inChannels);
      let WCol = ${I} / inChannels % uniforms.filterDims[1];
      let xRow = outRow * uniforms.strides[0] + uniforms.dilations[0] * WRow - uniforms.pads[0];
      let xCol = outCol * uniforms.strides[1] + uniforms.dilations[1] * WCol - uniforms.pads[1];
      let xCh = ${I} % inChannels;
      var resData = ${L(n)}(0.0);
      // The bounds checking is always needed since we use it to pad zero for
      // the 'same' padding type.
      if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${f}) {
        ${c}
        let xIndex = getIndexFromCoords4D(coord, uniforms.xShape);
        ${d(n)}
      }
      return resData;`,R=r?t&&i?`
      ${k}`:`
      if (row < uniforms.dimAOuter && col < uniforms.dimInner) {
        ${k}
      }
      return ${L(n)}(0.0);`:i&&e?`
      ${k}`:`
      if (row < uniforms.dimInner && col < uniforms.dimBOuter) {
        ${k}
      }
      return ${L(n)}(0.0);`,P=`${l(u)}`,$=L(p),A=r?L(n):L(u),F=r?L(u):L(n);return`
      ${K(s,a,p===4,4)}
      fn mm_readA(batch: i32, row : i32, col : i32) -> ${A} {
        ${r?R:P}
      }

      fn mm_readB(batch: i32, row : i32, col : i32) -> ${F} {
        ${r?P:R}
      }

      fn mm_write(batch: i32, row : i32, col : i32, valueIn : ${$}) {
        if (row < uniforms.dimAOuter && col < uniforms.dimBOuter)
        {
        var value = valueIn;
        let outWidth = ${r?"uniforms.outShape[2]":"uniforms.outShape[3]"};
        ${h}
        ${Q(o,s)}
        setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }`}var yt=class{constructor(t,e,i,o,s=!1,a=null,n=!1,u=!1){this.variableNames=["x","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, dilations : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=t.outShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.isVec4=((t.inChannels%4===0||t.inChannels%3===0)&&this.isChannelsLast||t.outWidth%4===0&&!this.isChannelsLast)&&t.outChannels%4===0,this.dispatchLayout=this.isChannelsLast?{x:[3],y:[1,2],z:[0]}:{x:[2,3],y:[1],z:[0]},this.workgroupSize=_e(this.dispatchLayout,this.outputShape,this.isVec4),this.elementsPerThread=Be(this.dispatchLayout,this.outputShape,this.isVec4),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread),this.isVec4?(this.outputComponent=4,this.isChannelsLast&&t.inChannels%4!==0?(this.innerElementSize=3,this.variableComponents=[1,4]):(this.innerElementSize=4,this.variableComponents=[4,4]),s&&(this.variableNames.push("bias"),this.variableComponents.push(4)),n&&(this.variableNames.push("preluActivationWeights"),this.variableComponents.push(4))):(this.innerElementSize=this.elementsPerThread[0],s&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights")),this.sequentialAccessByThreads=u,this.addBias=s,this.activation=a,this.hasPreluActivationWeights=n,this.tileAOuter=this.workgroupSize[1]*this.elementsPerThread[1],this.tileBOuter=this.workgroupSize[0]*this.elementsPerThread[0],this.tileInner=Math.max(this.workgroupSize[0]*this.innerElementSize,this.workgroupSize[1]),this.fitAOuter=e%this.tileAOuter===0,this.fitBOuter=i%this.tileBOuter===0,this.fitInner=o%this.tileInner===0,this.shaderKey=`conv2DMM_${this.elementsPerThread}_${this.activation}}_${this.fitAOuter}_${this.fitBOuter}_${this.fitInner}_${this.isVec4}_${this.innerElementSize}_${this.isChannelsLast}_${this.sequentialAccessByThreads}`}getUserCode(){let t=this.isVec4?Ce(this.elementsPerThread,this.workgroupSize,!this.isChannelsLast,this.tileInner):ye(this.elementsPerThread,this.workgroupSize,!this.isChannelsLast,this.tileInner,!1,null,this.sequentialAccessByThreads),e=this.isVec4?[this.innerElementSize,4,4]:[1,1,1];return`
    ${Cc(this.isChannelsLast,this.fitAOuter,this.fitBOuter,this.fitInner,this.addBias,this.activation,this.hasPreluActivationWeights,e[0],e[1],e[2])}
    ${t}
  `}};var St=class{constructor(t,e=!1,i=null,o=!1){this.variableNames=["x","W"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>,",this.workgroupSize=[4,4,8],this.outputShape=t.outShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.dispatchLayout=this.isChannelsLast?{x:[2],y:[1],z:[0,3]}:{x:[3],y:[2],z:[0,1]},this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.addBias=e,this.activation=i,this.hasPreluActivationWeights=o,e&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),this.shaderKey=`conv2dnaive_${this.activation}_${this.isChannelsLast}`}getUserCode(){return`
       ${K(this.activation,this.hasPreluActivationWeights,!1,4)}
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
       ${y("index")} {
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
     `}};var wt=class{constructor(t,e){this.variableNames=["x"],this.uniforms=`pads : vec2<i32>, strides : vec2<i32>, dilations : vec2<i32>, outWidth : i32, itemsPerBlockRow : i32,
       inChannels : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=e,this.shaderKey=`im2col_${this.isChannelsLast}`}getUserCode(){let t=this.isChannelsLast?1:2,e=this.isChannelsLast?2:3,i=this.isChannelsLast?"coords[1]":"coords[2]",o=this.isChannelsLast?"coords[2]":"coords[1]",s=this.isChannelsLast?"getX(batch, xRow, xCol, ch)":"getX(batch, ch, xRow, xCol)";return`
    ${y("index")} {
      let coords = getCoordsFromIndex(index);
      if(index < uniforms.size) {
        let batch = coords[0];
        let row = ${i};
        let col = ${o};
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
   `}};function bt(r,t){let e=r.length;return e>=3?t?[...r.slice(0,-3),r[e-3]*r[e-2],r[e-1]]:[...r.slice(0,-3),r[e-3],r[e-2]*r[e-1]]:!t&&e===1&&r[0]>1?[r[0],1]:null}function yc({x:r,filter:t,convInfo:e,backend:i,bias:o=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:n=null}){let u=e.dataFormat==="channelsLast",p=!u,d=!1,l=u&&e.filterHeight===e.inHeight&&e.filterWidth===e.inWidth&&e.padInfo.type==="VALID",c=[],h,m;if(l){let I=e.inHeight*e.inWidth*e.inChannels;h=D({inputs:{x:r},backend:i,attrs:{shape:[1,e.batchSize,I]}}),m=D({inputs:{x:t},backend:i,attrs:{shape:[1,I,e.outChannels]}})}else h=D({inputs:{x:r},backend:i,attrs:{shape:u?[e.batchSize,e.inHeight*e.inWidth,e.inChannels]:[e.batchSize,e.inChannels,e.inHeight*e.inWidth]}}),m=D({inputs:{x:t},backend:i,attrs:{shape:[1,e.inChannels,e.outChannels]}});if(c.push(h),c.push(m),s!=null){let I=bt(s.shape,u);I!=null&&(s=D({inputs:{x:s},backend:i,attrs:{shape:I}}),c.push(s))}if(o!=null){let I=bt(o.shape,u);I!=null&&(o=D({inputs:{x:o},backend:i,attrs:{shape:I}}),c.push(o))}let f=Se({a:u?h:m,b:u?m:h,transposeA:p,transposeB:d,backend:i,bias:o,activation:n,preluActivationWeights:s,leakyreluAlpha:a}),C=D({inputs:{x:f},backend:i,attrs:{shape:e.outShape}});c.push(f);for(let I of c)i.disposeData(I.dataId);return C}function Sc({x:r,filter:t,convInfo:e,backend:i,bias:o=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:n=null}){let{filterWidth:u,filterHeight:p,inChannels:d,strideWidth:l,strideHeight:c,padInfo:h,outWidth:m,outHeight:f,dilationWidth:C,dilationHeight:I,dataFormat:k}=e,R=k==="channelsLast",P=u*p*d,$=f*m,A=R?[e.batchSize,$,P]:[e.batchSize,P,$],F=new wt(A,R),B=[{type:"int32",data:[h.top,h.left]},{type:"int32",data:[c,l]},{type:"int32",data:[I,C]},{type:"int32",data:[m]},{type:"int32",data:[d*u]},{type:"int32",data:[d]}],T=i.runWebGPUProgram(F,[r],r.dtype,B),V=[];V.push(T);let G=D({inputs:{x:t},backend:i,attrs:{shape:[1,P,-1]}});if(V.push(G),s!=null){let M=bt(s.shape,R);M!=null&&(s=D({inputs:{x:s},backend:i,attrs:{shape:M}}),V.push(s))}if(o!=null){let M=bt(o.shape,R);M!=null&&(o=D({inputs:{x:o},backend:i,attrs:{shape:M}}),V.push(o))}let q=Se({a:R?T:G,b:R?G:T,transposeA:!R,transposeB:!1,backend:i,bias:o,activation:n,preluActivationWeights:s,leakyreluAlpha:a}),ee=D({inputs:{x:q},backend:i,attrs:{shape:e.outShape}});V.push(q);for(let M of V)i.disposeData(M.dataId);return ee}function vt({x:r,filter:t,convInfo:e,backend:i,bias:o=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:n=null}){let u=o!=null,p=s!=null,d=e.dataFormat==="channelsLast",l=d&&e.filterHeight===e.inHeight&&e.filterWidth===e.inWidth&&e.padInfo.type==="VALID",c=U().getBool("WEBGPU_USE_NAIVE_CONV2D_DEBUG");if(!c&&(l||e.filterHeight===1&&e.filterWidth===1&&e.dilationHeight===1&&e.dilationWidth===1&&e.strideHeight===1&&e.strideWidth===1&&(e.padInfo.type==="SAME"||e.padInfo.type==="VALID")))return yc({x:r,filter:t,convInfo:e,backend:i,bias:o,activation:n,preluActivationWeights:s,leakyreluAlpha:a});let h=U().getNumber("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL"),m=h>-1?h:i.thresholdToIncreaseWorkgroups,f=e.batchSize*Math.ceil(e.outHeight*e.outWidth/32)*Math.ceil(e.outChannels/32);if(U().getBool("WEBGPU_CONV_SEPARATE_IM2COL_SHADER")||f<=m)return Sc({x:r,filter:t,convInfo:e,backend:i,bias:o,preluActivationWeights:s,leakyreluAlpha:a,activation:n});let C,I=[e.padInfo.top,e.padInfo.left],k=[{type:"int32",data:[e.filterHeight,e.filterWidth]},{type:"int32",data:[...I]},{type:"int32",data:[e.strideHeight,e.strideWidth]},{type:"int32",data:[e.dilationHeight,e.dilationWidth]}];if(c)C=new St(e,u,n,p);else{let A=d?e.outHeight*e.outWidth:e.outChannels,F=d?e.outChannels:e.outHeight*e.outWidth,B=e.filterHeight*e.filterWidth*e.inChannels;k.push({type:"int32",data:[A]},{type:"int32",data:[F]},{type:"int32",data:[B]});let T=i.adapterInfo.isIntel();C=new yt(e,A,F,B,u,n,p,T)}let R=[],P=[r,t];u&&(!d&&o.shape.length===1&&(o=D({inputs:{x:o},backend:i,attrs:{shape:[o.shape[0],1,1]}}),R.push(o)),P.push(o)),p&&(!d&&s.shape.length===1&&(s=D({inputs:{x:s},backend:i,attrs:{shape:[s.shape[0],1,1]}}),R.push(s)),P.push(s)),n==="leakyrelu"&&(k.push({type:"float32",data:[a]}),C.uniforms+=" alpha : f32,");let $=i.runWebGPUProgram(C,P,r.dtype,k);for(let A of R)i.disposeData(A.dataId);return $}function wc(r){let{inputs:t,attrs:e,backend:i}=r,{x:o,filter:s}=t,{strides:a,pad:n,dataFormat:u,dilations:p,dimRoundingMode:d}=e,l=w.convertConv2DDataFormat(u),c=w.computeConv2DInfo(o.shape,s.shape,a,p,n,d,!1,l);return vt({x:o,filter:s,convInfo:c,backend:i})}var zn={kernelName:Sr,backendName:"webgpu",kernelFunc:wc};g();var It=class{constructor(t){this.variableNames=["dy","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, outBackprop : vec4<i32>,",this.workgroupSize=[64,1,1],this.size=!1,this.isVec4=!1,this.workPerThread=1,this.outputShape=t.inShape,this.isChannelsLast=t.dataFormat==="channelsLast",this.isVec4=this.isChannelsLast&&t.outChannels%4===0&&t.inChannels%4===0,this.isVec4?(this.workPerThread=2,this.outputComponent=4,this.workgroupSize=[4,4,4],this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[4,this.workPerThread,1])):(this.size=!0,this.workPerThread=1,this.workgroupSize=[64,1,1],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize)),this.shaderKey=`conv2DDerInput_${this.isChannelsLast}_${this.isVec4}_${this.workPerThread}`}getUserCode(){let t=this.isChannelsLast?1:2,e=this.isChannelsLast?2:3,i=this.isChannelsLast?3:1,o=`
    ${y()} {
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
    ${o}
    `:`
    ${y("index")} {
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
  `}},kt=class{constructor(t){this.variableNames=["x","dy"],this.uniforms="pads : vec2<i32>, strides : vec2<i32>, batchSize : i32, outHeight : i32, outWidth : i32, inHeight : i32, inWidth : i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=t.dataFormat==="channelsLast",this.shaderKey=`conv2DDerFilter_${this.isChannelsLast}`}getUserCode(){return`
    ${y("index")} {
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
  `}},Rt=class{constructor(t){this.variableNames=["x","dy"],this.uniforms=`pads : vec3<i32>, strides : vec3<i32>, batchSize : i32, outDepth : i32,
       outHeight : i32, outWidth : i32, inDepth : i32, inHeight : i32, inWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3DDerFilter"}getUserCode(){return`
    ${y("index")} {
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
  `}},Dt=class{constructor(t){this.variableNames=["dy","W"],this.uniforms=`filterDims : vec3<i32>, pads : vec3<i32>, strides : vec3<i32>,
      outDepth : i32, outHeight : i32, outWidth : i32, outChannels : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3DDerInput"}getUserCode(){return`
    ${y("index")} {
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
  `}};function bc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,dy:s}=t,{strides:a,pad:n,dataFormat:u,dimRoundingMode:p,filterShape:d}=i,l=w.convertConv2DDataFormat(u),c=w.computeConv2DInfo(o.shape,d,a,1,n,p,!1,l),h=new kt(c),m=[{type:"int32",data:[c.padInfo.top,c.padInfo.left]},{type:"int32",data:[c.strideHeight,c.strideWidth]},{type:"int32",data:[c.batchSize]},{type:"int32",data:[c.outHeight]},{type:"int32",data:[c.outWidth]},{type:"int32",data:[c.inHeight]},{type:"int32",data:[c.inWidth]}];return e.runWebGPUProgram(h,[o,s],o.dtype,m)}var An={kernelName:wr,backendName:"webgpu",kernelFunc:bc};g();g();function vc(r=4){let t=s=>{switch(s){case 1:return"return W[getIndexFromCoords4D(coord, uniforms.wShape)];";case 4:return`
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
        return ${L(r)}(0.0);
      }
      if (xC < 0.0 || xC >= f32(uniforms.outBackprop[2]) || fract(xC) > 0.0) {
        return ${L(r)}(0.0);
      }
      let coord = vec4<i32>(
          batch,
          i32(xR),
          i32(xC),
          col % uniforms.outBackprop[3]);
      return x[getIndexFromCoords4D(coord, uniforms.xShape)/${r}];`}
      }
      return ${L(r)}(0.0);`;return`
  fn mm_readA(batch: i32, row : i32, col : i32) -> ${L(r)} {
    ${i}
  }

  fn mm_readB(batch: i32, row : i32, col : i32) -> ${L(r)} {
    let coordX = uniforms.filterDims.x - 1 -
        row / (uniforms.filterDims[1] * uniforms.outBackprop[3]);
    let coordY = uniforms.filterDims.y - 1 -
        (row / uniforms.outBackprop[3]) % uniforms.filterDims[1];
    if (row < uniforms.dimInner && col < uniforms.dimBOuter &&
        coordX >= 0 && coordY >= 0) {
      let rowInner = row % uniforms.outBackprop[3];
      let coord = vec4<i32>(coordX, coordY, col, rowInner);
      ${t(r)}
    }
    return ${L(r)}(0.0);
  }

  fn mm_write(batch: i32, row : i32, col : i32, valueInput : ${L(r)}) {
    if (row < uniforms.dimAOuter && col < uniforms.dimBOuter) {
      var value = valueInput;
      let outCoord = vec4<i32>(
          batch,
          row / uniforms.outShape[2],
          row % uniforms.outShape[2],
          col);
      result[getIndexFromCoords4D(outCoord, uniforms.outShape)/${r}] = value;
    }
  }`}var Pt=class{constructor(t){this.variableNames=["x","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, outBackprop : vec4<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=t.inShape,x.assert(t.dataFormat==="channelsLast",()=>"TODO: NCHW is unimplemented"),this.isVec4=t.inChannels%4===0&&t.outChannels%4===0,this.dispatchLayout={x:[3],y:[1,2],z:[0]},this.workgroupSize=_e(this.dispatchLayout,this.outputShape,this.isVec4),this.elementsPerThread=Be(this.dispatchLayout,this.outputShape,this.isVec4),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread),this.isVec4&&(this.outputComponent=4,this.variableComponents=[4,1]),this.shaderKey=`conv2DDerInputMM_${this.isVec4}_${this.elementsPerThread}`}getUserCode(){let t=this.isVec4?Ce(this.elementsPerThread,this.workgroupSize):ye(this.elementsPerThread,this.workgroupSize);return`
    ${vc(this.isVec4?4:1)}
    ${t}
    `}};function Ic(r){let{inputs:t,backend:e,attrs:i}=r,{dy:o,filter:s}=t,{inputShape:a,strides:n,pad:u,dataFormat:p,dimRoundingMode:d}=i,l=w.convertConv2DDataFormat(p),c=w.computeConv2DInfo(a,s.shape,n,1,u,d,!1,l),h=[{type:"int32",data:[c.filterHeight,c.filterWidth]},{type:"int32",data:[c.filterHeight-1-c.padInfo.top,c.filterWidth-1-c.padInfo.left]},{type:"int32",data:[c.strideHeight,c.strideWidth]},{type:"int32",data:[c.batchSize,c.outHeight,c.outWidth,c.outChannels]}],m;if(U().getBool("WEBGPU_USE_NAIVE_CONV2D_TRANSPOSE")||c.dataFormat!=="channelsLast")m=new It(c);else{m=new Pt(c);let f=c.inHeight*c.inWidth,C=c.inChannels,I=c.filterHeight*c.filterWidth*c.outChannels;h.push({type:"uint32",data:[f]},{type:"uint32",data:[C]},{type:"uint32",data:[I]})}return e.runWebGPUProgram(m,[o,s],"float32",h)}var Fn={kernelName:br,backendName:"webgpu",kernelFunc:Ic};g();var $t=class{constructor(t){this.variableNames=["x","W"],this.uniforms="filterDims: vec3<i32>, pads: vec3<i32>, strides: vec3<i32>, dilations: vec3<i32>,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3dnaive"}getUserCode(){return`
    ${y("index")} {
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
    }`}};function kc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,filter:s}=t,{strides:a,pad:n,dilations:u}=i,p=w.computeConv3DInfo(o.shape,s.shape,a,u,n),d=[p.padInfo.front,p.padInfo.top,p.padInfo.left],l=[{type:"int32",data:[p.filterDepth,p.filterHeight,p.filterWidth]},{type:"int32",data:[...d]},{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.dilationDepth,p.dilationHeight,p.dilationWidth]}],c=new $t(p),h=pe(o.dtype,s.dtype);return e.runWebGPUProgram(c,[o,s],h,l)}var Ln={kernelName:vr,backendName:"webgpu",kernelFunc:kc};g();function Rc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,dy:s}=t,{strides:a,pad:n,filterShape:u}=i,p=w.computeConv3DInfo(o.shape,u,a,1,n),d=new Rt(p),l=[{type:"int32",data:[p.padInfo.front,p.padInfo.top,p.padInfo.left]},{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.batchSize]},{type:"int32",data:[p.outDepth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"int32",data:[p.inDepth]},{type:"int32",data:[p.inHeight]},{type:"int32",data:[p.inWidth]}];return e.runWebGPUProgram(d,[o,s],s.dtype,l)}var Tn={kernelName:Ir,backendName:"webgpu",kernelFunc:Rc};g();function Dc(r){let{inputs:t,backend:e,attrs:i}=r,{dy:o,filter:s}=t,{strides:a,pad:n,inputShape:u}=i,p=w.computeConv3DInfo(u,s.shape,a,1,n),d=new Dt(p),l=[{type:"int32",data:[p.filterDepth,p.filterHeight,p.filterWidth]},{type:"int32",data:[p.filterDepth-1-p.padInfo.front,p.filterHeight-1-p.padInfo.top,p.filterWidth-1-p.padInfo.left]},{type:"int32",data:[p.strideDepth,p.strideHeight,p.strideWidth]},{type:"int32",data:[p.outDepth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"int32",data:[p.outChannels]}];return e.runWebGPUProgram(d,[o,s],o.dtype,l)}var _n={kernelName:kr,backendName:"webgpu",kernelFunc:Dc};g();var Pc=z({opType:v.COS}),Bn={kernelName:"Cos",backendName:"webgpu",kernelFunc:Pc};g();var $c=z({opType:v.COSH}),En={kernelName:Dr,backendName:"webgpu",kernelFunc:$c};g();var Nt=class{constructor(t,e,i,o){this.variableNames=["Image","Boxes","BoxInd"],this.uniforms="extrapolationValue : f32,",this.workgroupSize=[64,1,1],this.size=!0;let[s]=e;this.outputShape=[s,i[0],i[1],t],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.methodId=o==="bilinear"?1:0,this.cropHeightBiggerThan1=this.outputShape[1]>1,this.cropWidthBiggerThan1=this.outputShape[2]>1,this.shaderKey=`cropAndResize_${this.methodId}_${this.cropHeightBiggerThan1}_${this.cropWidthBiggerThan1}`}getUserCode(){let[t,e]=["f32(uniforms.imageShape[1] - 1)","f32(uniforms.imageShape[2] - 1)"],[i,o,s]=this.cropHeightBiggerThan1?[`(${t} / f32(uniforms.outShape[1] - 1))`,"(y2-y1) * height_ratio",`y1*${t} + f32(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${t}`],[a,n,u]=this.cropWidthBiggerThan1?[`(${e} / f32(uniforms.outShape[2] - 1))`,"(x2-x1) * width_ratio",`x1*${e} + f32(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${e}`];return`
    ${y("index")} {
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
        let height_scale = ${o};
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
    `}};var Nc=r=>{let{inputs:t,backend:e,attrs:i}=r,{image:o,boxes:s,boxInd:a}=t,{cropSize:n,method:u,extrapolationValue:p}=i,d=new Nt(o.shape[3],s.shape,n,u),l=[{type:"float32",data:[p]}];return e.runWebGPUProgram(d,[o,s,a],"float32",l)},Un={kernelName:Nr,backendName:"webgpu",kernelFunc:Nc};g();var Pe=(function(r){return r.Prod="*",r.Sum="+",r})(Pe||{}),Oe=class{constructor(t,e,i,o){this.variableNames=["x"],this.uniforms="index : f32,",this.size=!0,this.workgroupSize=[128,1,1],this.outputShape=e,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.exclusive=i,this.reverse=o,this.op=t,this.shaderKey=`cum_${this.op}_${this.exclusive}_${this.reverse}`}getUserCode(){let t=this.outputShape.length,e=this.op===Pe.Prod?"1.0":"0.0",i=this.exclusive?e:`getX(${Wn(t,"coords",this.op)})`,o=this.outputShape[this.outputShape.length-1],s="",a="";return this.exclusive?(s=this.reverse?`end != ${o-1}`:"end != 0",a=this.reverse?"end + 1":"end - 1"):(s=this.reverse?`end + pow2 < ${o}`:"end >= pow2",a=this.reverse?"end + pow2":"end - pow2"),`
      ${y("index")} {
       if (index < uniforms.size) {
         var coords = getCoordsFromIndex(index);

         let end = ${Mn(t,"coords",this.op)};
         var val = ${i};
         let pow2 = i32(pow(2.0, uniforms.index));
         if (${s}) {
           let idx = ${a};
           ${Mn(t,"coords",this.op)} = idx;
           val ${this.op}= getX(${Wn(t,"coords",this.op)});
         }
         setOutputAtIndex(index, val);
       }
      }
    `}};function Wn(r,t,e){if(r===1)return`${t}`;if(r===2)return`${t}.x, ${t}.y`;if(r===3)return`${t}.x, ${t}.y, ${t}.z`;if(r===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${e} for rank ${r} is not yet supported`)}function Mn(r,t,e){if(r===1)return`${t}`;if(r===2)return`${t}.y`;if(r===3)return`${t}.z`;if(r===4)return`${t}.w`;throw Error(`Cumulative ${e} for rank ${r} is not yet supported`)}g();function zt(r,t,e,i,o,s){let a=t.shape.length,n=w.getAxesPermutation([i],a),u=t;n!=null&&(u=X({inputs:{x:t},backend:e,attrs:{perm:n}}));let p=w.getInnerMostAxes(1,a)[0];if(p!==a-1)throw new Error(`WebGPU cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${i}`);let d=u.shape[p],l=O({inputs:{x:u},backend:e});for(let c=0;c<=Math.ceil(Math.log2(d))-1;c++){let h=new Oe(r,u.shape,!1,s),m=l,f=[{type:"float32",data:[c]}];l=e.runWebGPUProgram(h,[l],l.dtype,f),e.disposeData(m.dataId)}if(o){let c=new Oe(r,u.shape,o,s),h=l,m=[{type:"float32",data:[0]}];l=e.runWebGPUProgram(c,[l],l.dtype,m),e.disposeData(h.dataId)}if(n!=null){let c=w.getUndoAxesPermutation(n),h=X({inputs:{x:l},backend:e,attrs:{perm:c}});return e.disposeData(l.dataId),e.disposeData(u.dataId),h}return l}function zc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{axis:s,exclusive:a,reverse:n}=i;return zt(Pe.Prod,o,e,s,a,n)}var On={kernelName:Pr,backendName:"webgpu",kernelFunc:zc};g();function Ac(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{axis:s,exclusive:a,reverse:n}=i;return zt(Pe.Sum,o,e,s,a,n)}var Vn={kernelName:$r,backendName:"webgpu",kernelFunc:Ac};g();function Fc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,weights:s}=t,{size:a,binaryOutput:n}=i,u=o.shape.length===1,d=x.sizeFromShape(s.shape)>0,l=s.dtype,c=u?[o.shape[0]]:[o.shape[0],o.shape[1]],h=u?[a]:[o.shape[0],a],m=W({backend:e,attrs:{shape:h,value:0,dtype:l}}),f=new Re(c,d,n),C=[{type:"int32",data:[a]}],I=d?[o,s]:[o];return e.runWebGPUProgram(f,I,l,C,m)}var Gn={kernelName:zr,backendName:"webgpu",kernelFunc:Fc};g();var At=class{constructor(t,e){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.uniforms="blockSize : i32,",this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`depthToSpace_${e}`,this.dataFormat=e}getUserCode(){return`
      ${y("index")} {
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
      }`}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?"uniforms.outShape[3]":"uniforms.outShape[1]"}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};function Lc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{blockSize:s,dataFormat:a}=i,n=o.shape[0],u=a==="NHWC"?o.shape[1]:o.shape[2],p=a==="NHWC"?o.shape[2]:o.shape[3],d=a==="NHWC"?o.shape[3]:o.shape[1],l=u*s,c=p*s,h=d/(s*s),m=a==="NHWC"?[n,l,c,h]:[n,h,l,c],f=[{type:"int32",data:[s]}],C=new At(m,a);return e.runWebGPUProgram(C,[o],o.dtype,f)}var Hn={kernelName:Ar,backendName:"webgpu",kernelFunc:Lc};g();var Ft=class{constructor(t,e,i,o=!1,s=null,a=!1){this.variableNames=["x","W"],this.uniforms="pads : vec2<i32>, inDims : vec2<i32>,",this.workgroupSize=[16,16,1],this.outputShape=t,this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),o&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),this.addBias=o,this.activation=s,this.hasPreluActivation=a,this.filterHeight=e,this.filterWidth=i,this.shaderKey=`depthwiseNCHW_${this.activation}_${this.filterHeight}_${this.filterWidth}`}getUserCode(){let t=this.filterWidth*this.filterHeight,e=this.workgroupSize[0]*this.workgroupSize[1]*this.workgroupSize[2],i=this.workgroupSize[1]+this.filterHeight-1,o=this.workgroupSize[0]+this.filterWidth-1;return`
      ${K(this.activation,this.hasPreluActivation,!1,4)}

      var<workgroup> mm_Asub : array<array<f32, ${o}>, ${i}>;
      var<workgroup> mm_Bsub : array<array<f32, ${this.filterWidth}>, ${this.filterHeight}>;
      fn readX(batch : i32, channel : i32, row : i32, col : i32) -> f32 {
        var value = 0.0;
        if (row >=0 && row < uniforms.inDims[0] && col >=0 && col < uniforms.inDims[1])
        {
          value = getX(batch, channel, row, col);
        }
        return value;
      }

      ${y()} {
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
          for (var inputCol = localCol; inputCol < ${o}; inputCol = inputCol + ${this.workgroupSize[0]}) {
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
    `}};g();var $e=class{constructor(t,e=!1,i=null,o=!1){this.variableNames=["x","W"],this.uniforms="pads : vec2<i32>, inDims : vec2<i32>, virtualWidth : i32,",this.workgroupSize=[64,1,1],this.workPerThread=4,this.outputComponent=4,this.outputShape=t.outShape,this.virtualWidth=Math.ceil(this.outputShape[2]/this.workPerThread)*this.workPerThread;let s=[this.outputShape[0],this.outputShape[1],this.virtualWidth,this.outputShape[3]];this.dispatchLayout=b(s),this.dispatch=S(this.dispatchLayout,s,this.workgroupSize,[this.outputComponent*this.workPerThread,1,1]),x.assert(t.dataFormat==="channelsLast",()=>"TODO: NCHW is unimplemented"),e&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),this.convInfo=t,this.addBias=e,this.activation=i,this.hasPreluActivation=o,this.shaderKey=`depthwiseVec4_${i}_${this.convInfo.filterHeight}_${this.convInfo.filterWidth}_${this.convInfo.strideHeight}_${this.convInfo.strideWidth}_${this.workPerThread}`}getUserCode(){let t=(this.workPerThread-1)*this.convInfo.strideWidth+this.convInfo.filterWidth,e=this.convInfo.strideHeight,i=this.convInfo.strideWidth;return`
      ${K(this.activation,this.hasPreluActivation,!0,4)}
      fn readX(batch : i32, row : i32, col : i32, channel : i32) -> vec4<f32> {
        var value = vec4<f32>(0.0);
        if (col >=0 && col < uniforms.inDims[1]) {
          value = getX(batch, row, col, channel);
        }
        return value;
      }

      ${y("index")} {
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
    `}};var Ne=class{constructor(t,e=!1,i=null,o=!1){this.variableNames=["x","W"],this.uniforms=`pads : vec2<i32>, inDims : vec2<i32>, filterHeight : i32,
      filterWidth : i32, strides : vec2<i32>, dilations : vec2<i32>,`,this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=t.dataFormat==="channelsLast",e&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),this.convInfo=t,this.addBias=e,this.activation=i,this.hasPreluActivation=o,this.shaderKey=`depthwise_${this.activation}_${this.isChannelsLast}`}getUserCode(){let t=this.isChannelsLast?"getX(batch, xR, xC, d1);":"getX(batch, d1, xR, xC);";return`
      ${K(this.activation,this.hasPreluActivation,!1,4)}

      ${y("index")} {
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
    `}};function Tc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,filter:s}=t,{strides:a,pad:n,dataFormat:u,dilations:p,dimRoundingMode:d}=i,l=w.convertConv2DDataFormat(u),c=p;c==null&&(c=[1,1]);let h=w.computeConv2DInfo(o.shape,s.shape,a,c,n,d,!0,l),m=[{type:"int32",data:[h.padInfo.top,h.padInfo.left]},{type:"int32",data:[h.inHeight,h.inWidth]}],f=h.dataFormat==="channelsLast",C;return!f&&h.inHeight>16&&h.inWidth>16&&h.strideHeight===1&&h.strideWidth===1&&h.dilationWidth===1&&h.dilationHeight===1&&h.inChannels===h.outChannels?C=new Ft(h.outShape,h.filterHeight,h.filterWidth):f&&h.outHeight>4&&h.outWidth>4&&h.strideWidth<=2&&h.inChannels===h.outChannels&&h.dilationHeight===1&&h.dilationWidth===1&&h.inChannels%4===0?(C=new $e(h),m.push({type:"int32",data:[C.virtualWidth]})):(C=new Ne(h),m.push({type:"int32",data:[h.filterHeight]},{type:"int32",data:[h.filterWidth]},{type:"int32",data:[h.strideHeight,h.strideWidth]},{type:"int32",data:[h.dilationHeight,h.dilationWidth]})),e.runWebGPUProgram(C,[o,s],o.dtype,m)}var Kn={kernelName:Fr,backendName:"webgpu",kernelFunc:Tc};g();var Lt=class{constructor(t){this.variableNames=["x","dy"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, filterDims : vec2<i32>, outHeight : i32,
      outWidth : i32, inHeight : i32, inWidth : i32, batchSize : i32, channelMul : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.filterShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="depthwise_conv2d_backprop_filter"}getUserCode(){return`
      ${y("index")} {
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
    `}},Tt=class{constructor(t){this.variableNames=["dy","W"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32, channelMul : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="depthwise_conv2d_backprop_input"}getUserCode(){return`
      ${y("index")} {
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
    `}};function _c(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,dy:s}=t,{strides:a,dilations:n,pad:u,dimRoundingMode:p,filterShape:d}=i,l=w.computeConv2DInfo(o.shape,d,a,n,u,p,!0),c=new Lt(l),h=[{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.filterHeight,l.filterWidth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]},{type:"int32",data:[l.inHeight]},{type:"int32",data:[l.inWidth]},{type:"int32",data:[l.batchSize]},{type:"int32",data:[l.outChannels/l.inChannels]}];return e.runWebGPUProgram(c,[o,s],"float32",h)}var Xn={kernelName:Lr,backendName:"webgpu",kernelFunc:_c};g();function Bc(r){let{inputs:t,backend:e,attrs:i}=r,{dy:o,filter:s}=t,{strides:a,dilations:n,pad:u,dimRoundingMode:p,inputShape:d}=i,l=w.computeConv2DInfo(d,s.shape,a,n,u,p,!0),c=new Tt(l),h=[{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.filterHeight-1-l.padInfo.top,l.filterWidth-1-l.padInfo.left]},{type:"int32",data:[l.filterHeight,l.filterWidth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]},{type:"int32",data:[l.outChannels/l.inChannels]}];return e.runWebGPUProgram(c,[o,s],o.dtype,h)}var qn={kernelName:Tr,backendName:"webgpu",kernelFunc:Bc};g();var _t=class{constructor(t){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,t],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="diag"}getUserCode(){return`
      ${y("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let value = select(0.0, getX(coords[0]), coords[0] == coords[1]);
          setOutputAtIndex(index, value);
        }
      }
    `}};function Ec(r){let{inputs:t,backend:e}=r,{x:i}=t,o=[...i.shape,...i.shape],s=x.sizeFromShape(i.shape),a=D({inputs:{x:i},backend:e,attrs:{shape:[s]}}),n=new _t(s),u=e.runWebGPUProgram(n,[a],a.dtype),p=D({inputs:{x:u},backend:e,attrs:{shape:o}});return e.disposeData(a.dataId),e.disposeData(u.dataId),p}var Yn={kernelName:_r,backendName:"webgpu",kernelFunc:Ec};g();var Bt=class{constructor(t){this.variableNames=["x","w"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.outShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="dilation2d"}getUserCode(){return`
       ${y("index")} {
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
     `}};function Uc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,filter:s}=t,{strides:a,pad:n,dilations:u}=i,p=w.computeDilation2DInfo(o.shape,s.shape,a,n,"NHWC",u),d=[p.padInfo.top,p.padInfo.left],l=[{type:"int32",data:[p.filterHeight,p.filterWidth]},{type:"int32",data:[...d]},{type:"int32",data:[p.strideHeight,p.strideWidth]},{type:"int32",data:[p.dilationHeight,p.dilationWidth]}],c=new Bt(p);return e.runWebGPUProgram(c,[o,s],o.dtype,l)}var jn={kernelName:Br,backendName:"webgpu",kernelFunc:Uc};g();var Et=class{constructor(t,e){if(this.variableNames=["x","w","dy"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>, dySize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t.inShape,this.dispatchLayout=b(t.outShape),this.dispatch=S(this.dispatchLayout,t.outShape,this.workgroupSize),e!=="float32"&&e!=="int32")throw new Error(`Dilation2DBackpropInput only supports float32 and int32
          types, does not support ${e} type.`);this.type=e,this.shaderKey="dilation2DBackpropInput"}getUserCode(){return`
       ${y("index")} {
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
     `}},Ut=class{constructor(t,e,i){if(this.variableNames=["x","w","dy"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>, dySize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t.filterShape,this.dispatchLayout=b(t.outShape),this.dispatch=S(this.dispatchLayout,t.outShape,this.workgroupSize),i!=="float32"&&i!=="int32")throw new Error(`Dilation2DBackpropFilter only supports float32 and int32
          types, does not support ${i} type.`);this.type=i,this.shaderKey="dilation2DBackpropFilter"}getUserCode(){return`
       ${y("index")} {
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
     `}};function Wc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,filter:s,dy:a}=t,{strides:n,pad:u,dilations:p}=i,d=w.computeDilation2DInfo(o.shape,s.shape,n,u,"NHWC",p),l=s.dtype,c=new Ut(d,s.shape,l),h=[{type:"int32",data:[d.filterHeight,d.filterWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[x.sizeFromShape(d.outShape)]}],m=W({backend:e,attrs:{shape:s.shape,value:0,dtype:l}});return e.runWebGPUProgram(c,[o,s,a],l,h,m)}var Qn={kernelName:Ur,backendName:"webgpu",kernelFunc:Wc};g();function Mc(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,filter:s,dy:a}=t,{strides:n,pad:u,dilations:p}=i,d=w.computeDilation2DInfo(o.shape,s.shape,n,u,"NHWC",p),l=o.dtype,c=new Et(d,l),h=[{type:"int32",data:[d.filterHeight,d.filterWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[x.sizeFromShape(d.outShape)]}],m=W({backend:e,attrs:{shape:d.inShape,value:0,dtype:l}});return e.runWebGPUProgram(c,[o,s,a],l,h,m)}var Zn={kernelName:Er,backendName:"webgpu",kernelFunc:Mc};g();var Wt=class{constructor(t,e,i){this.variableNames=["Image"],this.uniforms="alpha: f32,",this.workgroupSize=[64,1,1],this.pixelsOpType=fe.DRAW,this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.type=e,this.textureFormat=i,this.shaderKey=`draw_${e}_${i}`}getUserCode(){let t,e=this.type==="float32"?"value":"value / 255.0";return t=`
      if (uniforms.numChannels == 1) {
        rgba[0] = ${e};
        rgba[1] = ${e};
        rgba[2] = ${e};
      } else {
        rgba[d] = ${e};
      }`,`
       @group(0) @binding(0) var outImage : texture_storage_2d<${this.textureFormat}, write>;
       ${y("index")} {
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
      `}};function Oc(r){let{inputs:t,backend:e,attrs:i}=r,{image:o}=t,{canvas:s,options:a}=i,[n,u]=o.shape.slice(0,2),{imageOptions:p}=a||{},d=p?.alpha||1,l=e.device.features.has("bgra8unorm-storage")?"bgra8unorm":"rgba8unorm",c=[n,u],h=new Wt(c,o.dtype,l);s.width=u,s.height=n;let m="webgpu",f=s.getContext(m),C;f||(C=new OffscreenCanvas(u,n),f=C.getContext(m));let I=o.shape.length===3?o.shape[2]:1;f.configure({device:e.device,format:l,usage:GPUTextureUsage.STORAGE_BINDING,alphaMode:"premultiplied"});let k="int32",R=e.makeTensorInfo(c,k),P=e.tensorMap.get(R.dataId);P.resource=f.getCurrentTexture(),P.external=!0;let $=[{type:"uint32",data:[I]},{type:"float32",data:[d]}];if(e.runWebGPUProgram(h,[o],k,$,R),C){let A=s.getContext("2d");if(!A)throw new Error("Please make sure this canvas has only been used for 2d or webgpu context!");A.drawImage(C,0,0)}return e.disposeData(R.dataId),o}var Jn={kernelName:Wr,backendName:"webgpu",kernelFunc:Oc};g();g();var Bo=_({opType:N.MUL,cpuKernelImpl:Fa,supportsComplex:!0}),eu={kernelName:_i,backendName:"webgpu",kernelFunc:Bo};g();function Eo(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{axis:s,keepDims:a}=i;return J(o,s,a,"sum",e)}var tu={kernelName:"Sum",backendName:"webgpu",kernelFunc:Eo};function Vc(r){let{inputs:t,backend:e,attrs:i}=r,{equation:o}=i,s=t,{allDims:a,summedDims:n,idDims:u}=w.decodeEinsumEquation(o,s.length);w.checkEinsumDimSizes(a.length,u,s);let{path:p,steps:d}=w.getEinsumComputePath(n,u),l=d.length,c=null,h=a.length,m=[];for(let f=0;f<l;++f){for(let C of d[f]){let{permutationIndices:I,expandDims:k}=w.getEinsumPermutation(h,u[C]),R;w.isIdentityPermutation(I)?R=s[C]:(R=X({inputs:{x:s[C]},backend:e,attrs:{perm:I}}),m.push(R));let P=R.shape.slice();for(let $=0;$<k.length;++$)P.splice(k[$],0,1);x.arraysEqual(R.shape,P)||(R=D({inputs:{x:R},backend:e,attrs:{shape:P}}),m.push(R)),c===null?c=R:(c=Bo({inputs:{a:R,b:c},backend:e}),m.push(c))}f<l-1&&(p[f]>=0&&(c=Eo({inputs:{x:c},backend:e,attrs:{axis:p[f]-(a.length-h),keepDims:!1}}),m.push(c)),h--)}for(let f of m)f!==c&&e.disposeData(f.dataId);return c}var ou={kernelName:Or,backendName:"webgpu",kernelFunc:Vc};g();var Gc=z({opType:v.ELU}),ru={kernelName:"Elu",backendName:"webgpu",kernelFunc:Gc};g();var Hc=r=>{let{inputs:t,backend:e}=r,{dy:i,y:o}=t,s=new le(N.ELU_DER,i.shape,o.shape);return e.runWebGPUProgram(s,[i,o],i.dtype)},iu={kernelName:Gr,backendName:"webgpu",kernelFunc:Hc};g();var Kc=_({opType:N.EQUAL,dtype:"bool",cpuKernelImpl:Ca}),su={kernelName:Kr,backendName:"webgpu",kernelFunc:Kc};g();var Xc=z({opType:v.ERF}),au={kernelName:"Erf",backendName:"webgpu",kernelFunc:Xc};g();var qc=z({opType:v.EXP,cpuKernelImpl:ya,dtype:"float32"}),nu={kernelName:"Exp",backendName:"webgpu",kernelFunc:qc};g();function Mt(r){let{inputs:t,attrs:e,backend:i}=r,{dim:o}=e,{input:s}=t,a=s.shape.length,n=s.shape.slice(),u=o;return o<0&&(x.assert(-(a+1)<=o,()=>`Axis must be in the interval [${-(a+1)}, ${a}]`),u=a+o+1),n.splice(u,0,1),D({inputs:{x:s},backend:i,attrs:{shape:n}})}var uu={kernelName:qr,backendName:"webgpu",kernelFunc:Mt};g();var Yc=z({opType:v.EXPM1,cpuKernelImpl:Sa}),pu={kernelName:Yr,backendName:"webgpu",kernelFunc:Yc};g();g();var Ve=class{constructor(t,e){this.variableNames=["real","imag"],this.outputShape=[],this.uniforms="exponentMultiplier : f32, denominator: f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.component=t,this.shaderKey=`fft_${t}`}getUserCode(){return`
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

    ${y("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        setOutputAtIndex(index, mulMatDFT(coords[0], coords[1]));
      }
    }
  `}};function Ot(r,t,e){let i=e.tensorMap.get(r.dataId),o=x.sizeFromShape(r.shape),s=r.shape[r.shape.length-1],a=o/s,n=[],u=D({inputs:{x:r},backend:e,attrs:{shape:[a,s]}});n.push(u);let p=u.shape,d=new Ve("real",p),l=new Ve("imag",p),c=[{dataId:i.complexTensorInfos.real.dataId,dtype:i.complexTensorInfos.real.dtype,shape:p},{dataId:i.complexTensorInfos.imag.dataId,dtype:i.complexTensorInfos.imag.dtype,shape:p}],h=t?2*Math.PI:-2*Math.PI,m=t?p[1]:1,f=[{type:"float32",data:[h]},{type:"float32",data:[m]}],C=e.runWebGPUProgram(d,c,"float32",f);n.push(C);let I=e.runWebGPUProgram(l,c,"float32",f);n.push(I);let k=oe({inputs:{real:C,imag:I},backend:e});n.push(k);let R=D({inputs:{x:k},backend:e,attrs:{shape:r.shape}});return n.forEach(P=>e.disposeData(P.dataId)),R}function jc(r){let{inputs:t,backend:e}=r,{input:i}=t;return Ot(i,!1,e)}var du={kernelName:"FFT",backendName:"webgpu",kernelFunc:jc};g();var Vt=class{constructor(t){this.outputShape=[],this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="flipLeftRight"}getUserCode(){return`
      ${y("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let coordX = uniforms.xShape[2] - coords[2] - 1;
          let outputValue = getX(coords[0], coords[1], coordX, coords[3]);
          setOutputAtIndex(index, outputValue);
        }
      }
    `}};var lu={kernelName:Zr,backendName:"webgpu",kernelFunc:({inputs:r,backend:t})=>{let{image:e}=r,i=t,o=new Vt(e.shape);return i.runWebGPUProgram(o,[e],e.dtype)}};g();var Qc=z({opType:v.FLOOR,cpuKernelImpl:wa}),cu={kernelName:Jr,backendName:"webgpu",kernelFunc:Qc};g();var Zc=_({opType:N.FLOOR_DIV,cpuKernelImpl:ba,dtype:"int32"}),hu={kernelName:ei,backendName:"webgpu",kernelFunc:Zc};g();g();var Gt=class{constructor(t,e,i=!1){this.pixelsOpType=fe.FROM_PIXELS,this.outputShape=[0],this.variableNames=[],this.workgroupSize=[256,1,1],this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[e,1,1]),this.importVideo=i,this.shaderKey=`fromPixels_${this.importVideo}`}getUserCode(){let t=this.importVideo?"textureLoad(src, vec2<i32>(coords.yx));":"textureLoad(src, vec2<i32>(coords.yx), 0)";return`
      @binding(1) @group(0) var src: ${this.importVideo?"texture_external":"texture_2d<f32>"};
      ${y("index")} {
        let flatIndex = index * uniforms.numChannels;
        if (flatIndex < uniforms.size) {
          let coords = getCoordsFromIndex(flatIndex);
          let values = ${t};
          for (var i = 0; i < uniforms.numChannels; i = i + 1) {
            result[flatIndex + i] = i32(floor(255.0 * values[i]));
          }
        }
      }
  `}};var mu={kernelName:Ms,backendName:"webgpu",kernelFunc:Jc},ze,Uo=U().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function Jc(r){let{inputs:t,backend:e,attrs:i}=r,{pixels:o}=t,{numChannels:s}=i;if(o==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let a=typeof HTMLVideoElement<"u"&&o instanceof HTMLVideoElement,n=typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement,u=typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&o instanceof OffscreenCanvas,p=typeof ImageBitmap<"u"&&o instanceof ImageBitmap,[d,l]=a?[o.videoWidth,o.videoHeight]:[o.width,o.height],c=[l,d,s],h=U().getBool("WEBGPU_IMPORT_EXTERNAL_TEXTURE")&&a,m=a||n;if(p||u||m){let k;if(h)k=e.device.importExternalTexture({source:o});else{if(m){let H=U().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(ze==null||H!==Uo)&&(Uo=H,ze=document.createElement("canvas").getContext("2d",{willReadFrequently:Uo})),ze.canvas.width=d,ze.canvas.height=l,ze.drawImage(o,0,0,d,l),o=ze.canvas}let V=GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,Y=e.textureManager.acquireTexture(c[1],c[0],"rgba8unorm",V);e.queue.copyExternalImageToTexture({source:o},{texture:Y},[c[1],c[0]]),k=Y}let R=x.sizeFromShape(c),P=x.computeStrides(c),$=new Gt(c,s,h),A=[{type:"uint32",data:[R]},{type:"uint32",data:[s]},{type:"uint32",data:[...P]}],F=e.makeTensorInfo([l,d],"int32"),B=e.tensorMap.get(F.dataId);B.resource=k;let T=e.runWebGPUProgram($,[F],"int32",A);return e.disposeData(F.dataId),T}let f=o.data,C=f;if(s!=null&&s!==4){C=new Uint8Array(o.width*o.height*s);let k=f.length,R=0;for(let P=0;P<k;P++)P%4<s&&(C[R++]=f[P])}let I=e.makeTensorInfo(c,"int32",new Int32Array(C));return e.uploadToGPU(I.dataId),I}g();g();var Ht=class{constructor(t,e,i,o,s){this.uniforms="varianceEpsilon : f32,",this.workgroupSize=[128,1,1],this.size=!0,this.variableNames=["x","mean","variance"],w.assertAndGetBroadcastShape(t,e),w.assertAndGetBroadcastShape(t,i),this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),o!=null&&(w.assertAndGetBroadcastShape(t,o),this.variableNames.push("offset")),s!=null&&(w.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale")),this.offsetShape=o,this.scaleShape=s,this.shaderKey="batchNorm"}getUserCode(){let t="0.0";this.offsetShape!=null&&(t="getOffsetByOutputIndex(index)");let e="1.0";return this.scaleShape!=null&&(e="getScaleByOutputIndex(index)"),`
      ${y("index")} {
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
  `}};var fu={kernelName:ti,backendName:"webgpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{x:i,scale:o,offset:s,mean:a,variance:n}=r,{varianceEpsilon:u}=t,p=e,d=[i,a,n],l=null;s!=null&&(l=s.shape,d.push(s));let c=null;o!=null&&(c=o.shape,d.push(o));let h=new Ht(i.shape,a.shape,n.shape,l,c),m=[{type:"float32",data:[u]}];return p.runWebGPUProgram(h,d,i.dtype,m)}};g();function eh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,filter:s,bias:a,preluActivationWeights:n}=t,{strides:u,pad:p,dataFormat:d,dilations:l,dimRoundingMode:c,activation:h,leakyreluAlpha:m}=i,f=w.convertConv2DDataFormat(d),C=w.computeConv2DInfo(o.shape,s.shape,u,l,p,c,!1,f);return vt({x:o,filter:s,convInfo:C,backend:e,bias:a,preluActivationWeights:n,leakyreluAlpha:m,activation:h})}var gu={kernelName:Gs,backendName:"webgpu",kernelFunc:eh};g();function th(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,filter:s,bias:a,preluActivationWeights:n}=t,{strides:u,pad:p,dilations:d,dimRoundingMode:l,activation:c,leakyreluAlpha:h}=i,m=d;m==null&&(m=[1,1]),x.assert(w.eitherStridesOrDilationsAreOne(u,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${u} and dilations '${m}'`);let f=w.computeConv2DInfo(o.shape,s.shape,u,m,p,l,!0),C=[o,s],I=a!=null,k=n!=null;I&&C.push(a),k&&C.push(n);let R=[{type:"int32",data:[f.padInfo.top,f.padInfo.left]},{type:"int32",data:[f.inHeight,f.inWidth]}],P;return f.outHeight>4&&f.outWidth>4&&f.strideWidth<=2&&f.inChannels===f.outChannels&&f.dilationHeight===1&&f.dilationWidth===1&&f.inChannels%4===0?(P=new $e(f,I,c,k),R.push({type:"int32",data:[P.virtualWidth]})):(P=new Ne(f,I,c,k),R.push({type:"int32",data:[f.filterHeight]},{type:"int32",data:[f.filterWidth]},{type:"int32",data:[f.strideHeight,f.strideWidth]},{type:"int32",data:[f.dilationHeight,f.dilationWidth]})),c==="leakyrelu"&&(R.push({type:"float32",data:[h]}),P.uniforms+=" alpha : f32,"),e.runWebGPUProgram(P,C,"float32",R)}var xu={kernelName:Hs,backendName:"webgpu",kernelFunc:th};g();var Kt=class{constructor(t,e){this.variableNames=["A","indices"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`gathernd_${t}`,this.sliceDim=t,this.uniforms=`sliceDim : i32, strides : ${E(t)},`}getUserCode(){let t;return this.sliceDim>1?t="uniforms.strides[j]":t="uniforms.strides",`
      ${y("index")} {
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
      `}};function oh(r){let{inputs:t,backend:e}=r,{params:i,indices:o}=t,s=o.shape,a=s[s.length-1],n=x.sizeFromShape(i.shape),[u,p,d,l]=w.prepareAndValidate(i,o),c=D({inputs:{x:o},backend:e,attrs:{shape:[p,a]}}),h=D({inputs:{x:i},backend:e,attrs:{shape:[x.sizeFromShape(i.shape)/d,d]}});if(e.shouldExecuteOnCPU([i,o])||i.dtype==="string"){let k=e.readSync(o.dataId),R=e.bufferSync(i),P=va(k,R,i.dtype,p,a,d,l,i.shape,n);return e.makeTensorInfo(u,i.dtype,P.values)}let m=new Kt(a,[p,d]),f=[{type:"int32",data:[a]},{type:"int32",data:l}],C=e.runWebGPUProgram(m,[h,c],h.dtype,f),I=D({inputs:{x:C},backend:e,attrs:{shape:u}});return e.disposeData(c.dataId),e.disposeData(h.dataId),e.disposeData(C.dataId),I}var Cu={kernelName:ri,backendName:"webgpu",kernelFunc:oh};g();var Xt=class{constructor(t,e){this.variableNames=["A","indices"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.slice(),this.aShape=t,this.outputShape=e,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="gather"}getUserCode(){let t=rh(this.aShape);return`
      ${y("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          let indexZ = i32(getIndices(resRC.x, resRC.z));
          let inBounds = select(0.0, 1.0, indexZ >= 0 && indexZ < uniforms.aShape[2]);
          setOutputAtIndex(index, inBounds * getA(${t}));
        }
      }
    `}};function rh(r){let t=["resRC.x","resRC.y","resRC.z","resRC.w"],e=[];for(let i=0;i<r.length;i++)i===2?e.push("indexZ"):e.push(`${t[i]}`);return e.join()}function Wo(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,indices:s}=t,{axis:a,batchDims:n}=i,u=x.parseAxisParam(a,o.shape)[0],p=w.segment_util.collectGatherOpShapeInfo(o,s,u,n),d=x.sizeFromShape(s.shape),l=[],c=D({inputs:{x:o},backend:e,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),h=D({inputs:{x:s},backend:e,attrs:{shape:[p.batchSize,d/p.batchSize]}});l.push(c),l.push(h);let m=[p.batchSize,p.outerSize,d/p.batchSize,p.sliceSize];if(e.shouldExecuteOnCPU([o,s])){let R=e.tensorMap.get(h.dataId).values,P=ae(h.shape,h.dtype,R),A=e.tensorMap.get(c.dataId).values,F=ae(c.shape,c.dtype,A),B=Ia(F,P,m);return l.forEach(T=>e.disposeData(T.dataId)),e.makeTensorInfo(p.outputShape,B.dtype,B.values)}let f=new Xt(c.shape,m),C=e.runWebGPUProgram(f,[c,h],c.dtype);l.push(C);let I=D({inputs:{x:C},backend:e,attrs:{shape:p.outputShape}});return l.forEach(k=>e.disposeData(k.dataId)),I}var yu={kernelName:oi,backendName:"webgpu",kernelFunc:Wo};g();var ih=_({opType:N.GREATER,cpuKernelImpl:Ra,dtype:"bool"}),Su={kernelName:ii,backendName:"webgpu",kernelFunc:ih};g();var sh=_({opType:N.GREATER_EQUAL,dtype:"bool",cpuKernelImpl:ka}),wu={kernelName:si,backendName:"webgpu",kernelFunc:sh};g();function ah(r){let{inputs:t,backend:e}=r,{input:i}=t;return Ot(i,!0,e)}var bu={kernelName:ni,backendName:"webgpu",kernelFunc:ah};g();var nh=z({opType:v.IS_FINITE,dtype:"bool"}),vu={kernelName:pi,backendName:"webgpu",kernelFunc:nh};g();var uh=z({opType:v.IS_INF,dtype:"bool"}),Iu={kernelName:di,backendName:"webgpu",kernelFunc:uh};g();var ph=z({opType:v.IS_NAN,dtype:"bool"}),ku={kernelName:li,backendName:"webgpu",kernelFunc:ph};g();function dh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{alpha:s}=i,a=[{type:"float32",data:[s]}],n=new Z(o.shape,v.LEAKYRELU,"alpha : f32,");return e.runWebGPUProgram(n,[o],"float32",a)}var Ru={kernelName:ci,backendName:"webgpu",kernelFunc:dh};g();var lh=_({opType:N.LESS,dtype:"bool",cpuKernelImpl:Pa}),Du={kernelName:hi,backendName:"webgpu",kernelFunc:lh};g();var ch=_({opType:N.LESS_EQUAL,dtype:"bool",cpuKernelImpl:Da}),Pu={kernelName:mi,backendName:"webgpu",kernelFunc:ch};g();var qt=class{constructor(t){this.variableNames=[],this.outputShape=[],this.uniforms="start : f32, step : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="linSpace"}getUserCode(){return`
      ${y("index")} {
        if (index < uniforms.size) {
          setOutputAtIndex(index, uniforms.start + f32(index) * uniforms.step);
        }
      }
    `}};function hh(r){let{backend:t,attrs:e}=r,{start:i,stop:o,num:s}=e,a=(o-i)/(s-1),n=new qt(s),u=[{type:"float32",data:[i]},{type:"float32",data:[a]}];return t.runWebGPUProgram(n,[],"float32",u)}var $u={kernelName:fi,backendName:"webgpu",kernelFunc:hh};g();var mh=z({opType:v.LOG,cpuKernelImpl:$a}),Nu={kernelName:"Log",backendName:"webgpu",kernelFunc:mh};g();var fh=z({opType:v.LOG1P}),zu={kernelName:xi,backendName:"webgpu",kernelFunc:fh};g();var gh=_({opType:N.LOGICAL_AND,dtype:"bool"}),Au={kernelName:Ci,backendName:"webgpu",kernelFunc:gh};g();var xh=z({opType:v.LOGICAL_NOT}),Fu={kernelName:yi,backendName:"webgpu",kernelFunc:xh};g();var Ch=_({opType:N.LOGICAL_OR}),Lu={kernelName:Si,backendName:"webgpu",kernelFunc:Ch};g();g();var Tu=`
  var powValue = 0.0;
  let basis = uniforms.bias + uniforms.alpha * sum;
  if (uniforms.beta == 0.5) {
    powValue = inverseSqrt(basis);
  } else if (uniforms.beta == 1.0) {
    powValue = 1.0 / basis;
  } else {
    powValue = exp(log(basis) * (-uniforms.beta));
  }
`,Yt=class{constructor(t){this.outputShape=[],this.variableNames=["x"],this.uniforms="radius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="lrn"}getUserCode(){return`
    ${y("index")} {
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
        ${Tu}

        setOutputAtIndex(index, x * powValue);
      }
    }
  `}},jt=class{constructor(t,e){this.outputShape=[],this.variableNames=["x"],this.uniforms="radius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[256,1,1],this.maxAllowRadius=16,x.assert(e<=this.maxAllowRadius,()=>`Radius must be less than or equal to ${this.maxAllowRadius}, current radius is ${e}`),this.outputShape=t,this.elementsPerWorkgroup=this.workgroupSize[0]-2*this.maxAllowRadius,this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=S(this.dispatchLayout,this.outputShape,[this.elementsPerWorkgroup,this.workgroupSize[1],this.workgroupSize[2]]),this.shaderKey="lrn_shared"}getUserCode(){return`
    var <workgroup>lrnSub: array<f32, ${this.workgroupSize[0]}>;
    const elementsPerWorkgroup = ${this.elementsPerWorkgroup};
    const maxAllowRadius = ${this.maxAllowRadius};

    ${y()} {
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
        ${Tu}

        setOutputAtCoords(b, r, c, d, lrnSub[index] * powValue);
      }
    } `}};function yh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{depthRadius:s,bias:a,alpha:n,beta:u}=i,p;s>16?p=new Yt(o.shape):p=new jt(o.shape,s);let d=[{type:"int32",data:[s]},{type:"float32",data:[a]},{type:"float32",data:[n]},{type:"float32",data:[u]}];return e.runWebGPUProgram(p,[o],o.dtype,d)}var _u={kernelName:"LRN",backendName:"webgpu",kernelFunc:yh};g();var Qt=class{constructor(t){this.outputShape=[],this.variableNames=["inputImage","outputImage","dy"],this.uniforms="depthRadius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="lrn_grad"}getUserCode(){return`
    ${y("index")} {
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
  `}};function Sh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,y:s,dy:a}=t,{depthRadius:n,bias:u,alpha:p,beta:d}=i,l=new Qt(o.shape),c=[{type:"int32",data:[n]},{type:"float32",data:[u]},{type:"float32",data:[p]},{type:"float32",data:[d]}];return e.runWebGPUProgram(l,[o,s,a],o.dtype,c)}var Bu={kernelName:bi,backendName:"webgpu",kernelFunc:Sh};g();var wh=_({opType:N.MAX,cpuKernelImpl:za}),Eu={kernelName:Ii,backendName:"webgpu",kernelFunc:wh};g();function bh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{filterSize:s,strides:a,pad:n,dimRoundingMode:u}=i,d=w.computePool2DInfo(o.shape,s,a,1,n,u);return dt(o,d,"max",e)}var Uu={kernelName:ki,backendName:"webgpu",kernelFunc:bh};g();function vh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{filterSize:s,strides:a,pad:n,dataFormat:u,dimRoundingMode:p}=i,d=[1,1,1],l=w.computePool3DInfo(o.shape,s,a,d,n,p,u),c=new ge(l,"max"),h=[{type:"int32",data:[l.strideDepth,l.strideHeight,l.strideWidth]},{type:"int32",data:[l.padInfo.front,l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.inDepth,l.inHeight,l.inWidth]},{type:"int32",data:[l.effectiveFilterDepth,l.effectiveFilterHeight,l.effectiveFilterWidth]}];return e.runWebGPUProgram(c,[o],o.dtype,h)}var Wu={kernelName:Di,backendName:"webgpu",kernelFunc:vh};g();var Zt=class{constructor(t){this.variableNames=["dy","maxPos"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="maxPool2DBackprop"}getUserCode(){return`
      ${y("index")} {
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
    `}},Jt=class{constructor(t){this.variableNames=["dy","maxPos"],this.uniforms=`strides : vec3<i32>, pads : vec3<i32>, filterDims : vec3<i32>,
      outDepth : i32, outHeight : i32, outWidth : i32`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.inShape,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="maxPool3DBackprop"}getUserCode(){return`
      ${y("index")} {
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
    `}};function Ih(r){let{inputs:t,backend:e,attrs:i}=r,{dy:o,input:s}=t,a=s,{filterSize:n,strides:u,pad:p,dimRoundingMode:d}=i,l=[1,1,1],c=w.computePool3DInfo(a.shape,n,u,l,p,d),h=new ge(c,"max",!0),m=[{type:"int32",data:[c.strideDepth,c.strideHeight,c.strideWidth]},{type:"int32",data:[c.padInfo.front,c.padInfo.top,c.padInfo.left]},{type:"int32",data:[c.inDepth,c.inHeight,c.inWidth]},{type:"int32",data:[c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth]}],f=e.runWebGPUProgram(h,[a],"int32",m),C=new Jt(c);m=[{type:"int32",data:[c.strideDepth,c.strideHeight,c.strideWidth]},{type:"int32",data:[c.effectiveFilterDepth-1-c.padInfo.front,c.effectiveFilterHeight-1-c.padInfo.top,c.effectiveFilterWidth-1-c.padInfo.left]},{type:"int32",data:[c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth]},{type:"int32",data:[c.outDepth]},{type:"int32",data:[c.outHeight]},{type:"int32",data:[c.outWidth]}];let I=e.runWebGPUProgram(C,[o,f],a.dtype,m);return e.disposeData(f.dataId),I}var Mu={kernelName:Pi,backendName:"webgpu",kernelFunc:Ih};g();function kh(r){let{inputs:t,backend:e,attrs:i}=r,{dy:o,input:s,output:a}=t,n=s;Ue([s,a],"maxPoolGrad");let{filterSize:u,strides:p,pad:d,dimRoundingMode:l}=i,c=w.computePool2DInfo(n.shape,u,p,1,d,l),h=new ne(c,"max",!0),m=[{type:"int32",data:[c.strideHeight,c.strideWidth]},{type:"int32",data:[c.padInfo.top,c.padInfo.left]},{type:"int32",data:[c.dilationHeight,c.dilationWidth]},{type:"int32",data:[c.inHeight,c.inWidth]},{type:"int32",data:[c.effectiveFilterHeight,c.effectiveFilterWidth]}],f=e.runWebGPUProgram(h,[n],"int32",m),C=new Zt(c);m=[{type:"int32",data:[c.strideHeight,c.strideWidth]},{type:"int32",data:[c.effectiveFilterHeight-1-c.padInfo.top,c.effectiveFilterWidth-1-c.padInfo.left]},{type:"int32",data:[c.dilationHeight,c.dilationWidth]},{type:"int32",data:[c.effectiveFilterHeight,c.effectiveFilterWidth]},{type:"int32",data:[c.outHeight]},{type:"int32",data:[c.outWidth]}];let I=e.runWebGPUProgram(C,[o,f],n.dtype,m);return e.disposeData(f.dataId),I}var Ou={kernelName:Ri,backendName:"webgpu",kernelFunc:kh};g();g();function Rh(r){let{inputs:t,backend:e,attrs:i}=r,{filterSize:o,strides:s,pad:a,includeBatchInIndex:n}=i,{x:u}=t;x.assert(u.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${u.shape.length}.`);let p=[1,1];x.assert(w.eitherStridesOrDilationsAreOne(s,p),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${p}'`);let d=w.computePool2DInfo(u.shape,o,s,p,a),l=[{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[d.inHeight,d.inWidth]},{type:"int32",data:[d.effectiveFilterHeight,d.effectiveFilterWidth]}],c=new ne(d,"max",!1),h=e.runWebGPUProgram(c,[u],u.dtype,l);c=new ne(d,"max",!0,!0,n);let m=e.runWebGPUProgram(c,[u],"int32",l);return[h,m]}var Vu={kernelName:$i,backendName:"webgpu",kernelFunc:Rh};g();function Dh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{axis:s,keepDims:a}=i;return J(o,s,a,"min",e)}var Gu={kernelName:"Min",backendName:"webgpu",kernelFunc:Dh};g();var Ph=_({opType:N.MIN,cpuKernelImpl:Aa}),Hu={kernelName:Ai,backendName:"webgpu",kernelFunc:Ph};g();var eo=class{constructor(t,e,i){this.uniforms="",this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.map((o,s)=>o[0]+t[s]+o[1]),this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.xShape=t,e.map((o,s)=>{this.uniforms+=` pad${s} : vec2<i32>,`}),this.offset=i==="reflect"?0:1,this.shaderKey=`mirrorPad_${i}`}getUserCode(){let t=this.xShape.length,e=this.xShape.map((p,d)=>`uniforms.pad${d}[0]`).join(","),i=this.xShape.map((p,d)=>`uniforms.pad${d}[0] + uniforms.xShape${t>1?`[${d}]`:""}`).join(","),o=t===1?"start":"start[i]",s=t===1?"end":"end[i]",a=t===1?"outC":"outC[i]",n=E(t),u=t>1?["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,t):"coords";return`
      ${y("index")} {
        if (index < uniforms.size) {
          let start = ${n}(${e});
          let end = ${n}(${i});
          var outC = getCoordsFromIndex(index);
          for (var i = 0; i < ${t}; i = i + 1) {
            if (${a} < ${o}) {
              ${a} = ${o} * 2 - ${a} - ${this.offset};
            } else if(${a} >= ${s}) {
              ${a} = (${s} - 1) * 2 - ${a} + ${this.offset};
            }
          }
          let coords = outC - start;
          setOutputAtIndex(index, getX(${u}));
        }
      }
    `}};var Ku={kernelName:Fi,backendName:"webgpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{x:i}=r,{paddings:o,mode:s}=t,a=e,n=o.map(d=>({type:"int32",data:[d[0],d[1]]})),u=new eo(i.shape,o,s);return a.runWebGPUProgram(u,[i],i.dtype,n)}};g();var $h=_({opType:N.MOD}),Xu={kernelName:"Mod",backendName:"webgpu",kernelFunc:$h};g();var to=class{constructor(t,e){this.variableNames=["probs"],this.outputShape=[],this.uniforms="seed : f32, numOutcomes: i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,e],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="multinomial"}getUserCode(){return`
    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    fn random (seed : f32, resultUV : vec2<f32>) -> f32 {
      let HASHSCALE1 = 443.8975;
      let p = resultUV * seed;
      var p3  = fract(vec3<f32>(p.xyx) * HASHSCALE1);
      p3 = p3 + dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${y("index")} {
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
  `}};g();var oo=class{constructor(t){this.variableNames=["logits"],this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=[this.outputShape[0],1,1],this.outputShape[1]>=4096?this.workgroupSize=[256,1,1]:this.workgroupSize=[64,1,1],this.shaderKey="softmax"}getUserCode(){return`
    var<workgroup> buf : array<f32, ${this.workgroupSize[0]}>;
    var<workgroup> rowMaxShared : f32;
    var<workgroup> rowSumShared : f32;
    const blockSize = ${this.workgroupSize[0]};
    ${y("index")} {
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
    `}};function Mo(r){let{inputs:t,backend:e,attrs:i}=r,{logits:o}=t,{dim:s}=i,a=D({inputs:{x:o},backend:e,attrs:{shape:[x.sizeFromShape(o.shape)/o.shape[s],o.shape[s]]}}),n=new oo(a.shape),u=e.runWebGPUProgram(n,[a],o.dtype),p=D({inputs:{x:u},backend:e,attrs:{shape:o.shape}});return e.disposeData(a.dataId),e.disposeData(u.dataId),p}var qu={kernelName:bs,backendName:"webgpu",kernelFunc:Mo};function Nh(r){let{inputs:t,backend:e,attrs:i}=r,{logits:o}=t,{numSamples:s,seed:a,normalized:n}=i,u=n?o:Mo({inputs:{logits:o},backend:e,attrs:{dim:o.shape.length-1}}),p=u.shape[0],d=u.shape[1],l=new to(p,s),c=[{type:"float32",data:[a]},{type:"int32",data:[d]}],h=e.runWebGPUProgram(l,[u],"int32",c);return n||e.disposeData(u.dataId),h}var Yu={kernelName:Ti,backendName:"webgpu",kernelFunc:Nh};g();function zh(r){let{inputs:t,backend:e}=r,{x:i}=t;if(e.shouldExecuteOnCPU([i])){let s=e.tensorMap.get(i.dataId),[a,n]=La(s.values,i.shape,i.dtype);return e.makeTensorInfo(n,i.dtype,a)}let o=new Z(i.shape,v.NEG);return e.runWebGPUProgram(o,[i],i.dtype)}var ju={kernelName:"Neg",backendName:"webgpu",kernelFunc:zh};g();function Ah(r){console.warn("tf.nonMaxSuppression() in webgpu locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:i}=r,{boxes:o,scores:s}=t,{maxOutputSize:a,iouThreshold:n,scoreThreshold:u}=i,p=e.readSync(o.dataId),d=e.readSync(s.dataId),{selectedIndices:l}=qe.nonMaxSuppressionV3Impl(p,d,a,n,u);return e.makeTensorInfo([l.length],"int32",new Int32Array(l))}var Qu={kernelName:Ui,backendName:"webgpu",kernelFunc:Ah};g();function Fh(r){console.warn("tf.nonMaxSuppression() in webgpu locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:i}=r,{boxes:o,scores:s}=t,{maxOutputSize:a,iouThreshold:n,scoreThreshold:u,softNmsSigma:p}=i,d=e.readSync(o.dataId),l=e.readSync(s.dataId),c=a,h=n,m=u,f=p,{selectedIndices:C,selectedScores:I}=qe.nonMaxSuppressionV5Impl(d,l,c,h,m,f);return[e.makeTensorInfo([C.length],"int32",new Int32Array(C)),e.makeTensorInfo([I.length],"float32",new Float32Array(I))]}var Zu={kernelName:Wi,backendName:"webgpu",kernelFunc:Fh};g();var ro=class{constructor(t,e){this.variableNames=["x"],this.uniforms="onValue : f32, offValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t,e],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="onehot"}getUserCode(){return`
      ${y("index")} {
        if(index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          setOutputAtIndex(index, mix(uniforms.offValue, uniforms.onValue,
                                      f32(i32(round(getX(coords.x))) == coords.y)));
        }
      }
    `}};function Lh(r){let{inputs:t,backend:e,attrs:i}=r,{indices:o}=t,{dtype:s,depth:a,onValue:n,offValue:u}=i,p=x.sizeFromShape(o.shape),d=new ro(p,a),l=D({inputs:{x:o},backend:e,attrs:{shape:[p]}}),c=[{type:"float32",data:[n]},{type:"float32",data:[u]}],h=e.runWebGPUProgram(d,[l],s,c);e.disposeData(l.dataId);let m=[...o.shape,a],f=D({inputs:{x:h},backend:e,attrs:{shape:m}});return e.disposeData(h.dataId),f}var Ju={kernelName:Oi,backendName:"webgpu",kernelFunc:Lh};g();g();function Ge(r){let{inputs:t,backend:e}=r,{x:i}=t;if(i.dtype==="complex64"){let o=ce({inputs:{input:i},backend:e}),s=Ge({inputs:{x:o},backend:e}),a=we({inputs:{input:i},backend:e}),n=Ge({inputs:{x:a},backend:e}),u=oe({inputs:{real:s,imag:n},backend:e});return e.disposeData(o.dataId),e.disposeData(s.dataId),e.disposeData(a.dataId),e.disposeData(n.dataId),u}else return W({attrs:{shape:i.shape,dtype:i.dtype,value:i.dtype==="string"?"":0},backend:e})}var ep={kernelName:Us,backendName:"webgpu",kernelFunc:Ge};function tp(r){let{inputs:t,backend:e}=r,{x:i}=t;if(i.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(i.dtype==="complex64"){let o=ce({inputs:{input:i},backend:e}),s=tp({inputs:{x:o},backend:e}),a=we({inputs:{input:i},backend:e}),n=Ge({inputs:{x:a},backend:e}),u=oe({inputs:{real:s,imag:n},backend:e});return e.disposeData(o.dataId),e.disposeData(s.dataId),e.disposeData(a.dataId),e.disposeData(n.dataId),u}else return W({attrs:{shape:i.shape,dtype:i.dtype,value:1},backend:e})}var op={kernelName:Mi,backendName:"webgpu",kernelFunc:tp};g();function Th(r){let{inputs:t,backend:e,attrs:i}=r,{axis:o}=i;if(t.length===1)return Mt({inputs:{input:t[0]},backend:e,attrs:{dim:o}});let s=t[0].shape,a=t[0].dtype;t.forEach(d=>{x.assertShapesMatch(s,d.shape,"All tensors passed to stack must have matching shapes"),x.assert(a===d.dtype,()=>"All tensors passed to stack must have matching dtypes")});let n=[],u=t.map(d=>{let l=Mt({inputs:{input:d},backend:e,attrs:{dim:o}});return n.push(l),l}),p=_o({inputs:u,backend:e,attrs:{axis:o}});return n.forEach(d=>e.disposeData(d.dataId)),p}var rp={kernelName:Vi,backendName:"webgpu",kernelFunc:Th};g();function Oo(r,t=!1){let e=r.length,i=E(e),o=r.map((l,c)=>`uniforms.pad${c}[0]`).join(","),s=r.map((l,c)=>`uniforms.pad${c}[0] + uniforms.xShape${e>1?`[${c}]`:""}`).join(","),a=e>1?`${i}(${o})`:`${o}`,n=e>1?`${i}(${s})`:`${s}`,u=e>1?"any(paddedCoords < start)":"paddedCoords < start",p=e>1?"any(paddedCoords >= end)":"paddedCoords >= end",d=e>1?["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,e):"coords";return`
        let start = ${a};
        let end = ${n};
        if (${u} || ${p}) {
          setOutputAtIndex(index, ${t?0:"uniforms.constantValue"});
        } else {
          let coords = paddedCoords - start;
          setOutputAtIndex(index, getX(${d}));
        }
  `}var io=class{constructor(t,e){this.variableNames=["x"],this.uniforms="constantValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.map((i,o)=>i[0]+t[o]+i[1]),this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),e.map((i,o)=>{this.uniforms+=` pad${o} : vec2<i32>,`}),this.xShape=t,this.shaderKey="pad"}getUserCode(){return`
      ${y("index")} {
        if (index < uniforms.size) {
          let paddedCoords = getCoordsFromIndex(index);
          ${Oo(this.xShape)}
        }
      }
    `}};var _h=r=>{let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{paddings:s,constantValue:a}=i;if(s.every(p=>x.arraysEqual(p,[0,0])))return O({inputs:{x:o},backend:e});if(x.sizeFromShape(o.shape)===0){let p=s.map((d,l)=>d[0]+o.shape[l]+d[1]);return W({backend:e,attrs:{shape:p,value:a,dtype:o.dtype}})}let n=[{type:"float32",data:[a]}];s.map(p=>n.push({type:"int32",data:[p[0],p[1]]}));let u=new io(o.shape,s);return e.runWebGPUProgram(u,[o],o.dtype,n)},ip={kernelName:Gi,backendName:"webgpu",kernelFunc:_h};g();var Bh=_({opType:N.POW}),sp={kernelName:"Pow",backendName:"webgpu",kernelFunc:Bh};g();function Eh(r){let{inputs:t,backend:e}=r,{x:i,alpha:o}=t,s=new le(N.PRELU,i.shape,o.shape);return e.runWebGPUProgram(s,[i,o],"float32")}var ap={kernelName:Ki,backendName:"webgpu",kernelFunc:Eh};g();function Uh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{axis:s,keepDims:a}=i;return J(o,s,a,"prod",e)}var np={kernelName:Xi,backendName:"webgpu",kernelFunc:Uh};g();var Wh=r=>{let{backend:t,attrs:e}=r,{start:i,stop:o,step:s,dtype:a}=e,n=Ba(i,o,s,a);return t.makeTensorInfo([n.length],a,n)},up={kernelName:qi,backendName:"webgpu",kernelFunc:Wh};g();var Mh=_({opType:N.DIV}),pp={kernelName:Mr,backendName:"webgpu",kernelFunc:Mh};g();var Oh=z({opType:v.RECIPROCAL}),dp={kernelName:ji,backendName:"webgpu",kernelFunc:Oh};g();var Vh=z({opType:v.RELU}),lp={kernelName:Qi,backendName:"webgpu",kernelFunc:Vh};g();var Gh=z({opType:v.RELU6}),cp={kernelName:rs,backendName:"webgpu",kernelFunc:Gh};g();var so=class{constructor(t,e,i){this.variableNames=["x"],this.uniforms="adjustHeightWidth : vec2<f32>, halfPixelCenters : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t[0],e,i,t[3]],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="resizeBilinear"}getUserCode(){return`
      ${y("index")} {
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
    `}};function Hh(r){let{inputs:t,backend:e,attrs:i}=r,{images:o}=t,{alignCorners:s,size:a,halfPixelCenters:n}=i,[u,p]=a,d=s&&u>1?1:0,l=s&&p>1?1:0,h=[{type:"float32",data:[d,l]},{type:"float32",data:[n?.5:0]}],m=new so(o.shape,u,p);return e.runWebGPUProgram(m,[o],"float32",h)}var hp={kernelName:ts,backendName:"webgpu",kernelFunc:Hh};g();var ao=class{constructor(t,e){this.variableNames=["dy"],this.uniforms=`effectiveXSize : vec2<i32>, effectiveYSize : vec2<i32>, heightScale : f32, widthScale : f32,
       invHeightScale : f32, invWidthScale : f32, winHeight : i32, winWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.alignCorners=e,this.shaderKey=`resizeBilinearBackprop_${e}`}getUserCode(){return`
      ${y("index")} {
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
    `}};function Kh(r){let{inputs:t,backend:e,attrs:i}=r,{images:o,dy:s}=t,{alignCorners:a}=i,[,n,u]=o.shape,[,p,d]=s.shape,l=[a&&p>1?n-1:n,a&&d>1?u-1:u],c=[a&&p>1?p-1:p,a&&d>1?d-1:d],h=l[0]/c[0],m=l[1]/c[1],f=1/h,C=1/m,I=Math.ceil(f)*2+2,k=Math.ceil(C)*2+2,R=new ao(o.shape,a),P=[{type:"int32",data:l},{type:"int32",data:c},{type:"float32",data:[h]},{type:"float32",data:[m]},{type:"float32",data:[f]},{type:"float32",data:[C]},{type:"int32",data:[I]},{type:"int32",data:[k]}];return e.runWebGPUProgram(R,[s],s.dtype,P)}var mp={kernelName:os,backendName:"webgpu",kernelFunc:Kh};g();var no=class{constructor(t,e,i,o){this.variableNames=["x"],this.uniforms="adjustHeightWidth : vec2<f32>, roundBase : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[t[0],e,i,t[3]],this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.halfPixelCenters=o,this.shaderKey=`resizeNearest_${o}`}getUserCode(){let t;return this.halfPixelCenters?t="max((vec2<f32>(rc) + vec2<f32>(0.5)) * effectiveInputOverOutputRatioRC, vec2<f32>(0.0))":t="vec2<f32>(rc) * effectiveInputOverOutputRatioRC",`
      ${y("index")} {
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
    `}};function Xh(r){let{inputs:t,backend:e,attrs:i}=r,{images:o}=t,{alignCorners:s,halfPixelCenters:a,size:n}=i,[u,p]=n,d=s&&u>1?1:0,l=s&&p>1?1:0,h=[{type:"float32",data:[d,l]},{type:"float32",data:[s?.5:0]}],m=new no(o.shape,u,p,a);return e.runWebGPUProgram(m,[o],o.dtype,h)}var fp={kernelName:Ji,backendName:"webgpu",kernelFunc:Xh};g();var uo=class{constructor(t,e){this.variableNames=["dy"],this.uniforms=`effectiveXSize : vec2<i32>, effectiveYSize : vec2<i32>, invHeightScale : f32, invWidthScale : f32,
       winHeight : i32, winWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.alignCorners=e,this.shaderKey=`resizeNearestNeigborBackprop_${e}`}getUserCode(){return`
      ${y("index")} {
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
    `}};function qh(r){let{inputs:t,backend:e,attrs:i}=r,{images:o,dy:s}=t,{alignCorners:a}=i,[,n,u]=o.shape,[,p,d]=s.shape,l=[a&&p>1?n-1:n,a&&d>1?u-1:u],c=[a&&p>1?p-1:p,a&&d>1?d-1:d],h=l[0]/c[0],m=l[1]/c[1],f=1/h,C=1/m,I=Math.ceil(f)*2+2,k=Math.ceil(C)*2+2,R=new uo(o.shape,a),P=[{type:"int32",data:l},{type:"int32",data:c},{type:"float32",data:[f]},{type:"float32",data:[C]},{type:"int32",data:[I]},{type:"int32",data:[k]}];return e.runWebGPUProgram(R,[s],s.dtype,P)}var gp={kernelName:es,backendName:"webgpu",kernelFunc:qh};g();var po=class{constructor(t){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=" axis : vec4<i32>,",this.shaderKey="reverse"}getUserCode(){return`
      
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
    
      ${y("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let reverseCoords = getReverseCoords(coords);
          setOutputAtIndex(index, getX(reverseCoords[0],
              reverseCoords[1], reverseCoords[2], reverseCoords[3]));
        }
      }
    `}};function Yh(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{dims:s}=i,a=o.shape.length;if(a===0)return O({inputs:{x:o},backend:e});let n=o.shape,u=[1,1,1,1];n.forEach((C,I)=>{let k=I+4-a;u[k]=C});let p=x.parseAxisParam(s,o.shape),d=[0,0,0,0];p.forEach(C=>{let I=C+4-a;d[I]=1});let l=[{type:"int32",data:d}],c=D({inputs:{x:o},backend:e,attrs:{shape:u}}),h=new po(u),m=e.runWebGPUProgram(h,[c],c.dtype,l);e.disposeData(c.dataId);let f=D({inputs:{x:m},backend:e,attrs:{shape:n}});return e.disposeData(m.dataId),f}var xp={kernelName:is,backendName:"webgpu",kernelFunc:Yh};g();g();var lo=class{constructor(t,e){this.outputShape=[],this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=`centerX : f32, centerY : f32, sinRadians : f32,
          cosRadians : f32,`,this.shaderKey="rotate",this.outputShape=t,typeof e=="number"?(this.uniforms+=" fillValue : f32,",this.fillSnippet="var outputValue = uniforms.fillValue;",this.shaderKey+="_float"):(this.uniforms+=" fillValue : vec3<f32>,",this.fillSnippet="var outputValue = uniforms.fillValue[coords[3]];",this.shaderKey+="_vec3")}getUserCode(){return`
        ${y("index")} {
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
      `}};var Cp={kernelName:Os,backendName:"webgpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{image:i}=r,{radians:o,fillValue:s,center:a}=t,n=e,u=new lo(i.shape,s),[p,d]=w.getImageCenter(a,i.shape[1],i.shape[2]),l=[{type:"float32",data:[p]},{type:"float32",data:[d]},{type:"float32",data:[Math.sin(o)]},{type:"float32",data:[Math.cos(o)]}];return typeof s=="number"?l.push({type:"float32",data:[Number.parseFloat(s.toFixed(2))]}):l.push({type:"float32",data:s}),n.runWebGPUProgram(u,[i],i.dtype,l)}};g();var jh=z({opType:v.ROUND}),yp={kernelName:ss,backendName:"webgpu",kernelFunc:jh};g();var Qh=z({opType:v.RSQRT,cpuKernelImpl:Ea}),Sp={kernelName:as,backendName:"webgpu",kernelFunc:Qh};g();var ue=class{constructor(t,e,i,o,s,a,n,u=!0){this.variableNames=["updates","indices"],this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=a,this.type=n,this.sumDupeIndices=u,this.dispatchLayout=b(t),this.dispatch=S(this.dispatchLayout,t,this.workgroupSize),this.sliceDimGreaterThanOne=e>1,this.shaderKey=`scatter_${i}_${o}_${this.sliceDimGreaterThanOne}_${n}_${u}_${s.length}`;let p=E(s.length);this.uniforms=`sliceDim : i32, strides: ${p}, updatesSize: i32,`,this.updatesRank=o,this.indicesRank=i}getUserCode(){let t="";this.indicesRank===1?t="coords[0]":this.indicesRank===2&&(t="coords[0], j");let e=`getIndices(${t})`,i=this.sliceDimGreaterThanOne?"uniforms.strides[j]":"uniforms.strides",o="",s="";this.dispatchLayout.x.length===1?(o="flattenedIndex",s=`
      fn getUpdatesCoordsFromFlatIndex(index : i32) -> i32 {
        return index;
      }
      `):this.dispatchLayout.x.length===2&&(o="vec2<i32>(flattenedIndex, coords[1])",s=`
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
      ${y("index")} {
        if (index < uniforms.updatesSize) {
          let coords = getUpdatesCoordsFromFlatIndex(index);
          var flattenedIndex = 0;
          for (var j = 0; j < uniforms.sliceDim; j = j + 1) {
            let indexInside = i32(round(${e}));
            flattenedIndex = flattenedIndex + indexInside * ${i};
          }
          let updateValue =
              ${me(this.type)}(${n});
          let flatIndex = getOutputIndexFromCoords(${o});

          ${this.sumDupeIndices?j("&result[flatIndex]","updateValue",this.type):"atomicStore(&result[flatIndex], bitcast<i32>(updateValue));"}
        }
      }`}};function Zh(r){let{inputs:t,backend:e,attrs:i}=r,{indices:o,updates:s}=t,{shape:a}=i,{sliceRank:n,numUpdates:u,sliceSize:p,strides:d,outputSize:l}=w.calculateShapes(s,o,a),c=[l/p,p];if(l===0)return e.makeTensorInfo(a,o.dtype);let h=D({inputs:{x:o},backend:e,attrs:{shape:[u,n]}}),m=D({inputs:{x:s},backend:e,attrs:{shape:[u,p]}}),f=m.dtype,C=W({backend:e,attrs:{shape:c,value:0,dtype:f}}),I=x.sizeFromShape(m.shape),k=[{type:"int32",data:[n]},{type:"int32",data:d},{type:"int32",data:[I]}],R=new ue(m.shape,n,h.shape.length,m.shape.length,d,c,f),P=e.runWebGPUProgram(R,[m,h],f,k,C),$=D({inputs:{x:P},backend:e,attrs:{shape:a}});return e.disposeData(h.dataId),e.disposeData(m.dataId),e.disposeData(P.dataId),$}var wp={kernelName:ns,backendName:"webgpu",kernelFunc:Zh};g();var co=class{constructor(t,e){this.outputShape=[],this.variableNames=["sortedSequence","values"],this.uniforms="numInputs : i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.side=e,this.shaderKey=`search_sorted_${e}`}getUserCode(){return`
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

      ${y("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let value = getValuesByOutputIndex(index);
          setOutputAtIndexI32(index, findBound(coords[0], value));
        }
      }
    `}};function Jh(r){let{inputs:t,backend:e,attrs:i}=r,{sortedSequence:o,values:s}=t,{side:a}=i,n=new co([s.shape[0],s.shape[1]],a),u=[{type:"int32",data:[o.shape[1]]}];return e.runWebGPUProgram(n,[o,s],"int32",u)}var bp={kernelName:ps,backendName:"webgpu",kernelFunc:Jh};g();var ho=class{constructor(t,e,i){this.variableNames=["c","a","b"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.cRank=t,this.rank=i,this.shaderKey="select"}getUserCode(){let t,e;if(this.rank>4)throw Error(`Where for rank ${this.rank} is not yet supported`);if(this.rank===1)e="resRC",t="resRC";else{let o=["resRC.x","resRC.y","resRC.z","resRC.w"],s=[],a=[];for(let n=0;n<this.outputShape.length;n++)a.push(`${o[n]}`),n<this.cRank&&s.push(`${o[n]}`);t=s.join(),e=a.join()}return`
      ${y("index")} {
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
    `}};function em(r){let{inputs:t,backend:e}=r,{condition:i,t:o,e:s}=t,a=new ho(i.shape.length,o.shape,o.shape.length);return e.runWebGPUProgram(a,[i,o,s],pe(o.dtype,s.dtype))}var vp={kernelName:ds,backendName:"webgpu",kernelFunc:em};g();var tm=z({opType:v.SELU}),Ip={kernelName:ls,backendName:"webgpu",kernelFunc:tm};g();var om=z({opType:v.SIGMOID}),kp={kernelName:gs,backendName:"webgpu",kernelFunc:om};g();var rm=z({opType:v.SIGN}),Rp={kernelName:fs,backendName:"webgpu",kernelFunc:rm};g();var im=z({opType:v.SIN}),Dp={kernelName:"Sin",backendName:"webgpu",kernelFunc:im};g();var sm=z({opType:v.SINH}),Pp={kernelName:ms,backendName:"webgpu",kernelFunc:sm};g();var am=z({opType:v.SOFTPLUS}),$p={kernelName:xs,backendName:"webgpu",kernelFunc:am};g();var mo=class{constructor(t,e,i,o,s,a){this.variableNames=["x"],this.outputShape=[],this.uniforms="",this.workgroupSize=[64,1,1],this.size=!0;let n=new Array(o.length);for(let u=0;u<n.length;u++)n[u]=o[s[u]];this.outputShape=n,this.newDim=s,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.xShape=t,this.paddedXShape=e,this.uniforms+=`reshapedPaddedXShape : ${E(o.length)}, paddedXShapeStrides : ${E(a)}, `,i.map((u,p)=>{this.uniforms+=` pad${p} : vec2<i32>,`}),this.shaderKey=`spaceToBatchND_${s}`}getUserCode(){let t=E(this.outputShape.length),e=No(this.newDim);return`
      ${Te(this.paddedXShape,"PaddedX")}
      ${y("index")} {
        if(index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let switchedIndex = getIndexFromCoords${this.outputShape.length}D(${t}(${e}), uniforms.reshapedPaddedXShape);
          let paddedCoords = getPaddedXCoordsFromIndex(switchedIndex);
          ${Oo(this.xShape,!0)}
        }
      }
    `}};var nm=r=>{let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{blockShape:s,paddings:a}=i;x.assert(o.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGPU backend not implemented yet");let n=s.reduce((k,R)=>k*R),u=[[0,0]];u.push(...a);for(let k=1+s.length;k<o.shape.length;++k)u.push([0,0]);let p=u.map((k,R)=>k[0]+o.shape[R]+k[1]),d=w.getReshaped(p,s,n,!1),l=w.getPermuted(d.length,s.length,!1),c=w.getReshapedPermuted(p,s,n,!1),h=x.computeStrides(p),m=new mo(o.shape,p,u,d,l,h.length),f=[{type:"int32",data:d},{type:"int32",data:h}];u.map(k=>f.push({type:"int32",data:[k[0],k[1]]}));let C=e.runWebGPUProgram(m,[o],o.dtype,f),I=D({inputs:{x:C},backend:e,attrs:{shape:c}});return e.disposeData(C.dataId),I},Np={kernelName:Ss,backendName:"webgpu",kernelFunc:nm};g();g();var fo=class{constructor(t,e,i){this.variableNames=["input","indices","segmentIds"],this.outputShape=[],this.uniforms="segmentSize : i32, sparseSize : i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t,this.type=i,this.dispatchLayout=b([e]),this.dispatch=S(this.dispatchLayout,[e],this.workgroupSize),this.shaderKey="sparseSegmentSum"}getUserCode(){return`
    ${y("index")} {
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
  `}},go=class{constructor(t,e){this.variableNames=["segmentIds"],this.outputShape=[],this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=[t],this.dispatchLayout=b(e),this.dispatch=S(this.dispatchLayout,e,this.workgroupSize),this.shaderKey="sparseSegmentIdCountProgram"}getUserCode(){return`
    ${y("index")} {
      if (index < uniforms.segmentIdsShape) {
        let segmentId = segmentIds[index];
        ${j("&result[segmentId]","1","int32")}
      }
    }
  `}},xo=class{constructor(t,e){this.variableNames=["segmentSum","sameSegmentIdCount"],this.outputShape=[],this.uniforms="segmentSize : i32",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.type=e,this.dispatchLayout=b(t),this.dispatch=S(this.dispatchLayout,t,this.workgroupSize),this.shaderKey="sparseSegmentMean"}getUserCode(){return`
    ${y("index")} {
      if (index < uniforms.size) {
        let segmentId = index / uniforms.segmentSize;
        let count = sameSegmentIdCount[segmentId];
        if (count != 0) {
          ${this.type==="float32"?"setOutputAtIndex(index, segmentSum[index] / f32(count));":"setOutputAtIndexI32(index, segmentSum[index] / count);"}
        }
      }
    }
  `}};function Co(r,t,e,i=!1,o){let a=x.sizeFromShape(r.shape)/r.shape[0],n=r.dtype,u=x.sizeFromShape(t.shape),p=o.readSync(e.dataId),l=u>0?p[u-1]+1:0,c,h=r.shape.slice();h[0]=l;let m=u*a,f=W({backend:o,attrs:{shape:h,value:0,dtype:n}});c=new fo(h,m,n);let C=[{type:"int32",data:[a]},{type:"int32",data:[m]}],I=o.runWebGPUProgram(c,[r,t,e],n,C,f);if(i)return I;let k=W({backend:o,attrs:{shape:[l],value:0,dtype:"int32"}});c=new go(l,e.shape);let R=o.runWebGPUProgram(c,[e],"int32",null,k),P=W({backend:o,attrs:{shape:h,value:0,dtype:n}});c=new xo(h,n),C=[{type:"int32",data:[a]}];let $=o.runWebGPUProgram(c,[I,R],n,C,P);return o.disposeData(I.dataId),o.disposeData(R.dataId),$}function um(r){let{inputs:t,backend:e}=r,{data:i,indices:o,segmentIds:s}=t;return Co(i,o,s,!1,e)}var zp={kernelName:vs,backendName:"webgpu",kernelFunc:um};g();function pm(r){let{inputs:t,backend:e}=r,{data:i,indices:o,segmentIds:s}=t;return Co(i,o,s,!0,e)}var Ap={kernelName:Is,backendName:"webgpu",kernelFunc:pm};g();g();var yo=class{constructor(t,e){this.variableNames=["A"],this.workgroupSize=[64,1,1],this.size=!0;let i=new Array(t.length);for(let o=0;o<i.length;o++)i[o]=t[o]*e[o];this.outputShape=i,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.rank=this.outputShape.length,this.shaderKey="tile"}getUserCode(){let t=dm(this.rank,"uniforms.");return`
      ${y("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          setOutputAtIndex(index, getA(${t}));
        }
      }
    `}};function dm(r,t=""){if(r>=5)throw Error(`Tile for rank ${r} is not yet supported`);if(r===1)return`(resRC % ${t}aShape)`;let e=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[];for(let o=0;o<r;o++)i.push(`(${e[o]} % ${t}aShape[${o}])`);return i.join()}function He(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{reps:s}=i;if(e.shouldExecuteOnCPU([o])||o.dtype==="string"||o.shape.length>=5){let u=e.readSync(o.dataId),p=o.dtype==="string"?u.map(c=>x.decodeString(c)):u,d=ae(o.shape,o.dtype,p),l=Ha(d,s);return e.makeTensorInfo(l.shape,l.dtype,l.values)}let a=new yo(o.shape,s);return e.runWebGPUProgram(a,[o],o.dtype)}var Fp={kernelName:Fs,backendName:"webgpu",kernelFunc:He};function lm(r){let{inputs:t,backend:e,attrs:i}=r,{sparseIndices:o,sparseValues:s,defaultValue:a}=t,{outputShape:n}=i,{sliceRank:u,numUpdates:p,sliceSize:d,strides:l,outputSize:c}=w.calculateShapes(s,o,n),h=!1;if(s.dtype==="string"){let B=e.bufferSync(o),T=e.bufferSync(s),V=x.decodeString(e.readSync(a.dataId)[0]),G=Ua(B,T,n,c,d,p,u,l,V,h);return e.makeTensorInfo(n,G.dtype,G.values)}let m=[c/d,d],f=D({inputs:{x:o},backend:e,attrs:{shape:[p,u]}}),C=s.shape.length?D({inputs:{x:s},backend:e,attrs:{shape:[p,d]}}):O({inputs:{x:s},backend:e}),I=C.dtype,k=e.makeTensorInfo([],I,x.makeZerosTypedArray(1,I)),R=D({inputs:{x:a},backend:e,attrs:{shape:Array(m.length).fill(1)}}),P=He({inputs:{x:R},backend:e,attrs:{reps:m}}),$=x.sizeFromShape([p,d]),A=[{type:"int32",data:[u]},{type:"int32",data:l},{type:"int32",data:[$]}];switch(p){case 0:break;case 1:{let B=new ue([p,d],u,f.shape.length,C.shape.length,l,m,I,h);e.runWebGPUProgram(B,[C,f],I,A,P)}break;default:{let B=new ue([p,d],u,f.shape.length,k.shape.length,l,m,I,h);e.runWebGPUProgram(B,[k,f],I,A,P)}{let B=new ue([p,d],u,f.shape.length,C.shape.length,l,m,I);e.runWebGPUProgram(B,[C,f],I,A,P)}}let F=D({inputs:{x:P},backend:e,attrs:{shape:n}});return e.disposeData(f.dataId),e.disposeData(C.dataId),e.disposeData(R.dataId),e.disposeData(k.dataId),e.disposeData(P.dataId),F}var Lp={kernelName:ks,backendName:"webgpu",kernelFunc:lm};g();function cm(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{numOrSizeSplits:s,axis:a}=i,n=x.parseAxisParam(a,o.shape)[0],u=w.prepareSplitSize(o,s,n),p=o.shape.length,d=new Array(p).fill(0),l=o.shape.slice();return u.map(c=>{let h=[...l];h[n]=c;let m=se({inputs:{x:o},backend:e,attrs:{begin:d,size:h}});return d[n]+=c,m})}var Tp={kernelName:ws,backendName:"webgpu",kernelFunc:cm};g();var hm=z({opType:v.SQRT}),_p={kernelName:Cs,backendName:"webgpu",kernelFunc:hm};g();var Bp={kernelName:Ds,backendName:"webgpu",kernelFunc:({inputs:r,backend:t})=>{let{x:e}=r,i=t,o=new Z(e.shape,v.SQUARE);return i.runWebGPUProgram(o,[e],e.dtype)}};g();var mm=_({opType:N.SQUARED_DIFFERENCE}),Ep={kernelName:Rs,backendName:"webgpu",kernelFunc:mm};g();function fm({inputs:r,attrs:t,backend:e}){let{x:i}=r,o=new Z(i.shape,v.STEP,"stepAlpha : f32,"),s=[{type:"float32",data:[t.alpha]}];return e.runWebGPUProgram(o,[i],i.dtype,s)}var Up={kernelName:Ws,backendName:"webgpu",kernelFunc:fm};g();var So=class{constructor(t){this.variableNames=["x"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]);let e=E(this.outputShape.length);this.uniforms=`begin : ${e},  strides : ${e}, `,this.shaderKey="stridedSlice"}getUserCode(){let t=this.outputShape.length,e="";if(t===1)e="coords * uniforms.strides + uniforms.begin";else{let o=0;e=this.outputShape.map((s,a)=>(o++,this.outputShape.length===1?`coords * uniforms.strides[${a}] + uniforms.begin[${a}]`:`coords[${o-1}] * uniforms.strides[${a}] + uniforms.begin[${a}]`)).join(",")}return`
       ${y("index")} {
         if (index < uniforms.size) {
           let coords = getCoordsFromIndex(index);
           setOutputAtIndex(index, getX(${e}));
         }
       }
     `}};function gm(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{begin:s,end:a,strides:n,beginMask:u,endMask:p,ellipsisMask:d,newAxisMask:l,shrinkAxisMask:c}=i,{finalShapeSparse:h,finalShape:m,isIdentity:f,sliceDim0:C,isSimpleSlice:I,begin:k,end:R,strides:P}=ve.sliceInfo(o.shape,s,a,n,u,p,d,l,c),$;if(f)$=D({inputs:{x:o},backend:e,attrs:{shape:m}});else if(C||I){x.assert(o.shape.length>=1,()=>`Input must have rank at least 1, got: ${o.shape.length}`);let A=ve.computeOutShape(k,R,P),F=se({inputs:{x:o},backend:e,attrs:{begin:k,size:A}});$=D({inputs:{x:F},backend:e,attrs:{shape:m}}),e.disposeData(F.dataId)}else if(e.shouldExecuteOnCPU([o])){let F=e.readSync(o.dataId),B=ae(o.shape,o.dtype,F),T=Oa(h,B,P,k);$=e.makeTensorInfo(m,o.dtype,T.values)}else{let F=new So(h),B=[{type:"int32",data:k},{type:"int32",data:P}],T=e.runWebGPUProgram(F,[o],o.dtype,B);$=D({inputs:{x:T},backend:e,attrs:{shape:m}}),e.disposeData(T.dataId)}return $}var Wp={kernelName:Ps,backendName:"webgpu",kernelFunc:gm};g();function xm(r){let{inputs:t,backend:e,attrs:i}=r,{separator:o,nGramWidths:s,leftPad:a,rightPad:n,padWidth:u,preserveShortSequences:p}=i,{data:d,dataSplits:l}=t,c=e.readSync(d.dataId),h=e.readSync(l.dataId),[m,f]=Va(c,h,o,s,a,n,u,p);return[e.makeTensorInfo([m.length],"string",m),e.makeTensorInfo(l.shape,"int32",f)]}var Mp={kernelName:$s,backendName:"webgpu",kernelFunc:xm};g();var Cm=_({opType:N.SUB,cpuKernelImpl:Ga,supportsComplex:!0}),Op={kernelName:"Sub",backendName:"webgpu",kernelFunc:Cm};g();var ym=z({opType:v.TAN}),Vp={kernelName:"Tan",backendName:"webgpu",kernelFunc:ym};g();var Sm=z({opType:v.TANH}),Gp={kernelName:As,backendName:"webgpu",kernelFunc:Sm};g();function wm(r){let{inputs:t,backend:e,attrs:i}=r,{tensor:o,indices:s,updates:a}=t,{}=i,{sliceRank:n,numUpdates:u,sliceSize:p,strides:d,outputSize:l}=w.calculateShapes(a,s,o.shape),c=[l/p,p];if(l===0)return e.makeTensorInfo(o.shape,s.dtype);let h=[],m=D({inputs:{x:s},backend:e,attrs:{shape:[u,n]}});h.push(m);let f=D({inputs:{x:a},backend:e,attrs:{shape:[u,p]}});h.push(f);let C=D({inputs:{x:o},backend:e,attrs:{shape:c}});h.push(C);let I=He({inputs:{x:C},backend:e,attrs:{reps:Array(c.length).fill(1)}}),k=new ue([u,p],n,m.shape.length,f.shape.length,d,c,o.dtype,!1),R=x.sizeFromShape([u,p]),P=[{type:"int32",data:[n]},{type:"int32",data:d},{type:"int32",data:[R]}],$=e.runWebGPUProgram(k,[f,m],C.dtype,P,I);h.push($);let A=D({inputs:{x:$},backend:e,attrs:{shape:o.shape}});return h.forEach(F=>e.disposeData(F.dataId)),A}var Hp={kernelName:us,backendName:"webgpu",kernelFunc:wm};g();var wo=class{constructor(t){this.variableNames=["x","indices"],this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=`inputSize : i32, firstPass : i32, negativeInf : f32,
        dir : i32, inc : i32,`,this.shaderKey="swap"}getUserCode(){return`
        ${y("index")} {
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
      `}},bo=class{constructor(t){this.variableNames=["x","indices"],this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms="inputSize : i32, firstPass : i32, k : i32,",this.shaderKey="merge"}getUserCode(){return`
        ${y("index")} {
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
      `}};function Ae(r,t){t!==null&&r.disposeData(t.dataId)}function Kp(r){let t=1;for(;t<r;)t*=2;return t}function bm(r){let{inputs:t,backend:e,attrs:i}=r,{x:o}=t,{k:s,sorted:a}=i,n=o.shape,u=n[n.length-1];if(e.shouldExecuteOnCPU([o])){let $=e.readSync(o.dataId),[A,F]=Ka($,n,o.dtype,s,a);return[e.makeTensorInfo(A.shape,A.dtype,A.values),e.makeTensorInfo(F.shape,F.dtype,F.values)]}if(s===0)return n[n.length-1]=0,[e.makeTensorInfo(n,o.dtype,[]),e.makeTensorInfo(n,"int32",[])];if(u===1)return[o,W({attrs:{shape:n,dtype:"int32",value:0},backend:e})];let d=x.sizeFromShape(n)/u,l=D({inputs:{x:o},attrs:{shape:[d,u]},backend:e}),c=Kp(s),h=Kp(u),m=null,f=()=>m===null?[l,l]:[l,m],C=($,A,F)=>{let B=f(),T=new wo(F),G=[{type:"int32",data:[u]},{type:"int32",data:[m===null?1:0]},{type:"float32",data:[Number.NEGATIVE_INFINITY]},{type:"int32",data:[$]},{type:"int32",data:[A]}],Y=m;m=e.runWebGPUProgram(T,B,"int32",G),Ae(e,Y)};for(let $=1;$<c;$*=2){let A=$*2;for(let F=$;F>=1;F/=2)C(A,F,[d,h])}for(let $=h;$>c;$/=2){let A=f(),F=new bo([d,$/2]),T=[{type:"int32",data:[u]},{type:"int32",data:[m===null?1:0]},{type:"int32",data:[c]}],V=m;m=e.runWebGPUProgram(F,A,"int32",T),Ae(e,V);let G=c/2,Y=G*2;for(let H=G;H>=1;H/=2)C(Y,H,m.shape)}let I=m;m=se({inputs:{x:m},backend:e,attrs:{begin:0,size:[d,s]}}),Ae(e,I);let k=Wo({inputs:{x:l,indices:m},backend:e,attrs:{axis:1,batchDims:1}});Ae(e,l);let R=n.slice(0,-1);R.push(s),I=m,m=D({inputs:{x:m},attrs:{shape:R},backend:e}),Ae(e,I);let P=k;return k=D({inputs:{x:k},attrs:{shape:R},backend:e}),Ae(e,P),[k,m]}var Xp={kernelName:Ls,backendName:"webgpu",kernelFunc:bm};g();var vo=class{constructor(t){this.variableNames=["Image","Transforms"],this.uniforms="interpolationModeId : i32, fillModeId : i32, fillValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=b(this.outputShape),this.dispatch=S(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="transform"}getUserCode(){return`
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

          ${y("index")} {
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
        `}};function vm(r){let{inputs:t,backend:e,attrs:i}=r,{image:o,transforms:s}=t,{interpolation:a,fillMode:n,fillValue:u,outputShape:p}=i,[d,l,c,h]=o.shape,[m,f]=p??[l,c],C=[d,m,f,h],I=new vo(C),k=a==="nearest"?1:2,R;switch(n){case"constant":R=1;break;case"reflect":R=2;break;case"wrap":R=3;break;case"nearest":R=4;break;default:R=1;break}let P=[{type:"int32",data:[k]},{type:"int32",data:[R]},{type:"float32",data:[u]}];return e.runWebGPUProgram(I,[o,s],"float32",P)}var qp={kernelName:Ts,backendName:"webgpu",kernelFunc:vm};g();function Im(r){let{inputs:t,backend:e,attrs:i}=r,{value:o}=t,{axis:s}=i;s<0&&(s+=o.shape.length);let a=o,n=a.shape.length,u=o.shape[s],p=new Array(n-1),d=0;for(let f=0;f<n;f++)f!==s&&(p[d++]=a.shape[f]);let l=[],c=new Array(n).fill(0),h=a.shape.slice();h[s]=1;let m=new Array(u);for(let f=0;f<m.length;f++){c[s]=f;let C=se({inputs:{x:a},backend:e,attrs:{begin:c,size:h}}),I=D({inputs:{x:C},backend:e,attrs:{shape:p}});m[f]=I,l.push(C)}return l.forEach(f=>e.disposeData(f.dataId)),m}var Yp={kernelName:Bs,backendName:"webgpu",kernelFunc:Im};g();var Io=class{constructor(t,e,i){if(this.outputShape=[],this.variableNames=["x","segmentIds"],this.uniforms="numSegments : i32, xSize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=e,this.dispatchLayout=b(t),this.dispatch=S(this.dispatchLayout,t,this.workgroupSize),i!=="float32"&&i!=="int32")throw new Error(`UnsortedSegmentSum only supports float32 and int32
              types, does not support ${i} type.`);this.type=i,this.shaderKey="unsortedSegmentSum"}getUserCode(){return`
    ${y("index")} {
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
  `}};function km(r){let{inputs:t,backend:e,attrs:i}=r,{x:o,segmentIds:s}=t,{numSegments:a}=i,n=o.shape.length,u=[],p=0,d=w.getAxesPermutation([p],n),l=o;d!=null&&(l=X({inputs:{x:o},backend:e,attrs:{perm:d}}),u.push(l),p=w.getInnerMostAxes(1,n)[0]);let c=w.segment_util.computeOutShape(l.shape,p,a),h=x.sizeFromShape([l.shape[p]]),m=D({inputs:{x:l},backend:e,attrs:{shape:[-1,h]}});u.push(m);let f=o.dtype,C=[m.shape[0],a],I=W({backend:e,attrs:{shape:C,value:0,dtype:f}}),k=new Io(m.shape,C,f),R=[{type:"int32",data:[a]},{type:"int32",data:[x.sizeFromShape(m.shape)]}],P=e.runWebGPUProgram(k,[m,s],f,R,I),$=D({inputs:{x:P},backend:e,attrs:{shape:c}});u.push(P);let A=$;if(d!=null){u.push($);let F=w.getUndoAxesPermutation(d);A=X({inputs:{x:A},backend:e,attrs:{perm:F}})}return u.forEach(F=>e.disposeData(F.dataId)),A}var jp={kernelName:Es,backendName:"webgpu",kernelFunc:km};var Rm=[la,qa,Ya,ja,Qa,Za,en,tn,on,rn,sn,an,nn,un,pn,cn,hn,mn,fn,gn,Cn,yn,Sn,In,kn,Rn,ha,Pn,Nn,zn,An,Fn,Ln,Tn,_n,Bn,En,Un,On,Vn,Gn,Hn,Xn,qn,Kn,Yn,jn,Qn,Zn,Jn,ou,ru,iu,su,au,nu,uu,pu,du,pa,lu,mu,cu,hu,fu,gu,xu,Cu,yu,Su,wu,ca,bu,$n,vu,Iu,ku,Ru,Du,Pu,$u,zu,Nu,Au,Fu,Lu,_u,Bu,dn,Eu,Uu,Ou,Wu,Mu,Vu,ln,Gu,Hu,Ku,Xu,Yu,eu,ju,Qu,Zu,wn,Ju,op,rp,ip,sp,ap,np,up,bn,pp,dp,lp,cp,da,hp,mp,fp,gp,xp,Cp,yp,Sp,wp,bp,vp,Ip,kp,Rp,Dp,Pp,xn,Up,Wp,Mp,qu,$p,Np,zp,Ap,Lp,Tp,_p,Bp,Ep,Op,tu,Vp,Gp,Hp,Fp,Xp,qp,Ja,Yp,jp,ep];for(let r of Rm)Ks(r);export{Po as WebGPUBackend,Do as webgpu_util};
//# sourceMappingURL=dist-RVRXAMXU.js.map

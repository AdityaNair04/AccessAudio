import"./chunk-YEX4KB3F.js";var p=function(n=""){if(!document.getElementById("SgnwFontCss")){let o=document.createElement("style");o.setAttribute("id","SgnwFontCss"),o.appendChild(document.createTextNode(`
  @font-face {
    font-family: "SuttonSignWritingLine";
    src: 
      local('SuttonSignWritingLine'),
      ${n?`url('${n}SuttonSignWritingLine.ttf') format('truetype'),`:""}
      url('https://cdn.jsdelivr.net/npm/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingLine.ttf') format('truetype');
  }
  @font-face {
    font-family: "SuttonSignWritingFill";
    src: 
      local('SuttonSignWritingFill'),
      ${n?`url('${n}SuttonSignWritingFill.ttf') format('truetype'),`:""}
      url('https://cdn.jsdelivr.net/npm/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingFill.ttf') format('truetype');
  }
  @font-face {
    font-family: "SuttonSignWritingOneD";
    src: 
      local('SuttonSignWritingOneD'),
      ${n?`url('${n}SuttonSignWritingOneD.ttf') format('truetype'),`:""}
      url('https://cdn.jsdelivr.net/npm/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingOneD.ttf') format('truetype');
  }
    `)),document.head.appendChild(o)}},c={};var a,u=function(n){if(n in c)return[...c[n]];if(!a){let f=document.createElement("canvas");f.width=152,f.height=152,a=f.getContext("2d",{willReadFrequently:!0})}a.clearRect(0,0,152,152),a.font="60px 'SuttonSignWritingLine'",a.fillText(String.fromCodePoint(n+983040),0,0);let o=a.getImageData(0,0,152,152).data,t,i,s,l;n:for(t=151;t>=0;t--)for(i=0;i<152;i+=1)for(l=0;l<4;l+=1)if(s=4*t+4*i*152+l,o[s])break n;var e=t;n:for(i=151;i>=0;i--)for(t=0;t<e;t+=1)for(l=0;l<4;l+=1)if(s=4*t+4*i*152+l,o[s])break n;var r=i+1;if(e=Math.ceil(e/2),r=Math.ceil(r/2),n==14394&&(e=19),[10468,10480,10496,10512,10500,10532,10548,10862,10878,10894,11058,11074,11476,11488,11492,11504,11508,11520,10516,10910,10926,11042,11082,10942].includes(n)&&(e=20),n==31921&&(e=22),n==38460&&(e=23),[20164,20212].includes(n)&&(e=25),n==31894&&(e=28),n==46698&&(e=29),n==29606&&(e=30),n==44855&&(e=40),n==32667&&(e=50),[11088,11474,11490,11506].includes(n)&&(r=20),n==6285&&(r=21),n==40804&&(r=31),n==41475&&(r=36),e==0&&r==0){let f={9:[15,30],10:[21,30],11:[30,15],12:[30,21],13:[15,30],14:[21,30]};n in f&&(e=f[n][0],r=f[n][1])}return e!=0||r!=0?(c[n]=[e,r],[e,r]):void 0},d=function(n){return String.fromCodePoint(n+983040)},g=function(n){return String.fromCodePoint(n+1048576)},y=function(n){return`    <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">${g(n)}</text>
    <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">${d(n)}</text>`},v=function(n){let o=!1,t=!1;S(()=>{o=!0}),m(()=>{t=!0});let i=setInterval(function(){o&&t&&(clearInterval(i),n())},100)},S=function(n){if(u(1))n();else{let o=setInterval(function(){u(1)&&(clearInterval(o),n())},100)}},m=function(n){let o=function(){let t=document.createElement("canvas");t.width=15,t.height=30;let i=t.getContext("2d");return i.font="30px 'SuttonSignWritingFill'",i.fillText(g(1),0,0),!i.getImageData(0,0,15,30).data.every(s=>s===0)};if(o())n();else{let t=setInterval(function(){o()&&(clearInterval(t),n())},100)}};export{p as cssAppend,v as cssLoaded,m as cssLoadedFill,S as cssLoadedLine,g as symbolFill,d as symbolLine,u as symbolSize,y as symbolText};
//# sourceMappingURL=font.min-X5ZO5AYO.js.map

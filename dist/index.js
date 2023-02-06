"use strict";(()=>{var v=new Map([["tiny","(max-width: 479px)"],["small","(max-width: 767px)"],["medium","(max-width: 991px)"],["main","(min-width: 992px)"]]);var d=()=>{for(let[t,o]of v)if(window.matchMedia(o).matches)return t;return"main"};var E=(t,o)=>{o==="play"?t.play():o==="pause"&&t.pause()};var f=t=>{[...document.querySelectorAll("video")].forEach(s=>{E(s,t)})};var h=()=>{t(),o(),s();function t(){gsap.registerPlugin(ScrollTrigger),ScrollTrigger.defaults({markers:!1})}function o(){let e=document.querySelector(".nav_component").querySelector("form");e.querySelector(".button").addEventListener("click",()=>{e.requestSubmit()})}function s(){let r=[...document.querySelectorAll(".video_embed")];d()==="main"&&r.forEach(e=>{let n=e.querySelector("video");e.addEventListener("mouseover",()=>{f("pause"),n.play()}),e.addEventListener("mouseout",()=>{f("play")})})}};var g=()=>{};var x=()=>{};var w=t=>{let o=0;if(t.offsetParent)do o+=t.offsetTop,t=t.offsetParent;while(t);return o};var u=t=>{let{scrub:o}=t.timeline;t.timeline.scrub=o||1;let s=gsap.timeline({scrollTrigger:t.timeline}),{duration:r}=t.options;t.options.duration=r||1,s.to(t.timeline.target,t.options)};var y=()=>{t(),o(),s();function t(){let e=document.querySelector(".hero").querySelector(".horizontal_track"),n=e.querySelector(".horizontal_sticky"),c=n.querySelector(".horizontal_list"),i=`${w(e)}px`;n.style.top=i;let m=`${w(e)+n.offsetHeight}px`,l=c.offsetWidth,a=window.innerWidth;e.style.height=`${l-a}px`,u({timeline:{trigger:e,target:c,start:`top ${i}`,end:`bottom ${m}`},options:{x:function(){return(l-a)*-1}}})}function o(){[...document.querySelectorAll(".story_text")].forEach(e=>{new IntersectionObserver((n,c)=>{n.forEach(i=>{i.isIntersecting&&i.target.classList.add("is-active")})},{rootMargin:"0px 0px -45% 0px",threshold:.5}).observe(e)})}function s(){let e=document.querySelector(".process_wrapper").querySelector(".horizontal_track"),n=e.querySelector(".horizontal_sticky"),c=n.querySelector(".horizontal_list"),i=window.innerHeight,m=c.offsetHeight,l=`${i/2-m/2}px`,a=`${i/2+m/2}px`;n.style.top=l;let p=c.offsetWidth,L=window.innerWidth;e.style.height=`${p-L}px`,u({timeline:{trigger:e,target:c,start:`top ${l}`,end:`bottom ${a}`},options:{x:function(){return(p-L)*-1}}})}};var k=()=>{t(),o();function t(){let s=document.querySelector(".home-hero_track"),r=s.querySelector(".home-hero_video"),e=r.getBoundingClientRect(),n=window.innerHeight-e.bottom;u({timeline:{trigger:s,target:r,start:"top top",end:"bottom bottom"},options:{y:n,width:"100vw",height:"100vh"}})}function o(){let s=document.querySelector(".featured-meta_wrapper");if(!s)return;let r=[...s.querySelectorAll(".featured-meta_link")],e=[...document.querySelectorAll(".featured-work_item")],n=r[0].offsetLeft,c=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.forEach((i,m)=>{let l=r[m];i.addEventListener("mouseover",()=>{let a=l.offsetLeft;r.forEach(p=>{p.style.opacity=p===l?"1":"0.1"}),s.scrollTo({left:a-n,behavior:c?"auto":"smooth"})}),i.addEventListener("mouseout",()=>{r.forEach(a=>{a.style.opacity="1"})})})}};var T=()=>{};var b=()=>{};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{let{pathname:t}=window.location;switch(h(),t){case"/blog":g();break;case"/careers":x();break;case"/culture":y();break;case"/":k();break;case"/work":T();break;case t.includes("/work/"):b();break}});})();

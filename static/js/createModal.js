"use strict";var body=document.querySelector("body"),modalBtn=document.getElementById("modalBtn"),modalContainer=document.querySelector(".modalContainer"),modalWrapper=document.querySelector(".modalWrapper"),modal=document.querySelector(".modal"),openModal=function(){modalContainer.style.transform="translateY(0)",modalWrapper.style.top=window.scrollY+"px",body.style.overflowY="hidden"},closeModal=function(o){o.target!==modalContainer&&o.target!==modalWrapper||(modalContainer.style.transform="translateY(-100%)",modalWrapper.style.top=0,body.style.overflowY="scroll")},init=function(){modalBtn.addEventListener("click",openModal),modalContainer.addEventListener("click",closeModal)};modalBtn&&init();
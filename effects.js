const card=document.getElementById("landing");

document.addEventListener("mousemove",(e)=>{

    const x=(window.innerWidth/2-e.clientX)/25;

    const y=(window.innerHeight/2-e.clientY)/25;

    card.style.transform=
    `translate(-50%,-50%) rotateX(${y}deg) rotateY(${-x}deg)`;

});

document.addEventListener("mouseleave",()=>{

    card.style.transform=
    "translate(-50%,-50%)";

});
console.log("Background Loaded");

/* Shooting Stars */
function createShootingStar(){

    const star=document.createElement("div");

    star.className="shooting-star";

    star.style.top=Math.random()*40+"%";

    star.style.left=(70+Math.random()*30)+"%";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2200);

}

setInterval(createShootingStar,3500);
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

/* Aurora Glow — soft shifting color wash behind everything */
const auroraGlow = document.createElement("div");
auroraGlow.className = "aurora-glow";
document.body.appendChild(auroraGlow);


/* Drifting Particles — slow glowing dots floating upward */
function createParticle(){

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration = (8 + Math.random() * 6) + "s";

    particle.style.width = particle.style.height = (3 + Math.random() * 4) + "px";

    document.body.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 14000);

}

setInterval(createParticle, 600);


/* Cursor Heart Trail */
let lastHeartTime = 0;

document.addEventListener("mousemove", (e) => {

    const now = Date.now();

    if (now - lastHeartTime < 120) return; // throttle so it's not overwhelming

    lastHeartTime = now;

    const heart = document.createElement("div");

    heart.className = "cursor-heart";

    heart.innerHTML = "💗";

    heart.style.left = e.clientX + "px";

    heart.style.top = e.clientY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 900);

});


/* Ripple on Click/Tap */
document.addEventListener("click", (e) => {

    const ripple = document.createElement("div");

    ripple.className = "ripple";

    ripple.style.left = e.clientX + "px";

    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 700);

});

// FRIENDSHIP DAY PROJECT
// FINAL BASE SCRIPT

// AUDIO
const bgMusic = new Audio("assets/audio/bg-music.mp3");

const clickSound = new Audio("assets/audio/click.mp3");

const giftOpenSound = new Audio("assets/audio/gift-open.mp3");

bgMusic.loop = true;

bgMusic.volume = 0.35;

clickSound.volume = 0.7;

giftOpenSound.volume = 0.9;

// Helper to safely play sound effects anytime
function playSound(sound) {
    sound.currentTime = 0; // Rewind to start in case clicked quickly
    sound.play().catch(err => console.log("Sound play error:", err));
}

// Automatically start background music on the user's VERY FIRST tap/click
const startBgMusic = () => {
    bgMusic.play().then(() => {
        // Success! Remove listener so it doesn't keep trying on every click
        document.removeEventListener("click", startBgMusic);
        document.removeEventListener("touchstart", startBgMusic);
    }).catch(err => {
        console.log("Autoplay blocked waiting for user action:", err);
    });
};

// Listen for first interaction
document.addEventListener("click", startBgMusic);
document.addEventListener("touchstart", startBgMusic);  

// Elements 
const landing = document.getElementById("landing");
const giftScreen = document.getElementById("giftScreen");
const messageScreen = document.getElementById("messageScreen");

const nameInput = document.getElementById("nameInput");
const surpriseBtn = document.getElementById("surpriseBtn");
Anim.pulseGlow(surpriseBtn);
Anim.pressScale(surpriseBtn);

const giftBox = document.querySelector(".giftBox");
const giftLid = document.querySelector(".lid");
Anim.giftWiggle(giftBox, { loop: true });

const wishText = document.getElementById("wishText");
const shareBtn = document.getElementById("shareBtn");
Anim.pressScale(shareBtn);

const cursorGlow = document.getElementById("cursorGlow");
const stars = document.getElementById("stars");

// CURSOR GLOW
document.addEventListener("mousemove", (e) => {

    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";

});

// CREATE STARS
for (let i = 0; i < 180; i++) {

    const star = document.createElement("div");

    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.opacity = Math.random();

    star.style.animationDelay = Math.random() * 3 + "s";

    stars.appendChild(star);

}

// OPEN SURPRISE
surpriseBtn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    bgMusic.play().catch(() => {});
    const name = nameInput.value.trim();

    if (name === "") {
        
        nameInput.classList.add("shake");
        setTimeout(() => nameInput.classList.remove("shake"), 400);
        alert("Hihi Princesa Chan type your name :)");
        return;

    }

    landing.style.display = "none";

    giftScreen.style.display = "flex";

    giftScreen.classList.add("shatter-in");

    Anim.floatHeart(giftScreen, { count: 8 });

});

// OPEN GIFT
giftBox.addEventListener("click", () => {
    giftOpenSound.currentTime = 0;
    giftOpenSound.play();

    giftLid.classList.add("lid-shake");

    const name = nameInput.value.trim();

    setTimeout(() => {
        giftLid.classList.remove("lid-shake");
        giftLid.style.transform = "translateY(-55px) rotate(-10deg)";
    }, 300);
});

    setTimeout(() => {

        giftScreen.style.display = "none";

        messageScreen.style.display = "flex";
        messageScreen.classList.add("shatter-in");
        bgMusic.volume = 0.15;
        messageScreen.classList.add("zoomIn");
        Anim.blurReveal(wishText, { duration: 900 });

        typeMessage(`Happy Friendship Day ${name} :)`);

        launchConfetti();

    }, 700);

});

// TYPING EFFECT
function typeMessage(text) {

    wishText.innerHTML = "";

    const cursor = Anim.addTypingCursor(wishText);

    let i = 0;

    const typing = setInterval(() => {

        cursor.insertAdjacentText("beforebegin", text.charAt(i));

        i++;

        if (i >= text.length) {

            clearInterval(typing);

            setTimeout(() => cursor.remove(), 1500); // cursor blinks a bit then disappears

        }

    }, 70);

}

// CONFETTI
function launchConfetti() {

    confetti({

        particleCount: 180,

        spread: 120,

        origin: {

            y: 0.6

        }

    });

}

// INSTAGRAM PROFILE BUTTON
shareBtn.addEventListener("click", () => {
    const instagramUrl = "https://www.instagram.com/chvxra_lx?igsh=MWE5NHE3bzFvems0bg==";
    window.open(instagramUrl, "_blank");
});

// SHOOTING STARS
function createShootingStar(){

    const star=document.createElement("div");

    star.className="shootingStar";

    star.style.left=(70+Math.random()*30)+"%";

    star.style.top=Math.random()*40+"%";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2000);

}

setInterval(createShootingStar,3500);

// FLASH LAYER
const flash=document.createElement("div");

flash.className="flash";

document.body.appendChild(flash);

// HEART BURST
function launchHearts(){

    for(let i=0;i<45;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤️";

        heart.style.left=(45+Math.random()*10)+"%";

        heart.style.bottom="45%";

        heart.style.setProperty("--x",(Math.random()*240-120)+"px");

        heart.style.animationDelay=(Math.random()*.3)+"s";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },3000);

    }

}

setTimeout(()=>{

    flash.classList.remove("active");

},400);

// FIREWORKS
function launchFireworks(){

    const colors=[
        "#ff4d6d",
        "#ffd43b",
        "#4dabf7",
        "#69db7c",
        "#b197fc",
        "#ffffff"
    ];

    for(let i=0;i<70;i++){

        const p=document.createElement("div");

        p.className="firework";

        p.style.background=
        colors[Math.floor(Math.random()*colors.length)];

        p.style.left="50%";

        p.style.top="45%";

        const angle=Math.random()*360;

        const distance=80+Math.random()*180;

        const x=Math.cos(angle*Math.PI/180)*distance;

        const y=Math.sin(angle*Math.PI/180)*distance;

        p.style.setProperty("--x",x+"px");
        p.style.setProperty("--y",y+"px");

        document.body.appendChild(p);

        setTimeout(()=>{

            p.remove();

        },1000);

    }

}

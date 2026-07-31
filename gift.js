const gift = document.querySelector(".gift-box");
const lid = document.querySelector(".gift-lid");

gift.addEventListener("mouseenter",()=>{

    gift.animate(

        [

            {transform:"rotate(-2deg)"},

            {transform:"rotate(2deg)"},

            {transform:"rotate(-2deg)"}

        ],

        {

            duration:300,

            iterations:2

        }

    );

});
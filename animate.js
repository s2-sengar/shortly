const heroImg=document.querySelector('.hero__img');
const animImg=bodymovin.loadAnimation({
    wrapper:heroImg,
    animType:'svg',
    loop:true,
    autoplay:true,
    path:'./css/lottie-img/hero.json'
});
animImg.setSpeed(.4); 
const heroImg=document.querySelector('.hero__img');
const loader=document.querySelector('.loader');

const animImg=bodymovin.loadAnimation({
    wrapper:heroImg,
    animType:'svg',
    loop:true,
    autoplay:true,
    path:'./css/lottie-img/hero.json'
});
animImg.setSpeed(.8);

const animLoad=bodymovin.loadAnimation({
    wrapper:loader,
    animType:'svg',
    loop:true,
    autoplay:true,
    path:'./css/lottie-img/loader.json'
});

loader.style.display='none';

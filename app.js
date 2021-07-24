const btnShort=document.querySelector('.btn--short');
const input=document.querySelector('.link-shorten__input');
const output=document.querySelector('.link-shorten__output');
const inputLink=document.querySelector('.link-shorten__input-link');
const outputLink=document.querySelector('.link-shorten__output-link');

var shrtLink;

async function getShortenURL(url){
    try{
        const res= await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data= await res.json();
        return data;
    }
    catch(error){
        console.log(error);
        // do something to handle error
    }
}

// ##TODO
const copyToClip = ()=>{
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(outputLink.innerHTML);
        range.select().createTextRange();
        document.execCommand("copy");
    }else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(outputLink.innerHTML);
        window.getSelection().addRange(range);
        document.execCommand("copy");
        alert("Text has been copied, now paste in the text-area")
    }
};


const updateUI = (link) =>{
    if(input.value.length>15){
        // do something
    }
    output.classList.remove('hidden');
    loader.style.display='none';
    inputLink.innerHTML=input.value;
    outputLink.innerHTML=link;
}

outputLink.addEventListener('click',copyToClip);

btnShort.addEventListener('click',()=>{
    if(input.value){
        loader.style.display='flex';
        getShortenURL(input.value).then(res=>{
            shrtLink=res;
            updateUI(shrtLink.result.full_short_link);
            console.log(shrtLink);
            // console.log(shrtLink.result.full_short_link);
        });
    }else{
        //TODO error handling;
        console.log('fill');
    }
});
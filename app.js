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


const copyToClip = ()=>{
    let copyOpBox=document.createElement('INPUT');
    copyOpBox.setAttribute('type', 'text');
    document.body.appendChild(copyOpBox);
    copyOpBox.value=outputLink.innerHTML;
    copyOpBox.select();
    copyOpBox.setSelectionRange(0,99999);
    document.execCommand('copy');
    copyOpBox.remove();
};


const updateUI = (link) =>{
    inputLink.innerHTML=input.value;
    outputLink.innerHTML=link;
    if(input.value.length>35){
        inputLink.innerHTML=inputLink.innerHTML.substring(0, 35)+'...';
    }
    output.classList.remove('hidden');
    loader.style.display='none';
}

outputLink.addEventListener('click',copyToClip);

btnShort.addEventListener('click',()=>{
    if(input.value){
        loader.style.display='flex';
        getShortenURL(input.value).then(res=>{
            shrtLink=res;
            updateUI(shrtLink.result.full_short_link);
            console.log(shrtLink);

        });
    }else{
        //TODO error handling;
        console.log('fill');
    }
});
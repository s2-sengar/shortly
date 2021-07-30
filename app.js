const btnShort=document.querySelector('.btn--short');
const input=document.querySelector('.link-shorten__input');
const output=document.querySelector('.link-shorten__output');
const inputLink=document.querySelector('.link-shorten__input-link');
const outputLink=document.querySelector('.link-shorten__output-link');
const btnCopy=document.querySelector('.link-shorten--btn');
const clipboard=document.querySelector('.clipboard-copied');

var shrtLink;

/**
 * 
 * @param {string} url 
 * @returns shortenUrlData as obj
 */
async function getShortenURL(url){
    try{
        const res= await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data= await res.json();
        return data;
    }
    catch(error){
        errorUI();
    }
}
/**
 * Copy shorten URL to clip;
 */
const copyToClip = ()=>{
    let copyOpBox=document.createElement('INPUT');
    copyOpBox.setAttribute('type', 'text');
    document.body.appendChild(copyOpBox);
    copyOpBox.value=outputLink.innerHTML;
    copyOpBox.select();
    copyOpBox.setSelectionRange(0,99999);
    document.execCommand('copy');
    copyOpBox.remove();
    clipboardUI();
};

/**
 * notify that url is copied to clip
 */
const clipboardUI=()=>{
    clipboard.classList.remove('hidden');
    /**
     * pop-up time-out of 1.5sec
     */
    setTimeout(()=>{
        clipboard.classList.add('hidden');
    },1500);
}

/**
 * 
 * @param {string} link //shortned-link 
 */
const updateUI = (link) =>{
    inputLink.innerHTML=input.value;
    outputLink.innerHTML=link;
    if(input.value.length>35){
        inputLink.innerHTML=inputLink.innerHTML.substring(0, 35)+'...';
    }
    output.classList.remove('hidden');
    loader.style.display='none';
}

/**
 * change ui in case of error
 */
const errorUI=()=>{
    btnCopy.style.display='none'
    loader.style.display='none';
    output.classList.remove('hidden');
    inputLink.innerHTML='Error:Try Again';
    outputLink.classList.add('hidden');
    output.style.backgroundColor='rgba(244, 98, 98, 0.712)';

}

/**
 * reset ui
 */
const refreshUI=()=>{
    output.classList.add('hidden');
    outputLink.classList.remove('hidden');
    btnCopy.classList.remove('hidden');
    output.style.backgroundColor='#CEFAED';
}

/**
 * start event listners
 */
outputLink.addEventListener('click',copyToClip);

btnShort.addEventListener('click',()=>{
    refreshUI();
    if(input.value){
        loader.style.display='flex';
        /**
         * save input and output link to session storage
         */
        sessionStorage.setItem('input-link',input.value);
        getShortenURL(input.value).then(res=>{
            shrtLink=res;
            sessionStorage.setItem('output-link',shrtLink.result.full_short_link);
            updateUI(shrtLink.result.full_short_link);
        }).catch(error=>{
            errorUI();
        });
    }else{
        errorUI();
    }
});
/**
 * end event-listners
 */

/**
 * set input - output link to session storage links if avilable
 */
if(sessionStorage.getItem('output-link')){
    link=sessionStorage.getItem('output-link');
    input.value=sessionStorage.getItem('input-link');
    updateUI(link);
}
let shortenURL=[];





async function getShortenURL(url){
    try{
        const res= await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data= await res.json();
        return data;
    }
    catch(error){
        // do something to handle error
    }
}
getShortenURL('https://www.w3schools.com/js/js_json_intro.asp');
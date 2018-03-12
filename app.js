

$(document).ready(function () {
    $(".button-collapse").sideNav();
})

const cardigansURL = `https://openapi.etsy.com/v2/listings/active?keywords=CARDIGAN%20KNIT%20WOMAN&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
const dressesURL = `https://openapi.etsy.com/v2/listings/active?keywords=dress%20for%20women&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
const blousesULR = `https://openapi.etsy.com/v2/listings/active?keywords=blouse&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
const underwaerURL = `https://openapi.etsy.com/v2/listings/active?keywords=bralette&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
const tShirtsURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=womens%20graphic%20tees&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
const pantsURL = `https://openapi.etsy.com/v2/listings/active?keywords=WOMANS+JEANS&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`

//función para pintar poducto

function handleResponse(data) {
    let template = ' ';
    let container = document.getElementById('container');
    console.log(container);
    let results = data.results;
    results.forEach(product => {
      let price = product.price;
      console.log(price);
     template += `<div>precio:${price}</div>`
     
    })   
    container.innerHTML=template;
}

//petición api etsy
const peticionEtsy = () => {
    const url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=womens%20graphic%20tees&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
    fetch(url)
        .then(response => response.json()).then(json => handleResponse(json));


}

peticionEtsy();

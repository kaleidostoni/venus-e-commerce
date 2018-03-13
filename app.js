

$(document).ready(function () {
    $(".button-collapse").sideNav();
})

// const cardigansURL = `https://openapi.etsy.com/v2/listings/active?keywords=cardigan%20knit%20woman&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const dressesURL = `https://openapi.etsy.com/v2/listings/active?keywords=dress%20for%20women&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const blousesULR = `https://openapi.etsy.com/v2/listings/active?keywords=blouse&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const underwaerURL = `https://openapi.etsy.com/v2/listings/active?keywords=bralette&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const tShirtsURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=womens%20graphic%20tees&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const pantsURL = `https://openapi.etsy.com/v2/listings/active?keywords=womans+jeans&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`

const placingTemplate = ((template, e) => {
    console.log(e.target);
    console.log(e.target.dataset.category);
    let container = document.getElementById('container');
    // console.log(container);
    let divContainers = container.getElementsByTagName('div');
    let divArray = Array.from(divContainers);
    console.log(divArray);
    divArray.forEach(container => {
        if (container.id === e.target.dataset.category) {
            console.log(container.id);
            container.innerHTML= template;
        }
    })

})

const paintingData = ((response, e) => {
    let template = ' ';
    response.forEach(product => {
        let price = product.price;
        // console.log(price);
        let tag = product.tags[0];
        // console.log(tag);
        let photo = product.Images[0].url_570xN;
        // console.log(photo);
        template += `  <div class="row">
<div class="col s12 m3">
  <div class="card">
    <div class="card-image">
      <img src="${photo}">
      <span class="card-title">${price}</span>
      <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
    </div>
    <div class="card-content">
      <p>${tag}</p>
    </div>
  </div>
</div>
</div>`
    })
    placingTemplate(template, e);
})

// //guardando data
const handleResponse = ((response, e) => {
    // console.log(response)
    let results = response.results;
    // console.log(results[0])
    paintingData(results, e);
})

//evento a las pestañas del menu de productos
const requestProducts = (e => {
    e.preventDefault();
    // console.log(e);
    let requestCategory = e.target.dataset.menu;
    // console.log(requestCategory);

    let url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=${requestCategory}&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
    // // const url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=womens%20graphic%20tees&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
    // console.log(url);
    fetch(url)
        .then(response => response.json()).then(json => handleResponse(json, e));

})

//añadiendo evento a los elementos li 
const eventMenu = (menu => {
    menu.forEach(item => {
        item.addEventListener('click', requestProducts);
    })
})

//llamando los elementos li del menu
const tabList = () => {
    let menu = document.getElementsByClassName('tab');
    let menuArray = Array.from(menu);
    // console.log(menuArray);
    eventMenu(menuArray);
}
tabList();





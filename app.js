const cartArray = [];

$(document).ready(function () {
  $(".button-collapse").sideNav();
  $('#modal1').modal();
  $('.carousel.carousel-slider').carousel({fullWidth: true});

})

// const cardigansURL = `https://openapi.etsy.com/v2/listings/active?keywords=cardigan%20knit%20woman&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const dressesURL = `https://openapi.etsy.com/v2/listings/active?keywords=dress%20for%20women&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const blousesULR = `https://openapi.etsy.com/v2/listings/active?keywords=blouse&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const underwaerURL = `https://openapi.etsy.com/v2/listings/active?keywords=bralette&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const tShirtsURL = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=womens%20graphic%20tees&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
// const pantsURL = `https://openapi.etsy.com/v2/listings/active?keywords=womans+jeans&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`

const getProductDetails = () => {
  let tagData = event.target.dataset.tag;
  let photoData = event.target.dataset.photo;
  let priceData = event.target.dataset.price;
  let name = document.getElementById('name');
  let price = document.getElementById('price');
  let photo = document.getElementById('photo');
  name.innerText = tagData;
  price.innerText = `${priceData} USD`;
  photo.src = photoData;
}

const placingTemplate = ((template, e) => {
  // console.log(e.target);
  // console.log(e.target.dataset.category);
  let container = document.getElementById('container');
  // console.log(container);
  let divContainers = container.getElementsByTagName('div');
  let divArray = Array.from(divContainers);
  // console.log(divArray);
  divArray.forEach(container => {
    if (container.id === e.target.dataset.category) {
      // console.log(container.id);
      container.innerHTML = template;
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
        let id = product.listing_id
        // console.log(id);
        template += `
<div class="col s12 m3">
  <div class="card">
    <div class="card-image">
      <img src="${photo}">
      <a class="btn-floating halfway-fab waves-effect waves-light black"><i class="material-icons add-cart" data-id='${id}' onclick="saveCartProducts()">add</i></a>
    </div>
    <div class="card-content">
      <h5>${tag}</h5>
      <a class="waves-effect waves-light btn modal-trigger pink" href="#modal1" data-id='${id}' data-tag='${tag}'data-photo='${photo}' data-price='${price}'onclick="getProductDetails()"><i class="material-icons">remove_red_eye</i></a>
      <span class="card-title price-card">${price} USD</span>
      </div>
  </div>
</div>
`
  })
  placingTemplate(template, e);
})

// //guardando data
const handleResponse = ((response, e) => {
  let results = response.results;
  localStorage.setItem('data', JSON.stringify(results))
  // console.log(results)
  paintingData(results, e);
})

//evento a las pestañas del menu de productos
const requestProducts = (e => {
  e.preventDefault();
  // console.log(e);
  let requestCategory = e.target.dataset.menu;
  // console.log(requestCategory);

  let url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=${requestCategory}&includes=Images:1&api_key=llkjywrb9bbj142bo4qbp1t5`
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


//función que almacena los productos seleccionados por el usuario
function saveCartProducts(){
  let productElement = parseInt(event.target.dataset.id);
  let selectedProduct = JSON.parse(localStorage.getItem('data')).find(product => {
    return product.listing_id === productElement;
  })
  let productData = {
    'name': selectedProduct.tags[0],
    'image': selectedProduct.Images[0].url_570xN,
    'price': selectedProduct.price
  }
  cartArray.push(productData)
  localStorage.setItem('cart-data', JSON.stringify(cartArray))
}

//función que pinta los datos en el carrito
document
  .querySelector('.dropdown-button')
  .addEventListener('click', function () {
    $('#cart-detail').empty();
    let productsArray = JSON.parse(localStorage.getItem('cart-data'))
      .forEach(product => {
        let template = ''
        template +=
          `<li>
        <div class='row'>
          <img class='col s3' src='${product.image}' alt=''>
          <div class='col s7'>
            <p>${product.name}</p>
            <p>Fecha estimada de entrega</p>
          </div>
          <div class='col s2'>
            <p>${product.price}</p>
          </div>
        </div>
      </li>`
      $('#cart-detail')
      .append(template);
    })
    getTotalCart()
  })

//función para obtener el total de los productos seleccionados
  function getTotalCart() {
    let totalCart = JSON.parse(localStorage.getItem('cart-data')).map(item => item.price)
      .reduce((prev, cur) => parseFloat(prev) + parseFloat(cur))
    $('.total-cart').text(totalCart)
    getPayPal(totalCart)
  }

//función para hacer el pago con paypal
  function getPayPal (totalPrice){
    $('#paypal-button-container').empty()
    paypal.Button.render({
              env: 'sandbox', // sandbox | production
              client: {
                sandbox:    'Aewf8tYWTalhPJNghUNrkbJKjalm-V29rMgPQJb5AzbXdrF-2GpArX30Cu07PdmGlRdaGqE1Uq0GcGbe',
                production: '<insert production client id>'
              },
              // Show the buyer a 'Pay Now' button in the checkout flow
              commit: true,
              // payment() is called when the button is clicked
              payment: function(data, actions) {
                  // Make a call to the REST api to create the payment
                  return actions.payment.create({
                      payment: {
                          transactions: [
                              {
                                  amount: { total: `${totalPrice}`, currency: 'USD' }
                              }
                          ]
                      }
                  });
              },
              // onAuthorize() is called when the buyer approves the payment
              onAuthorize: function(data, actions) {
                  // Make a call to the REST api to execute the payment
                  return actions.payment.execute().then(function() {
                      window.alert('Payment Complete!');
                  });
              }
          }, '#paypal-button-container');
      }



// funciones para routing
page('/t-shirts', e => {
})

page('/blouses', e => {

})

page('/dresses', e => {

})

page('/jeans', e => {

})

page('/cardigans', e => {

})

page('/home', e => {

})

page('/favorites', e => {

})

document
  .querySelector('.router-tshirts')
  .addEventListener('click', e => {
    e.preventDefault()
    page('/t-shirts')
  })

document
  .querySelector('.router-blouses')
  .addEventListener('click', e => {
    e.preventDefault()
    page('/blouses')
  })

document
  .querySelector('.router-dresses')
  .addEventListener('click', e => {
    e.preventDefault()
    page('/dresses')
  })

document
  .querySelector('.router-jeans')
  .addEventListener('click', e => {
    e.preventDefault()
    page('/jeans')
  })

document
  .querySelector('.router-cardigans')
  .addEventListener('click', e => {
    e.preventDefault()
    page('/cardigans')
  })

page.start({ hashbang: true })

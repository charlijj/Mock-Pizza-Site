
const deliveryOptionDelivery = document.getElementById(`orderOptionDelivery`);
const deliveryOptionPickup = document.getElementById(`orderOptionPickup`);
const pizzaTypeSelect = document.getElementById(`pizzaTypeSelect`);
const pizzaSizeSelect = document.getElementById(`pizzaSizeSelect`);
const addressInput  = document.getElementById(`address`);
const phoneInput = document.getElementById(`phone`);
const cityInput = document.getElementById(`city`);
const provinceInput = document.getElementById(`provinceSelect`);
const nameInput = document.getElementById(`name`);

const buildOrderConf = new Event(`build`);
document.addEventListener(`build`, function () {orderConfirmation();});



function submitOrder() {

    let error = false;

    if (deliveryOptionDelivery.checked)
    {
        localStorage.setItem(`deliveryOption`, `Delivery`);
    }

    if (deliveryOptionPickup.checked)
    {
        localStorage.setItem(`deliveryOption`, `Pick-up`);
    }

    localStorage.setItem(`pizzaType`, pizzaTypeSelect.value);
    localStorage.setItem(`pizzaSize`, pizzaSizeSelect.value);

    localStorage.setItem(`nameVal`, nameInput.value);
    localStorage.setItem(`addressVal`, addressInput.value);
    localStorage.setItem(`phoneVal`, phoneInput.value);
    localStorage.setItem(`cityVal`, cityInput.value);
    localStorage.setItem(`provinceVal`, provinceInput.value);
   
    provenceVal = provinceInput.value;

    if ((localStorage.getItem(`nameVal`)==``) || (localStorage.getItem(`addressVal`)==``) || (localStorage.getItem(`phoneVal`)==``) || (localStorage.getItem(`cityVal`)==``))
    {
        alert(`Delivery information can't be left blank`)
        error = true;
    }

    if (!error)
    {
        window.location.href = `orderConfirmation.html`; 
        calculatePrice();  
    }
   
}

function calculatePrice () {

    const taxRate = 0.14;
    let pizzaPrice;
    let costBT;
    let tax;
    let costAT;
    let deliveryCost = 0;
    let deliveryOption = localStorage.getItem(`deliveryOption`);
    let pizzaType = localStorage.getItem(`pizzaType`);
    let pizzaSize = localStorage.getItem(`pizzaSize`);

    switch (pizzaType) {

        case `Meat-lover`:
            pizzaPrice = 8;
            break;
        case `Veggie-lover`:
            pizzaPrice = 7;
            break;
        case `Canadian`:
            pizzaPrice = 7;
            break;
        default:
            pizzaPrice = 6;
            break;
    }

    switch (pizzaSize) {

        case `X-Large`:
            costBT = pizzaPrice * 4;
            break;
        case `Large`:
            costBT = pizzaPrice * 3;
            break;
        case `Medium`:
            costBT = pizzaPrice * 2;
            break;
        case `Small`:
            costBT = pizzaPrice * 1.5;
            break;
        case `Personal`:
            costBT = pizzaPrice;
            break;
    }

    if (deliveryOption == `Delivery`)
    {
        deliveryCost = 4;
    }
    costBT = costBT + deliveryCost;
    tax = costBT * taxRate;
    costAT = costBT + tax;

    localStorage.setItem(`costBT`, costBT.toFixed(2));
    localStorage.setItem(`deliveryCost`, deliveryCost.toFixed(2));
    localStorage.setItem(`costAT`, costAT.toFixed(2));
    localStorage.setItem(`tax`, tax.toFixed(2));
}

function loadBuild ()
 {
    document.dispatchEvent(buildOrderConf);
 }

function orderConfirmation() {

    document.getElementById(`nameConf`).innerText = localStorage.getItem(`nameVal`);

    document.getElementById(`addressConf`).innerText = localStorage.getItem(`addressVal`);

    document.getElementById(`cityConf`).innerText = localStorage.getItem(`cityVal`);

    document.getElementById(`phoneConf`). innerText = localStorage.getItem(`phoneVal`)

    document.getElementById(`provinceConf`).innerText = localStorage.getItem(`provinceVal`);
    
    document.getElementById(`deliveryConf`).innerText = localStorage.getItem(`deliveryOption`);

    document.getElementById(`pizzaTypeConf`).innerText = localStorage.getItem(`pizzaType`);

    document.getElementById(`pizzaSizeConf`).innerText = localStorage.getItem(`pizzaSize`);

    document.getElementById(`deliveryCost`).innerText = `$` + localStorage.getItem(`deliveryCost`);

    document.getElementById(`costBTConf`).innerText = `$` + localStorage.getItem(`costBT`);

    document.getElementById(`taxConf`).innerText = `$` + localStorage.getItem(`tax`);

    document.getElementById(`costATConf`).innerText = `$` + localStorage.getItem(`costAT`);
  
}

function orderSubmitted () {

    window.location.href = `orderSubmitted.html`; 
}

function estimatedTime () {

    let estimatedTime;
    let costBT = localStorage.getItem(`costBT`);
    let deliveryOption = localStorage.getItem(`deliveryOption`);

    if (costBT >= 30)
    {
        estimatedTime = 30;
    }

    else if ((costBT <= 30) && (costBT >= 20))
    {
        estimatedTime = 20;
    }

    else if (costBT < 20)
    {
        estimatedTime = 15;
    }

    if (deliveryOption == `Delivery`)
    {
        estimatedTime += 20;
    }

    document.getElementById(`estimatedTime`).innerText = estimatedTime + ` Minutes`;
}

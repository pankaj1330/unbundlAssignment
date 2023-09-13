import {cars} from './cars.js';
const carContainer = document.querySelector('.cars');
const form = document.querySelector('.filter-form form');

storeLocalStorage('allCars',cars);
storeLocalStorage('carData',cars);

function displayData(){
    const carsData = getLocalStorage('carData');
    const carHtml = carsData.map(car => {
        return`<div class="car">
            <div class="image">
                <img src='${car.imgSrc}' alt="not found">
            </div>
            <div class="car-details">
                <h2>${car.name}</h2>
                <p>Price : &#x20b9;${car.price} Lacks</p>
                <p>${car.seater} seater</p>
                <button class="buy">BUY</button>
            </div>
        </div>`
    }).join('');
    carContainer.innerHTML = carHtml;
}

displayData();

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const carType1 = form.carType1.checked;
    const carType2 = form.carType2.checked;
    const carType3 = form.carType3.checked;

    let filtedData = [];
    const allCars = getLocalStorage('allCars');
    if(carType1){
        const data = allCars.filter(car => {
            return car.type === form.carType1.value;
        })
        filtedData = [...filtedData,...data];
    }
    if(carType2){
        const data = allCars.filter(car => {
            return car.type === form.carType2.value;
        })
        filtedData = [...filtedData,...data];
    }
    if(carType3){
        const data = allCars.filter(car => {
            return car.type === form.carType3.value;
        })
        filtedData = [...filtedData,...data];
    }

    if(!carType1 && !carType2 && !carType3){
        filtedData = [...allCars];
    }
    storeLocalStorage('carData',filtedData);
    displayData();
})

//admin view







function storeLocalStorage(key,carsitems){
    const items = JSON.stringify(carsitems);
    localStorage.setItem(key,items);
}

function getLocalStorage(key){
    const carsitems = localStorage.getItem(key);
    const items = JSON.parse(carsitems);
    return items;
}

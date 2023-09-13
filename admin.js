import {cars} from './cars.js';
const carContainer = document.querySelector('.cars');

function displayData(){
    const carsData = getLocalStorage('allCars');
    const carHtml = carsData.map(car => {
        return`<div class="car">
            <div class="image">
                <img src="${car.imgSrc}" alt="not found">
            </div>
            <div class="car-details">
                <h2>${car.name}</h2>
                <p>Price : &#x20b9;${car.price} Lacks</p>
                <p>${car.seater} seater</p>
                <button class="buy delete" data-id='${car.id}'>delete</button>
            </div>
        </div>`
    }).join('');

    carContainer.innerHTML = carHtml;
    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click',()=>Delete(btn.dataset.id));
    })
}

displayData();


function Delete(id){
    console.log(id);
    id = parseInt(id);
    let allCars = getLocalStorage('allCars');
    const itemIndex = allCars.findIndex(car => {
        return car.id === id;
    })
    if (itemIndex !== -1) {
        allCars.splice(itemIndex, 1);
        storeLocalStorage('allCars', allCars);
        displayData();
    }
}


function storeLocalStorage(key,carsitems){
    const items = JSON.stringify(carsitems);
    localStorage.setItem(key,items);
}

function getLocalStorage(key){
    const carsitems = localStorage.getItem(key);
    const items = JSON.parse(carsitems);
    return items;
}
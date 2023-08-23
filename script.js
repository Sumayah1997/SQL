const { error } = require("console");
const { response } = require("express");
const { join } = require("path");

document.addEventListener("DOMContentLoaded",function()
{
    const CarList = document.getElementById("CarList");
    const NewCarForm = document.getElementById("NewCarForm");
    //function to get abd display cars

    function GetAndDisplayCars()
    {
        fetch("/getCars")
        .then(response=> response.json())
        .then(data =>
            {
                CarList.innerHTML="";
                data.forEach(car=>
                    {
                        const CarCard=document.createElement("div");
                        CarCard.className="card m-4";
                        CarCard.innerHTML=
                        `<div class="card-body">
                        <h5 class="card-title">${car.model}</h5>
                        <h5 class="card-text">${car.make}</h5>
                        <h5 class="card-text">${car.year}</h5>
                        </div>`
                        CarList.appendChild(CarCard);
                    });
            })
            .catch(error => console.error("error fetching data!",error))
    }
    GetAndDisplayCars();

    NewCarForm.addEventListener("submit",function(event)
    {
        event.preventDefault();
        const model =document.getElementById("model").value;
        const make =document.getElementById("make").value;
        const year =document.getElementById("year").value;
        const CarData ={model,make,year};
        fetch("/addCar",{method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(CarData),})

        .then(response=>response.join)
        .then(data=>
            {
                console.log("car added successfully!");
                GetAndDisplayCars();
            })
            .catch(error=>console.error("error adding car!"));
        });
    });
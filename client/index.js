// js files
import { handleSubmit } from "./js/formHandler";
import { getTrips } from "./js/api";
import { renderTrip } from "./js/ui";

// alert("I EXIST")
// console.log("CHANGE!!");

// sass files
import "./styles/resets.css";
import "./styles/main.css";

const form = document.querySelector("form");
const showForm = document.querySelector('#showForm')
const cancel = form.querySelector('#closeButton')

if (form && showForm) {
    showForm.addEventListener('click', () => {
        form.classList.remove('hidden')
        form.addEventListener("submit", handleSubmit);
        cancel.addEventListener('click',()=>{
            form.classList.add('hidden')
        })
    })
}

getTrips().then(trips => {
    trips.forEach(renderTrip)
})
import { deleteTrip } from './api';
import { colors } from './constants'
import * as renderWeatherDay from './renderWeatherDay';

export function renderTrip(trip) {
  const { city, country, imageUrl, weather, start, end, id } = trip;
  const el = document.createElement('div')
  el.classList.add('trip')
  el.style.backgroundColor = colors[colors.length % id]
  const now = new Date();
  const diff = now.getTime() - new Date(start).getTime();

  let daysTillTrip = "already started"
  if(diff > 0){
    Math.floor( diff/ 1000 * 60 * 60 * 24) + " days away";
  }
  console.log(now.getTime(),new Date(start).getTime())
  el.innerHTML = `
      <img src="${imageUrl}" alt="${country}" />
      <div>
        <h3> My trip to: ${city}, ${country}</h3>
        <h3> Departing: ${start}</h3>
  
        <h5>${city}, ${country} is ${daysTillTrip}</h5>
        <h5>Typical weather for then is</h5>
  
        ${weather.map(renderWeatherDay).join('\n')}
        <div class='row'>
          <button class="cancel">remove trip</button>
        </div>
      </div> 
    `
  const tripsNode = document.querySelector('#trips')
  tripsNode.appendChild(el)
  const removeTrip = el.querySelector('.cancel')
  removeTrip.addEventListener('click', () => {
    deleteTrip(id)
    el.remove()
  })
}
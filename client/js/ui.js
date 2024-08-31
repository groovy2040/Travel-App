import { deleteTrip } from './api';
import { colors } from './constants'

export function renderTrip(trip) {
  const { city, country, imageUrl, weather, start, end, id } = trip;
  const el = document.createElement('div')
  el.classList.add('trip')
  el.style.backgroundColor = colors[colors.length % id]
  const now = new Date();
  const daysTillTrip = Math.floor((now.getTime() - new Date(start).getTime()) / 1000 * 60 * 60 * 24)
  el.innerHTML = `
      <img src="${imageUrl}" alt="${country}" />
      <div>
        <h3> My trip to: ${city}, ${country}</h3>
        <h3> Departing: ${start}</h3>
  
        <h5>${city}, ${country} is ${daysTillTrip} days away</h5>
        <h5>Typical weather for then is</h5>
  
        ${weather.map(renderWeatherDay).join('\n')}
        <div>
          <button>save trip</button>
          <button class='remove'>remove trip</button>
        </div>
      </div> 
    `
  const tripsNode = document.querySelector('#trips')
  tripsNode.appendChild(el)
  const removeTrip = el.querySelector('.remove')
  removeTrip.addEventListener('click', () => {
    deleteTrip(id)
    el.remove()
  })
}

export function renderWeatherDay(weather) {
  const { datetime, max_temp, min_temp, weather: { description, icon } } = weather
  return `
      <h6>
    ${datetime}, high: ${max_temp} low: ${min_temp}
  ${description}
  <img class='icon' src="https://cdn.weatherbit.io/static/img/icons/${icon}.png"
      </h6>
    `
}
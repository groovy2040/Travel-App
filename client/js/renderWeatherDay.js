function renderWeatherDay(weather) {
    const { datetime, max_temp, min_temp, weather: { description, icon } } = weather
    return `<h6>
    ${datetime}, high: ${max_temp} low: ${min_temp}
    ${description}
    <img class='icon' src="https://cdn.weatherbit.io/static/img/icons/${icon}.png"
  </h6>`
  }

  module.exports = renderWeatherDay
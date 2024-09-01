const renderWeatherDay = require('../renderWeatherDay')
const WeatherDay = {
 "app_max_temp": 25.1,
 "app_min_temp": 18.2,
 "clouds": 62,
 "clouds_hi": 32,
 "clouds_low": 41,
 "clouds_mid": 32,
 "datetime": "2024-09-02",
 "dewpt": 17,
 "high_temp": 25,
 "low_temp": 17.5,
 "max_dhi": null,
 "max_temp": 25,
 "min_temp": 18.2,
 "moon_phase": 0,
 "moon_phase_lunation": 1,
 "moonrise_ts": 1725250093,
 "moonset_ts": 1725302746,
 "ozone": 294,
 "pop": 0,
 "precip": 0,
 "pres": 1006,
 "rh": 80,
 "slp": 1013,
 "snow": 0,
 "snow_depth": 0,
 "sunrise_ts": 1725253690,
 "sunset_ts": 1725301670,
 "temp": 20.8,
 "ts": 1725228060,
 "uv": 6,
 "valid_date": "2024-09-02",
 "vis": 24,
 "weather": {
     "description": "Broken clouds",
     "code": 803,
     "icon": "c03d"
 },
 "wind_cdir": "SW",
 "wind_cdir_full": "southwest",
 "wind_dir": 222,
 "wind_gust_spd": 4.3,
 "wind_spd": 3
}


describe("Testing the renderWeatherDay functionality", () => {
  test("Testing the renderWeatherDay() function", () => {
    const day = renderWeatherDay(WeatherDay);

    expect(day).toEqual(`<h6>
    2024-09-02, high: 25 low: 18.2
    Broken clouds
    <img class='icon' src="https://cdn.weatherbit.io/static/img/icons/c03d.png"
  </h6>`)
  });
});

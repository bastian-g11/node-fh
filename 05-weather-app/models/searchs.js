const fs = require('fs');
const axios = require('axios').default;

class Searchs {
  constructor() {
    this.history = [];
    this.dbPath = './db/database.json';
  }

  get paramsMapbox() {
    return {
      language: 'en',
      limit: 4,
      access_token: process.env.MAPBOX_KEY,
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
    };
  }

  get historyCapilatized() {
    return this.history.map((place) =>
      place
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  }

  async city(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const resp = await instance.get();
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat,
          lon,
          ...this.paramsWeather,
        },
      });
      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        description: weather[0].description,
        temp: main.temp,
        max: main.temp_max,
        min: main.temp_min,
      };
    } catch (error) {
      console.log(
        '🚀 ~ file: searchs.js:39 ~ Searchs ~ weather ~ error:',
        error
      );
    }
  }

  saveInHistory(place = '') {
    if (this.history.includes(place.toLowerCase())) {
      return;
    }
    this.history = this.history.splice(0, 5);
    this.history.unshift(place.toLowerCase());
    this.saveDB();
  }

  saveDB() {
    const payload = { history: this.history };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }
  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    this.history = data.history;
  }
}

module.exports = Searchs;

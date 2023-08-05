require('dotenv').config();
const {
  readInput,
  inquirerMenu,
  pause,
  listPlaces,
} = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

const main = async () => {
  let opt;
  const searchs = new Searchs();
  searchs.readDB();
  do {
    opt = await inquirerMenu();

    if (opt === 1) {
      const query = await readInput('City:');
      const places = await searchs.city(query);

      const selectedId = await listPlaces(places);
      if (selectedId === 0) continue;

      const selectedPlace = places.find((place) => place.id === selectedId);
      searchs.saveInHistory(selectedPlace.name);

      const weather = await searchs.weather(
        selectedPlace.lat,
        selectedPlace.lng
      );

      // console.clear();
      console.log('\nPlace information'.magenta);
      console.log('City: ', selectedPlace.name);
      console.log('Lat: ', selectedPlace.lat);
      console.log('Lng: ', selectedPlace.lng);
      console.log('Temp: ', weather.temp);
      console.log('Min: ', weather.min);
      console.log('Max: ', weather.max);
      console.log('Description: ', weather.description);
    } else if (opt === 2) {
      searchs.historyCapilatized.forEach((place, i) => {
        const index = `${i + 1}`.magenta;
        console.log(`${index} ${place}`);
      });
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();

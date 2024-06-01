#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

function fetchCharacterName(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const characterData = JSON.parse(body);
        resolve(characterData.name);
      }
    });
  });
}

request(apiUrl, async (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  const filmData = JSON.parse(body);
  const characters = filmData.characters;

  try {
    const characterNames = await Promise.all(characters.map(fetchCharacterName));
    characterNames.forEach(name => console.log(name));
  } catch (error) {
    console.error(error);
  }
});

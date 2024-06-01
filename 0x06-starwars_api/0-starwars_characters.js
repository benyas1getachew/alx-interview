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
    for (const characterUrl of characters) {
      const characterName = await fetchCharacterName(characterUrl);
      console.log(characterName);
    }
  } catch (error) {
    console.error(error);
  }
});

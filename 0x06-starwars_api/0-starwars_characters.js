#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  const filmData = JSON.parse(body);
  const characters = filmData.characters;
  characters.forEach(characterUrl => {
    request(characterUrl, (charError, charResponse, charBody) => {
      if (charError) {
        console.error(charError);
        return;
      }
      const characterData = JSON.parse(charBody);
      console.log(characterData.name);
    });
  });
});

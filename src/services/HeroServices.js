import { HeroObj, HeroInfoObj } from "../entities/HeroObj";
const { baseAPI, params } = require("../shared/baseApi");

class HeroService {
  getCharacters() {
    return baseAPI
      .get(
        `/characters?apikey=${params.apikey}&ts=${params.ts}&hash=${params.hash}`
      )
      .then((response) => response.data.data.results)
      .then((heroesList) => {
        let newHeroesList = heroesList.map((hero) => new HeroObj(hero));
        return newHeroesList;
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  getSingleCharacter(id) {
    return baseAPI
      .get(
        `/characters/${id}?apikey=${params.apikey}&ts=${params.ts}&hash=${params.hash}`
      )
      .then((response) => response.data.data.results)
      .then((response) => new HeroInfoObj(response[0]))
      .catch((error) => console.log(error));
  }
  searchCharacters(name) {
    return baseAPI
      .get(
        `/characters?nameStartsWith=${name}&apikey=${params.apikey}&ts=${params.ts}&hash=${params.hash}`
      )
      .then((response) => response.data.data.results)
      .then((heroesList) => {
        let newHeroesList = heroesList.map((hero) => new HeroObj(hero));
        return newHeroesList;
      })
      .catch((error) => console.log(error));
  }
}

export const heroService = new HeroService();

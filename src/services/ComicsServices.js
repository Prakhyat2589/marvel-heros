import { ComicObj } from "../entities/ComicObj";
const { baseAPI, params } = require("../shared/baseApi");

class ComicsService {
  getComics(id) {
    return baseAPI
      .get(
        `/characters/${id}/comics?apikey=${params.apikey}&ts=${params.ts}&hash=${params.hash}`
      )
      .then((response) => response.data.data.results)
      .then((comicsList) => {
        let newComicsList = comicsList.map((comic) => new ComicObj(comic));
        return newComicsList;
      })
      .catch((error) => console.log(error));
  }
}

export const comicsService = new ComicsService();

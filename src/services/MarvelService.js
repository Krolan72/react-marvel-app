import { useHttp } from "../hooks/http.hook";
const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=38ed2b9b6ff0b53a2f2c7c3e910a6e8a"; 
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const url = `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`;
    const res = await request(url);
    return res.data.results.map(_transformCharacter);
  };
  const getCharacter = async (id) => {
    const url = `${_apiBase}characters/${id}?${_apiKey}`;
    const res = await request(url);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const url = `${_apiBase}characters?name=${name}&${_apiKey}`;
    const res = await request(url);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description
        ? char.description.slice(0, 210).trim() + "..."
        : "Description not found",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };
  const getAllComics = async (offset = _baseOffset) => {
    const url = `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`;
    const res = await request(url);
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const url = `${_apiBase}comics/${id}?${_apiKey}`;
    const res = await request(url);
    return _transformComics(res.data.results[0]);
  };
  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
      language: comics.textObjects.language || "en-us",
      comicsPage: comics.urls[0].url,
      pageCount: comics.pageCount,
    };
  };
  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComics,
    clearError,
    getCharacterByName,
  };
};

export default useMarvelService;

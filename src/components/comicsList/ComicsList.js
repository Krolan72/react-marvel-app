import "./comicsList.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(215);
  const { loading, error, getAllComics } = useMarvelService();
  useEffect(() => {
    getComics();
  }, []);

  const onComicsLoad = (additionalComicsList) => {
    setComicsList((comicsList) => [...comicsList, ...additionalComicsList]);
    setOffset(offset + 25);
  };
  const sendTheCurrentComics = (id, e) => {
    e.preventDefault();
  };
  const getComics = () => {
    getAllComics(offset).then(onComicsLoad);
  };

  const renderComicsList = (arr) => {
    const result = arr.map(({ thumbnail, price, title, id }, i) => {
      return (
        <li
          onClick={(e) => sendTheCurrentComics(id, e)}
          key={i}
          className="comics__item"
        >
          <Link to={`/comics/${id}`}>
            <img src={thumbnail} alt="x-men" className="comics__item-img" />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{result}</ul>;
  };

  const items = renderComicsList(comicsList);
  const loadingMessage = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  return (
    <div className="comics__list">
      {loadingMessage}
      {errorMessage}
      {items}
      <button onClick={getComics} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;

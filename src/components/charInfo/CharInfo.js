import "./charInfo.scss";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  const onLoadedChar = (char) => {
    setChar(char);
  };

  useEffect(() => {
    updateTheChar();
  }, [props.id]);
  const renderTheComicsList = (comicsList) => {
    let list;
    if (comicsList.length === 0) {
      list = (
        <li
          style={{
            fontWeight: "600",
            border: "2px solid grey",
          }}
          className="char__comics-item"
        >
          No one comics was find
        </li>
      );
    } else {
      list = comicsList.map((comics, i) => {
        if (i < 10) {
          return (
            <li key={i} className="char__comics-item">
              {comics.name}
            </li>
          );
        }
      });
    }

    return <ul className="char__comics-list">{list}</ul>;
  };
  const updateTheChar = () => {
    clearError();
    const { id } = props;
    if (!id) {
      return;
    }
    getCharacter(id).then(onLoadedChar);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const load = loading ? <Spinner /> : null;
  const err = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !char) ? (
    <ViewChar char={char} comicsList={renderTheComicsList(char.comics)} />
  ) : null;
  return (
    <div className="char__info">
      {skeleton}
      {load}
      {err}
      {content}
    </div>
  );
};
const ViewChar = ({ char, comicsList }) => {
  const { name, thumbnail, wiki, homepage, description } = char;
  const stylePic =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain" }
      : null;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} style={stylePic} alt="abyss" />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
        <div className="char__descr">{description}</div>
      </div>
      <div className="char__comics">Comics:</div>
      {comicsList}
    </>
  );
};
CharInfo.propTypes = {
  id: PropTypes.number,
};
export default CharInfo;

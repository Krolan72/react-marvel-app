import { useState, useEffect, useRef, memo } from "react";
import React from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./charList.scss";

const CharList = memo((props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);
  const [offset, setOffset] = useState(210);
  let myRefs = useRef([]);
  const { loading, error, getAllCharacters } = useMarvelService();

  const setTheIdOfChar = (id) => {
    props.setIdOfChar(id);
  };
  useEffect(() => {
    loadingChar(offset, true);
  }, []);
  const focusOnItem = (id) => {
    myRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    myRefs.current[id].classList.add("char__item_selected");
    myRefs.current[id].focus();
  };
  const addToTheListChars = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newChars]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };
  const loadingChar = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(addToTheListChars);
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <CSSTransition key={item.id} timeout={500} classNames="char__item">
          <li
            tabIndex={0}
            ref={(el) => (myRefs.current[i] = el)}
            className="char__item"
            onClick={() => {
              setTheIdOfChar(item.id);
              focusOnItem(i);
            }}
            key={item.id}
            onKeyPress={(e) => {
              if (e.key === " " || e.key === "Enter") {
                setTheIdOfChar(item.id);
                focusOnItem(i);
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });
   
    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  };

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        onClick={() => loadingChar(offset, false)}
        className="button button__main button__long"
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
});

CharList.propTypes = {
  setTheIdOfChar: PropTypes.func.isRequired,
};
export default CharList;

import { useState, useCallback } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchPanel from "../searchPanel/SearchPanel";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [idHerro, setidHerro] = useState(null);

  const setIdOfChar = useCallback((id) => {
    setidHerro(id);
  }, []);

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>

      <div className="char__content">
        <ErrorBoundary>
          <CharList setIdOfChar={setIdOfChar} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo id={idHerro} />
          </ErrorBoundary>
          <ErrorBoundary>
            <SearchPanel />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;

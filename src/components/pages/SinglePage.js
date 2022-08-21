import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";
const SinglePage = ({ Component, pageType }) => {
  const [dataOfSinglePage, setDataOfSinglePage] = useState({});
  const { loading, error, getComics, clearError, getCharacter } =
    useMarvelService();
  const { id } = useParams();
  useEffect(() => {
    updateThePage();
  }, [id]);
  const onLoadPage = (data) => {
    setDataOfSinglePage(data);
  };
  const updateThePage = () => {
    clearError();

    switch (pageType) {
      case "comic":
        getComics(id).then(onLoadPage);
        break;

      case "char":
        getCharacter(id).then(onLoadPage);
        break;

      default:
        throw new Error(
          "Unexpected type of page, check which is you handed over props"
        );
    }
  };

  const loadingMessage = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !dataOfSinglePage) ? (
    <Component data={dataOfSinglePage} />
  ) : null;
  return (
    <>
      <AppBanner />
      {loadingMessage}
      {errorMessage}
      {content}
    </>
  );
};

export default SinglePage;

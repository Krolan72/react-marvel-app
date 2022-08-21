import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import "./searchPanel.scss";
import { Link } from "react-router-dom";
const SearchPanel = () => {
  const [findedItem, setFindedItem] = useState(null);
  const [error, setError] = useState(false);
  const { getCharacterByName } = useMarvelService();

  const setTheStatusOfSearch = (char) => {
    setFindedItem(char);
    setError(false);
  };
  const isError = () => {
    setError(true);
    setFindedItem(null);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("*"),
    }),
    onSubmit: ({ name }) => {
      getCharacterByName(name).then(setTheStatusOfSearch).catch(isError);
    },
  });
  const charNotFound =
    error && !findedItem && formik.values.name !== "" ? (
      <div className="message__notfound" s>
        The character was not found. Check the name and try again
      </div>
    ) : null;
  const errorMessage =
    formik.errors.name && formik.touched.name && !findedItem ? (
      <div className="message__erorr">{formik.errors.name}</div>
    ) : null;
  return (
    <form className="searchpanel" onSubmit={formik.handleSubmit}>
      <div className="searchpanel__content">
        <label className="searchpanel__text" htmlFor="name">
          Or find a character by name:
        </label>
        <div className="searchpanel__controls">
          <div className="searchpanel__row">
            <input
              placeholder="Enter name"
              className="searchpanel__input"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <div className="searchpanel__buttons">
              <button className="button button__main" type="submit">
                <div className="inner">FIND</div>
              </button>
            </div>
          </div>
          <div className="searchpanel__messages message">
            {findedItem && !error ? (
              <>
                <div className="message__found ">
                  There is! Visit {findedItem.name} page?
                </div>

                <button
                  className="button button__secondary searchpanel__gotopage"
                  type="submit"
                  onClick={() => setFindedItem(null)}
                >
                  <div className="inner">
                    <Link to={`/character/${findedItem.id}`}>TO PAGE</Link>
                  </div>
                </button>
              </>
            ) : null}
            {errorMessage}
            {charNotFound}
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchPanel;

import ComicsList from "../comicsList/ComicsList";
import SinglePage from "./SinglePage";
import SingleComicPage from "./singleComicPage/SingleComicPage";
import { Route, Routes } from "react-router-dom";

const ComicsPage = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ComicsList />} />
        <Route
          path={`:id`}
          element={<SinglePage pageType="comic" Component={SingleComicPage} />}
        />
      </Routes>
    </>
  );
};

export default ComicsPage;

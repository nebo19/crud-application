import { useEffect } from "react";
import { PeopleList } from "./components/people-list/people-list";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreatePerson } from "./components/create-person/create-person";
import { useAppDispatch } from "./hooks";
import {
  fetchPeopleStart,
  fetchPeopleSuccess,
  fetchPeopleError,
} from "./components/people-list/people-list-slice";
import axios from "axios";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchPeopleStart());
      try {
        await axios
          .get("http://localhost:3001/people")
          .then((response) =>
            dispatch(fetchPeopleSuccess(response.data.people))
          );
      } catch (error) {
        dispatch(fetchPeopleError(error));
      }
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-user" element={<CreatePerson />} />
        <Route path="/" element={<PeopleList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

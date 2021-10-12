import { movies$ } from "../../assets/movies";

export function getMovies() {
  return (dispatch) => {
    movies$.then((data) => {
      dispatch({ type: "GETDATA", payload: data });
    });
  };
}

export function setMovies(data) {
  return { type: "SETDATA", payload: data };
}

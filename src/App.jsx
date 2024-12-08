import { useEffect, useReducer } from "react";
import "./App.css";
import { ERROR, LOADING, SUCCESS, URL } from "./constants";
import Table from "./components/Table";

function App() {
  const initialState = {
    kickStarterProjectsData: [],
    isLoading: false,
    isError: "",
  };

  const reducerFn = (state, action) => {
    switch (action.type) {
      case LOADING:
        return { ...state, isLoading: true };
      case SUCCESS:
        return {
          ...state,
          isLoading: false,
          kickStarterProjectsData: action.payload,
          isError: "",
        };
      case ERROR:
        return {
          ...state,
          isLoading: false,
          kickStarterProjectsData: [],
          isError: action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  const fetchData = async () => {
    dispatch({ type: LOADING });
    try {
      const res = await fetch(URL);
      const data = await res.json();
      dispatch({ type: SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { isLoading, kickStarterProjectsData, isError } = state;

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className='error'>{isError}</div>
      ) : (
        <div>
          <h2>Highly-Rated Kick Starter Projects</h2>
          <Table kickStarterProjectsData={kickStarterProjectsData} />
        </div>
      )}
    </>
  );
}

export default App;

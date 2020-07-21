import React from "react";
import PizzaList from "./components/PizzaList";
import AddPizzaForm from "./components/AddPizzaForm";
import { useSelector, useDispatch } from "react-redux";

const selectDarkMode = (reduxState) => reduxState.user.darkMode;

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);
  const background = isDarkMode
    ? { backgroundColor: "#282c34", color: "white" }
    : { backgroundColor: "#FFFFFF", color: "black" };

  const toggleDarkMode = () => {
    const action = {
      type: "TOGGLE_DARK_MODE",
    };
    dispatch(action);
  };

  return (
    <div className="App" style={background}>
      <header>
        <button onClick={toggleDarkMode}>Dark Mode!</button>
        <PizzaList />
        <AddPizzaForm />
      </header>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const selectUser = (reduxState) => {
  return reduxState.user;
};

//first add the favourite property to the pizzas (map over the pizza->add) + check if the user.favourites includes your pizza.id (will return true or false)
//then sort over this new pizza Array to have the most bought pizza show on top.
const selectPizzasWithFavourites = (reduxState) => {
  const pizzasWithFavourites = reduxState.pizzas.map((pizza) => ({
    ...pizza,
    isFavourite: reduxState.user.favourites.includes(pizza.id),
  }));
  return pizzasWithFavourites;
};

export default function PizzaList() {
  const user = useSelector(selectUser);
  const pizzas = useSelector(selectPizzasWithFavourites);
  const [filters, setFilters] = useState({});
  const [sort, set_sort] = useState("name");
  const dispatch = useDispatch();

  const onFavouriteClick = (id) => {
    console.log("adding favourite");
    const action = {
      type: "TOGGLE_FAVOURITE",
      payload: id,
    };
    dispatch(action);
  };

  const pizzaIngredients = pizzas.map((p) => p.ingredients); //new array with all the ingredients
  console.log(pizzaIngredients);

  const uniqueIngredients = pizzaIngredients.reduce((acc, ings) => {
    //not sure what reduce does, but we create a new array with only unique ingredients.
    ings.forEach((ing) => !acc.includes(ing) && acc.push(ing));
    return acc;
  });

  const onFilterClick = (name) => {
    //update the filter object
    const newFilter = {
      ...filters,
      [name]: !filters[name],
    };
    setFilters(newFilter);
  };
  console.log(filters);

  const activeFilters = Object.keys(filters).filter((name) => filters[name]); //return ingredient if it's true..
  console.log(activeFilters);

  const filteredPizzas = !activeFilters.length
    ? pizzas
    : pizzas.filter((p) => {
        return p.ingredients.some((ingredient) =>
          activeFilters.includes(ingredient)
        );
      });
  console.log("filter", filteredPizzas);

  function compare_name(pizzaA, pizzaB) {
    return pizzaA.name.localeCompare(pizzaB.name);
  }

  function compare_health(pizzaA, pizzaB) {
    return pizzaA.id - pizzaB.id;
  }
  function compare_pop(pizzaA, pizzaB) {
    return pizzaB.bought - pizzaA.bought;
  }

  if (sort === "name") {
    filteredPizzas.sort(compare_name);
  } else if (sort === "pop") {
    filteredPizzas.sort(compare_pop);
  } else if (sort === "health") {
    filteredPizzas.sort(compare_health);
  }

  //map inlcude by id...

  const change_sorting = (event) => {
    console.log("new sort order", event.target.value);
    set_sort(event.target.value);
  };

  return (
    <div>
      <h1>Pizza Explorer</h1>
      <p>
        Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <p>Total number of pizza's : {pizzas.length}</p>
      <div>
        <div>
          {uniqueIngredients.map((ing) => (
            <button key={ing} onClick={() => onFilterClick(ing)}>
              {ing}
            </button>
          ))}
        </div>
        <select onChange={change_sorting}>
          <option value="name">Name</option>
          <option value="pop">Popularity</option>
          <option value="health">Healthiness</option>
        </select>
        <ul>
          {filteredPizzas.map((p) => (
            <li key={p.id}>
              <h3 onClick={() => onFavouriteClick(p.id)}>
                {p.name} {p.isFavourite ? "♥" : "♡"}
              </h3>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

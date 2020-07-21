// src/components/AddPizzaForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddPizzaForm() {
  const [name, set_name] = useState("");
  const [description, set_description] = useState("");
  const [ingredients, set_ingredients] = useState("");

  const dispatch = useDispatch();

  const submit = (event) => {
    // to make sure that the form does not redirect (which is normal browser behavior)
    event.preventDefault();
    console.log(event);
    console.log("new pizza:", name, description);

    // TODO:
    // - dispatch the ADD_PIZZA action
    const action = {
      type: "ADD_PIZZA",
      payload: {
        id: parseInt(Math.random() * (99999 - 1111) + 1111), //works.. but still a chance you get the same id twice.. so would need to add some more logic
        name: name,
        description: description,
        ingredients: [ingredients],
      },
    };
    dispatch(action);
    set_name("");
    set_description("");
    set_ingredients("");
  };
  console.log(ingredients);

  return (
    <form onSubmit={submit}>
      <h2>Add a new pizza</h2>
      <p>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => set_name(e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Description:{" "}
          <input
            type="text"
            value={description}
            onChange={(e) => set_description(e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Ingredients:{" "}
          <input
            type="text"
            value={ingredients}
            onChange={(e) => set_ingredients(e.target.value)}
          />
        </label>
      </p>
      <p>
        <button type="submit">Add this pizza!</button>
      </p>
    </form>
  );
}

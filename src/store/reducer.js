// src/store/reducer.js
const initialState = {
  user: {
    name: "Helva",
    favourites: [67283, 357311],
    darkMode: false,
  },
  pizzas: [
    {
      id: 161235,
      name: "Pizza Margherita",
      description:
        "The typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.",
      bought: 15,
      ingredients: ["tomatoes", "mozzarella", "basil", "oil"],
    },
    {
      id: 67283,
      name: "Pizza Napoletana",
      description:
        "Neapolitan pizza also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",
      bought: 2,
      ingredients: ["tomatoes", "mozzarella", "oil"],
    },
    {
      id: 357311,
      name: "Pizza Bianca",
      description:
        "White pizza, which omits tomato sauce from the equation, often substituting it with pesto or sour cream.",
      bought: 10,
      ingredients: ["ricotta", "mozzarella", "garlic"],
    },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PIZZA": {
      // => Ask yourself: what is action.payload?
      const newPizza = action.payload;
      return {
        ...state,
        pizzas: [...state.pizzas, newPizza],
      };
    }
    case "TOGGLE_FAVOURITE": {
      //what do we need to add or remove a pizza from favourite?
      //we need to push or pull it from the favourites under user... (because we have already true or false added to pizza)
      const pizzaId = action.payload;
      const isFavourite = state.user.favourites.includes(pizzaId);

      const newFavourite = isFavourite
        ? state.user.favourites.filter((id) => id !== pizzaId)
        : [...state.user.favourites, pizzaId];

      return {
        ...state,
        user: { ...state.user, favourites: newFavourite },
      };
    }

    //   if (isFavourite) {
    //     const newFavourites = state.user.favourites.filter(
    //       (id) => id !== pizzaId
    //     );
    //     return { ...state, user: { ...state.user, favourites: newFavourites } }; //return new state, user, return everything in user and change favourites to newFavourites.
    //   } else {
    //     const newFavourites = [...state.user.favourites, pizzaId]; //if pizzaId is not in the array, return new array of favourites and just add the pizzaId.
    //     return { ...state, user: { ...state.user, favourites: newFavourites } };
    //   }
    // }

    case "TOGGLE_DARK_MODE": {
      return {
        ...state,
        user: { ...state.user, darkMode: !state.user.darkMode },
      };
    }
    default: {
      return state;
    }
  }
}

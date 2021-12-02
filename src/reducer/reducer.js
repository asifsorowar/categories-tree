export const initialState = {
  selectedCategory: {},
  categories: [],
  parents: [],
};

export const types = {
  add_selectedCategory: "ADD_SELECTED_CATEGORY",
  add_categories: "ADD_CATEGORIES",
  add_parents: "ADD_PARENTS",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.add_selectedCategory:
      return { ...state, selectedCategory: action.selectedCategory };

    case types.add_categories:
      return { ...state, categories: action.categories };

    case types.add_parents:
      return { ...state, parents: action.parents };

    default:
      return state;
  }
};

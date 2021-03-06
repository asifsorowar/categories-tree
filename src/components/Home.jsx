import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

import { useStateProvider } from "../reducer/provider";
import { types } from "../reducer/reducer";

function Home() {
  const [{ categories }, dispatch] = useStateProvider();

  return (
    <div className="card">
      {categories?.map((category) => (
        <Link
          to={`/add-category/${category._id}`}
          className="card-details link-home"
          key={category._id || category.name}
          onClick={() =>
            dispatch({
              type: types.add_selectedCategory,
              selectedCategory: category,
            })
          }
        >
          <p>Name: {category.name}</p>
          <p>Parent: {category.parent_id?.name || "none"}</p>
        </Link>
      ))}
    </div>
  );
}

export default Home;

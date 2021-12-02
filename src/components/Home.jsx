import React from "react";
import "../styles/home.css";

function Home({ categories }) {
  return (
    <div className="card">
      {categories?.map((category) => (
        <div className="card-details" key={category._id || category.name}>
          <p>Name: {category.name}</p>
          <p>Parent: {category.parent_id?.name || "none"}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;

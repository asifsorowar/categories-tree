import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CategoryForm from "./components/CategoryForm";
import { getCategories } from "./services/categorySerivce";
import { useStateProvider } from "./reducer/provider";
import { types } from "./reducer/reducer";

function App() {
  const [{}, dispatch] = useStateProvider();

  const loadCategories = async () => {
    const { data } = await getCategories();
    let parents = data.filter((item) => item.is_parent);
    parents = [{ _id: null, name: "none" }, ...parents];
    dispatch({
      type: types.add_categories,
      categories: data,
    });

    dispatch({
      type: types.add_parents,
      parents,
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="add-category/:id" element={<CategoryForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

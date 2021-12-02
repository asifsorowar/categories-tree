import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CategoryForm from "./components/CategoryForm";
import { getCategories } from "./services/categorySerivce";

function App() {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);

  const loadCategories = async () => {
    const { data: categories } = await getCategories();
    const parents = categories.filter((item) => item.is_parent);
    setParentCategories(parents);
    setCategories(categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Home categories={categories} />} />
          <Route
            path="add-category"
            element={
              <CategoryForm
                parents={parentCategories}
                categories={categories}
                setCategories={setCategories}
                setParentCategories={setParentCategories}
              />
            }
          />
          <Route
            path="add-category/:id"
            element={
              <CategoryForm
                parents={parentCategories}
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

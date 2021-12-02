import React, { useState, useEffect } from "react";
import { createCategory, updateCategory } from "../services/categorySerivce";
import "../styles/form.css";
import { useNavigate, useParams } from "react-router-dom";

function CategoryForm({
  parents,
  setCategories,
  categories,
  setParentCategories,
  selectedCategory,
}) {
  const params = useParams();

  const statuses = ["New", "Used"];
  const [name, setName] = useState(selectedCategory?.name || "");
  const [is_parent, setIsParent] = useState(
    selectedCategory?.is_parent || false
  );
  const [parent_id, setParentId] = useState(
    selectedCategory?.parent_id ||
      selectedCategory?.parent_id?._id ||
      parents[0]?._id
  );
  const [is_popular, setIsPopular] = useState(
    selectedCategory.is_popular || false
  );
  const [status, setStatus] = useState(selectedCategory.status || statuses[0]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let category = {};
      if (params.id === "new") {
        category = await createCategory({
          name,
          is_parent,
          parent_id,
          is_popular,
          status,
        });
      } else {
        category = await updateCategory(selectedCategory._id, {
          name,
          is_parent,
          parent_id,
          is_popular,
          status,
        });
      }

      setCategories([...categories, category]);
      if (category.is_parent) setParentCategories([...parents, category]);
      setName("");
      setIsParent("");
      setParentId("");
      setIsPopular("");
      setStatus("");
      setError("");
      return navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="name">name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />
      <label htmlFor="is_parent">Is Parent</label>
      <input
        type="checkbox"
        id="is_parent"
        checked={is_parent}
        onChange={(e) => {
          setIsParent(e.target.checked);
          setError("");
        }}
      />
      <label htmlFor="parent_id">Choose Parent</label>
      <select
        name="parent_id"
        id="parent_id"
        value={parent_id}
        onChange={(e) => {
          setParentId(e.target.value);
          setError("");
        }}
      >
        <option value={null}>none</option>
        {parents?.map((parent) => (
          <option
            value={parent._id}
            key={parent._id}
            onChange={() => setParentId(parent._id)}
          >
            {parent.name}
          </option>
        ))}
      </select>
      <label htmlFor="is_popular">Is Popular</label>
      <input
        type="checkbox"
        id="is_popular"
        checked={is_popular}
        onChange={(e) => {
          setIsPopular(e.target.checked);
          setError("");
        }}
      />
      <label htmlFor="status">Status</label>
      <select
        name="status"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {statuses?.map((status) => (
          <option value={status} key={status}>
            {status}
          </option>
        ))}
      </select>

      {error && (
        <label className="error" style={{ color: "red" }}>
          {error}
        </label>
      )}
      <button className="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default CategoryForm;

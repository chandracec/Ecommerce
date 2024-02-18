import React from "react";
import "./SearchInput.scss";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconClick = () => {
    handleSubmit();
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
           
        </div>
      </form>
    </div>
  );
};

export default SearchInput;

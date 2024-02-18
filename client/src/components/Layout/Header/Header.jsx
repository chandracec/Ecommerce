import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Header.scss";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../../Form/SearchInput";
import useCategory from "../../../hooks/useCategory";
import { useCart } from "../../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [showCategories, setShowCategories] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false); // Add this state variable

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div className="header">
      <div className="header-center">
        <ul className="navbar">
          <SearchInput />
          <li className="navbar-item">
            <NavLink className="link" to="/">
              Home
            </NavLink>
          </li>
          <li className="navbar-item categories-item">
            <div
              className="link"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              Categories
              {showCategories && (
                <div className="dropdown-content categories-dropdown-content">
                  <Link to="/categories"></Link>
                  {categories?.map((c) => (
                    <Link to={`/category/${c.slug}`} key={c._id}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
          {!auth.user ? (
            <>
              <li className="navbar-item">
                <NavLink className="link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink className="link" to="/login">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <div
                  className="link"
                  onMouseEnter={() => setShowUserDropdown(true)}
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  {auth?.user?.name}
                  {showUserDropdown && (
                    <div className="dropdown-content">
                      <NavLink
                        className={"d-link"}
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        className={"d-link"}
                        to={"/login"}
                        onClick={handleLogOut}
                      >
                        Logout
                      </NavLink>
                    </div>
                  )}
                </div>
              </li>
            </>
          )}
          <li className="navbar-item">
            <Badge count={cart?.length} showZero>
              <NavLink className="link" to="/cart">
                Cart
              </NavLink>
            </Badge>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

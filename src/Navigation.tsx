import React from "react";
import Home from './Home'
import About from "./About";
import Users from "./Users";
import ProductDetail from "./ProductDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login";

export default function Navigation() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nabtab">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element = {<About />}>   
          </Route>
          <Route path="/users" element = { <Users />}>
          </Route>
          <Route path="/" element = {<Home />}>
          </Route>
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}
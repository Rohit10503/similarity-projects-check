import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const auth = sessionStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <img
                        className="svg"
                        width={60}
                        src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723766400&semt=ais_hybrid"
                        alt="Logo"
                    />
                </Link>

                <button
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={() => {
                        const target = document.getElementById('navbarBasicExample');
                        if (target) {
                            target.classList.toggle('is-active');
                        }
                    }}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {
                        auth && (
                            <Link to="/" className="navbar-item">
                                Home
                            </Link>
                        )
                    }


                    <Link to="#" className="navbar-item">
                        Documentation
                    </Link>

                    {!auth ? (
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="/signup" className="button is-primary">
                                    <strong>Sign up</strong>
                                </Link>
                                <Link to="/login" className="button is-light">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-light" onClick={logout}>
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Optional Dropdown */}
                {/* <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">More</a>
                    <div className="navbar-dropdown">
                        <Link to="/about" className="navbar-item">
                            About
                        </Link>
                        <Link to="/jobs" className="navbar-item is-selected">
                            Jobs
                        </Link>
                        <Link to="/contact" className="navbar-item">
                            Contact
                        </Link>
                        <hr className="navbar-divider"/>
                        <Link to="/report-issue" className="navbar-item">
                            Report an issue
                        </Link>
                    </div>
                </div> */}
            </div>
        </nav>
    );
};

export default Navbar;

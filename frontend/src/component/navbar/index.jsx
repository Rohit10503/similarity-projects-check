import React from "react";
import "./navbar.css"
const Navbar = () => {
    return <>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img className="svg" width={60}  src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723766400&semt=ais_hybrid" alt="Logo" />

                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="">
                <div class="navbar-start">
                    <a class="navbar-item" href="/">
                        Home
                    </a>


                   
                    <a class="navbar-item" href="#">
                        Documentation
                    </a>

                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary" href="/signup">
                                <strong>Sign up</strong>
                            </a>
                            <a class="button is-light"  href="/login">
                                Log in
                            </a>
                        </div>
                    </div>
{/* 
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item is-selected">
                                Jobs
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider"/>
                                <a class="navbar-item">
                                    Report an issue
                                </a>
                        </div>
                    </div> */}
                </div>

                <div class="navbar-end">
                    {/* <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary" href="/signup">
                                <strong>Sign up</strong>
                            </a>
                            <a class="button is-light"  href="/login">
                                Log in
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
        </nav>
    </>
}
export default Navbar;
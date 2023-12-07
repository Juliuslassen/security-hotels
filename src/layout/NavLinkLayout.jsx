import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavLinkLayout({isLoggedIn}) {
    return ( 
        <div className="navbar-layout">
            <NavLink to></NavLink>
            <nav>
                {isLoggedIn ? (
                    <div>
                        <NavLink to="/login">login</NavLink>
                        <NavLink to="/data">data</NavLink>
                    </div>
                ) : (
                    <div>
                        <NavLink to="/login">login</NavLink>
                    </div>
                )}
            </nav>
        </div>
     );
}

export default NavLinkLayout;
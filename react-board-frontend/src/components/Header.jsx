import { Link } from "react-router-dom";

function Header(){
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/list" reloadDocument>Navbar</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#!">Home</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;
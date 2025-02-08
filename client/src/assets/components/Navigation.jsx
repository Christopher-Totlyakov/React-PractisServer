import { Link } from "react-router-dom";

export function Navigation(){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
        </nav>
    );
}
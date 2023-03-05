import { Link } from '@remix-run/react';

export const NavBar = () => {
    return (
        <div className="nav-bar">
            <div className="logo">
                <Link to="/">
                    <span>LD.DEV</span>
                </Link>
            </div>
            <div className="links">
                <ul>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link to="/posts">Work</Link>
                    </li>
                    <li>
                        <Link to="/posts">Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

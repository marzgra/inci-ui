import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import Search from "../search/Search";

const Header = () => {
    return (
        <div className="Header">
            <Link className='text-link' to="/">
                INCI Info
            </Link>

            <Search/>

            <Link className='btn-link' to="/analyze">Analizuj</Link>
        </div>
    );
};

export default Header;

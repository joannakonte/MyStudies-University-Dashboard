import React, { useState } from 'react';
import {  HiUserCircle, HiHome, HiArrowRightOnRectangle } from "react-icons/hi2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
    const ekpaLogo = '/ekpa-logo.png';
    const myStudiesLogo = '/mystudies-logo.png';
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (

        <div className='Header'>
            <ul className="logo-container">
                <li>
                    <a href="/">
                        <img src={myStudiesLogo} alt="MyStudies Logo" className="my-studies-logo" />
                    </a>
                </li>
                <li>
                    <a href="https://www.uoa.gr">
                        <img src={ekpaLogo} alt="EKPA Logo" className="ekpa-logo" />
                    </a>
                </li>
            </ul>
            <div className="horizontal-line"></div>
            <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-toggle">
                <div className="circle">AK</div>
                    <div className="button-text">
                        <span>Άννα Κοσμίδη</span>
                        <span className='id'>sdi2000107</span>
                    </div>
                    <FontAwesomeIcon icon={faBars} className="menu-icon"/>
                </button>
                {dropdownOpen && (
                <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                    <a className='profile' href="/"><HiUserCircle/> Προφίλ</a>
                    <a className='logout' href="/"><HiArrowRightOnRectangle/>Αποσύνδεση</a>
                    <a className='home-page' href="/"><HiHome/>Αρχική</a>
                </div>
                )}
            </div>
        </div>

    );
}

export default Header;

import React, { useState } from 'react';
import { HiUserCircle, HiHome, HiArrowRightOnRectangle } from "react-icons/hi2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css'; // Updated import statement

function Header() {
    const ekpaLogo = '/ekpa-logo.png';
    const myStudiesLogo = '/mystudies-logo.png';
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className={styles.Header}>
            <ul className={styles['logo-container']}>
                <li>
                    <a href="/">
                        <img src={myStudiesLogo} alt="MyStudies Logo" className={styles['my-studies-logo']} />
                    </a>
                </li>
                <li>
                    <a href="https://www.uoa.gr">
                        <img src={ekpaLogo} alt="EKPA Logo" className={styles['ekpa-logo']} />
                    </a>
                </li>
            </ul>
            <div className={styles['horizontal-line']}></div>
            <div className={styles.dropdown}>
                <button onClick={toggleDropdown} className={styles['dropdown-toggle']}>
                    <div className={styles.circle}>AK</div>
                    <div className={styles['button-text']}>
                        <span>Άννα Κοσμίδη</span>
                        <span className={styles.id}>sdi2000107</span>
                    </div>
                    <FontAwesomeIcon icon={faBars} className={styles['menu-icon']}/>
                </button>
                {dropdownOpen && (
                    <div className={`${styles['dropdown-content']} ${dropdownOpen ? styles.show : ''}`}>
                        <a className={styles.profile} href="/"><HiUserCircle/> Προφίλ</a>
                        <a className={styles.logout} href="/"><HiArrowRightOnRectangle/>Αποσύνδεση</a>
                        <a className={styles['home-page']} href="/"><HiHome/>Αρχική</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;

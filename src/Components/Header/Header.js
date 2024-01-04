import React, { useState } from 'react';
import styles from './Header.module.css'; 
import items from "../../data/sidebarStudents.json"
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { HiUserCircle, HiHome, HiArrowRightOnRectangle } from "react-icons/hi2";
import { BiSolidUserCircle } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { HiBookOpen, HiDocumentText, HiMiniDocumentChartBar, HiClipboardDocumentList, HiChevronDown, HiChevronUp   } from "react-icons/hi2";

function Header() {
    const myStudiesLogo = '/mystudies-logo.png';
    const ekpaLogo = '/ekpa-logo.png';
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = items.find(item => currentPath.includes(item.path))

    const iconMap = {
        HiOutlineUserCircle: <HiUserCircle  />,
        HiBookOpen: <HiBookOpen  />,
        HiDocumentText: <HiDocumentText  />,
        HiMiniDocumentChartBar: <HiMiniDocumentChartBar  />,
        HiClipboardDocumentList: <HiClipboardDocumentList  />,
      };

    return(
        <div className={styles.grid_container}>
            {/* Logo My-Studies */}
            <div className={styles.item1}>
                <a href="/">
                    <img src={myStudiesLogo} alt="MyStudies Logo" className={styles['my-studies-logo']} />
                </a>
            </div>

            {/* Logo EKPA */}
            <div className={styles.item2}>
                <a href="https://www.uoa.gr" target="_blank" rel="noopener noreferrer">
                    <img src={ekpaLogo} alt="EKPA Logo" className={styles['ekpa-logo']} />
                </a>
            </div>

            {/* Breadcrumb */}
            <div className={styles.item3}>
                <div className={styles.breadcrumb}>
                    <Breadcrumb />
                </div>
            </div>  

            {/* Profile */}
            <div className={styles.item4}>
                <div className={styles.profile}>
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
            </div>

            {/* Page Title */}
            <div className={styles.item5}>
                <div className={styles.page_title}>
                    {/* Title */}
                    <span className={styles.icon}>
                        {iconMap[currentPage.icon]}
                    </span>

                    {/* Icon */}
                    <span className={styles.title}>
                        {currentPage ? currentPage.title : 'Default Title'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Header;

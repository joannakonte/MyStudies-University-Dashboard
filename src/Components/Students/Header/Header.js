import React, { useState } from 'react';
import style from './Header.module.css'; 
import items from "../../../data/allPages.json";
import { useLocation } from 'react-router-dom';
import { HiOutlineUserCircle, HiMiniDocumentChartBar } from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle, faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
// import Breadcrumb from '../../Breadcrumb/Breadcrumb';

// Function to match paths with dynamic segments
function matchPath(currentPath, definedPath) {
    const currentSegments = currentPath.split('/');
    const definedSegments = definedPath.split('/');

    if (currentSegments.length !== definedSegments.length) {
        return false;
    }

    for (let i = 0; i < currentSegments.length; i++) {
        if (definedSegments[i] !== currentSegments[i] && !definedSegments[i].startsWith(':')) {
            return false;
        }
    }

    return true;
}


function Header() {
    const myStudiesLogo = '/mystudies-logo.png';
    const ekpaLogo = '/ekpa-logo.png';

    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = items.find(item => matchPath(currentPath, item.path));

    // console.log('currentPage:', currentPage);
    // console.log('currentPath:', currentPath);

    const iconMap = {
        HiOutlineUserCircle: <HiOutlineUserCircle />,
        HiMiniDocumentChartBar: <HiMiniDocumentChartBar />,
    };

    const user = {
        name: 'Άννα Κοσμίδη',
        username: 'sdi2000107',
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return(
        <div className={style.grid_container}>

            {/* Logo My-Studies & EKPA */}
            <div className={style.item1}>
                <a href="/">
                    <img src={myStudiesLogo} alt="MyStudies Logo" className={style['my-studies-logo']} />
                </a>
                <a href="https://www.uoa.gr" target="_blank" rel="noopener noreferrer">
                    <img src={ekpaLogo} alt="EKPA Logo" className={style['ekpa-logo']} />
                </a>
                {/* Logo My-Studies */}
            </div>

            {/* Breadcrumb */}
            <div className={style.item2}>
                <div className={style.breadcrumb}>
                    <Breadcrumb />
                    {/* <Breadcrumb currentPath={currentPath} /> */}
                </div>
                {/* Breadcrumb */}
            </div>  

            {/* Profile */}
            <div className={style.item3}>
                <div className={style.profile}>
                    <div className={style.dropdown}>
                        <button onClick={toggleDropdown} className={style['dropdown-toggle']}>
                            <div className={style.circle}>
                                {/* Display the avatar image if available, otherwise use initials */}
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="User Avatar" />
                                ) : (
                                    <div className={style.avatarInitials}>
                                        {user.name.substring(0, 1)}
                                        {user.name.split(' ')[1].substring(0, 1)}
                                    </div>
                                )}
                            </div>
                            <div className={style['button-text']}>
                                <span>{user.name}</span>
                                <span className={style.id}>{user.username}</span>
                            </div>
                            <FontAwesomeIcon icon={faBars} className={style['menu-icon']} />
                        </button>
                        {dropdownOpen && (
                            <div className={`${style['dropdown-content']} ${dropdownOpen ? style.show : ''}`}>
                                <a className={style.profile} href="/"><FontAwesomeIcon icon={faUserCircle} /> Προφίλ</a>
                                <a className={style.logout} href="/"><FontAwesomeIcon icon={faArrowRight} /> Αποσύνδεση</a>
                                <a className={style['home-page']} href="/"><FontAwesomeIcon icon={faHome} /> Αρχική</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Page Title */}
            <div className={style.item4}>
                <div className={style.page_title}>
                    <span className={style.icon}>
                        {iconMap[currentPage.icon]}
                    </span>

                    <span className={style.title}>
                        {currentPage ? currentPage.title : 'Default Title'}
                    </span>
                </div> 
            </div>
        </div>
    );
}

export default Header;

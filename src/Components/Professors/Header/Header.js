import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css'; 
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import items from "../../../data/allPages.json";
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaSearch, FaRegWindowRestore  } from "react-icons/fa";
import { HiBookOpen, HiDocumentText, HiAcademicCap, HiQuestionMarkCircle, HiHome } from 'react-icons/hi'; 
import { VscSignOut } from "react-icons/vsc";


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

    const iconMap = {
        HiOutlineUserCircle: <HiOutlineUserCircle />,
        HiBookOpen: <HiBookOpen />,
        HiDocumentText: <HiDocumentText />,
        HiAcademicCap: <HiAcademicCap />,
        FaRegWindowRestore: <FaRegWindowRestore />,
        HiQuestionMarkCircle: <HiQuestionMarkCircle />,
        FaSearch: <FaSearch />
    };

    const [user, setUser] = useState({ firstname: '', lastname: '', sdi: '' });

    useEffect(() => {
        // Retrieve data from local storage
        const storedUserDataJSON = localStorage.getItem('userData');

        // Parse the JSON string to get the original object
        const storedUserData = JSON.parse(storedUserDataJSON);

        // Extract firstname, lastname, and other properties if needed
        const { firstname, lastname, sdi } = storedUserData || {};

        // Set the user data to the state
        setUser({ firstname, lastname, sdi });
    }, []);


    // Check if user has the expected shape
    const isUserValid = user && user.firstname && user.lastname && user.sdi;

    // Create a variable for the first letter of firstname
    const firstLetterFirst = isUserValid ? user.firstname.charAt(0) : '';
    const firstLetterLast = isUserValid ? user.lastname.charAt(0) : '';


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage and redirect to the login page
        localStorage.clear();
        navigate('/');
    };

    return(
        <div className={style.grid_container}>

            {/* Logo My-Studies & EKPA */}
            <div className={style.item1}>
                <Link to="/">
                    <img src={myStudiesLogo} alt="MyStudies Logo" className={style['my-studies-logo']} />
                </Link>
                <a href="https://www.uoa.gr" target="_blank" rel="noopener noreferrer">
                    <img src={ekpaLogo} alt="EKPA Logo" className={style['ekpa-logo']} />
                </a>
            </div>

            {/* Breadcrumb */}
            <div className={style.item2}>
                <div className={style.breadcrumb}>
                    <Breadcrumb />
                </div>
            </div>  

            

            {/* Profile */}
            <div className={style.item3}>
                <div className={style.dropdown_profile}>
                    <div className={style.dropdown}>
                        <button className={style['dropdown-toggle']}>
                            <div className={style.circle}>
                                {firstLetterFirst}{firstLetterLast}
                            </div>

                            <div className={style['button-text']}>
                                <span>{user.firstname} {user.lastname}</span>
                                <span className={style.id}>{user.sdi}</span>
                            </div>

                            <FontAwesomeIcon icon={faBars} className={style['menu-icon']} />
                        </button>

                        <div className={style['dropdown-content']}>
                            <Link className={style['dropdown-option']} to="/home"><HiHome className={style.dropdownIcons} /> 
                                Αρχική
                            </Link>

                            <Link to='/home/professor-profile' className={style['dropdown-option']}><HiOutlineUserCircle className={style.dropdownIcons} />
                                Προφίλ
                            </Link>

                            <Link to="/home/professor-faq" className={style['dropdown-option']}><HiQuestionMarkCircle className={style.dropdownIcons} /> 
                                Συχνές Ερωτήσεις
                            </Link>

                            <a className={style['dropdown-option']} onClick={handleLogout}><VscSignOut className={style.dropdownIcons} /> Αποσύνδεση</a>
                            
                        </div>
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

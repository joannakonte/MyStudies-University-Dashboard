import React from 'react';
import style from './Sidebar.module.css';
import { HiHome, HiQuestionMarkCircle, HiOutlineUserCircle, HiBookOpen, HiDocumentText, HiAcademicCap  } from 'react-icons/hi'; 
import { VscSignOut } from "react-icons/vsc";
import { FaSearch, FaRegWindowRestore  } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = ({ currentPath  }) => {
    return (
    <div className={style.wrapper}>
        <div className={style.department}>
            <div className={style.dep_title}>
                <h1 className={style.title}>Τμήμα Πληροφορικής</h1>
                <h1 className={style.title}>και Τηλεπικοινωνιών</h1>
            </div>
        </div>

        <div className={style.menu}>
            <div id="mySidenav" className={style.sidenav}>
                <a
                    href="/home/profile"
                    className={currentPath  === '/home/profile' ? style.selected : ''}
                    >
                    <HiOutlineUserCircle /> Προφίλ
                </a>
                <a
                    href="/home/classes"
                    className={currentPath  === '/home/classes' ? style.selected : ''}
                    >
                    <HiBookOpen /> Μαθήματα
                </a>
                    <Link
                        to="/home/history-applications"
                        className={currentPath.startsWith('/home/history-applications') ? style.selected : ''}
                    >
                    <HiDocumentText /> Δηλώσεις Μαθημάτων
                </Link>
                <a
                    href="/home/grades"
                    className={currentPath  === '/home/grades' ? style.selected : ''}
                    >
                    <HiAcademicCap /> Βαθμολογίες
                </a>
                <a
                    href="/home/certificates"
                    className={currentPath  === '/home/certificates' ? style.selected : ''}
                    >
                    <FaRegWindowRestore  /> Πιστοποιητικά
                </a>
            </div>
        </div>
    </div>
    );
};

export default Sidebar;
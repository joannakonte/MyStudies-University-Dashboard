import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const ekpaLogo = '/ekpa-logo.png';
    const myStudiesLogo = '/mystudies-logo.png';

    return (
        <footer className={styles.footer}>
            {/* Column 1 */}
            <div className={styles.section}>
                <div className={styles.column}>
                    <ul className={styles['logo-container']}>
                        <li>
                            <a href="/">
                            <img src={myStudiesLogo} alt="MyStudies Logo" className={styles['my-studies-logo']} />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.uoa.gr" target="_blank" rel="noopener noreferrer">
                                <img src={ekpaLogo} alt="EKPA Logo" className={styles['ekpa-logo']} />
                            </a>
                        </li>
                    </ul>

                    <div>
                        <p className={styles.copy}>&copy; 2023 my-studies.uoa.gr</p>
                    </div>
                </div>
            </div>

            {/* Column 2 */}
            <div className={styles.section}>
                <div className={styles.column}>
                    <p>Χρήσιμα Links</p>
                    <ul className={styles['useful-links']}>
                        <li>
                            <a href="#services">Υπηρεσίες</a>
                        </li>
                        <li>
                            <a href="#studyProgram">Πρόγραμμα Σπούδων</a>
                        </li>
                        <li>
                        <a href="#contact">Επικοινωνία</a>
                        </li>
                        <li>
                            <a href="#otherServices">Αλλες Υπηρεσίες ΕΚΠΑ</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Column 3 */}
            <div className={styles.section}>
                <div className={styles.column}>
                    <p>Υπηρεσίες</p>
                    <ul className={styles['useful-links']}>
                        <li>
                            <a href="https://www.uoa.gr/" target="_blank" rel="noopener noreferrer">ΕΚΠΑ</a>
                        </li>
                        <li>
                            <a href="https://eclass.uoa.gr/" target="_blank" rel="noopener noreferrer">ή-Τάξη</a>
                        </li>
                        <li>
                            <a href="https://delos.uoa.gr/opendelos/" target="_blank" rel="noopener noreferrer">Δήλος</a>
                        </li>
                        <li>
                            <a href="https://eudoxus.gr/" target="_blank" rel="noopener noreferrer">Εύδοξος</a>
                        </li>
                        <li>
                            <a href="https://webmail.noc.uoa.gr/src/login.php" target="_blank" rel="noopener noreferrer">Webmail</a>
                        </li>
                    </ul>
                </div>
            </div>

            

            
        </footer>

    );
};

export default Footer;
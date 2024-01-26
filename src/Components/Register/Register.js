import React, { useState } from 'react';
import RegisterStudent from './RegisterStudent';
import RegisterProfessor from './RegisterProfessor'; 
import styles from './Register.module.css'; 
import Navbar from '../Home/NavbarRegister';
import Footer from '../Home/Footer';


function Register() {
    const [selectedForm, setSelectedForm] = useState('student');

    const handleFormChange = (formType) => {
        setSelectedForm(formType);
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className={styles.container}> 
                <h2 className={styles.register}>Θέλω να εγγραφώ ως</h2>
                <div className={styles.buttonsContainer}>
                    <button
                        className={`${styles.button} ${selectedForm === 'student' ? styles.activeButton : ''}`}
                        onClick={() => handleFormChange('student')}
                    >
                        Φοιτητής
                    </button>
                    <button
                        className={`${styles.button} ${selectedForm === 'professor' ? styles.activeButton : ''}`}
                        onClick={() => handleFormChange('professor')}
                    >
                        Καθηγητής
                    </button>
                </div>

                {selectedForm === 'student' && <RegisterStudent/>}
                {selectedForm === 'professor' && <RegisterProfessor/>}
            </div>

            <Footer />
            
        </div>
    );
}

export default Register;

import React, { useState } from 'react';
import styles from './RegisterProfessor.module.css'; 

function RegisterProfessor() {    

    return (
    <div> 
        <form>
            <h2>Στοιχεία Φοιτητή</h2>
            <label>
                <div className={styles.labelText}>Τμήμα:</div>
                <input name="department" value="Τμήμα Πληροφορικής και Τηλεποικοινωνιών" className={styles.departmentField} readonly/>
            </label>

            <label>
                <div className={styles.labelText}>Ηλεκτρονικό Ταχυδρομείο:</div>
                <input type="email" name="email" placeholder="Ηλεκτρονικό Ταχυδρομείο" className={styles.inputField}/>
            </label>
            <div className={styles.formContainer}>
                <div className={styles.column1}>  
                    <label>
                        <div className={styles.labelText}>Αριθμός Μητρώου</div>
                        <input type="text" name="name" placeholder="Αριθμός Μητρώου" className={styles.inputField}/>
                    </label>
                </div>
                <div className={styles.column2}>  
                    <label>
                        <div className={styles.labelText}>Ημερομηνία Εγγραφής</div>
                        <input type="date" name="signupDate" className={styles.inputField}/>
                    </label>
                </div>
            </div>
        </form>
    </div>
    );
}

export default RegisterProfessor;

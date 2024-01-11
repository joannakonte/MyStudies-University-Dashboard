import React, { useState } from 'react';
import styles from './RegisterStudent.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


function RegisterStudent() {
    const [maritalStatus, setMaritalStatus] = useState("role"); 
    const [gender, setGender] = useState("gender"); 

    return (
        <div> 
            <form>
                <h2>Προσωπικά Στοιχεία</h2>
                
                <div className={styles.formContainer}>
                    {/* Column 1 */}
                    <div className={styles.column1}>  
                        <label>
                            <div className={styles.labelText}>Όνομα:</div>
                            <input type="text" name="name" placeholder="Όνομα" className={styles.inputField}/>
                        </label>

                        <label>
                            <div className={styles.labelText}>Όνομα Πατέρα:</div>
                            <input type="text" name="fathername" placeholder="Όνομα Πατέρα" className={styles.inputField} />
                        </label>

                        {/* Datepicker */}
                        <label>
                            <div className={styles.labelText}>Ημερομηνία Γέννησης:</div>
                            <input type="date" name="birthdate" className={styles.inputField} />
                        </label>

                        <div className={styles.maritalStatus}>
                            <label> 
                                <div className={styles.labelText}>Οικογενειακή Κατάσταση:</div>
                            </label> 
                            <div className={styles.selectWrapper}>
                                <select value={maritalStatus} className={styles['dropdown-select']} onChange={(e) => setMaritalStatus(e.target.value)}> 
                                    <option value="role">Role</option> 
                                    <option value="individual">Individual</option> 
                                    <option value="business">Business</option> 
                                </select>
                                <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
                            </div>
                        </div>

                        <label>
                            <div className={styles.labelText}>Αριθμός Ταυτότητας:</div>
                            <input type="text" name="idnumber" placeholder="Αριθμός Ταυτότητας" className={styles.inputField}/>
                        </label>
                    </div>

                    {/* Column 2 */}
                    <div className={styles.column2}>
                        <label>
                            <div className={styles.labelText}>Επώνυμο: </div>
                            <input type="text" name="surname " placeholder="Επώνυμο"className={styles.inputField} />
                        </label>

                        <label>
                            <div className={styles.labelText}>Όνομα Μητέρας:</div>
                            <input type="text" name="mothername" placeholder="Όνομα Μητέρας" className={styles.inputField} />
                        </label>

                        <label>                           
                            <div className={styles.labelText}>Πόλη - Τόπος Γέννησης:</div>
                            <input type="text" name="birthplace" placeholder="Πόλη - Τόπος Γέννησης" className={styles.inputField}/>
                        </label>

                        <div className={styles.gender}>
                            <label>            
                                <div className={styles.labelText}>Φύλο:</div>
                            </label> 
                            <div className={styles.selectWrapper}>
                                <select value={gender} className={styles['dropdown-select']} onChange={(e) => setGender(e.target.value)}> 
                                    <option value="gender">Φύλο</option> 
                                    <option value="female">Θηλύ</option> 
                                    <option value="male">Άρρεν</option> 
                                    <option value="other">Άλλο</option> 
                                </select>
                                <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
                            </div>
                        </div>

                        <label>
                            <div className={styles.labelText}>ΑΜΚΑ:</div>
                            <input type="text" name="amka" placeholder="ΑΜΚΑ" className={styles.inputField}/>
                        </label>
                    </div>
                </div>
                <label>          
                    <div className={styles.labelText}>Διεύθυνση (Οδός, Νούμερο, Πόλη):</div>
                    <input type="text" name="address" placeholder="Διεύθυνση" className={styles.inputField}/>
                </label>
                <label>
                    <div className={styles.labelText}>Τήλέφωνο Επικοινωνίας:</div>
                    <input type="text" name="phonenumber" placeholder="Τήλέφωνο Επικοινωνίας" className={styles.inputPhoneNumber}/>
                </label>
            </form>
        </div>
    );
}

export default RegisterStudent;

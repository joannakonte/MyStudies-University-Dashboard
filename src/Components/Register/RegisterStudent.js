import React, { useState } from 'react';
import styles from './RegisterStudent.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const PasswordErrorMessage = () => { 
    return ( 
      <h className={styles.passwordError}>Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 8 χαρακτήρες.</h> 
    ); 
}; 

function RegisterStudent() {
    const [maritalStatus, setMaritalStatus] = useState("role"); 
    const [gender, setGender] = useState("gender"); 
    const [password, setPassword] = useState({ 
        value: "", 
        isTouched: false, 
    }); 

    return (
        <div> 
            <form>
                <div className={styles.formContainer}>
                    <div className={styles.personalDetailsContainer}>
                        <h2 className={styles.title}>Προσωπικά Στοιχεία</h2>

                        <div className={styles.columns}>
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
                                            <option value="role">Οικογενειακή Κατάσταση</option> 
                                            <option value="individual">Άγαμος-η</option> 
                                            <option value="business">Παντρεμένος-η</option> 
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
                    </div>

                    {/* Στοιχεία Φοιτητή */}
                    <div className={styles.studentDetailsContainer}>
                        <h2 className={styles.title} >Στοιχεία Φοιτητή</h2>
                        <label>
                            <div className={styles.labelText}>Τμήμα:</div>
                            <input name="department" value="Τμήμα Πληροφορικής και Τηλεποικοινωνιών" className={styles.departmentField} readonly/>
                        </label>

                        <label>
                            <div className={styles.labelText}>Ηλεκτρονικό Ταχυδρομείο:</div>
                            <input type="email" name="email" placeholder="Ηλεκτρονικό Ταχυδρομείο" className={styles.inputField}/>
                        </label>

                        <div className={styles.columns}>
                            {/* Column 1 */}
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
                    </div>

                    {/* Κωδικός Πρόσβασης */}
                    <div className={styles.passwordContainer}>
                        <h2 className={styles.title}>Κωδικός Πρόσβασης</h2>
                        <label> 
                            <div className={styles.labelText}>
                                Κωδικός <sup>*</sup> 
                            </div>
                        </label> 
                        <input 
                            className={styles.inputField}
                            value={password.value} 
                            type="password" 
                            onChange={(e) => { 
                            setPassword({ ...password, value: e.target.value }); 
                            }} 
                            onBlur={() => { 
                            setPassword({ ...password, isTouched: true }); 
                            }} 
                            placeholder="Κωδικός" 
                        /> 
                        {password.isTouched && password.value.length < 8 ? ( 
                            <PasswordErrorMessage /> 
                        ) : null} 

                        <label> 
                            <div className={styles.labelText}>
                                Επαλήθευση Κωδικού <sup>*</sup> 
                            </div>
                        </label> 
                        <input 
                            className={styles.inputField}
                            value={password.value} 
                            type="password" 
                            onChange={(e) => { 
                            setPassword({ ...password, value: e.target.value }); 
                            }} 
                            onBlur={() => { 
                            setPassword({ ...password, isTouched: true }); 
                            }} 
                            placeholder="Επαλήθευση Κωδικού" 
                        /> 
                        {password.isTouched && password.value.length < 8 ? ( 
                            <PasswordErrorMessage /> 
                        ) : null} 
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterStudent;

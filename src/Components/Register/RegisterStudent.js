import React, { useState } from 'react';
import styles from './RegisterStudent.module.css'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RegisterStudent() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [maritalStatus, setMaritalStatus] = useState("role"); 
    const [gender, setGender] = useState("gender"); 

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div> 
            <form>
                <h2>Προσωπικά Στοιχεία</h2>
                
                <div className={styles.formContainer}>
                    {/* Column 1 */}
                    <div className={styles.column1}>  
                        <label>
                            Όνομα:
                            <input type="text" name="name" />
                        </label>

                        <label>
                            Όνομα Πατέρα:
                            <input type="text" name="fathername" />
                        </label>

                        {/* Datepicker */}
                        <label>
                            Ημερομηνία Γέννησης:
                            <DatePicker selected={selectedDate} onChange={handleDateChange} />
                        </label>

                        <div className={styles.maritalStatus}>
                            <label> 
                                Οικογενειακή Κατάσταση:
                            </label> 
                            <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}> 
                                <option value="role">Role</option> 
                                <option value="individual">Individual</option> 
                                <option value="business">Business</option> 
                            </select>
                        </div>

                        <label>
                            Αριθμός Ταυτότητας:
                            <input type="text" name="idnumber" />
                        </label>
                    </div>

                    {/* Column 2 */}
                    <div className={styles.column2}>
                        <label>
                            Επώνυμο:
                            <input type="text" name="surname" />
                        </label>

                        <label>
                            Όνομα Μητέρας:
                            <input type="text" name="mothername" />
                        </label>

                        <div className={styles.gender}>
                            <label> 
                                Φύλο:
                            </label> 
                            <select value={gender} onChange={(e) => setGender(e.target.value)}> 
                                <option value="gender">Φύλο</option> 
                                <option value="female">Θηλύ</option> 
                                <option value="male">Άρρεν</option> 
                                <option value="other">Άλλο</option> 
                            </select>
                        </div>

                        <label>
                            Πόλη - Τόπος Γέννησης:
                            <input type="text" name="birthplace" />
                        </label>

                        <label>
                            ΑΜΚΑ:
                            <input type="text" name="amka" />
                        </label>
                    </div>
                </div>
                <label>
                    Διεύθυνση (Οδός, Νούμερο, Πόλη):
                    <input type="text" name="address" />
                </label>
                <label>
                    Τήλέφωνο Επικοινωνίας:
                    <input type="text" name="phonenumber" />
                </label>
            </form>
        </div>
    );
}

export default RegisterStudent;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterStudent.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import { findStudentById } from '../DataTable/DataTableUtils';

function RegisterProfessor() {    
    const navigate = useNavigate();
    const [firstname, setFirstName] = useState(""); 
    const [fathername, setFatherName] = useState(""); 
    const [birthday, setBirthday] = useState(""); 
    const [maritalstatus, setMaritalStatus] = useState("maritalstatus"); 
    const [AT, setAT] = useState(""); 
    const [lastname, setLastName] = useState("");
    const [mothername, setMotherName] = useState(""); 
    const [birthplace, setBirthplace] = useState(""); 
    const [gender, setGender] = useState("gender");
    const [AMKA, setAMKA] = useState("");    
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [division, setDivision] = useState("");
    const [email, setEmail] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [position, setPosition] = useState(""); 
    const [registrationdate, setRegistrationDate] = useState(""); 
    const [officeNumber, setOfficeNumber] = useState(""); 
    const [rank, setRank] = useState("rank"); 
    const [currentClass, setCurrentClass] = useState('');
    const [classes, setClasses] = useState([]);
    const handleCurrentClassChange = (e) => {
        setCurrentClass(e.target.value);
    };

    // Add class to the list
    const addClass = () => {
        if (currentClass.trim()) {
            setClasses([...classes, currentClass]);
            setCurrentClass(''); // Clear the input field after adding
        }
    };

    const removeClass = (indexToRemove) => {
        setClasses(classes.filter((_, index) => index !== indexToRemove));
        console.log("Class removed at index:", indexToRemove);
    };
    
    const [password, setPassword] = useState("");
    const [passwordVerification, setPasswordVerification] = useState(""); 

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordVerification, setShowPasswordVerification] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const togglePasswordVerificationVisibility = () => {
        setShowPasswordVerification(!showPasswordVerification);
    };
    
    const isFormValid = () => { 
        if (!firstname || !lastname || !fathername || !mothername || !username) {
            return "Παρακαλώ συμπληρώστε τα υποχρεωτικά πεδία.";
        }
        else if(password.length < 8){
            return "Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 8 χαρακτήρες.";
        }
        else if(password !== passwordVerification){
            return "Οι κωδικοί πρόσβασης δεν ταιριάζουν.";
        }
        return ""; // No error
    }; 
    
    async function handleRegister(e){
        e.preventDefault();

        // This object represents the user's form that it will be saved in our database.
        const professorId = await findStudentById();
        const docUser = {
            type: "professor",
            firstname: firstname,
            lastname: lastname,
            email: email,
            department: "Τμήμα Πληροφορικής και Τηλεποικοινωνιών",
            sdi: username,
            password: password,
            fathername: fathername,
            mothername: mothername,
            birthday: birthday,
            maritalstatus: maritalstatus,
            gender: gender,
            birthplace: birthplace,
            AT: AT,
            AMKA: AMKA,
            address: address,
            phone: phone,
            position, position,
            rank: rank,
            division: division,
            office: officeNumber,
            classes: classes
        };


        try{
            console.log('Attempting register professor:', firstname);
            if (!db) {
                console.error('Firestore database instance is not available.');
                return;
            }

            const col_ref = collection(db, "students");
            const res_user = await addDoc(col_ref, docUser); 

            // Redirect to login route
            navigate('/home/login');

        } catch (error) {
            console.error('Registration error:', error.message);
        }
    }

    return (
    <div> 
        <form>
            <div className={styles.formContainer}>
                {/* Προσωπικά Στοιχεία */}
                <div className={styles.personalDetailsContainer}>
                    <h2 className={styles.title}>Προσωπικά Στοιχεία</h2>
                    <hr className={styles.titleSeparator} />

                    <div className={styles.columns}>
                        {/* Column 1 */}
                        <div className={styles.column1}>  
                            <label>
                                <div className={styles.labelText}>Όνομα: <sup>*</sup></div>
                                <input 
                                    value={firstname} 
                                    onChange={(e) => { 
                                        setFirstName(e.target.value); 
                                    }}
                                    type="text" 
                                    name="firstname" 
                                    placeholder="Όνομα" 
                                    className={styles.inputField}
                                />
                            </label>

                            <label>
                                <div className={styles.labelText}>Όνομα Πατέρα: <sup>*</sup></div>
                                <input 
                                    value={fathername} 
                                    onChange={(e) => { 
                                        setFatherName(e.target.value); 
                                    }}
                                    type="text" 
                                    name="fathername" 
                                    placeholder="Όνομα Πατέρα" 
                                    className={styles.inputField} 
                                />
                            </label>

                            <label>
                                <div className={styles.labelText}>Ημερομηνία Γέννησης: <sup>*</sup></div>
                                <input 
                                    value={birthday} 
                                    onChange={(e) => { 
                                        setBirthday(e.target.value); 
                                    }}
                                    type="date" 
                                    name="birthday" 
                                    className={styles.dateField} 
                                />
                            </label>

                            <div className={styles.maritalStatus}>
                                <label> 
                                    <div className={styles.labelText}>Οικογενειακή Κατάσταση:</div>
                                </label> 
                                <div className={styles.selectWrapper}>
                                    <select value={maritalstatus} className={styles['dropdown-select']} onChange={(e) => setMaritalStatus(e.target.value)}> 
                                        <option value="Οικογενειακή Κατάσταση">Οικογενειακή Κατάσταση</option> 
                                        <option value="Άγαμος-η">Άγαμος-η</option> 
                                        <option value="Παντρεμένος-η">Παντρεμένος-η</option> 
                                    </select>
                                    <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
                                </div>
                            </div>

                            <label>
                                <div className={styles.labelText}>Αριθμός Ταυτότητας:</div>
                                <input 
                                    value={AT} 
                                    onChange={(e) => { 
                                        setAT(e.target.value); 
                                    }}
                                    type="text" 
                                    name="AT" 
                                    placeholder="Αριθμός Ταυτότητας" 
                                    className={styles.inputField}
                                />
                            </label>
                        </div>

                        {/* Column 2 */}
                        <div className={styles.column2}>
                            <label>
                                <div className={styles.labelText}>Επώνυμο: <sup>*</sup></div>
                                <input 
                                    value={lastname} 
                                    onChange={(e) => { 
                                        setLastName(e.target.value); 
                                    }}
                                    type="text" 
                                    name="lastname" 
                                    placeholder="Επώνυμο"
                                    className={styles.inputField} 
                                />
                            </label>

                            <label>
                                <div className={styles.labelText}>Όνομα Μητέρας: <sup>*</sup></div>
                                <input 
                                    value={mothername} 
                                    onChange={(e) => { 
                                        setMotherName(e.target.value); 
                                    }}
                                    type="text" 
                                    name="mothername" 
                                    placeholder="Όνομα Μητέρας" 
                                    className={styles.inputField} 
                                />
                            </label>

                            <label>                           
                                <div className={styles.labelText}>Πόλη - Τόπος Γέννησης:</div>
                                <input 
                                    value={birthplace} 
                                    onChange={(e) => { 
                                        setBirthplace(e.target.value); 
                                    }}
                                    type="text" 
                                    name="birthplace" 
                                    placeholder="Πόλη - Τόπος Γέννησης" 
                                    className={styles.inputField}
                                />
                            </label>

                            <div className={styles.gender}>
                                <label>            
                                    <div className={styles.labelText}>Φύλο:</div>
                                </label> 
                                <div className={styles.selectWrapper}>
                                    <select value={gender} className={styles['dropdown-select']} onChange={(e) => setGender(e.target.value)}> 
                                        <option value="Φύλο">Φύλο</option> 
                                        <option value="Θηλύ">Θηλύ</option> 
                                        <option value="Άρρεν">Άρρεν</option> 
                                        <option value="Άλλο">Άλλο</option> 
                                    </select>
                                    <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
                                </div>
                            </div>
                            <label>
                                <div className={styles.labelText}>ΑΜΚΑ:</div>
                                <input 
                                    value={AMKA} 
                                    onChange={(e) => { 
                                        setAMKA(e.target.value); 
                                    }}
                                    type="text" 
                                    name="AMKA" 
                                    placeholder="ΑΜΚΑ" 
                                    className={styles.inputField}
                                />
                            </label>
                            </div>
                        </div>
                        <label>          
                            <div className={styles.labelText}>Διεύθυνση (Οδός, Νούμερο, Πόλη):</div>
                            <input 
                                value={address} 
                                onChange={(e) => { 
                                    setAddress(e.target.value); 
                                }}
                                type="text" 
                                name="address" 
                                placeholder="Διεύθυνση" 
                                className={styles.inputField}
                            />
                        </label>
                        <label>
                            <div className={styles.labelText}>Τήλέφωνο Επικοινωνίας:</div>
                            <input 
                                value={phone} 
                                onChange={(e) => { 
                                    setPhone(e.target.value); 
                                }}
                                type="text" 
                                name="phone" 
                                placeholder="Τήλέφωνο Επικοινωνίας" 
                                className={styles.inputPhoneNumber}
                            />
                        </label>
                    </div>
                    {/* Στοιχεία Καθηγητή */}
                    <div className={styles.studentDetailsContainer}>
                        <h2 className={styles.title}>Στοιχεία Καθηγητή</h2>
                        <hr className={styles.titleSeparator} />

                        <label>
                            <div className={styles.labelText}>Τμήμα:</div>
                            <input 
                                name="department" 
                                defaultValue="Τμήμα Πληροφορικής και Τηλεποικοινωνιών"
                                className={styles.departmentField} 
                            />
                        </label>

                        <label>
                            <div className={styles.labelText}>Ιδιότητα:</div>
                            <input 
                                value={position}
                                onChange={(e) => { 
                                    setPosition(e.target.value); 
                                }}
                                type="text" 
                                name="position" 
                                placeholder="Ιδιότητα" 
                                className={styles.inputField} 
                            />
                        </label>

                        <div className={styles.positionStatus}>
                                <label> 
                                    <div className={styles.labelText}>Βαθμίδα</div>
                                </label> 
                                <div className={styles.selectWrapper}>
                                    <select value={rank} className={styles['dropdown-select']} onChange={(e) => setRank(e.target.value)}> 
                                        <option value="professor">Καθηγητής/τρια</option> 
                                        <option value="associate professor">Αναπληρωτής/τρια Καθηγητής/τρια</option> 
                                        <option value="assistant professor">Επίκουρος/η Καθηγητής/τρια</option> 
                                        <option value="professor emeriti">Ομότιμος/η Καθηγητής/τρια</option> 
                                        <option value="retired professor">Αφυπηρετήσαν Καθηγητής/τρια</option> 
                                    </select>
                                    <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
                                </div>
                            </div>

                        <label>
                            <div className={styles.labelText}>Τομέας:</div>
                            <input 
                                value={division}
                                onChange={(e) => { 
                                    setDivision(e.target.value); 
                                }}
                                type="text" 
                                name="division" 
                                placeholder="Τομέας" 
                                className={styles.inputField} 
                            />
                        </label>

                        <label>
                            <div className={styles.labelText}>Κωδικός Μαθήματος:</div>
                            <input
                                type="text"
                                value={currentClass}
                                onChange={handleCurrentClassChange}
                                placeholder="Κωδικός Μαθήματος"
                                className={styles.inputField} 
                            />
                            <button type="button" onClick={addClass} className={styles.addClass}>Προσθήκη Μαθήματος</button>
                        </label>

                        {/* List of added classes */}
                        {classes.length > 0 && (
                            <div className={styles.listClass}> 
                                <ul>
                                    {classes.map((classItem, index) => (
                                        <li key={index}>
                                            {classItem}
                                            <button type="button" onClick={() => removeClass(index)} className={styles.removeButton}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <label>
                            <div className={styles.labelText}>Όνομα Χρήστη: <sup>*</sup></div>
                            <input 
                                value={username} 
                                onChange={(e) => { 
                                    setUsername(e.target.value); 
                                }}
                                type="text" 
                                name="username" 
                                placeholder="Όνομα Χρήστη" 
                                className={styles.inputField}
                            />
                        </label>

                        <label>
                            <div className={styles.labelText}>Ηλεκτρονικό Ταχυδρομείο:</div>
                            <input 
                                value={email} 
                                onChange={(e) => { 
                                    setEmail(e.target.value); 
                                }}
                                type="email" 
                                name="email" 
                                placeholder="Ηλεκτρονικό Ταχυδρομείο" 
                                className={styles.inputField}
                            />
                        </label>

                        <div className={styles.columns}>
                            {/* Column 1 */}
                            <div className={styles.column1}>
                                <label>
                                    <div className={styles.labelText}>Αριθμός Γραφείου</div>
                                    <input 
                                        value={officeNumber} 
                                        onChange={(e) => { 
                                            setOfficeNumber(e.target.value); 
                                        }}
                                        type="text" 
                                        name="office number" 
                                        placeholder="Αριθμός Γραφείου" 
                                        className={styles.inputField}
                                    />
                                </label>
                            </div>

                            <div className={styles.column2}>  
                                <label>
                                    <div className={styles.labelText}>Ημερομηνία Εγγραφής</div>
                                    <input 
                                        value={registrationdate} 
                                        onChange={(e) => { 
                                            setRegistrationDate(e.target.value); 
                                        }}
                                        type="date" 
                                        name="registrationdate" 
                                        className={styles.dateField}
                                    />
                                </label>
                            </div>
                        </div>

                </div>

                {/* Κωδικός Πρόσβασης */}
                <div className={styles.passwordContainer}>
                    <h2 className={styles.title}>Κωδικός Πρόσβασης</h2>
                    <hr className={styles.titleSeparator} />

                    <label>
                        <div className={styles.labelText}>
                        Κωδικός <sup>*</sup>
                        </div>
                    </label>
                    <input
                        className={styles.inputField}
                        value={password}
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Κωδικός"
                    />
                    <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                        {showPassword ? <HiEye /> : <HiEyeOff />}
                    </div>

                    <label> 
                        <div className={styles.labelText}>
                            Επαλήθευση Κωδικού <sup>*</sup> 
                        </div>
                    </label> 
                    <input 
                        className={styles.inputField}
                        value={passwordVerification} 
                        type={showPasswordVerification ? 'text' : 'password'}
                        onChange={(e) => {
                            setPasswordVerification(e.target.value);
                        }}
                        placeholder="Επαλήθευση Κωδικού" 
                    /> 
                    <div className={styles.eyeIcon} onClick={togglePasswordVerificationVisibility}>
                        {showPasswordVerification ? <HiEye /> : <HiEyeOff />}
                    </div> 
                </div>
                <div className={styles.buttonContainer}>
                    <Link to="/" className={styles.cancelButton}>
                        Ακύρωση
                    </Link>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            const validationResult = isFormValid();
                            if (validationResult) {
                                alert(validationResult);
                            } else {
                                handleRegister(e);
                            }
                        }}
                        className={styles.registerButton}
                    >
                        Εγγραφή
                    </button>
                </div>
            </div>
        </form>
    </div>
    );
}

export default RegisterProfessor;

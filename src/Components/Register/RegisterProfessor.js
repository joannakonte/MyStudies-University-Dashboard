import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RegisterProfessor() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [role, setRole] = useState("role"); 
    const handleDateChange = (date) => {
    setSelectedDate(date);
    };
    return (
    <div> 
        <form>
        <h2>Προσωπικά Στοιχεία</h2>
        {/* Column 1 */}
        <div classeName="column1">  
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

            <div className="marital-status">
                <label> 
                    Οικογενειακή Κατάσταση:
                </label> 
                <select value={role} onChange={(e) => setRole(e.target.value)}> 
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
        <div className="column2">
            <label>
                Επώνυμο:
                <input type="text" name="surname" />
            </label>

            <label>
                Όνομα Μητέρας:
                <input type="text" name="mothername" />
            </label>

            <div className="gender">
                <label> 
                    Φύλο:
                </label> 
                <select value={role} onChange={(e) => setRole(e.target.value)}> 
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

        </form>
    </div>
    );
}

export default RegisterProfessor;

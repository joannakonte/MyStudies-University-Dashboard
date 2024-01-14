import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import styles from './CertificatePopUp.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { HiMiniPlus } from 'react-icons/hi2';

const CertificatePopUp = ({ certificateType, setCertificateType, certificateNumber, setCertificateNumber, handleCertificateSubmit }) => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleFormSubmit = async (e, closeFormPopup) => {
        e.preventDefault();
        const success = await handleCertificateSubmit(); 
        if (success) {
            closeFormPopup(); // Close the form popup first
            setShowSuccessPopup(true); // Then show the success message popup
        }
    };
    
    return (
        <>
            <Popup
                trigger={<button className={styles['new-app']}><HiMiniPlus /> Nέο Πιστοποιητικό</button>}
                modal
                nested
            >
                {close => (
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={close}>
                            &times;
                        </button>
                        <div className={styles.header}> Αίτηση για Νέο Πιστοποιητικό </div>
                            <div className={styles.content}>
                                    <form onSubmit={(e) => handleFormSubmit(e, close)}>
                                    <div className={styles.selectCertificate}>
                                        <label> 
                                            <div className={styles.labelText}> Επιλογή πιστοποιητικού:</div>
                                        </label> 
                                        <div className={styles.selectWrapper}>
                                            <select value={certificateType} className={styles['dropdown-select']} onChange={(e) => setCertificateType(e.target.value)}> 
                                                <option value="Αναλυτική Βαθμολογία">Αναλυτική Βαθμολογία με προβιβάσιμους βαθμούς</option> 
                                                <option value="Φοιτητικής Ιδιότητας">Φοιτητικής Ιδιότητας</option> 
                                                <option value="Στρατολογική Χρήση (Συνοπτικό)">Στρατολογική Χρήση (Συνοπτικό)</option> 
                                                <option value="Στρατολογική Χρήση (Αναλυτικό)">Στρατολογική Χρήση (Αναλυτικό)</option> 
                                            </select>
                                            <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
                                        </div>
                                    </div>
                                    <label>
                                        <div className={styles.labelText}> Αριθμός αντιτύπων:</div>                                    <input
                                        type="number"
                                        value={certificateNumber}
                                        onChange={e => setCertificateNumber(e.target.value)}
                                        min="1"   // Minimum value set to 1
                                        max="10"  // Maximum value set to 10
                                        required
                                        className={styles.inputField}
                                        />
                                    </label>
                                    <div className={styles.submitButtonWrapper}>
                                        <button
                                            className={styles.submitButton}
                                            type="submit"
                                        >
                                            <FontAwesomeIcon icon={faCheck} /> Υποβολή αιτήματος
                                        </button>
                                    </div>
                                </form>
                            </div>
                    </div>
                )}
            </Popup>
            {/* Success Message Popup */}
            {showSuccessPopup && (
                <Popup open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
                    <div className={styles.successPopup}>
                        <div className={styles.header}></div>
                        <h3>Επιτυχής Υποβολή Αιτήματος!</h3>
                        <button className={styles.closeButton} onClick={() => setShowSuccessPopup(false)}> &times;</button>
                    </div>
                </Popup>
            )}
        </>
    );
};

export default CertificatePopUp;

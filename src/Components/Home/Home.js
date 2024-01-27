import React, { useState } from 'react';
import styles from './Home.module.css';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import SemesterTable from '../Students/Classes/SemesterTable';
import TableComponent from '../DataTable/DataTable';
import book from "../../images/books.png"
import professors_icon from "../../images/professors_icon.png"
import secretariat_icon from "../../images/secretariat_icon.png"
import student_icon from "../../images/student_icon.png"
import eudoxus_logo from "../../images/eudoxus_logo.png"
import OpenDelos_logo from "../../images/OpenDelos_logo.jpg"
import ekpa_logo from "../../images/ekpa_logo.jpg"
import eclass_logo from "../../images/eclass_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faClock, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [selectedSemester, setSelectedSemester] = useState(1); 

  return (


    <div>
      <ScrollToTopButton />

      {/* Header  */}
      <Navbar className={`${styles.navbar}`} />

      {/* Slider */}
      <section id="home">
        <div className={styles.Header} >
          <div className={styles['text-and-button']} >
          <p>
            Επισκέψου τη γραμματεία του τμηματος σου από
            <br />
            <strong>οπουδήποτε&nbsp;και&nbsp;οποιαδήποτε στιγμή!</strong>
          </p>

          </div>
            <img src={book} alt="books"/>
        </div>
      </section>

      {/* Υπηρεσίες */}
      <section id="services">

        <div className={styles.section} >
          <h1>Υπηρεσίες</h1>

          <div className={styles.container}>
            <div className={styles.box} id="students">
              <img src={student_icon} alt="Student" className={styles['box-image']} />
              <h2>Φοιτητές/τριες</h2>
              <p className={styles['box-text']}>Οι φοιτητές μέσω του my-studies έχουν τη δυνατότητα 
              να δουν το πρόγραμμα σπουδών του τμήματός τους, να κάνουν ηλεκτρονικά τη δήλωση μαθημάτων τους 
              για το κάθε εξάμηνο, να δουν αναλυτικά τη βαθμολογία τους, καθώς να αιτηθούν και να παραλάβουν πιστοποιητικά.</p>
            </div>

            <div className={styles.box} id="instructors">
            <img src={professors_icon} alt="Professors" className={styles['box-image']} />
              <h2>Διδάσκοντες</h2>
              <p className={styles['box-text']}>Οι διδάσκοντες, μέσω του my-studies
              έχουν τη δυνατότητα να δουν τα μαθήματα που διδάσκουν ανά εξάμηνο, καθώς και να υποβάλουν βαθμολογία 
              για αυτά, σε όλους τους φοιτητές.</p>
            </div>

            <div className={styles.box} id="secretary">
              <img src={secretariat_icon} alt="Secretary" className={styles['box-image']} />
              <h2>Γραμματεία</h2>
              <p className={styles['box-text']}>Τα μέλη τα γραμματείας, μέσω του my-studies μπορούν να ανοίξουν τις δηλώσεις των μαθημάτων, 
              να εγκρίνουν ή να απορρίψουν τις αιτήσεις πιστοποιητικών των φοιτητών, και να επεξεργαστούν τα στοιχεία όλων 
              των εγγεγραμμένων φοιτητών και καθηγητών.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Πρόγραμμα Σπούδων */}
      <div id="studyProgram">
        <h1>Πρόγραμμα Σπούδων</h1>

        <div className={styles.grid}>
          <div className={styles.semtable}>
            <SemesterTable onSelectSemester={setSelectedSemester} />
          </div>

          <div className={styles.tablecomp}>
            <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} pageStyle={styles} collectionName={'classes'}  showmarkedclasses={false} />
          </div>
        </div>
      </div>

    <div className={styles['section-department']} id="department">

        {/* Επικοινωνία */}
        <h1 id="contact">Επικοινωνία</h1>

        <div className={styles.container}>
          <div className={styles['box-contact']}>
            <h2> Τμήμα Πληροφορικής και Τηλεπικοινωνιών </h2>
            <h3>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px', fontSize: '24px' }} />
              <a href="tel:+302107275173" style={{ textDecoration: 'none', color: 'inherit' }}>+30 210 727 5173</a>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px', fontSize: '24px' }} />
              <a href="tel:+302107275192" style={{ textDecoration: 'none', color: 'inherit' }}>+30 210 727 5192</a>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px', fontSize: '24px' }} />
              <a href="mailto:secret@di.uoa.gr" style={{ textDecoration: 'none', color: 'inherit' }}>secret@di.uoa.gr</a>
            </h3>
            <h3 className={styles.container_h3}>
              <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px', fontSize: '24px' }}/>
              Καθημερινά 11:00-13:00 <br/> Δευτέρα – Τρίτη - Τετάρτη 16:00-18:00
            </h3>
            <h3>
              <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '15px', fontSize: '24px' }} />
              <a
                href="https://www.google.com/maps/place/%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1+%CE%A0%CE%BB%CE%B7%CF%81%CE%BF%CF%86%CE%BF%CF%81%CE%B9%CE%BA%CE%AE%CF%82+%CE%BA%CE%B1%CE%B9+%CE%A4%CE%B7%CE%BB%CE%B5%CF%80%CE%B9%CE%BA%CE%BF%CE%B9%CE%BD%CF%89%CE%BD%CE%B9%CF%8E%CE%BD/@37.9690297,23.7615575,15.75z/data=!4m6!3m5!1s0x14a197e10ffd248b:0x9e1a1dd511c44165!8m2!3d37.9681368!4d23.7665108!16s%2Fg%2F1262c8hsn?entry=ttu"
                style={{ textDecoration: 'none', color: 'inherit' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ζωγράφου 161 22
              </a>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '10px', fontSize: '24px' }} />
              <a
                href="www.di.uoa.gr"
                style={{ textDecoration: 'none', color: 'inherit' }}
                target="_blank"
                rel="noopener noreferrer"
              >
              www.di.uoa.gr
              </a>
            </h3>
          </div>

          <div className={styles['map-background']}>
            <iframe
              title="Department Location" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50339.40851970168!2d23.67287967504338!3d37.94881151792357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a197e10ffd248b%3A0x9e1a1dd511c44165!2zzqTOvM6uzrzOsSDOoM67zrfPgc6_z4bOv8-BzrnOus6uz4IgzrrOsc65IM6kzrfOu861z4DOuc66zr_Ouc69z4nOvc65z47OvQ!5e0!3m2!1sel!2sgr!4v1703430376620!5m2!1sel!2sgr"
              width="476px"
              height="605px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>


      {/* Αλλες υπηρεσίες ΕΚΠΑ */}
      <div className={styles.section} id="otherServices">
          <h1>Αλλες Υπηρεσίες ΕΚΠΑ</h1>

          <div className={styles.container}>
            <div className={styles['box-2']}>
              <a href="https://www.uoa.gr/" target="_blank" rel="noopener noreferrer">
                <img src={ekpa_logo} alt="EKPA" className={styles['ekpa-logo']} />
                <p className={styles['box-text']}>ΕΚΠΑ</p>
              </a>
            </div>

            <div className={styles['box-2']}>
              <a href="https://eclass.uoa.gr/" target="_blank" rel="noopener noreferrer">
                <img src={eclass_logo} alt="Eclass" className={styles['eclass-logo']} />
                <p className={styles['box-text']}>ή-Τάξη</p>
              </a>
            </div>

            <div className={styles['box-2']}>
              <a href="https://delos.uoa.gr/opendelos/" target="_blank" rel="noopener noreferrer">
                <img src={OpenDelos_logo} alt="OpenDelos" className={styles['OpenDelos-logo']} />
                <p className={styles['box-text']}>Δήλος</p>
              </a>
            </div>

            <div className={styles['box-2']}>
              <a href="https://eudoxus.gr/" target="_blank" rel="noopener noreferrer">
                <img src={eudoxus_logo} alt="Eudoxus" className={styles['eudoxus-logo']} />
                <p className={styles['box-text']}>Εύδοξος</p>
              </a>
            </div>
          </div>
      </div>

      {/* Footer  */}
      <Footer />

    </div>
  );
}

export default Home;

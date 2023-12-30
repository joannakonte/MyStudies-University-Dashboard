import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './FAQ.module.css'; 

function FAQ() {
    const [setSelectedSemester] = useState(1); 
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
      {
        question: 'Πώς μπορώ να αλλάξω το e-mail μου;',
        answer: 'Κάντε κλικ στη λέξη ρυθμίσεις.'
      },
      {
        question: 'Question 2',
        answer: 'Κάντε κλικ στη λέξη ρυθμίσεις.'
      },
    ];

    const toggle = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
      <div>
        <Header />
        <Breadcrumb />
        <Sidebar setSelectedSemester={setSelectedSemester} />
        <h2>Συχνές Ερωτήσεις</h2>
        <h3>Ερώτηση Σχετικά με:</h3>
        {faqData.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                  className={`${styles.faqButton} ${activeIndex === index ? styles.faqButtonOpen : ''}`}
                  onClick={() => toggle(index)}
              >
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  <FontAwesomeIcon icon={activeIndex === index ? faMinus : faPlus} />
              </button>
              <div className={activeIndex === index ? styles.faqAnswerOpen : styles.faqAnswer}>
                  <span className={styles.faqAnswerText}>{faq.answer}</span>
              </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default FAQ;
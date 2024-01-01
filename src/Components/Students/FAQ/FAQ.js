import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './FAQ.module.css'; 

function FAQ() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
  };
  const [setSelectedSemester] = useState(1); 
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Όλες');
  const categories = ['Όλες', 'Δηλώσεις', 'Πιστοποιητικά'];

  const faqData = [
    {
      question: 'Πώς μπορώ να δηλώσω μάθημα;',
      answer: 'Κάντε κλικ στη λέξη ρυθμίσεις.',
      category: 'Δηλώσεις'
    },
    {
      question: 'Πώς μπορώ να δω τα πιστοποιητικά που έχω ζητήσει;',
      answer: 'Κάντε κλικ στη λέξη ρυθμίσεις.',
      category: 'Πιστοποιητικά'
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
        
        <div className={styles.dropdown}>
          <h2>Ερώτηση Σχετικά με:</h2>
          <button onClick={toggleDropdown} className={styles['dropdown-toggle']}>
            {selectedCategory}
            <FontAwesomeIcon icon={faAngleDown} className={styles['down-arrow']}/>
          </button>
          {dropdownOpen && (
            <div className={`${styles['dropdown-content']} ${dropdownOpen ? styles.show : ''}`}>
              {categories.map(category => (
                <button key={category} onClick={() => {
                  setSelectedCategory(category);
                  toggleDropdown(); 
                }}>                  
                {category}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className={dropdownOpen ? styles.withDropdownOpen : ''}>
          {faqData
            .filter(faq => selectedCategory === 'Όλες' || faq.category === selectedCategory)
            .map((faq, index) => (
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
      </div>
    );
}
  
  export default FAQ;
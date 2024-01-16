import React, { useState } from 'react';
import styles from './FAQProfessor.module.css'; 
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import faqData from '../../../data/faqs.json'

function FAQProfessor() {
  const faqsToShow = faqData["professors"]; 
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Όλες');
  const categories = ['Όλες', 'Μαθήματα', 'Βαθμολόγιο', "Προσωπικά Στοιχεία"];


  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const location = useLocation();

  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>
        <div className={styles.main}>
          <div className={styles.dropdown}>
            <h2>Ερώτηση Σχετικά με:</h2>
            <div className={styles.selectWrapper}>
                <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles['dropdown-select']}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
            </div>
          </div>

          <div>
            {faqsToShow
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
                  {activeIndex === index && (
                      <div className={styles.faqAnswerOpen}>
                          <ol>
                              {faq.answer.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                              ))}
                          </ol>
                      </div>
                  )}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
  
export default FAQProfessor;
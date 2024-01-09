import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './FAQ.module.css'; 

function FAQ() {
  const [dropdownOpen] = useState(false);
  const [setSelectedSemester] = useState(1); 
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Όλες');
  const categories = ['Όλες', 'Δηλώσεις', 'Πιστοποιητικά', 'Βαθμολογία', "Προσωπικά Στοιχεία"];

  const faqData = [
    {
      question: 'Πώς μπορώ να επεξεργαστώ τα προσωπικά μου στοιχεία;',
      answer: [ 
            'Πηγαίνετε στη σελίδα "Προφίλ".',
            'Στο χώρο που αναγράφεται "Προσωπικά Στοιχεία" επιλέξετε την επιλογή επεξεργασία.',
        ],
      category: 'Προσωπικά Στοιχεία'
    },
    {
      question: 'Πώς μπορώ να δηλώσω μάθημα;',
      answer: [ 
            'Πηγαίνετε στη σελίδα "Δηλώσεις".',
            'Επιλέξτε "Νέα Δήλωση".',
            'Ακολουθείστε τα βήματα που εμφανίζονται στην οθόνη.',
            'Επιλέξτε "Προσωρινή Αποθήκευση" ή "Οριστική Υποβολή".'
        ],
      category: 'Δηλώσεις'
    },
    {
      question: 'Πώς μπορώ να δω τα πιστοποιητικά που έχω ζητήσει;',
      answer: [ 
        'Πηγαίνετε στη σελίδα "Πιστοποιητικά".',
        'Εκεί εμφανίζονται τα πιστοποιητικά που εκκρεμούν, εγκρίθηκαν ή απορίφθηκαν.'
      ],
      category: 'Πιστοποιητικά'
    },
    {
      question: 'Πώς μπορώ να δω τις βαθμολογίες μου;',
      answer: [ 
        'Πηγαίνετε στη σελίδα "Βαθμολογίες".',
        'Εκεί εμφανίζονται οι βαθμολογίες ανα εξεταστική περίοδο.'
      ],
      category: 'Βαθμολογία'
    }
  ];

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
    return (
      <div className={styles.gridContainer}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar setSelectedSemester={setSelectedSemester} />
        </div>

        <div className={styles.faqContainer}>
          
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
  
export default FAQ;
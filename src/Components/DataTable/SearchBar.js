import styles from './DataTable.module.css';
import {HiMagnifyingGlass } from 'react-icons/hi2';
const SearchBar = ({ searchQuery, setSearchQuery, pageStyle }) => {
    return (
      <div className={`${styles['search-bar']} `}>
        <input
          type="text"
          className={`${styles['searchinput']} `}
          placeholder="Αναζήτησε Μάθημα, Εξάμηνο, Κατηγορία ή ECTS"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    );
  };
  
  export default SearchBar;
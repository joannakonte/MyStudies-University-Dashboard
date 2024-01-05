import styles from './DataTable.module.css';
import {HiMagnifyingGlass } from 'react-icons/hi2';
const SearchBar = ({ searchQuery, setSearchQuery, pageStyle }) => {
    return (
      <div className={`${styles['search-bar']} `}>
        {/* <div className={`${styles['searchiconcontainer']}`}> */}
          <HiMagnifyingGlass className={`${styles['searchicon']}`} />
          <input
            type="text"
            className={`${styles['searchinput']} `}
            placeholder="Αναζήτησε Μάθημα, Εξάμηνο, Κατηγορία ή ECTS"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        {/* </div> */}
      </div>
    );
  };
  
  export default SearchBar;
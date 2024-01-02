import styles from './DataTable.module.css';
import {HiMagnifyingGlass } from 'react-icons/hi2';
const SearchBar = ({ searchQuery, setSearchQuery, pageStyle }) => {
    return (
      <div className={`${styles['search-bar']} ${pageStyle.searchbar}`}>
        <div className={`${styles['searchiconcontainer']} ${pageStyle.searchiconcontainer}`}>
          <HiMagnifyingGlass className={`${styles['searchicon']} ${pageStyle.searchicon}`} />
        </div>
        <input
          type="text"
          className={`${styles['searchinput']} ${pageStyle.searchinput}`}
          placeholder="Αναζήτησε Μάθημα, Εξάμηνο, Κατηγορία ή ECTS"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    );
  };
  
  export default SearchBar;
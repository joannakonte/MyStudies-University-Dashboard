import styles from './DataTable.module.css';
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
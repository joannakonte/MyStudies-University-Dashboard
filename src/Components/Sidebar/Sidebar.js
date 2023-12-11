import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
 return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li>Προφίλ</li>
        <li>Μαθήματα</li>
        <li>Δηλώσεις</li>
        <li>Πιστοποιητικά</li>
      </ul>
    </div>
 );
};

export default Sidebar;
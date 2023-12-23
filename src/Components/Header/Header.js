import React from 'react';
import "./Header.css"

function Header(){
    const ekpaLogo = '/ekpa-logo.png';
    const myStudiesLogo = '/mystudies-logo.png';

    return(
        <div>
        <ul className="logo-container">
          <li>
            <a href="/">
              <img src={myStudiesLogo} alt="MyStudies Logo" className="my-studies-logo" />
            </a>
          </li>
          <li>
            <a href="https://www.uoa.gr">
              <img src={ekpaLogo} alt="EKPA Logo" className="ekpa-logo" />
            </a>
          </li>
        </ul>
        </div>
    );
}

export default Header;
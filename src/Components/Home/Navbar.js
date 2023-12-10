import './Navbar.css'; 

function Navbar (){
  const ekpaLogo = '/ekpa-logo.png';
  const myStudiesLogo = '/mystudies-logo.png';

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={myStudiesLogo} alt="MyStudies Logo" className="my-studies-logo" />
        <img src={ekpaLogo} alt="EKPA Logo" className="ekpa-logo" />
      </div>
    </nav>
  );
};

export default Navbar;

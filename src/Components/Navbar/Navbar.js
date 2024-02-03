import React from 'react'
import "./Navbar.css"
import { AiFillGithub } from 'react-icons/ai';
import aqiLogo from "../../images/aqi-logo.png"
const Navbar = () => {
  return (
    <div className='container'>
      <nav className="navbar navbar-expand-lg">
  <div className="container">
    <a className="navbar-brand" href="#"><img src={aqiLogo} className='plomx_logo'></img></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-center">
        {/* <li className="nav-item nav_item_fs">
          <a className="nav-link" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item nav_item_fs">
          <a className="nav-link" aria-current="page" href="#">APIs</a>
        </li>
        <li className="nav-item nav_item_fs">
          <a className="nav-link" aria-current="page" href="#">Pricings</a>
        </li>
        <li className="nav-item nav_item_fs">
          <a className="nav-link" aria-current="page" href="#">About</a>
        </li> */}
      </ul>
     <div className='d-lg-block d-flex justify-content-center'>
      <button className='premium_button py-2 px-4'><AiFillGithub fontSize={20} className='me-2'/>GitHub Repo</button>
     </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar

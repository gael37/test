// import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, useNavigate } from 'react-router-dom'

import brandLogo from '../../assets/images/logo5.png'
import cartLogo from '../../assets/images/cart-logo.png'
import { useState } from 'react'

import { isAuthenticated, handleLogout } from '../../helpers/auth'


function Navigation({ selected, typed, setSelected, setTyped }) {

  const [selectSize, setSelectSize] = useState('small')

  const handleSelect = (e) => {

    setSelected(e.target.value)

    if (e.target.value < 5) {
      setSelectSize('small')
    } else {
      setSelectSize('big')
    }
  }

  const handleChange = (e) => {
    setTyped(e.target.value)
  }

  const navigate = useNavigate()

  return (
    <>
      {selectSize === 'small' ?
        <div className='flex-navs'>
          < Navbar className='navigation-flex'>
            <Navbar.Brand as={Link} to='/' className='nav-brand brand-logo' id='logo-left'><img src={brandLogo} /></Navbar.Brand>
            {/* <Link className='nav-link' to='/trends' id='trend'>Trends</ Link> */}
            <Nav className='nav-items-container' id='dropdown-left'>
              <NavDropdown className='nav-link basic-nav-dropdown' title="👤" id="dropdown-left">
                {isAuthenticated() ?
                  <>
                    <NavDropdown.Item as={Link} to='/' >Home</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/profile' >Account</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/orders' >Orders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/wish-list' >Wish List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/products/new' >Sell</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout(navigate)} >Sign Out</NavDropdown.Item>
                  </>
                  :
                  <>
                    <NavDropdown.Item as={Link} to='/' >Home</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/login' >Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/register' >Register</NavDropdown.Item>
                  </>
                }
              </NavDropdown>
            </Nav>
            <div className='flex-search' id='top-search'>
              <select onChange={handleSelect} name="filter-style" className="select-small" value={selected}>
                <option value="0">All</option>
                <option value="1">Baby</option>
                <option value="2">Beauty</option>
                <option value="3">Books</option>
                <option value="4">Fashion</option>
                <option value="5">Car & Motorbike</option>
                <option value="6">CDs & Vinyl</option>
                <option value="7">Computers & Accessories</option>
                <option value="8">DVD & Blu-ray</option>
                <option value="9">Electronics & Photo</option>
                <option value="10">Garden & Outdoors</option>
                <option value="11">Health & Personal care</option>
                <option value="12">Home & Kitchen</option>
                <option value="13">Industrial & Scientific</option>
                <option value="14">Large Appliances</option>
                <option value="15">Luggage & Travel Gear</option>
                <option value="16">Musical Instruments</option>
                <option value="17">Consoles & Video Games</option>
                <option value="18">Pet Supplies</option>
                <option value="19">Sports & Outdoors</option>
                <option value="20">Stationary & Office Supplies</option>
                <option value="21">Toys & Games</option>
              </select>
              <input className='input-nav' type="text" placeholder='search' value={typed} onChange={handleChange} />
            </div>
            <Nav className='nav-items-container'>
              <NavDropdown className='nav-link basic-nav-dropdown' title="👤" id="dropdown-right">
                {isAuthenticated() ?
                  <>
                    <NavDropdown.Item as={Link} to='/' >Home</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/profile' >Account</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/orders' >Orders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/wish-list' >Wish List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/products/new' >Sell</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout(navigate)} >Sign Out</NavDropdown.Item>
                  </>
                  :
                  <>
                    <NavDropdown.Item as={Link} to='/' >Home</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/login' >Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/register' >Register</NavDropdown.Item>
                  </>
                }
              </NavDropdown>
            </Nav>
            <Navbar.Brand as={Link} className='nav-brand brand-logo' id='logo-right' to='/'><img src={brandLogo} /></Navbar.Brand>
            <div className="nav-flex-p">
              <p>0</p>
              <Link className='nav-link nav-link-relative' to='/'><img src={cartLogo} /></ Link>
            </div>
          </Navbar >
          <div id='nav-bottom'>
            <div className='flex-search'>
              <select onChange={handleSelect} name="filter-style" className="select-small" value={selected}>
                <option value="0">All</option>
                <option value="1">Baby</option>
                <option value="2">Beauty</option>
                <option value="3">Books</option>
                <option value="4">Fashion</option>
                <option value="5">Car & Motorbike</option>
                <option value="6">CDs & Vinyl</option>
                <option value="7">Computers & Accessories</option>
                <option value="8">DVD & Blu-ray</option>
                <option value="9">Electronics & Photo</option>
                <option value="10">Garden & Outdoors</option>
                <option value="11">Health & Personal care</option>
                <option value="12">Home & Kitchen</option>
                <option value="13">Industrial & Scientific</option>
                <option value="14">Large Appliances</option>
                <option value="15">Luggage & Travel Gear</option>
                <option value="16">Musical Instruments</option>
                <option value="17">Consoles & Video Games</option>
                <option value="18">Pet Supplies</option>
                <option value="19">Sports & Outdoors</option>
                <option value="20">Stationary & Office Supplies</option>
                <option value="21">Toys & Games</option>
              </select>
              <input className='input-nav' type="text" placeholder='search' value={typed} onChange={handleChange} />
            </div>
          </div>
        </div>
        :
        <div className='flex-navs'>
          < Navbar className='navigation-flex'>
            <Navbar.Brand as={Link} className='nav-brand brand-logo' id='logo-left' to='/'><img src={brandLogo} /></Navbar.Brand>
            {/* <Link className='nav-link' to='/trends' id='trend'>Trends</ Link> */}
            <Nav className='nav-items-container' id='dropdown-left'>
              <NavDropdown className='nav-link basic-nav-dropdown' title="👤" id="dropdown-left">
                {isAuthenticated() ?
                  <>
                    <NavDropdown.Item as={Link} to='/' >Home</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/profile' >Account</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/orders' >Orders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/wish-list' >Wish List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/products/new' >Sell</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout(navigate)} >Sign Out</NavDropdown.Item>
                  </>
                  :
                  <>
                    <NavDropdown.Item as={Link} to='/' >Home</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/login' >Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/register' >Register</NavDropdown.Item>
                  </>
                }
              </NavDropdown>
            </Nav>
            <div className='flex-search' id='top-search'>
              <select onChange={handleSelect} name="filter-style" className="select-big" value={selected}>
                <option value="0">All</option>
                <option value="1">Baby</option>
                <option value="2">Beauty</option>
                <option value="3">Books</option>
                <option value="4">Fashion</option>
                <option value="5">Car & Motorbike</option>
                <option value="6">CDs & Vinyl</option>
                <option value="7">Computers & Accessories</option>
                <option value="8">DVD & Blu-ray</option>
                <option value="9">Electronics & Photo</option>
                <option value="10">Garden & Outdoors</option>
                <option value="11">Health & Personal care</option>
                <option value="12">Home & Kitchen</option>
                <option value="13">Industrial & Scientific</option>
                <option value="14">Large Appliances</option>
                <option value="15">Luggage & Travel Gear</option>
                <option value="16">Musical Instruments</option>
                <option value="17">Consoles & Video Games</option>
                <option value="18">Pet Supplies</option>
                <option value="19">Sports & Outdoors</option>
                <option value="20">Stationary & Office Supplies</option>
                <option value="21">Toys & Games</option>
              </select>
              <input className='input-nav' type="text" placeholder='search' value={typed} onChange={handleChange} />
            </div>
            <Nav className='nav-items-container'>
              <NavDropdown className='nav-link basic-nav-dropdown' title="👤" id="dropdown-right">
                {isAuthenticated() ?
                  <>
                    <NavDropdown.Item as={Link} to='/' >Home</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/profile' >Account</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/orders' >Orders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/wish-list' >Wish List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/products/new' >Sell</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout(navigate)} >Sign Out</NavDropdown.Item>
                  </>
                  :
                  <>
                    <NavDropdown.Item as={Link} to='/' >Home</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/login' >Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/register' >Register</NavDropdown.Item>
                  </>
                }
              </NavDropdown>
            </Nav>
            <Navbar.Brand as={Link} className='nav-brand brand-logo' id='logo-right' to='/'><img src={brandLogo} /></Navbar.Brand>
            <div className="nav-flex-p">
              <p>0</p>
              <Link className='nav-link nav-link-relative' to='/'><img src={cartLogo} /></ Link>
            </div>
          </Navbar >
          <div id='nav-bottom'>
            <div className='flex-search'>
              <select onChange={handleSelect} name="filter-style" className="select-big" value={selected}>
                <option value="0">All</option>
                <option value="1">Baby</option>
                <option value="2">Beauty</option>
                <option value="3">Books</option>
                <option value="4">Fashion</option>
                <option value="5">Car & Motorbike</option>
                <option value="6">CDs & Vinyl</option>
                <option value="7">Computers & Accessories</option>
                <option value="8">DVD & Blu-ray</option>
                <option value="9">Electronics & Photo</option>
                <option value="10">Garden & Outdoors</option>
                <option value="11">Health & Personal care</option>
                <option value="12">Home & Kitchen</option>
                <option value="13">Industrial & Scientific</option>
                <option value="14">Large Appliances</option>
                <option value="15">Luggage & Travel Gear</option>
                <option value="16">Musical Instruments</option>
                <option value="17">Consoles & Video Games</option>
                <option value="18">Pet Supplies</option>
                <option value="19">Sports & Outdoors</option>
                <option value="20">Stationary & Office Supplies</option>
                <option value="21">Toys & Games</option>
              </select>
              <input className='input-nav' type="text" placeholder='search' value={typed} onChange={handleChange} />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Navigation
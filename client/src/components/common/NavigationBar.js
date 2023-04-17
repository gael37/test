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
              <select onChange={handleSelect} name="filter-style" className="select-nav select-small" value={selected}>
                <option value="All">All</option>
                <option value="Baby">Baby</option>
                <option value="Beauty">Beauty</option>
                <option value="Books">Books</option>
                <option value="Fashion">Fashion</option>
                <option value="Car & Motorbike">Car & Motorbike</option>
                <option value="CDs & Vinyl">CDs & Vinyl</option>
                <option value="Computers & Accessories">Computers & Accessories</option>
                <option value="DVD & Blu-ray">DVD & Blu-ray</option>
                <option value="Electronics & Photo">Electronics & Photo</option>
                <option value="Garden & Outdoors">Garden & Outdoors</option>
                <option value="Health & Personal care">Health & Personal care</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Industrial & Scientific">Industrial & Scientific</option>
                <option value="Large Appliances">Large Appliances</option>
                <option value="Luggage & Travel Gear">Luggage & Travel Gear</option>
                <option value="Musical Instruments">Musical Instruments</option>
                <option value="Consoles & Video Games">Consoles & Video Games</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Stationary & Office Supplies">Stationary & Office Supplies</option>
                <option value="Toys & Games">Toys & Games</option>
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
              <select onChange={handleSelect} name="filter-style" className="select-nav select-small" value={selected}>
                <option value="All">All</option>
                <option value="Baby">Baby</option>
                <option value="Beauty">Beauty</option>
                <option value="Books">Books</option>
                <option value="Fashion">Fashion</option>
                <option value="Car & Motorbike">Car & Motorbike</option>
                <option value="CDs & Vinyl">CDs & Vinyl</option>
                <option value="Computers & Accessories">Computers & Accessories</option>
                <option value="DVD & Blu-ray">DVD & Blu-ray</option>
                <option value="Electronics & Photo">Electronics & Photo</option>
                <option value="Garden & Outdoors">Garden & Outdoors</option>
                <option value="Health & Personal care">Health & Personal care</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Industrial & Scientific">Industrial & Scientific</option>
                <option value="Large Appliances">Large Appliances</option>
                <option value="Luggage & Travel Gear">Luggage & Travel Gear</option>
                <option value="Musical Instruments">Musical Instruments</option>
                <option value="Consoles & Video Games">Consoles & Video Games</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Stationary & Office Supplies">Stationary & Office Supplies</option>
                <option value="Toys & Games">Toys & Games</option>
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
              <select onChange={handleSelect} name="filter-style" className="select-nav select-big" value={selected}>
                <option value="All">All</option>
                <option value="Baby">Baby</option>
                <option value="Beauty">Beauty</option>
                <option value="Books">Books</option>
                <option value="Fashion">Fashion</option>
                <option value="Car & Motorbike">Car & Motorbike</option>
                <option value="CDs & Vinyl">CDs & Vinyl</option>
                <option value="Computers & Accessories">Computers & Accessories</option>
                <option value="DVD & Blu-ray">DVD & Blu-ray</option>
                <option value="Electronics & Photo">Electronics & Photo</option>
                <option value="Garden & Outdoors">Garden & Outdoors</option>
                <option value="Health & Personal care">Health & Personal care</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Industrial & Scientific">Industrial & Scientific</option>
                <option value="Large Appliances">Large Appliances</option>
                <option value="Luggage & Travel Gear">Luggage & Travel Gear</option>
                <option value="Musical Instruments">Musical Instruments</option>
                <option value="Consoles & Video Games">Consoles & Video Games</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Stationary & Office Supplies">Stationary & Office Supplies</option>
                <option value="Toys & Games">Toys & Games</option>
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
              <select onChange={handleSelect} name="filter-style" className="select-nav select-big" value={selected}>
                <option value="All">All</option>
                <option value="Baby">Baby</option>
                <option value="Beauty">Beauty</option>
                <option value="Books">Books</option>
                <option value="Fashion">Fashion</option>
                <option value="Car & Motorbike">Car & Motorbike</option>
                <option value="CDs & Vinyl">CDs & Vinyl</option>
                <option value="Computers & Accessories">Computers & Accessories</option>
                <option value="DVD & Blu-ray">DVD & Blu-ray</option>
                <option value="Electronics & Photo">Electronics & Photo</option>
                <option value="Garden & Outdoors">Garden & Outdoors</option>
                <option value="Health & Personal care">Health & Personal care</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Industrial & Scientific">Industrial & Scientific</option>
                <option value="Large Appliances">Large Appliances</option>
                <option value="Luggage & Travel Gear">Luggage & Travel Gear</option>
                <option value="Musical Instruments">Musical Instruments</option>
                <option value="Consoles & Video Games">Consoles & Video Games</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Stationary & Office Supplies">Stationary & Office Supplies</option>
                <option value="Toys & Games">Toys & Games</option>
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
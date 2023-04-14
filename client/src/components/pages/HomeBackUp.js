import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../helpers/auth'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { isAuthenticated } from '../../helpers/auth'

import { getPayload } from '../../helpers/auth'

const HomeBackUp = () => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [errors, setErrors] = useState(false)
  const [searchedProducts, setSearchedProducts] = useState([])
  const [search, setSearch] = useState([])
  const [select, setSelect] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [userData, setUserData] = useState(null)
  // const [userCoord, setUserCoord] = useState(null)
  // const [productOwnerCoord, setproductOwnerCoord] = useState(null)

  const productsWithCoordinates = [...products]


  // function to calculate the distance between two points with latitude and longitude:
  const calcDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3 // metres
    const φ1 = lat1 * Math.PI / 180 // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const d = R * c // in metres
    // in miles:
    return d * 0.000621371
  }

  const distWG = calcDistance(51.503649, -0.126639, 55.860916, -4.251433)
  const distLG = calcDistance(51.541707, -0.102176, 55.860916, -4.251433)
  const distLW = calcDistance(51.541707, -0.102176, 51.503649, -0.126639)
  console.log(distLG)
  console.log(distLW)

  getToken()
  const currentUserPayload = getPayload()
  const currentUserId = currentUserPayload.sub
  console.log('id', currentUserId)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`api/auth/${currentUserId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log('user', data)
        setUserData(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getUserData()
  }, [])

  const [userCoord, setUserCoord] = useState({
    userLatitude: '',
    userLongitude: '',
  })

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const { data } = await axios.get(`https://api.postcodes.io/postcodes/${userData.postcode}/`)
        console.log('user coord', data)
        setUserCoord({
          userLatitude: data.result.latitude,
          userLongitude: data.result.longitude,
        })
        // userLatitude = data.result.latitude
        // userLongitude = data.result.longitude
        // console.log('lat and long', userLatitude, userLongitude)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getCoordinates()
  }, [userData])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get('/api/products/')
        console.log('products at page render', data)
        setProducts(data)
        // setFilteredProducts(data)
        // setSearchedProducts(data)
        // setSelectedProducts(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getProducts()
  }, [])


  // SEARCH


  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filterByName = () => {
    const regex = new RegExp(search, 'i')
    const searched = selectedProducts.filter(product => {
      return regex.test(product.name)
    })

    setFilteredProducts(searched)
    console.log('selected products', searched)
  }

  useEffect(() => {
    filterByName()
  }, [search])


  // SELECT


  // const handleSubmit = (e) => {
  //   setSelect(e.target.value)
  // }

  const filterProducts = (e) => {
    console.log('e.target.value', e.target.value)
    console.log('products after click', products)
    console.log('searched products', searchedProducts)
    const selected = searchedProducts.filter(product => {
      if (product.categories.includes(parseInt(e.target.value))) {
        return product
      } else if (e.target.value === 'All') {
        return product
      }
      // if (product.categories.includes(parseInt(e.target.value))) {
      //   return product
      // } else if (e.target.value === 'All') {
      //   return product
      // }
    })
    console.log('filtered products', selected)
    setSelectedProducts(selected)
    setFilteredProducts(selected)
  }


  // Geolocalisation

  const [position, setPosition] = useState(null)
  const coordinatesArray = []

  useEffect(() => {

    for (let i = 0; i < products.length; i++) {
      const getCoordinates = async (i) => {
        try {
          const { data } = await axios.get(`https://api.postcodes.io/postcodes/${products[i].owner.postcode}/`)
          // console.log(data.result.admin_district)
          productsWithCoordinates[i].longitude = data.result.longitude
          productsWithCoordinates[i].latitude = data.result.latitude
          productsWithCoordinates[i].district = data.result.admin_district
          productsWithCoordinates[i].postedBy = productsWithCoordinates[i].owner.username
          setFilteredProducts(productsWithCoordinates)
          setSearchedProducts(productsWithCoordinates)
          setSelectedProducts(productsWithCoordinates)
          // console.log('products with coordinates', productsWithCoordinates)
          setPosition(data)
        } catch (err) {
          console.log(err)
          setErrors(true)
        }
      }
      getCoordinates(i)
    }

    // for (let i = 0; i < products.length; i++) {
    //   coordinatesArray.push(getCoordinates(products[i].owner.postcode))
    //   console.log(coordinatesArray)
    // }


  }, [products])

  const imagesArray = []

  useEffect(() => {
    console.log('filtered products', filteredProducts)
    // console.log('filtered products images: ', filteredProducts[0].image)
    console.log(imagesArray)
  }, [filteredProducts])


  return (
    <main className="profile-page-wrapper">
      <div className="filters-div">
        <input onChange={handleSearch} className="home-page-input" placeholder="🔎search" value={search} />
        <select onChange={filterProducts} name="filter-style" id="filter-style">
          <option value="All">All</option>
          <option value="5">Tools</option>
          <option value="11">Garden</option>
          <option value="3">Leisure</option>
          <option value="2">Kitchen</option>
          <option value="4">Decoration</option>
          <option value="6">Cars</option>
          <option value="7">Motorbikes</option>
          <option value="8">Clothes</option>
          <option value="9">Shoes</option>
          <option value="10">Makeup</option>
          <option value="12">Others</option>
          <option value="1">Sport</option>
        </select>
      </div>
      {filteredProducts.length > 0 &&
        <div className='profile-row'>
          {filteredProducts.map(product => {
            return (
              <div key={product.id} className='profile-card'>

                <Link className='bootstrap-link' to={`/products/${product.id}`}>


                  <div className="buffer">
                    <div className="profile-card-image" style={{ backgroundImage: `url(${product.image.split(' ')[0]})` }}></div>

                    {/* {(product.image.split(' ')).map((image, index) => {
                      return (
                        <div key={index} className="profile-card-image" style={{ backgroundImage: `url(${image})` }}></div>
                      )
                    })
                    } */}
                    <p className='profile-card-title'>{product.name}</p>
                    <p className='profile-card-description'>{product.description}</p>
                    <p className='profile-card-date'>Posted by <span>{product.owner.username}</span> on {product.created_at.toString().split('T').slice(0, 1).join()}</p>
                    {isAuthenticated() ?
                      <>
                        <p className='profile-card-distance2'>{(Math.abs(calcDistance(userCoord.userLatitude, userCoord.userLongitude, product.latitude, product.longitude))).toFixed(1)} miles | {product.district}</p>

                      </>
                      :
                      <>
                      </>
                    }
                    <p className='profile-card-price'>£{product.price}</p>
                  </div>
                </Link>
              </div>
            )
          })
          }
        </div>
      }
    </main>

  )
}

export default HomeBackUp
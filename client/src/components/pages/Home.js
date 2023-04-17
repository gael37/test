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
import { calcDistance } from '../../helpers/functions'

const Home = ({ selected, typed, setSelected, setTyped }) => {

  const [liked, setLiked] = useState(false)
  const [post, setPost] = useState(0)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [errors, setErrors] = useState(false)
  const [searchedProducts, setSearchedProducts] = useState([])
  // const [search, setSearch] = useState([])
  // const [select, setSelect] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [userData, setUserData] = useState(null)
  // const [userCoord, setUserCoord] = useState(null)
  // const [productOwnerCoord, setproductOwnerCoord] = useState(null)

  const productsWithCoordinates = [...products]

  // test of the function that calculates distances
  const distLeedsDrymen = calcDistance(53.8, 1.5497, 56.06548, 4.44996)
  const distLeedsLondon = calcDistance(53.8, 1.5497, 51.5073, 0.0163)
  console.log('distance Leeds-Drymen', distLeedsDrymen)
  console.log('distance Leeds-London', distLeedsLondon)

  const [userCoord, setUserCoord] = useState({
    userLatitude: '',
    userLongitude: '',
  })

  // get all products
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

  // get user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`api/auth/${currentUserId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('user data', data)
      setUserData(data)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  // On page load, get user data and all the products
  useEffect(() => {
    getProducts()
    getUserData()
  }, [])

  // get user id
  getToken()
  const currentUserPayload = getPayload()
  const currentUserId = currentUserPayload.sub
  console.log('user id', currentUserId)


  // once user data is loaded, we use a public API to retrieve and store the latitude and longitude of the user given their postcode
  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const { data } = await axios.get(`https://api.postcodes.io/postcodes/${userData.postcode}/`)
        console.log('user coord', data)
        setUserCoord({
          userLatitude: Math.abs(data.result.latitude),
          userLongitude: Math.abs(data.result.longitude),
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


  // SEARCH


  // const handleSearch = (e) => {
  //   setSearch(e.target.value)
  // }



  useEffect(() => {
    const filterByName = () => {
      const regex = new RegExp(typed, 'i')
      const searched = selectedProducts.filter(product => {
        return regex.test(product.description)
      })

      setFilteredProducts(searched)
      console.log('searched products', searched)
    }
    filterByName()
  }, [typed])


  // SELECT


  // const handleSubmit = (e) => {
  //   setSelect(e.target.value)
  // }

  const filterProducts = () => {
    // console.log('e.target.value', e.target.value)
    console.log('products after click', products)
    console.log('searched products', searchedProducts)
    const selection = searchedProducts.filter(product => {
      if (product.categories.includes(parseInt(selected))) {
        return product
      } else if (selected === 0) {
        return product
      }
      // if (product.categories.includes(parseInt(e.target.value))) {
      //   return product
      // } else if (e.target.value === 'All') {
      //   return product
      // }
    })
    console.log('filtered products', selection)
    setSelectedProducts(selection)
    setFilteredProducts(selection)
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
          productsWithCoordinates[i].longitude = Math.abs(data.result.longitude)
          productsWithCoordinates[i].latitude = Math.abs(data.result.latitude)
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

  const putUserData = async () => {
    try {
      const { data } = await axios.put(`api/auth/${currentUserId}/`, userData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('user data', data)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  // handleLike = () => {
  //   setUserData({ ...userData, likes: Array.from(new Set(userData.likes.concat(products.id))})
  //   setPost(post + 1)
  // }

  // useEffect(() => {
  //   putUserData()
  // }, [post])

  return (
    <main className="profile-page-wrapper">

      {filteredProducts.length > 0 &&
        <div className='profile-row'>
          {filteredProducts.map(product => {
            return (
              <div key={product.id} className='profile-card'>

                <Link className='bootstrap-link' to={`/products/${product.id}`}>


                  <div className="buffer">
                    <div className="profile-card-image" style={{ backgroundImage: `url(${product.images.split(' ')[0]})` }}></div>

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
                    {/* {liked ?
                      <button onClick={handleLike}>♥️</button>
                      :
                      <button onClick={handleLike}>♡</button>
                    } */}
                    {/* <button onClick={handleLike}>♥️</button> */}
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

export default Home
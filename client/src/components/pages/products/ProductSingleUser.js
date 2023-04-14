import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom' // Importing useParams, we have access to any placeholders in the url
import axios from 'axios'
import { isOwner, getToken } from '../../../helpers/auth'
import { isAuthenticated } from '../../../helpers/auth'
import { getPayload } from '../../../helpers/auth'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const ProductSingleUser = () => {

  console.log('this is the single user component')
  const a = useParams().postcodeUser
  console.log('a', a)




  // ! State
  const [product, setProduct] = useState(null)
  const [errors, setErrors] = useState(false)
  const [userData, setUserData] = useState(null)


  // ! Location
  const { productId } = useParams()
  const navigate = useNavigate()

  getToken()
  const currentUserPayload = getPayload()
  const currentUserId = currentUserPayload.sub


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


  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       console.log('current id', currentUserId)
  //       const { data } = await axios.get(`api/auth/${currentUserId}/`, {
  //         headers: {
  //           Authorization: `Bearer ${getToken()}`,
  //         },
  //       })
  //       console.log('user', data)
  //       setUserData(data)
  //     } catch (err) {
  //       console.log(err)
  //       setErrors(true)
  //     }
  //   }
  //   getUserData()
  // }, [])


  const [userCoord, setUserCoord] = useState({
    userLatitude: '',
    userLongitude: '',
  })
  const [productOwnerCoord, setProductOwnerCoord] = useState({
    productOwnerLatitude: '',
    productOwnerLongitude: '',
    productOwnerDistrict: '',
  })

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const { data } = await axios.get(`https://api.postcodes.io/postcodes/${a}/`)
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
  }, [])

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const { data } = await axios.get(`https://api.postcodes.io/postcodes/${product.owner.postcode}/`)
        console.log('user coord', data)
        setProductOwnerCoord({
          productOwnerLatitude: data.result.latitude,
          productOwnerLongitude: data.result.longitude,
          productOwnerDistrict: data.result.admin_district,
        })
        // productOwnerLatitude = data.result.latitude
        // productOwnerLongitude = data.result.longitude
        // console.log('lat, long of p owner', data.result.latitude, data.result.longitude)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getCoordinates()
  }, [product])

  // ! Execution
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}/`)
        console.log('products on page render', data)
        setProduct(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getProduct()
  }, [productId])

  // useEffect(() => {
  //   console.log('product', product)

  // }, [product])

  const deleteProduct = async (e) => {
    try {
      await axios.delete(`api/products/${productId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/products')
    } catch (err) {
      console.log(err)
    }
  }
  const [messageField, setMessageField] = useState({
    text: '',
  })

  const handleChange = (e) => {
    const updatedReviewField = {
      ...messageField,
      [e.target.name]: e.target.value,
      commentOwner: userId,
      productOwner: product.owner.id,
    }
    setMessageField(updatedReviewField)
    if (errors) setErrors('')
  }

  const payload = getPayload()
  const userId = payload.sub
  console.log('userId', userId)



  const handleClick = async (e) => {
    console.log('product owner', product.owner.id)
    console.log('message field', messageField)
    try {
      const { data } = await axios.post('/api/comments/', { ...messageField }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setMessageField({
        text: 'Message sent!',
      })
      console.log('review SUCCESS ->', data)
    } catch (err) {
      console.log('review FAIL ->', err)
      setErrors(err.response.data)
    }
  }

  const handleDelete = async (e) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setMessageField({
        text: 'Ad deleted!',
      })
      navigate('/delete-product')
      console.log('delete SUCCESS ->', data)
    } catch (err) {
      console.log('review FAIL ->', err)
      setErrors(err.response.data)
    }
  }

  const postedAd = () => {
    if (product.owner.id === currentUserId) {
      return true
    } else {
      return false
    }
  }
  return (
    <main className='single-page'>
      <Container className='mt-4'>
        <Row>
          {product ?
            <>
              <div className="single-buffer">

                {(product.image.split(' ')).map((image, index) => {
                  return (
                    <div key={index} className="profile-card-image" style={{ backgroundImage: `url(${image})` }}></div>
                  )
                })
                }

                <div className='single-user-desc'>
                  <p className='single-card-title'>{product.name}</p>
                  <p className='single-card-description'>{product.description}</p>

                  {postedAd() ?
                    <>
                      <p className='single-card-price'>£{product.price}</p>
                      <p className='single-card-date'>Posted by <span>me!</span> on <span>{product.created_at.toString().split('T').slice(0, 1).join()}</span></p>


                    </>
                    :

                    <>
                      <p className='single-card-price'>£{product.price}</p>
                      <p className='profile-card-distance'>{(Math.abs(calcDistance(userCoord.userLatitude, userCoord.userLongitude, productOwnerCoord.productOwnerLatitude, productOwnerCoord.productOwnerLongitude))).toFixed(1)} miles | {productOwnerCoord.productOwnerDistrict}</p>
                      <p className='single-card-date'>Posted by <span>{product.owner.username}</span> on <span>{product.created_at.toString().split('T').slice(0, 1).join()}</span></p>



                    </>
                  }

                </div>
              </div>







              <div className="single-message">
                {isAuthenticated() ?
                  <>
                    {postedAd() ?
                      <div className='flex-edit-delete'>
                        <Link className="btn-post-edit" as={Link} to={`/edit-product/${product.id}`}>Edit Ad</Link>
                        <button className="btn-post-delete" onClick={handleDelete}>DELETE AD</button>
                      </div>
                      :
                      <>
                        <div className='flex-send-message'>
                          <div className='single-flex-row'>
                            <p className='mess-p'>Send a message to <span>{product.owner.username}:</span></p>
                          </div>
                          <input
                            type="text"
                            name="text"
                            onChange={handleChange}
                            value={messageField.text}
                            // placeholder="Type your message"
                            className='single-input'
                          />
                          <button className="btn-post" onClick={handleClick}>Send</button>
                        </div>
                      </>

                    }
                  </>
                  :
                  <>
                    <div className='flex-message-author'>
                      <p>If you would like to send a message to the author of this ad, you have to login</p>

                      <Link className="btn-post-edit-login btn-post-edit" as={Link} to="/login">Login</Link>
                    </div>
                  </>
                }
              </div>


            </>
            :
            errors ? <h2>Something went wrong! Please try again later!</h2> : <h2>Loading</h2>
          }
        </Row>
      </Container>

    </main >
  )
}

export default ProductSingleUser
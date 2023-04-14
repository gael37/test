// React
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../../ImageUpload'
import { getPayload } from '../../../helpers/auth'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Imports
import axios from 'axios'
import { getToken } from '../../../helpers/auth'


// Custom Components
import ProductForm from './ProductForm'


const ProductNew = () => {

  // ! Location Variables
  const navigate = useNavigate()




  getToken()
  const currentUserPayload = getPayload()
  const currentUserId = currentUserPayload.sub
  console.log('id', currentUserId)


  // ! State
  const [formFields, setFormFields] = useState({
    description: '',
    image: '',
    brand: '',
    price: '',
  })

  const [errors, setErrors] = useState(null)
  const a = useParams().productId

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${a}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log('product data on page load', data)
        setFormFields(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProduct()
  }, [])




  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // When we add authentication to an axios request we need to add our Authorization header
      // To add headers, we create a config object as the third argument, and add a header key to that object
      // The header key has an object as a value, and each key on the headers object is a new header
      console.log('GET TOKEN ->', getToken())
      console.log('form fields', formFields)
      const { data } = await axios.put(`/api/products/${a}/`, { ...formFields, owner: currentUserId }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('SUCCESS ->', data._id)
      navigate(`/products/${a}/1`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  // ! JSX
  return (
    <main className="form-page">
      <ProductForm
        handleSubmit={handleSubmit}
        formFields={formFields}
        setFormFields={setFormFields}
        errors={errors}
        setErrors={setErrors}
        formName="Edit ad"
      />
    </main>
  )
}

export default ProductNew
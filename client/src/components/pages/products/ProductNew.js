// React
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPayload } from '../../../helpers/auth'

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
  console.log('current user id: ', currentUserId)


  // ! State
  const [formFields, setFormFields] = useState({
    description: '',
    image: '',
    brand: '',
    dimensions: '',
    weight: '',
    about: '',
    price: '',
  })

  const [errors, setErrors] = useState(null)

  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // When we add authentication to an axios request we need to add our Authorization header
      // To add headers, we create a config object as the third argument, and add a header key to that object
      // The header key has an object as a value, and each key on the headers object is a new header
      // console.log('GET TOKEN ->', getToken())
      console.log('form fields', formFields)
      // console.log('current user id', currentUserId)
      await axios.post('/api/products/', { ...formFields, owner: currentUserId }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('SUCCESS ')
      navigate('/')
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
        formName="New ad"
      />
    </main>
  )
}

export default ProductNew
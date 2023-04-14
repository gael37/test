// React
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Imports
import axios from 'axios'
import { getToken } from '../../../helpers/auth'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import { getPayload } from '../../../helpers/auth'

const EditProfile = () => {

  const navigate = useNavigate()

  const payload = getPayload()
  const currentUserId = payload.sub


  // ! State
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    postcode: '',
    password: '',
    password_confirmation: '',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${currentUserId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setFormFields(data)
      } catch (err) {
        console.log(err)
      }
    }
    getUserData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.delete(`/api/auth/${currentUserId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('EDIT SUCCESS ->', data)
      navigate('/profile')
    } catch (err) {
      console.log('EDIT FAIL ->', err)
      setError(err.response.data.message)
    }
  }

  const handleChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    if (error) setError('')
  }


  return (
    <main className="form-page">
      <Container className='mt-4'>
        <Row>
          <div className='col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
            <form onSubmit={handleSubmit}>
              <h1>Edit your details</h1>
              {/* Username */}
              <label htmlFor="username">Username <span>*</span></label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formFields.username}
                placeholder="Username"
                required
              />
              {/* Email */}
              <label htmlFor="email">Email <span>*</span></label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formFields.email}
                placeholder="Email Address"
                required
              />
              {/* Postcode */}
              <label htmlFor="postcode">Email <span>*</span></label>
              <input
                type="text"
                name="postcode"
                onChange={handleChange}
                value={formFields.postcode}
                placeholder="Postcode"
                required
              />
              {/* Password */}
              <label htmlFor="password">Password <span>*</span></label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formFields.password}
                placeholder="Password"
                required
              />
              {/* PasswordConfirmation */}
              <label htmlFor="passwordConfirmation">Confirm Password <span>*</span></label>
              <input
                type="password"
                name="password_Confirmation"
                onChange={handleChange}
                value={formFields.password_Confirmation}
                placeholder="Confirm Password"
                required
              />
              {/* Error Message */}
              {error && <small className='text-danger'>{error}</small>}
              {/* Submit */}
              <button className='btn-form'>Edit</button>
            </form>
          </div>
        </Row>
      </Container>
    </main>
  )
}

export default EditProfile
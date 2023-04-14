// React Components
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../../ImageUpload'
// Imports
import axios from 'axios'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Register = () => {

  // ! Location Variables
  // useNavigate() executed returns back the function we need to use to navigate around our React App
  const navigate = useNavigate()

  // ! State
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    postcode: '',
  })

  const [error, setError] = useState('')
  const [passError, setPassError] = useState('')

  // ! Executions

  // Submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formFields.password !== formFields.password_confirmation) {
        setPassError('Passwords do not match!')
      }
      if (formFields.password.length < 8 || formFields.password_confirmation.length < 8) {
        setPassError('Password too short! It must be at least 8 characters long.')
      }
      // axios.post() is used to send a POST request - POST requests are used to submit new information
      await axios.post('/api/auth/register/', formFields)
      console.log('Register successful')
      // We can then use that function, passing in the path we want to follow, and it will redirect us
      navigate('/login')
    } catch (err) {
      if (formFields.password !== formFields.password_confirmation) {
        setError({
          message: 'Passwords do not match',
        })
      }
      console.log(err.response.data.message)
      setError(err.response.data.message)
    }
  }

  // Update formFields state when input changes
  const handleChange = (e) => {
    setPassError('')
    const updatedFormFields = {
      ...formFields,
      [e.target.name]: e.target.value,
    }
    setFormFields(updatedFormFields)

    // Setting errors back to empty string if we type into an input and an error is present
    if (error) setError('')
  }

  return (
    <div className='register-page-wrapper'>
      <main className="form-page">
        <Container className='mt-4'>
          <Row>
            <div className='col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
              <form onSubmit={handleSubmit}>
                <h1>Register</h1>
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
                <label htmlFor="email">Postcode <span>*</span></label>
                <input
                  type="text"
                  name="postcode"
                  onChange={handleChange}
                  value={formFields.postcode}
                  placeholder="Postcode"
                  required
                />
                {/* Image */}
                <label>Upload your profile picture:</label>
                <ImageUpload
                  formFields={formFields}
                  setFormFields={setFormFields}
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
                  name="password_confirmation"
                  onChange={handleChange}
                  value={formFields.password_confirmation}
                  placeholder="Confirm Password"
                  required
                />
                {/* Error Message */}
                {error && <small className='text-danger'>{error}</small>
                }
                {passError && <small className='text-danger'>{passError}</small>
                }
                {/* Submit */}
                <button className='btn-form'>Register</button>
              </form>
            </div>
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default Register
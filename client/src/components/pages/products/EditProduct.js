// React
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import { getPayload } from '../../../helpers/auth'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Select from 'react-select'


// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

// Imports
import axios from 'axios'
import { getToken } from '../../../helpers/auth'


// Custom Components
import ProductFormEdit from './ProductFormEdit'


const EditProduct = ({ selectedImages, setSelectedImages }) => {

  // ! Location Variables
  const navigate = useNavigate()

  const [imagesCount, setImagesCount] = useState(0)


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
    about: '',
    dimensions: '',
    weight: '',
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

  useEffect(() => {
    console.log('pre existing images :', formFields.image)
    setImagesCount(formFields.image.split(' ').length)
  }, [formFields])


  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // When we add authentication to an axios request we need to add our Authorization header
      // To add headers, we create a config object as the third argument, and add a header key to that object
      // The header key has an object as a value, and each key on the headers object is a new header
      console.log('GET TOKEN ->', getToken())
      console.log('form fields', formFields)
      setFormFields({ ...formFields, image: formFields.image + imageString })
      const { data } = await axios.put(`/api/products/${a}/`, { ...formFields, image: formFields.image + imageString, owner: currentUserId }, {
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







  // PRODUCTFORMEDIT EXEC




  useEffect(() => {
    console.log('form fields images: ', formFields.image)
    console.log('images count', imagesCount)
    setSelectedImages([])
  }, [formFields])

  let imageString

  const handleUpload = async (event) => {
    imageString = ''
    console.log(event.target.files)
    for (let i = 0; i < event.target.files.length; i++) {
      try {
        console.log('formFields before uploads', formFields)
        // File field on the formData we're creating

        const formData = new FormData()
        formData.append('file', event.target.files[i])
        console.log('formData composed of all files', formData)
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
        console.log('current url', data.secure_url)
        imageString = imageString + ' ' + data.secure_url
        console.log('imageString', imageString)
        // Upload preset
        // Sending data as an axios request to the cloudinary API
      } catch (err) {
        console.log(err)
      }
    }
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
  }

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    URL.revokeObjectURL(image)
  }

  const handleChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    // Removing unneeded errors
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }

  // const selectionArray = []

  // const selectCategory = (e) => {
  //   console.log(e)
  //   for (let i = 0; i < e.length; i++) {
  //     selectionArray.push(e[i].value)
  //   }
  //   console.log(selectionArray)
  // }

  const [categoriesArray, setCategoriesArray] = useState([])
  let array = []

  const selectCategory = (e) => {
    array = []
    console.log('e', e)
    for (let i = 0; i < e.length; i++) {
      array.push(e[i].value)
    }
    setCategoriesArray(array)
  }

  useEffect(() => {
    console.log('categoriesArray', categoriesArray)
    setFormFields({ ...formFields, categories: categoriesArray })
  }, [categoriesArray])

  const options = [
    { value: '0', label: 'All' },
    { value: '1', label: 'Baby' },
    { value: '2', label: 'Beauty' },
    { value: '3', label: 'Books' },
    { value: '4', label: 'Fashion' },
    { value: '5', label: 'Car & Motorbike' },
    { value: '6', label: 'CDs & Vinyl' },
    { value: '7', label: 'Computers & Accessories' },
    { value: '8', label: 'DVD & Blu-ray' },
    { value: '9', label: 'Electronics & Photo' },
    { value: '10', label: 'Garden & Outdoors' },
    { value: '11', label: 'Health & Personal care' },
    { value: '12', label: 'Home & Kitchen' },
    { value: '13', label: 'Industrial & Scientific' },
    { value: '14', label: 'Large Appliances' },
    { value: '15', label: 'Luggage & Travel Gear' },
    { value: '16', label: 'Musical Instruments' },
    { value: '17', label: 'Consoles & Video Games' },
    { value: '18', label: 'Pet Supplies' },
    { value: '19', label: 'Sports & Outdoors' },
    { value: '20', label: 'Stationary & Office Supplies' },
    { value: '21', label: 'Toys & Games' }
  ]
  // ! JSX
  return (
    <main className="form-page">
      <Container className='mt-4'>
        <Row>
          <div className='div-form col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
            <form className='form-perso' onSubmit={handleSubmit}>
              <h1>Edit Ad</h1>
              {/* Name */}
              <label htmlFor="name">Description<span>*</span></label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={formFields.description}
                placeholder="Description"
                required
              />
              <label htmlFor="name">Brand</label>
              <input
                type="text"
                name="brand"
                onChange={handleChange}
                value={formFields.brand}
                placeholder="Brand"
              />
              <label htmlFor="name">Dimensions</label>
              <input
                type="text"
                name="dimensions"
                onChange={handleChange}
                value={formFields.dimensions}
                placeholder="Dimensions"
              />
              <label htmlFor="name">Weight</label>
              <input
                type="text"
                name="weight"
                onChange={handleChange}
                value={formFields.weight}
                placeholder="Weight"
              />
              <label htmlFor="name">About</label>
              <input
                type="text"
                name="about"
                onChange={handleChange}
                value={formFields.about}
                placeholder="About"
              />
              <label htmlFor="name">Price<span>*</span></label>
              <input
                type="text"
                name="price"
                onChange={handleChange}
                value={formFields.price}
                placeholder="Price"
                required
              />
              <div className='post-cat'>
                <p>Categorize your ad:</p>
                <Select options={options} isClearable={true} isMulti onChange={selectCategory} />
              </div>
              {errors && errors.description && <small className='text-danger'>{errors.description}</small>}
              <p>Images: {imagesCount}</p>
              <div className='flex-images-pre'>
                {formFields.image ?
                  (formFields.image.split(' ')).map((image, index) => {
                    return (
                      <div key={index} className="profile-card-image bottom-images" style={{ backgroundImage: `url(${image})` }}></div>
                    )
                  })

                  :
                  <p>none</p>
                }
              </div>
              {/* Image */}
              {/* <label>Upload an image for your ad:</label> */}
              <label>
                + Add Images
                <br />
                <span>up to {(10 - imagesCount) > 0 ? (10 - imagesCount) : 0} more images (10 total)</span>
                <input
                  type="file"
                  name="images"
                  onChange={handleUpload}
                  multiple
                  accept="image/png , image/jpeg, image/webp, image/jpg"
                />
              </label>
              <div className="images">
                {selectedImages &&
                  selectedImages.map((image, index) => {
                    return (
                      <div key={image}>

                        <img src={image} height="80" width="80" alt="upload" />
                        <button onClick={() => deleteHandler(image)}>
                          ❌
                        </button>
                        <p>{index + 1}</p>

                      </div>
                    )
                  })}
              </div>

              {/* <ImageUpload
              formFields={formFields}
              setFormFields={setFormFields}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            /> */}
              {/* <label htmlFor="image">Image <span>*</span></label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              value={formFields.image}
              placeholder="Image"
              required
            /> */}
              {/* {errors && errors.image && <small className='text-danger'>{errors.image}</small>} */}
              {/* Generic Message Error */}

              {/* Submit */}
              {formFields.image.split(' ').length > 0 &&
                (formFields.image.split(' ').length > 10 ? (
                  <p className="error">
                    You cannot upload more than 10 images! <br />
                    <span>
                      please delete <b> {imagesCount - 10} </b> of them{' '}
                    </span>
                  </p>
                ) : (
                  <button className='btn-form'>Post my adv</button>
                ))}
              {errors && errors.message && <small className='text-danger'>{errors.message}</small>}
            </form>
          </div>
        </Row>
      </Container>
      {/* <ProductFormEdit
        handleSubmit={handleSubmit}
        formFields={formFields}
        setFormFields={setFormFields}
        errors={errors}
        setErrors={setErrors}
        formName="Edit ad"
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        imagesCount={imagesCount}
      /> */}
    </main >
  )
}

export default EditProduct
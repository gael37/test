import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken, getPayload } from '../../../helpers/auth'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Select from 'react-select'
import { options } from '../../../helpers/constants'
// s
const ProductNew = () => {

  // ! State

  const [errors, setErrors] = useState(null)
  const [selectedImages, setSelectedImages] = useState([])

  const [formFields, setFormFields] = useState({
    description: '',
    images: '',
    brand: '',
    dimensions: '',
    weight: '',
    about: '',
    price: '',
  })

  const navigate = useNavigate()

  const currentUserId = getPayload().sub
  console.log('current user id: ', currentUserId)

  const [categoriesArray, setCategoriesArray] = useState([])
  let array = []
  let imagesString = ''


  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    imagesString = selectedImages.join(' ')
    const categoriesPKArray = categoriesArray.map(item => {
      if (item === 'Baby') {
        return 1
      } else if (item === 'Beauty') {
        return 2
      } else if (item === 'Books') {
        return 3
      } else if (item === 'Fashion') {
        return 4
      } else if (item === 'Car & Motorbike') {
        return 5
      } else if (item === 'CDs & Vinyl') {
        return 6
      } else if (item === 'Computers & Accessories') {
        return 7
      } else if (item === 'DVD & Blu-ray') {
        return 8
      } else if (item === 'Electronics & Photo') {
        return 9
      } else if (item === 'Garden & Outdoors') {
        return 10
      } else if (item === 'Health & Personal care') {
        return 11
      } else if (item === 'Home & Kitchen') {
        return 12
      } else if (item === 'Industrial & Scientific') {
        return 13
      } else if (item === 'Large Appliances') {
        return 14
      } else if (item === 'Luggage & Travel Gear') {
        return 15
      } else if (item === 'Musical Instruments') {
        return 16
      } else if (item === 'Video Games & Consoles') {
        return 17
      } else if (item === 'Pet Supplies') {
        return 18
      } else if (item === 'Sports & Outdoors') {
        return 19
      } else if (item === 'Stationary & Office Supplies') {
        return 10
      } else if (item === 'Toys & Games') {
        return 21
      }
    }
    )
    try {
      console.log('form fields', formFields)
      await axios.post('/api/products/', { ...formFields, images: imagesString, owner: currentUserId, categories: categoriesPKArray }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('Product posted ✅')
      navigate('/')
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  const handleChange = (e) => {
    // console.log(`${e.target.name}: ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    // Removing unneeded errors
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }

  const selectCategory = (e) => {
    array = []
    console.log('e', e)
    for (let i = 0; i < e.length; i++) {
      array.push(e[i].value)
    }
    setCategoriesArray(array)
  }

  // useEffect(() => {
  //   console.log('categoriesArray', categoriesArray)
  //   setFormFields({ ...formFields, categories: categoriesArray })
  // }, [categoriesArray])

  const onSelectFile = async (event) => {
    const imagesArray = []
    // let imageString = ''
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
        imagesArray.push(data.secure_url)
        // imageString = imageString + ' ' + data.secure_url
        // console.log('imageString', imageString)
        // Upload preset
        // Sending data as an axios request to the cloudinary API
      } catch (err) {
        console.log(err)
      }
    }
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)

    // const imagesArray = selectedFilesArray.map((file) => {
    //   return URL.createObjectURL(file)
    // })
    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
    // setFormFields({ ...formFields, images: imageString })
  }

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    URL.revokeObjectURL(image)
  }

  return (
    <main className="form-page">
      <Container className='mt-4'>
        <Row>
          <div className='div-form col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
            <form className='form-perso' onSubmit={handleSubmit}>
              <h1>New product</h1>
              {/* Description */}
              <label htmlFor="name">Description<span>*</span></label>
              <input
                className='form-input'
                type="text"
                name="description"
                onChange={handleChange}
                value={formFields.description}
                placeholder="Description"
                required
              />
              {/* Dimensions */}
              <label htmlFor="name">Dimensions</label>
              <input
                className='form-input'
                type="text"
                name="dimensions"
                onChange={handleChange}
                value={formFields.dimensions}
                placeholder="Dimensions"
              />
              {/* Weight */}
              <label htmlFor="name">Weight</label>
              <input
                className='form-input'
                type="text"
                name="weight"
                onChange={handleChange}
                value={formFields.weight}
                placeholder="Weight"
              />
              {/* About */}
              <label htmlFor="name">About</label>
              <input
                className='form-input'
                type="text"
                name="about"
                onChange={handleChange}
                value={formFields.about}
                placeholder="About"
              />
              {/* Price */}
              <label htmlFor="name">Price<span>*</span></label>
              <input
                className='form-input'
                type="text"
                name="price"
                onChange={handleChange}
                value={formFields.price}
                placeholder="Price"
                required
              />
              {/* Categories */}
              <div className='post-cat'>
                <p>Categorize your ad:</p>
                <Select className='select-input' options={options} isClearable={true} isMulti onChange={selectCategory} />
              </div>
              {errors && errors.description && <small className='text-danger'>{errors.description}</small>}
              {/* Images */}
              <label>Upload images for your ad:</label>
              <section>
                <label>


                  <span>up to 10 images</span>
                  <input
                    type="file"
                    name="images"
                    onChange={onSelectFile}
                    multiple
                    accept="image/png , image/jpeg, image/webp"
                  />
                </label>

                {selectedImages.length > 0 &&
                  (selectedImages.length > 10 ? (
                    <p className="error">
                      You can&apos;t upload more than 10 images! <br />
                      <span>
                        please delete <b> {selectedImages.length - 10} </b> of them{' '}
                      </span>
                    </p>
                  ) : (
                    <p>Image{selectedImages.length === 1 ? '' : 's'} uploaded! ✅</p>
                  ))}

                <div className="images">
                  {selectedImages &&
                    selectedImages.map((image, index) => {
                      return (
                        <div key={image} className="image">
                          <img src={image} height="50" width="50" alt="upload" />
                          <button onClick={() => deleteHandler(image)}>
                            delete image
                          </button>
                          <p>{index + 1}</p>
                        </div>
                      )
                    })}
                </div>
              </section>
              {/* Generic Message Error */}
              {errors && errors.message && <small className='text-danger'>{errors.message}</small>}
              {/* Submit */}
              {selectedImages.length > 0 &&
                (selectedImages.length > 10 ? (
                  <p className="error" >Post my ad</p>
                ) : (
                  <button className='btn-form' >Post my adv</button>
                ))}
            </form>
          </div>
        </Row>
      </Container>
    </main>
  )

}

export default ProductNew
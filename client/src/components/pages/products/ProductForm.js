// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ImagesUploadTest from '../../ImagesUploadTest'
import ImagesUpload from '../../ImagesUploadTest'
import ImageUpload from '../../ImagesUploadTest'

import React, { useEffect } from 'react'
import Select from 'react-select'
import { useState } from 'react'

const ProductForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

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


  return (
    <Container className='mt-4'>
      <Row>
        <div className='div-form col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
          <form className='form-perso' onSubmit={handleSubmit}>
            <h1>{formName}</h1>
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
            {/* Image */}
            <label>Upload an image for your ad:</label>
            <ImageUpload
              formFields={formFields}
              setFormFields={setFormFields}
            />
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
            {errors && errors.message && <small className='text-danger'>{errors.message}</small>}
            {/* Submit */}
            <button className='btn-form'>Post my adv</button>
          </form>
        </div>
      </Row>
    </Container>
  )
}

export default ProductForm
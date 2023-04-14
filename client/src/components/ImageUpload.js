import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const ImageUpload = ({ formFields, setFormFields }) => {

  const [selectedImages, setSelectedImages] = useState([])


  const handleChange = async (event) => {
    let imageString = ''
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
    setFormFields({ ...formFields, image: imageString })

  }

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    URL.revokeObjectURL(image)
  }

  return (
    <>
      <p>Hey</p>
      <div className="image-upload-div">

        <>
          {/* <img src={formFields.image} alt="Product Image" /> */}

          <p>+ Add Images <span>up to 10 images</span></p>
          <input
            className="input"
            type="file"
            onChange={handleChange}
            multiple
          // accept="image/png , image/jpeg, image/webp"
          // multiple='true'
          />
          <div className="images">
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className="image">
                    <img src={image} height="200" alt="upload" />
                    <button onClick={() => deleteHandler(image)}>
                      delete image
                    </button>
                    <p>{index + 1}</p>
                  </div>
                )
              })}
          </div>
        </>


      </div>
    </>

  )
}

export default ImageUpload
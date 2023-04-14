import axios from 'axios'
import { useEffect } from 'react'

const ImagesUploadTest = ({ formFields, setFormFields }) => {

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
    setFormFields({ ...formFields, image: imageString })

  }

  return (
    <>
      <p>Hey</p>
      <div className="image-upload-div">
        {formFields.image ?
          <>
            <img src={formFields.image} alt="Product Image" />
            <input
              className="input"
              type="file"
              onChange={handleChange}
              multiple
            // accept="image/png , image/jpeg, image/webp"
            // multiple='true'
            />
          </>
          :
          <input
            className="input"
            type="file"
            onChange={handleChange}
            multiple
          />
        }
      </div>
    </>

  )
}

export default ImagesUploadTest
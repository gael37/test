import axios from 'axios'
import { useEffect, useState } from 'react'

const ImageUpload = ({ formFields, setFormFields, selectedImages, setSelectedImages }) => {

  useEffect(() => {
    console.log('selected images: ', selectedImages)
  }, [selectedImages])

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

  return (
    <>
      <label>
        + Add Images
        <br />
        <span>up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      {/* {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You cannot upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{' '}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(selectedImages)
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? '' : 'S'}
          </button>
        ))} */}
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

  )
}

export default ImageUpload
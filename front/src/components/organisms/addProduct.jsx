import '../../utils/styles/App.scss'

import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '../../utils/Context'
import FormData from 'form-data'

import ProductForm from '../molecules/productForm'
import ProductServices from '../../api/Services/ProductServices'

export default function AddProduct({ className, handleSubmit }) {
  const { userData, getProducts } = useContext(Context)
  const postServices = new ProductServices()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [file, setFile] = useState(null)
  const [fileDataURL, setFileDataURL] = useState(null)

  const imageMimeType = /image\/(png|jpg|jpeg)/i

  const productInfo = {
    name: 'name',
    description: 'description',
    brand: 'brand',
    model: 'model',
    price: 'price',
    weight: 'weight',
    category: 'category',
    image: 'image',
  }

  async function HandleSubmit(e) {
    e.preventDefault()
    if (e.target[`${productInfo.description}`].value.trim() === '') {
      e.target[`${productInfo.description}`].value = ''
      setError('Votre description est vide')
    } else {
      const formData = new FormData()
      formData.append('name', e.target['name'].value)
      formData.append('description', e.target['description'].value)
      formData.append('brand', e.target['brand'].value)
      formData.append('model', e.target['model'].value)
      formData.append('price', e.target['price'].value)
      formData.append('weight', e.target['weight'].value)
      formData.append('category', e.target['category'].value)
      formData.append('image', file)
      try {
        console.log(...formData)
        await postServices.postProduct(formData)
        setFile(null)
        getProducts()
        navigate('/', { replace: true })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      alert('Image mime type is not valid')
      return
    }
    setFile(file)
  }

  useEffect(() => {
    let fileReader,
      isCancel = false
    if (file) {
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [file])
  return (
    <>
      <h2>AJOUTER UN PRODUIT</h2>
      <ProductForm
        className={className}
        onSubmit={HandleSubmit}
        product={productInfo}
        handleImage={handleImageChange}
      />
      {fileDataURL ? (
        <p className="img-preview-wrapper">
          {<img src={fileDataURL} alt="preview" />}
        </p>
      ) : null}
    </>
  )
}

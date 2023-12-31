import React, { useState } from 'react'
import DefaultTemplate from '../Templates/DefaultTemplate'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const CatalogAddForm = () => {
  const navigate = useNavigate()
  const [nama_produk, setNama_Produk] = useState('')
  const [harga, setHarga] = useState('')
  const [file, setFile] = useState('')
  const [previewImg, setPreviewImg] = useState('')
  const [publish, setPublish] = useState(1)

  const loadImage = e => {
    const image = e.target.files[0]
    setFile(image)
    setPreviewImg(URL.createObjectURL(image))
  }

  const saveCatalog = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nama_produk', nama_produk)
    formData.append('harga', harga)
    formData.append('publish', publish)
    formData.append('file', file)

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/catalog`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      })
      navigate('/catalog')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DefaultTemplate>
      <div className='pt-20 max-w-lg mx-auto'>
        <div className='flex justify-between items-center'>
          <h1 className="text-3xl font-bold mb-6">Tambah Catalog</h1>
          <Link to={'/catalog'} className="pill_badge_red">Batalkan</Link>
        </div>
        <form onSubmit={saveCatalog} className='w-full'>
          <div className="mb-6">
            <label
              htmlFor="nama_produk">
              Nama Produk
            </label>
            <input
              type="text"
              id="nama_produk"
              className="form_input"
              required
              value={nama_produk}
              onChange={e => setNama_Produk(e.target.value)} />
          </div>
          <div className="mb-6">
            <label
              htmlFor="harga">Harga Produk</label>
            <input
              type="number"
              id="harga"
              className="form_input"
              required
              value={harga}
              onChange={e => setHarga(e.target.value)} />
          </div>
          <div className="mb-6">
            <label htmlFor="file_input">Upload file</label>
            {previewImg ? (<img className="h-auto max-w-lg rounded-lg mb-6 w-40" src={previewImg} alt="Preview Image Product" />) : ''}
            <input
              className="form_file"
              id="file_input"
              type="file"
              onChange={loadImage} />
          </div>
          <div className="mb-6 flex gap-x-5">
            <div className="flex items-center">
              <input
                id="published"
                type="radio"
                value='1'
                name='status'
                className="form_radio"
                onChange={e => setPublish(e.target.value)} />
              <label
                htmlFor="published" className='m-0'>Publish</label>
            </div>
            <div className="flex items-center">
              <input
                id="unpublished"
                type="radio"
                value='0'
                name='status'
                className="form_radio"
                onChange={e => setPublish(e.target.value)} />
              <label
                htmlFor="unpublished" className='m-0'>Unpublish</label>
            </div>
          </div>
          <button
            type="submit"
            className="form_button">Tambah Catalog</button>
        </form>
      </div>
    </DefaultTemplate>
  )
}

export default CatalogAddForm

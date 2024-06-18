import './createArticle.scss'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer.jsx'
import Header from '../../components/Header/Header.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { createArticle } from '../../redux/actions/articleActions.js'
import { useNavigate } from 'react-router-dom'
import { fetchCityInfo } from '../../utils/helpers.js'
import { categories } from '../../assets/categories.js'

const CreateArticle = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [uploads, setUploads] = useState([])
    const [previews, setPreviews] = useState([])

    console.log('uploads: ', uploads)
    const articleCreate = useSelector((state) => state.articleCreate)
    const { success, article } = articleCreate

    useEffect(() => {
        if (success) {
            console.log('Article created:', article)
            navigate('/create-article/success')
        }
    }, [success, article, navigate])

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const formDataToSubmit = new FormData()
        formDataToSubmit.append('title', title)
        formDataToSubmit.append('category', category)
        formDataToSubmit.append('price', price)
        formDataToSubmit.append('type', type)
        formDataToSubmit.append('description', description)
        formDataToSubmit.append('postalCode', postalCode)
        formDataToSubmit.append('city', city)
        uploads.forEach((file, index) => {
            console.log('file: ', file)
            formDataToSubmit.append('uploads', file)
        })

        for (let [key, value] of formDataToSubmit.entries()) {
            console.log(key, value)
        }

        dispatch(createArticle(formDataToSubmit))
    }

    const handlePLZSubmit = async () => {
        const cityResult = await fetchCityInfo(postalCode.trim())
        setCity(cityResult || '')
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files)

        const fileSet = new Set(uploads)
        selectedFiles.forEach(file => fileSet.add(file))

        const newUploads = Array.from(fileSet).slice(0, 5)

        const newPreviews = newUploads.map(file => URL.createObjectURL(file))

        setUploads(newUploads)
        setPreviews(newPreviews)
    }

    const handleRemovePreview = (index) => {
        const newUploads = uploads.filter((_, i) => i !== index)
        const newPreviews = previews.filter((_, i) => i !== index)

        setUploads(newUploads)
        setPreviews(newPreviews)

        URL.revokeObjectURL(previews[index])
    }

    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url))
        }
    }, [previews])

    return (
        <div className="create-article">
            <Header />
            <div className="form-container">
                <form className="create-article-form" onSubmit={handleFormSubmit}>
                    <div className="form-item">
                        <label htmlFor="title" className="form-label">Titel</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="category" className="form-label">Kategorie</label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Bitte wählen</option>
                            {categories
                                .filter(cat => cat.key !== 'alle-kategorien')
                                .map(cat => (
                                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                                ))}
                        </select>
                    </div>
                    <div className="form-item">
                        <label htmlFor="price" className="form-label">Preis</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-item">
                        <label className="form-label">Typ</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="Festpreis"
                                    checked={type === 'Festpreis'}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                                Festpreis
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="Verhandelbar"
                                    checked={type === 'Verhandelbar'}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                                Verhandelbar
                            </label>
                        </div>
                    </div>
                    <div className="form-item">
                        <label htmlFor="description" className="form-label">Beschreibung</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-item">
                        <label className="form-label">PLZ</label>
                        <div className="postal-code-container">
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                            <button type="button" onClick={handlePLZSubmit}>
                                Stadt suchen
                            </button>
                        </div>
                    </div>
                    <div className="form-item">
                        <label htmlFor="city" className="form-label">Stadt</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            readOnly
                            disabled
                        />
                    </div>
                    <div className="form-item">
                        <label className="form-label">Upload</label>
                        <input
                            type="file"
                            id="uploads"
                            name="uploads"
                            multiple
                            onChange={handleFileChange}
                        />
                        <div className="preview-container">
                            {previews.map((preview, index) => (
                                <div key={index} className="preview-item">
                                    <img src={preview} alt={`Preview ${index + 1}`} />
                                    <button
                                        type="button"
                                        className="remove-button"
                                        onClick={() => handleRemovePreview(index)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="submit-item">
                        <button type="submit" className="submit-button">
                            Anzeige aufgeben
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default CreateArticle

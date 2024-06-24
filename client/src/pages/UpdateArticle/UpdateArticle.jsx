import './updateArticle.scss'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { updateArticle, fetchArticleById, resetArticleUpdate } from '../../redux/actions/articleActions.js'
import { useNavigate, useParams } from 'react-router-dom'
import { categories } from '../../assets/categories.js'
import { cities } from '../../assets/cities.js'

const UpdateArticle = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { articleId } = useParams()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [uploadFiles, setUploadFiles] = useState([])
    const [previewUrls, setPreviewUrls] = useState([])

    const articleDetails = useSelector((state) => state.articleDetails)
    const { article, loading, error } = articleDetails

    const articleUpdate = useSelector((state) => state.articleUpdate)
    const { success } = articleUpdate

    useEffect(() => {
        if (articleId) {
            dispatch(fetchArticleById(articleId))
        }
    }, [dispatch, articleId])

    useEffect(() => {
        if (article) {
            setTitle(article.title)
            setCategory(article.category)
            setPrice(article.price)
            setType(article.type)
            setDescription(article.description)
            setCity(article.city)
            setUploadFiles(article.imgUrls ? article.imgUrls.map(url => ({ url })) : [])
            setPreviewUrls(article.imgUrls || [])
        }
    }, [article])

    useEffect(() => {
        if (success) {
            navigate('/update-success')
            dispatch(resetArticleUpdate())
        }
    }, [success, navigate])

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const formDataToSubmit = new FormData()
        formDataToSubmit.append('title', title)
        formDataToSubmit.append('category', category)
        formDataToSubmit.append('price', price)
        formDataToSubmit.append('type', type)
        formDataToSubmit.append('description', description)
        formDataToSubmit.append('city', city)

        const existingImgUrls = uploadFiles
            .filter(file => !(file instanceof File))
            .map(file => file.url)

        formDataToSubmit.append('existingImgUrls', JSON.stringify(existingImgUrls))

        uploadFiles.forEach(file => {
            if (file instanceof File) {
                formDataToSubmit.append('uploads', file)
            }
        })

        dispatch(updateArticle(articleId, formDataToSubmit))
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files)

        const validFiles = selectedFiles.filter(file => file && file instanceof File)

        const currentFileCount = uploadFiles.filter(file => file instanceof File).length

        if (currentFileCount + validFiles.length > 5) {
            console.log('Cannot exceed 5 files.')
            return
        }

        const newUploadFiles = [...uploadFiles, ...validFiles.slice(0, 5 - currentFileCount)]
        const newPreviewUrls = [...previewUrls, ...validFiles.map(file => URL.createObjectURL(file))]

        setUploadFiles(newUploadFiles)
        setPreviewUrls(newPreviewUrls)
    }

    const handleRemovePreview = (index) => {
        const newUploadFiles = uploadFiles.filter((_, i) => i !== index)
        const newPreviewUrls = previewUrls.filter((_, i) => i !== index)

        if (uploadFiles[index] instanceof File) {
            URL.revokeObjectURL(previewUrls[index])
        }

        setUploadFiles(newUploadFiles)
        setPreviewUrls(newPreviewUrls)
    }

    return (
        <div className="update-article">
            <Header />
            <div className="form-container">
                <form className="update-article-form" onSubmit={handleFormSubmit}>
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
                            {categories.map(cat => (
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
                        <label htmlFor="city" className="form-label">Stadt</label>
                        <select
                            id="city"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        >
                            <option value="">Bitte wählen</option>
                            {cities.map(city => (
                                <option key={city.key} value={city.key}>{city.name}</option>
                            ))}
                        </select>
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
                            {previewUrls.map((preview, index) => (
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
                            Anzeige aktualisieren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateArticle

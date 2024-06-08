import './createArticle.scss'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const onSubmit = async (data) => {
    const apiUrl = 'http://localhost:5000/api/createArticle'

    try {
        const response = await axios.post(apiUrl, data)
        console.log('Response:', response.data)
    } catch (error) {}
}

const CreateArticle = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [files, setFiles] = useState([])

    const onDrop = (acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        )
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div className="main">
            <Header />
            <div className="formContainer">
                <form
                    className="formBox"
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ minWidth: 450, maxWidth: 500 }}
                >
                    <div className="formItem">
                        <label htmlFor="title">Titel</label>
                        <input
                            id="title"
                            {...register('title', { required: true })}
                        />
                        {errors.title && <span>This field is required</span>}
                    </div>
                    <div className="formItem">
                        <label htmlFor="price">Preis</label>
                        <input
                            id="price"
                            {...register('price', { required: true })}
                        />
                        {errors.price && <span>This field is required</span>}
                    </div>
                    <div className="formItem">
                        <label htmlFor="category">Kategorie</label>
                        <select
                            id="category"
                            {...register('category', { required: true })}
                        >
                            <option value="Elektronik">Elektronik</option>
                            <option value="Sport">Sport</option>
                            <option value="Mode">Mode</option>
                        </select>
                        {errors.category && <span>This field is required</span>}
                    </div>
                    <div className="formItem">
                        <label id="type-label">Type</label>
                        <div className="priceInputs">
                            <input
                                type="radio"
                                value="Festpreis"
                                {...register('type', { required: true })}
                                aria-labelledby="type-label"
                            />{' '}
                            Festpreis
                            <input
                                type="radio"
                                value="Verhandelbar"
                                {...register('type', { required: true })}
                                aria-labelledby="type-label"
                            />{' '}
                            Verhandelbar
                            <input
                                type="radio"
                                value="Verschenken"
                                {...register('type', { required: true })}
                                aria-labelledby="type-label"
                            />{' '}
                            zu Verschenken
                        </div>
                        {errors.type && <span>This field is required</span>}
                    </div>
                    <div className="formItem">
                        <label htmlFor="description">Beschreibung</label>
                        <textarea
                            id="description"
                            rows="4"
                            {...register('description', { required: true })}
                        ></textarea>
                        {errors.description && (
                            <span>This field is required</span>
                        )}
                    </div>
                    <div className="formItem">
                        <label>Upload</label>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop</p>
                        </div>
                        <div className="thumbnails">
                            {files.map((file) => (
                                <div key={file.name}>
                                    <img
                                        src={file.preview}
                                        alt={file.name}
                                        width={100}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="formItem">
                        <button type="submit">Fertig!</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default CreateArticle

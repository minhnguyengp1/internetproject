import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete' // Import Autocomplete from Material-UI
import TextField from '@mui/material/TextField' // Import TextField from Material-UI
import './bundeslandAutocomplete.scss' // Example styling

const BundeslandAutocomplete = ({ onSelect }) => {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])

    // Simulated Bundesland data
    const bundeslaender = [
        'Schleswig-Holstein',
        'Hamburg',
        'Niedersachsen',
        'Bremen',
        'Nordrhein-Westfalen',
        'Hessen',
        'Rheinland-Pfalz',
        'Baden-Württemberg',
        'Bayern',
        'Saarland',
        'Berlin',
        'Brandenburg',
        'Mecklenburg-Vorpommern',
        'Sachsen',
        'Sachsen-Anhalt',
        'Thüringen'
    ]

    // Filter Bundesland suggestions based on input value
    const filterBundeslaender = (inputValue) => {
        return bundeslaender.filter((bundesland) =>
            bundesland.toLowerCase().includes(inputValue.toLowerCase())
        )
    }

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        setSuggestions(filterBundeslaender(e.target.value))
    }

    // Handle selection from suggestions
    const handleSelect = (value) => {
        setInputValue(value)
        onSelect(value)
    }

    return (
        <div className="autocomplete-root">
            <Autocomplete
                freeSolo
                disableClearable
                options={bundeslaender}
                value={inputValue}
                onChange={(event, newValue) => handleSelect(newValue)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) =>
                    handleInputChange({ target: { value: newInputValue } })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Ort"
                        variant="standard"
                        className="autocomplete-input"
                    />
                )}
                classes={{
                    paper: 'autocomplete-suggestions',
                    option: 'autocomplete-suggestion'
                    // noOptions: 'autocomplete-no-options'
                    // popper: 'autocomplete-popper'
                }}
            />
        </div>
    )
}

export default BundeslandAutocomplete

import React from 'react'
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage.jsx'

const SuccessCreate = () => {
    return (
        <SuccessMessage
            title="Geschafft!"
            subTitle="Your article is now online."
            primaryButtonText="Go to Homepage"
            primaryButtonLink="/"
            secondaryButtonText="View Your Articles"
            secondaryButtonLink="/user/articles"
        />
    )
}

export default SuccessCreate

import React from 'react'
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage.jsx'

const SuccessUpdate = () => {
    return (
        <SuccessMessage
            title="Updated Successfully!"
            subTitle="Your article has been updated."
            primaryButtonText="Go to Homepage"
            primaryButtonLink="/"
            secondaryButtonText="View Your Updated Article"
            secondaryButtonLink="/user/articles"
        />
    )
}

export default SuccessUpdate

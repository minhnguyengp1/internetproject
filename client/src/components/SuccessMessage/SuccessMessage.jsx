import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Result } from 'antd'
import PropTypes from 'prop-types'
import './successMessage.scss'

const SuccessMessage = ({
                            status = 'success',
                            title = 'Success!',
                            subTitle = 'Your action was successful.',
                            primaryButtonText = 'Go to Homepage',
                            primaryButtonLink = '/',
                            secondaryButtonText = 'View Your Articles',
                            secondaryButtonLink = '/user/articles'
                        }) => {
    return (
        <div className="success-message">
            <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={[
                    <Button type="primary" key="primary">
                        <Link to={primaryButtonLink}>{primaryButtonText}</Link>
                    </Button>,
                    <Button key="secondary">
                        <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
                    </Button>
                ]}
            />
        </div>
    )
}

SuccessMessage.propTypes = {
    status: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    primaryButtonText: PropTypes.string,
    primaryButtonLink: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    secondaryButtonLink: PropTypes.string
}

export default SuccessMessage

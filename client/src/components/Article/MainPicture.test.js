import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MainPicture from './MainPicture'

describe('MainPicture Component', () => {
    it('renders correctly and displays the expected text', () => {
        render(<MainPicture />)

        expect(screen.getByText('Main Picture1')).toBeInTheDocument()

        const anchorElement = screen.getByText('Main Picture1').closest('a')
        expect(anchorElement).toBeInTheDocument()
    })
})

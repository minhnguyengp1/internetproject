import React from 'react'
import { render, screen } from '@testing-library/react'
import HomeLayout from './HomeLayout'

jest.mock('../../components/Header/Header.jsx', () => () => <div>Header</div>)
jest.mock('../../components/CategorySidebar/CategorySidebar.jsx', () => () => (
    <div>CategorySidebar</div>
))

describe('HomeLayout', () => {
    test('renders the Header and CategorySidebar components', () => {
        render(
            <HomeLayout>
                <div>Child Content</div>
            </HomeLayout>
        )

        expect(screen.getByText('Header')).toBeInTheDocument()
        expect(screen.getByText('CategorySidebar')).toBeInTheDocument()
    })

    test('renders children correctly', () => {
        render(
            <HomeLayout>
                <div>Child Content</div>
            </HomeLayout>
        )

        expect(screen.getByText('Child Content')).toBeInTheDocument()
    })

    test('applies the correct layout structure', () => {
        const { container } = render(
            <HomeLayout>
                <div>Child Content</div>
            </HomeLayout>
        )

        expect(container.firstChild).toHaveClass('home-layout')
        expect(
            container.querySelector('.home-layout__content')
        ).toBeInTheDocument()
        expect(
            container.querySelector('.home-layout__main-content')
        ).toBeInTheDocument()
    })
})

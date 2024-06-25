import React from 'react'
import { render, screen } from '@testing-library/react'
import UserLayout from './UserLayout'

jest.mock('../../components/Header/Header.jsx', () => () => <div>Header</div>)
jest.mock('../../components/SideMenu/SideMenu.jsx', () => () => (
    <div>SideMenu</div>
))

describe('UserLayout', () => {
    test('renders the Header and SideMenu components', () => {
        render(
            <UserLayout>
                <div>Child Content</div>
            </UserLayout>
        )

        expect(screen.getByText('Header')).toBeInTheDocument()
        expect(screen.getByText('SideMenu')).toBeInTheDocument()
    })

    test('renders children correctly', () => {
        render(
            <UserLayout>
                <div>Child Content</div>
            </UserLayout>
        )

        expect(screen.getByText('Child Content')).toBeInTheDocument()
    })

    test('applies the correct layout structure', () => {
        const { container } = render(
            <UserLayout>
                <div>Child Content</div>
            </UserLayout>
        )

        expect(container.firstChild).toHaveClass('user-layout')
        expect(
            container.querySelector('.user-layout__content')
        ).toBeInTheDocument()
        expect(
            container.querySelector('.user-layout__main-content')
        ).toBeInTheDocument()
    })
})

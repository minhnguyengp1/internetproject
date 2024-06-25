import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SideMenu from './SideMenu'
import { act } from 'react-dom/test-utils'

describe('SideMenu', () => {
    const setup = (initialEntries = ['/user']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path="/*" element={<SideMenu />} />
                </Routes>
            </MemoryRouter>
        )
    }

    test('renders the menu items correctly', () => {
        setup()

        expect(screen.getByText('Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Profilinformationen')).toBeInTheDocument()
        expect(screen.getByText('Anzeigen')).toBeInTheDocument()
        expect(screen.getByText('Bewertungen')).toBeInTheDocument()
        expect(screen.getByText('Watchlist')).toBeInTheDocument()
        expect(screen.getByText('Follower')).toBeInTheDocument()
        expect(
            screen.getByText('Benutzer, denen du folgst')
        ).toBeInTheDocument()
        expect(screen.getByText('Einstellungen')).toBeInTheDocument()
    })

    test('highlights the selected menu item based on the current path', () => {
        setup(['/user/personal-info'])

        const selectedItem = screen
            .getByText('Profilinformationen')
            .closest('.ant-menu-item-selected')
        expect(selectedItem).toBeInTheDocument()
    })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './Footer'

describe('Footer', () => {
    it('renders footer sections with correct text and links', () => {
        render(<Footer />)

        expect(screen.getByText('Kleinanzeigen')).toBeInTheDocument()
        expect(screen.getByText('Informationen')).toBeInTheDocument()
        expect(screen.getByText('Für Unternehmen')).toBeInTheDocument()
        expect(screen.getByText('Folge uns:')).toBeInTheDocument()

        const links = [
            'Über uns',
            'Karriere',
            'Presse',
            'Kleinanzeigen Magazin',
            'Engagement',
            'Mobile Apps',
            'Hilfe',
            'Tipps für deine Sicherheit',
            'Kinder- und Jugendschutz',
            'Datenschutzerklärung',
            'Datenschutzeinstellungen',
            'Nutzungsbedingungen',
            'Impressum',
            'Kleinanzeigen Immobilien',
            'PRO für Unternehmen',
            'Werben auf Kleinanzeigen',
            'Facebook',
            'YouTube',
            'Instagram',
            'Pinterest',
            'TikTok',
        ]

        links.forEach((linkText) => {
            expect(screen.getByText(linkText)).toBeInTheDocument()
            expect(screen.getByText(linkText).closest('a')).toHaveAttribute(
                'href',
                '#'
            )
        })
    })
})

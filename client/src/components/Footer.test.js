import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer component', () => {
    test('renders Kleinanzeigen section with correct links', () => {
        render(<Footer />)

        // Check for the section title
        expect(screen.getByText('Kleinanzeigen')).toBeInTheDocument()

        // Check for the links
        expect(screen.getByText('Über uns').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/about'
        )
        expect(screen.getByText('Karriere').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/careers'
        )
        expect(screen.getByText('Presse').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/press'
        )
        expect(
            screen.getByText('Kleinanzeigen Magazin').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/magazine')
        expect(screen.getByText('Engagement').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/engagement'
        )
        expect(screen.getByText('Mobile Apps').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/mobile-apps'
        )
    })

    test('renders Informationen section with correct links', () => {
        render(<Footer />)

        // Check for the section title
        expect(screen.getByText('Informationen')).toBeInTheDocument()

        // Check for the links
        expect(screen.getByText('Hilfe').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/help'
        )
        expect(
            screen.getByText('Tipps für deine Sicherheit').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/safety-tips')
        expect(
            screen.getByText('Kinder- und Jugendschutz').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/youth-protection')
        expect(
            screen.getByText('Datenschutzerklärung').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/privacy-policy')
        expect(
            screen.getByText('Datenschutzeinstellungen').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/privacy-settings')
        expect(
            screen.getByText('Nutzungsbedingungen').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/terms-of-service')
        expect(screen.getByText('Impressum').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/impressum'
        )
    })

    test('renders Für Unternehmen section with correct links', () => {
        render(<Footer />)

        // Check for the section title
        expect(screen.getByText('Für Unternehmen')).toBeInTheDocument()

        // Check for the links
        expect(
            screen.getByText('Kleinanzeigen Immobilien').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/real-estate')
        expect(
            screen.getByText('PRO für Unternehmen').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/pro-for-business')
        expect(
            screen.getByText('Werben auf Kleinanzeigen').closest('a')
        ).toHaveAttribute('href', 'https://www.lorem.com/advertise')
    })

    test('renders social media links with correct URLs', () => {
        render(<Footer />)

        // Check for the social media text
        expect(screen.getByText('Folge uns:')).toBeInTheDocument()

        // Check for the links
        expect(screen.getByText('Facebook').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/facebook'
        )
        expect(screen.getByText('YouTube').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/youtube'
        )
        expect(screen.getByText('Instagram').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/instagram'
        )
        expect(screen.getByText('Pinterest').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/pinterest'
        )
        expect(screen.getByText('TikTok').closest('a')).toHaveAttribute(
            'href',
            'https://www.lorem.com/tiktok'
        )
    })
})

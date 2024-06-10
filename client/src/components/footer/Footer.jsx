import React from 'react'
import './footerStyle.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <p>Kleinanzeigen</p>
                    <a href="#">Über uns</a>
                    <a href="#">Karriere</a>
                    <a href="#">Presse</a>
                    <a href="#">Kleinanzeigen Magazin</a>
                    <a href="#">Engagement</a>
                    <a href="#">Mobile Apps</a>
                </div>
                <div className="footer-links">
                    <p>Informationen</p>
                    <a href="#">Hilfe</a>
                    <a href="#">Tipps für deine Sicherheit</a>
                    <a href="#">Kinder- und Jugendschutz</a>
                    <a href="#">Datenschutzerklärung</a>
                    <a href="#">Datenschutzeinstellungen</a>
                    <a href="#">Nutzungsbedingungen</a>
                    <a href="#">Impressum</a>
                </div>
                <div className="footer-links">
                    <p>Für Unternehmen</p>
                    <a href="#">Kleinanzeigen Immobilien</a>
                    <a href="#">PRO für Unternehmen</a>
                    <a href="#">Werben auf Kleinanzeigen</a>
                </div>
                <div className="footer-social">
                    <span>Folge uns:</span>
                    <a href="#">Facebook</a>
                    <a href="#">YouTube</a>
                    <a href="#">Instagram</a>
                    <a href="#">Pinterest</a>
                    <a href="#">TikTok</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer

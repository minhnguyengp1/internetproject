import React from 'react'
import './footerStyle.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <p>Kleinanzeigen</p>
                    <a href="https://www.lorem.com/about">Über uns</a>
                    <a href="https://www.lorem.com/careers">Karriere</a>
                    <a href="https://www.lorem.com/press">Presse</a>
                    <a href="https://www.lorem.com/magazine">
                        Kleinanzeigen Magazin
                    </a>
                    <a href="https://www.lorem.com/engagement">Engagement</a>
                    <a href="https://www.lorem.com/mobile-apps">Mobile Apps</a>
                </div>
                <div className="footer-links">
                    <p>Informationen</p>
                    <a href="https://www.lorem.com/help">Hilfe</a>
                    <a href="https://www.lorem.com/safety-tips">
                        Tipps für deine Sicherheit
                    </a>
                    <a href="https://www.lorem.com/youth-protection">
                        Kinder- und Jugendschutz
                    </a>
                    <a href="https://www.lorem.com/privacy-policy">
                        Datenschutzerklärung
                    </a>
                    <a href="https://www.lorem.com/privacy-settings">
                        Datenschutzeinstellungen
                    </a>
                    <a href="https://www.lorem.com/terms-of-service">
                        Nutzungsbedingungen
                    </a>
                    <a href="https://www.lorem.com/impressum">Impressum</a>
                </div>
                <div className="footer-links">
                    <p>Für Unternehmen</p>
                    <a href="https://www.lorem.com/real-estate">
                        Kleinanzeigen Immobilien
                    </a>
                    <a href="https://www.lorem.com/pro-for-business">
                        PRO für Unternehmen
                    </a>
                    <a href="https://www.lorem.com/advertise">
                        Werben auf Kleinanzeigen
                    </a>
                </div>
                <div className="footer-social">
                    <span>Folge uns:</span>
                    <a href="https://www.lorem.com/facebook">Facebook</a>
                    <a href="https://www.lorem.com/youtube">YouTube</a>
                    <a href="https://www.lorem.com/instagram">Instagram</a>
                    <a href="https://www.lorem.com/pinterest">Pinterest</a>
                    <a href="https://www.lorem.com/tiktok">TikTok</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer

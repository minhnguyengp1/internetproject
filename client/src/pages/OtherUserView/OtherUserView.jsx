import React, { useEffect, useState } from 'react';
import './OtherUserView.scss';

const OtherUserView = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [userArticles, setUserArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Dummy-Daten
        const dummyUserData = {
            name: 'K.P',
            address: '123 Main St, Springfield',
            activeSince: '06.07.2019',
            responseTime: 'in der Regel innerhalb von 10 Minuten',
            followers: 11,
            badges: [
                { text: 'TOP Zufriedenheit', color: 'purple' },
                { text: 'Besonders freundlich', color: 'purple' },
                { text: 'Besonders zuverlässig', color: 'purple' }
            ]
        };

        const dummyUserArticles = [
            {
                articleId: 1,
                title: 'PlayStation 4 (Ps4) + HDMI Kabel + Netzkabel',
                description: 'Liebe Interessenten hiermit verkaufe ich eine gut erhaltene PlayStation 4 inklusive HDMI Kabel und...',
                price: 75.0,
                location: '71364 Winnenden',
                date: 'Heute, 10:46',
                image: 'https://via.placeholder.com/150' // Beispielbild
            },
            {
                articleId: 2,
                title: 'PlayStation 4 Slim (Ps4) 1TB + Spiel + Controller',
                description: 'Liebe Interessenten hiermit verkaufe ich eine TOP erhaltene PlayStation 4 Slim inklusive einem...',
                price: 140.0,
                location: '71364 Winnenden',
                date: 'Gestern, 21:50',
                image: 'https://via.placeholder.com/150' // Beispielbild
            }
        ];

        // Simuliere den Ladevorgang
        setLoading(true);
        setTimeout(() => {
            setUserData(dummyUserData);
            setUserArticles(dummyUserArticles);
            setLoading(false);
        }, 1000); // Simuliert eine 1-Sekunden-Ladezeit
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="profile-container">
            {userData && (
                <div className="profile-sidebar">
                    <div className="profile-avatar">
                        <span className="profile-avatar-initials">{userData.name[0]}</span>
                    </div>
                    <h1 className="profile-name">{userData.name}</h1>
                    {userData.badges.map((badge, index) => (
                        <span key={index} className={`badge badge-${badge.color}`}>{badge.text}</span>
                    ))}
                    <p className="profile-detail">Privater Nutzer</p>
                    <p className="profile-detail">Aktiv seit {userData.activeSince}</p>
                    <p className="profile-detail">Antwortet {userData.responseTime}</p>
                    <p className="profile-detail">{userData.followers} Follower</p>
                    <button className="follow-button">Folgen</button>
                </div>
            )}
            <div className="profile-main">
                <h2>Articles</h2>
                <p>Total Articles: {userArticles.length}</p>
                <ul className="articles-list">
                    {userArticles.map(article => (
                        <li key={article.articleId} className="article-item">
                            <img src={article.image} alt={article.title} className="article-image"/>
                            <div className="article-details">
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <p className="article-price">{article.price} €</p>
                                <p className="article-location">{article.location}</p>
                                <p className="article-date">{article.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OtherUserView;

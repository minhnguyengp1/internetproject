export function getItem(label, key, children = null, type = null) {
    return { key, children, label, type }
}

export const items = [
    getItem('Elektronik', 'sub1', [
        getItem(
            'Computer & Zubehör',
            'sub1-1',
            [
                getItem('Laptops', '1-1'),
                getItem('Desktop-PCs', '1-2'),
                getItem('Monitore', '1-3'),
                getItem('Drucker', '1-4'),
            ],
            'group'
        ),
        getItem(
            'Smartphones & Tablets',
            'sub1-2',
            [
                getItem('Smartphones', '2-1'),
                getItem('Tablets', '2-2'),
                getItem('Zubehör', '2-3'),
            ],
            'group'
        ),
        getItem(
            'TV & Video',
            'sub1-3',
            [
                getItem('Fernseher', '3-1'),
                getItem('Projektoren', '3-2'),
                getItem('Player', '3-3'),
            ],
            'group'
        ),
        getItem(
            'Audio & Hifi',
            'sub1-4',
            [
                getItem('Kopfhörer', '4-1'),
                getItem('Lautsprecher', '4-2'),
                getItem('HiFi-Anlagen', '4-3'),
            ],
            'group'
        ),
    ]),
    getItem('Mode', 'sub2', [
        getItem('Damenmode', '5'),
        getItem('Herrenmode', '6'),
        getItem('Kindermode', '7'),
        getItem('Accessoires', '8'),
    ]),
    getItem('Haus & Garten', 'sub3', [
        getItem('Möbel', '9'),
        getItem('Dekoration', '10'),
        getItem('Garten', '11'),
        getItem('Heimwerken', '12'),
    ]),
    getItem('Freizeit & Sport', 'sub4', [
        getItem('Sportgeräte', '13'),
        getItem('Fahrräder', '14'),
        getItem('Musikinstrumente', '15'),
        getItem('Bücher', '16'),
    ]),
]

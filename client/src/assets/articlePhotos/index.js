// articlePhotos/index.js

import bike1 from './bike1.jpg'
import bike2 from './bike2.jpg'
import bike3 from './bike3.jpg'
import bike4 from './bike4.jpg'
import bike5 from './bike5.jpg'
import bike6 from './bike6.jpg'
import headset1 from './headset1.jpg'
import headset2 from './headset2.jpg'
import headset3 from './headset3.jpg'
import macbook1 from './macbook1.jpg'
import macbook2 from './macbook2.jpg'
import macbook3 from './macbook3.jpg'
import macbook4 from './macbook4.jpg'

const photos = {
    bike1,
    bike2,
    bike3,
    bike4,
    bike5,
    bike6,
    headset1,
    headset2,
    headset3,
    macbook1,
    macbook2,
    macbook3,
    macbook4,
}

const items = [
    {
        id: 1,
        name: 'Macbook 15 M2',
        description: 'Selling almost new MacBook.',
        type: 'Laptop',
        price: '899',
        createTime: '15.02.2024',
        img: macbook1,
    },
    {
        id: 2,
        name: 'High-Performance Mountain Bike',
        description:
            'Conquer any terrain with this high-performance mountain bike.',
        type: 'Bike',
        price: '699',
        createTime: '10.03.2024',
        img: bike2,
    },
    {
        id: 3,
        name: 'Premium Wireless Headset',
        description:
            'Immerse yourself in your favorite music with our premium wireless headset.',
        type: 'Headset',
        price: '129',
        createTime: '20.04.2024',
        img: headset3,
    },
    {
        id: 4,
        name: 'Macbook Pro 14',
        description:
            'Powerful, versatile, and portable, the new Macbook Pro 14 is the ultimate tool for creativity.',
        type: 'Laptop',
        price: '1799',
        createTime: '01.03.2024',
        img: macbook2,
    },
    {
        id: 5,
        name: 'City Commuter Bike',
        description:
            'Perfect for daily commuting in the city, this bike offers comfort and style.',
        type: 'Bike',
        price: '499',
        createTime: '05.04.2024',
        img: bike4,
    },
    {
        id: 6,
        name: 'Wireless Earbuds',
        description:
            'Enjoy crystal-clear sound and wireless freedom with our sleek and compact earbuds.',
        type: 'Headset',
        price: '79',
        createTime: '12.05.2024',
        img: headset1,
    },
    {
        id: 7,
        name: 'Macbook Air 13',
        description:
            'Thin, light, and powerful, the new Macbook Air 13 is perfect for work and play.',
        type: 'Laptop',
        price: '1299',
        createTime: '02.06.2024',
        img: macbook3,
    },
    {
        id: 8,
        name: 'Professional Gaming Headset',
        description:
            'Get the competitive edge with our professional gaming headset, designed for maximum comfort and performance.',
        type: 'Headset',
        price: '199',
        createTime: '18.07.2024',
        img: headset2,
    },
    {
        id: 9,
        name: 'Macbook Pro 16',
        description:
            'Unleash your creativity with the new Macbook Pro 16, featuring a stunning display and powerful performance.',
        type: 'Laptop',
        price: '2299',
        createTime: '10.08.2024',
        img: macbook4,
    },
]

export { photos, items }

import './categories.scss'

const Categories = () => {
    const categories = [
        { id: 1, name: 'Elektronik' },
        { id: 2, name: 'Kleidung' },
        { id: 3, name: 'Fahrzeuge' },
        { id: 4, name: 'Haushalt' },
        { id: 5, name: 'Sport & Freizeit' },
    ]

    return (
        <div className="categories">
            <h2>Kategorien</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories

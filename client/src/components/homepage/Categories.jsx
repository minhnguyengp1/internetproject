import React, { useState } from 'react'
import { Menu, ConfigProvider } from 'antd'
import { items } from '../../assets/categories'
import './categories.scss'

const Categories = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleCategorySelect = ({ key }) => {
        const selectedItem = items.find((item) => item.key === key)
        if (selectedItem) {
            if (selectedItem.label === 'All Categories') {
                setSelectedCategory(null)
                onSelectCategory(null)
            } else {
                setSelectedCategory(selectedItem.label)
                onSelectCategory(selectedItem.label)
            }
        }
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemSelectedBg: '#585858',
                        itemSelectedColor: '#ffffff',
                    },
                },
            }}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={['sub1']}
                className="categories"
                items={items}
                onSelect={handleCategorySelect}
            />
        </ConfigProvider>
    )
}

export default Categories

import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
    EditOutlined,
} from '@ant-design/icons'
import { Card, Space, Statistic, Table, Typography, Button } from 'antd'
import { useEffect, useState } from 'react'
// import { getCustomers, getInventory, getOrders, getRevenue } from '../../API'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../redux/actions/userActions'
import defaultAvatar from '../../assets/default-avatar.png'
import './style.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Dashboard() {
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        activeArticles: 0,
        activeSince: 'Unknown',
        img: defaultAvatar,
    })
    const [inventory, setInventory] = useState(0)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { error, userDetails: reduxUserDetails } = useSelector(
        (state) => state.userDetails
    )

    console.log('userDetails in Dashboard: ' + JSON.stringify(reduxUserDetails))

    useEffect(() => {
        // Dispatch fetchUserDetails action and update local states
        dispatch(fetchUserDetails()).then(() => {
            if (reduxUserDetails) {
                setUserDetails({
                    fullName: reduxUserDetails.fullName || '',
                    activeArticles: reduxUserDetails.activeArticles || 0,
                    activeSince: reduxUserDetails.activeSince || 'Unknown',
                    img: reduxUserDetails.img || defaultAvatar,
                })
            }
        })
    }, [dispatch, reduxUserDetails])

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Card style={{ width: '100%' }}>
                <Space direction="horizontal" size={16}>
                    <img
                        src={userDetails.img}
                        alt="Profile"
                        className="profile-pic" // Global styles
                    />
                    <Space direction="vertical">
                        <Typography.Text>
                            <strong>Name:</strong> {userDetails.fullName}
                        </Typography.Text>
                        <Typography.Text>
                            <strong>Anzeigen online:</strong>{' '}
                            {userDetails.activeArticles}
                        </Typography.Text>
                        <Typography.Text>
                            <strong>Aktiv seit:</strong>{' '}
                            {userDetails.activeSince}
                        </Typography.Text>
                    </Space>
                </Space>
            </Card>
            <Space direction="horizontal">
                <DashboardCard
                    icon={
                        <ShoppingCartOutlined
                            style={{
                                color: 'green',
                                backgroundColor: 'rgba(0,255,0,0.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={'Anzeigen online'}
                    value={userDetails.activeArticles}
                />
                <DashboardCard
                    icon={
                        <ShoppingOutlined
                            style={{
                                color: 'blue',
                                backgroundColor: 'rgba(0,0,255,0.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={'Inventory'}
                    value={inventory}
                />
            </Space>
            <Space>
                <RecentOrders />
                <DashboardChart />
            </Space>
        </Space>
    )
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}
function RecentOrders() {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     setLoading(true)
    //     getOrders().then((res) => {
    //         setDataSource(res.products.splice(0, 3))
    //         setLoading(false)
    //     })
    // }, [])

    return (
        <>
            <Typography.Text>Recent Orders</Typography.Text>
            <Table
                columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title',
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                    },
                    {
                        title: 'Price',
                        dataIndex: 'discountedPrice',
                    },
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            ></Table>
        </>
    )
}

function DashboardChart() {
    const [reveneuData, setReveneuData] = useState({
        labels: [],
        datasets: [],
    })

    // useEffect(() => {
    //     getRevenue().then((res) => {
    //         const labels = res.carts.map((cart) => {
    //             return `User-${cart.userId}`
    //         })
    //         const data = res.carts.map((cart) => {
    //             return cart.discountedTotal
    //         })

    //         const dataSource = {
    //             labels,
    //             datasets: [
    //                 {
    //                     label: 'Revenue',
    //                     data: data,
    //                     backgroundColor: 'rgba(255, 0, 0, 1)',
    //                 },
    //             ],
    //         }

    //         setReveneuData(dataSource)
    //     })
    // }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Order Revenue',
            },
        },
    }

    return (
        <Card style={{ width: 500, height: 250 }}>
            <Bar options={options} data={reveneuData} />
        </Card>
    )
}

export default Dashboard

import {
    ShoppingCartOutlined,
    ShoppingOutlined
} from '@ant-design/icons'
import { Card, Space, Statistic, Table, Typography, Button } from 'antd'
import { useEffect, useState } from 'react'
import './dashboard.scss'
// import { getCustomers, getInventory, getOrders, getRevenue } from '../../API'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../../redux/actions/userActions.js'
import defaultAvatar from '../../../assets/default-avatar.png'
import UserLayout from '../../../layouts/userLayout/UserLayout.jsx'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        activeArticles: 0,
        activeSince: 'Unknown',
        img: defaultAvatar
    })

    const [inventory, setInventory] = useState(0)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { error, userDetails } = useSelector(
        (state) => state.userDetails
    )

    // console.log('userDetails in Dashboard: ' + JSON.stringify(userDetails))

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    useEffect(() => {
        if (userDetails) {
            setUserInfo({
                fullName: userDetails.fullName || '',
                activeArticles: userDetails.activeArticles || 0,
                activeSince: userDetails.activeSince || 'Unknown',
                img: userDetails.img || defaultAvatar
            })
        }
    }, [userDetails])

    return (
        <UserLayout>
            <Space size={20} direction="vertical">
                <Typography.Title level={4} className="dashboard-title">Dashboard</Typography.Title>
                <Card className="user-card">
                    <Space direction="horizontal" size={16}>
                        <img
                            src={userInfo.img}
                            alt="Profile"
                            className="profile-pic" // Global styles
                        />
                        <Space direction="vertical">
                            <Typography.Text>
                                <strong>Name:</strong> {userInfo.fullName}
                            </Typography.Text>
                            <Typography.Text>
                                <strong>Anzeigen online:</strong>{' '}
                                {userInfo.activeArticles}
                            </Typography.Text>
                            <Typography.Text>
                                <strong>Aktiv seit:</strong>{' '}
                                {userInfo.activeSince}
                            </Typography.Text>
                        </Space>
                    </Space>
                </Card>
                <Space direction="horizontal" className="dashboard-space-horizontal">
                    <DashboardCard
                        className="dashboard-card"
                        icon={
                            <ShoppingCartOutlined
                                style={{
                                    color: 'green',
                                    backgroundColor: 'rgba(0,255,0,0.25)',
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8
                                }}
                            />
                        }
                        title={'Anzeigen online'}
                        value={userInfo.activeArticles}
                    />
                    <DashboardCard
                        className="dashboard-card"
                        icon={
                            <ShoppingOutlined
                                style={{
                                    color: 'blue',
                                    backgroundColor: 'rgba(0,0,255,0.25)',
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8
                                }}
                            />
                        }
                        title={'Inventory'}
                        value={inventory}
                    />
                </Space>
                <Space className="dashboard-space">
                    <RecentOrders />
                    <DashboardChart />
                </Space>
            </Space>
        </UserLayout>
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
                        dataIndex: 'title'
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity'
                    },
                    {
                        title: 'Price',
                        dataIndex: 'discountedPrice'
                    }
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
        datasets: []
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
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Order Revenue'
            }
        }
    }

    return (
        <Card style={{ width: 500, height: 250 }}>
            <Bar options={options} data={reveneuData} />
        </Card>
    )
}

export default Dashboard

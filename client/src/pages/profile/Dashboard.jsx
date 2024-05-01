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
import { getUserDetails } from '../../redux/actions/userActions.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Dashboard() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [orders, setOrders] = useState(0)
    const [inventory, setInventory] = useState(0)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const userDetails = useSelector((state) => state.userDetails)

    const { error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    console.log('user: ', user)

    // useEffect(() => {
    //     getOrders().then((res) => {
    //         setOrders(res.total)
    //         setRevenue(res.discountedTotal)
    //     })
    //     getInventory().then((res) => {
    //         setInventory(res.total)
    //     })
    //     getCustomers().then((res) => {
    //         setCustomers(res.total)
    //     })
    // }, [])

    useEffect(() => {
        console.log('userInfo: ', userInfo)
        if (!userInfo) {
            navigate('/login', { state: { from: location }, replace: true })
        } else {
            if (!user.name) {
                dispatch(getUserDetails(userInfo.id))
                // dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user])

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Card style={{ width: '100%' }}>
                <Space direction="horizontal" size={16}>
                    <img
                        src={user.profilePicture || 'default-profile.png'}
                        alt="Profile"
                        className="profile-pic"
                    />
                    <Space direction="vertical">
                        <Typography.Text>
                            <strong>Name:</strong> {user.name || 'Unknown'}
                        </Typography.Text>
                        <Typography.Text>
                            <strong>Anzeigen online:</strong>{' '}
                            {user.activeAnzeigen || 0}
                        </Typography.Text>
                        <Typography.Text>
                            <strong>Aktiv seit:</strong>{' '}
                            {user.activeSince || 'Unknown'}
                        </Typography.Text>
                    </Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {}}
                    >
                        Edit Info
                    </Button>
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
                    title={'Orders'}
                    value={orders}
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Card, Button, Typography, Space, Avatar, Divider, Row, Col, Statistic } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  DashboardOutlined, 
  SettingOutlined,
  BellOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <DashboardOutlined className="text-white text-lg" />
            </div>
            <Title level={4} className="mb-0 text-gray-800">Dashboard</Title>
          </div>
          
          <div className="flex items-center space-x-4">
            <BellOutlined className="text-gray-600 text-lg cursor-pointer hover:text-blue-500" />
            <SettingOutlined className="text-gray-600 text-lg cursor-pointer hover:text-blue-500" />
            <Avatar 
              icon={<UserOutlined />} 
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            />
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="rounded-lg"
            >
              Logout
            </Button>
          </div>
        </div>
      </Header>

      {/* Main Content */}
      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Title level={2} className="text-white mb-2">
                  Welcome back, {user?.name}! 👋
                </Title>
                <Paragraph className="text-blue-100 text-lg mb-0">
                  You're successfully authenticated and viewing the protected dashboard.
                </Paragraph>
              </div>
              <Avatar 
                size={80} 
                icon={<UserOutlined />}
                className="bg-white bg-opacity-20 border-2 border-white"
              />
            </div>
          </Card>

          {/* Stats Cards */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center border-0 shadow-md">
                <Statistic
                  title="Projects"
                  value={12}
                  prefix={<DashboardOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#3f6600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center border-0 shadow-md">
                <Statistic
                  title="Team Members"
                  value={28}
                  prefix={<TeamOutlined className="text-green-500" />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center border-0 shadow-md">
                <Statistic
                  title="Achievements"
                  value={45}
                  prefix={<TrophyOutlined className="text-yellow-500" />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center border-0 shadow-md">
                <Statistic
                  title="Active Hours"
                  value={156}
                  prefix={<ClockCircleOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
          </Row>

          {/* User Info & Features */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card title="Profile Information" className="border-0 shadow-md">
                <Space direction="vertical" size="middle" className="w-full">
                  <div>
                    <Text strong>Name:</Text>
                    <br />
                    <Text>{user?.name}</Text>
                  </div>
                  <div>
                    <Text strong>Email:</Text>
                    <br />
                    <Text>{user?.email}</Text>
                  </div>
                  <div>
                    <Text strong>User ID:</Text>
                    <br />
                    <Text code>{user?.id}</Text>
                  </div>
                  <Divider />
                  <Button type="primary" className="w-full">
                    Edit Profile
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={16}>
              <Card title="Authentication Demo Features" className="border-0 shadow-md">
                <Space direction="vertical" size="large" className="w-full">
                  <div>
                    <Title level={4}>🔐 Protected Route</Title>
                    <Paragraph>
                      This page is protected by the <code>ProtectedRoute</code> component. 
                      Only authenticated users can access it.
                    </Paragraph>
                  </div>

                  <div>
                    <Title level={4}>🎯 React Context</Title>
                    <Paragraph>
                      User authentication state is managed globally using React Context API.
                      The <code>AuthContext</code> provides user data, login/logout functions.
                    </Paragraph>
                  </div>

                  <div>
                    <Title level={4}>💾 Local Storage</Title>
                    <Paragraph>
                      Authentication tokens are persisted in localStorage for seamless 
                      user experience across browser sessions.
                    </Paragraph>
                  </div>

                  <div>
                    <Title level={4}>🎨 Ant Design</Title>
                    <Paragraph>
                      Beautiful, responsive UI components from Ant Design library with 
                      custom styling and modern gradients.
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
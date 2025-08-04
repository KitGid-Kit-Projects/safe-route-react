import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from router state, or default to home
  const from = location.state?.from?.pathname || '/home';

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        message.success('Login successful! Welcome back.');
        navigate(from, { replace: true });
      } else {
        message.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      message.error('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card 
        className="w-full max-w-md shadow-xl border-0"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <UserOutlined className="text-2xl text-white" />
          </div>
          <Title level={2} className="mb-2 text-gray-800">Welcome Back</Title>
          <Text className="text-gray-600">Sign in to your account</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Enter your email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item className="mb-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 text-lg font-medium rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                border: 'none'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space direction="vertical" size="small">
              <Text className="text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Sign up here
                </Link>
              </Text>
              <Text className="text-xs text-gray-500">
                Demo: Use any email and password to login
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
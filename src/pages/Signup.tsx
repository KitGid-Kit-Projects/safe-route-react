import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;


const Signup: React.FC = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card 
        className="w-full max-w-md shadow-xl border-0"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <UserAddOutlined className="text-2xl text-white" />
          </div>
          <Title level={2} className="mb-2 text-gray-800">Create Account</Title>
          <Text className="text-gray-600">Join us today and get started</Text>
        </div>

        <Form
          name="signup"
          // onFinish={onFinish}
          layout="vertical"
          size="large"
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: 'Please input your full name!' },
              { min: 2, message: 'Name must be at least 2 characters!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your full name"
              className="rounded-lg"
            />
          </Form.Item>

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
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Create a password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item className="mb-6">
            <Button
              type="primary"
              htmlType="submit"
              // loading={loading}
              className="w-full h-12 text-lg font-medium rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                border: 'none'
              }}
            >
              { 'Create Account'}
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space direction="vertical" size="small">
              <Text className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-purple-500 hover:text-purple-600 font-medium"
                >
                  Sign in here
                </Link>
              </Text>
              <Text className="text-xs text-gray-500">
                Demo: Account will be created instantly
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
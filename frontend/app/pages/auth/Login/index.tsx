"use client";
import UserLayout from "@/app/layouts/UserLayout";
import React from "react";
import { Form, Input, Checkbox, Card, Typography, Divider, Row, Col } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { login } from "../../../redux/slices/authSlice";

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const onFinish = (values: LoginFormData) => {
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <UserLayout>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Row justify="center" align="middle" className="min-h-[80vh]">
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
              <Card className="">
                <div className="text-center mb-8">
                  <Title level={2} className="!mb-2">
                    Login to your account
                  </Title>
                  <Text type="secondary">
                    Enter your credentials to access your account
                  </Text>
                </div>

                <Form
                  form={form}
                  name="login"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                  size="large">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please enter your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="text-gray-400" />}
                      placeholder="Enter your email address"
                      type="email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: 'Please enter your password!' },
                      { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}>
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Enter your password" 
                    />
                  </Form.Item>

                  <Form.Item>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col>
                        <a href="#" className="text-primary">
                          Forgot password?
                        </a>
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item>
                    <button
                      className="w-full btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </Form.Item>
                </Form>

                <Divider>
                  <Text type="secondary">or</Text>
                </Divider>

                <div className="text-center">
                  <Text type="secondary">{"Don't have an account?"}</Text>
                  <Link href="/signup" className="text-primary">
                    Sign up
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </UserLayout>
  );
};

export default Login;
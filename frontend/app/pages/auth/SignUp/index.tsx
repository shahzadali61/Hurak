"use client";
import React from "react";
import { Form, Input, Checkbox, Card, Typography, Divider, Row, Col } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import UserLayout from "@/app/layouts/UserLayout";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { signup } from "../../../redux/slices/authSlice";

const { Title, Text } = Typography;

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const onFinish = (values: any) => {
    dispatch(
      signup({
        name: values.fullName,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      })
    );
  };

  return (
    <UserLayout>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Row justify="center" align="middle" className="min-h-[80vh]">
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
              <Card>
                <div className="text-center mb-8">
                  <Title level={2} className="!mb-2">
                    Create Account
                  </Title>
                  <Text type="secondary">Enter your details to create your account</Text>
                </div>

                <Form
                  form={form}
                  name="signup"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                  size="large"
                >
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    className="pb-0"
                    rules={[
                      { required: true, message: "Please enter your full name!" },
                      { min: 2, message: "Name must be at least 2 characters!" },
                    ]}
                  >
                    <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Enter your full name" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Enter your email address" type="email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please enter your password!" },
                      { min: 8, message: "Password must be at least 8 characters!" },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Enter your password" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      // ({ getFieldValue }) => ({
                      //   validator(_, value) {
                      //     if (!value || getFieldValue("password") === value) {
                      //       return Promise.resolve();
                      //     }
                      //     return Promise.reject(new Error("Passwords do not match!"));
                      //   },
                      // }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Confirm your password" />
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
                      {loading ? "Creating..." : "Create Account"}
                    </button>
                  </Form.Item>
                </Form>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {user && <p className="text-green-500 text-center">Welcome {user.name}!</p>}

                <Divider>
                  <Text type="secondary">or</Text>
                </Divider>

                <div className="text-center">
                  <Text type="secondary">Already have an account? </Text>
                  <Link href="/login" className="text-primary">
                    login
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

export default SignUp;

"use client";
import UserLayout from './layouts/UserLayout';
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import BoxesDisplay from './components/frontend/BoxesDisplay';
export default function Home() {


  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <Row>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <BoxesDisplay/>

        
        </Col>


          </Row>
      </div>
    </UserLayout>
  );
}

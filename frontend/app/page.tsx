"use client";
import UserLayout from './layouts/UserLayout';
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import BoxesDisplay from './components/frontend/BoxesDisplay';



type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>("/get_users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <Row>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <BoxesDisplay/>

        
        </Col>


          </Row>
        

        
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">All Users</h1>
          <ul className="list-disc pl-6">
            {users.map((u) => (
              <li key={u.id}>{u.name} ({u.email})</li>
            ))}
          </ul>
        </div>
      </div>
    </UserLayout>
  );
}

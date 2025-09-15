"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  MenuOutlined,
  CloseOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Badge, Button } from "antd";
import type { MenuProps } from "antd";

// Fake props (replace with API/inertia data later)
const categories = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Fashion", slug: "fashion" },
];
const brands = [
  { id: 1, name: "Nike", slug: "nike" },
  { id: 2, name: "Apple", slug: "apple" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistCount] = useState(2);
  const [cartCount] = useState(3);

  // ✅ Categories dropdown (AntD menu format)
  const categoriesMenu: MenuProps = {
    items: categories.length
      ? categories.map((cat) => ({
        key: cat.id,
        label: (
          <Link href={`/products?category=${cat.slug}`}>
            <span className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {cat.name}
            </span>
          </Link>
        ),
      }))
      : [
        {
          key: "no-category",
          label: <span className="text-gray-500 text-sm">No categories available</span>,
        },
      ],
  };

  // ✅ Brands dropdown (AntD menu format)
  const brandsMenu: MenuProps = {
    items: brands.length
      ? brands.map((brand) => ({
        key: brand.id,
        label: (
          <Link href={`/products?brand=${brand.slug}`}>
            <span className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {brand.name}
            </span>
          </Link>
        ),
      }))
      : [
        {
          key: "no-brand",
          label: <span className="text-gray-500 text-sm">No brands available</span>,
        },
      ],
  };

  // ✅ User menu
  const userMenu: MenuProps = {
    items: [
      { key: "login", label: <Link href="/login">Login</Link> },
      { key: "signup", label: <Link href="/signup">Signup</Link> },
      { key: "logout", label: <a href="#">Logout</a> },
    ],
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* ✅ Logo (Next.js Image optimization) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/site-logo.png"
            alt="Logo"
            width={120}
            height={40}
            priority
            className="w-auto h-auto"
          />
        </Link>

        {/* ✅ Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-[18px]">
            Home
          </Link>
          <Link href="/shop" className="text-gray-600 hover:text-gray-900 text-[18px]">
            Shop
          </Link>

          <Dropdown menu={categoriesMenu} placement="bottom">
            <Button type="text" className="text-gray-600 hover:text-gray-900 text-[18px]">
              Categories
            </Button>
          </Dropdown>

          <Dropdown menu={brandsMenu} placement="bottom">
            <Button type="text" className="text-gray-600 hover:text-gray-900 text-[18px]">
              Brands
            </Button>
          </Dropdown>
        </nav>

        {/* ✅ Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Wishlist */}
          <Badge count={wishlistCount} offset={[-5, 5]}>
            <Button type="text" shape="circle" icon={<HeartOutlined />} />
          </Badge>

          {/* Cart */}
          <Badge count={cartCount} offset={[-5, 5]}>
            <Button type="text" shape="circle" icon={<ShoppingCartOutlined />} />
          </Badge>

          {/* User Dropdown */}
          <Dropdown menu={userMenu} placement="bottomRight">
            <Button type="text" shape="circle" icon={<UserOutlined />} />
          </Dropdown>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              type="text"
              shape="circle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

import UserLayout from "@/app/layouts/UserLayout";
import React from "react";
const AboutUs:React.FC=()=>{
    return <>
    <UserLayout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to About Dashboard
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          This is an example of how to use the UserLayout component.
        </p>
        <p className="text-gray-600">
          The header and footer are automatically included, and this content is wrapped in the main area.
        </p>
      </div>
    </div>
  </UserLayout>
    </>
}
export default AboutUs;
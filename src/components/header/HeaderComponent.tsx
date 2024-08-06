// src/components/Header.tsx
import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { HeaderLeft, HeaderRight, StyledHeader } from "./header";

const HeaderComponent: React.FC = () => {
  const location = useLocation();

  // Map pathnames to page titles
  const pageTitles: { [key: string]: string } = {
    "/": "Dashboard",
    "/products": "Products",
    "/categories": "Categories",
    // Add more paths if needed
  };

  // Get the current page title based on pathname
  const pageTitle = pageTitles[location.pathname] || "Admin Panel";

  return (
    <StyledHeader>
      <HeaderLeft>
        <span>Admin Panel | {pageTitle}</span>
      </HeaderLeft>
      <HeaderRight>
        <Avatar icon={<UserOutlined />} />
      </HeaderRight>
    </StyledHeader>
  );
};

export default HeaderComponent;

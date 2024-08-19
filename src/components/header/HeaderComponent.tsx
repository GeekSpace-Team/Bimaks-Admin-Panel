// src/components/Header.tsx
import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { HeaderLeft, HeaderRight, StyledHeader } from "./header";

const HeaderComponent: React.FC = () => {
  const location = useLocation();

  const pageTitles: { [key: string]: string } = {
    "/": "Продукты",
    "/categories": "Категории",
  };

  // Get the current page title based on pathname
  const pageTitle = pageTitles[location.pathname] || "Административная панель";

  return (
    <StyledHeader>
      <HeaderLeft>
        <span>Административная панель | {pageTitle}</span>
      </HeaderLeft>
      <HeaderRight>
        <Avatar icon={<UserOutlined />} />
      </HeaderRight>
    </StyledHeader>
  );
};

export default HeaderComponent;

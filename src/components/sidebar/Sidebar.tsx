// src/components/Sidebar.tsx
import React, { useState } from "react";
import { Layout, Menu, Tooltip } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const { Sider } = Layout;

const StyledSider = styled(Sider)<{ collapsed: boolean }>`
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 50px;
  }

  .ant-menu-item {
    display: flex;
    align-items: center;
  }

  @media (max-width: 576px) {
    width: ${(props) => (props.collapsed ? "80px" : "200px")} !important;
    flex: 0 0 ${(props) => (props.collapsed ? "80px" : "200px")} !important;
    max-width: ${(props) => (props.collapsed ? "80px" : "200px")} !important;
    min-width: ${(props) => (props.collapsed ? "80px" : "200px")} !important;
  }
`;

const SidebarTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin: 16px 0;
  color: #fff;
`;

const AdminPanelText = styled.div`
  font-size: 14px;
  text-align: center;
  color: #999;
`;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <StyledSider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div>
        <SidebarTitle>Bimaks</SidebarTitle>
        <AdminPanelText>Admin Panel</AdminPanelText>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Tooltip
            title="Dashboard"
            placement="right"
            overlayClassName={collapsed ? "" : "hidden"}
          >
            <Link to="/">Dashboard</Link>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingOutlined />}>
          <Tooltip
            title="Products"
            placement="right"
            overlayClassName={collapsed ? "" : "hidden"}
          >
            <Link to="/products">Products</Link>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="3" icon={<TagsOutlined />}>
          <Tooltip
            title="Categories"
            placement="right"
            overlayClassName={collapsed ? "" : "hidden"}
          >
            <Link to="/categories">Categories</Link>
          </Tooltip>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;

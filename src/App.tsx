// src/App.tsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Spin } from "antd";
import styled from "styled-components";
import HeaderComponent from "./components/header/HeaderComponent";
import Sidebar from "./components/sidebar/Sidebar";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  margin: 24px;
  padding: 24px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Products = lazy(() => import("./pages/products/Products"));
const Category = lazy(() => import("./pages/categories/Category"));

const App: React.FC = () => (
  <Router>
    <StyledLayout>
      <Sidebar />
      <Layout>
        <HeaderComponent />
        <StyledContent>
          <Suspense
            fallback={
              <SpinnerWrapper>
                <Spin size="large" />
              </SpinnerWrapper>
            }
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Category />} />
            </Routes>
          </Suspense>
        </StyledContent>
      </Layout>
    </StyledLayout>
  </Router>
);

export default App;

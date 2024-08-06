// src/components/header.ts
import { Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 64px; // Set a fixed height for better alignment
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #333;
  font-size: 18px;
  font-weight: 500;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

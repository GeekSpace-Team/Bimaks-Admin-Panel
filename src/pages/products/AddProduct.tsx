import { FC } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import styled from "styled-components";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useProducts } from "./useProducts"; // Custom hook to manage products

const { Option } = Select;

const ResponsiveForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 12px;
  }

  @media (min-width: 768px) {
    .ant-row {
      display: flex;
      flex-wrap: wrap;
    }

    .ant-col {
      flex: 1 1 50%;
      padding: 0 8px;
    }
  }
`;

const AddProduct: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addProduct } = useProducts();

  const onFinish = (values) => {
    addProduct(values);
    onClose();
  };

  return (
    <ResponsiveForm layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="image"
            label="Product Image"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="title_tm"
            label="Product Title (Turkmen)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="title_ru"
            label="Product Title (Russian)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="title_en"
            label="Product Title (English)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="group" label="Group" rules={[{ required: true }]}>
            <Select>
              <Option value="group1">Group 1</Option>
              <Option value="group2">Group 2</Option>
              <Option value="group3">Group 3</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="short_tm"
            label="Short Description (Turkmen)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="short_ru"
            label="Short Description (Russian)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="short_en"
            label="Short Description (English)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="desc_tm"
            label="Description (Turkmen)"
            rules={[{ required: true }]}
          >
            <SunEditor setOptions={{ height: "200px" }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="desc_ru"
            label="Description (Russian)"
            rules={[{ required: true }]}
          >
            <SunEditor setOptions={{ height: "200px" }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="desc_en"
            label="Description (English)"
            rules={[{ required: true }]}
          >
            <SunEditor setOptions={{ height: "200px" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </ResponsiveForm>
  );
};

export default AddProduct;

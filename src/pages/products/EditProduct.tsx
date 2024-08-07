import React from "react";
import { Modal, Form, Input, Button, Row, Col, Select, message } from "antd";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import { DataType } from "../../type/types";
import axios from "axios";

const { Option } = Select;

interface EditProductProps {
  visible: boolean;
  onClose: () => void;
  product: DataType | null;
  fetchProducts: () => Promise<void>; // Add this line
}

const EditProduct: React.FC<EditProductProps> = ({
  visible,
  onClose,
  product,
  fetchProducts, // Include this in the destructuring
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [groups, setGroups] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (product) {
      form.setFieldsValue({
        title_tm: product.title_tm,
        title_en: product.title_en,
        title_ru: product.title_ru,
        short_tm: product.short_tm,
        short_en: product.short_en,
        short_ru: product.short_ru,
        desc_tm: product.desc_tm,
        desc_en: product.desc_en,
        desc_ru: product.desc_ru,
        group_id: product.group_id,
      });
      if (typeof product.image === "string") {
        setImageUrl(product.image);
      } else if (product.image instanceof File) {
        setImageUrl(URL.createObjectURL(product.image));
      } else {
        setImageUrl(undefined);
      }
    }
    fetchGroups(); // Fetch groups when component mounts
  }, [product, form]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        "http://95.85.121.153:5634/product-group"
      );
      setGroups(response.data);
    } catch (error) {
      message.error("Failed to fetch groups");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      const updatedProduct = { ...values, image: imageUrl };

      await axios.patch(
        `http://95.85.121.153:5634/product/${product?.id}`,
        updatedProduct
      );

      message.success("Product updated successfully");
      await fetchProducts(); // Refresh product list after update
      onClose();
    } catch (error: any) {
      // Cast error to any
      if (error.response && error.response.data) {
        const errors = error.response.data.message || [];
        errors.forEach((err: string) => message.error(err));
      } else {
        message.error("Failed to update product");
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
      width="100%"
      style={{ top: 0 }}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title_tm"
              label="Title (TM)"
              rules={[
                { required: true, message: "Please input the title in TM!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="title_en"
              label="Title (EN)"
              rules={[
                { required: true, message: "Please input the title in EN!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title_ru"
              label="Title (RU)"
              rules={[
                { required: true, message: "Please input the title in RU!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="short_tm"
              label="Short Description (TM)"
              rules={[
                {
                  required: true,
                  message: "Please input the short description in TM!",
                },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="short_en"
              label="Short Description (EN)"
              rules={[
                {
                  required: true,
                  message: "Please input the short description in EN!",
                },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="short_ru"
              label="Short Description (RU)"
              rules={[
                {
                  required: true,
                  message: "Please input the short description in RU!",
                },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="desc_tm"
              label="Description (TM)"
              rules={[
                {
                  required: true,
                  message: "Please input the description in TM!",
                },
              ]}
            >
              <SunEditor setOptions={{ height: "200px" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="desc_en"
              label="Description (EN)"
              rules={[
                {
                  required: true,
                  message: "Please input the description in EN!",
                },
              ]}
            >
              <SunEditor setOptions={{ height: "200px" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="desc_ru"
              label="Description (RU)"
              rules={[
                {
                  required: true,
                  message: "Please input the description in RU!",
                },
              ]}
            >
              <SunEditor setOptions={{ height: "200px" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="group_id"
              label="Group"
              rules={[{ required: true, message: "Please select a group!" }]}
            >
              <Select placeholder="Select a group">
                {groups.map((group) => (
                  <Option key={group.id} value={group.id.toString()}>
                    {group.name_en}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Image"
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "block" }}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{ marginTop: 10, maxWidth: "100%" }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditProduct;

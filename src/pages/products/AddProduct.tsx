import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Row, Col, Select, message } from "antd";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import axios from "axios";

const { Option } = Select;

interface AddProductProps {
  visible: boolean;
  onClose: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [groups, setGroups] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  // Fetch product groups from the API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "http://95.85.121.153:5634/product-group"
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        message.error("Failed to fetch groups. Please try again.");
      }
    };

    fetchGroups();
  }, []);

  // Handle form submission
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("title_tm", values.title_tm);
      formData.append("title_en", values.title_en);
      formData.append("title_ru", values.title_ru);
      formData.append("short_tm", values.short_tm);
      formData.append("short_en", values.short_en);
      formData.append("short_ru", values.short_ru);
      formData.append("desc_tm", values.desc_tm || "");
      formData.append("desc_en", values.desc_en || "");
      formData.append("desc_ru", values.desc_ru || "");
      formData.append("group_id", values.group_id);

      if (file) {
        formData.append("image", file); // Append the file if available
      }

      await axios.post("http://95.85.121.153:5634/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Product added successfully!");
      form.resetFields();
      setFile(null); // Reset file state
      setImageUrl(undefined); // Clear image preview
      onClose();
    } catch (error) {
      console.error("Failed to add product:", error);
      message.error("Failed to add product. Please try again.");
    }
  };

  // Handle file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
    } else {
      setImageUrl(undefined);
    }
  };

  return (
    <Modal
      title="Add Product"
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
            <Form.Item name="image" label="Image">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "block" }}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Selected"
                  style={{ marginTop: 10, maxWidth: "100%" }}
                />
              )}
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
      </Form>
    </Modal>
  );
};

export default AddProduct;

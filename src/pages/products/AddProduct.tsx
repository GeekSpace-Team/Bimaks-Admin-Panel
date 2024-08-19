import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Row, Col, Select, message } from "antd";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import axios from "axios";

const { Option } = Select;

interface AddProductProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback function to refresh the product list
}

const AddProduct: React.FC<AddProductProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
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
        console.error("Не удалось загрузить группы:", error);
        message.error("Не удалось загрузить группы. Попробуйте еще раз.");
      }
    };

    fetchGroups();
  }, []);

  // Handle form submission
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("title_tm", "test"); // Send default data for Turkmen
      formData.append("title_en", values.title_en);
      formData.append("title_ru", values.title_ru);
      formData.append("short_tm", "test"); // Send default data for Turkmen
      formData.append("short_en", values.short_en);
      formData.append("short_ru", values.short_ru);
      formData.append("desc_tm", "test"); // Send default data for Turkmen
      formData.append("desc_en", values.desc_en || "");
      formData.append("desc_ru", values.desc_ru || "");
      formData.append("group_id", values.group_id);

      if (file) {
        formData.append("file", file); // Append the file if available
      }

      await axios.post("http://95.85.121.153:5634/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Продукт успешно добавлен!");
      form.resetFields();
      setFile(null); // Reset file state
      setImageUrl(undefined); // Clear image preview
      onSuccess(); // Notify parent component to refresh product list
      onClose();
    } catch (error) {
      console.error("Не удалось добавить продукт:", error);
      message.error("Не удалось добавить продукт. Попробуйте еще раз.");
    }
  };

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
      title="Добавить продукт"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Отправить
        </Button>,
      ]}
      width="100%"
      style={{ top: 0 }}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title_en"
              label="Название (EN)"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите название на EN!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="title_ru"
              label="Название (RU)"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите название на RU!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="short_en"
              label="Краткое описание (EN)"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите краткое описание на EN!",
                },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="short_ru"
              label="Краткое описание (RU)"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите краткое описание на RU!",
                },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="desc_en"
              label="Описание (EN)"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите описание на EN!",
                },
              ]}
            >
              <SunEditor setOptions={{ height: "200px" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="desc_ru"
              label="Описание (RU)"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите описание на RU!",
                },
              ]}
            >
              <SunEditor setOptions={{ height: "200px" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="image" label="Изображение">
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
              label="Группа"
              rules={[
                { required: true, message: "Пожалуйста, выберите группу!" },
              ]}
            >
              <Select placeholder="Выберите группу">
                {groups.map((group) => (
                  <Option key={group.id} value={group.id.toString()}>
                    {group.name_ru} {/* Displaying English name of the group */}
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

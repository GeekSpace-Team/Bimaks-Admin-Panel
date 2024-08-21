import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Row, Col, message, Select } from "antd";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import { DataType } from "../../type/types";

const { Option } = Select;

interface EditProductProps {
  visible: boolean;
  onClose: () => void;
  product: DataType;
  onSuccess: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({
  visible,
  onClose,
  product,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://bimakstm.com/api/product-group"
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Не удалось загрузить группы:", error);
        message.error("Не удалось загрузить группы. Попробуйте еще раз.");
      }
    };

    fetchGroups();
  }, []);

  const handleFinish = async (values: Partial<DataType>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title_tm", values.title_tm || "default text");
      formData.append("title_en", values.title_en || "");
      formData.append("title_ru", values.title_ru || "");
      formData.append("short_tm", values.short_tm || "default text");
      formData.append("short_en", values.short_en || "");
      formData.append("short_ru", values.short_ru || "");
      formData.append("desc_tm", values.desc_tm || "default text");
      formData.append("desc_en", values.desc_en || "");
      formData.append("desc_ru", values.desc_ru || "");

      if (values.group_id !== undefined) {
        formData.append("group_id", values.group_id.toString());
      }

      if (file) {
        formData.append("file", file);
      }

      await axios.patch(
        `https://bimakstm.com/api/product/${product.key}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Продукт успешно обновлен!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to update product:", error);
      message.error("Не удалось обновить продукт. Попробуйте еще раз.");
    } finally {
      setLoading(false);
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

  const getImageSrc = (): string => {
    if (imageUrl) {
      return imageUrl;
    }
    if (typeof product.image === "string") {
      return product.image;
    }
    return "";
  };

  return (
    <Modal
      visible={visible}
      title="Редактировать продукт"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          Сохранить
        </Button>,
      ]}
      style={{ top: 0, height: "100vh" }}
      bodyStyle={{ overflowY: "auto", height: "calc(100vh - 108px)" }}
      width="100%"
    >
      <Form
        form={form}
        initialValues={product}
        onFinish={handleFinish}
        layout="vertical"
        id="edit-product-form"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="title_en" label="Название (EN)">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="title_ru" label="Название (RU)">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="short_en" label="Краткое описание (EN)">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="short_ru" label="Краткое описание (RU)">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="desc_en" label="Описание (EN)">
              <SunEditor
                setContents={product.desc_en}
                onChange={(content) =>
                  form.setFieldsValue({ desc_en: content })
                }
                setOptions={{
                  height: "200px",
                  buttonList: [
                    ["undo", "redo", "bold", "underline", "italic", "list"],
                  ],
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="desc_ru" label="Описание (RU)">
              <SunEditor
                setContents={product.desc_ru}
                onChange={(content) =>
                  form.setFieldsValue({ desc_ru: content })
                }
                setOptions={{
                  height: "200px",
                  buttonList: [
                    ["undo", "redo", "bold", "underline", "italic", "list"],
                  ],
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={20} md={10}>
            <Form.Item label="Изображение">
              {getImageSrc() ? (
                <img
                  src={getImageSrc()}
                  alt="product"
                  style={{ width: "80%", height: "auto", borderRadius: 8 }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 8,
                  }}
                >
                  No image available
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginTop: 16 }}
              />
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
                    {group.name_ru}
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

export default EditProduct;

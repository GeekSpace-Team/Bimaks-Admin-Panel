import React from "react";
import { Modal, Form, Input, Button, Upload, Row, Col } from "antd";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import { DataType } from "../../type/types";
import { UploadOutlined } from "@ant-design/icons";

interface EditProductProps {
  visible: boolean;
  onClose: () => void;
  product: DataType | null;
}

const EditProduct: React.FC<EditProductProps> = ({
  visible,
  onClose,
  product,
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);

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
      });
      // Convert image to URL if it's a File object or set to undefined
      if (typeof product.image === "string") {
        setImageUrl(product.image);
      } else if (product.image instanceof File) {
        setImageUrl(URL.createObjectURL(product.image));
      } else {
        setImageUrl(undefined);
      }
    }
  }, [product, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log("Updated values: ", { ...values, image: imageUrl });
        // Handle update product logic here
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleUploadChange = (info: any) => {
    if (info.file.status === "done") {
      setImageUrl(info.file.response?.url || "");
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
              label="Image"
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Upload
                action="/upload" // Replace with your upload endpoint
                listType="picture"
                showUploadList={false}
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
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

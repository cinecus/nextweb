import { Form, Input, Modal, Button } from 'antd';

export const ModalInsert = ({ prop }) => {
    const { isModalVisible, handleCancel, handleOk } = prop

    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields()
            .then(value => console.log('value', value))
            .catch(info => console.log('vlidate Failed', info))
    };
    const onReset = () => {
        form.resetFields();
    };
    return <Modal title="ADD MENU" visible={isModalVisible} onOk={onFinish} onCancel={handleCancel}>
        <Form form={form} name="control-hooks" >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="url" label="Image URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            {/* <Form.Item name="" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item> */}
        </Form>
    </Modal>
}
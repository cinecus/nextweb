import { Form, Input, Modal, Button } from 'antd';
import { createRef } from 'react'

const fetcher = (url, data) => fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: {
        'Content-Type': 'application/json'
    }
}).then((res) => res.json())

export const ModalInsert = ({ prop }) => {
    const { isModalVisible, handleCancel, handleOk } = prop

    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields()
            .then(async value => {
                console.log('value', value)
                const response = await fetcher('/api/drinks', { ...value })
                await handleOk()
                await ModalSuccess(response.msg)
                // console.log('response', response)
            })
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
        </Form>
    </Modal>
}

export const ModalEdit = ({ prop }) => {
    const { isModalVisible, handleCancel, handleOk, editId } = prop

    const [form_1] = Form.useForm();

    const onFinish = () => {
        form.validateFields()
            .then(async value => {
                console.log('value', value)
                const response = await fetcher('/api/drinks', { ...value })
                await handleOk()
                await ModalSuccess(response.msg)
                // console.log('response', response)
            })
            .catch(info => console.log('vlidate Failed', info))
    };
    const onReset = () => {
        form.resetFields();
    };
    return <Modal title="EDIT MENU" visible={isModalVisible} onOk={onFinish} onCancel={handleCancel}>
        <Form form={form_1} name="edit" initialValues={{ name: '1111', url: '1111' }}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="url" label="Image URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}

export const ModalSuccess = async (messages) => {
    return Modal.success({
        content: messages,
    });
}
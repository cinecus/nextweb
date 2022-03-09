import { Form, Input, Modal, Button, Spin } from 'antd';
import { createRef, useEffect } from 'react'
import useSwr, { useSWRConfig } from 'swr'

const fetcher_post = (url, data) => fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: {
        'Content-Type': 'application/json'
    }
}).then((res) => res.json())

const fetcher_put = (url, data) => fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ ...data }),
    headers: {
        'Content-Type': 'application/json'
    }
}).then((res) => res.json())

const fetcher_get = (url) => fetch(url).then((res) => res.json())

export const ModalInsert = ({ prop }) => {
    const { isModalVisible, handleCancel, handleOk } = prop

    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields()
            .then(async value => {
                console.log('value', value)
                const response = await fetcher_post('/api/drinks', { ...value })
                await handleOk('insert')
                await ModalSuccess(response.msg)
                // console.log('response', response)
            })
            .catch(info => console.log('vlidate Failed', info))
    };
    const onReset = () => {
        form.resetFields();
    };
    return <Modal title="ADD MENU" visible={isModalVisible.insert} onOk={onFinish} onCancel={() => handleCancel('insert')}>
        <Form form={form} name="control-hooks" >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="url" label="Image URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <>https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg</>
        </Form>
    </Modal>
}

export const ModalEdit = ({ prop }) => {
    const { isModalVisible, handleCancel, handleOk, editId } = prop
    console.log('editId', editId)
    const { data, error } = useSwr(`/api/drinks/${editId}`, fetcher_get, { revalidateOnMount: false })

    console.log('data', data)
    const [form] = Form.useForm();
    // mutate(`/api/drinks/${editId}`)
    const onFinish = () => {
        form.validateFields()
            .then(async value => {
                console.log('value', value)
                const response = await fetcher_put(`/api/drinks/${editId}`, { ...value })
                await handleOk('edit')
                await ModalSuccess(response.msg)
                // console.log('response', response)
            })
            .catch(info => console.log('validate Failed', info))
    };
    const onReset = () => {
        form.resetFields();
    };
    useEffect(() => {
        form.setFieldsValue(data)
    }, [form, data])
    return <Modal title="EDIT MENU" visible={isModalVisible.edit} onOk={onFinish} onCancel={() => handleCancel('edit')}>
        {!data ?
            <Spin tip='loading' spinning={!data}></Spin> :

            < Form form={form} name="edit" initialValues={{ name: !!data ? 'data.name' : '', url: !!data ? 'data.url' : '' }}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="url" label="Image URL" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        }

    </Modal >
}

export const ModalSuccess = async (messages) => {
    return Modal.success({
        content: messages,
    });
}
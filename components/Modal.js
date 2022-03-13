import { Form, Input, Modal, Button, Spin, Space, InputNumber } from 'antd';
import { createRef, useEffect } from 'react'
import useSwr, { useSWRConfig } from 'swr'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
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
                // console.log('value', value)
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
            <Form.Item name="name" label="Name" rules={[{ required: true }]} placeholder="Please input name">
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]} placeholder="Please input description">
                <TextArea />
            </Form.Item>
            <Space>
                <Form.Item name="hot" label="Hot" placeholder="Please input name">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="ice" label="Iced" placeholder="Please input name">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="frappe" label="Frappe" placeholder="Please input name">
                    <InputNumber />
                </Form.Item>
            </Space>
            <Form.List
                name="url"
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('At least 1 Image Url'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                label={'Image URL'}
                                required={true}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input Image URL or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Please input image url" style={{ 'width': '90%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        style={{ 'marginLeft': '10px' }}
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add();
                                }}
                                style={{ width: '100%', marginTop: '20px' }}
                                icon={<PlusOutlined />}
                            >

                                Add field Image URL
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            {/* <Form.Item name="url" label="Image URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item> */}
            <div>Example URL:</div>
            <div>
                <ul>
                    <li>https://res.cloudinary.com/cinecus/image/upload/v1647153941/next-coffee/mae-mu-53knZ_O2oxI-unsplash_iac3eq.jpg</li>
                    <li>https://res.cloudinary.com/cinecus/image/upload/v1647153941/next-coffee/yeh-xintong-3VnWEf2Tf7M-unsplash_wx2iat.jpg</li>
                    <li>https://res.cloudinary.com/cinecus/image/upload/v1647153947/next-coffee/mae-mu-vEzZOy2DmQE-unsplash_ksul7p.jpg</li>
                </ul>
            </div>
        </Form>
    </Modal>
}


export const ModalEdit = ({ prop }) => {
    const { isModalVisible, handleCancel, handleOk, editId } = prop
    // console.log('editId', editId)
    const { data, error } = useSwr(`/api/drinks/${editId}`, fetcher_get, { revalidateOnMount: false })

    // console.log('data', data)
    const [form] = Form.useForm();
    // mutate(`/api/drinks/${editId}`)
    const onFinish = () => {
        form.validateFields()
            .then(async value => {
                // console.log('value', value)
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

            < Form form={form} name="edit" initialValues={{
                name: !!data ? data.name : '',
                url: !!data ? data.url : '',
                description: !!data ? data.description : '',
                hot: !!data ? data.price.hot : '',
                ice: !!data ? data.price.ice : '',
                frappe: !!data ? data.price.frappe : '',
            }}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]} placeholder="Please input description">
                    <TextArea />
                </Form.Item>
                <Space>
                    <Form.Item name="hot" label="Hot" placeholder="Please input name">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name="ice" label="Iced" placeholder="Please input name">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name="frappe" label="Frappe" placeholder="Please input name">
                        <InputNumber />
                    </Form.Item>
                </Space>
                <Form.List
                    name="url"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                    return Promise.reject(new Error('At least 1 Image Url'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={'Image URL'}
                                    required={true}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input Image URL or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="Please input image url" style={{ 'width': '90%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            style={{ 'marginLeft': '10px' }}
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: '100%', marginTop: '20px' }}
                                    icon={<PlusOutlined />}
                                >

                                    Add field Image URL
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        }

    </Modal >
}

export const ModalSuccess = async (messages) => {
    return Modal.success({
        content: messages,
    });
}
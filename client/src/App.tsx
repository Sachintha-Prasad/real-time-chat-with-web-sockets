import { SendOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, List, message, Typography } from "antd"
import React, { useEffect, useState } from "react"

const App = () => {
    const [messageList, setMessageList] = useState<string[]>([])

    const [form] = Form.useForm()

    const socket = new WebSocket("ws://localhost:8000")
    const sendMessage = (message: string) => {
        if (message) socket.send(message)
    }

    const handleSendMessage = (values: any) => {
        console.log(values.message)
        sendMessage(values.message)
        message.success("sent success!")
        form.resetFields()
    }

    useEffect(() => {
        socket.addEventListener("message", ({ data }) => {
            setMessageList((prevState) => [...prevState, data])
        })
    }, [socket])

    return (
        <Col span={12} offset={6}>
            <Typography.Title level={3} className="capitalize text-center mt-6">
                chat application with web sockets
            </Typography.Title>

            <List
                header={
                    <Form
                        form={form}
                        onFinish={handleSendMessage}
                        className="flex gap-3 align-center justify-center mt-12"
                    >
                        <Form.Item
                            key={"message"}
                            name={"message"}
                            className="w-full max-w-[400px]"
                        >
                            <Input
                                placeholder="Your message.."
                                className="w-full"
                                required
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            iconPosition="end"
                            htmlType="submit"
                        >
                            Send
                        </Button>
                    </Form>
                }
                dataSource={messageList}
                renderItem={(item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                )}
            />
        </Col>
    )
}

export default App

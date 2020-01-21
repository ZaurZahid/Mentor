import React from 'react'
import { Input, Form, Button } from 'antd';
import './NewMail.css'

const { TextArea } = Input;


export const  NewMail=   Form.create({ name: 'horizontal_login' })((props)=> {

    const {getFieldDecorator} = props.form;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);/* yazdiglarim dusur bura */
                alert("Process works ,look at console")
        }
        })};
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item label="Recipent">
                
                {getFieldDecorator('email', {
                    rules: [
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ],
                })(<Input  placeholder="Email" style={{ width: '20%',border: "1px solid #14ff24"}} name="email" />)}

            </Form.Item>

            <Form.Item label='Subject'>

            {getFieldDecorator('subject', {
                    rules: [
                        
                        {
                            required: true,
                            message: 'Please input your subject!',
                        },
                    ],
                })( <Input
                    style={{ width: '20%',border: "1px solid #14ff24"}}
                    onChange=''
                    placeholder="Title of your Email"
                    autosize={{ minRows: 1, maxRows: 1 }}
                    name="subject"
                />)}
            </Form.Item>

            <Form.Item label="Content">

                {getFieldDecorator('text', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        }
                    ],
                })(  <TextArea
                    onChange=''
                    style={{ width: '60%',border: "1px solid #14ff24"}}
                    placeholder="Text"
                    name="Text"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{border: "1px solid rgb(12, 144, 21)" , backgroundColor:"#14ff24"}}>
                    Send email
                </Button>
            </Form.Item>
        </Form>
    )
}
)
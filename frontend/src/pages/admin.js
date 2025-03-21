import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { createMessage } from "../http/userApi";

const MessageCreate = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [message_send_date, setSendDate] = useState('');
    const [message_get_date, setGetDate] = useState('');

    const click = async () => {
        try {
            const response = await createMessage(message_send_date, message_get_date, title, text);
            alert('Сообщение успешно отправлено!');
            console.log(response);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <Container
            style={{ borderRadius: '15px', marginTop: '130px', fontFamily: "Play" }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#b3b3b3', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '32px' }}>Отправить сообщение</p>
                <Form className="d-flex flex-column">
                    {/* <Form.Control
                        style={{ width: '700px', borderRadius: 50, backgroundColor: '#75c3ff', height: 50, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите отправителя..."
                        size="lg"
                        value={sender}
                        onChange={e => setSender(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 50, backgroundColor: '#75c3ff', height: 50, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите получателя..."
                        size="lg"
                        value={recipient}
                        onChange={e => setRecipient(e.target.value)} /> */}
                    <Form.Control
                        style={{ width: '700px', borderRadius: 50, backgroundColor: '#75c3ff', height: 50, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите заголовок..."
                        size="lg"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <Form.Control
                        type="date"
                        style={{ width: '700px', borderRadius: 50, backgroundColor: '#75c3ff', height: 50, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Начало даты..."
                        size="lg"
                        value={message_send_date}
                        onChange={e => setSendDate(e.target.value)} />
                    <Form.Control
                        type="date"
                        style={{ width: '700px', borderRadius: 50, backgroundColor: '#75c3ff', height: 50, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Конец даты..."
                        size="lg"
                        value={message_get_date}
                        onChange={e => setGetDate(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 40, backgroundColor: '#75c3ff', height: 100, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите текст..."
                        size="lg"
                        value={text}
                        onChange={e => setText(e.target.value)} />
                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size={"lg"}
                            variant={"info"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                            onClick={click}>
                            Отправить данные
                        </Button>
                    </p>
                </Form>
            </Card>
        </Container>
    );
});

export default MessageCreate;

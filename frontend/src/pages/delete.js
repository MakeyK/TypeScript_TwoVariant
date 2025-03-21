import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { deleteMessage } from "../http/userApi";

const DeleteMessage = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [message_id, setMessageId] = useState('');

    const click = async () => {
        try {
            await deleteMessage(message_id);
            alert(`Сообщение ${message_id}} успешно удалено!`);
            setMessageId('');
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <Container
            style={{ borderRadius: '15px', marginTop: '130px', fontFamily: "Play", width: '700px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#b3b3b3', display: 'flex', justifyContent: 'center', alignItems: 'center', width:'600px' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Удалить сообщение</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 50, backgroundColor: '#75c3ff', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите ID сообщения..."
                        size="lg"
                        value={message_id}
                        onChange={e => setMessageId(e.target.value)}
                    />
                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size={"lg"}
                            variant={"info"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                            onClick={click}>
                            Удалить
                        </Button>
                    </p>
                </Form>
            </Card>
        </Container>
    );
});

export default DeleteMessage;

import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { getMessagesByTitle } from "../http/userApi";
import ListMessage from "../components/ListMessage";

const MessageGet = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [title, setTitle] = useState('');
    const [messages, setMessages] = useState([]);
    const [showMessages, setShowMessages] = useState(false);

    const click = async () => {
        try {
            const data = await getMessagesByTitle(title);
            setMessages(data);
            setShowMessages(true);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <Container
            style={{ borderRadius: '15px', marginTop: '130px', fontFamily: "Play", width: '700px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#b3b3b3', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Вывод сообщений</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ width: '400px', height: '70px', borderRadius: 40, backgroundColor: '#75c3ff', border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        type="text"
                        placeholder="Введите заголовок..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size={"lg"}
                            variant={"info"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                            onClick={click}>
                            Вывод
                        </Button>
                    </p>
                    {showMessages && (
                        <ListMessage messages={messages} />
                    )}
                </Form></Card>
        </Container>
    );
});

export default MessageGet;

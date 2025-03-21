import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/consts";
import { loginUser } from "../http/userApi";

const Login = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [password, setPassword] = useState('');
    const [user_id, setUserID] = useState('');

    const click = async () => {
        try {
            const response = await loginUser(user_id, password);
            if (response) {
                user.setIsAuth(true);
                user.setUser(response);

                console.log(user.getisAuth());
                console.log(user.getUser());
                navigate(ADMIN_ROUTE);
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <Container
            style={{ borderRadius: '15px', marginTop: '130px', fontFamily: "Play", width: '700px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#b3b3b3', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Авторизация</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#75c3ff', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите логин..."
                        size="lg"
                        value={user_id}
                        onChange={e => setUserID(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#75c3ff', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите пароль..."
                        type="password"
                        size="lg"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size={"lg"}
                            variant={"info"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                            onClick={click}>
                            Войти
                        </Button>
                    </p>
                </Form>
            </Card>
        </Container>
    );
});

export default Login;

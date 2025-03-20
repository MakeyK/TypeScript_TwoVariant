import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { getAllUsers as fetchAllUsers, logins } from '../http/userApi';
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/consts";
import NavBar2 from "../components/NavBar2";

const Login = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const { UserRequest } = useContext(Context);
    const navigate = useNavigate();
    const { user } = useContext(Context)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const logirov = async () => {
        try {
            const response = await logins(login, password)
            console.log(localStorage.getItem("token"))
            // navigate(ADMIN_ROUTE)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    return (
        <Container style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '130px', fontFamily: "Play", width: '600px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Авторизация</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 70, width: '400px', backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        type="login"
                        value={login}
                        placeholder="Введите логин..."
                        size="lg"
                        onChange={e => setLogin(e.target.value)} />
                    <Form.Control
                        style={{ borderRadius: 70, backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
                        className="mt-3"
                        placeholder="Введите пароль..."
                        type="password"
                        size="lg"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <p style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size={"lg"}
                            variant={"outline-success"}
                            style={{ fontWeight: 'bold', borderRadius: 37, width: '250px', height: '70px' }}
                            onClick={logirov}>
                            Войти
                        </Button></p>
                </Form>
            </Card><NavBar2 />
        </Container>
    );
});

export default Login;
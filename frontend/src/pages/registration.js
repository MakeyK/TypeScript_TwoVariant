import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";
import { registration } from '../http/userApi';
import { Context } from "../index";
import { ADMIN_ROUTE, ADMINPANEL_ROUTE, UPDATE_ROUTE } from "../utils/consts";
import NavBar2 from "../components/NavBar2";

const Registration = observer(() => {
    document.body.style.backgroundColor = "#313131"
    const navigate = useNavigate();
    const { user } = useContext(Context)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const location = useLocation();

    const click = async () => {
        try {
            const response = await registration(login, password);
            console.log({ message: 'Зарегался, молодец', response });
            user.setIsAuth(true);
            user.setUser(response.user)

            console.log(user.getisAuth());
            console.log(user.getUser());
            navigate(ADMIN_ROUTE);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };


    return (
        <Container
            style={{ backgroundColor: '#313131', borderRadius: '15px', marginTop: '130px', fontFamily: "Play", width: '700px' }}>
            <Card style={{ borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="p-5 #FFFAF4">
                <p style={{ fontSize: '24px' }}>Регистрация</p>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 70, width: '500px', backgroundColor: '#7F933A', height: 71, border: "1px solid", fontSize: "24px", marginBottom: '20px' }}
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
                            onClick={click}>
                            Зарегистрироваться
                        </Button>
                    </p>
                </Form>
            </Card><NavBar2 />
        </Container>
    );
});

export default Registration;

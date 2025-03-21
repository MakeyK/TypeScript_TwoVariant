import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../index";
import { Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

const ListMessage = observer(() => {
    document.body.style.backgroundColor = "#313131";
    const { UserRequest } = useContext(Context);

    return (
        <ListGroup style={{
            borderRadius: 80, fontFamily: "Play", backgroundColor: '#C9E956', width: '500px',
            display: "inline-block",
            borderRadius: "10px",
            overflowY: 'scroll',
            height: "600px",
            marginTop: "10px"
        }}>{(
            UserRequest.getUserRequest().map((data) => (
                <ListGroup.Item key={data.id_user} style={{ backgroundColor: '#C9E956' }}>
                    <Col style={{
                        borderRadius: 100, fontFamily: "Play", backgroundColor: '#C9E956',
                        maxHeight: "200px",
                        border: "2px solid black",
                        borderRadius: "10px",
                        marginTop: "10px",
                        overflow: 'hidden'
                    }}>
                        <div style={{ marginLeft: '20px', color: "black", fontSize: '20px' }}>Заголовок <div style={{ color: 'purple' }}>{data.title}</div></div>
                        <div style={{ marginLeft: '20px', color: "black", fontSize: '20px' }}>Текст <div style={{ color: 'purple' }}>{data.text}</div></div>
                        <div style={{ marginLeft: '20px', color: "black", fontSize: '20px' }}>Приложения <div style={{ color: 'purple' }}>{data.applications}</div></div>
                    </Col>
                </ListGroup.Item>
            ))
        )
            }
        </ListGroup>
    );
});

export default ListMessage;

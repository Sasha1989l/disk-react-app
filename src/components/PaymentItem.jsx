import React from 'react';
import {Button, Card} from "react-bootstrap";

const PaymentItem = ({payment}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{payment.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{payment.address}</Card.Subtitle>
                <Card.Text>
                    Информация: Нет
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between">
                <div>{payment.date}</div>
                <Button variant="primary" target="_blank" href={payment.url}>Открыть файл</Button>
            </Card.Footer>
        </Card>
    );
};

export default PaymentItem;
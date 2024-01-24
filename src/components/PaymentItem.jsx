import React, {useContext} from 'react';
import {Button, Card} from "react-bootstrap";
import {SettingsContext} from "../context";

const PaymentItem = ({payment}) => {
    const {outdatedMonth} = useContext(SettingsContext);
    const startOutdatedDate = new Date()
    startOutdatedDate.setMonth(startOutdatedDate.getMonth()-outdatedMonth)

    return (
        <Card style={{background: startOutdatedDate > payment.date  ? '#ffe8e8' : '#fff'}}>
            <Card.Body>
                <Card.Title>{payment.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{payment.address}</Card.Subtitle>
                <Card.Text>
                    Информация: Нет
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between">
                <div>{payment.date.toLocaleString().split(',')[0]}</div>
                <Button variant="primary" target="_blank" href={payment.url}>Открыть файл</Button>
            </Card.Footer>
        </Card>
    );
};

export default PaymentItem;
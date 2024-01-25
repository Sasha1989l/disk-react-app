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
                    <div>Тип услуги: {payment.delivery}</div>
                    <div>Цена: <b>{payment.price} ₽.</b></div>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
                <div>{payment.date.toLocaleString().split(',')[0]}</div>
                <div>
                    {payment.avitoUrl &&
                        <Button variant="primary" target="_blank" href={payment.avitoUrl} className='me-2'>Авито</Button>
                    }
                    <Button variant="primary" target="_blank" href={payment.url}>Файл</Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default PaymentItem;
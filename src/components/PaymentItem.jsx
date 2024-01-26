import React, {useContext, useState} from 'react';
import {Button, Card, Toast, ToastContainer} from "react-bootstrap";
import {SettingsContext} from "../context";
import * as PropTypes from "prop-types";
import VerticalCenteredModal from "./UI/VerticalCenteredModal";

const PaymentItem = ({payment}) => {
    const {outdatedMonth} = useContext(SettingsContext);
    const startOutdatedDate = new Date()
    startOutdatedDate.setMonth(startOutdatedDate.getMonth()-outdatedMonth)

    const [showToast, setShowToast] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setShowToast(true)
    }

    return (
        <div>
           <Card style={{background: startOutdatedDate > payment.date  ? '#ffe8e8' : '#fff'}}>
                <Card.Body>
                    <Card.Title>{payment.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{payment.address}</Card.Subtitle>
                    <Card.Text>
                        <div>Тип услуги: {payment.delivery}</div>
                        <div>Цена: <b>{payment.price} ₽.</b></div>
                        <div>
                            Телефон: <a href="#" onClick={() => copyToClipboard(payment.phone)}>{payment.phone}</a>
                        </div>
                    </Card.Text>
                </Card.Body>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={1000} autohide>
                  <Toast.Body>Скопирован!</Toast.Body>
                </Toast>
                <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
                    <div>{payment.date.toLocaleString().split(',')[0]}</div>
                    <div>
                        {payment.avitoUrl &&
                            <Button variant="primary" target="_blank" size="sm" href={payment.avitoUrl}>Авито</Button>
                        }
                        <Button variant="primary" target="_blank" size="sm" href={payment.url} className='mx-2'>Файл</Button>
                        {payment.notes &&
                                <Button variant="primary" size="sm" onClick={()=> setModalShow(true)}>Прим.</Button>
                        }
                    </div>
                </Card.Footer>
            </Card>
            <VerticalCenteredModal
                text={payment.notes}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default PaymentItem;
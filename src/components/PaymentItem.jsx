import React, {useContext, useState} from 'react';
import {Button, Card, Toast, ToastContainer} from "react-bootstrap";
import {SettingsContext} from "../context";
import * as PropTypes from "prop-types";
import VerticalCenteredModal from "./UI/VerticalCenteredModal";

const PaymentItem = ({payment}) => {
    const {outdatedMonth, setShowToast} = useContext(SettingsContext);
    const startOutdatedDate = new Date()
    startOutdatedDate.setMonth(startOutdatedDate.getMonth()-outdatedMonth)

    const [modalShow, setModalShow] = useState(false);

    const copyToClipboard = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(payment.phone)
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
                        <div>Цена: <b>{payment.price} ₽.</b> Телефон: <a href="" onClick={(e) => copyToClipboard(e)}>{payment.phone}</a></div>
                    </Card.Text>
                </Card.Body>
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
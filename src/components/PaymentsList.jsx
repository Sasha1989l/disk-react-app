import React, {useEffect} from 'react';
import PaymentItem from "./PaymentItem";
import {Stack} from "react-bootstrap";


const PaymentsList = ({payments}) => {

    if (!payments.length) {
        return (<h5 className="text-center my-2">Платежи не найдены!</h5>)
    }

    return (
        <Stack gap={1} className="my-2">
            {payments.map((payment) =>
                <PaymentItem payment={payment} key={payment.id}/>
            )}
        </Stack>
    );
};

export default PaymentsList;
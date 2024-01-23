import './App.css';
import PaymentsList from "./components/PaymentsList";
import React, {useEffect, useMemo, useState} from "react";
import PaymentsFilter from "./components/PaymentsFilter";

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import {usePayments} from "./hooks/usePayments";
import {Spinner} from "react-bootstrap";
import YandexDiskService from "./API/YandexDiskService";
import {useFetching} from "./hooks/useFetching";

function App() {
    const dateNow = new Date()
    dateNow.setHours(0,0,0,0);
    const [payments, setPayments] = useState([])
    const [filter, setFilter] = useState({ queryTitle: '', queryAddress: '', startDate: dateNow, endDate: dateNow})
    const sortedAndSearchPayments = usePayments(payments, filter.queryTitle, filter.queryAddress, filter.startDate, filter.endDate);

    const [fetchPayments, isPaymentsLoading, paymentsError] = useFetching(async () => {
        const response = await YandexDiskService.getAll();
        setPayments([...payments, ...response])
    })

    useEffect(() => {
        fetchPayments()
    }, [])

    return (
        <div className="App mx-auto p-2" style={{'maxWidth': '700px'}}>
            <PaymentsFilter filter={filter} setFilter={setFilter}/>
            {isPaymentsLoading
                ? <Spinner animation="border"/>
                : <PaymentsList payments={sortedAndSearchPayments}/>
            }
            {paymentsError &&
                <h1>Произошла ошибка ${paymentsError}</h1>
            }
        </div>
    );
}

export default App;

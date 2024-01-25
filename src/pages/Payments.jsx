import React, {useContext, useEffect, useState} from "react";
import PaymentsFilter from "../components/PaymentsFilter";
import PaymentsList from "../components/PaymentsList";
import {usePayments} from "../hooks/usePayments";
import {Spinner} from "react-bootstrap";
import YandexDiskService from "../API/YandexDiskService";
import {useFetching} from "../hooks/useFetching";
import {SettingsContext} from "../context";

function Payments() {
    const dateNow = new Date()
    dateNow.setHours(0,0,0,0);
    const [payments, setPayments] = useState([])
    const [filter, setFilter] = useState({ queryTitle: '', queryAddress: '', startDate: dateNow, endDate: dateNow, minPrice: '', maxPrice: ''})
    const sortedAndSearchPayments = usePayments(payments, filter.queryTitle, filter.queryAddress, filter.startDate, filter.endDate, filter.minPrice, filter.maxPrice);

    const {publicUrl} = useContext(SettingsContext);

    const [fetchPayments, isPaymentsLoading, paymentsError] = useFetching(async (url) => {
        let yandexDiskService = new YandexDiskService(url)
        const response = await yandexDiskService.getAll();
        setPayments([...payments, ...response])
    })

    useEffect(() => {
        if (publicUrl){
            fetchPayments(publicUrl)
        }
    }, [publicUrl])

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

export default Payments;

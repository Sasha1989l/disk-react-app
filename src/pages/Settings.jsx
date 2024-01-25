import React, {useContext, useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {SettingsContext} from "../context";

const Settings = () => {
    const {outdatedMonth, setOutdatedMonth} = useContext(SettingsContext);

    const changeOutdatedMonthSettings = (month) => {
        setOutdatedMonth(month)
        localStorage.setItem('outdatedMonth', month)
    }

    return (
        <div className="App mx-auto p-2" style={{'maxWidth': '700px'}}>
            <h3 className="text-center mt-1">Настройки</h3>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="outdatedMonthSelect">Срок действия</Form.Label>
              <Form.Select id="outdatedMonthSelect"
                           value={outdatedMonth}
                           onChange={(e) => changeOutdatedMonthSettings(e.target.value)}>
                <option value={1}>1 месяц</option>
                <option value={2}>2 месяца</option>
                <option value={3}>3 месяца</option>
                <option value={4}>4 месяца</option>
                <option value={5}>5 месяцев</option>
                <option value={6}>6 месяцев</option>
                <option value={7}>7 месяцев</option>
                <option value={8}>8 месяцев</option>
                <option value={9}>9 месяцев</option>
                <option value={10}>10 месяцев</option>
                <option value={11}>11 месяцев</option>
                <option value={12}>12 месяцев</option>
              </Form.Select>
            </Form.Group>
        </div>
    );
};

export default Settings;
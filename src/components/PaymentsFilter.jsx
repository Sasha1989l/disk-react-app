import React from 'react';
import {Form, InputGroup} from "react-bootstrap";
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';

const PaymentsFilter = ({filter, setFilter}) => {
    return (
        <div>
            <InputGroup>
                <Form.Control
                  placeholder='Название'
                  value={filter.queryTitle}
                  onChange={e => setFilter({...filter, queryTitle: e.target.value})}
                />
            </InputGroup>
            <InputGroup className="my-1">
                <Form.Control
                  placeholder='Адрес'
                  value={filter.queryAddress}
                  onChange={e => setFilter({...filter, queryAddress: e.target.value})}
                />
            </InputGroup>
            <div className="d-flex flex-row justify-content-around flex-wrap date-select-group">
                <DatePicker
                    className='my-1'
                    wrapperClassName="w-100"
                    selected={filter.startDate}
                    onChange={(date) => setFilter({...filter, startDate: date})}
                    withPortal
                    locale={ru}
                    dateFormat="dd.MM.yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    yearDropdownItemNumber={5}
                    scrollableYearDropdown
                />
                <DatePicker
                    className="my-1"
                    selected={filter.endDate}
                    onChange={(date) => setFilter({...filter, endDate: date})}
                    withPortal
                    locale={ru}
                    dateFormat="dd.MM.yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    yearDropdownItemNumber={5}
                    scrollableYearDropdown
                />
            </div>
        </div>
    );
};

export default PaymentsFilter;
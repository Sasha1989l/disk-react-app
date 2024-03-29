import React, {forwardRef} from 'react';
import {Accordion, Button, Form, InputGroup} from "react-bootstrap";
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';

const PaymentsFilter = ({filter, setFilter}) => {
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Button className="primary" onClick={onClick} ref={ref}>
          {value}
        </Button>
    ))

    return (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Фильтры</Accordion.Header>
            <Accordion.Body className="p-1">
                <InputGroup className="my-1">
                    <Form.Control
                      placeholder='Адрес'
                      value={filter.queryAddress}
                      onChange={e => setFilter({...filter, queryAddress: e.target.value})}
                    />
                </InputGroup>
                <InputGroup>
                    <Form.Control
                      placeholder='Название'
                      value={filter.queryTitle}
                      onChange={e => setFilter({...filter, queryTitle: e.target.value})}
                    />
                </InputGroup>
                <InputGroup>
                    <Form.Control
                        className='my-1'
                        type="number"
                        placeholder='Телефон'
                        value={filter.phone}
                        onChange={e => setFilter({...filter, phone: e.target.value})}
                    />
                </InputGroup>
                <div className='d-flex flex-row my-1'>
                    <InputGroup>
                        <Form.Control
                          placeholder='Цена от'
                          type="number"
                          value={filter.minPrice}
                          onChange={e => setFilter({...filter, minPrice: e.target.value})}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Form.Control
                          placeholder='Цена до'
                          type="number"
                          value={filter.maxPrice}
                          onChange={e => setFilter({...filter, maxPrice: e.target.value})}
                        />
                    </InputGroup>
                </div>
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
                        customInput={<ExampleCustomInput />}
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
                        customInput={<ExampleCustomInput />}
                    />
                </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    );
};

export default PaymentsFilter;
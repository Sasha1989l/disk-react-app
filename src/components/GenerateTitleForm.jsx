import React, {forwardRef, useContext, useEffect, useState} from 'react';
import {Button, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import ImageTitle from "../helpers/ImageTitle";
import {SettingsContext} from "../context";

const GenerateTitleForm = ({params, setParams}) => {
    const {setShowToast} = useContext(SettingsContext);

    let [deliveryMethods, setDeliveryMethods] = useState([])
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Button className="primary" onClick={onClick} ref={ref}>
          {value}
        </Button>
    ))
    let [phone16, setPhone16] = useState('')


    useEffect(() => {
        let dm = ImageTitle.deliveryMethods
        for(let method_code in dm){
            deliveryMethods.push({code: method_code, title: dm[method_code]})
        }
    }, []);

    useEffect(() => {
        let phone_num = parseInt(params.phone)
        setPhone16(phone_num.toString(16))
    }, [params.phone]);

    const copyPhone = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(phone16)
        setShowToast(true)
    }

    return (
        <div>
            <div className="text-center">
                <DatePicker
                    className='my-2'
                    wrapperClassName="w-100"
                    selected={params.date}
                    onChange={(date) => setParams({...params, date: date})}
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
            <Form.Group className="my-2">
                <Form.Select value={params.delivery} onChange={(e) => setParams({...params, delivery: e.target.value})}>
                    {deliveryMethods.map((method) => (
                        <option key={method.code} value={method.code}>{method.title}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <InputGroup className="my-2">
                <Form.Control
                  placeholder='Цена'
                  type="number"
                  value={params.price}
                  onChange={e => setParams({...params, price: e.target.value})}
                />
            </InputGroup>
            <InputGroup className="my-2">
                <Form.Control
                  placeholder='Адрес'
                  value={params.address}
                  onChange={e => setParams({...params, address: e.target.value})}
                />
            </InputGroup>
            <InputGroup className="my-2">
                <Form.Control
                  placeholder='Название'
                  value={params.title}
                  onChange={e => setParams({...params, title: e.target.value})}
                />
            </InputGroup>
            <FloatingLabel
            label="Ссылка на авито или id"
            className="mb-2"
            >
                <Form.Control as="textarea"
                              style={{ height: '120px' }}
                              value={params.avitoId}
                              onChange={e => setParams({...params, avitoId: e.target.value})}
                />
            </FloatingLabel>
            <div className="my-2">
                <Form.Control
                  placeholder='Телефон'
                  type="number"
                  value={params.phone}
                  aria-describedby="phone16"
                  onChange={e => setParams({...params, phone: e.target.value})}
                />
                <div className="form-text" id="phone16"><a href="#" onClick={(e)=> copyPhone(e)}>{phone16}</a></div>
            </div>
            <FloatingLabel
            label="Примечания"
            className="mb-3"
            >
                <Form.Control as="textarea"
                              style={{ height: '100px' }}
                              value={params.notes}
                              onChange={e => setParams({...params, notes: e.target.value})}
                />
            </FloatingLabel>
        </div>
    );
};

export default GenerateTitleForm;
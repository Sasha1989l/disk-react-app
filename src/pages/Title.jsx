import React, {useEffect, useState} from 'react';
import {Button, Toast, ToastContainer} from "react-bootstrap";
import ImageTitle from "../helpers/ImageTitle";
import GenerateTitleForm from "../components/GenerateTitleForm";

const Title = () => {
    const [params, setParams] = useState({
        date: new Date(),
        delivery: 'Д',
        price: 10,
        title: 'Название',
        address: 'Адрес'
    })
    const [fileName, setFileName] = useState('')
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setFileName(generateTitle())
    }, [params]);

    const generateTitle = () => {
        let date = params.date.toLocaleString().split(',')[0]
        return ImageTitle.generate(date, params.delivery, params.price, params.title, params.address)
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setShowToast(true)
    }

    return (
        <div className="App mx-auto p-2" style={{'maxWidth': '700px'}}>
            <GenerateTitleForm params={params} setParams={setParams}/>
            <div className="text-center mt-3">
                <a href='#'
                   className="text-break"
                   onClick={() => copyToClipboard(fileName)}>
                    {fileName}
                </a>
            </div>
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={1000} autohide>
              <Toast.Body>Скопировано!</Toast.Body>
            </Toast>
        </div>
    );
};

export default Title;
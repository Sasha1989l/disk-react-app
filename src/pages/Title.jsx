import React, {useEffect, useState} from 'react';
import {Button, Toast, ToastContainer} from "react-bootstrap";
import ImageTitle from "../helpers/ImageTitle";
import GenerateTitleForm from "../components/GenerateTitleForm";
import {options} from "axios";

const Title = () => {
    const [params, setParams] = useState({
        date: new Date(),
        delivery: 'Д',
        price: '',
        title: '',
        address: '',
        avitoId: '',
        phone: '',
        notes: ''
    })
    const [fileName, setFileName] = useState('')
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setFileName(generateTitle())
    }, [params]);

    const getUrl = (text) => {
        let url = ''
        try {
            url = new URL(text)
        } catch (_) {
          return false
        }
        return url
    }

    const generateTitle = () => {
        let date = params.date.toLocaleString().split(',')[0]
        let [day, month, year] = date.split('.')
        year = year.substring(year.length-2);
        date = `${day}.${month}.${year}`

        let avitoId = params.avitoId
        let url = getUrl(avitoId)
        if (url) {
            let pathname = url.pathname
            let pathname_parts = pathname.split('_')
            avitoId = pathname_parts[pathname_parts.length-1]
        }

        let phone_num = parseInt(params.phone)
        let phone = phone_num ? phone_num.toString(16) : ''

        return ImageTitle.generate(
            date,
            params.delivery,
            params.price,
            params.address,
            params.title,
            avitoId,
            phone,
            params.notes
        )
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
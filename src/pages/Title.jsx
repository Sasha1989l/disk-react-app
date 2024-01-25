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
    })
    const [fileName, setFileName] = useState('')
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setFileName(generateTitle())
    }, [params]);

    const isUrl = (text) => {
      try {
        new URL(text);
      } catch (_) {
          return false
      }
      return true
    }

    const generateTitle = () => {
        let date = params.date.toLocaleString().split(',')[0]
        let [day, month, year] = date.split('.')
        year = year.substring(year.length-2);
        date = `${day}.${month}.${year}`

        let avitoId = params.avitoId
        if (isUrl(avitoId)) {
            let url_parts = avitoId.split('_')
            avitoId = url_parts[url_parts.length-1]
        }

        return ImageTitle.generate(date, params.delivery, params.price, params.address, params.title, avitoId)
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
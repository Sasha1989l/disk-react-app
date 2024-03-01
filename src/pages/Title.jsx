import React, {useContext, useEffect, useState} from 'react';
import ImageTitle from "../helpers/ImageTitle";
import GenerateTitleForm from "../components/GenerateTitleForm";
import {SettingsContext} from "../context";

const Title = () => {
    const {setShowToast} = useContext(SettingsContext);

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

    useEffect(() => {
        if (localStorage.getItem('params')) {
            let localStorageParams = JSON.parse(localStorage.getItem('params'))
            setParams({...localStorageParams, date: new Date(localStorageParams.date)})
        }
    }, [])

    useEffect(() => {
        setFileName(generateTitle())
        localStorage.setItem('params', JSON.stringify(params))
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

    const copyToClipboard = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(fileName)
        setShowToast(true)
        if (localStorage.getItem('params')) {
            localStorage.removeItem('params')
        }
    }

    return (
        <div className="App mx-auto p-2" style={{'maxWidth': '700px'}}>
            <GenerateTitleForm params={params} setParams={setParams}/>
            <div className="text-center mt-3">
                <a href='#'
                   className="text-break"
                   onClick={(e) => copyToClipboard(e)}>
                    {fileName}
                </a>
            </div>
        </div>
    );
};

export default Title;
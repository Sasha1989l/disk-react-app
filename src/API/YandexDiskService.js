import axios from "axios";
import DateHelper from "../helpers/DateHelper";
import ImageTitle from "../helpers/ImageTitle";
import {useContext} from "react";
import {SettingsContext} from "../context";


export default class YandexDiskService {

    constructor(publicUrl) {
        this.public_url = publicUrl
        let url_parts = publicUrl.split('/')
        this.public_key = url_parts[url_parts.length-1]
    }

    getUrl(data, item){
        let url = ''

        if (item?.media_type === "image"){
            let fileName = encodeURIComponent(item.name).replaceAll('%25', '%')
            url = `https://disk.yandex.ru/d/${this.public_key}/${fileName}`
        }

        if (item?.media_type === 'document'){
            let doc_url = encodeURIComponent(`://${item.public_key}:${item.path}`).replaceAll('%25', '%')
            let doc_name = encodeURIComponent(item.name).replaceAll('%25', '%').replaceAll('%25', '%')
            url = `https://docs.yandex.ru/docs/view?url=ya-disk-public${doc_url}&name=${doc_name}`
        }

        return url
    }

    parseResponse(response){
        if (response.status !== 200){
            throw new Error('Статус код не 200');
        }

        let payments = []
        let data = response?.data?._embedded
        let total = data.total
        let items= data?.items

        items.map((item) => {
            let fileData = ImageTitle.getData(item.name)

            let phone = parseInt(fileData['phone'], 16) ? parseInt(fileData['phone'], 16) : ''

            payments.push({
                id: item?.resource_id,
                title: fileData['title'],
                date: DateHelper.parseDate(fileData['date']),
                address: fileData['address'],
                url: this.getUrl(data, item),
                delivery: fileData['delivery'],
                price: fileData['price'],
                avitoUrl: fileData['avitoId'] ? `https://www.avito.ru/${fileData['avitoId']}` : '',
                phone: phone.toString(),
                notes: fileData['notes'],
            })
        })

        return {total: total, payments: payments}
    }

    async getAll(limit=100, offset=0) {
        let payments = []
        let total = -1
        let page = 0

        do{
            page += 1
            const response = await axios.get('https://cloud-api.yandex.net/v1/disk/public/resources',
            {
                    params: {
                        public_key: this.public_url,
                        limit: limit,
                        offset: limit*(page-1),
                    },
                    headers:{
                        'Content-Type': 'application/json'
                    }
            })
            let parseResult = this.parseResponse(response)
            total = parseResult['total']
            payments = [...payments, ...parseResult['payments']]
        }while(total>page*limit)

        return payments
    }
}
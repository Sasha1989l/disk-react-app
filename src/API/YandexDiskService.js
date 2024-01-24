import axios from "axios";
import DateHelper from "../helpers/DateHelper";

export default class YandexDiskService {

    static public_key = 'ZxDvyPQq38rY8w'
    static public_url = `https://disk.yandex.ru/d/${this.public_key}`

    static splitString(fileName) {
        fileName = fileName.replace(/\.[^.]+$/, "")
        let parts = fileName.split("@")
        if (parts.length < 3){
            throw new Error('Название одного из файлов не может быть обработано');
        }
        let updated_parts = parts.map(part => {
            return part.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        })

        return {date: updated_parts[0], address: updated_parts[1], title: updated_parts[2]}
    }


    static getUrl(data, item){
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

    static parseResponse(response){
        if (response.status !== 200){
            throw new Error('Статус код не 200');
        }

        let payments = []
        let data = response?.data?._embedded
        let total = data.total
        let items= data?.items

        items.map((item) => {
            let fileData = this.splitString(item.name)
            payments.push({
                id: item?.resource_id,
                title: fileData['title'],
                date: DateHelper.parseDate(fileData['date']),
                address: fileData['address'],
                url: this.getUrl(data, item)})
            }
        )

        return {total: total, payments: payments}
    }

    static async getAll(limit=100, offset=0) {
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
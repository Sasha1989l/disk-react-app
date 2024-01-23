import axios from "axios";

export default class YandexDiskService {

    static splitString(fileName) {
        fileName = fileName.replace(/\.[^.]+$/, "")
        let parts = fileName.split("@")
        if (parts.length < 3){
            throw new Error('Название одного из файлов не может быть обработано');
        }
        return {date: parts[0], address: parts[1], title: parts[2]}
    }

    static parseResponse(response){
        if (response.status !== 200){
            throw new Error('Статус код не 200');
        }

        let payments = []
        let data = response?.data?._embedded
        let total = data.total
        let items= data?.items
        {items.map((item) => {
                let fileData = this.splitString(item.name)
                payments.push({
                    id: item?.resource_id,
                    title: fileData['title'],
                    date: fileData['date'],
                    address: fileData['address'],
                    url: item?.file})
            }
        )}
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
                        public_key: 'https://disk.yandex.ru/d/ZxDvyPQq38rY8w',
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
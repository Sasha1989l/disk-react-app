export default class ImageTitle {
    static partsName = ['date', 'delivery', 'price', 'address', 'title']
    static separator = '@'
    static deliveryMethods = {
        'Д': 'доставка+ установка',
        'ТД': 'только доставка',
        'С': 'самовывоз'
    }
    static maxFileNameLength = 250

    static splitString(fileName) {
        let regexp_file_extension = /\.[^.]+$/
        fileName = fileName.replace(regexp_file_extension, "")

        let parts = fileName.split(this.separator)
        if (parts.length < this.partsName.length){
            throw new Error(`Название одного из файлов не может быть обработано. Название файла: ${fileName}`);
        }

        let updated_parts = parts.map(part => {
            let space_at_beginning = /^\s\s*/
            let space_at_end = /\s\s*$/
            return part.replace(space_at_beginning, '').replace(space_at_end, '')
        })

        let data = {}
        updated_parts.map((part, index)=> {
            let part_name = this.partsName[index]
            data[part_name] = part
        })

        return data
    }


    static getData = (title) => {
        let titleData = this.splitString(title)

        if (this.deliveryMethods[titleData['delivery']]){
            titleData['delivery'] = this.deliveryMethods[titleData['delivery']]
        }

        return titleData
    }

    static generate = (...args) => {
        if(args.length < this.partsName.length){
            return `Передано мало аргументов. Их должно быть: ${this.partsName.length}`
        }
        let fileName = ''
        this.partsName.forEach((part, index, parts)=>{
            fileName += `${args[index]}`
            let end = index+1 === parts.length
            if(!end){
                fileName += this.separator
            }
        })

        if(fileName.length > this.maxFileNameLength){
            return `Название фала слишком длинное. Длина: ${fileName.length}`
        }

        return fileName
    }
}
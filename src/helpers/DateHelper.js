
export default class DateHelper {
        static parseDate = (dateString) => {
                let parts = dateString.split(".")
                // Здесь предполагается, что формат даты DD.MM.YYYY
                let day = parts[0].replace(/\s/g, '')
                let month = parts[1].replace(/\s/g, '')
                let year = parts[2].replace(/\s/g, '')
                year = year.length === 2 ? `20${year}` : year

                return new Date(year, month - 1, day)
        }
}
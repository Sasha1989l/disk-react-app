import {useMemo} from "react";

const parseDate = (dateString) => {
        let parts = dateString.split(".")
        // Здесь предполагается, что формат даты DD.MM.YYYY
        let day = parts[0].replace(/\s/g, '')
        let month = parts[1].replace(/\s/g, '')
        let year = parts[2].replace(/\s/g, '')
        year = year.length === 2 ? `20${year}` : year

        return new Date(year, month - 1, day)
    }

export const useSortedPayments = (payments) => {
    return useMemo(() => {
        return [...payments].sort((a, b) => parseDate(b['date']) - parseDate(a['date']))
    }, [payments]);
}

export const usePayments = (payments, queryTitle, queryAddress, startDate, endDate) => {
    const sortedPayments = useSortedPayments(payments)

    return useMemo(() => {
        let searched = sortedPayments.filter(
            payment => payment.title.toLowerCase().includes(queryTitle.toLowerCase()))
        searched = searched.filter(
            payment => payment.address.toLowerCase().includes(queryAddress.toLowerCase()))
        searched = searched.filter(
            payment => {
                if (startDate !== endDate) {
                    let recordDate = parseDate(payment.date)
                    return startDate <= recordDate && recordDate <= endDate
                }
                return true
            })

        return searched
    }, [queryTitle, queryAddress, startDate, endDate, sortedPayments])
}
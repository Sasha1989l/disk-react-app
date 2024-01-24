import {useMemo} from "react";

export const useSortedPayments = (payments) => {
    return useMemo(() => {
        return [...payments].sort((a, b) => b['date'] - a['date'])
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
                    let recordDate = payment.date
                    return startDate <= recordDate && recordDate <= endDate
                }
                return true
            })

        return searched
    }, [queryTitle, queryAddress, startDate, endDate, sortedPayments])
}
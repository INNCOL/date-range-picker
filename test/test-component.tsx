import React from "react"
import { DateRangePicker, Dates } from "../src"

export const TestComponent = () => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState<Date>(new Date());

    const handleOnDateRange = ({ start, end }: Dates) => {
        setStartDate(start);
        if (end)
            setEndDate(end)
    }
    return <div style={{ display: 'flex', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1>
            Test for Date Range Picker
        </h1>
        <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={handleOnDateRange}
        />
    </div>
}
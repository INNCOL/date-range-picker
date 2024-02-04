import React, { useState } from 'react';
import Calendar, { Dates } from './Calendar';

export default function () {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onChange = (date: Dates) => {
        setStartDate(date.start);
        setEndDate(date.end);
        console.log(date)
    }

    return (
        <Calendar
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
        />
    );
}


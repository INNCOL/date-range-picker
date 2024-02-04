import React, { useState } from 'react';
import { Popper, MenuItem, Select, FormControl, InputLabel, Paper, Button, MenuList, TextField, OutlinedInput, InputAdornment } from '@mui/material';
import { eachDayOfInterval, endOfMonth, startOfMonth, getMonth, getYear, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarMonth } from '@mui/icons-material';

export interface Dates {
  start: Date;
  end?: Date;
}

interface CalendarProps {
  startDate: Date;
  endDate: Date;
  onChange: (date: Dates) => void;
}

function Calendar({ onChange, startDate = new Date(), endDate }: CalendarProps) {
  const [dateRangeText, setDateRangeText] = React.useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedMonth, setSelectedMonth] = useState(getMonth(startDate));
  const [selectedYear, setSelectedYear] = useState(getYear(startDate));

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onChange({ start: selectedStartDate, end: selectedEndDate });
    setDateRangeText(`${format(selectedStartDate, 'dd/MM/yyyy')} - ${format(selectedEndDate, 'dd/MM/yyyy')}`)
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
    } else if (!selectedEndDate) {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const handleMonthSelect = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearSelect = (event) => {
    setSelectedYear(event.target.value);
  };

  const generateDays = () => {
    const firstDayOfMonth = startOfMonth(new Date(selectedYear, selectedMonth, 1));
    const lastDayOfMonth = endOfMonth(new Date(selectedYear, selectedMonth, 1));
    return eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  };

  const renderDays = () => {
    const days = generateDays();
    return days.map((date) => (
      <MenuItem
        key={date.toISOString()}
        onClick={() => handleDateSelect(date)}
        style={
          date.getTime() === startDate?.getTime()
            ? { fontWeight: 'bold', backgroundColor: 'darkgray', color: 'white' }
            : date.getTime() === endDate?.getTime()
              ? { fontWeight: 'bold', backgroundColor: 'gray', color: 'white' }
              : selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate
                ? { backgroundColor: 'lightgray' }
                : {}
        }
      >
        {date.getDate()}
      </MenuItem>
    ));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
        <OutlinedInput
          id="date-range-input"
          type="text"
          value={dateRangeText}
          disabled
          endAdornment={
            <InputAdornment position="end">
              <CalendarMonth
                onClick={handleClick}
              />
            </InputAdornment>
          }
        />
      </FormControl>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="auto" sx={{ padding: '1rem' }} >
        <Paper>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
              <FormControl>
                <InputLabel id="month-select-label">Mes</InputLabel>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={selectedMonth}
                  onChange={handleMonthSelect}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                      {
                        format(new Date(0, i), 'MMMM', { locale: es })
                          .replace(/^\w/, (c) => c.toUpperCase())
                      }
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="year-select-label">Año</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  onChange={handleYearSelect}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <MenuItem key={i} value={selectedYear - 5 + i}>
                      {selectedYear - 5 + i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <MenuList style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {renderDays()}
            </MenuList>
          </div>
          <div>
            <Button onClick={handleClose}>Seleccionar</Button>
          </div>
        </Paper>
      </Popper>
    </div>
  );
}

export default Calendar;

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { SelectChangeEvent } from '@mui/material/Select';
import { endOfMonth, eachDayOfInterval, format, getMonth, getYear, startOfMonth } from 'date-fns';
import { Day } from './day';
import { MonthSelect } from './month-select';
import { YearSelect } from './year-select';
import { InputRange } from './input-range';
import { Box, ClickAwayListener } from '@mui/material';

export interface Dates {
  start: Date;
  end: Date | null;
}

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (date: Dates) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, startDate = new Date(), endDate }) => {
  const [dateRangeText, setDateRangeText] = React.useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endDate);
  const [selectedMonth, setSelectedMonth] = useState(getMonth(startDate));
  const [selectedYear, setSelectedYear] = useState(getYear(startDate));

  const toggleCalendar = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onChange({ start: selectedStartDate, end: selectedEndDate });
    setDateRangeText(`${format(selectedStartDate, 'dd/MM/yyyy')} - ${format(selectedEndDate!, 'dd/MM/yyyy')}`)
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
      onChange({ start: date, end: null });
    } else if (!selectedEndDate) {
      setSelectedEndDate(date);
      onChange({ start: selectedStartDate, end: date });
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      onChange({ start: date, end: null });
    }
  };

  const handleMonthSelect = (event: SelectChangeEvent<string>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleYearSelect = (event: SelectChangeEvent<string>) => {
    setSelectedYear(Number(event.target.value));
  };

  const generateDays = () => {
    const firstDayOfMonth = startOfMonth(new Date(selectedYear, selectedMonth, 1));
    const lastDayOfMonth = endOfMonth(new Date(selectedYear, selectedMonth, 1));
    return eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  };

  const renderDays = () => {
    const days = generateDays();
    return days.map((date) => {
      const isInRange = selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate;

      return (
        <Day
          key={date.toISOString()}
          onClick={() => handleDateSelect(date)}
          isStart={date.getTime() === startDate?.getTime()}
          isEnd={date.getTime() === endDate?.getTime()}
          isInRange={isInRange}
        >
          {date.getDate()}
        </Day>
      )
    });
  };

  const onClickAway = () => {
    setAnchorEl(null);
  }

  return (
    <ClickAwayListener mouseEvent="onMouseDown"
      touchEvent="onTouchStart" onClickAway={onClickAway}>
      <Box sx={{ position: 'relative' }}>
        <InputRange value={dateRangeText} onIconClick={toggleCalendar} />
        <Popper style={{ zIndex: 1 }} open={Boolean(anchorEl)} anchorEl={anchorEl} placement="auto" sx={{ padding: '1rem' }} >
          <Paper sx={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', gap: '1rem' }}>
                <MonthSelect
                  value={selectedMonth.toString()}
                  onChange={handleMonthSelect}
                />
                <YearSelect
                  value={selectedYear}
                  onChange={handleYearSelect}
                />
              </div>
              <MenuList style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {renderDays()}
              </MenuList>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleClose}>Seleccionar</Button>
              <IconButton onClick={toggleCalendar}>
                <Close />
              </IconButton>
            </div>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}

import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';

import { endOfMonth, eachDayOfInterval, format, getMonth, getYear, startOfMonth, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

import { Day } from './day';
import { InputRange } from './input-range';

export interface Dates {
  start?: Date;
  end?: Date;
}

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onClear?: () => void;
  onChange: (date: Dates) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  startDate = null,
  endDate = null,
  onClear,
}) => {
  const today = new Date();

  const [dateRangeText, setDateRangeText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endDate);
  const [selectedMonth, setSelectedMonth] = useState(getMonth(today));
  const [selectedYear, setSelectedYear] = useState(getYear(today));

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      setDateRangeText(`${format(selectedStartDate, 'dd/MM/yyyy')} - ${format(selectedEndDate, 'dd/MM/yyyy')}`);
    } else {
      setDateRangeText('');
    }
  }, [selectedStartDate, selectedEndDate]);

  const toggleCalendar = (event: any) => {
    setAnchorEl(anchorEl ? null : event.target.parentElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (selectedStartDate && selectedEndDate) {
      onChange({ start: selectedStartDate, end: selectedEndDate });
    }
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const generateDays = () => {
    const firstDayOfMonth = startOfMonth(new Date(selectedYear, selectedMonth, 1));
    const lastDayOfMonth = endOfMonth(new Date(selectedYear, selectedMonth, 1));
    return eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  };

  const renderWeekdays = () => {
    const baseDate = new Date(2021, 7, 2); // Monday, August 2, 2021
    return [...Array(7)].map((_, i) => {
      const day = new Date(baseDate);
      day.setDate(baseDate.getDate() + i);
      return (
        <Box key={i} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {format(day, 'EEEEE', { locale: es })}
        </Box>
      );
    });
  };

  const renderDays = () => {
    const days = generateDays();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    const dayOfWeek = firstDayOfMonth.getDay();

    const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const blanks = [...Array(offset)].map((_, i) => (
      <Day key={`blank-${i}`} disabled>
        {/* empty cell */}
      </Day>
    ));

    const dateCells = days.map((date) => {
      const isInRange =
        selectedStartDate &&
        selectedEndDate &&
        date > selectedStartDate &&
        date < selectedEndDate;

      const isToday = format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');

      return (
        <Day
          key={date.toISOString()}
          onClick={() => handleDateSelect(date)}
          isStart={date.getTime() === selectedStartDate?.getTime()}
          isEnd={date.getTime() === selectedEndDate?.getTime()}
          isInRange={isInRange}
          isToday={isToday}
        >
          {date.getDate()}
        </Day>
      );
    });

    return [...blanks, ...dateCells];
  };


  const onClickAway = () => {
    setAnchorEl(null);
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextYear = () => setSelectedYear(selectedYear + 1);
  const prevYear = () => setSelectedYear(selectedYear - 1);

  const clean = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedMonth(getMonth(today));
    setSelectedYear(getYear(today));
    setAnchorEl(null);
    setDateRangeText('');
    onClear?.();
  };

  const setLast7Days = () => {
    const start = subDays(today, 7);
    const end = today;
    setSelectedStartDate(start);
    setSelectedEndDate(end);
  };

  const open = Boolean(anchorEl);
  const id = open ? "inn-col-date-range-picker" : undefined;

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Box sx={{ position: 'relative' }}>
        <InputRange value={dateRangeText} onIconClick={toggleCalendar} />
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="auto"
          sx={{ zIndex: 1 }}
        >
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <IconButton onClick={prevYear}><KeyboardDoubleArrowLeft /></IconButton>
                <IconButton onClick={prevMonth}><KeyboardArrowLeft /></IconButton>
                <strong>
                  {`${format(new Date(0, selectedMonth), 'MMMM', { locale: es }).replace(/^\w/, c => c.toUpperCase())} ${selectedYear}`}
                </strong>
                <IconButton onClick={nextMonth}><KeyboardArrowRight /></IconButton>
                <IconButton onClick={nextYear}><KeyboardDoubleArrowRight /></IconButton>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center' }}>
                {renderWeekdays()}
              </Box>

              <MenuList sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {renderDays()}
              </MenuList>

              {/* Optional: preset quick range */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button onClick={setLast7Days}>Últimos 7 días</Button>
                <Button onClick={clean}>Limpiar</Button>
                <Button onClick={handleClose}>Seleccionar</Button>
                <IconButton onClick={toggleCalendar}><Close /></IconButton>
              </Box>
            </Box>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

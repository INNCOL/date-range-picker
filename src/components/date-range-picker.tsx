import React, { useState } from 'react';
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
import { endOfMonth, eachDayOfInterval, format, getMonth, getYear, startOfMonth } from 'date-fns';
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

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, startDate = null, endDate = null, onClear }) => {
  const [dateRangeText, setDateRangeText] = React.useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endDate);
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(getMonth(today));
  const [selectedYear, setSelectedYear] = useState(getYear(today));

  const toggleCalendar = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDateRangeText(`${format(selectedStartDate!, 'dd/MM/yyyy')} - ${format(selectedEndDate!, 'dd/MM/yyyy')}`)
    if (selectedStartDate && selectedEndDate) {
      onChange({ start: selectedStartDate, end: selectedEndDate });
    }
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
    } else if (!selectedEndDate && selectedStartDate.getTime() < date.getTime()) {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
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
          isStart={date.getTime() === selectedStartDate?.getTime()}
          isEnd={date.getTime() === selectedEndDate?.getTime()}
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

  const nextMonth = () => {
    if (selectedMonth == 11) {
      setSelectedYear(selectedYear + 1)
      setSelectedMonth(0)
      return;
    }
    setSelectedMonth(selectedMonth + 1);
  }

  const prevMonth = () => {
    if (selectedMonth == 0) {
      setSelectedYear(selectedYear - 1)
      setSelectedMonth(11)
      return;
    }

    setSelectedMonth(selectedMonth - 1);
  }

  const nextYear = () => {
    setSelectedYear(selectedYear + 1)
  }

  const prevYear = () => {
    setSelectedYear(selectedYear - 1)
  }

  const clean = () => {
    setSelectedStartDate(new Date())
    setSelectedEndDate(null)
    setSelectedMonth(getMonth(today))
    setSelectedYear(getYear(today))
    setAnchorEl(null)
    setDateRangeText('')
    onClear?.();
  }

  return (
    <ClickAwayListener mouseEvent="onMouseDown"
      touchEvent="onTouchStart" onClickAway={onClickAway}>
      <Box sx={{ position: 'relative' }}>
        <InputRange value={dateRangeText} onIconClick={toggleCalendar} />
        <Popper style={{ zIndex: 1 }} open={Boolean(anchorEl)} anchorEl={anchorEl} placement="auto" sx={{ padding: '1rem' }} >
          <Paper sx={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', justifyItems: "center", padding: '1rem', gap: '1rem' }}>
                <IconButton onClick={prevYear}>
                  <KeyboardDoubleArrowLeft />
                </IconButton>
                <IconButton onClick={prevMonth}>
                  <KeyboardArrowLeft />
                </IconButton>
                <strong style={{ display: 'flex', alignItems: 'center' }}>{`${format(new Date(0, selectedMonth), 'MMMM', { locale: es })
                  .replace(/^\w/, (c) => c.toUpperCase())} ${selectedYear}`}</strong>
                <IconButton onClick={nextMonth}>
                  <KeyboardArrowRight />
                </IconButton>
                <IconButton onClick={nextYear}>
                  <KeyboardDoubleArrowRight />
                </IconButton>
              </div>
              <MenuList style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {renderDays()}
              </MenuList>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleClose}>Seleccionar</Button>
              <Button onClick={clean}>Limpiar</Button>
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

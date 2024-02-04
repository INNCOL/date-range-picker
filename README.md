# Date Range Picker

A customizable and easy-to-use calendar component built with React and Material-UI.

## Features

- Select a date range by clicking on the calendar icon and choosing start and end dates from the pop-up calendar.
- Navigate through months and years to select the desired date range.
- Display the selected date range in a text field.
- Easily integrate into your React applications.

## Test component locally
run webpack server 
```bash
npm run test:start
```

## Installation

To install the calendar component, simply run:

```bash
npm install inncol-date-range-picker
```

or 

```bash
yarn add inncol-date-range-picker
```

## Usage

```tsx
import React from 'react';
import { DateRangePicker, Dates } from 'inncol-date-range-picker';

function App() {

  const handleChange = (date: Dates) => {
    console.log('Selected date range:', date);
  };

  return (
    <div>
      <h1>Calendar Component Demo</h1>
      <DateRangePicker
        startDate={new Date()}
        endDate={new Date()}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
```

## Example

![DateRangePicker](https://www.inncol.com.mx/assets/date-range-picker.png "DateRangePicker Image")
 
## Props

- `startDate` (Date): The start date of the selected date range. Defaults to the current date.
- `endDate` (Date): The end date of the selected date range.
- `onChange` (Function): Callback function triggered when the selected date range changes.

## Contributing

at [Inncol](https://www.inncol.com.mx/) Contributions are welcome! Please feel free to submit any issues or pull requests.

## License
This project is licensed under the GNU General Public License Version 3, 29 June 2007 - see the LICENSE file for details.

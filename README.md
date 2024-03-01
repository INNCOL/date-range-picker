# Date Range Picker

A customizable and easy-to-use calendar component built with React and Material-UI.

- [Changelog](https://github.com/INNCOL/date-range-picker/blob/main/CHANGELOG.md)

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

  const onClear = () => { 
    console.log('On clear function');
  }

  return (
    <div>
      <h1>Calendar Component Demo</h1>
      <DateRangePicker
        onClear={onClear}
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

![DateRangePicker](https://storage.googleapis.com/blog_imgs/date-range-v-1.1.2.png "DateRangePicker Image")
 
## Props

```ts

//
// Types
//

type Dates {
  start?: Date;
  end?: Date
}

//
// Props: 
//

// The start date of the selected date range. Defaults to the current 
startDate: Date

// The end date of the selected date range.
endDate: Date

// Callback function triggered when the selected date range changes.
onChange: (dates: Dates) => void

// Callback function triggered when the selected date range is cleared.
onClear: () => void

```

## Contributing

at [Inncol](https://www.inncol.com.mx/) Contributions are welcome! Please feel free to submit any issues or pull requests.


- Fork the project
- Run the project in development mode: `$ npm run dev`
- Make changes.
- Add appropriate tests
- $ npm test
- If tests don't pass, make them pass.
- Update README with appropriate docs.
- Commit and PR

## Release checklist

- Update CHANGELOG
- `npm run version`

## License
This project is licensed under the GNU General Public License Version 3, 29 June 2007 - see the LICENSE file for details.

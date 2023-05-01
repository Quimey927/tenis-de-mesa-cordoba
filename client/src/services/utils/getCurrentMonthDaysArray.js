// this function gets a year and a month, and returns an array of consecutives number:
// the first ${freeSpaces} ones will be left blank on the calendar, and are represented
// with negative numbers, only for key purposes on list rendering. The last number is the amount
// of days that month has

export const getCurrentMonthDaysArray = (year, month) => {
  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };

  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const getDaysOfEachMonth = (year) => {
    return [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  };

  const daysOfEachMonth = getDaysOfEachMonth(year);
  const currentMonthDays = daysOfEachMonth[month];

  let firstDay = new Date(year, month, 1).getDay();

  // since our calendar starts on monday, and JS one starts on sunday,
  // we have to make this mathematic adjust
  let freeSpaces = (firstDay + 6) % 7;

  // this is the array we are going to return later
  const daysOfCurrentMonth = [];

  // adds free spaces
  for (let i = 1; i <= freeSpaces; i++) {
    daysOfCurrentMonth.push(-i);
  }

  // adds months days
  for (let i = 1; i <= currentMonthDays; i++) {
    daysOfCurrentMonth.push(i);
  }

  return daysOfCurrentMonth;
};

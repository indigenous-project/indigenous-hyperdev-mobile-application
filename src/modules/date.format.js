// function format date: Example WEDNESDAY, Jan 30th, 2021
export const formatDate = dateString => {
  const date = new Date(dateString);
  const year = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
  const month = new Intl.DateTimeFormat('en', {
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
  const day = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);
  const weekday = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    timeZone: 'UTC',
  }).format(date);

  return `${weekday.toUpperCase()}, ${month} ${day}, ${year}`;
};

// function format date: Example  May 30th, 2021
export const formatDateByMonth = dateString => {
  const date = new Date(dateString);
  const year = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
  const month = new Intl.DateTimeFormat('en', {
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
  const day = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);
  const weekday = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    timeZone: 'UTC',
  }).format(date);

  return `${month} ${day}, ${year}`;
};

// function format date: Example Jan 30th, 2021
export const formatDateByTime = dateString => {
  const date = new Date(dateString);

  const time = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'UTC',
  }).format(date);

  return `${time}`;
};

//time duration
export const diffTime = (start, end) => {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let diff = endDate.getTime() - startDate.getTime();
  let hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  let minutes = Math.floor(diff / 1000 / 60);
  let day = 0;
  // If using time pickers with 24 hours format, add the below line get exact hours

  if (hours > 24) {
    hours = hours - 24;
    day = day + hours / 24;
  }

  let dayString = '';
  let hourString = '';
  let minuteString = '';

  if (day > 1) {
    dayString = dayString + day + ' days';
  } else if (day === 1) {
    dayString = dayString + day + ' day';
  }

  if (hours === 1) {
    hourString = hourString + hours + ' hour';
  } else if (hours > 1) {
    hourString = hourString + hours + ' hours';
  }

  if (minutes < 10 && minutes > 1) {
    minuteString = minuteString + '0' + minutes + ' mins';
  } else if (minutes > 9) {
    minuteString = minuteString + minutes + ' mins';
  }

  return `${dayString} ${hourString} ${minuteString}`;
};

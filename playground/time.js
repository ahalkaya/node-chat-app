let moment = require('moment-timezone');

// Jan 1st 1970 00:00:00 am
// timestamp 1000 miliseconds = 1 second

// let date = new Date();
// console.log(date.getMonth());

// let date = moment(); // without moment-timezone
// let date = moment().tz('Europe/Istanbul').locale('tr');
// date.add(100, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1504105175837;
let date = moment(createdAt);
console.log(date.format('h:mm a'));
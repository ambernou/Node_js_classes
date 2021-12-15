// Пример строки для запуска кода: node lesson2_task2.js mm-hh-DD-MM-YYYY
// Например, узнать время до Нового года: node lesson2_task2.js 00-00-01-01-2022

const { DateTime } = require("luxon");
const EventEmitter = require('events');
const emitter = new EventEmitter();

const [time] = process.argv.slice(2);
const [min, h, d, m, y] = time.split('-');
const minutes = +min;
const hours = +h;
const day = +d;
const month = +m;
const year = +y;
// console.log(minutes, hours, day, month, year);

const futureDateTime = DateTime.local(year, month, day, hours, minutes);
// console.log(byTheTime.toString());

let duration = futureDateTime.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds']);
// console.log(duration);

// Данные для времени из введеной строки:
let secondsToDate = Math.floor(duration.values.seconds);
let minutesToDate = duration.values.minutes;
let hoursToDate = duration.values.hours;
let daysToDate = duration.values.days;
let monthsToDate = duration.values.months;
let yearsToDate = duration.values.years;

// Можно указать произвольные данные для проверки работоспособности:
// let secondsToDate = 5;
// let minutesToDate = 0;
// let hoursToDate = 0;
// let daysToDate = 0;
// let monthsToDate = 0;
// let yearsToDate = 0;

emitter.on('timer_sec', () => {
    if (secondsToDate == 0 && minutesToDate == 0 && hoursToDate == 0 && daysToDate == 0 && monthsToDate == 0 && yearsToDate == 0) {
        emitter.off('timer_sec', () => {});
        clearInterval(timerId);
        console.log('Timer is over!');
    } else if (secondsToDate == 0) {
        secondsToDate = 59;
        emitter.emit('timer_min');
    } else {
        secondsToDate--;
    }
});

emitter.on('timer_min', () => {
    if (minutesToDate == 0 && hoursToDate == 0 && daysToDate == 0 && monthsToDate == 0 && yearsToDate == 0) {
        emitter.off('timer_min', () => {});
    } else if (minutesToDate == 0) {
        minutesToDate = 59;
        emitter.emit('timer_hour');
    }else {
        minutesToDate--;
    }
});

emitter.on('timer_hour', () => {
    if (hoursToDate == 0 && daysToDate == 0 && monthsToDate == 0 && yearsToDate == 0) {
        emitter.off('timer_hour', () => {});
    } else if (hoursToDate == 0) {
        hoursToDate = 23;
        emitter.emit('timer_day');
    } else {
        hoursToDate--;
    }
});

emitter.on('timer_day', () => {
    if (daysToDate == 0 && monthsToDate == 0 && yearsToDate == 0) {
        emitter.off('timer_day', () => {});
    } else if (daysToDate == 0) {
        daysToDate = 30;
        emitter.emit('timer_month');
    } else {
        daysToDate--;
    }
});

emitter.on('timer_month', () => {
    if (monthsToDate == 0 && yearsToDate == 0) {
        emitter.off('timer_month', () => {});
    } else if (monthsToDate == 0) {
        monthsToDate = 11;
        emitter.emit('timer_year');
    } else {
        monthsToDate--;
    }
});

emitter.on('timer_year', () => {   
        if (yearsToDate == 0) {
            emitter.off('timer_year', () => {});
        } else {
            yearsToDate--;
        }
});

let timerId = setInterval(() => {
    console.log(`${secondsToDate} s : ${minutesToDate} min : ${hoursToDate} h : ${daysToDate} d : ${monthsToDate} mo : ${yearsToDate} y`);
    emitter.emit('timer_sec');
}, 1000);
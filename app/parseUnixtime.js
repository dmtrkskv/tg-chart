export let monthLabels = ['January', 'February',
    'March', 'April', 'May',
    'June', 'July', 'August',
    'September', 'October', 'November',
    'December'];

export default function parseUnixtime(timestamp) {

    let year = Math.ceil(timestamp / 31557600) + 1969;
    let isYearLeap = defineYearLeap(year);

    let leapDays = Math.ceil((year - 1969) / 4);
    let daysSinceTheEpoch = Math.ceil(timestamp / 86400);
    let n = daysSinceTheEpoch - leapDays;
    let daysPassedInTheCurrentYear = n % 365;

    let month, day;

    let secondsInCurDay = timestamp - ((daysSinceTheEpoch - 1) * 86400);
    let hours = Math.floor(secondsInCurDay / 3600);
    if (hours === 24) {
        hours = 0;

        daysPassedInTheCurrentYear++;
        let maxPassedDays = isYearLeap ? 365 : 364;
        if (daysPassedInTheCurrentYear > maxPassedDays) {
            daysPassedInTheCurrentYear = 0;
            year++;
        }
    }

    let monthDaysTable = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    isYearLeap === true && (monthDaysTable[1] = 29);

    let count = 0;

    for (let i = 0; i < 12; i++) {
        count += monthDaysTable[i];
        if (count > daysPassedInTheCurrentYear) {
            month = i;
            day = daysPassedInTheCurrentYear + monthDaysTable[i] - count + 1;
            break;
        }
    }

    let minutes = String(Math.floor(secondsInCurDay / 60) % 60);
    minutes.length === 1 && (minutes = "0" + minutes);

    let weekday = getDay(day, month + 1, year);

    return [weekday, day, monthLabels[month], year, hours, minutes];



    function defineYearLeap(year) {
        let result;

        if (year % 4 === 0) {
            result = true;
        }

        if (year % 100 === 0) {
            result = false;
        }

        if (year % 400 === 0) {
            result = true;
        }

        return result;
    }

    function getDay(day, month, year) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        day = parseInt(day, 10); //если день двухсимвольный и <10 
        month = parseInt(month, 10); //если месяц двухсимвольный и <10 

        let a = parseInt((14 - month) / 12, 10);
        let y = year - a;
        let m = month + 12 * a - 2;
        let d = (parseInt(day + y + parseInt(y / 4, 10) - parseInt(y / 100, 10) + parseInt(y / 400, 10) + (31 * m) / 12, 10)) % 7;

        return days[d];
    }

}
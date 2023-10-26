/* eslint-disable no-console */
/* eslint-disable no-multiple-empty-lines */
/*
1.
Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:
*/

const isStringLengthValid = (string, maxLength) => maxLength >= string.length;

// Cтрока короче 20 символов
isStringLengthValid('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
isStringLengthValid('проверяемая строка', 18); // true
// Строка длиннее 10 символов
isStringLengthValid('проверяемая строка', 10); // false
isStringLengthValid('или какая-то другая строка', 30); // true

/*
2.
Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. Например:

Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы. Они не должны учитываться при проверке!
*/

const isPolindrom = (string) => {
  let backwardString = '';
  string = string.replaceAll(' ', '');

  for (let i = string.length - 1; i >= 0; i--) {
    backwardString += string[i];
  }

  return string.toLowerCase() === backwardString.toLowerCase();
};

// Строка является палиндромом
isPolindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPolindrom('ДовОд'); // true
// Это не палиндром
isPolindrom('Кекс'); // false

// Это палиндром
isPolindrom('Лёша на полке клопа нашёл '); // true

/*
3.
Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число. Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:
*/

const getAllNumbers = (string) => {
  let result = '';

  if (typeof string === 'number') {
    string = string.toString();
  }

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      result += string[i];
    }
  }

  // Если нет найденных цифр, вернем NaN
  if (result === '') {
    return NaN;
  }

  return parseInt(result, 10);
};

getAllNumbers('2023 год'); // 2023
getAllNumbers('ECMAScript 2022'); // 2022
getAllNumbers('1 кефир, 0.5 батона'); // 105
getAllNumbers('а я томат'); // NaN
getAllNumbers(2023); // 2023
getAllNumbers(-1); // 1
getAllNumbers(1.5); // 15

// 5.16. Функции возвращаются

const getHoursAndMinutesPerTime = (time) => {

  const hourInMinutes = 60;
  let timeInHours = 0;

  timeInHours = time / hourInMinutes;

  return timeInHours;
};

const isMakeAppointment = (startWork, endWork, startAppointment, appointmentTime) => {

  const startHours = startWork.split(':');
  const endHours = endWork.split(':');
  const startAppointmentHours = startAppointment.split(':');

  const connectTime = (time) => {
    let sumOfTime = 0;

    for (let i = 0; i < startHours.length; i++) {
      if (+time[i] === 30) {
        sumOfTime += 0.5; continue;
      }
      sumOfTime += +time[i];
    }

    return sumOfTime;
  };

  const startHoursLikeCount = connectTime(startHours);
  const endHoursLikeCount = connectTime(endHours);
  const startAppointmentHoursLikeCount = connectTime(startAppointmentHours);
  const hoursAndMinutesLikeCount = getHoursAndMinutesPerTime(appointmentTime);

  if (startAppointmentHoursLikeCount < startHoursLikeCount) {
    return true;
  }

  if (!((startAppointmentHoursLikeCount + hoursAndMinutesLikeCount) > endHoursLikeCount)) {
    return true;
  }

  return false;
};

isMakeAppointment('08:00', '17:30', '14:00', 90); // true
isMakeAppointment('08:0', '10:0', '8:0', 120); // true
isMakeAppointment('08:00', '14:30', '14:00', 90); // false
isMakeAppointment('14:00', '17:30', '08:0', 90); // false
isMakeAppointment('8:00', '17:30', '08:00', 900); // false

console.log(isMakeAppointment('08:00', '17:30', '14:00', 90)); // true
console.log(isMakeAppointment('08:0', '10:0', '8:0', 120)); // true
console.log(isMakeAppointment('08:00', '14:30', '14:00', 90)); // false
console.log(isMakeAppointment('14:00', '17:30', '08:0', 90)); // false
console.log(isMakeAppointment('8:00', '17:30', '08:00', 900)); // false

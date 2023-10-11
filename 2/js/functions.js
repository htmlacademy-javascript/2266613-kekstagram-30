/*
1.
Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:
*/

const getStringLength = (string, maxLength) => string.length <= maxLength;

// Cтрока короче 20 символов
getStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
getStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
getStringLength('проверяемая строка', 10); // false
getStringLength('или какая-то другая строка', 30); // true

/*
2.
Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. Например:

Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы. Они не должны учитываться при проверке!
*/

function isPolindrom(string) {
  let backwardString = '';
  string = string.replaceAll(' ', '');

  for (let i = string.length - 1; i >= 0; i--) {
    backwardString += string[i];
  }

  return string.toLowerCase() === backwardString.toLowerCase();
}

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

function getAllNumbers(string) {
  let result = '';

  if (typeof string === 'number') {
    string = string.toString();
  }

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  // Если нет найденных цифр, вернем NaN
  if (result === '') {
    return NaN;
  }

  return result;
}

getAllNumbers('2023 год'); // 2023
getAllNumbers('ECMAScript 2022'); // 2022
getAllNumbers('1 кефир, 0.5 батона'); // 105
getAllNumbers('а я томат'); // NaN
getAllNumbers(2023); // 2023
getAllNumbers(-1); // 1
getAllNumbers(1.5); // 15

/**
 * Настройки:
 * api - шаблон адреса с базой
 * controlSum - контрольная сумма, задаваемая пользователем
 * Arr - исходный массив чисел. Изначально пустой. Данные получает из базы методом init() объекта activavitionFunctions
 * resArr - временный массив для проверки соответствия и уникальности пар чисел
 */
const settings = {
	api: "data/",
	controlSum: +prompt(`Задайте параметр - контрольная сумма двух чисел.`),
	Arr: [],
	resArr: [],
};

/**
 * Стартовые функции:
 * init() - получает данные из массива исходных чисел ( файл data/data.js).
 * startFunction() - запускает методы обработки чисел для нахождения пар и методов вывода результирующей информации.
 * chekSumOfNumbers() - перебирает числа из массива и отдает их методу chekResNumbersInResultMain() на проверку уникальности.
 * chekResNumbersInResultMain() - получает числа на проверку, создавая веременный массив с паров чисел для проверки уникальности,
 * с помощью метода chekResNumbersInResultStaff(firstNum, secondNum).
 * chekResNumbersInResultStaff(firstNum, secondNum) - непосредственная проверка чисел на уникальность.
 * Параметры firstNum, secondNum - Пары чисел из временного массива метода chekResNumbersInResultMain() для проверки уникальности.
 */
const activavitionFunctions = {
	init() {
		fetch(`${settings.api}data.json`)
			.then((result) => result.json())
			.then((data) => {
				settings.Arr = [...data];
				this.startFunction();
			})
			.catch((err) => document.write(err));
	},
	startFunction() {
		this.chekSumOfNumbers();
		messageFunctions.startMessage();
	},
	chekSumOfNumbers() {
		for (let i = 0; i < settings.Arr.length; i++) {
			for (let j = 1; j < settings.Arr.length; j++) {
				let resNum = settings.Arr[i] + settings.Arr[j];
				if (resNum == settings.controlSum) {
					this.chekResNumbersInResultMain(settings.Arr[i], settings.Arr[j]);
				}
			}
		}
	},
	chekResNumbersInResultMain(firstNum, secondNum) {
		const tempResArr = [];
		tempResArr.push(firstNum, secondNum);
		chekRes = this.chekResNumbersInResultStaff(firstNum, secondNum);
		if (chekRes == true) {
			settings.resArr.push(tempResArr);
			return settings.resArr;
		}
	},
	chekResNumbersInResultStaff(firstNum, secondNum) {
		for (let i = 0; i < settings.resArr.length; i++) {
			const tempNumber = settings.resArr[i];
			if (tempNumber != undefined) {
				if (tempNumber[0] == firstNum || tempNumber[0] == secondNum) {
					if (tempNumber[1] == firstNum || tempNumber[1] == secondNum) {
						return false;
					}
				}
			}
		}
		return true;
	},
};

/**
 * Функции вывода результатов:
 * startMessage() - в случае наличия хотя бы одной пары выдает текст задачи либо предупреждает, что пар чисел не найдено.
 * resoult(firstNum, secondNum) - выводит на экран найденные пары чисел.
 * finalMessage() - сообщает о количестве уникальных пар.
 */
const messageFunctions = {
	startMessage() {
		if (settings.resArr.length != 0) {
			document.write(`Задан массив чисел <b>[${settings.Arr}]</b>.</br>
			Необходимо найти уникальные пары чисел, в сумме дающих число <b>${settings.controlSum}</b>.</br>
----------------------------------------------------------------</br>`);
			this.finalMessage();
		} else {
			document.write(
				`Не найдено подходящих пар чисел, в сумме дающих <b>${settings.controlSum}</b>.`
			);
		}
	},
	finalMessage() {
		for (let i = 0; i < settings.resArr.length; i++) {
			const tempNumber = settings.resArr[i];
			let firstNum = tempNumber[0];
			let secondNum = tempNumber[1];
			this.resoult(firstNum, secondNum);
		}
		document.write(
			`----------------------------------------------------------------</br>
		Найдено <b>${settings.resArr.length}</b> уникальных пар чисел, дающих в сумме <b>${settings.controlSum}</b>.</br>`
		);
	},
	resoult(firstNum, secondNum) {
		document.write(`*[${firstNum}, ${secondNum}]</br>`);
	},
};

/**
 * запуск приложения.
 */
activavitionFunctions.init();

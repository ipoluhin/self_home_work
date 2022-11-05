{
	/**
	 * Настройки:
	 * api - шаблон адреса с базой.
	 * controlSum - контрольная сумма, получаемая от пользователя.
	 * Arr - исходный массив чисел. Изначально пустой. Данные получает из базы методом init() объекта activationFunctions.
	 * errText - текст ошибки в случае проблем с доступом к исходному массиву чисел.
	 * resArr - временный массив для проверки соответствия и уникальности пар чисел.
	 */
	const settings = {
		api: "./data/",
		controlSum: undefined,
		Arr: [],
		errText: `Не найден массив с числами. Проверьте путь к массиву.`,
		resArr: [],
	};

	/**
	 * Стартовые функции:
	 * init() - получает данные из массива исходных чисел ( файл data/data.js).
	 * setControlSum - в случае удачной попытки получения исходного массива с числами,
	 * просит пользователя задать контрольную сумму controlSum.
	 * startFunction() - запускает методы обработки чисел для нахождения пар и методов вывода результирующей информации.
	 * chekSumOfNumbers() - перебирает числа из массива и отдает их методу chekResNumbersInResultMain() на проверку уникальности.
	 * chekResNumbersInResultMain() - получает числа на проверку, создавая веременный массив с паров чисел для проверки уникальности,
	 * с помощью метода chekResNumbersInResultStaff(firstNum, secondNum).
	 * chekResNumbersInResultStaff(firstNum, secondNum) - непосредственная проверка чисел на уникальность.
	 * Параметры firstNum, secondNum - Пары чисел из временного массива метода chekResNumbersInResultMain() для проверки уникальности.
	 */
	const activationFunctions = {
		init() {
			fetch(`${settings.api}data.json`)
				.then((result) => result.json())
				.then((data) => {
					settings.Arr = [...data];
					this.setControlSum();
					this.startFunction();
				})
				.catch(() => document.write(settings.errText));
		},
		setControlSum() {
			settings.controlSum = +prompt(`Задайте параметр - контрольная сумма двух чисел.`);
		},
		startFunction() {
			this.chekSumOfNumbers();
			messageFunctions.startMessage();
		},
		chekSumOfNumbers() {
			for (let i = 0; i < settings.Arr.length; i++) {
				for (let j = 0; j < settings.Arr.length; j++) {
					if (j != i) {
						let resNum = settings.Arr[i] + settings.Arr[j];
						if (resNum == settings.controlSum) {
							this.chekResNumbersInResultMain(settings.Arr[i], settings.Arr[j]);
						}
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
	 * preparingResultNumbersToPrinting() - подготавливает найденные пары чисел к печати.
	 * printingResoultNumbers(firstNum, secondNum) - выводит на экран найденные пары чисел.
	 * finalMessage() - сообщает о количестве уникальных пар.
	 */
	const messageFunctions = {
		startMessage() {
			if (settings.resArr.length != 0) {
				document.write(`Задан массив чисел: <b>[${settings.Arr}]</b>.</br>
			Необходимо найти уникальные пары чисел, в сумме дающих число <b>${settings.controlSum}</b>.</br>
----------------------------------------------------------------</br>
Найденные пары:</br>`);
				this.finalMessage();
			} else {
				document.write(
					`В масиве заданных чисел <b>[${settings.Arr}]</b> не найдено подходящих пар чисел, </br>в сумме дающих <b>${settings.controlSum}</b>.`
				);
			}
		},
		preparingResultNumbersToPrinting() {
			for (let i = 0; i < settings.resArr.length; i++) {
				const tempNumber = settings.resArr[i];
				let firstNum = tempNumber[0];
				let secondNum = tempNumber[1];
				this.printingResoultNumbers(firstNum, secondNum);
			}
		},
		printingResoultNumbers(firstNum, secondNum) {
			document.write(`*[${firstNum}, ${secondNum}]</br>`);
		},
		finalMessage() {
			this.preparingResultNumbersToPrinting();
			document.write(
				`----------------------------------------------------------------</br>
		Найдено <b>${settings.resArr.length}</b> уникальных пар чисел, дающих в сумме <b>${settings.controlSum}</b>.</br>`
			);
		},
	};

	/**
	 * запуск приложения.
	 */
	activationFunctions.init();
}

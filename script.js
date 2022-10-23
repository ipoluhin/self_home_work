const settings = {
	Arr: [-1, 1, 4, -6, 2, 6, 8, -7, 17, 3, 7, 15, 10],
	controlSum: +prompt(`Задайте параметр - контрольная сумма двух чисел.`),
	resArr: [],
};

const activavitionFunctions = {
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

const messageFunctions = {
	startMessage() {
		if (settings.resArr.length != 0) {
			document.write(`Необходимо найти 
		в массиве чисел [-1, 1, 4, -6, 2, 6, 8, -7, 17, 3, 7, 15, 10]</br> 
уникальные пары чисел, в сумме дающих число ${settings.controlSum}.</br>
----------------------------------------------------------------</br>`);
			this.finalMessage();
		} else {
			document.write(
				`Не найдено подходящих пар чисел, в сумме дающих ${settings.controlSum}.`
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
		Найдено ${settings.resArr.length} уникальных пары чисел, дающих в сумме ${settings.controlSum}.</br>`
		);
	},
	resoult(firstNum, secondNum) {
		document.write(`*[${firstNum}, ${secondNum}]</br>`);
	},
};

activavitionFunctions.startFunction();

/*let slogan = "В ожидании новых задач...";
let i = 0;
function writeWait() {
	symbol = slogan[i];
	setTimeout(() => {
		document.write(slogan + "</br>");
	}, i * 1000);
}
for (i; i <= slogan.length; i++) {
	writeWait();
}*/

const settings = {
	Arr: [-1, 1, 4, -6, 2, 6, 8, -7, 17, 3, 7, 15, 10],
	k: +prompt(`Задайте параметр - контрольная сумма двух чисел.`),
	resArr: [],
};

const activavitionFunction = {
	startFunction() {
		this.chekSumOfNumbers();
		messageFunction.startMessage(settings.k);
	},
	chekSumOfNumbers() {
		for (let n = 0; n < settings.Arr.length; n++) {
			for (let m = 1; m < settings.Arr.length; m++) {
				let resNum = settings.Arr[n] + settings.Arr[m];
				if (resNum == settings.k) {
					this.chekResNumbersInResultMain(settings.Arr[n], settings.Arr[m]);
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
		for (let t = 0; t < settings.resArr.length; t++) {
			const tempNumber = settings.resArr[t];
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

const messageFunction = {
	startMessage(k) {
		let l = settings.resArr.length;
		if (l != 0) {
			document.write(`Необходимо найти 
		в массиве чисел [-1, 1, 4, -6, 2, 6, 8, -7, 17, 3, 7, 15, 10]</br> 
уникальные пары чисел, в сумме дающих число ${k}.</br>
----------------------------------------------------------------</br>`);
			this.finalMessage(l, k);
		} else {
			document.write(`Не найдено подходящих пар чисел, в сумме дающих ${k}.`);
		}
	},
	finalMessage(l, k) {
		for (let i = 0; i < l; i++) {
			const tempNumber = settings.resArr[i];
			let firstNum = tempNumber[0];
			let secondNum = tempNumber[1];
			this.resoult(firstNum, secondNum);
		}
		if (l != 0) {
			document.write(
				`----------------------------------------------------------------</br>
		Найдено ${l} уникальных пар(-ы) чисел, дающих в сумме ${k}.</br>`
			);
		}
	},
	resoult(firstNum, secondNum) {
		document.write("*[" + firstNum + ", " + secondNum + "]</br>");
	},
};

activavitionFunction.startFunction(settings.k);

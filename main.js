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

const Arr = [-1, 1, 4, -6, 2, 6, 8, -7, 17, 3, 7, 15, 10];
let k = 9;
const resArr = [];

document.write(`Необходимо найти в массиве чисел уникальные пары чисел, в сумме дающих число ${k}.</br>
----------------------------------------------------------------</br>`);

chekSumOfNumbers();

function chekSumOfNumbers() {
	for (let n = 0; n < Arr.length; n++) {
		for (let m = 1; m < Arr.length; m++) {
			let resNum = Arr[n] + Arr[m];
			if (resNum == k) {
				chekResNumbersInResultMain(Arr[n], Arr[m]);
			}
		}
	}
	finalMessage(resArr.length, k);
}

function chekResNumbersInResultMain(firstNum, secondNum) {
	const tempResArr = [];
	tempResArr.push(firstNum, secondNum);
	chekRes = chekResNumbersInResultStaff(firstNum, secondNum);
	if (chekRes == true) {
		resArr.push(tempResArr);
		document.write("*[" + firstNum + ", " + secondNum + "]</br>");
		return resArr;
	}
}

function chekResNumbersInResultStaff(firstNum, secondNum) {
	for (let t = 0; t < resArr.length; t++) {
		const tempNumber = resArr[t];
		if (tempNumber != undefined) {
			if (tempNumber[0] == firstNum || tempNumber[0] == secondNum) {
				if (tempNumber[1] == firstNum || tempNumber[1] == secondNum) {
					return false;
				}
			}
		}
	}
	return true;
}

function finalMessage(l, k) {
	document.write(
		`----------------------------------------------------------------</br>
		Найдено ${l} пар(-ы) чисел, дающих в сумме ${k}.</br>`
	);
}

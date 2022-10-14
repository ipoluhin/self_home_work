let slogan = "В ожидании новых задач...";
let i = 1;
for (let symbol of slogan) {
	setTimeout(document.write(symbol), i * 1000);
	i = i + 1;
}

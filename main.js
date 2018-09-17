let week;
const WEEKLABEL = document.querySelector(".table--week-nr__current");
	WEEKLABEL.addEventListener("change", () => {
	week = WEEKLABEL.value;
	getWeekData(week);
})

window.addEventListener("load", () => {
	getWeekNummer();
	getWeekData();
})

function getWeekNummer() {
	fetch("./function.php?f=weekNummer")
		.then(response => {
			return response.text();
		})
		.then(responseText => {
			document.querySelector(".table--week-nr__current").value = responseText;
		})
		.catch(error => {
			console.error(error);
		});
}
function getWeekData(week) {
	fetch("./function.php?f=weekData&week=" + week)
		.then(response => {
			return response.text();
		})
		.then(responseText => {
			document.querySelector(".table__form--week-items").innerHTML = responseText;
		})
		.catch(error => {
			console.error(error);
		});
}
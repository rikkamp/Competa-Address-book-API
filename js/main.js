//*****make vars*****\\

//*****listeners*****\\

//laden\\
window.addEventListener("load", () => {
	laden()
})
//check op clicks in een div\\
document.querySelector(".nav__footer--users").addEventListener("click", () => {
	changeToUsers();
})

//*****functions*****\\
//changeDisplay\\
const changeToUsers = () => {
	let details = document.querySelector(".details__container");
	details.setAttribute("style", "left:-100%");
	let navitem = document.querySelector(".nav__footer--users");
	navitem.setAttribute("style", "opacity: 1");
	let person = document.querySelector(".nav__footer--user");
	person.setAttribute("style", "opacity: 0.4");
	let element = document.querySelector(".contacts__container");
	element.setAttribute("style", "display: unset;");
	document.querySelector(".details__container").innerHTML = '' ;

}
//laden\\
const laden = () => {
	//bestand binnen halen
	fetch("https://randomuser.me/api/?results=50&nat=NL&inc=name,cell,email,picture&lego")
	//als hij gefetcht is maak het een json element
		.then(response => {
			return response.json();
			//console.log (response);
		})
		.then(responseJson => {
			//open de array
			//let obj = JSON.parse(responseJson);

			responseJson.results.sort((a, b) => {
				if(a.name.first < b.name.first) return -1;
				if(a.name.first > b.name.first) return 1;
				return 0;
			});
			console.log (responseJson);
			
			// zorg ervoor dat je bij de goede data uitkomt
			const people = responseJson['results'];
			for (let i = 0; people.length > i; i++)
			{
				//alles heeft hier een data-id voor de click listener\\
				document.querySelector(".contacts__box").innerHTML += `
				<div class="contacts__info contact" data-id='${[i]}'>
					<div class="contact__item--imgbox" data-id='${[i]}'>
						<img data-id='${[i]}' src='${people[i].picture.medium}' class="contact__item--picture"></div>
					<div class="contact__info-box" data-id='${[i]}'>
						<div class="contact__item contact__item--bold" data-id='${[i]}'>${people[i].name.first} ${people[i].name.last} </div>
						<div class="contact__item contact__item--grey" data-id='${[i]}'>${people[i].cell}</div>
					</div>
				</div>
				`;
				//console.log(people[i].name);
			}
			document.querySelector('.contacts__box').addEventListener('click', (event) => {
				console.log(event.target.dataset.id);
				details(event.target.dataset.id);
				
			})
			const details = (id) => {
			let details = document.querySelector(".details__container");
			details.setAttribute("style", "left:0%");
			let navitem = document.querySelector(".nav__footer--users");
			navitem.setAttribute("style", "opacity: 0.4");
			let person = document.querySelector(".nav__footer--user");
			person.setAttribute("style", "opacity: 1");
			let element = document.querySelector(".contacts__container");
			element.setAttribute("style", "display: none;");
			document.querySelector(".details__container").innerHTML += `
				<header class="details__thumbnail">
				<div class="details__thumbnail--box">
				<ul class="details__menu">
					<li class="details__menu--item"><img class="details__menu--img"src="img/icons/star.svg"></li>
					<li class="details__menu--item"><img class="details__menu--img"src="img/icons/envelope.svg"></li>
					<li class="details__menu--item"><img class="details__menu--img"src="img/icons/phone.svg"></li>
					<li class="details__menu--item"><img class="details__menu--img"src="img/icons/user.svg"></li>
				</ul>
				<img class="details__thumbnail--image" src='${people[id].picture.thumbnail}'>
				<span class="details__thumbnail--back">

				</span>
				
				</div>
				<div class="details__name-work">
					<span class="details__name"><h2 class="details__name--title">${people[id].name.first} ${people[id].name.last}</h2></span>
					<span class="details__work">Designer at Competa</span>
				</div>
			</header>
			<div class="details__info">
				<div class="details__phone-box">
					<span class="details__phone--icon"><img src="img/icons/phone.svg" class="details__phone--image"></span>
					<h2 class="details__phone">${people[id].cell}</h2>
					<span class="details__sms--icon">
						<img src="img/icons/envelope.svg" class="details__sms--image">
					</span>
				</div>
				<div class="details__phone-box">
					<span class="details__phone--icon"><img src="img/icons/phone.svg" class="details__phone--image"></span>
					<h2 class="details__phone">${people[id].cell}</h2>
					<span class="details__sms--icon">
						<img src="img/icons/envelope.svg" class="details__sms--image">
					</span>
				</div>
				<hr>
				<div class="details__email-box">
					<span class="details__email--icon">
						<img src="img/icons/envelope.svg" class="details__email--image">
					</span>
						<div class="details__email--items">
							<div class="details__email--item">
								<h2 class="details__email">	${people[id].email}</h2>
							</div>
							<div class="details__email--item">
								<h2 class="details__email">	${people[id].email}</h2>
							</div>
						</div>
					</div>
			</div>`
			}
		})
		.catch(error => {
			console.error(error);
		});
}

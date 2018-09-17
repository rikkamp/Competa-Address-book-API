//*****make vars*****\\

//*****listeners*****\\

//laden\\
window.addEventListener("load", () => {
	laden()
})
//check op clicks in een div\\


//*****functions*****\\

//laden\\
const laden = () => {
	//bestand binnen halen
	fetch("https://randomuser.me/api/?results=50&nat=NL&inc=name,cell,email,picture")
	//als hij gefetcht is maak het een json element
		.then(response => {
			return response.json();
			//console.log (response);
		})
		.then(responseJson => {
			//open de array
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
			let element = document.querySelector(".contacts__container");
			element.setAttribute("style", "display: none;");
			document.querySelector(".details__container").innerHTML += `
				<header class="details__thumbnail">
				<div class="details__thumbnail--box">
				<img class="details__thumbnail--image" src='${people[id].picture.thumbnail}'>
				<span class="details__thumbnail--back">

				</span>
				<ul class="details__menu">
					<li class="details__menu--item"></li>
					<li class="details__menu--item"></li>
					<li class="details__menu--item"></li>
					<li class="details__menu--item"></li>
				</ul>
				</div>
				<div class="details__name-work">
					<span class="details__name"><h2 class="details__name--title">${people[id].name.first} ${people[id].name.last}</h2></span>
					<span class="details__work">Designer at Competa</span>
				</div>
			</header>
			<div class="details__info">
				<div class="details__phone-box">
					<span class="details__phone--icon"><img class="details__phone--image"></span>
					<h2 class="details__phone">${people[id].cell}</h2>
					<span class="details__sms--icon">
						<img class="details__sms--image">
					</span>
				</div>
				<div class="details__phone-box">
					<span class="details__phone--icon"><img class="details__phone--image"></span>
					<h2 class="details__phone">${people[id].cell}</h2>
					<span class="details__sms--icon">
						<img class="details__sms--image">
					</span>
				</div>
				<div class="details__email-box">
				<span class="details__email--icon">
					<img src="" class="details__email--image">
				</span>
					<div class="details__email--item">
						${people[id].email}
					</div>
					<div class="details__email--item">
						${people[id].email}
					</div>
				</div>
			</div>`
			}
		})
		.catch(error => {
			console.error(error);
		});
}

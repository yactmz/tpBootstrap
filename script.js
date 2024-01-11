const divEnsea = document.querySelector(".div-ensea")

const listGames = [
	{
		title: "GTA 5",
		year: 2013,
		imageUrl:
			"https://store-images.s-microsoft.com/image/apps.3117.14492969036550054.5a1d40f5-fe0d-427a-bd14-9a9ed15a423c.f601beb2-973f-47de-ad1a-ccec296ee4d1?q=90&w=480&h=270",
	},
	{
		title: "Tekken",
		year: 2023,
		imageUrl:
			"https://gpstatic.com/acache/59/42/2/fr/t620x300-8d41fbe7f4924d00c625d69794d71b34.jpg",
	},
	{
		title: "Mario kart",
		year: 2000,
		imageUrl:
			"https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/7a5e-mario_kart_8_deluxe_booster_course_pass.jpeg",
	},
	{
		title: "ultimate alliance",
		year: 2004,
		imageUrl:
			"https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/23886.jpeg",
	},
]

listGames.forEach((game, index) => {
	divEnsea.innerHTML += `
                <div class="col">
                    <article class="card shadow-sm">
                            <img src="${game.imageUrl}" class="card-img-top" alt="...">
                            <div class="card-body">
                               <h5 class="card-title">${game.title}</h5>
                               <p  class="card-text">Year: ${game.year}</p>

                               <div class="btn-group">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-dark view"
                                        data-bs-toggle="modal" data-bs-target="#editModal"
                                        data-index="${index}"
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-dark edit"
                                        data-bs-toggle="modal" data-bs-target="#editModal"

                                    >
                                        Edit
                                    </button>
                                </div>
                            
                            </div>
                    </article>
                </div>`
})

// global vars modal perties
const modalTitle = document.querySelector("#exampleModalLabel")
const modalBody = document.querySelector(".modal-body")
const modalFooter = document.querySelector(".modal-footer")

// ratraper le buttons avec une classe "view"
const btnViewArray = document.querySelectorAll(".view")

// ratraper le buttons avec une classe "edit"
const btnEditArray = document.querySelectorAll(".edit")

// function pour lancer chaque fois que on click sur le btn "view"
const catchView = (i) => {
	modalTitle.textContent = listGames[i].title
	modalBody.innerHTML = `<img src="${listGames[i].imageUrl}" class="img-fluid"  />`
	modalBody.innerHTML += `<p class="mt-2"> Year: ${listGames[i].year} </p>`
	modalFooter.innerHTML = `
        <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
        >
            Close
        </button>
    `
}

// function pour lancer chaque fois que on click sur le btn "edit"
const catchEdit = (i) => {
	modalTitle.textContent = "Edit Mode"
	modalBody.innerHTML = `
        <form>
            <div class="mb-3">
                <label for="title" class="form-label">Edit Title</label>
                <input type="text" class="form-control" id="title" aria-describedby="title" value="${listGames[i].title}" >
                <div id="emailHelp" class="d-none form-text">We'll never share your email with anyone else.</div>
            </div>

             <div class="mb-3">
                <label for="year" class="form-label">Edit Year</label>
                <input type="number" class="form-control" id="year" aria-describedby="year" value="${listGames[i].year}" >
                <div id="emailHelp" class="d-none form-text">We'll never share your email with anyone else.</div>
            </div>

             <div class="mb-3">
                <label for="imageUrl" class="form-label">Edit Image Url</label>
                <input type="text" class="form-control" id="imageUrl" aria-describedby="year" value="${listGames[i].imageUrl}" >
                <img src="${listGames[i].imageUrl}" class="img-thumbnail w-50 mt-2" />
                <div id="emailHelp" class="d-none form-text">We'll never share your email with anyone else.</div>
            </div>
    `
	modalFooter.innerHTML = `
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="submit" class="btn btn-primary submit" data-bs-dismiss="modal">Save changes</button>
        </form>

    `

	console.log(" clicked edit btn " + i)
}
// rajouter un ecouter de evenment 'click' sur le button view
btnViewArray.forEach((btn, index) => {
	btn.addEventListener("click", () => catchView(index))
})

// rajouter un ecouter de evenment 'click' sur le button edit
btnEditArray.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		catchEdit(index)
		const saveBtn = document.querySelector(".submit")
		saveBtn.addEventListener("click", () => {
			const newTitle = document.querySelector("form").title.value
			const newYear = document.querySelector("form").year.value
			const newImageUrl = document.querySelector("form").imageUrl.value

			/* form validation  */
			if (newTitle === "" || newYear === "" || newImageUrl === "") {
				alert("no empty !!!")
				return
			}
			/* bizarre characters  */
			const regex = /^[a-zA-Z0-9/.:-_ 'éùçà(),-=?&]+$/

			if (
				!regex.test(newTitle) ||
				!regex.test(newYear) ||
				!regex.test(newImageUrl)
			) {
				alert("pas de truc bizzare!")
				return
			}
			/*  save changes  */
			listGames[index].title = newTitle
			listGames[index].year = newYear
			listGames[index].imageUrl = newImageUrl
			document.querySelectorAll(".card-title")[index].innerHTML = newTitle
			document.querySelectorAll(".card-text")[
				index
			].innerHTML = `Year: ${newYear}`

			document.querySelectorAll(".card-img-top")[index].src = newImageUrl
		})
	})
})

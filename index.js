window.onhashchange = (e) => {
	let loadFile = window.location.hash.substring(1) == "" ? "bodyindex" : window.location.hash.substring(1)
	let tag = `cc-${loadFile}`
	if (customElements.get(tag) === undefined) {
		import(`./${loadFile}.mjs`).then((module) => {
			customElements.define(tag, module.default)
			if (e !== undefined) {
				document.querySelectorAll("body *").forEach((i) => {
					i.style.display = "none"
				})
			}
			document.body.appendChild(document.createElement(tag))
		})
	} else {
		document.querySelectorAll("body *").forEach((i) => {
			i.style.display = "none"
		})
		let showNewElement = e.newURL.split("#")[1]
		document.querySelector(`cc-${showNewElement}`).style.display = ""
	}
}

window.onhashchange()

// navigator.serviceWorker
// 	.register("./sw.js", { scope: "./" })
// 	.then(function (reg) {
// 		// registration worked
// 		console.log("Registration succeeded. Scope is " + reg.scope)
// 	})
// 	.catch(function (error) {
// 		// registration failed
// 		console.log("Registration failed with " + error)
// 	})

function assss() {
	const decoder = new TextDecoder("utf-8")
	fetch("bodyindex", {
		method: "GET",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
	}).then((r) => {
		r.body
			.getReader()
			.read()
			.then(({ value, done }) => {
				if (r.status === 500) {
					return Promise.reject(decoder.decode(value))
				}

				console.log(decoder.decode(value))
			})
			.catch((e) => {
				console.log("Erro inesperado: ", e)
			})
	})

	// });
}

export default class Componente extends HTMLElement {
	constructor() {
		super()

		function handleErrors(response) {
			if (!response.ok) {
				throw Error(response.statusText)
			}
			return response.blob()
		}
		fetch("./jackinthebox_comp.js")
			.then(handleErrors)
			.then((response) => {
				import(URL.createObjectURL(response))
			})
			.catch((error) => console.log(error))

		this.attachShadow({ mode: "closed" }).innerHTML = `
      
       <style>
         :host body{
            text-align:center;
            }

            :host {
               display: inline-block;
               border: 1px solid #000000;
               padding: 20px;
               text-align:center;

             }
       </style>
       <jack-in-the-box>Boomshakalaka!</jack-in-the-box>
<jack-in-the-box>.....zzzz.....zzzz....</jack-in-the-box>
<jack-in-the-box>Hello what's up world</jack-in-the-box>
<jack-in-the-box>Because you dont know what's inside shadow dom, do you?... then *spriiiing pow!*</jack-in-the-box>
       
       `
	}
}

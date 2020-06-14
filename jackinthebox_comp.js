customElements.define(
	"jack-in-the-box",
	class extends HTMLElement {
		constructor() {
			super()
			const root = this.attachShadow({ mode: "open" })

			root.innerHTML = `   
         <span id="container">
         <div id="jack">🤡<br>💥<br>\💥/</div>
         <svg width="50px" height="50px">
             <circle cx="25" cy="25" r="20" stroke-width="4" stroke="yellow" fill="dodgerblue"/>
             <circle cx="25" cy="25" r="10" stroke-width="4" stroke="yellow" fill="dodgerblue"/>
         </svg>
         <style>
             svg{
             background: dodgerblue; 
             background-image: linear-gradient(top, dodgerblue, blue);
             background-image: linear-gradient(to bottom, dodgerblue, blue);
             border-radius: 10px;
             }
             #jack{
                 visibility:hidden;
                 width:50px;
                 font-size:25px;
             }
             #container:hover>svg{
                 background:turquoise;
                 outline:2px solid yellow;
             }
             #container:hover>#jack{
                 visibility:visible;
             }
             #container>*{
                 text-align:center;
             }
             #container{
                 display:inline-block;
             }
         </style>
         </span>`
			this.addEventListener("click", this.handleClick.bind(this))
		}
		handleClick() {
			alert(this.textContent)
		}
	},
)

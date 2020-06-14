let count = 0
let create = {
	menos: [
		"button",
		"-",
		(created) => {
			created.onclick = (e) => {
				create.result.innerHTML = --count
			}
		},
	],
	result: ["span", "0", (created) => {}],
	mais: [
		"button",
		"+",
		(created) => {
			created.onclick = (e) => {
				create.result.innerHTML = ++count
			}
		},
	],
}
export default class Componente extends HTMLElement {
	constructor() {
		super()
		const style = `
      <style>
    * {
      font-size: 200%;
    }

    span {
      width: 4rem;
      display: inline-block;
      text-align: center;
    }

    button {
      width: 64px;
      height: 64px;
      border: none;
      border-radius: 10px;
      background-color: seagreen;
      color: white;
    }
    </style>
  `
		this.attachShadow({ mode: "open" })
		this.shadowRoot.innerHTML = style

		const it = (() => {
			const _it = (target = (_) => _) =>
				new Proxy(target, {
					apply(target, ctx, args) {
						return _it((_) => target(_)(...args))
					},
					get(target, key) {
						if (key == "end") {
							return target
						}
						return _it((_) => target(_)[key])
					},
				})
			return _it()
		})()

		Object.getOwnPropertyNames(create).forEach((i) => {
			let obj = document.createElement(create[i][0])
			obj.innerHTML = create[i][1]
			obj.id = i
			if (create[i].length == 3) create[i][2](obj)
			this.shadowRoot.appendChild(obj)
			create[i] = obj
		})
		it.log("Hello, world!").end(console)
	}
}

export default class BodyIndex extends HTMLElement {
    constructor() {
        super();
        // attach a shadow allowing for accessibility from outside
        let shadow = this.attachShadow({ mode: 'open' });
        console.log('lad ad')
        shadow.innerHTML = `
        <a href='#a'>aqui tem um link  </a>
        <div>body aqui vai o bdy troquei a descrição ainda não entendo a mensagem</div>`


    }


}
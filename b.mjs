export default class A extends HTMLElement {
    constructor() {
        super();
        // attach a shadow allowing for accessibility from outside
        let shadow = this.attachShadow({ mode: 'open' });
        console.log('lad ad')
        shadow.innerHTML = '<div>aqui é a versão com b</div>'
    }


}
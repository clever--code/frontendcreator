export default class A extends HTMLElement {
    constructor() {
        super();
        // attach a shadow allowing for accessibility from outside
        this.attachShadow({ mode: 'open' }).innerHTML = '<div>Okay final mente esta funcionando será :? é o valor de a</div><span>troqui dscri</span>'




        function tag(strings, ...values) {
            console.log({ strings, values });
            console.table({ strings, values });
            console.dir({ strings, values });
            return true;
        }
        const who = 'world';

        tag `hello ${who}`;


        function tag2(arg) {
            console.log(arg)
        }

        tag2 `aloha`


    }


}
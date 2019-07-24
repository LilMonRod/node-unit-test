const RouterComponent = (function(config) {
    class RouterComponent extends HTMLElement {
        constructor () {
            super();

            // shadow dom
            this.attachShadow({mode: 'open'});
            // this.shadowRoot.appendChild(template.content.cloneNode(true));
            // this.shadowImage = this.shadowRoot.getElementById('image');

            this.template = new Template(config);
        }

        /**
         * Everytime element connects to the dom
         */
        connectedCallback () {
            console.log('connectedCallback');
            this.shadowRoot.appendChild(this.template.render());
        }

        disconnectedCallback () {
        }

        /**
         * Every time an element att changes
         * @param name
         * @param oldVal
         * @param newVal
         */
        attributeChangedCallback (name, oldVal, newVal) {
            this[name] = newVal;
        }
    };
})({
    templateURL: 'app/router/router.template.html',
    styleURL: 'app/router/router.css',
});
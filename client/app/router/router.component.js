(function(config) {
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
            this.template.render()
                .then(template => this.shadowRoot.appendChild(template));
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

    const register = () => customElements.define(config.component, RouterComponent);
    window.WebComponents ? window.WebComponents.waitFor(register) : register();
})({
    component: 'app-router',
    templateURL: 'app/router/router.template.html',
    styleURL: 'app/router/router.css',
});
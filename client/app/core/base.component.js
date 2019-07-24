class BaseComponent extends HTMLElement {
    get attrs () {
        let attrs = {};
        for(let i = 0; i < this.attributes.length; i++) {
            attrs[this.attributes[i].name] = this.attributes[i].value;
        }
        return attrs;
    }

    constructor (config) {
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
        console.log('connectedCallback', this.attributes, this.attrs);
        this.template.render(this.attrs)
            .then(template => this.shadowRoot.appendChild(template));
    }

    disconnectedCallback () {}

    /**
     * Every time an element att changes
     * @param name
     * @param oldVal
     * @param newVal
     */
    attributeChangedCallback (name, oldVal, newVal) {
        console.log('attributeChangedCallback', name, newVal);
        this[name] = newVal;
    }
};

const RegisterComponent = (name, component) => {
    const register = () => customElements.define(name, component);
    window.WebComponents ? window.WebComponents.waitFor(register) : register();
};
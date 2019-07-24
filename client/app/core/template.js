const Template = (function(){
    return class Template {
        constructor({template = '', templateURL = null}){
            if(!template && !templateURL)
                throw new Error(`Invalid template config, required template string or templateURL`);

            this.template = template;
            this.templateURL = templateURL;
            if(templateURL) this.fetch();
        }

        fetch () {
            if(this.template) return Promise.resolve(this.template);

            return fetch(this.templateURL)
                .then(response => response.text())
                .then(template => this.template = template);
        }

        async render (data = {}) {
            await this.fetch();
            let tag = document.createElement('template');
            tag.innerHTML = this.template;

            return tag.content.cloneNode(true);
        }

        replace (key, value) {
            this.template.replace(`{{${key}}`, value);
        }
    }
})();
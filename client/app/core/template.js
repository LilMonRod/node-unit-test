const Template = (function(){
    return class Template {
        constructor({template = '', templateURL = null, style = '', styleURL = ''}){
            if(!template && !templateURL)
                throw new Error(`Invalid template config, required template string or templateURL`);

            this.template = template;
            this.templateURL = templateURL;
            this.style = style;
            this.styleURL = styleURL;

            if(templateURL) this.fetchUrl();
            if(this.styleURL) this.fetchStyle()
        }

        fetchUrl () {
            if(this.template) return Promise.resolve(this.template);

            return fetch(this.templateURL)
                .then(response => response.text())
                .then(template => this.template = template);
        }

        fetchStyle () {
            if(!this.styleURL) return Promise.resolve(this.style);

            return fetch(this.styleURL)
                .then(response => response.text())
                .then(style => this.style = style);
        }

        async render (data = {}) {
            let template = await this.fetchUrl();
            let style = await this.fetchStyle();

            let templateTag = document.createElement('template');
            let styleTag = document.createElement('style');
            styleTag.innerHTML = style;

            // replace values
            Object.keys(data).forEach(key => template = template.replace(`{{${key}}}`, data[key]));
            templateTag.innerHTML = template;

            let element = templateTag.content.cloneNode(true);
            element.prepend(styleTag);
            return element;
        }
    }
})();
const Template = (function(){
    return class Template {
        _template = null;

        get template () {
            return document.createElement('template');
            template.innerHTML = value;
            return template;
        }

        constructor(config){
            if(!config.template && !config.templateURL)
                return throw new Error(`Invalid template config, required template string or templateURL`);

            if(config.templateURL) {
                fetch(config.templateURL)
                    .then(response => {
                        console.log("response", response);
                        this._template = response;
                    });
            }
            else {
                this._template = config.template;
            }
        }

        render (data = {}) {
            return this.template.content.cloneNode(true);
        }

        replace (key, value) {
            this.template.replace(`{{${key}}`, value);
        }
    }
})();
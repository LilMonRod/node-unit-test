(function (config){
    const API_URL = 'http://localhost:3000/api/v1/brands';
    class BrandComponent extends Component {
        constructor() {
            super(config);

            this.service = new Service(API_URL);
        }

        afterConnected () {
            this.getAll();
        }

        getAll () {
            let template = this.template.templates.brand;
            return this.service.get()
                .then(brands => Promise.all(
                    brands.data.map(brand => template.render(brand, this))
                ))
                .then(brands => {
                    let tbody = this.shadowRoot.querySelector('tbody');
                    tbody.innerHTML = '';
                    brands.forEach(brand => tbody.appendChild(brand));
                })
        }

        submit (event) {
            event.preventDefault();
            let form = event.target;
            let data = {
                name: form.name.value,
                description: form.description.value
            };
            this.service.post(data)
                .then(response => {
                    if(!response.success)
                        return this.showMessage('Error', response.error);

                    this.showMessage('Brand created', `Brand ${data.name} created successfully.`);
                    form.name.value = '';
                    form.description.value = '';
                    return this.getAll();
                })
                .catch(err => this.showMessage('Could not create brand', err.message))
        }

        showMessage (title = 'Error', message, time = 5000) {
            let template = this.template.templates.message;
            return template
                .render({title, message})
                .then(message => {
                    this.shadowRoot.appendChild(message);
                    setTimeout(() => {
                        let item = this.shadowRoot.querySelector('section');
                        item.parentNode.removeChild(item);
                    }, time);
                });
        }
    }
    RegisterComponent(config.component, BrandComponent);
})({
    component: 'cars-brand',
    templateURL: 'app/brand/brand.template.html',
    styleURL: 'app/brand/brand.css',
});
(function(config) {
    class RouterComponent extends BaseComponent {
        constructor () {
            super(config);
        }
    };

    RegisterComponent(config.component, RouterComponent);
})({
    component: 'app-router',
    templateURL: 'app/router/router.template.html',
    styleURL: 'app/router/router.css',
});
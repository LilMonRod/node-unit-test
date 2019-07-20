const {Router} = require('./core/router');

const CarsController = require('./controllers/cars.controller');

const cars = new CarsController();

const router = new Router([
    {
        path: '/api/v1/cars',
        method: 'GET',
        callback: cars.getAll.bind(cars)
    },
    {
        path: '/api/v1/cars/:id',
        method: 'GET',
        callback: cars.getOne.bind(cars)
    },
    {
        path: '/api/v1/cars',
        method: 'POST',
        callback: cars.postOne.bind(cars)
    },
    {
        path: '/api/v1/cars/:id',
        method: 'PUT',
        callback: cars.putOne.bind(cars)
    },
    {
        path: '/api/v1/cars/:id',
        method: 'DELETE',
        callback: cars.deleteOne.bind(cars)
    },
]);

module.exports = router;




import { detect } from './detect.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/js/service-worker.js').then(function (registration) {
            return registration.update();
        });
    });
}

if (window.location.pathname === '/scanner') {
    const buttons = document.querySelectorAll('button');
    const div = document.querySelector('.container');
    const url = 'https://world.openfoodfacts.org/api/v0/product/';
    detect.start(`.${div.className}`, (result) => {
        console.log(result);
    });
}

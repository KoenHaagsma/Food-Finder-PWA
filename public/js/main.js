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
    detect.start(`.${div.className}`, (result) => {
        console.log(result);
        location.href = `/details/${result}`;
    });
}

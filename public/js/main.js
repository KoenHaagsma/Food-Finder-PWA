import { detect } from './detect.min.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.min.js').then(function (registration) {
            return registration.update();
        });
    });
}

if (window.location.pathname === '/scanner') {
    const buttons = document.querySelectorAll('button');
    const div = document.querySelector('.container');
    detect.start(`.${div.className}`, (result) => {
        console.log(result);
        window.location.href = `/details/${result}`;
    });

    buttons[0].onclick = (event) => {
        event.preventDefault();
        detect.stop(`.${div.className}`);
        window.location.href = `/manual`;
    };
}

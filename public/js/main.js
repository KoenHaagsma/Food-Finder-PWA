if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/js/service-worker.js').then(function (registration) {
            return registration.update();
        });
    });
}

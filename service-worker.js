const CACHE_NAME = 'break-time-cafe-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/assets/placeholder.jpg',
    '/assets/icon-192.png',
    '/images/veg-manchow-soup.jpg',
    '/images/margherita-pizza.jpg',
    '/images/today-special-noodles.jpg',
    '/images/snooker.jpg',
    '/images/cricket.jpg',
    '/images/party-hall.jpg',
    '/images/mini-theater.jpg',
    '/images/cafeteria.jpg',
    '/images/moments1.jpg',
    '/images/moments2.jpg',
    '/images/moments3.jpg',
    '/images/moments4.jpg',
    '/assets/event-small.jpg',
    '/assets/interior-small.jpg',
    '/assets/cricket-small.jpg',
    '/assets/theater-small.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.all(
                urlsToCache.map(url =>
                    cache.add(url).catch(err => {
                        console.warn(`Failed to cache ${url}: ${err}`);
                    })
                )
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
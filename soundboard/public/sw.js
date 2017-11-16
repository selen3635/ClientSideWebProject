const localCache = [
    '/',
    'picture/bg.png',
    'picture/homescreen.png',
    'picture/homescreen1.png',
    'picture/ic_pause_black_24dp_2x.png',
    'picture/sbbg.jpg',
    'picture/spongebob_1.jpg',
    'picture/spongebob_2.jpg',
    'picture/spongebob_3.jpg',
    'picture/spongebob_4.jpg',
    'picture/spongebob_5.jpg',
    'picture/spongebob_6.jpg',
    'picture/spongebob_7.jpg',
    'picture/spongebob_8.jpg',
    'picture/spongebob_9.jpg',
    'picture/spongebob_10.jpg',
    'picture/spongebob_11.jpg',
    'picture/spongebob_12.jpg',
    'sound/sb01.mp3',
    'sound/sb01.mp3',
    'sound/sb01.mp3',
    'sound/sb01.mp3',
    'sound/sb01.mp3',
    'sound/sb06.mp3',
    'sound/sb07.mp3',
    'sound/sb08.mp3',
    'sound/sb09.mp3',
    'sound/sb10.mp3',
    'sound/sb11.mp3',
    'sound/sb12.mp3',
    'sound/01.mp3',
    'sound/02.mp3',
    'sound/03.mp3',
    'sound/04.mp3',
    'sound/05.mp3',
    'sound/06.mp3',
    'sound/07.mp3',
    'sound/08.mp3',
    'sound/09.mp3',
    'sound/10.mp3',
    'sound/11.mp3',
    'sound/12.mp3',
    'css/main.css',
    'css/pc.css',
    'css/mobile1.css',
    'script/js.js',
    'picture/ic_play_circle_outline_black_24dp_2x.png',
    'sw.js',
    'picture/img1.png',
    'picture/img2.png',
    'picture/img3.png',
    'picture/img4.png',
    'picture/img5.png',
    'picture/img6.png',
    'picture/img7.png',
    'picture/img8.png',
    'picture/img9.png',
    'picture/img10.png',
    'picture/img11.png',
    'picture/img12.png',
    'config.json',
    'manifest.json'
];
const CACHE_NAME = 'cache-v1';

self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(localCache);
            })

    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});



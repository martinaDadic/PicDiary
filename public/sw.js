const filesToCache= [
    "/",
    "/manifest.json",
    "/index.html",
    "/404.html",
    "/offline.html"
];
const staticCacheName= "static-cache-v1";
self.addEventListener("install", (event) => {
    console.log("Attempting to install service worker and cache static assets");
    event.waitUntil(caches.open(staticCacheName).then((cache) =>{
        return cache.addAll(filesToCache);
    }));
});

self.addEventListener("fetch", (event) => {event.respondWith(
    caches.match(event.request).then((response) => {
        if (response) {
            return response;
        }
        return fetch(event.request).then((response) =>{
            if (response.status === 404) {
                return caches.match("404.html");
            }
            return caches.open(staticCacheName).then((cache) =>{
                cache.put(event.request.url, response.clone());
                return response;
            });
        });
    }).catch((error) =>{
        return caches.match("offline.html");
    })
  );
});
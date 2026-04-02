var CACHE_NAME='budget-pro-v6';
var ASSETS=[
'./',
'./index.html',
'./manifest.json',
'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js'
];

self.addEventListener('install',function(e){
e.waitUntil(caches.open(CACHE_NAME).then(function(cache){return cache.addAll(ASSETS);}));
self.skipWaiting();
});

self.addEventListener('activate',function(e){
e.waitUntil(
caches.keys().then(function(names){
return Promise.all(names.filter(function(n){return n!==CACHE_NAME;}).map(function(n){return caches.delete(n);}));
}).then(function(){
return self.clients.matchAll();
}).then(function(clients){
clients.forEach(function(client){client.postMessage({type:'SW_UPDATED'});});
})
);
self.clients.claim();
});

self.addEventListener('fetch',function(e){
e.respondWith(
fetch(e.request).then(function(response){
if(response&&response.status===200){
var clone=response.clone();
caches.open(CACHE_NAME).then(function(cache){cache.put(e.request,clone);});
}
return response;
}).catch(function(){
return caches.match(e.request).then(function(cached){
if(cached)return cached;
if(e.request.destination==='document')return caches.match('./index.html');
});
})
);
});

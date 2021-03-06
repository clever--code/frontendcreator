const responses = [{
    reqUrl: 'https://api.example.com/json',
    reqMethod: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        message: 'a json response'
    }
}, {
    reqUrl: 'https://api.example.com/text',
    reqMethod: 'GET',
    body: 'plain text body'
}, {
    reqUrl: 'https://api.example.com/pdf',
    reqMethod: 'GET',
    headers: {
        'Content-Type': 'application/pdf'
    },
    file: 'demo/example.pdf'
}, {
    reqUrl: 'https://api.example.com/post',
    reqMethod: 'POST',
    status: 201,
    statusText: 'Created',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        message: 'created'
    }
}, {
    reqUrl: 'https://api.example.com/notfound',
    reqMethod: 'GET',
    status: 404,
    statusText: 'Not found',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        message: 'Not found'
    }
}, {
    reqUrl: 'https://localhost/*',
    reqMethod: 'GET',
    status: 302,
    redirectUrl: 'http://localhost:8080/$1'
}, {
    reqUrl: 'http://127.0.0.1:5500/chromiumdeveloper/bodyindex1',
    reqMethod: 'GET',
    status: 200,
    headers: {
        'Content-Type': 'application/javascript; charset=UTF-8'
    },
    body: {
        a: 'a'
    }
}];

const handleInstall = ()=>{
    console.log('[SW-PROXY] service worker installed');
    self.skipWaiting();
}
;

const handleActivate = ()=>{
    console.log('[SW-PROXY] service worker activated');

    return self.clients.claim();
}
;

const delayResponse = (time,response)=>new Promise(resolve=>setTimeout(()=>resolve(response), time));
const compose = (...fns)=>x=>fns.reduce((res,f)=>res || f(x), false);

const getResponseFor = (url,method)=>{
    const exactUrlMatch = ({reqUrl, reqMethod})=>url === reqUrl && method === reqMethod;
    const patternUrlMatch = ({reqUrl, reqMethod})=>reqUrl.includes('*') && new RegExp(reqUrl.replace('*', '(.+)')).test(url) && method === reqMethod;
    const exactOrPatternMatch = compose(exactUrlMatch, patternUrlMatch);

    /* eslint-disable no-undef */
    return responses.find(exactOrPatternMatch);
    /* eslint-enable no-undef */
}
;

const handleFetch = async(e)=>{
    const {request} = e;
    const {method: reqMethod, url: reqUrl} = request;
    const response = getResponseFor(reqUrl, reqMethod);

    if (response) {
        const {headers, status, statusText, delay, resMethod} = response;
        const redirectUrl = response.reqUrl.includes('*') ? reqUrl.replace(new RegExp(response.reqUrl.replace('*', '(.+)')), response.redirectUrl) : response.redirectUrl;
        const init = {
            headers,
            status,
            statusText,
            url: reqUrl,
            method: resMethod ? resMethod : reqMethod
        };

        const proxyResponse = response.file ? fetch(`${self.origin}/${response.file}`) : redirectUrl ? fetch(redirectUrl, init) : Promise.resolve(new Response(JSON.stringify(response.body),init));

        const msg = `[SW-PROXY] proxying request ${reqMethod}: ${reqUrl}`;
        console.log(`${msg} ${redirectUrl ? `-> ${redirectUrl}` : ``} ${response.file ? `-> serving: ${response.file}` : ``}`);

        e.waitUntil(Promise.resolve(e.respondWith(delay ? delayResponse(delay, proxyResponse) : proxyResponse)));
    }
}
;

self.addEventListener('install', handleInstall);
self.addEventListener('activate', handleActivate);
self.addEventListener('fetch', handleFetch);

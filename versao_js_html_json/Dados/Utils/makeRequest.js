const makeRequest = function(url, responseType, callback, args) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.response, args);
            }
        }
    }

    xhr.open('GET', url, true);
    xhr.responseType = responseType;
    xhr.send();
}


function makeRequestPromise(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(Error("Network Error"));
        };

        req.responseType = 'text';

        req.send();
    });
}

export { makeRequest, makeRequestPromise };
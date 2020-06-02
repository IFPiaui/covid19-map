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

export { makeRequest };
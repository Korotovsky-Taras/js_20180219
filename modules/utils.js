export function request(method, path) {
    let xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {

        xhr.addEventListener('readystatechange', ({target}) => {
			let {readyState, responseText, status} = target;
        	if (readyState === 4) {
				resolve({json: responseText, path: path, status: status});
			}
        });

        xhr.open(method.toUpperCase(), path);
        xhr.send();
    });


}


// request('GET', '/data.json', (data) => { console.log(data) })
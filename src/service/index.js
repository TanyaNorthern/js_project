export function service(url) {
    return fetch(url)
        .then((res) => res.json())
}

export function servicePost(url, body) {
    console.log(url);
    console.log(body);
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((res) => {
        console.log(res);
        return res.json();
    })
}

export function serviceDelete(url, id) {
    console.log(url);
    console.log(id);
    return fetch(`${url}/${id}`, {
        method: 'DELETE',
    }).then((res) => {
        console.log(res);
        return res.json();
    })
}
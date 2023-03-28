export const fetchData = (id, callback) => {
    fetch('/api/fetch.js', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then((response) => response.json())
        .then((json) => {
        callback(json);
    })
        .catch((error) => {
        console.log(error);
    });
};
//# sourceMappingURL=fetchData.js.map
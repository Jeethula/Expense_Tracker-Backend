const http = require("http");

const app = http.createServer(function (req, res) {
    const method = req.method;
    const url = req.url;

    let data = {
        message: ""
    };

    console.log({ method, url });

    if (url === "/") {
        data.message = "Main / Route";
    }
    else if (url === "/about") {
        data.message = "About Route";
    }
    else {
        data.message = "NOT FOUND ROUTE";
    }

    res.writeHead(200);
    res.end(JSON.stringify(data));
});

const PORT = 8000;
const URL = "127.0.0.1";

app.listen(PORT, URL, () => {
    console.log(`Connected to the server: http://${URL}:${PORT}`);
});


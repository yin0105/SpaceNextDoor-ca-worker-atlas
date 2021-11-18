const config = {
    providerId: "Atlas provider",
    doors: [],
    server:{
        cors: {
            enabled: true,
            origin: []
        },
        https: {
            enabled: false,
            key: "",
            cert: "",
            port: 443
        },
        http:{
            enabled: true,
            port: 82
        }
    },
    token:{
        fetch: true,
        key: "sessionToken",
        refresh: 300000
    },
    authentication:{
        username: "admin",
        password: "admin",
        headers: {"sessionToken": ""}
    },
    master:{
        url: "http://127.0.0.1:8080/"
    },
    target: {
        url: "https://129.126.111.134/"
    }
}

module.exports = config;
module.exports = {
    apps: [
        {
            name: "gateway",
            script: "./back_end/gateway.js",
            instances: 2,
            exec_mode: 'cluster',
            watch: true
        },
        {
            name: "mongoDbConnect",
            script: "./back_end/mongod.js",
            instances: 2,
            exec_mode: 'cluster',
            watch: true
        },
        {
            name: "Node and websocket",
            script: "./back_end/backend_server.js",
            instances: 2,
            exec_mode: 'cluster',
            watch: true
        },
        {
            name: "Redis",
            script: "./back_end/redis.js",
            instances: 2,
            exec_mode: 'cluster',
            watch: true
        },
        {
            name: "React host",
            script: "./back_end/react_host.js",
            instances: 2,
            exec_mode: 'cluster',
            watch: true
        },
        {
            name: "kafka",
            script: "./back_end/kafka.js",
            instances: 2,
            exec_mode: 'cluster',
            watch: true
        },
        {
            name: "Auth Service",
            script: "./back_end/auth_service.js",
            instances: 2,
            exec_mode: 'cluster',
            watch: true
        },
    ]
};

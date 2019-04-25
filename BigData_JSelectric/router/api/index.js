//JavaScript Document
let express = require("express");
let router = express.Router();
let fs = require("fs");
let path = require("path");
let readFile = (pathname, charset) => new Promise((resolve, reject) => fs.readFile(pathname, charset, (error, data) => error ? reject(error) : resolve(JSON.parse(data))));
router.get("/task/statistic", (request, response) => {
    response.send({
        retCode:0,
        cost:9,
        acts:[
            {
                id:15,
                userId:"12345678",
                date:"2019-04-25",
                startTime:"11:10:00",
                endTime:"12:00:00",
                state:0
            },
            {
                id:14,
                userId:"12345678",
                date:"2019-04-23",
                startTime:"15:10:00",
                endTime:"15:40:00",
                state:0
            },
            {
                id:13,
                userId:"12345678",
                date:"2019-04-22",
                startTime:"15:10:00",
                endTime:"15:40:00",
                state:4
            },
            {
                id:12,
                userId:"12345678",
                date:"2019-04-22",
                startTime:"10:00:00",
                endTime:"10:30:00",
                state:5
            },
            {
                id:11,
                userId:"12345678",
                date:"2019-04-18",
                startTime:"08:00:00",
                endTime:"08:30:00",
                state:5
            },
            {
                id:10,
                userId:"12345678",
                date:"2019-04-17",
                startTime:"08:00:00",
                endTime:"08:30:00",
                state:5
            },
            {
                id:9,
                userId:"12345678",
                date:"2019-04-16",
                startTime:"08:00:00",
                endTime:"08:30:00",
                state:4
            },
            {
                id:8,
                userId:"12345678",
                date:"2019-03-16",
                startTime:"08:00:00",
                endTime:"08:30:00",
                state:0
            },
            {
                id:7,
                userId:"12345678",
                date:"2019-03-14",
                startTime:"20:00:00",
                endTime:"20:30:00",
                state:0
            },
            {
                id:6,
                userId:"12345678",
                date:"2019-02-14",
                startTime:"10:00:00",
                endTime:"10:20:00",
                state:1
            }
        ]
    });
});
let contract = false;
router.get("/contract/signed", (request, response) => {
    response.send({
        retCode:0,
        data:contract
    })
});
router.post("/contract/add", (request, response) => {
    contract = true;
    // console.log(request.body)
    response.send({
        retCode:0,
        data:true
    })
});
router.post("/contract/remove", (request, response) => {
    contract=false;
    response.send({
        retCode:0,
        data:true
    })
});
router.get("/contract/getCity", async (request, response) => {
    let data = await readFile(path.resolve(__dirname, "./city.json"), "utf-8");
    response.send(data);
});
module.exports = router;
const express = require("express");
const request = require("supertest");
const appRouter = require("../routes/routes");
const User = require('../models/userModel');

const app = express();
app.use(express.json()); // returns json body object
app.use("", appRouter);


const getAuthToken = ({username, password}) => `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`

describe("Integration tests for the account creation", () => {
    // let randomString = (Math.random() + 1).toString(36).substring(5);

    it("POST - /v1/user - success - account created", async () => {
        const data = {
            firstName: "test",
            lastName: "test",
            password: "password",
            username: `test@test.com`,    
        };


        const createUserReq = await request(app)
        .post("/v1/user").send(data);
        expect(createUserReq.statusCode).toBe(201);


        await User.update({isVerified: true}, {
            where: {
                email: data.username,
            }
        });
        
        const {body, statusCode} = await request(app)
        .get("/v1/user/self")
        .set({ Authorization: getAuthToken(data)});

        expect(statusCode).toBe(200);
        console.log("username check 1",body.username, createUserReq.body.username);
        expect(createUserReq.body.username).toBe(body.username);
    });
});

describe("Integration test for updating the account", () => {
    it("PUT - /v1/user/self - success - account updated", async() => {
        const creds = {
            password: "password",
            username: "test@test.com",    
        };

        const data = {
            firstName: "ani",
            lastName: "ani",
            password: "passwordani"
        }

        const updateUserReq = await request(app)
        .put("/v1/user/self")
        .set({ Authorization: getAuthToken(creds)})
        .send(data);
        expect(updateUserReq.statusCode).toBe(204)

        creds.password = data.password
        const {body, statusCode} = await request(app)
        .get("/v1/user/self")
        .set({ Authorization: getAuthToken(creds)});

        expect(statusCode).toBe(200);

        console.log("username check",body.username, creds.username);
        expect(creds.username).toBe(body.username);      
    });
});


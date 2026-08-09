const request = require("supertest");
const app = require("../app");

describe("Auth Routes", () => {

    test("GET /api/v1/auth/test should return success", async () => {

        const response = await request(app)
            .get("/api/v1/auth/test");

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            success: true,
            message: "Auth route is working"
        });
    });


    test("POST /api/v1/auth/login should login admin successfully", async () => {

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.token).toBeDefined();

        expect(typeof response.body.token).toBe("string");

    });


    test("POST /api/v1/auth/login should reject invalid email", async () => {

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "wrong@example.com",
                password: process.env.ADMIN_PASSWORD
            });

        expect(response.statusCode).toBe(401);

        expect(response.body).toEqual({
            success: false,
            message: "Invalid credentials"
        });

    });


    test("POST /api/v1/auth/login should reject missing password", async () => {

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: process.env.ADMIN_EMAIL
            });

        expect(response.statusCode).toBe(422);

        expect(response.body.success).toBe(false);

        expect(response.body.errors).toBeDefined();

    });

});
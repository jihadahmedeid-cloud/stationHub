const request = require("supertest");

jest.mock("../services/messageServices", () => ({
    getMessages: jest.fn(),
    createMessage: jest.fn(),
}));

jest.mock("../sockets/socket", () => ({
    getIO: jest.fn(() => ({
        to: jest.fn(() => ({
            emit: jest.fn(),
        })),
    })),
}));

const {
    getMessages,
    createMessage,
} = require("../services/messageServices");

const app = require("../app");

describe("Message Routes", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test("GET /api/v1/stations/ramses/updates should return messages", async () => {

        getMessages.mockResolvedValue({
            data: [
                {
                    _id: "message-001",
                    station: "station-001",
                    status: "warning",
                    message: "The station is currently busy"
                }
            ],
            pagination: {
                total: 1,
                page: 1,
                limit: 10,
                pages: 1
            }
        });

        const response = await request(app)
            .get("/api/v1/stations/ramses/updates");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(1);

        expect(getMessages).toHaveBeenCalledWith(
            {},
            "ramses"
        );
    });


    test("POST /api/v1/stations/ramses/updates should create a message", async () => {

        createMessage.mockResolvedValue({
            _id: "message-002",
            station: "station-001",
            status: "warning",
            message: "Station is currently busy"
        });

        const loginResponse = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            });

        const token = loginResponse.body.token;

        const response = await request(app)
            .post("/api/v1/stations/ramses/updates")
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "warning",
                message: "Station is currently busy"
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.data.message)
            .toBe("Station is currently busy");

        expect(createMessage).toHaveBeenCalledWith({
            station: "ramses",
            status: "warning",
            message: "Station is currently busy"
        });
    });


    test("POST message should return 422 when validation fails", async () => {

        const loginResponse = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            });

        const token = loginResponse.body.token;

        const response = await request(app)
            .post("/api/v1/stations/ramses/updates")
            .set("Authorization", `Bearer ${token}`)
            .send({
                message: "Station is currently busy"
            });

        expect(response.statusCode).toBe(422);

        expect(response.body.success).toBe(false);

        expect(response.body.errors).toBeDefined();

        expect(createMessage).not.toHaveBeenCalled();
    });


    test("POST message should return 401 without authentication", async () => {

        const response = await request(app)
            .post("/api/v1/stations/ramses/updates")
            .send({
                status: "warning",
                message: "Station is currently busy"
            });

        expect(response.statusCode).toBe(401);

        expect(createMessage).not.toHaveBeenCalled();
    });

});
const request = require("supertest");

jest.mock("../services/stationServices", () => ({
    getAllStations: jest.fn(),
}));

const { getAllStations } = require("../services/stationServices");

const app = require("../app");


describe("Station Routes", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test("GET /api/v1/stations should return all stations", async () => {

        getAllStations.mockResolvedValue([
            {
                _id: "station-001",
                name: "ramses",
                status: "online"
            },
            {
                _id: "station-002",
                name: "sadat",
                status: "offline"
            }
        ]);


        const response = await request(app)
            .get("/api/v1/stations");


        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveLength(2);


        expect(response.body.data[0]).toEqual({
            _id: "station-001",
            name: "ramses",
            status: "online"
        });


        expect(response.body.data[1]).toEqual({
            _id: "station-002",
            name: "sadat",
            status: "offline"
        });


        expect(getAllStations).toHaveBeenCalledTimes(1);

    });

});
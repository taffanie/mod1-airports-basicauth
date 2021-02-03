const app = require("./server"); // Link to your server file
const request = require("supertest");
const Airports = require("./airports.json");

describe("GET /airports", () => {

  it("responds with application/json", (done) => {
    request(app)
      .get("/airports")
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });

  it("gets all the airports", (done) => {
    request(app)
      .get("/airports")
      .expect(res => {
        // console.log(res.body.length)
        expect(res.body.length).toBe(28868)
      })
      .expect(200, done);
  });

  it("responds with status code 200", (done) => {
    request(app)
      .get("/airports")
      .expect(200, done);
  });

});

describe("GET /airports/:icao", () => {

  it("gets airport matching the icao", (done) => {
    request(app)
      .get("/airports/ZUTC")
      .expect(res => {
        // console.log(res.body)
        expect(res.body.icao).toBe("ZUTC")
        expect(res.body.state).toBe("Yunnan")
      })
      .expect(200, done);
  });

});

const testAirport = {
  icao: 'ABCD',
  iata: 'ABC',
  name: 'ABC Airport',
  city: 'ABC City',
  state: 'ABC State',
  country: 'ABC Country',
  elevation: 1234,
  lat: 12.3456789,
  lon: 98.7654321,
  tz: 'ABC/ABCDEFG'
}

describe("POST /airports", () => {

  it("adds new airport", (done) => {
    request(app)
      .post("/airports")
      .send(testAirport)
      .expect(res => {
        expect(res.body.icao).toBe(testAirport.icao)
      })
      .expect(200, done)
  });

});

describe("PUT /airports/:icao", () => {

  const updatedTestAirport = {
    icao: 'ABCD',
    iata: 'PEG',
    name: 'PEG Airport',
    city: 'PEG City',
    state: 'PEG State',
    country: 'PEG Country',
    elevation: 1234,
    lat: 12.3456789,
    lon: 98.7654321,
    tz: 'ABC/ABCDEFG'
  }

  it("updates specified airport", (done) => {
    request(app)
      .put("/airports/" + testAirport.icao)
      .send(updatedTestAirport)
      .expect(res => {
        expect(res.body.name).toBe(updatedTestAirport.name)
      })
      .expect(200, done)
  })

})

describe("DELETE /airports/:icao", () => {

  it("deletes specified airport", (done) => {
    request(app)
      .delete("/airports/" + testAirport.icao)
      .expect(200, done);
  })

})

// 200 ok, 201 created, 404 not found
// npm run test -- --watchAll
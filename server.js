const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');

// our airports json
const airports = require("./airports.json");
const Airport = require("./Airport.js");

// swagger components
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// swagger config
const swaggerOptions = require("./openapi");

/**
 * @swagger
 * tags:
 *   name: Airports
 *   description: Airport management
 *
 */

/**
 * @swagger
 * /airports:
 *    get:
 *     summary: Reads
 *     description: returns an array of airports
 *      ![airport](https://twistedsifter.com/wp-content/uploads/2014/11/mexico-city-international-airport-drone-video.jpg)
 *     responses:
 *       200:
 *         description: status ok - returns all the airports
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Airport'
 *       302:
 *          description: moved temporarily
 *       404:
 *          description: not found
 *       500: 
 *          description: internal server error 
 *    post: 
 *     summary: Creates
 *     description:  Adds latest airport to the existing list of airports
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Airport'
 *     responses:
 *      200: 
 *        description: status ok - airport was added 
 *      302: 
 *        description: moved temporary
 *      404:
 *        description: not found
 *      500:
 *        description: internal server error  
 * /airports/{icao}:
 *    get:
 *     summary: Reads one airport
 *     description: Returns one specific airport
 *     parameters:
 *     - in: path
 *       required: true
 *       name: icao
 *       description: Unique airport ID
 *       schema:
 *         properties:
 *           icao:
 *             type: string
 *     responses:
 *       200:
 *         description: status ok - returns one JSON object that represent that airport
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Airport'
 *       302:
 *         description: moved temporarily
 *       404:
 *         description: not found
 *       500: 
 *         description: internal server error 
 *    put: 
 *      summary: Updates
 *      description: Updates an airport in the existing list of airports
 *      parameters:
 *      - in: path
 *        required: true 
 *        name: icao
 *        description: Unique airport ID
 *        schema: 
 *          properties:
 *            icao:
 *              type: string 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Airport'
 *      responses:
 *        200:
 *          description: status ok - airport was updated
 *        302:
 *          description: moved temporarily
 *        404:
 *          description: not found
 *        500:
 *          description: internal server error
 *    delete:
 *      summary: Deletes
 *      description: Deletes an airport from the existing list of airports
 *      parameters:
 *      - in: path
 *        required: true 
 *        name: icao
 *        description: Unique airport ID
 *        schema:
 *          required: 
 *          - icao 
 *          properties:
 *            icao:
 *              type: string
 *      responses:
 *        200:
 *          description: status ok - airport was deleted
 *        302:
 *          description: moved temporarily
 *        404:
 *          description: not found
 *        500:
 *          description: internal server error
 */

// Unless you fs.writeFile, will only save in-memory, not permanently in json file 
// in-memory will reset all airports to default after restart of app 

// Get all airports 
app.get("/airports", (req, res) => {
  res.status(200).send(airports)
})

// Get all airports paginated 
app.get("/airports", (req, res) => {
  let pageSize = 25
  if (req.query.pageSize) {
    pageSize = req.query.pageSize
  }
  let currentPage = req.query.page
  let index = (currentPage - 1) * pageSize
  const paginatedAirports = airports.slice(index, pageSize * currentPage)
  res.send(paginatedAirports);
  // res.send(airports)
  console.log(airports.length)
});

// ?page=1&pageSize=25

// Get one airport
app.get("/airports/:icao", (req, res) => {
  const airport = airports.find(airport => airport.icao === req.params.icao)
  res.send(airport)
})

// Create airport
app.post("/airports", (req, res) => {
  const newAirport = req.body
  airports.push(newAirport)
  res.send(newAirport)
  fs.writeFile('./airports.json', JSON.stringify(airports, null, '\t'), (err) => {
    if (err) throw err;
    console.log('Airport created!')
  })
  console.log(airports.length)
})

// Update airport
app.put("/airports/:icao", (req, res) => {
  const airportIndex = airports.findIndex(airport => airport.icao === req.params.icao)
  airports.splice(airportIndex, 1, req.body)
  res.send(req.body)
  fs.writeFile('./airports.json', JSON.stringify(airports, null, '\t'), (err) => {
    if (err) throw err;
    console.log('Airport updated!')
  })
})

// Delete airport 
app.delete("/airports/:icao", (req, res) => {
  const airportIndex = airports.findIndex(airport => airport.icao === req.params.icao)
  airports.splice(airportIndex, 1)
  res.send(airports)
  fs.writeFile('./airports.json', JSON.stringify(airports, null, '\t'), (err) => {
    if (err) throw err;
    console.log('Airport deleted!')
  })
  console.log(airports.length)
})

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
);

module.exports = app;

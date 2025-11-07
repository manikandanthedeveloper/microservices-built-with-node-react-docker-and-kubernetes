const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
	const event = req.body;
	events.push(event);

	axios
		.post("http://localhost:3000/events", event)
		.catch((err) =>
			console.error(
				"Failed to forward event to http://localhost:3000/events:",
				err && err.message ? err.message : err
			)
		);

	axios
		.post("http://localhost:3001/events", event)
		.catch((err) =>
			console.error(
				"Failed to forward event to http://localhost:3001/events:",
				err && err.message ? err.message : err
			)
		);

	axios
		.post("http://localhost:3002/events", event)
		.catch((err) =>
			console.error(
				"Failed to forward event to http://localhost:3002/events:",
				err && err.message ? err.message : err
			)
		);
	axios
		.post("http://localhost:3003/events", event)
		.catch((err) =>
			console.error(
				"Failed to forward event to http://localhost:3003/events:",
				err && err.message ? err.message : err
			)
		);

	res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
	res.send(events);
});

app.listen(3005, () => {
	console.log("Event Bus server is running on http://localhost:3005");
});

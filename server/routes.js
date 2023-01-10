const express = require('express');
const Person = require('./models/person.js');

const router = express.Router();

router.post("/", (req, res) => {
  const person = new Person({
    name: req.body.name,
    surname: req.body.surname,
    city: req.body.city,
    address: req.body.address,
    phone: req.body.phone,
  });

  person
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Person created successfully",
        person: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating person failed",
        error: error,
      });
    });
});

router.get("/", (req, res) => {
  Person.find()
    .then((people) => {
      res.status(200).json({
        message: "People fetched successfully",
        people: people,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching people failed",
        error: error,
      });
    });
});

router.patch("/:id", (req, res) => {
  const update = {};
  for (const prop of Object.keys(req.body)) {
    update[prop] = req.body[prop];
  }
  Person.findByIdAndUpdate(req.params.id, update, { new: true })
    .then((person) => {
      if (person) {
        res.status(200).json({
          message: "Person updated successfully",
          person: person,
        });
      } else {
        res.status(404).json({
          message: "Person not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Updating person failed",
        error: error,
      });
    });
});

router.delete("/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      if (person) {
        res.status(200).json({
          message: "Person deleted successfully",
          person: person,
        });
      } else {
        res.status(404).json({
          message: "Person not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting person failed",
        error: error,
      });
    });
});

module.exports = router;
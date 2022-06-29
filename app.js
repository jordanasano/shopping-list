"use strict";

const express = require("express");
const { items } = require('./fakeDb');
const router = require('./shoppingListRouter')
const app = express();

const { NotFoundError } = require("./expressError");

app.use(express.json());                           // process JSON data
app.use(express.urlencoded({ extended: true }));   // process trad form data
app.use('/items', router);

app.use(function (req, res) {                      // handle site-wide 404s
    throw new NotFoundError();
});

app.use(function (err, req, res, next) {           // global err handler
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
});

module.exports = app;  
"use strict";

const app = require("./app");
const request = require("supertest")
const { items } = require('./fakeDb');


describe("set of tests for shoppingListRouter", function() {
    /** Clear items and adds popcorn to shoppingList. */
    beforeEach(function() {
        items.length = 0;
        items.splice(0, items.length);
        items.push({name: 'popcorn', price: 12.00,});
    });

    ////////////GET /items/////////////////
    test("test GET /items", async function() {
        const resp = await request(app).get('/items');

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({items: [{name: 'popcorn', price: 12.00,}]});
        expect(resp.body.items.length).toEqual(1);
    });

    ////////////POST /items/////////////////
    test("test POST /items success", async function() {
        const resp = await request(app)
            .post('/items')
            .send({name: "donut", price: "6.99",
            });

        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({"added":{name: "donut", price: "6.99",}});
    });
    
    // add error to shoppingListRouter
    test("test POST /items failures", async function() {
        const resp = await request(app)
            .post('/items')
            .send({name: "", price: "",
            });


    });
})
"use strict";

const express = require("express");
const { NotFoundError } = require('./expressError');

const {items} = require("./fakeDb");
const router = new express.Router();

// TODO: give examples of what will be returned in docstrings; being read by other devs

/** Returns json of all items in shoppingList */
router.get('/', function (req, res) {
    console.log('got here');

    return res.json({items:items});
});

/** Adds an item to shoppingList and returns json showing it was added */
router.post('/', function (req, res) {
    // FIXME: check what data provided is correct
    const newItem = items.push(req.body)

    return res.status(201).json({ added: req.body });
});

/** Returns json of the item listed in the url */
router.get('/:name', function (req, res) {
    const itemName = req.params.name;
    // FIXME: try .find
    const item = items.filter(item => item.name === itemName)[0];

    if (item === undefined) {
        throw new NotFoundError(`${itemName} not found.`)
    } 

    return res.json(item);
});

/** Updates the item listed in the url and returns it as json */
router.patch('/:name', function (req, res) {
    const itemName = req.params.name;
    // FIXME: use .find and update item once found
    // check data offered to update should be allowed
    let targetIdx;

    for(let i = 0; i<items.length; i++) {
        if(items[i].name === itemName) {
            targetIdx = i;
        }
    }

    console.log('targetIdx =', targetIdx);

    if(targetIdx !== undefined) {
        items[targetIdx] = req.body;
    } else {
        throw new NotFoundError(`${itemName} not found.`)
    }

    return res.json({updated: items[targetIdx]});
});

/** Deleted the item listed in the url and returns json saying deleted */
router.delete('/:name', function (req, res) {
    const itemName = req.params.name;
    let targetIdx;

    for (let i = 0; i < items.length; i++) {
        if (items[i].name === itemName) {
            targetIdx = i;
        }
    }

    if (targetIdx !== undefined) {
        items[targetIdx] = req.body;
    } else {
        throw new NotFoundError(`${itemName} not found.`)
    }
    
    items.splice(targetIdx, 1);

    return res.json({message:'Deleted'});
});

module.exports = router;
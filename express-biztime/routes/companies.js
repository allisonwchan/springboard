const express = require("express");
const axios = require('axios');
const slugify = require("slugify");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError")

// GET /companies: returns list of companies, like {companies: [{code, name}, ...]}
router.get("/companies", async function (req, res, next) {
    try {
        const results = await db.query(
            `SELECT code, name FROM companies;`
        )
        return res.json(results.rows);

    } catch (err) {
        next(err);
    }
})

// GET /companies/[code] : Return obj of company: {company: {code, name, description}}
router.get("/companies/:code", async function (req, res, next) {
    try {
        const results = await db.query(
            `SELECT * FROM companies WHERE code = $1`, [req.params.code]
        );

        if (results.rows.length === 0) {
            throw new ExpressError(`Company with code ${req.params.code} not found`, 404);
        }
        
        return res.json(results.rows);

    } catch (err) {
        next(err);
    }
})

// POST /companies : Adds a company
// Exmaple: {name, descrip}  =>  {company: {code, name, descrip}}
router.post("/companies", async function (req, res, next) {
    try {
        let {name, description} = req.body;
        let code = slugify(name, {lower: true});

        const result = await db.query(
            `INSERT INTO companies (code, name, description) 
            VALUES ($1, $2, $3) 
            RETURNING code, name, description`,
            [code, name, description]);

        return res.status(201).json({"company": result.rows[0]});

    } catch(err) {
    next(err);
    }
})

// PUT /companies/[code] : Edit existing company
// Exmaple: {name, description} => {company: {code, name, description}}
router.put("/companies/:code", async function (req, res, next) {
    try {
        let {name, description} = req.body;
        let code = req.params.code;

        const result = await db.query(
            `UPDATE companies
            SET name=$1, description=$2
            WHERE code = $3
            RETURNING code, name, description`, 
            [name, description, code]
        );

        if (result.rows.length === 0) {
            throw new ExpressError(`No such company: ${code}`, 404)

        } else {
            return res.json({"company": result.rows[0]});
        }

    } catch(err) {
    next(err);
    }
})

// DELETE /companies/[code] : Delete existing company
router.delete("/companies/:code", async function (req, res, next) {
    try {
        let code = req.params.code;
    
        const result = await db.query(
              `DELETE FROM companies
               WHERE code=$1
               RETURNING code`,
               [code]
        );
    
        if (result.rows.length == 0) {
          throw new ExpressError(`No such company: ${code}`, 404)

        } else {
          return res.json({"status": "deleted"});
        }
    }

    catch (err) {
        return next(err);
    }
})

module.exports = router;
const express = require("express");
const ExpressError = require("../expressError")
const db = require("../db");
const router = new express.Router();
const slugify = require("slugify");

// GET /industries : list all industries and company codes in each industry
router.get("/industries", async function (req, res, next) {
    try {
        const results = await db.query(
            `SELECT i.code, i.industry, ci.comp_code 
                FROM industries as i
                    JOIN companies_industries AS ci
                    ON i.code = ci.industry_code;`
        )

        return res.json(results.rows);

    } catch (err) {
        return next(err);
    }
})

// POST /industries : add new industry
// Example: {name} => {industry: {code, name}}
router.post("/industries", async function (req, res, next) {
    try {
        let industry_name = req.body.name;
        let code = slugify(industry_name, {lower: true});

        const result = await db.query(
            `INSERT INTO industries (code, industry) 
            VALUES ($1, $2) 
            RETURNING code, industry`,
            [code, industry_name]
        );

        return res.status(201).json({"company": result.rows[0]});

    } catch (err) {
        next(err);
    }
})

// POST /industries/associate : Associate an existing industry with an existing company
// Example: {company, industry} => {comp_code, industry_code}
router.post("/industries/associate", async function (req, res, next) {
    try {
        let { company, industry } = req.body;
        let comp_code = slugify(company, {lower: true});
        let industry_code = slugify(industry, {lower: true});

        const checkCompName = await db.query(
            `SELECT code FROM companies WHERE code = $1`, 
            [comp_code]
        );

        if (checkCompName.rows.length == 0) {
            throw new ExpressError(`No such company: ${company}`, 404)
        }

        const checkIndustryName = await db.query(
            `SELECT code FROM industries WHERE code = $1`,
            [industry_code]
        );

        if (checkIndustryName.rows.length == 0) {
            throw new ExpressError(`No such industry: ${industry}`, 404)
        }
        
        const result = await db.query(
            `INSERT INTO companies_industries (comp_code, industry_code) 
            VALUES ($1, $2) 
            RETURNING comp_code, industry_code`,
            [comp_code, industry_code]
        );

        return res.status(201).json({"association": result.rows[0]});
        // return res.send(industry);

    } catch (err) {
        next(err);
    }
})

module.exports = router;
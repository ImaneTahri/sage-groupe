/*--
Author: Christine Kweri
Student ID : 300957096
Date: 10-11-2020
FileName : app.js
*/


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//let jwt = require('jsonwebtoken');

// create a reference to the model
let Business = require('../models/business');

module.exports.displayBusinessList = (req, res, next) => {
    Business.find((err, businessList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BusinessList);

            res.render('business/list', 
            {title: 'Contact List', 
            BusinessList: businessList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business/add', {title: 'Add Contact', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBusiness = Business({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Business.create(newBusiness, (err, Business) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the list
            res.redirect('/business-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business.findById(id, (err, businessToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('business/edit', {title: 'Edit Contact', business: businessToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBusiness = Business({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Business.updateOne({_id: id}, updatedBusiness, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business list
            res.redirect('/business-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the business list
             res.redirect('/business-list');
        }
    });
}

module.exports.displayBusinessContactList = (req, res, next) => {
    Contact.find((err, BusinessContactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BusinessContactList);

            res.render('businessContact/list', 
            {title: 'Business Contacts', 
            BusinessContactList: BusinessContactList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    }).sort({"firstName":1}); // contact list alphabetically sorted 
}

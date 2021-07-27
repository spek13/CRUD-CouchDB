const nano = require ("./db");
const express = require('express');
const app = express();


const owners = nano.db.use('owner');

const Owner = require('./dto').owner;
const { restart } = require("nodemon");
const e = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1/owners",(req, res) =>{
    owners.list(function(err, body){
        if(err){
            res.json({
                err: 'No hay lista '
            })
        }
        console.log(body.rows);
        res.json({
            data: body
        });
    });
    
});

app.get("/api/v1/owners/:id",(req, res) =>{
    let id = req.params.id;
    owners.get(id, function(err, body){
        if (err) {
            res.json({

                err: 'No se encontro el usuario '
            })
        }
        console.log(body.rows);
        res.json({
            data: body
        });
    });
    
});

app.post("/api/v1/owners/create", (req, res)=>{
    Owner.first_name = req.body.first_name || 'Damina';
    Owner.password = req.body.password || 'damian1234';
    Owner.user_name = req.body.user_name || 'damian';
    Owner.last_name = req.body.last_name || 'Mejia';
    Owner.age = req.body.age || '25';
    Owner.heigth = req.body.heigth || '175';
    Owner.imc = req.body.imc || '20';
    owners.insert(Owner,(err, body) => {
        if (err) {
            console.log(err)
          } else {
            console.log(body)
            res.json({
                data: body
            });
          }
    })
});

app.put('/api/v1/owners/update/:id', (req, res) => {
    let id = req.params.id;



    owners.get(id, function(err, owner){
        if (err) {
            console.log('[ERROR] => ', err)
            res.json({
                err: 'No se encontro el usuario!'
            })
        }

        owner.first_name = req.body.first_name || owner.first_name;
        owner.password = req.body.password || owner.password;
        owner.user_name = req.body.user_name || owner.user_name;
        owner.last_name = req.body.last_name || owner.last_name;
        owner.age = req.body.age || owner.age;
        owner.heigth = req.body.heigth || owner.heigth;
        owner.imc = req.body.imc || owner.imc;

        owners.insert({'_id': owner._id, '_rev': owner._rev, ...owner},function(err, body){
            if (err) {
                console.log('Error => ', err)
                res.json({
    
                    err: 'No se encontro el usuario!'
                })
                
            }
            console.log(owner);
            res.json({
                data: body
            });
        });
    });
});

app.delete("/api/v1/owners/delete/:id",(req, res) =>{
    let id = req.params.id;

    owners.get(id, function(err, owner){
        if (err) {
            res.json({

                err: 'No se encontro el usuario '
            })
        }
        owners.destroy(id, owner._rev, function(err, body){
            if (err) {
                res.json({
    
                    err: 'No se encontro el usuario '
                })
            }
            console.log(owner);
            res.json({
                data: body
            });
        });
    });
});

    

app.listen(8081,()=>{
    console.log("server run in: 8081");

});

const Profile = require('../Model/model');
var nodemailer = require('nodemailer');
//const mail = require('./mail');
const zoho = require('@trifoia/zcrmsdk');
const config = require('./zoho.config');

module.exports.getDonne = (req, res) => {
    Profile.find()
        .then(note => {
            console.log("bla");

            res.send(note)
        })
        .catch(e => {
            res.status(500).send({ mes: e.mes || "erreur" })
        });
};



module.exports.postDonne = function (req, res) {
    var nom = req.body.nom
    var email = req.body.email
    console.log(req.body);

    Profile.find()
        .then(note0 => {
            if (note0.length == 0) {
                id = 0;

            } else {
                id = parseInt(note0[note0.length - 1].id) + 1;
            }

            const profil = new Profile({ _id: id, nom: nom, email: email });
            (!nom || !email) ? console.log("vide ", nom, email) : profil.save()
                .then((note) => {
                    console.log("succs");

                    var smtpTransport = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "rija0princy@gmail.com",
                            pass: ""
                        }
                    });
                    var mailOptions = {
                        from: "rija0princy@gmail.com",
                        to: "rjpratsimb@gmail.com",
                        subject: ' | new message !',
                        text: "hello man"
                    }


                    smtpTransport.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("ok");
                            res.send(note);
                        }
                    });


                })
                .catch(e => {
                    res.status(500).send({ mes: e.mes || "erreur" })
                })
        })

}

module.exports.getZoho = (req, res, next) => {
    zoho.initialize(config).then((client) => {
        client.API.MODULES.get({
            module: 'Contacts',
            Email: "krismarrier@gmail.com",
            // id:"4082318000000224013",
            params: {
                page: 1,
                per_page: 200,

            },
        }).then((response) => {
            res.json(JSON.parse(response.body));
        }).catch(next);
    }).catch(next);
};



module.exports.postZoho = (req, res, next) => {
    zoho.initialize(config).then((client) => {
        client.API.MODULES.post({
            module: 'Contacts',
            body: {
                // Pay ATTENTION! Data is an array!
                data: [
                    {
                        First_Name: "rado",
                        Last_Name: "kham",
                        Email: "rado@gmail.com",
                        Mobile: "032 14 258 79",
                    }
                ],
            },
        }).then((data) => {
            const { datar } = JSON.parse(data.body);

            res.json({ datar });
        });
    });
}


const Profile = require('../Model/model');
var nodemailer = require('nodemailer');
//const mail = require('./mail');

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

                    var smtpTransport = nodemailer.createTransport( {
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
                        text: "hahah"
                    }
                   
                    
                    smtpTransport.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("ok");

                        }
                    });
                    // res.send(note);

                })
                .catch(e => {
                    res.status(500).send({ mes: e.mes || "erreur" })
                })
        })

}

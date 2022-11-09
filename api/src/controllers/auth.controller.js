const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const { MAIL_USER, MAIL_PASSWORD } = process.env;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function sendEmail(email, user) {

    const nodemailer = require("nodemailer");

    let transport = nodemailer.createTransport({
        host: "plesk.ar.conectemos.com",
        port: 587,
        secure: false,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD, // here provide the app password you obtained instead of the user password of your google account.
        },
      });
  
      const mailOptions = {
        from: "noreply@deintimaciones.com",
        to: email,
        subject: "Bienvenido a Media Solution",
        html: `<h1>Estimado ${user},</h1><h3>Su cuenta ha sido registrada correctamente.</h3><p>Saludos, Equipo Media Solution</p>`,
      };
  
      await transport.sendMail(mailOptions); 
  // as I am using a async function I am using the promise pattern, but you can also use callback pattern. 
}

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
            sendEmail(req.body.email, req.body.username)
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
          sendEmail(req.body.email, req.body.username)
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
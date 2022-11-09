const { Router } = require("express");
const userController = require('../controllers/userController');
const {signup, login} = userController;
const userAuth = require('../middleware/userAuth')
const { User } = require("../db.js");
const { MAIL_USER, MAIL_PASSWORD } = process.env;

const router = Router();

const getDbInfo = async () => {
  return await User.findAll();
};

router.get("/users", async (req, res, next) => {
  const { user } = req.query;
  try {
    let allUsers = await getDbInfo();

    if (user) {
      let userName = await allUsers.filter((el) =>
        el.user.toLowerCase().includes(user.toLowerCase())
      );
      userName.length
        ? res.status(200).send(userName)
        : res
            .status(404)
            .send(`Sorry, we don´t have a user with ${user} as User 🤷‍♀️`);
    } else {
      res.status(200).send(allUsers);
    }
  } catch (error) {
    next(error);
  }
});

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

//login route
router.post('/login', login )


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

router.post("/user", async (req, res) => {
  let { user, email, password } = req.body;
  let Users = await getDbInfo();
  let filter = await Users.filter((el) =>
    el.email.toLowerCase().includes(email.toLowerCase())
  );
  if (!filter.length) {
    await User.create({
      user,
      email,
      password,
    });
    res.status(200).send("Usuario creado satisfactoriamente");
    // sendEmail(email, user);
  } else {
    res.status(301).send("El email ya esta en uso");
  }
});

module.exports = router;

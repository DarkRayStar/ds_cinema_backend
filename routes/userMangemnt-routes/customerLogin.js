const router = require("express").Router();
const { User } = require("../../models/userManagement-models/customer.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json("Login Failed. Please re-check your credentials.").status(401);
    }

    //compare Password related to this email
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.json("Login Failed. Please re-check your credentials.").status(401);
    }
    if (validPassword && user) {
      const token = user.generateAuthToken();
      res.json({
        message: "logged in successfully",
        token,
        user,
		status:200
      });
    }
  } catch (error) {
    // res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;

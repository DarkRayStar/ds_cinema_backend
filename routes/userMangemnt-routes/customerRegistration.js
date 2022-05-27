const router = require("express").Router();
const { User, validate } = require("../../models/userManagement-models/customer.model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error){
			// return res.status(400).send({ message: error.details[0].message });
			return res.json('invalid password! (Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters)');
		}
			
		//check requested body email
		const user = await User.findOne({ email: req.body.email });
		if (user){
			return res.json('User with given email already Exist!');
          
		}
			
		//converted into hash password using bcrypt dependency
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save()
		.then(() => res.json('User created successfully! Please login to the system'))
            .catch(err => res.status(400).json('Error: ' + err));

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;



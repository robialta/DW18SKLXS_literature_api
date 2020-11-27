const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const key = "koderahasia";
const joi = require("@hapi/joi");

exports.checkAuth = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
        });
        res.send({
            message: "Successfully load user",
            data: user,
        });
    } catch (err) {
        res.status(400).send({
            err: {
                message: err,
            },
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const schema = joi.object({
            email: joi.string().email().min(10).required(),
            password: joi.string().min(8).required(),
        });

        const { err } = schema.validate(req.body);

        if (err) {
            return res.status(201).send({
                err: {
                    message: err.details[0].message,
                },
            });
        }

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(201).send({
                err: {
                    message: "Email not existed",
                },
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(201).send({
                err: {
                    message: "Incorrect password",
                },
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
            },
            key
        );

        res.status(200).send({
            message: "Login Success",
            data: {
                email: user.email,
                fullName: user.fullName,
                type: user.type,
                token,
            },
        });
    } catch (err) {
        res.status(400).send({
            err: {
                message: err,
            },
        });
    }
};

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, phone, address, gender } = req.body;

        const checkEmail = await User.findOne({
            where: {
                email,
            },
        });

        if (checkEmail) {
            return res.status(2001).send({
                err: {
                    message: "Email already been existed",
                },
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            fullName,
            email,
            address,
            gender,
            phone,
            type: "basic",
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                id: user.id,
            },
            key
        );

        res.status(200).send({
            message: "You has been registered",
            data: {
                email: user.email,
                token,
            },
        });
    } catch (err) {
        res.status(400).send({
            err: {
                message: err,
            },
        });
    }
};

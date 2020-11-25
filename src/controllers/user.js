const { User, Literature, Collection } = require("../../models");

exports.profile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await User.findOne({
            where: {
                id,
            },
        });

        res.send({
            message: "Success",
            data: profile,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Error ${err}`,
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.send({
            message: "Success",
            data: users,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Error ${err}`,
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        await User.update(body, {
            where: {
                id,
            },
        });

        res.send({
            message: "Success",
            data: body,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Error ${err}`,
        });
    }
};

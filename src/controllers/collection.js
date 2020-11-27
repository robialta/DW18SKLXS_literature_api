const { User, Literature, Collection } = require("../../models");

exports.collection = async (req, res) => {
    try {
        const { id } = req.params;
        const collections = await User.findOne({
            where: {
                id,
            },
            include: {
                model: Literature,
                as: "collections",
                through: {
                    model: Collection,
                    attributes: ["id"],
                },
            },
        });

        res.send({
            message: "Success",
            data: collections,
        });
    } catch (err) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

exports.addCollection = async (req, res) => {
    try {
        const body = req.body;
        await Collection.create(body);

        res.send({
            message: "Success",
            data: body,
        });
    } catch (err) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

exports.removeCollection = async (req, res) => {
    try {
        const { id } = req.params;
        await Collection.destroy({
            where: { id },
        });
        res.send({
            message: "Success",
            id: id,
        });
    } catch (err) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

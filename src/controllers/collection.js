const { User, Literature, Collection } = require("../../models");

exports.collection = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Collection.findAll({
            where: {
                userId: id,
            },
            include: {
                model: Literature,
                as: "literature",
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    {
                        model: Collection,
                        as: "collection",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        });

        const collections = data.map((el) => el.literature);

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

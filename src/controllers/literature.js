const { Op } = require("sequelize");
const { User, Literature } = require("../../models");

exports.getLiteratures = async (req, res) => {
    try {
        const literatures = await Literature.findAll({
            attributes: [
                "id",
                "title",
                "publication",
                "pages",
                "isbn",
                "file",
                "status",
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phone",
                        "address",
                        "gender",
                    ],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.send({
            message: "Successfully geting literatures",
            data: {
                literatures,
            },
        });
    } catch (error) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

exports.detailLiterature = async (req, res) => {
    try {
        const { id } = req.params;
        const detailedliterature = await Literature.findOne({
            where: {
                id,
            },
            attributes: [
                "id",
                "title",
                "publication",
                "pages",
                "isbn",
                "file",
                "status",
                "author",
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phone",
                        "address",
                        "gender",
                    ],
                },
            ],
        });
        res.send({
            message: "Successfully get detail literature",
            data: detailedliterature,
        });
    } catch (error) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

exports.addLiterature = async (req, res) => {
    try {
        const body = req.body;
        body.file = req.file.filename;
        body.status = "Waiting to be verified";
        await Literature.create(body);
        res.status(200).send({
            message: "Successfully adding literature",
            data: body,
        });
    } catch (error) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

exports.searchLiterature = async (req, res) => {
    try {
        const { title, public_year } = req.query;

        const literatureFound = await Literature.findAll({
            where: {
                [Op.and]: [
                    {
                        title: {
                            [Op.like]: `%${title}%`,
                        },
                    },
                    {
                        publication: {
                            [Op.like]: `%${public_year}%`,
                        },
                    },
                ],
                status: "Aproved",
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
        });
        res.send({
            message: "Success",
            data: literatureFound,
        });
    } catch (err) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

exports.updateLiterature = async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        await Literature.update(body, {
            where: {
                id,
            },
        });
        res.status(200).send({
            message: "Successfully updating literature",
            data: body,
        });
    } catch (error) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

exports.deleteLiterature = async (req, res) => {
    try {
        const { id } = req.params;
        await Literature.destroy({
            where: {
                id,
            },
        });
        res.send({
            message: "Successfully deleting literature",
            data: {
                id,
            },
        });
    } catch (error) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

exports.myLiteratures = async (req, res) => {
    const { id } = req.params;
    try {
        const myLiteratures = await Literature.findAll({
            where: {
                userId: id,
            },
            attributes: [
                "id",
                "title",
                "publication",
                "pages",
                "isbn",
                "file",
                "status",
                "author",
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ],
        });
        res.status(200).send({
            message: "Succesfully load my literatures",
            data: myLiteratures,
        });
    } catch (error) {
        res.status(400).send({
            error: {
                message: err,
            },
        });
    }
};

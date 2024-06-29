import House from "../models/House";
import User from "../models/User";
import * as Yup from 'yup';

class HouseController {
    async index(req, res) {
        try {
            const { status } = req.body;
            const houses = await House.find({ status });
            return res.json(houses);
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao listar as casas.' });
        }
    }

    async store(req, res) {
        try {
            const schema = Yup.object().shape({
                description: Yup.string().required(),
                price: Yup.number().required(),
                location: Yup.string().required(),
                status: Yup.string().required()
            });

            const { filename } = req.file;
            const { description, price, location, status } = req.body;
            const user_id = req.userId;

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Falha na validação dos campos!' });
            }

            const house = await House.create({
                user: user_id,
                thumbnail: filename,
                description,
                price,
                location,
                status
            });

            return res.json(house);
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao criar uma nova casa.' });
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                description: Yup.string().required(),
                price: Yup.number().required(),
                location: Yup.string().required(),
                status: Yup.string().required()
            });

            const { filename } = req.file;
            const { house_id } = req.params;
            const { description, price, location, status } = req.body;
            const user_id = req.userId;

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Falha na validação dos campos!' });
            }

            const user = await User.findById(user_id);
            const house = await House.findById(house_id);

            if (String(user._id) !== String(house.user)) {
                return res.status(401).json({ error: "Não Autorizado!" });
            }

            await House.updateOne({ _id: house_id }, {
                user: user_id,
                thumbnail: filename,
                description,
                price,
                location,
                status
            });

            return res.json({ ...house.toObject(), thumbnail: filename });
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao atualizar a casa.' });
        }
    }

    async destroy(req, res) {
        try {
            const { house_id } = req.params;
            const user_id = req.userId;

            const user = await User.findById(user_id);
            const house = await House.findById(house_id);

            if (String(user._id) !== String(house.user)) {
                return res.status(401).json({ error: "Não Autorizado!" });
            }

            await House.findByIdAndDelete(house_id);

            return res.json({ message: "Casa excluída com sucesso!" });
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao excluir a casa.' });
        }
    }
}

export default new HouseController();

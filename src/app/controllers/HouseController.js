import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

class HouseController {
  async index(req, res) {
    try {
      const { status } = req.query;
      const houses = await House.findAll({ status });
      return res.json(houses);
    } catch (err) {
      console.error('Erro ao listar as casas:', err);
      return res.status(400).json({ error: 'Erro ao listar as casas.' });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        description: Yup.string().required(),
        price: Yup.number().required(),
        location: Yup.string().required(),
        status: Yup.string().required(),
      });

      const { filename } = req.file;
      const { description, price, location, status } = req.body;

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação dos campos!' });
      }

      const house = await House.create({
        user: req.userId,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      });

      return res.json(house);
    } catch (err) {
      console.error('Erro ao criar uma nova casa:', err);
      return res.status(400).json({ error: 'Erro ao criar uma nova casa.' });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        description: Yup.string().required(),
        price: Yup.number().required(),
        location: Yup.string().required(),
        status: Yup.string().required(),
      });

      const { filename } = req.file;
      const { house_id } = req.params;
      const { description, price, location, status } = req.body;

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação dos campos!' });
      }

      const house = await House.findByPk(house_id);

      if (!house) {
        return res.status(400).json({ error: 'Casa não encontrada.' });
      }

      if (house.userId !== req.userId) {
        return res.status(401).json({ error: 'Não autorizado.' });
      }

      await house.update({
        user: req.userId,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      });

      return res.json({ ...house.toJSON(), thumbnail: filename });
    } catch (err) {
      console.error('Erro ao atualizar a casa:', err);
      return res.status(400).json({ error: 'Erro ao atualizar a casa.' });
    }
  }

  async destroy(req, res) {
    try {
      const { house_id } = req.params;

      const house = await House.findByPk(house_id);

      if (!house) {
        return res.status(400).json({ error: 'Casa não encontrada.' });
      }

      if (house.userId !== req.userId) {
        return res.status(401).json({ error: 'Não autorizado.' });
      }

      await house.destroy();

      return res.json({ message: 'Casa excluída com sucesso!' });
    } catch (err) {
      console.error('Erro ao excluir a casa:', err);
      return res.status(400).json({ error: 'Erro ao excluir a casa.' });
    }
  }
}

export default new HouseController();

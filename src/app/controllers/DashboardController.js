import House from '../models/House';

class DashboardController {
  async show(req, res) {
    try {
      const houses = await House.findAll({ where: { userId: req.userId } });

      return res.json(houses);
    } catch (err) {
      console.error('Erro ao listar as casas do usuário:', err);
      return res.status(400).json({ error: 'Erro ao listar as casas.' });
    }
  }
}

export default new DashboardController();

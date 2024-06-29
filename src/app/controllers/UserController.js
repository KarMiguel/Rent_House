import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório.'),
      email: Yup.string().email('E-mail inválido.').required('O e-mail é obrigatório.'),
      password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres.').required('A senha é obrigatória.'),
    });

    try {
      const { name, email, password } = req.body;

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Credenciais Inválidas!' });
      }

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(409).json({ error: 'Usuário já existe.' });
      }

      const user = await User.create({ name, email, password });

      return res.json(user);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).json({ error: 'Falha na validação dos campos!', messages: err.errors });
      }
      console.error('Erro ao criar usuário:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
  }
}

export default new UserController();

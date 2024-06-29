import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import mailer from '../../config/mailer';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      console.error('Erro ao autenticar usuário:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
      }

      // Gerar token de redefinição de senha com validade de 1 hora
      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1); // Token válido por 1 hora

      await User.update(
        {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
        { where: { id: user.id } }
      );

      // Enviar email com o token de redefinição de senha
      await mailer.sendMail({
        to: email,
        from: 'seu-email@dominio.com', // Substitua pelo seu email
        subject: 'Recuperação de senha',
        text: `Utilize este código para redefinir sua senha: ${token}`,
      });

      return res.json({ message: 'Email enviado com instruções para redefinição de senha.' });
    } catch (err) {
      console.error('Erro ao enviar email de recuperação de senha:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async resetPassword(req, res) {
    const { email, token, newPassword } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
      }

      if (token !== user.passwordResetToken) {
        return res.status(401).json({ error: 'Token inválido.' });
      }

      const now = new Date();
      if (now > user.passwordResetExpires) {
        return res.status(401).json({ error: 'Token expirado, solicite um novo.' });
      }

      // Atualizar senha
      const hashedPassword = await bcrypt.hash(newPassword, 8);

      await User.update(
        {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        },
        { where: { id: user.id } }
      );

      return res.json({ message: 'Senha redefinida com sucesso.' });
    } catch (err) {
      console.error('Erro ao redefinir senha:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new SessionController();

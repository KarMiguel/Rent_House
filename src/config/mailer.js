import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.seuservidor.com',
  port: 587,
  secure: false,
  auth: {
    user: 'seu-email@dominio.com', // Seu email
    pass: 'sua-senha-de-email', // Sua senha de email
  },
});

export default transporter;

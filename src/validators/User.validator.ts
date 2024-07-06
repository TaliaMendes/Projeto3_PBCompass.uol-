import { z } from 'zod';

const majority = (dataNascimento: string) => {
  const dataMinima = new Date();
  dataMinima.setFullYear(dataMinima.getFullYear() - 18);
  const birthDate = new Date(dataNascimento);
  return birthDate <= dataMinima;
};

const userSchema = z.object({
  name: z.string().min(1),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).min(1),
  birth: z.string()
  .regex(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'Formato inválido (esperado: YYYY/MM/DD)'
  })
  .refine(majority, {
    message: 'User must be at least 18 years old ',
  }),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).min(1),
  password: z.string().min(6),
  cep: z.string().regex(/^\d{5}-\d{3}$/),
  qualified: z.enum(['sim', 'não']),
});

export { userSchema };
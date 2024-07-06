import { z } from 'zod';

const ReserveSchema = z.object({
  id_user: z.string(),
  start_date: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'Formato inválido (esperado: YYYY/MM/DD)'
  }),
  end_date: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'Formato inválido (esperado: YYYY/MM/DD)'
  }),
  id_car: z.string()
});

export { ReserveSchema };
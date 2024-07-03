import { z } from 'zod';

const accessorySchema = z.object({
  description: z.string().min(1, { message: 'Accessory description is required' })
});

const carSchema = z.object({
  model: z.string().min(1, { message: 'Model is required' }),
  color: z.string().min(1, { message: 'Color is required' }),
  year: z
    .string()
    .refine((val) => {
      const year = parseInt(val, 10);
      return year >= 1950 && year <= 2023;
    }, { message: 'Year must be between 1950 and 2023' })
    .transform((val) => val.trim())  
    .optional() 
    .default(''), 
  value_per_day: z.number().positive({ message: 'Value per day must be a positive number' }),
  accessories: z
    .array(accessorySchema)
    .min(1, { message: 'At least one accessory is required' })
    .refine((accessories) => {
      const descriptions = accessories.map((a) => a.description);
      return descriptions.length === new Set(descriptions).size;
    }, 'Each accessory must be unique'),
  number_of_passengers: z.number().positive({ message: 'Number of passengers must be a positive number' })
});

export { carSchema };

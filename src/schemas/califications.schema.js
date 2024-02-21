import { z } from 'zod';

export const createCalificationSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido',
    }),
    calification: z.string({
        required_error: 'La nota es requerida',
    }),
    comment: z.string({
        required_error: 'El comentario es requerido',
    }),
    
});


import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  phone: z
    .string({
      required_error: "El número de teléfono es requerido",
    })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Este campo solo debe contener números",
    }),
  identificationNumber: z
    .string({
      required_error: "El número de identificación es requerido",
    })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Este campo solo debe contener números",
    }),
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  role: z
    .string({
      required_error: "El rol es requerido",
    })
    .refine((value) => ["student", "teacher", "admin"].includes(value), {
      message: "Rol no válido",
    }),
  programs: z.array(z.string()).default([]),

});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "correo invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe de tener minimo 6 caracteres",
    }),
});

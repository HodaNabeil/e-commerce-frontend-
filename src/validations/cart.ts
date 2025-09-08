import z from "zod";

export const shippingFSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required and must be more than 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits")
    .max(12, "Phone number must be between 7 and 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z
    .string()
    .min(5, "Address is required and must be more than 5 characters"),
  city: z.string().min(2, "City is required"),

});

export type ShippingFormValues = z.infer<typeof shippingFSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required"),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits")
    .regex(/^\d+$/, "Card number must contain only digits"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format"
    ),
  cvv: z
    .string()
    .min(3, "CVV must be 3 digits")
    .max(3, "CVV must be 3 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

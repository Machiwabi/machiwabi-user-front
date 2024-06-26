import { z } from 'zod'

const schema = {
  iconImageUrl: z.string().optional(),
  displayName: z
    .string()
    .min(1, 'ニックネームは1文字以上入力してください。')
    .max(100, 'ニックネームは100文字以内で入力してください。')
    .nullable()
    .refine((value) => value !== null, 'ニックネームは必須です。'),
}

export { schema as editNoEmailUserSchema }

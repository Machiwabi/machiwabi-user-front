import { z } from 'zod'

const schema = {
  iconImageUrl: z
    .string()
    .nullable()
    .refine((value) => value !== null, 'アイコン画像のURLは必須です。'),
  displayName: z
    .string()
    .min(1, 'ニックネームは1文字以上入力してください。')
    .max(100, 'ニックネームは100文字以内で入力してください。')
    .nullable()
    .refine((value) => value !== null, 'ニックネームは必須です。'),
  email: z.string().email('メールアドレスの形式が正しくありません。'),
}

export { schema as editUserSchema }

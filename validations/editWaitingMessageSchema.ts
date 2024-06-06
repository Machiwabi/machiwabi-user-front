import { z } from 'zod'

const schema = {
  waitingMessage: z
    .string()
    .max(256, 'メッセージは256文字以内で入力してください')
    .optional(),
}

export { schema as editWaitingMessageSchema }

import { z } from 'zod'

const schema = {
  content: z.string().url(),
}

export { schema as missionUrlPostSchema }

import { z } from 'zod'

const urlRegex =
  /^((http|https):\/\/)?(www.)?(([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))*$/

export const urlSchemaOptional = z
  .string()
  .optional()
  .nullable()
  .refine(
    (value) => {
      if (typeof value === 'undefined' || value === null || value === '') {
        return true
      }

      return urlRegex.test(value)
    },
    {
      message: 'Invalid URL',
    }
  )

export const urlSchemaRequire = z.string().refine(
  (value) => {
    return urlRegex.test(value)
  },
  {
    message: 'Invalid URL',
  }
)

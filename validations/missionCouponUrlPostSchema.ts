import { z } from 'zod'

const schema = {
  couponCode: z.string().length(5),
}

export { schema as missionCouponUrlPostSchema }

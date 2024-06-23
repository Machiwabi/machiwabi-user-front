import { EventEntity } from '../../generated/graphql'

export class EventService {
  constructor(private event: EventEntity) {}

  public eventStarted(baseDate: Date = new Date()) {
    return new Date(this.event.startAt) > baseDate
  }

  public eventEnded(baseDate: Date = new Date()) {
    return new Date(this.event.endAt) < baseDate
  }
}

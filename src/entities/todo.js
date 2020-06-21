import { format, fromUnixTime } from 'date-fns'

export class Todo {
  constructor(body, completed, createdAt, id = null) {
    if (id) {
      this.id = id
    }
    this.body = body
    this.completed = completed
    this.createdAt = createdAt
  }
  getFormattedDate() {
    return format(fromUnixTime(this.createdAt / 1000), 'dd/MM/yyyy')
  }
}

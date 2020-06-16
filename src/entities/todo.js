export class Todo {
  constructor(body, completed, createdAt, id = null) {
    if (id) {
      this.id = id
    }
    this.body = body
    this.completed = completed
    this.createdAt = createdAt
  }
}

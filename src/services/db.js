import Dexies from 'dexie'
import config from '../config.js'

export class Database {
  constructor(version, entities) {
    this.db = new Dexies(config.dbName)
    this.db.version(version).stores(entities)
  }
  openDb() {
    return new Promise((resolve, reject) => {
      this.db
        .open()
        .then(resolve)
        .catch(err => {
          reject(err)
          throw new Error(err)
        })
    })
  }
  get(entity) {
    return new Promise((resolve, reject) => {
      this.db[entity]
        .toArray()
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
          throw new Error(err)
        })
    })
  }
  create(entity, data) {
    return new Promise((resolve, reject) => {
      this.db[entity]
        .put(data)
        .then(createdValue => {
          resolve(createdValue)
        })
        .catch(err => {
          reject(err)
          throw new Error(err)
        })
    })
  }
  update(entity, data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      this.db[entity]
        .where('id')
        .equals(data.id)
        .modify(data)
        .then(deletedValue => {
          resolve(deletedValue)
        })
        .catch(err => {
          reject(err)
          throw new Error(err)
        })
    })
  }
  delete(entity, id) {
    return new Promise((resolve, reject) => {
      this.db[entity]
        .where('id')
        .equals(id)
        .delete()
        .then(deletedValue => {
          resolve(deletedValue)
        })
        .catch(err => {
          reject(err)
          throw new Error(err)
        })
    })
  }
}

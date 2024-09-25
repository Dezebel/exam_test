import { model, Schema, Types } from 'mongoose'

export type User = {
  _id: Types.ObjectId
  username: string
  password: string
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

const UserModel = model<User>('User', userSchema)

export async function getUserById(id: string | Types.ObjectId) {
  return await UserModel.findById(id).lean()
}

export async function getUserByUsername(username: string) {
  return UserModel.findOne({ username }).lean()
}

export async function createUser(user: Omit<User, '_id'>) {
  return await UserModel.create(user)
}

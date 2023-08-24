import mongoose from "mongoose";
import { Password } from "../service/password";

// O que é necessario para criar um usuario
interface UserAttrs {
  name: string;
  username: string;
  email: string;
  password: string;
}

//propriedades que um unico usuario tem
interface UserDoc extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  acesso?: boolean;
  isEmailVerified?: boolean;
}

// metodos asociados ao model usuario
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "CPF não pode ficar vazio"],
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      private: true, // used by the toJSON plugin
    },
    //   role: {
    //     type: String,
    //     enum: roles,
    //     default: 'user',
    //   },
    acesso: { type: Boolean, default: false },
    habilitado: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      //removendo algumas propriedades de respota para melhor sincronização com
      //outros microserviços
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

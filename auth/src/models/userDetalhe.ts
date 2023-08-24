import mongoose from "mongoose";

// O que é necessario para criar um usuario
interface UserDetalheAttrs {
  name: string;
  username: string;
  email: string;
  password: string;
}

//propriedades que um unico usuario tem
interface UserDetalheDoc extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  acesso?: boolean;
  isEmailVerified?: boolean;
}

// metodos asociados ao model usuario
interface UserDetalheModel extends mongoose.Model<UserDetalheDoc> {
  build(attrs: UserDetalheAttrs): UserDetalheDoc;
}

const userDetalheSchema = new mongoose.Schema(
  {
    matricula: {
      type: Number,
      required: true,
      trim: true,
    },
    nomePai: {
      type: String,
      required: true,
      trim: true,
    },
    nomeMae: {
      type: String,
      required: true,
      trim: true,
    },
    sexo: {
      type: String,
      required: true,
      enum: ["MASCULINO", "FEMININO"],
    },
    naturalidade: {
      type: String,
      required: true,
    },
    nacionalidade: {
      type: String,
      required: true,
    },
    rg: {
      type: String,
      required: true,
    },
    tipoSanguineo: {
      type: String,
      required: false,
    },
    dtNascimento: {
      type: Date,
      required: true,
    },
    estadoCivil: {
      type: String,
      required: true,
    },
    etinia: {
      type: String,
      required: true,
    },
    deficiencia: {
      type: String,
      required: true,
    },
    paisOrigem: {
      type: String,
      required: true,
    },
    dtAdmissao: {
      type: String,
      required: true,
    },
    escolaridade: {
      type: String,
      required: true,
    },
    idConjugue: {
      type: String,
      required: true,
    },
    filho: {
      type: String,
      required: true,
    },
    endereco: {
      type: String,
      required: true,
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

userDetalheSchema.statics.build = (attrs: UserDetalheAttrs) => {
  return new UserDetalhe(attrs);
};

const UserDetalhe = mongoose.model<UserDetalheDoc, UserDetalheModel>(
  "UserDetalhe",
  userDetalheSchema
);

export { UserDetalhe };

import { Model, Column, Table, PrimaryKey, DataType, Unique} from "sequelize-typescript";

@Table({
  tableName: 'User',
  timestamps: false,
  comment: 'Таблица для авторизации пользователей'
})
export default class User extends Model {

  @PrimaryKey
  @Unique
  @Column({
    type: DataType.STRING
  })
  user_id!: string;

  @Column({
    type: DataType.STRING
  })
  password!: string;

  @Column({
    type: DataType.STRING
  })
  full_name!: string;

  @Column({
    type: DataType.STRING
  })
  job_title!: string;


  // @BelongsToMany(() => Case, { through: () => User_Case })
  // cases!: Case[];
}
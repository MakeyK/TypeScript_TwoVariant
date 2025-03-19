import { Model, Column, Table, PrimaryKey, DataType, ForeignKey, AutoIncrement, BelongsTo, HasMany } from "sequelize-typescript";
import User from "./User.model";
import Files from "./Files.model";

@Table({
    tableName: 'Message',
    timestamps: false,
    comment: 'Сообщение'
})
export default class Message extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    message_id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING
    })
    sender!: string;
    @BelongsTo(() => User, { foreignKey: "sender", as: "sender_login" })
    user_sender!: User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING
    })
    recipient!: string;
    @BelongsTo(() => User, { foreignKey: "recipient", as: "recipient_login" })
    user_recipient!: User;

    @Column({
        type: DataType.DATE
    })
    message_send_date!: Date;

    @Column({
        type: DataType.DATE
    })
    message_get_date!: Date;

    @Column({
        type: DataType.STRING
    })
    title!: string;

    @Column({
        type: DataType.TEXT
    })
    text!: string;

    @HasMany(() => Files)
    applications?: Files[];

}

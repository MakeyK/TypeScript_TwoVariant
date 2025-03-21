import { Model, Column, Table, DataType, ForeignKey, BelongsTo, PrimaryKey } from "sequelize-typescript";
import Message from "./Message.model";

@Table({
    tableName: 'Files',
    timestamps: false,
    comment: 'Отправляемые файлы'
})
export default class Files extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    file_id!: number;

    @Column({
        type: DataType.STRING
    })
    title!: string;

    @Column({
        type: DataType.STRING
    })
    url!: string;

    @ForeignKey(() => Message)
    @Column({
        type: DataType.INTEGER
    })
    message_code?: number;

    @BelongsTo(() => Message)
    message!: Message;
}
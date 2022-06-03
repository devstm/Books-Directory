import { Table, Column, Model,  DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript'
const {STRING, INTEGER} = DataType;

@Table
class authors extends Model {
  @Column(STRING)
    name: string| undefined;

  @Column(STRING)
  email: string | undefined;
}
export default authors;
import { Table, Column, Model,  DataType } from 'sequelize-typescript'
const {STRING} = DataType;

@Table
class authors extends Model {
  @Column(STRING)
    name: string| undefined;

  @Column(STRING)
  email: string | undefined;
}
export default authors;

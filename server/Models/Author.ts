import { Table, Column, Model,  DataType, AutoIncrement, PrimaryKey } from 'sequelize-typescript'
import { Optional } from 'sequelize'
const {STRING, INTEGER} = DataType;

type Author = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
interface AuthorsModel extends Optional<Author, 'id'> {}

@Table
class authors extends Model<Author, AuthorsModel> {
  @Column(STRING)
    name: string| undefined;

  @Column(STRING)
  email: string | undefined;
}
export default authors;

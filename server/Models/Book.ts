import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import authors from './Author';
const { STRING, INTEGER } = DataType;

@Table
class books extends Model {
  @Column(STRING)
  name: string | undefined;

  @Column(STRING)
  type: string | undefined;

  @Column(STRING)
  date: string | undefined;

  @Column(INTEGER)
  edition: number | undefined;

  @ForeignKey(() => authors)
  @Column(INTEGER)
  author_id: number | undefined;

  @BelongsTo(() => authors)
    author: any;
}
export default books;

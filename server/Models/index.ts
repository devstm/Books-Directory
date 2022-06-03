import { Sequelize } from 'sequelize-typescript'
import authors from './Author'

const sequelize = new Sequelize({
  database: 'book_directory',
  dialect: 'mysql',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [__dirname + '/Models']
})
sequelize.addModels([authors])

export default sequelize;
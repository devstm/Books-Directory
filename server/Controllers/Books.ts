import { NextFunction, Response, Request } from 'express';
import { Op } from 'sequelize';
import sequelize from '../Models';
import { idValidation, queryValidation } from '../Utils/Validations/authors';
import { errorMiddleware } from '../Utils/middle';
import {
  createBookValidation,
  updateBookValidation,
} from '../Utils/Validations/books';
import { CustomError } from '../Utils/errors';
const { books, authors } = sequelize.models;

const include = [
  {
    model: authors,
    attributes: ['id', 'name', 'email'],
  },
];

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1 } = await queryValidation.validateAsync(req.query);
    const { count, rows } = await books.findAndCountAll({
      limit: 5,
      offset: (page - 1) * 5,
      include,
    });
    res.json({
      msg: `books in page no. ${page}`,
      count,
      data: rows,
    });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await idValidation.validateAsync(req.params);
    const book = await books.findByPk(id, { include });
    if (!book) {
      throw new CustomError('Author not found', 400);
    }
    res.json({ msg: 'author information', data: book });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await createBookValidation.validateAsync(req.body);
    const author = await books.create(validatedData);
    res.json({ msg: 'Book Created Successfully', data: author });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const ValidatedData = await updateBookValidation.validateAsync({
      ...body,
      id,
    });
    const book = await books.update(ValidatedData, { where: { id } });
    if (book[0] === 0) throw new Error('Book not found');
    res.json({ msg: 'Book updated' });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await idValidation.validateAsync(req.params);
    const book = await books.destroy({
      where: { id },
    });
    if (book === 0) throw new Error('Book not found');
    res.json({ msg: 'Book deleted' });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const getBooksByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = await queryValidation.validateAsync(req.query);
    const { count, rows } = await books.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include,
    });
    res.json({ msg: 'books information', count, data: rows });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const getBooksByAuthorName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, page = 1 } = await queryValidation.validateAsync(req.query);
    const { count, rows } = await books.findAndCountAll({
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: authors,
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
        },
      ],
    });
    res.json({ msg: 'books information', count, data: rows });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

export {
  index,
  show,
  create,
  update,
  destroy,
  getBooksByName,
  getBooksByAuthorName,
};

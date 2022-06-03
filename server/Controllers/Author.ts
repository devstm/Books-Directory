import { NextFunction, Response, Request } from 'express';
import { Op } from 'sequelize';
import sequelize from '../Models';
import {
  idValidation,
  queryValidation,
  createValidation,
  updateValidation,
} from '../Utils/Validations/authors';
import { errorMiddleware } from '../Middleware/middle';
import { CustomError } from '../Utils/Errors/custumError';

const { authors } = sequelize.models;

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1 } = await queryValidation.validateAsync(req.query);
    const { count, rows } = await authors.findAndCountAll({
      limit: 5,
      offset: (page - 1) * 5,
    });
    res.json({
      msg: `authors in page no. ${page}`,
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
    const author = await authors.findByPk(id);
    if (!author) {
      throw new CustomError('Author not found', 400);
    }
    res.json({ msg: 'author information', data: author });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = await createValidation.validateAsync(req.body);
    const checkAuthor = await authors.findOne({
      where: { email },
    });
    if (checkAuthor) {
      throw new CustomError('Author already exists', 400);
    }
    const author = await authors.create({
      name,
      email,
    });
    res.json({ msg: 'author created', data: author });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, email } = await updateValidation.validateAsync({
      ...req.body,
      id: req.params.id,
    });
    const author = await authors.update({ name, email }, { where: { id } });
    if (author[0] === 0) throw new CustomError('Author not found', 400);
    res.json({ msg: 'author updated' });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await idValidation.validateAsync(req.params);
    const auth = await authors.destroy({ where: { id } });
    if (auth === 0) throw new CustomError('Author not found', 400);
    res.json({ msg: 'Author Deleted' });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const getAuthorByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = await queryValidation.validateAsync(req.query);
    const { count, rows } = await authors.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    res.json({ msg: 'author information', count, data: rows });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

export { index, show, create, update, destroy, getAuthorByName };

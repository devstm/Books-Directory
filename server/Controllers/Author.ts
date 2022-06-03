import { NextFunction, Response, Request } from 'express';
import { Op } from 'sequelize';
import sequelize from '../Models';
import {
  idValidation,
  queryValidation,
  createValidation,
  updateValidation,
} from '../Utils/Validations/authors';
import { errorMiddleware } from '../Utils/middle';

const { authors } = sequelize.models;

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1 } = await queryValidation.validateAsync(req.query);
    const { count, rows } = await authors.findAndCountAll({
      limit: 5,
      offset: (page - 1) * 5,
    });
    const numberOfPages: number = Math.ceil(count / 5);
    res.json({
      msg: `authors in page no. ${page}`,
      count,
      numberOfPages: numberOfPages,
      data: rows,
    });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await idValidation.validateAsync(req.params);
    const author = await sequelize.models.authors.findByPk(id);
    if (!author) {
      throw new Error('Author not found');
    }
    res.json({ msg: 'author information', data: author });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = await createValidation.validateAsync(req.body);
    const checkAuthor = await sequelize.models.authors.findOne({
      where: {
        email,
      },
    });
    if (checkAuthor) {
      throw new Error('Author already exists');
    }
    const author = await sequelize.models.authors.create({
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
    const checkAuthor: any = await sequelize.models.authors.findByPk(id);
    if (!checkAuthor) {
      throw new Error('Author not found');
    }
    const checkEmail = await sequelize.models.authors.findOne({
      where: { email },
    });
    if (checkEmail) {
      throw new Error('email is already exists');
    }
    const author = await sequelize.models.authors.update(
      {
        name,
        email,
      },
      {
        where: { id },
      }
    );
    res.json({ msg: 'author updated', data: author });
  } catch (error: any) {
    errorMiddleware(error, next);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await idValidation.validateAsync(req.params);
    const author = await sequelize.models.authors.findByPk(id);
    if (!author) {
      throw new Error('Author not found');
    }
    await sequelize.models.authors.destroy({
      where: { id },
    });
    res.json({ msg: 'author deleted' });
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
    const { count, rows } = await sequelize.models.authors.findAndCountAll({
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

export { 
  index,
  show,
  create,
  update,
  destroy,
  getAuthorByName 
};

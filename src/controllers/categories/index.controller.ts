/* ---------- External ---------- */
import { Request, Response } from 'express';

/* ---------- Common ---------- */
import { logger } from '../../common/utils/logs';
import { is_hex_color } from '../../common/utils/functions/is_hex_color';

/* ---------- Repositories ---------- */
import { categories_repository } from '../../repositories/categories/categories.repository';

/**
 * @description Get all categories from the database
 * @returns
 */
const get_all_categories = async (
  _: Request,
  response: Response,
): Promise<Response> => {
  try {
    const categories = await categories_repository.get_all_categories();

    return response.status(200).json({
      categories,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at "get_all_categories" method');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

/**
 * @description Create a new category
 * @param request
 * @param response
 */
const create_category = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { name, color } = request.body;

    if (!name || !color || !is_hex_color(color)) {
      return response.status(400).json({
        code: '400',
        message: 'Required params are missing.',
      });
    }

    const category = await categories_repository.get_category_by_name({ name });

    if (category) {
      return response.status(400).json({
        code: '400',
        message: 'Category already exists',
      });
    }

    const created_category = await categories_repository.create_category({
      name,
      color,
    });

    return response.status(201).json({
      category: created_category,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at "create_category" method');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

/**
 * @description Delete a category
 * @param request
 * @param response
 */
const delete_category = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { category_id } = request.params;

    if (!category_id) {
      return response.status(400).json({
        code: '400',
        message: 'Required params are missing.',
      });
    }

    const category = await categories_repository.get_category_by_id({
      category_id: Number(category_id),
    });

    if (!category) {
      return response.status(400).json({
        code: '404',
        message: 'Category not found',
      });
    }

    await categories_repository.delete_category({
      category_id: Number(category_id),
    });

    return response.status(204).json({
      category: category,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at "delete_category" method');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

/**
 * @description Create a new category
 * @param request
 * @param response
 */
const update_category = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { name, color } = request.body;
    const { category_id } = request.params;

    if (!category_id || !name || !color || !is_hex_color(color)) {
      return response.status(400).json({
        code: '400',
        message: 'Required params are missing.',
      });
    }

    const category = await categories_repository.get_category_by_id({
      category_id: Number(category_id),
    });

    if (!category) {
      return response.status(400).json({
        code: '404',
        message: 'Category not found',
      });
    }

    category.category_name = name;
    category.category_color = color;

    await categories_repository.update_category({
      category_id: Number(category_id),
      name,
      color,
    });

    return response.status(201).json({
      category: category,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at "update_category" method');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

const categories_controller = {
  get_all_categories,
  create_category,
  delete_category,
  update_category,
};

export { categories_controller };

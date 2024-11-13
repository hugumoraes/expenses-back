/* ---------- External ---------- */

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { Category } from '../../models/category/category.entity';

/* ---------- Types ---------- */
import {
  CreateCategory,
  DeleteCategory,
  GetCategoryById,
  GetCategoryByName,
  UpdateCategory,
} from './categories.types';

const category_repository = PostgresDataSource.getRepository(Category);

/**
 *
 * @description Get all categories from the database
 * @returns {Promise<Category[]>} List of categories
 */
const get_all_categories = async (): Promise<Category[]> => {
  const categories = await category_repository.find();

  return categories;
};

/**
 * @description Get a category by its name
 * @param {string} name
 * @returns {Promise<Category>} Category
 */
const get_category_by_name = async ({
  name,
}: GetCategoryByName): Promise<Category | null> => {
  const category = await category_repository.findOne({
    where: {
      category_name: name,
    },
  });

  return category;
};

/**
 * @description Create a new category
 * @param {string} name
 * @param {string} color
 * @returns {Promise<Category>} New category
 */
const create_category = async ({
  name,
  color,
}: CreateCategory): Promise<Category> => {
  const category = category_repository.create({
    category_name: name,
    category_color: color,
  });

  await category_repository.save(category);

  return category;
};

/**
 * @description Get a category by its id
 * @param {number} id
 * @returns {Promise<Category>} Category
 */
const get_category_by_id = async ({
  id,
}: GetCategoryById): Promise<Category | null> => {
  const category = await category_repository.findOne({
    where: {
      category_id: id,
    },
  });

  return category;
};

/**
 * @description Delete an existing category
 * @param {number} id
 * @returns {Promise<void>} Updated category
 */
const delete_category = async ({ id }: DeleteCategory): Promise<void> => {
  await category_repository.delete({ category_id: id });
};

/**
 * @description Update an existing category
 * @param {number} id
 * @param {string} name
 * @param {string} color
 * @returns {Promise<void>} Updated category
 */
const update_category = async ({
  id,
  name,
  color,
}: UpdateCategory): Promise<void> => {
  await category_repository.update(
    { category_id: id },
    {
      category_name: name,
      category_color: color,
    },
  );
};

const categories_repository = {
  get_all_categories,
  get_category_by_name,
  get_category_by_id,
  create_category,
  delete_category,
  update_category,
};

export { categories_repository };

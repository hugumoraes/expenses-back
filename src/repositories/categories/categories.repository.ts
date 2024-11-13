/* ---------- External ---------- */

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { Category } from '../../models/category/category.entity';

/* ---------- Types ---------- */
import { CreateCategory, GetCategoryByName } from './categories.types';

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

const categories_repository = {
  get_all_categories,
  get_category_by_name,
  create_category,
};

export { categories_repository };

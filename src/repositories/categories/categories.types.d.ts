export interface CreateCategory {
  name: string;
  color: string;
}

export interface DeleteCategory {
  category_id: number;
}

export interface UpdateCategory {
  category_id: number;
  name: string;
  color: string;
}

export interface GetCategoryByName {
  name: string;
}

export interface GetCategoryById {
  category_id: number;
}

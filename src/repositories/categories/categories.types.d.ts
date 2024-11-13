export interface CreateCategory {
  name: string;
  color: string;
}

export interface DeleteCategory {
  id: number;
}

export interface UpdateCategory {
  id: number;
  name: string;
  color: string;
}

export interface GetCategoryByName {
  name: string;
}

export interface GetCategoryById {
  id: number;
}

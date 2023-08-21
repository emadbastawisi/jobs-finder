import { category } from './category.model'

export interface CategoriesState {
  categories: category[];
  error: string | null;
  status: "loading" | "success" | "error"
}
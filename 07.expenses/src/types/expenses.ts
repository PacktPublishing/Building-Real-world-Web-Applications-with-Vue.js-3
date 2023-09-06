import type { Category } from './categories';
export interface Expense {
    id?: string | undefined;
    amount: number;
    description: string;
    created_at?: Date | undefined;
    profile_id?: string | undefined;
    category_id?: string | undefined;
}

export interface ExpenseWithCategory extends Expense {
    categories: Category;
}
interface Tab {
  title: string;
}

export interface TabsProps {
  tabs: Array<Tab>;
}

export type AlertVariantType = "info" | "error" | "success" | "default";

export interface AuthUser {
  name: string;
  avatar?: string | null;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}
export interface Task {
  id: number;
  name: string;
  due_date: string;
  category_id: number;
  user_id: number;
  status: boolean;
  description: string;
  created_at: string;
  category?: Category;
}

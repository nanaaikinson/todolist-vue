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

interface Tab {
  title: string;
}

export interface TabsProps {
  tabs: Array<Tab>;
}

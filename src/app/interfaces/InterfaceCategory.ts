export interface InterfaceCategory {
  id: string | number | null;
  created_at?: Date;
  updated_at?: Date;
  order: number;
  name: string;
  description?: string;
}
export interface InterfaceCategoryCapabilityLevel {
  id: string | number | null;
  created_at?: Date;
  updated_at?: Date;
  category_id: string | number | null;
  category_capability_id: string | number | null;
  level: number;
  value: string;
  description?: string;
}

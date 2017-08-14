export interface InterfaceCategoryCapabilityLevel {
  id: string | null;
  created_at?: Date;
  updated_at?: Date;
  category_id: string | null;
  category_capability_id: string | null;
  level: number;
  value: string;
  description?: string;
}

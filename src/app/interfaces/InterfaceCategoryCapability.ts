export interface InterfaceCategoryCapability {
  id: string | number | null;
  created_at?: Date;
  updated_at?: Date;
  category_id: string | number | null;
  minimum_category_capability_level_id: string | number | null;
  name: string;
  description?: string;
}

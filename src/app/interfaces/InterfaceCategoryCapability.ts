export interface InterfaceCategoryCapability {
  id: string | null;
  created_at?: Date;
  updated_at?: Date;
  category_id: string | null;
  minimum_category_capability_level_id: number | null;
  name: string;
  description?: string;
}

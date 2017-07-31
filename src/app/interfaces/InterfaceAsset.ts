export interface InterfaceAsset {
  id?: string | number | null;
  created_at?: Date;
  updated_at?: Date;
  asset_type_id: string | number | null;
  name: string;
  description?: string;
}

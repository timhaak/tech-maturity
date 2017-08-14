export interface InterfaceAsset {
  id?: string | null;
  created_at?: Date;
  updated_at?: Date;
  asset_type_id: string | null;
  name: string;
  description?: string;
}

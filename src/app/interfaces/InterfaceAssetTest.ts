export interface InterfaceAssetTest {
  id?: string | null;
  created_at?: Date;
  updated_at?: Date;
  asset_id: string;
  answered_count: number;
  capabilities: {[category_capability_id: string]: string};
}

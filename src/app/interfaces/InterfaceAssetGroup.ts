export interface InterfaceAssetGroup {
  id?: string | null;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  assets: string[];
  sub_groups: string[];
}

export interface IProductResult {
  product_id: number;
  sku: string;
  title: string;
  url_key: string;
  has_variants: boolean;
  item_id: number;
  commodity_group: {
    group_id: number;
    title: string;
    type: string;
    track_inventory: boolean;
  };
  price: {
    value: number;
    min: number;
    max: number;
    old: null;
    old_min: number;
    old_max: number;
    currency_alias: 'vnd';
  };
  props: {
    available_qty: number;
    country_of_origin: null;
    extra: null;
    size: {
      weight: number;
    };
  };
  default_category: {
    category_id: number;
    title: string;
    url_key: string;
  };
  images: [];
  labels: object;
  sort_price: string;
  sort_in_stock: number;
  status: 'published';
  deleted_at: false;
  in_stock: boolean;
}

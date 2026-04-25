import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type MarketplaceItem = Tables<"marketplace_items">;
export type MarketplaceItemInsert = TablesInsert<"marketplace_items">;

const MARKETPLACE_COLUMNS =
  "id,user_id,title,price,category,condition,dorm,seller,phone,description,image_url,status,created_at,updated_at";

export async function fetchMarketplaceItems() {
  const { data, error } = await supabase
    .from("marketplace_items")
    .select(MARKETPLACE_COLUMNS)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function fetchMarketplaceItem(id: string) {
  const { data, error } = await supabase
    .from("marketplace_items")
    .select(MARKETPLACE_COLUMNS)
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createMarketplaceItem(item: MarketplaceItemInsert) {
  const { data, error } = await supabase
    .from("marketplace_items")
    .insert(item)
    .select(MARKETPLACE_COLUMNS)
    .single();

  if (error) throw error;
  return data;
}

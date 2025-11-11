// src/lib/supabaseClient.ts
import { createClient as createSbClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 전역에서 재사용할 정적 클라이언트
export const supabase = createSbClient(url, anon);

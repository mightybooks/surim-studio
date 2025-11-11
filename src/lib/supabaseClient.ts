// src/lib/supabaseClient.ts
import { createClient as createSbClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 1) 정적 인스턴스: API 라우트에서 `import { supabase } ...` 로 씁니다.
export const supabase = createSbClient(url, anon);

// 2) 호환용 헬퍼: 클라이언트 컴포넌트에서 쓰던 패턴 유지
export function createClient() {
  return supabase;
}

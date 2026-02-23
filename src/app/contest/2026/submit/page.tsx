import AccessRequiredCard from "@/components/auth/AccessRequiredCard";
import ContestSubmitForm from "@/components/contest/ContestSubmitForm";
import { supabaseServerPublic } from "@/lib/supabase/server-public";

export default async function ContestSubmitPage() {
  const supabase = supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const next = "/contest/2026/submit";

  if (!user) {
    return <AccessRequiredCard mode="login" next={next} />;
  }

  if (!user.email_confirmed_at) {
    return <AccessRequiredCard mode="verify" next={next} />;
  }

  return <ContestSubmitForm />;
}

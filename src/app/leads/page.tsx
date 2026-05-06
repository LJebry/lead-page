import { createSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  source: string;
  created_at: string;
};

function formatSubmittedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function LeadsPage() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("id, name, email, company, source, created_at")
    .order("created_at", { ascending: false })
    .returns<LeadRow[]>();
  const leads = data ?? [];

  if (error) {
    console.error("Failed to load leads", error);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Internal view
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          Submitted leads
        </h1>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {error ? (
              <tr>
                <td className="px-4 py-6 text-red-600" colSpan={5}>
                  Unable to load leads right now.
                </td>
              </tr>
            ) : null}

            {!error && leads.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  No leads submitted yet.
                </td>
              </tr>
            ) : null}

            {!error
              ? leads.map((lead) => (
                  <tr key={lead.id} className="text-slate-700">
                    <td className="px-4 py-3 font-medium text-slate-950">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3">{lead.email}</td>
                    <td className="px-4 py-3">{lead.company || "-"}</td>
                    <td className="px-4 py-3">{lead.source}</td>
                    <td className="px-4 py-3">
                      {formatSubmittedDate(lead.created_at)}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}

import type { Lead } from "@/types/lead";

const placeholderLeads: Lead[] = [];

export default function LeadsPage() {
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

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
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
            {placeholderLeads.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  TODO: Fetch leads from Supabase server-side and sort newest
                  first.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}

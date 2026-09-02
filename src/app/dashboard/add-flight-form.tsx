import { addFlight } from "./actions";

/**
 * The "log a flight" form. Also yours to write.
 *
 * This is a Server Component containing a plain <form>. No "use client", no
 * useState — the browser POSTs to the action and Next.js re-renders the page.
 */
export function AddFlightForm() {
  return (
    <form action={addFlight} className="flex flex-col gap-2">
      <input type="text" name="origin" placeholder="BOS" className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm uppercase placeholder:text-zinc-600"/>
      <input type="text" name="destination" placeholder="NRT" className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm uppercase placeholder:text-zinc-600"/>
      <input type="date" name="departureDate" placeholder="mm/dd/yyyy" className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-600"/>
      <input type="text" name="airlineName" placeholder="jet blue" className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-600"/>
      <button type="submit" className="rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900">
        log flight
      </button>
    </form>
  );
}

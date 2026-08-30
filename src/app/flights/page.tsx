import { prisma } from "@/lib/prisma";
import { addFlight } from "./actions";

const SEED_USER_EMAIL = "louie.q@northeastern.edu";

export default async function FlightsPage() {
  const flights = await prisma.flight.findMany({
    where: { trip: { user: { email: SEED_USER_EMAIL } } },
    include: { airline: true },
    orderBy: { departureDate: "desc" },
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-16">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
        Flight Log
      </h1>

      <form action={addFlight} className="flex flex-col gap-3">
        <input
          name="origin"
          placeholder="Origin (e.g. BOS)"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <input
          name="destination"
          placeholder="Destination (e.g. NRT)"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <input
          name="departureDate"
          type="date"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <input
          name="airlineName"
          placeholder="Airline (optional)"
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        >
          Add flight
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {flights.length === 0 && (
          <li className="text-zinc-500 dark:text-zinc-400">
            No flights logged yet.
          </li>
        )}
        {flights.map((flight) => (
          <li
            key={flight.id}
            className="rounded border border-zinc-300 px-4 py-2 dark:border-zinc-700"
          >
            {flight.origin} → {flight.destination} on{" "}
            {flight.departureDate.toLocaleDateString()}
            {flight.airline ? ` · ${flight.airline.name}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

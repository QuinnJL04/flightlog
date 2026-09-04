import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/session";
import { signOut } from "@/app/auth/actions";
import { TripLog, type TripLogFlight } from "./trip-log";
import { AddFlightForm } from "./add-flight-form";

export default async function DashboardPage() {
  // The check lives HERE, next to the data it guards. There is no proxy file
  // anymore — it was deleted along with Clerk. A check in the proxy can drift
  // from how Next.js actually routes a request; a check on the line above the
  // query cannot. This only protects the page: addFlight in actions.ts is a
  // separate public POST endpoint and needs its own check.
  const user = await requireCurrentUser();

  const flights = await prisma.flight.findMany({
    where: { trip: { userId: user.id } },
    include: { airline: true },
    orderBy: { departureDate: "desc" },
  });

  // Reshape the database rows into exactly what the UI needs. Keeping this
  // translation here means TripLog doesn't have to know Prisma exists, and
  // changing the schema later won't ripple into every component.
  const logFlights: TripLogFlight[] = flights.map((flight) => ({
    id: flight.id,
    origin: flight.origin,
    destination: flight.destination,
    departureDate: flight.departureDate,
    airlineName: flight.airline?.name ?? null,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <span className="font-board text-xl tracking-widest">FLIGHTLOG</span>
        <form action={signOut}>
          <button
            type="submit"
            className="text-xs tracking-widest text-zinc-500 hover:text-zinc-200"
          >
            SIGN OUT
          </button>
        </form>
      </header>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[380px_1fr]">
        <aside className="flex flex-col gap-6 border-b border-zinc-800 p-6 lg:border-r lg:border-b-0">
          <AddFlightForm />
          <TripLog flights={logFlights} />
        </aside>

        <main className="flex items-center justify-center p-6">
          {/* Placeholder until the globe lands. */}
          <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded border border-dashed border-zinc-800 text-zinc-600">
            map goes here
          </div>
        </main>
      </div>

      <section className="border-t border-zinc-800 px-6 py-4">
        <h2 className="font-board text-sm tracking-widest text-zinc-500">
          PLANNED TRIPS
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Fare search lands after the map.
        </p>
      </section>
    </div>
  );
}

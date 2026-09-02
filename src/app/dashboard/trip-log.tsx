/**
 * The departure-board style list of your logged flights.
 *
 * This file is yours to write. The types and the shell are here; the JSX
 * inside the TODOs is not.
 */

// The shape of one row, defined by what the UI needs — not by the database.
// `page.tsx` is responsible for producing this shape.
export type TripLogFlight = {
  id: string;
  origin: string;
  destination: string;
  departureDate: Date;
  airlineName: string | null;
};

// Props are just a function parameter. This annotation says "this component
// must be given a `flights` array, and nothing else".
type TripLogProps = {
  flights: TripLogFlight[];
};

export function TripLog({ flights }: TripLogProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-board text-sm tracking-widest text-zinc-500">
        MY TRIPS
      </h2>

      {
        flights.length === 0 && (
          <p> No flights logged yet </p>
        )
      }

      {
      flights.length > 0 && (
        <ul className="flex flex-col gap-3">
        {flights.map((flight) => {
            return (<FlightRow key={flight.id} flight={flight}/>)
          })}
        </ul>
      )
      }
    </div>
  );
}

function FlightRow({ flight }: { flight: TripLogFlight }) {
  return (
    <li className="flex flex-col gap-1">
      <p className="text-xs text-zinc-500">
        {flight.departureDate.toLocaleDateString()}
      </p>
      <p className="font-board text-lg tracking-widest text-zinc-100">
        {flight.origin} → {flight.destination}
      </p>
      <p className="text-xs">
        {flight.airlineName ?? "Unavailable"}
      </p>
    </li>
  ); 
}

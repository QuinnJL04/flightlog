"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/user";

async function getOrCreateDefaultTrip(userId: string) {
  const existingTrip = await prisma.trip.findFirst({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
  if (existingTrip) return existingTrip;

  return prisma.trip.create({
    data: { name: "My Flights", userId },
  });
}

export async function addFlight(formData: FormData): Promise<void> {
  // THE important line. A Server Action compiles to a public POST endpoint —
  // anyone can curl it without ever loading your page. Middleware protects
  // /dashboard, but it does not protect this function. Every exported action
  // has to establish who the caller is, itself, before touching the database.
  const user = await requireCurrentUser();

  const origin = formData.get("origin");
  const destination = formData.get("destination");
  const departureDate = formData.get("departureDate");
  const airlineName = formData.get("airlineName");

  if (
    typeof origin !== "string" ||
    typeof destination !== "string" ||
    typeof departureDate !== "string" ||
    !origin ||
    !destination ||
    !departureDate
  ) {
    throw new Error("Origin, destination, and departure date are required.");
  }

  const trip = await getOrCreateDefaultTrip(user.id);

  let airlineId: string | undefined;
  if (typeof airlineName === "string" && airlineName.trim()) {
    const airline = await prisma.airline.upsert({
      where: { name: airlineName.trim() },
      update: {},
      create: { name: airlineName.trim() },
    });
    airlineId = airline.id;
  }

  await prisma.flight.create({
    data: {
      origin: origin.trim().toUpperCase(),
      destination: destination.trim().toUpperCase(),
      // Bug #10 from the last lesson, fixed. `new Date("2026-09-01")` parses
      // as midnight UTC, which is the previous evening in Boston — so the log
      // showed the day before. Appending a time forces local-midnight parsing.
      departureDate: new Date(`${departureDate}T00:00:00`),
      tripId: trip.id,
      airlineId,
    },
  });

  revalidatePath("/dashboard");
}

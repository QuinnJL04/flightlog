"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// No auth yet (Phase 6), so every flight belongs to this one seeded user.
const SEED_USER_EMAIL = "louie.q@northeastern.edu";

async function getOrCreateDefaultTrip() {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: SEED_USER_EMAIL },
  });

  const existingTrip = await prisma.trip.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  if (existingTrip) {
    return existingTrip;
  }

  return prisma.trip.create({
    data: { name: "My Flights", userId: user.id },
  });
}

export async function addFlight(formData: FormData): Promise<void> {
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

  const trip = await getOrCreateDefaultTrip();

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
      departureDate: new Date(departureDate),
      tripId: trip.id,
      airlineId,
    },
  });

  revalidatePath("/flights");
}

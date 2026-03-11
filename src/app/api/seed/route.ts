export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import Aircraft from "@/models/Aircraft";
import Flight from "@/models/Flight";
import Booking from "@/models/Booking";
import Crew from "@/models/Crew";
import PromoCode from "@/models/PromoCode";
import Notification from "@/models/Notification";

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Aircraft.deleteMany({}),
      Flight.deleteMany({}),
      Booking.deleteMany({}),
      Crew.deleteMany({}),
      PromoCode.deleteMany({}),
      Notification.deleteMany({}),
    ]);

    // ── Users ──
    const users = await User.create([
      {
        email: "admin@atfjets.com",
        password: "Admin@2026!",
        firstName: "Robert",
        lastName: "Wellington",
        role: "superadmin",
        isVerified: true,
        loyaltyTier: "diamond",
        loyaltyPoints: 750000,
      },
      {
        email: "christian.maier@email.com",
        password: "Maier@1965!",
        firstName: "Christian",
        lastName: "Maier",
        role: "customer",
        isVerified: true,
        dateOfBirth: new Date("1965-12-08"),
        nationality: "DE",
        phone: "+49 89 1234 5678",
        passportNumber: "C01RF2K47",
        passportExpiry: new Date("2030-06-15"),
        address: {
          street: "Maximilianstrasse 42",
          city: "Munich",
          state: "Bavaria",
          country: "Germany",
          zip: "80539",
        },
        loyaltyTier: "platinum",
        loyaltyPoints: 0,
        totalFlights: 0,
        totalSpent: 0,
      },
      {
        email: "captain@atfjets.com",
        password: "Pilot@2026!",
        firstName: "James",
        lastName: "Harrison",
        role: "pilot",
        isVerified: true,
      },
      {
        email: "crew@atfjets.com",
        password: "Crew@2026!",
        firstName: "Emma",
        lastName: "Williams",
        role: "crew",
        isVerified: true,
      },
    ]);
    const christian = users[1];

    // ── 6 Private Jets ──
    const jets = await Aircraft.create([
      {
        registration: "ATF-CX-01", name: "Cessna Citation X", manufacturer: "Cessna", model: "Citation X",
        category: "midsize-jet", type: "private-jet", status: "active",
        specs: { maxPassengers: 12, maxRange: 3460, cruiseSpeed: 507, maxSpeed: 528, ceilingAltitude: 51000, cabinWidth: 1.68, cabinLength: 7.67, cabinHeight: 1.73, baggageCapacity: 2.3 },
        seatConfiguration: [{ class: "first", seats: 12, layout: "club", pitch: "N/A", features: ["Wi-Fi", "Refreshment Center", "Club Seating", "Lavatory"] }],
        amenities: ["Wi-Fi", "Refreshment Center", "Lavatory", "Club Seating"],
        hourlyRate: 4800, yearManufactured: 2019, totalFlightHours: 3200, homeBase: "TEB", isAvailable: true, images: ["/images/fleet/citation-x.jpg"],
      },
      {
        registration: "ATF-CH350-01", name: "Bombardier Challenger 350", manufacturer: "Bombardier", model: "Challenger 350",
        category: "super-midsize", type: "private-jet", status: "active",
        specs: { maxPassengers: 10, maxRange: 3200, cruiseSpeed: 470, maxSpeed: 495, ceilingAltitude: 45000, cabinWidth: 2.19, cabinLength: 8.72, cabinHeight: 1.83, baggageCapacity: 3.1 },
        seatConfiguration: [{ class: "first", seats: 10, layout: "club", pitch: "N/A", features: ["Wi-Fi", "Full Galley", "Flat-Floor Cabin", "In-Flight Baggage Access"] }],
        amenities: ["Wi-Fi", "Full Galley", "Flat-Floor Cabin", "Lavatory", "Baggage Accessible In-Flight"],
        hourlyRate: 5500, yearManufactured: 2021, totalFlightHours: 1800, homeBase: "LHR", isAvailable: true, images: ["/images/fleet/challenger-350.jpg"],
      },
      {
        registration: "ATF-G650-01", name: "Gulfstream G650", manufacturer: "Gulfstream", model: "G650",
        category: "ultra-long-range", type: "private-jet", status: "active",
        specs: { maxPassengers: 18, maxRange: 7000, cruiseSpeed: 488, maxSpeed: 516, ceilingAltitude: 51000, cabinWidth: 2.59, cabinLength: 16.33, cabinHeight: 1.95, baggageCapacity: 5.5 },
        seatConfiguration: [{ class: "first", seats: 18, layout: "club", pitch: "N/A", features: ["Ka-band Wi-Fi", "Master Suite", "Shower", "Conference Area", "Entertainment System"] }],
        amenities: ["Ka-band Wi-Fi", "Full Galley", "Master Suite", "Shower", "Conference Area", "Entertainment System"],
        hourlyRate: 11000, yearManufactured: 2022, totalFlightHours: 1400, homeBase: "DXB", isAvailable: true, images: ["/images/fleet/g650.jpg"],
      },
      {
        registration: "ATF-F8X-01", name: "Dassault Falcon 8X", manufacturer: "Dassault", model: "Falcon 8X",
        category: "heavy-jet", type: "private-jet", status: "active",
        specs: { maxPassengers: 16, maxRange: 6450, cruiseSpeed: 460, maxSpeed: 500, ceilingAltitude: 51000, cabinWidth: 2.34, cabinLength: 13.0, cabinHeight: 1.88, baggageCapacity: 4.0 },
        seatConfiguration: [{ class: "first", seats: 16, layout: "club", pitch: "N/A", features: ["Wi-Fi", "Three Lounge Areas", "Crew Rest", "Skylight"] }],
        amenities: ["Wi-Fi", "Full Galley", "Three Lounge Areas", "Crew Rest Area", "Skylight"],
        hourlyRate: 9200, yearManufactured: 2020, totalFlightHours: 2200, homeBase: "CDG", isAvailable: true, images: ["/images/fleet/falcon-8x.jpg"],
      },
      {
        registration: "ATF-P600-01", name: "Embraer Praetor 600", manufacturer: "Embraer", model: "Praetor 600",
        category: "super-midsize", type: "private-jet", status: "active",
        specs: { maxPassengers: 12, maxRange: 4018, cruiseSpeed: 466, maxSpeed: 504, ceilingAltitude: 45000, cabinWidth: 2.08, cabinLength: 8.23, cabinHeight: 1.83, baggageCapacity: 3.8 },
        seatConfiguration: [{ class: "first", seats: 12, layout: "club", pitch: "N/A", features: ["Wi-Fi", "Full Galley", "Flat-Floor Cabin", "Stone Floor Lavatory"] }],
        amenities: ["Wi-Fi", "Full Galley", "Flat-Floor Cabin", "Stone Floor Lavatory", "Valence Interior"],
        hourlyRate: 5800, yearManufactured: 2023, totalFlightHours: 900, homeBase: "JFK", isAvailable: true, images: ["/images/fleet/praetor-600.jpg"],
      },
      {
        registration: "ATF-G7500-01", name: "Bombardier Global 7500", manufacturer: "Bombardier", model: "Global 7500",
        category: "ultra-long-range", type: "private-jet", status: "active",
        specs: { maxPassengers: 17, maxRange: 7700, cruiseSpeed: 488, maxSpeed: 516, ceilingAltitude: 51000, cabinWidth: 2.44, cabinLength: 16.6, cabinHeight: 1.88, baggageCapacity: 5.0 },
        seatConfiguration: [{ class: "first", seats: 17, layout: "club", pitch: "N/A", features: ["Four Living Spaces", "Full Kitchen", "Master Suite", "Shower", "Crew Suite"] }],
        amenities: ["Ka-band Wi-Fi", "Four Living Spaces", "Full Kitchen", "Master Suite", "Shower", "Crew Suite"],
        hourlyRate: 12500, yearManufactured: 2023, totalFlightHours: 600, homeBase: "ZRH", isAvailable: true, images: ["/images/fleet/global-7500.jpg"],
      },
    ]);

    // ── Crew ──
    await Crew.create([
      {
        user: users[2]._id, employeeId: "ATF-CPT-001", role: "captain", status: "available",
        certifications: [{ name: "ATPL", issuedBy: "CAA", issuedDate: new Date("2015-01-15"), expiryDate: new Date("2027-01-15"), number: "ATPL-88821" }],
        aircraftRatings: ["Gulfstream G650", "Bombardier Global 7500", "Dassault Falcon 8X"],
        totalFlightHours: 12500, monthlyFlightHours: 45, maxMonthlyHours: 100, homeBase: "LHR",
        contactEmergency: { name: "Margaret Harrison", relation: "Spouse", phone: "+44 7700 900123" }, schedule: [],
      },
      {
        user: users[3]._id, employeeId: "ATF-FA-001", role: "purser", status: "available",
        certifications: [{ name: "Cabin Safety Certificate", issuedBy: "CAA", issuedDate: new Date("2019-06-01"), expiryDate: new Date("2026-06-01"), number: "CSC-45521" }],
        aircraftRatings: ["Gulfstream G650", "Bombardier Global 7500", "Cessna Citation X"],
        totalFlightHours: 6200, monthlyFlightHours: 60, maxMonthlyHours: 100, homeBase: "LHR",
        contactEmergency: { name: "David Williams", relation: "Father", phone: "+44 7700 900456" }, schedule: [],
      },
    ]);

    // ── Past Travel History ──
    const pastTrips = [
      { num: "ATF 7001", date: "2024-03-15", depCode: "DXB", depCity: "Dubai", depCountry: "UAE", depTz: "Asia/Dubai", arrCode: "LHR", arrCity: "London", arrCountry: "United Kingdom", arrTz: "Europe/London", dur: 420, dist: 5500, jetIdx: 2, hours: 7, payMethod: "card" as const },
      { num: "ATF 7002", date: "2024-05-22", depCode: "JFK", depCity: "New York", depCountry: "United States", depTz: "America/New_York", arrCode: "MIA", arrCity: "Miami", arrCountry: "United States", arrTz: "America/New_York", dur: 180, dist: 1750, jetIdx: 0, hours: 3, payMethod: "bank_transfer" as const },
      { num: "ATF 7003", date: "2024-08-10", depCode: "CDG", depCity: "Paris", depCountry: "France", depTz: "Europe/Paris", arrCode: "GVA", arrCity: "Geneva", arrCountry: "Switzerland", arrTz: "Europe/Zurich", dur: 60, dist: 410, jetIdx: 1, hours: 1, payMethod: "card" as const },
      { num: "ATF 7004", date: "2024-10-05", depCode: "LHR", depCity: "London", depCountry: "United Kingdom", depTz: "Europe/London", arrCode: "DXB", arrCity: "Dubai", arrCountry: "UAE", arrTz: "Asia/Dubai", dur: 420, dist: 5500, jetIdx: 3, hours: 7, payMethod: "card" as const },
      { num: "ATF 7005", date: "2024-12-20", depCode: "ZRH", depCity: "Zurich", depCountry: "Switzerland", depTz: "Europe/Zurich", arrCode: "MLE", arrCity: "Male", arrCountry: "Maldives", arrTz: "Indian/Maldives", dur: 540, dist: 7600, jetIdx: 5, hours: 9, payMethod: "bank_transfer" as const },
      { num: "ATF 7006", date: "2025-02-14", depCode: "JFK", depCity: "New York", depCountry: "United States", depTz: "America/New_York", arrCode: "NCE", arrCity: "Nice", arrCountry: "France", arrTz: "Europe/Paris", dur: 480, dist: 5800, jetIdx: 4, hours: 8, payMethod: "card" as const },
      { num: "ATF 7007", date: "2025-05-01", depCode: "SIN", depCity: "Singapore", depCountry: "Singapore", depTz: "Asia/Singapore", arrCode: "NRT", arrCity: "Tokyo", arrCountry: "Japan", arrTz: "Asia/Tokyo", dur: 420, dist: 5300, jetIdx: 2, hours: 7, payMethod: "bank_transfer" as const },
      { num: "ATF 7008", date: "2025-08-18", depCode: "MUC", depCity: "Munich", depCountry: "Germany", depTz: "Europe/Berlin", arrCode: "IST", arrCity: "Istanbul", arrCountry: "Turkey", arrTz: "Europe/Istanbul", dur: 180, dist: 1550, jetIdx: 0, hours: 3, payMethod: "card" as const },
      { num: "ATF 7009", date: "2025-11-10", depCode: "LHR", depCity: "London", depCountry: "United Kingdom", depTz: "Europe/London", arrCode: "JFK", arrCity: "New York", arrCountry: "United States", arrTz: "America/New_York", dur: 480, dist: 5500, jetIdx: 5, hours: 8, payMethod: "bank_transfer" as const },
      { num: "ATF 7010", date: "2026-01-25", depCode: "CDG", depCity: "Paris", depCountry: "France", depTz: "Europe/Paris", arrCode: "DXB", arrCity: "Dubai", arrCountry: "UAE", arrTz: "Asia/Dubai", dur: 420, dist: 5200, jetIdx: 3, hours: 7, payMethod: "card" as const },
    ];

    let totalSpent = 0;
    let totalPoints = 0;

    for (const trip of pastTrips) {
      const jet = jets[trip.jetIdx];
      const baseFare = trip.hours * jet.hourlyRate;
      const taxes = Math.round(baseFare * 0.12 * 100) / 100;
      const surcharges = Math.round(baseFare * 0.03 * 100) / 100;
      const total = Math.round((baseFare + taxes + surcharges) * 100) / 100;
      const pointsEarned = Math.floor(total * 10 * 2);

      const depDate = new Date(trip.date + "T08:00:00Z");
      const arrDate = new Date(depDate.getTime() + trip.dur * 60 * 1000);

      const flight = await Flight.create({
        flightNumber: trip.num, type: "private-jet", airline: "ATF Jets",
        departure: { airport: trip.depCity + " International", airportCode: trip.depCode, city: trip.depCity, country: trip.depCountry, terminal: "Private", gate: "FBO", scheduledTime: depDate, actualTime: depDate, timezone: trip.depTz },
        arrival: { airport: trip.arrCity + " International", airportCode: trip.arrCode, city: trip.arrCity, country: trip.arrCountry, terminal: "Private", scheduledTime: arrDate, actualTime: arrDate, timezone: trip.arrTz },
        duration: trip.dur, distance: trip.dist, status: "arrived", aircraft: jet._id,
        seatMap: [{ class: "first", rows: 1, seatsPerRow: jet.specs.maxPassengers, totalSeats: jet.specs.maxPassengers, availableSeats: 0, price: baseFare, layout: "club" }],
        amenities: jet.amenities, baggageAllowance: { cabin: { weight: 15, pieces: 2 }, checked: { weight: 50, pieces: 3 } }, stops: 0, isActive: false,
      });

      const bookingRef = "ATF-" + trip.num.replace("ATF ", "") + "BK";
      const txnId = "TXN-" + trip.date.replace(/-/g, "") + "-" + Math.floor(Math.random() * 9000 + 1000);

      await Booking.create({
        bookingReference: bookingRef, user: christian._id,
        flights: [{ flight: flight._id, direction: "outbound" }],
        passengers: [{ firstName: "Christian", lastName: "Maier", email: "christian.maier@email.com", dateOfBirth: new Date("1965-12-08"), nationality: "DE", passportNumber: "C01RF2K47", seatNumber: "1A", mealPreference: "standard" }],
        cabinClass: "first", status: "completed",
        payment: { method: trip.payMethod, status: "completed", transactionId: txnId, paidAt: depDate, breakdown: { baseFare, taxes, surcharges, discount: 0, loyaltyPointsUsed: 0, total } },
        totalAmount: total,
        addOns: { extraBaggage: false, seatSelection: true, loungeAccess: true, travelInsurance: true, priorityBoarding: true, mealUpgrade: true },
        loyaltyPointsEarned: pointsEarned,
        checkInTime: new Date(depDate.getTime() - 2 * 60 * 60 * 1000),
        boardingPassGenerated: true, eTicketSent: true,
      });

      totalSpent += total;
      totalPoints += pointsEarned;
    }

    await User.findByIdAndUpdate(christian._id, { totalFlights: 10, totalSpent: Math.round(totalSpent * 100) / 100, loyaltyPoints: totalPoints });

    // ── Future Flights ──
    const now = new Date();
    const makeTime = (daysAhead: number, h: number, m: number) => {
      const dt = new Date(now);
      dt.setDate(dt.getDate() + daysAhead);
      dt.setHours(h, m, 0, 0);
      return dt;
    };

    const futureFlights = [
      { num: "ATF 8001", dep: { code: "LHR", city: "London", country: "United Kingdom", tz: "Europe/London" }, arr: { code: "DXB", city: "Dubai", country: "UAE", tz: "Asia/Dubai" }, dur: 420, dist: 5500, dTime: makeTime(3, 9, 0), jetIdx: 5, hours: 7 },
      { num: "ATF 8002", dep: { code: "JFK", city: "New York", country: "United States", tz: "America/New_York" }, arr: { code: "LAX", city: "Los Angeles", country: "United States", tz: "America/Los_Angeles" }, dur: 330, dist: 3980, dTime: makeTime(5, 11, 0), jetIdx: 0, hours: 5.5 },
      { num: "ATF 8003", dep: { code: "CDG", city: "Paris", country: "France", tz: "Europe/Paris" }, arr: { code: "ZRH", city: "Zurich", country: "Switzerland", tz: "Europe/Zurich" }, dur: 75, dist: 490, dTime: makeTime(8, 7, 30), jetIdx: 1, hours: 1.25 },
      { num: "ATF 8004", dep: { code: "DXB", city: "Dubai", country: "UAE", tz: "Asia/Dubai" }, arr: { code: "SIN", city: "Singapore", country: "Singapore", tz: "Asia/Singapore" }, dur: 420, dist: 5800, dTime: makeTime(12, 22, 0), jetIdx: 2, hours: 7 },
      { num: "ATF 8005", dep: { code: "MUC", city: "Munich", country: "Germany", tz: "Europe/Berlin" }, arr: { code: "LHR", city: "London", country: "United Kingdom", tz: "Europe/London" }, dur: 120, dist: 920, dTime: makeTime(18, 14, 0), jetIdx: 4, hours: 2 },
    ];

    for (const f of futureFlights) {
      const jet = jets[f.jetIdx];
      const arrTime = new Date(f.dTime.getTime() + f.dur * 60 * 1000);
      const price = Math.round(f.hours * jet.hourlyRate);

      await Flight.create({
        flightNumber: f.num, type: "private-jet", airline: "ATF Jets",
        departure: { airport: f.dep.city + " International", airportCode: f.dep.code, city: f.dep.city, country: f.dep.country, terminal: "Private", gate: "FBO", scheduledTime: f.dTime, timezone: f.dep.tz },
        arrival: { airport: f.arr.city + " International", airportCode: f.arr.code, city: f.arr.city, country: f.arr.country, terminal: "Private", scheduledTime: arrTime, timezone: f.arr.tz },
        duration: f.dur, distance: f.dist, status: "scheduled", aircraft: jet._id,
        seatMap: [{ class: "first", rows: 1, seatsPerRow: jet.specs.maxPassengers, totalSeats: jet.specs.maxPassengers, availableSeats: jet.specs.maxPassengers, price, layout: "club" }],
        amenities: jet.amenities, baggageAllowance: { cabin: { weight: 15, pieces: 2 }, checked: { weight: 50, pieces: 3 } }, stops: 0, isActive: true,
      });
    }

    // ── Promo Codes ──
    await PromoCode.create([
      { code: "WELCOME20", description: "20% off first charter", type: "percentage", value: 20, maxUses: 1000, usedCount: 0, validFrom: new Date(), validUntil: new Date("2026-12-31"), applicableTo: ["private-jet"], applicableCabins: ["first"], isActive: true },
      { code: "CHARTER500", description: "$500 off any charter over $5,000", type: "fixed", value: 500, maxUses: 100, usedCount: 0, minBookingAmount: 5000, validFrom: new Date(), validUntil: new Date("2026-06-30"), applicableTo: ["private-jet"], applicableCabins: ["first"], isActive: true },
      { code: "ATFJETS10", description: "10% loyalty discount", type: "percentage", value: 10, maxUses: 5000, usedCount: 0, validFrom: new Date(), validUntil: new Date("2026-12-31"), applicableTo: ["private-jet"], applicableCabins: ["first"], isActive: true },
    ]);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      data: {
        users: 4,
        jets: 6,
        pastBookings: 10,
        futureFlights: 5,
        promoCodes: 3,
        christianMaier: { totalSpent: Math.round(totalSpent), loyaltyPoints: totalPoints },
        logins: {
          admin: "admin@atfjets.com / Admin@2026!",
          customer: "christian.maier@email.com / Maier@1965!",
        },
      },
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message || "Seed failed" }, { status: 500 });
  }
}

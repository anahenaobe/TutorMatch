import { bookingsMock } from "./mockData.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage.js";

const BOOKINGS_KEY = "bookings";

export function getBookings() {
  return loadFromLocalStorage(BOOKINGS_KEY, bookingsMock);
}

export function saveBookings(bookings) {
  saveToLocalStorage(BOOKINGS_KEY, bookings);
}

export function createBooking({ tutorId, studentId, date, time }) {
  const bookings = getBookings();

  const duplicate = bookings.find(
    (booking) =>
      booking.tutorId === tutorId &&
      booking.date === date &&
      booking.time === time &&
      booking.status !== "cancelled"
  );

  if (duplicate) {
    return {
      success: false,
      message: "Ya existe una reserva para ese tutor ese dia y hora"
    };
  }

  const newBooking = {
    id: `b${Date.now()}`,
    tutorId,
    studentId,
    date,
    time,
    status: "pending"
  };

  const updated = [...bookings, newBooking];
  saveBookings(updated);

  return { success: true, booking: newBooking };
}

export function cancelBooking(bookingId) {
  const bookings = getBookings();

  const updated = bookings.map((booking) =>
    booking.id === bookingId
      ? { ...booking, status: "cancelled" }
      : booking
  );

  saveBookings(updated);
  return updated;
}
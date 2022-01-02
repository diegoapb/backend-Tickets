import { Event, Ticket } from "./Model";

export class MissingFieldError extends Error {}

export function validateAsEventEntry(arg: any) {
  if (!(arg as Event).title) {
    throw new MissingFieldError("Value for title required!");
  }
  if (!(arg as Event).location) {
    throw new MissingFieldError("Value for location required!");
  }
  if (!(arg as Event).date) {
    throw new MissingFieldError("Value for date required!");
  }
  if (!(arg as Event).eventId) {
    throw new MissingFieldError("Value for eventId required!");
  }
}
export function validateAsTicketEntry(arg: any) {
  if (!(arg as Ticket).typeTicket) {
    throw new MissingFieldError("Value for typeTicket required!");
  }
  if (!(arg as Ticket).description) {
    throw new MissingFieldError("Value for description required!");
  }
  if (!(arg as Ticket).price) {
    throw new MissingFieldError("Value for price required!");
  }
  if (!(arg as Ticket).ticketId) {
    throw new MissingFieldError("Value for ticketId required!");
  }
}

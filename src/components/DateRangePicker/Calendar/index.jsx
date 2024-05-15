import React, { useState, useEffect, useCallback } from "react";
import {
  format,
  parseISO,
  isBefore,
  isSameDay,
  isAfter,
  startOfDay,
  getDaysInMonth,
  addMonths,
  subMonths,
  addDays,
  subDays,
} from "date-fns";

const Calendar = ({
  bookings,
  onDateChange,
  priceChange,
  maxGuests,
  guests,
  setGuests,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = startOfDay(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveringDate, setHoveringDate] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      onDateChange(startDate.toISOString(), endDate.toISOString());
    }
  }, [startDate, endDate]);

  const daysInMonth = Array.from(
    { length: getDaysInMonth(currentDate) },
    (_, i) => {
      const dayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i + 1
      );
      return {
        day: i + 1,
        date: startOfDay(dayDate),
      };
    }
  );

  const unavailableDays = bookings.map((booking) => ({
    start: startOfDay(parseISO(booking.dateFrom)),
    end: startOfDay(parseISO(booking.dateTo)),
  }));

  const isUnavailable = useCallback(
    (date) => {
      if (isBefore(date, today)) return true;
      return unavailableDays.some(
        ({ start, end }) =>
          isAfter(startOfDay(date), subDays(startOfDay(start), 1)) &&
          isBefore(startOfDay(date), addDays(startOfDay(end), 1))
      );
    },
    [today, unavailableDays]
  );

  const selectDate = (date) => {
    if (!isUnavailable(date) && !isBefore(date, today)) {
      if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setEndDate(null);
        setHoveringDate(null);
      } else if (isAfter(date, startDate)) {
        setEndDate(date);
        setHoveringDate(null);
      }
    }
  };

  const hoverDate = (date) => {
    if (
      startDate &&
      !endDate &&
      isAfter(date, startDate) &&
      !isUnavailable(date)
    ) {
      setHoveringDate(date);
    } else {
      setHoveringDate(null);
    }
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleGuestChange = (e) => setGuests(e.target.value);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center gap-3 my-3">
        <button
          type="button"
          className="btn btn-primary w-25"
          onClick={prevMonth}
        >
          &lt;
        </button>
        <span className="text-center w-50">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <button
          type="button"
          className="btn btn-primary w-25"
          onClick={nextMonth}
        >
          &gt;
        </button>
      </div>
      <div
        className="mb-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
          cursor: "pointer",
        }}
      >
        {daysInMonth.map(({ day, date }) => {
          const isPast = isBefore(date, today);
          const isToday = isSameDay(date, today);
          const isSelected =
            (startDate && isSameDay(date, startDate)) ||
            (endDate && isSameDay(date, endDate));
          const isInRange =
            (startDate &&
              hoveringDate &&
              isAfter(date, startDate) &&
              isBefore(date, startOfDay(hoveringDate))) ||
            (startDate &&
              endDate &&
              isAfter(date, startDate) &&
              isBefore(date, endDate));
          const isHovering = hoveringDate && isSameDay(date, hoveringDate);
          const unavailable = isUnavailable(date);

          return (
            <div
              key={day}
              onMouseEnter={() => hoverDate(date)}
              onClick={() => selectDate(date)}
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "5px",
                backgroundColor: isSelected
                  ? endDate
                    ? "#0d6efd"
                    : "#add8e6"
                  : isInRange
                  ? "#d3d3d3"
                  : isHovering
                  ? "#add8e6"
                  : isToday
                  ? "#0d6efd"
                  : unavailable
                  ? isPast
                    ? "#e0e0e0"
                    : "#f8d7da"
                  : "#d4edda",
                color:
                  isSelected && endDate
                    ? "white"
                    : unavailable
                    ? "#a0a0a0"
                    : isToday
                    ? "white"
                    : "black",
                pointerEvents: isPast || unavailable ? "none" : "auto",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="mb-3">
        <label htmlFor="guest-select" className="form-label">
          Guests
        </label>
        <select
          id="guest-select"
          className="form-select"
          value={guests}
          onChange={handleGuestChange}
        >
          {[...Array(maxGuests).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      {priceChange ? (
        <div className="d-flex w-100">
          <span>Total</span>
          <span className="ms-auto">{priceChange}</span>
          <span>,-</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Calendar;

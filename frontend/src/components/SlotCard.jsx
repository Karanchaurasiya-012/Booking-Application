export default function SlotCard({ slot, onBookClick }) {
  return (
    <div className="p-4 border rounded-2xl shadow-md bg-white flex flex-col gap-2">
      <h3 className="text-lg font-semibold">
        {new Date(slot.time).toLocaleString()} ({slot.durationMins} mins)
      </h3>
      {slot.available ? (
        <button
          onClick={() => onBookClick(slot)}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
        >
          Book Now
        </button>
      ) : (
        <p className="text-red-500 font-medium">
          Booked by {slot.booking?.name || "someone"}
        </p>
      )}
    </div>
  );
}

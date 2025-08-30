import { useEffect, useState } from "react";
import { fetchSlots, bookSlot } from "../api";
import SlotCard from "../components/SlotCard";

export default function BookingPage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSlots = async () => {
    setLoading(true);
    try {
      const { data } = await fetchSlots();
      setSlots(data.slots);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (slotId) => {
    const name = prompt("Enter your name:");
    const phone = prompt("Enter your phone number:");
    if (!name) return;

    try {
      const { data } = await bookSlot(slotId, name, phone);
      alert(data.message);
      loadSlots(); // refresh
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Court Booking</h1>
      {loading && <p>Loading...</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => (
          <SlotCard key={slot.id} slot={slot} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { fetchSlots, bookSlot } from "../api";
import SlotCard from "../components/SlotCard";
import Modal from "../components/Modal";

export default function BookingPage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "" });

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

  const openBookingForm = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Name required");

    try {
      const { data } = await bookSlot(selectedSlot.id, form.name, form.phone);
      alert(data.message);
      setIsModalOpen(false);
      setForm({ name: "", phone: "" });
      loadSlots();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Court Booking</h1>
      {loading && <p className="text-center">Loading...</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => (
          <SlotCard key={slot.id} slot={slot} onBookClick={openBookingForm} />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Slot"
      >
        {selectedSlot && (
          <form onSubmit={handleBook} className="flex flex-col gap-3">
            <p className="text-sm text-gray-600">
              Booking for:{" "}
              <b>{new Date(selectedSlot.time).toLocaleString()}</b>
            </p>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border p-2 rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}

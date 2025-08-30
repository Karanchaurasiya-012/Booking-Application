import { Dialog } from "@headlessui/react";

export default function Modal({ isOpen, onClose, children, title }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-lg w-full">
          <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
          {children}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

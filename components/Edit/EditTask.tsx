
import { useEffect, useRef, useState } from "react";
import Button from '@/components/Buttons/Button';
import CloseButton from "../Buttons/CloseButton";

type Props = {
  open: boolean;
  initialTitle: string;
  onClose: () => void;
  onSave: (newTitle: string) => Promise<void> | void;
  label?: string; 
};
export default function EditTaskModal({
  open,
  initialTitle,
  onClose,
  onSave,
}: Props) {
  const [value, setValue] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) {
      setValue(initialTitle);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, initialTitle]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center"
      aria-modal="true"
      role="dialog">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-[92%] max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <CloseButton onClose={onClose} />
        <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold">
          <span>
            <span className="text-indigo-600">Task</span>Edit
          </span>
        </h3>
        <div className="flex gap-3">
          <input
            ref={inputRef}
            className="flex-1 rounded-xl border-2 border-indigo-300/60 px-4 py-3 outline-none ring-0 focus:border-indigo-500"
            placeholder="Enter a name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}/>
          <Button variant="primary" onClick={handleSave}> Edit The task</Button>
        </div>
      </div>
    </div>
  );
  function handleSave() {const v = value.trim(); if (!v) return; onSave(v);
  }
}

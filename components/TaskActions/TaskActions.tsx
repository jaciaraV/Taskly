
import { useEffect, useRef, useState } from "react";

type Task = { _id: string; title: string; completed: boolean; createdAt?: string };

interface Props {
  task: Task;
  onEdit: (t: Task) => void;
  onInfo: (t: Task) => void;
  onDelete: (t: Task) => void;
}

export default function TaskActions({ task, onEdit, onInfo, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", click);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <div ref={ref} className={`relative dropdown dropdown-left ${open ? "dropdown-open" : ""}`}>
      <button
        aria-label={`${task.title}`}
        className="btn btn-ghost btn-sm btn-circle"
        onClick={() => setOpen((o) => !o)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 10a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
      {open && (
        <ul
          className="dropdown-content z-[100] menu menu-sm p-2 shadow bg-base-100 rounded-box min-w-44 mt-2">
          <li>
            <button
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 transition"
              onClick={() => { setOpen(false); onEdit(task); }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9L4 16l.686-3.514 9.9-9.9a2 2 0 012.828 0z"/>
              </svg>
              Edit
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-2  px-2 py-1rounded hover:bg-gray-200 transition"
              onClick={() => { setOpen(false); onInfo(task); }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9V5h2v2zm0 8H9v-6h2v6z"/>
              </svg>
              Info
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-2  px-2 py-1 text-error rounded hover:bg-gray-200 transition"
              onClick={() => { setOpen(false); onDelete(task); }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 7h8l-1 10H7L6 7zm8-3h-2.5l-.5-1h-2l-.5 1H6v2h8V4z"/>
              </svg>
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

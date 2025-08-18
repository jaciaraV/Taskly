import { useEffect } from 'react';
import CloseButton from '../Buttons/CloseButton';

type Task = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
};
type Props = {
  open: boolean;
  task: Task | null;
  onClose: () => void;
};

export default function InfoTaskModal({ open, task, onClose }: Props) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open, onClose]);
  if (!open || !task) return null;
  
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-[92%] max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <CloseButton onClose={onClose} />
        <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9V5h2v2zm0 8H9v-6h2v6z" />
            </svg>
          </span>
          <span>
            <span className="text-indigo-600">Task</span> Info
          </span>
        </h3>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-gray-600">Title:</span>{' '}
            {task.title}
          </div>
          <div>
            <span className="font-medium text-gray-600">Completed:</span>{' '}
            {task.completed ? 'Yes' : 'No'}
          </div>
          {task.createdAt && (
            <div>
              <span className="font-medium text-gray-600">Created:</span>{' '}
              {new Date(task.createdAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

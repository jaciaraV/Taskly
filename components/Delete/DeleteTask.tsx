import Button from '@/components/Buttons/Button';
import CloseButton from '../Buttons/CloseButton';

type Props = {open: boolean; taskTitle: string | null; onClose: () => void; onConfirm: () => Promise<void> | void;};
export default function DeleteTaskModal({ open, taskTitle, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-[92%] max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
         <CloseButton onClose={onClose} />
        <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-600 text-white">
            <svg width="18" height="18" viewBox="0 0 20 20">
              <path d="M6 7h8l-1 10H7L6 7zm8-3h-2.5l-.5-1h-2l-.5 1H6v2h8V4z"/>
            </svg>
          </span>
          <span>
            <span className="text-red-600">Task</span> Delete
          </span>
        </h3>
        <p className="text-gray-700">
          This action will permanently remove <span className="font-semibold">"{taskTitle}"</span>.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose}variant="default">Cancel</Button>
          <Button variant="danger"onClick={onConfirm}> Delete</Button>
        </div>
      </div>
    </div>
  );
}

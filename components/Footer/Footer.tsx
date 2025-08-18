import React from "react";

type FooterProps = {
  totalTasks: number;
  clearAllTasks: () => void;
};

export default function Footer({ totalTasks, clearAllTasks }: FooterProps) {
  return (
    <div className="mt-6 flex justify-between items-center text-[12px] p-2 border-t">
      <div className="flex gap-2 items-center justify-center">
        <div className="font-bold text-blue-600">{totalTasks}</div>
        <div className="text-gray-500">Task(s) Left</div>
      </div>
      <button
        className="text-blue-500 select-none cursor-pointer hover:underline"onClick={clearAllTasks}>Clear All Tasks</button>
    </div>
  );
}



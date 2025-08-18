'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@/components/Buttons/Button';
import Input from '@/components/Input/Input';
import Footer from '@/components/Footer/Footer';
import TaskActions from '@/components/TaskActions/TaskActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import EditTask from '@/components/Edit/EditTask';
import InfoTask from '@/components/Info/InfoTask';
import DeleteTask from '@/components/Delete/DeleteTask';

type Task = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTask, setInfoTask] = useState<Task | null>(null);
  const [delOpen, setDelOpen] = useState(false);
  const [delTask, setDelTask] = useState<Task | null>(null);

  const openInfo = (task: Task) => {
    setInfoTask(task);
    setInfoOpen(true);
  };

  const openDelete = (task: Task) => {
    setDelTask(task);
    setDelOpen(true);
  };
  const confirmDelete = async () => {
    if (!delTask) return;
    await axios.delete(`/api/tasks/${delTask._id}`);
    setDelOpen(false);
    setDelTask(null);
    fetchTasks();
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get<Task[]>('/api/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post('/api/tasks', { title: newTask.trim() });
    setNewTask('');
    fetchTasks();
  };

  const toggleCompleted = async (task: Task) => {
    await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };
  const openEdit = (task: Task) => {
    setEditingTask(task);
    setEditOpen(true);
  };

  const saveEdit = async (newTitle: string) => {
    if (!editingTask) return;
    if (!newTitle.trim() || newTitle === editingTask.title) {
      setEditOpen(false);
      setEditingTask(null);
      return;
    }
    await axios.put(`/api/tasks/${editingTask._id}`, {
      title: newTitle.trim(),
    });
    setEditOpen(false);
    setEditingTask(null);
    fetchTasks();
  };
  const clearAllTasks = async () => {
    await Promise.all(tasks.map((t) => axios.delete(`/api/tasks/${t._id}`)));
    fetchTasks();
  };
  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <div className="w-[470px] h-[460px] bg-white p-4 rounded-xl shadow-md overflow-auto">
        <div className="p-3 flex items-center gap-3">
          <FontAwesomeIcon
            icon={faPen}
            className="w-6 h-6 text-white text-2xl rounded-md p-3 bg-blue-600"/>
          <div className="poppins poppins-bold text-xl flex gap-1">
             <span>
            <span className="text-blue-600">Task</span> Master
          </span>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter your new task"
          />
          <Button variant='primary' onClick={addTask}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task)}
                />
                <span
                  className={task.completed ? 'line-through text-gray-500' : ''}
                >
                  {task.title}
                </span>
              </div>
              <TaskActions task={task} onEdit={openEdit} onInfo={openInfo} onDelete={openDelete}/>
            </li>
          ))}
        </ul>
        <Footer totalTasks={tasks.length} clearAllTasks={clearAllTasks} />
        <EditTask
          open={editOpen}
          initialTitle={editingTask?.title ?? ''}
          onClose={() => {
            setEditOpen(false);
            setEditingTask(null);
          }}
          onSave={saveEdit}
          label="Edit The Task"
        />
        <InfoTask
          open={infoOpen}
          task={infoTask}
          onClose={() => {
            setInfoOpen(false);
            setInfoTask(null);
          }}
        />

        <DeleteTask
          open={delOpen}
          taskTitle={delTask?.title ?? null}
          onClose={() => {
            setDelOpen(false);
            setDelTask(null);
          }}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}

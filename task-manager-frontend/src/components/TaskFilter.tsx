import React from 'react';
import type { TaskFilter } from '../types/task';

interface TaskFilterProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    total: number;
    completed: number;
    pending: number;
  };
}

const TaskFilterComponent: React.FC<TaskFilterProps> = ({ 
  currentFilter, 
  onFilterChange, 
  taskCounts 
}) => {
  const filters: { value: TaskFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All Tasks', count: taskCounts.total },
    { value: 'pending', label: 'Pending', count: taskCounts.pending },
    { value: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="task-filter">
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
          >
            {filter.label}
            <span className="count">({filter.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilterComponent;

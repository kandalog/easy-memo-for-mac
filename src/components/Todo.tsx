import { Todo } from '../types/Todo';

interface TodoProps {
  todo: Todo;
  onCheck: (todo: Todo) => void;
}

export default function TodoItem({ todo, onCheck }: TodoProps) {
  const onCheckHandler = () => {
    onCheck(todo);
  };

  return (
    <li className={todo.completed ? 'checked' : ''}>
      <label htmlFor={`todo-${todo.id}`}>
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={onCheckHandler}
        />
        <span>{todo.text}</span>
      </label>
    </li>
  );
}

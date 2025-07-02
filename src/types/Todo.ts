export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

declare global {
  interface Window {
    db: {
      loadTodoList: () => Promise<Array<Todo> | null>;
      storeTodoList: (todoList: Array<Todo>) => Promise<void>;
    };
  }
}

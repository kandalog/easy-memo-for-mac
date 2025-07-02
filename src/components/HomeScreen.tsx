import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './Todo';

export default function HomeScreen() {
  // stateを定義
  const [text, setText] = useState<string>('');
  const [todoList, setTodoList] = useState<Array<Todo>>([]);

  // データ操作
  // リストを読み込み
  const loadTodoList = async (): Promise<Array<Todo> | null> => {
    const _todoList = await window.db.loadTodoList();
    return _todoList;
  };

  // リストを保存
  const storeTodoList = async (_todoList: Array<Todo>): Promise<void> => {
    await window.db.storeTodoList(_todoList);
  };

  useEffect(() => {
    // 初回レンダー時にデフォルトのデータをセット
    // const defaultTodoList = [
    //   {
    //     id: 1,
    //     text: '宿題をやる',
    //     completed: false,
    //   },
    //   {
    //     id: 2,
    //     text: '部屋を片付ける',
    //     completed: true,
    //   },
    //   {
    //     id: 3,
    //     text: 'メールを送る',
    //     completed: false,
    //   },
    // ];
    const loadAndSetTodoList = async () => {
      try {
        const _todoList = await loadTodoList();
        if (_todoList) {
          setTodoList(_todoList);
        }
      } catch (error) {
        console.error('Failed to load todo list:', error);
      }
    };

    loadAndSetTodoList();
  }, []);

  const onSubmit = () => {
    // ボタンクリック時にtodoListに新しいToDoを追加
    if (text !== '') {
      const newTodoList: Array<Todo> = [
        {
          id: new Date().getTime(),
          text,
          completed: false,
        },
        ...todoList,
      ];
      setTodoList(newTodoList);
      storeTodoList(newTodoList);

      // テキストフィールドを空にする
      setText('');
    }
  };

  const onCheck = (newTodo: Todo) => {
    // チェック時にcompletedの値を書き換える
    const newTodoList = todoList.map((todo) => {
      return todo.id === newTodo.id
        ? { ...newTodo, completed: !newTodo.completed }
        : todo;
    });
    setTodoList(newTodoList);
    storeTodoList(newTodoList);
  };

  return (
    <div>
      <div className="container">
        <div className="input-field">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="button" onClick={onSubmit} className="add-todo-button">
            追加
          </button>
        </div>

        <ul className="todo-list">
          {todoList?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} onCheck={onCheck} />;
          })}
        </ul>
      </div>
    </div>
  );
}

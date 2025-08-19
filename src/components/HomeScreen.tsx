import React, { useState, useEffect, useCallback } from 'react';

export default function HomeScreen() {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const loadMemo = async () => {
      try {
        const savedText = await window.electron.memo.load();
        setText(savedText || '');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load memo:', error);
      }
    };

    loadMemo();
  }, []);

  const handleTextChange = useCallback(
    async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      setText(newText);

      try {
        await window.electron.memo.save(newText);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to save memo:', error);
      }
    },
    [],
  );

  return (
    <textarea
      value={text}
      onChange={handleTextChange}
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        padding: '10px',
        fontSize: '18px',
        fontFamily: 'Menlo, "ヒラギノ角ゴ ProN", monospace',
        resize: 'none',
        outline: 'none',
        margin: 0,
      }}
    />
  );
}

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = text.substring(0, start) + '  ' + text.substring(end);
        
        setText(newText);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);

        try {
          window.electron.memo.save(newText);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to save memo:', error);
        }
      } else if (e.key === 'Enter') {
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const lines = text.substring(0, start).split('\n');
        const currentLine = lines[lines.length - 1];
        
        if (currentLine === '・') {
          e.preventDefault();
          const lineStart = text.lastIndexOf('\n', start - 1) + 1;
          const newText =
            text.substring(0, lineStart) +
            text.substring(textarea.selectionEnd);
          
          setText(newText);
          
          setTimeout(() => {
            textarea.selectionStart = lineStart;
            textarea.selectionEnd = lineStart;
          }, 0);

          try {
            window.electron.memo.save(newText);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to save memo:', error);
          }
        } else if (currentLine.startsWith('・')) {
          e.preventDefault();
          const newText =
            text.substring(0, start) +
            '\n・' +
            text.substring(textarea.selectionEnd);
          
          setText(newText);
          
          setTimeout(() => {
            const newCursorPosition = start + 2;
            textarea.selectionStart = newCursorPosition;
            textarea.selectionEnd = newCursorPosition;
          }, 0);

          try {
            window.electron.memo.save(newText);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to save memo:', error);
          }
        }
      }
    },
    [text],
  );

  return (
    <textarea
      value={text}
      onChange={handleTextChange}
      onKeyDown={handleKeyDown}
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

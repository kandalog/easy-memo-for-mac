import React, { useState, useEffect, useCallback } from 'react';

export default function HomeScreen() {
  const [text, setText] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);

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

        // Check if cursor is on a line that contains "・" (with or without indentation)
        const lines = text.substring(0, start).split('\n');
        const currentLine = lines[lines.length - 1];

        if (currentLine.match(/^\s*・/)) {
          const lineStartIndex = text.lastIndexOf('\n', start - 1) + 1;
          
          if (e.shiftKey) {
            // Shift+Tab: Remove 2 spaces from the beginning of the line if they exist
            const lineContent = text.substring(lineStartIndex);
            if (lineContent.startsWith('  ')) {
              // Remove 2 spaces from the beginning of the line
              const newText = text.substring(0, lineStartIndex) + lineContent.substring(2);
              setText(newText);

              setTimeout(() => {
                const position = Math.max(lineStartIndex, start - 2);
                textarea.selectionStart = position;
                textarea.selectionEnd = position;
              }, 0);

              try {
                window.electron.memo.save(newText);
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to save memo:', error);
              }
            }
          } else {
            // Tab: Insert 2 spaces at the beginning of the line
            const newText = `${text.substring(
              0,
              lineStartIndex,
            )}  ${text.substring(lineStartIndex)}`;

            setText(newText);

            setTimeout(() => {
              const position = start + 2;
              textarea.selectionStart = position;
              textarea.selectionEnd = position;
            }, 0);

            try {
              window.electron.memo.save(newText);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('Failed to save memo:', error);
            }
          }
        } else {
          // Default behavior: insert 2 spaces at cursor position
          const newText = `${text.substring(0, start)}  ${text.substring(end)}`;

          setText(newText);

          setTimeout(() => {
            const position = start + 2;
            textarea.selectionStart = position;
            textarea.selectionEnd = position;
          }, 0);

          try {
            window.electron.memo.save(newText);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to save memo:', error);
          }
        }
      } else if (e.key === 'Enter' && !isComposing) {
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const lines = text.substring(0, start).split('\n');
        const currentLine = lines[lines.length - 1];

        // Check for indented bullet line (spaces + ・)
        const bulletMatch = currentLine.match(/^(\s*)・(.*)$/);

        if (bulletMatch) {
          const [, indent, content] = bulletMatch;

          if (content === '') {
            // Empty bullet line - remove it
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
          } else {
            // Non-empty bullet line - create new bullet with same indentation
            e.preventDefault();
            const newText = `${text.substring(
              0,
              start,
            )}\n${indent}・${text.substring(textarea.selectionEnd)}`;

            setText(newText);

            setTimeout(() => {
              const newCursorPosition = start + 1 + indent.length + 1;
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
      }
    },
    [text, isComposing],
  );

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  return (
    <textarea
      value={text}
      onChange={handleTextChange}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        padding: '10px',
        fontSize: '16px',
        fontFamily: 'Menlo, "ヒラギノ角ゴ ProN", monospace',
        resize: 'none',
        outline: 'none',
        margin: 0,
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
      }}
    />
  );
}

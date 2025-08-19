import { useState } from 'react';

export default function HomeScreen() {
  const [text, setText] = useState<string>('');

  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        padding: '10px',
        fontSize: '14px',
        fontFamily: 'monospace',
        resize: 'none',
        outline: 'none',
        margin: 0,
      }}
    />
  );
}

import React, { useCallback, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
  width?: string;
  height?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  value,
  language,
  onChange,
  width = '100%',
  height = '200px',
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor) => {
      editorRef.current = editor;

      // Configure editor options
      editor.updateOptions({
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: 'Menlo, "ヒラギノ角ゴ ProN", monospace',
        lineNumbers: 'on',
        readOnly,
        wordWrap: 'on',
        automaticLayout: true,
      });

      // Focus the editor after mounting
      if (!readOnly) {
        editor.focus();
      }
    },
    [readOnly],
  );

  const handleEditorChange = useCallback(
    (newValue: string | undefined) => {
      if (newValue !== undefined && newValue !== value) {
        onChange(newValue);
      }
    },
    [onChange, value],
  );

  // Handle blur event - currently unused but kept for future use
  // const handleEditorBlur = useCallback(() => {
  //   if (onBlur) {
  //     onBlur();
  //   }\n  // }, [onBlur]);

  // Handle editor cleanup
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      style={{
        width,
        height,
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
        margin: '8px 0',
      }}
    >
      <Editor
        value={value}
        language={language}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        loading={<div style={{ padding: '10px' }}>Loading editor...</div>}
        options={{
          automaticLayout: true,
          contextmenu: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily: 'Menlo, "ヒラギノ角ゴ ProN", monospace',
          lineNumbers: 'on',
          readOnly,
          wordWrap: 'on',
        }}
        theme="vs-light"
      />
    </div>
  );
}

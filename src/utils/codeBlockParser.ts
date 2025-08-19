export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  startIndex: number;
  endIndex: number;
}

export interface TextSegment {
  type: 'text' | 'code';
  content: string;
  language?: string;
  startIndex: number;
  endIndex: number;
  id?: string;
}

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const parseTextWithCodeBlocks = (text: string): TextSegment[] => {
  const segments: TextSegment[] = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // eslint-disable-next-line no-cond-assign
  while ((match = codeBlockRegex.exec(text)) !== null) {
    const [fullMatch, language = '', code] = match;
    const startIndex = match.index;
    const endIndex = startIndex + fullMatch.length;

    // Add text segment before code block if exists
    if (startIndex > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, startIndex),
        startIndex: lastIndex,
        endIndex: startIndex,
      });
    }

    // Add code block segment
    segments.push({
      type: 'code',
      content: code,
      language: language || 'plaintext',
      startIndex,
      endIndex,
      id: generateId(),
    });

    lastIndex = endIndex;
  }

  // Add remaining text if exists
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex),
      startIndex: lastIndex,
      endIndex: text.length,
    });
  }

  // If no code blocks found, return entire text as single segment
  if (segments.length === 0) {
    segments.push({
      type: 'text',
      content: text,
      startIndex: 0,
      endIndex: text.length,
    });
  }

  return segments;
};

export const reconstructTextFromSegments = (
  segments: TextSegment[],
): string => {
  return segments
    .map((segment) => {
      if (segment.type === 'code') {
        return `\`\`\`${segment.language || ''}\n${segment.content}\`\`\``;
      }
      return segment.content;
    })
    .join('');
};

export const updateCodeBlockInText = (
  originalText: string,
  blockId: string,
  newCode: string,
): string => {
  const segments = parseTextWithCodeBlocks(originalText);
  const updatedSegments = segments.map((segment) => {
    if (segment.type === 'code' && segment.id === blockId) {
      return { ...segment, content: newCode };
    }
    return segment;
  });
  return reconstructTextFromSegments(updatedSegments);
};

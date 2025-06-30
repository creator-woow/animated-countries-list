'use client';

import { FC, ReactNode } from 'react';

import { PropsWithClassName } from 'shared/types/props';

interface TagComponentProps {
  content: string;
}

interface RichTextProps extends PropsWithClassName {
  text: string;
  tagOverrides: Record<string, (props: TagComponentProps) => ReactNode>;
}

/**
 * Transform encoded string to legit React children, string decode happens by calling overwrite functions for each encoded tag
 */
export const RichText: FC<RichTextProps> = ({
  text,
  className,
  tagOverrides,
}) => {
  const renderRichText = (input: string): ReactNode[] => {
    const result: ReactNode[] = [];
    let lastIndex = 0;

    const tagRegex = new RegExp(
      `<(${Object.keys(tagOverrides).join('|')})>(.*?)<\\/\\1>`,
      'g',
    );
    let match;

    while ((match = tagRegex.exec(input)) !== null) {
      const [fullMatch, tag, content] = match;
      const startIndex = match.index;

      if (startIndex > lastIndex) {
        result.push(
          <span key={lastIndex}>{input.slice(lastIndex, startIndex)}</span>,
        );
      }

      const Component = tagOverrides[tag];
      result.push(
        Component ? (
          <Component
            key={startIndex}
            content={content}
          />
        ) : (
          <span key={startIndex}>{content}</span>
        ),
      );

      lastIndex = startIndex + fullMatch.length;
    }

    if (lastIndex < input.length) {
      result.push(<span key={lastIndex}>{input.slice(lastIndex)}</span>);
    }

    return result;
  };

  return <div className={className}>{renderRichText(text)}</div>;
};

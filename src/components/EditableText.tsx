import { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  children: React.ReactNode;
  onSave?: (content: string) => void;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export default function EditableText({ 
  children, 
  onSave, 
  className = '', 
  tag: Tag = 'div' 
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const editRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof children === 'string') {
      setContent(children);
    }
  }, [children]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave?.(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      // Select all text
      const range = document.createRange();
      range.selectNodeContents(editRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div
        ref={editRef}
        contentEditable
        suppressContentEditableWarning
        className={`${className} outline outline-2 outline-primary/50 outline-offset-2 bg-primary/5 rounded p-1`}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const ElementTag = Tag as any;
  
  return (
    <ElementTag 
      className={`${className} cursor-pointer hover:bg-primary/5 rounded transition-all duration-200`}
      onDoubleClick={handleDoubleClick}
    >
      {children}
    </ElementTag>
  );
}
"use client";

import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface DropdownMenuLabelProps {
  children: React.ReactNode;
}

interface DropdownMenuSeparatorProps {}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
}>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: { current: null },
});

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children }) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children }) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onClick }) => {
  const { setIsOpen } = React.useContext(DropdownMenuContext);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer gap-2"
    >
      {children}
    </div>
  );
};

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ children }) => {
  return (
    <div className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
      {children}
    </div>
  );
};

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = () => {
  return <div className="border-t border-gray-200 dark:border-gray-600 my-1" />;
};

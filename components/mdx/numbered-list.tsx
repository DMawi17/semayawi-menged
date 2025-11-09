import React from 'react';

interface ListItemProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

export function ListItem({ number, title, children }: ListItemProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-10 h-10 bg-[#fe640b] dark:bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-lg font-bold text-[#4c4f69] dark:text-gray-200 mb-2">
          {title}
        </h3>
        <div className="text-[#4c4f69] dark:text-gray-300 leading-7">
          {children}
        </div>
      </div>
    </div>
  );
}

export function NumberedList({ children }: { children: React.ReactNode }) {
  return <div className="my-8 space-y-6">{children}</div>;
}

import React from "react";
import clsx from "clsx";

export default function Container({
  children,
  className,
}: {
  // eslint-disable-next-line
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "max-w-7xl w-full mx-auto px-0 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

import React from "react";

export default function EditPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center">
      {children}
    </div>
  )
}
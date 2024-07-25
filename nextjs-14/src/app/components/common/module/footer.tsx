"use client";

function Footer() {
  return (
    <nav className="fixed bottom-0 right-0 z-50 rounded-t-2xl transition-all duration-300 p-3 w-full h-28"
    style={{
      backgroundColor: "var(--background)",
    }}>
      <div className="text-center">
        <span className="text-[11px] text-gray-500 dark:text-white text-xs">
          Copyright © 2024 JuhaPark. All rights reserved
        </span>
      </div>
    </nav>
  );
}

export default Footer;

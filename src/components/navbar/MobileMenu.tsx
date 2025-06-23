import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLink from "./NavLink";

interface MobileMenuProps {
  navLinks: { href: string; text: string }[];
  currentPath: string;
  isRTL: boolean;
  enquireText: string;
}

export default function MobileMenu({ navLinks, currentPath, isRTL, enquireText }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Simple toggle function without preventDefault
  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden relative">
      <button 
        type="button"
        onClick={toggleMenu}
        className="text-white p-2 rounded hover:bg-white/10"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 bg-black/90 backdrop-blur-md shadow-lg z-50 border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.text} 
                  href={link.href} 
                  label={link.text} 
                  isActive={currentPath === link.href}
                />
              ))}
              <div className="pt-2">
                <a 
                  href="/contact" 
                  className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  {enquireText}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

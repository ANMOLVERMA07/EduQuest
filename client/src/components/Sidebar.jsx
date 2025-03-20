
"use client";

import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconMenu2, IconX, IconBrandTabler, IconUserBolt, IconSettings, IconArrowLeft } from "../../node_modules/@tabler/icons-react";
import { Link } from "react-router-dom";

// Context for managing the sidebar's state
const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// SidebarProvider to manage state
export const SidebarProvider = ({ children, open: openProp, setOpen: setOpenProp, animate = true }) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Reusable link component
const SidebarLink = ({ link }) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      to={link.href}
      className="flex items-center gap-2 py-2 text-neutral-700 dark:text-neutral-200"
    >
      {link.icon}
      <motion.span
        animate={{
          opacity: open ? 1 : 0,
          width: open ? "auto" : 0,
        }}
        className="transition duration-150 whitespace-pre"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconBrandTabler /> },
    { label: "Profile", href: "/profile", icon: <IconUserBolt /> },
    { label: "Settings", href: "/settings", icon: <IconSettings /> },
    { label: "Logout", href: "/logout", icon: <IconArrowLeft /> },
  ];

  return (
    <SidebarProvider open={open} setOpen={setOpen}>
      {/* Mobile Sidebar */}
      <div className="md:hidden flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 px-4 py-2">
        <IconMenu2 className="text-neutral-800 dark:text-neutral-200" onClick={() => setOpen(true)} />
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col p-6"
            >
              <IconX className="text-neutral-800 dark:text-neutral-200 self-end" onClick={() => setOpen(false)} />
              <div className="mt-6 space-y-4">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex flex-col bg-neutral-100 dark:bg-neutral-800 h-screen p-4 transition-all"
        animate={{ width: open ? "250px" : "60px" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex flex-col space-y-4">
          {links.map((link, idx) => (
            <SidebarLink key={idx} link={link} />
          ))}
        </div>
      </motion.div>
    </SidebarProvider>
  );
};

export default Sidebar;

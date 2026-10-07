"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search, GraduationCap } from "lucide-react";
import { CAMPUS_LIST, type Campus } from "@/lib/campus";

interface SchoolSelectorProps {
  value: Campus | null;
  onChange: (campus: Campus) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export function SchoolSelector({
  value,
  onChange,
  disabled = false,
  className = "",
  placeholder = "选择学校",
}: SchoolSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const filteredCampuses = CAMPUS_LIST.filter(
    (c) =>
      c.isEnabled &&
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.domain.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && optionsRef.current) {
      const highlighted = optionsRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      );
      if (highlighted) {
        highlighted.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, highlightedIndex]);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((open) => !open);
    setSearchQuery("");
    setHighlightedIndex(-1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredCampuses.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex >= 0 && filteredCampuses[highlightedIndex]) {
          onChange(filteredCampuses[highlightedIndex]);
          setIsOpen(false);
          setSearchQuery("");
          setHighlightedIndex(-1);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
        buttonRef.current?.focus();
        break;
    }
  };

  const handleOptionClick = (campus: Campus) => {
    onChange(campus);
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
          disabled
            ? "bg-muted/10 text-muted-soft cursor-not-allowed"
            : "bg-card border-border hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="选择学校"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
            <GraduationCap size={18} />
          </div>
          <div className="min-w-0 flex-1">
            {value ? (
              <>
                <p className="text-foreground font-medium truncate">{value.name}</p>
                <p className="text-xs text-muted-soft truncate">
                  {value.domain}
                </p>
              </>
            ) : (
              <p className="text-muted-soft">{placeholder}</p>
            )}
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-muted-soft transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div
          ref={optionsRef}
          className="absolute z-50 mt-2 w-full max-h-80 overflow-auto rounded-xl border border-border bg-card shadow-lg animate-fade-in"
          role="listbox"
          aria-label="学校列表"
        >
          <div className="p-3 border-b border-border">
            <label htmlFor="school-search" className="sr-only">
              搜索学校
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-soft"
              />
              <input
                id="school-search"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="搜索学校名称或域名..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-64 overflow-auto">
            {filteredCampuses.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-soft">
                暂无匹配的学校
              </div>
            ) : (
              <ul className="py-1" role="listbox">
                {filteredCampuses.map((campus, index) => (
                  <li
                    key={campus.id}
                    role="option"
                    aria-selected={value?.id === campus.id}
                    data-index={index}
                    className={`relative px-4 py-3 cursor-pointer transition-colors ${
                      value?.id === campus.id
                        ? "bg-accent/5"
                        : "hover:bg-background"
                    } ${index === highlightedIndex ? "bg-accent/5" : ""}`}
                    onClick={() => handleOptionClick(campus)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                        <GraduationCap size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground font-medium truncate">
                          {campus.name}
                        </p>
                        <p className="text-xs text-muted-soft truncate">
                          {campus.domain}
                        </p>
                      </div>
                      {value?.id === campus.id && (
                        <Check
                          size={18}
                          className="text-accent shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-3 border-t border-border text-center">
            <p className="text-xs text-muted-soft">
              仅显示已开放的学校 · 更多高校即将开放
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function SchoolSelectorSimple({
  value,
  onChange,
  disabled = false,
  className = "",
}: {
  value: Campus | null;
  onChange: (campus: Campus) => void;
  disabled?: boolean;
  className?: string;
}) {
  const enabledCampuses = CAMPUS_LIST.filter((c) => c.isEnabled);

  return (
    <select
      value={value?.id || ""}
      onChange={(e) => {
        const campus = CAMPUS_LIST.find((c) => c.id === e.target.value);
        if (campus) onChange(campus);
      }}
      disabled={disabled}
      className={`w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:bg-muted/10 disabled:text-muted-soft disabled:cursor-not-allowed ${className}`}
      aria-label="选择学校"
    >
      <option value="">选择学校</option>
      {enabledCampuses.map((campus) => (
        <option key={campus.id} value={campus.id}>
          {campus.name} ({campus.domain})
        </option>
      ))}
    </select>
  );
}

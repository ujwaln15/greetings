import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const themes = [
  "bg-[#ffB347] text-[#8b4513] border-[4px] border-[#ff8c00]",
  "bg-[#88b04b] text-[#556b2f] border-[4px] border-[#6b9e23]",
  "bg-[#4682b4] text-[#b3ffff] border-[4px] border-[#002699]",
  "bg-[#ff1a1a] text-[#ffb3b3] border-[4px] border-[#8b0000]",
  "bg-[#ffd700] text-[#b8860b] border-[4px] border-[#ffa500]",
  "bg-[#ff4500] text-[#ffbb99] border-[4px] border-[#ff6347]",
];

export const getTheme = (theme) => {
  if (theme >= 0 && theme < themes.length) {
    return themes[theme];
  }
  return themes[0];
};

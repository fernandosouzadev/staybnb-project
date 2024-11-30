"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  onClick: (label: string) => void;
  selected?: boolean;
  disabled?: boolean;
}

export function CatergoryInput({
  label,
  icon: Icon,
  onClick,
  selected,
  disabled,
}: CategoryInputProps) {
  return (
    <input
      disabled={disabled}
      onClick={disabled ? () => {} : () => onClick(label)}
      className={`${
        disabled && ""
      } rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
  ${selected ? "border-black" : "border-neutral-200"}
  `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </input>
  );
}

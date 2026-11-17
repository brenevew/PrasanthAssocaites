import type { ChangeEvent } from "react";
import { RESIDENCE_MAX_LENGTH, RESIDENCE_PLACEHOLDER } from "@/data/residence";

interface ResidenceInputProps {
  id: string;
  className: string;
  /** Controlled use (the planners). Leave out for a plain form field named "residence". */
  value?: string;
  onChange?: (value: string) => void;
}

/** The optional "Where do you live now?" text box, shared by every enquiry form. */
export default function ResidenceInput({ id, className, value, onChange }: ResidenceInputProps) {
  const controlled = value !== undefined && onChange !== undefined;
  return (
    <input
      type="text"
      id={id}
      name="residence"
      maxLength={RESIDENCE_MAX_LENGTH}
      placeholder={RESIDENCE_PLACEHOLDER}
      className={className}
      {...(controlled ? { value, onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value) } : {})}
    />
  );
}

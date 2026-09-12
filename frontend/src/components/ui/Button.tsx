import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: undefined;
  onClick?: () => void;
  disabled?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1A1714] text-white hover:bg-[#2C2723] shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]",
  secondary:
    "bg-gold text-white font-bold hover:bg-gold-light shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]",
  gold:
    "bg-[#FAF6EE] text-gold-dark border border-[#EBDCC5] hover:bg-[#1A1714] hover:text-white hover:border-[#1A1714] transition-all shadow-2xs",
  outline:
    "border border-border bg-white text-charcoal font-semibold hover:bg-linen hover:border-charcoal/40 shadow-xs transition-all",
  ghost:
    "bg-transparent text-charcoal hover:bg-linen/80 border border-transparent transition-all",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs tracking-wider",
  md: "px-7 py-3 text-sm tracking-wide",
  lg: "px-9 py-4 text-sm tracking-wide",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-250 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] select-none";

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} id={props.id} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled, id } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:opacity-50 disabled:cursor-not-allowed`}
      id={id}
    >
      {children}
    </button>
  );
}

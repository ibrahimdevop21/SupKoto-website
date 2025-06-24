interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

export default function NavLink({ href, label, isActive = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`transition text-sm font-medium px-2.5 py-1.5 rounded hover:bg-primary/10 ${isActive 
        ? 'text-primary font-semibold' 
        : 'text-muted-foreground hover:text-foreground'}`}
    >
      {label}
    </a>
  );
}
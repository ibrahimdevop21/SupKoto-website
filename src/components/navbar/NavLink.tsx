interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

export default function NavLink({ href, label, isActive = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`transition text-sm font-medium px-3 py-2 rounded-md hover:bg-primary/10 ${isActive 
        ? 'text-primary font-semibold' 
        : 'text-muted-foreground hover:text-foreground'}`}
    >
      {label}
    </a>
  );
}
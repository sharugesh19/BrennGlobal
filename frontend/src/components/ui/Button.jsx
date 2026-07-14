const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  dark: "btn-dark",
};

const Button = ({ children, variant = "primary", href, onClick, type = "button", className = "", icon, ...rest }) => {
  const classes = `${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
};

export default Button;

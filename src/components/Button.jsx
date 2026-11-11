import React from 'react';

export default function Button({
  children,
  href = '#contacto',
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <a className={`button button--${variant} ${className}`.trim()} href={href} {...props}>
      {children}
    </a>
  );
}

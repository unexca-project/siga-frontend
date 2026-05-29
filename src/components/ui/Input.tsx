// Ejemplo de lo que DEBERÍA tener Button.tsx
export function Input({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
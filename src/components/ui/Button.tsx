// Ejemplo de lo que DEBERÍA tener Button.tsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
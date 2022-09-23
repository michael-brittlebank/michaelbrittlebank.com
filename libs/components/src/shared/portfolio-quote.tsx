export function PortfolioQuote({ ...props }) {
  const { children } = props;
  return (
    <q>
      <small>{children}</small>
    </q>
  );
}

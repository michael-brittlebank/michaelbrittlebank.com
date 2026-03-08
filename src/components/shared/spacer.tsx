type SpacerColor = 'blue' | 'orange';

export function Spacer({ color }: { color: SpacerColor }) {
  const confirmedColor = color === 'blue' ? 'blue' : 'orange';
  return (
    <section className="full-screen-grid-container row">
      <div className={`col-sm-12 spacer ${confirmedColor}`} />
    </section>
  );
}

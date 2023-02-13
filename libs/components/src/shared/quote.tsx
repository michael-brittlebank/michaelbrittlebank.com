interface Props {
  message: string;
  author: string;
}

export function Quote(props: Props) {
  const { message, author } = props;
  return (
    <p className="quote">
      {String.fromCharCode(8220)}
      {message}
      {String.fromCharCode(8221)}
      <br />
      <span className="quote-divider">{String.fromCharCode(8212)}</span>
      <br />
      {author}
    </p>
  );
}

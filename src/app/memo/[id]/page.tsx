export default function Memo({ params }: { params: { id: string | number } }) {
  return <div>My Post: {params.id}</div>;
}

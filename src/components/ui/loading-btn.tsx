import { RiLoader2Fill } from "react-icons/ri";

export default function LoadingBtn({
  size,
  isLoading,
}: {
  size: number;
  isLoading: boolean;
}) {
  if (!isLoading) return null;
  return <RiLoader2Fill size={size} className=" animate-spin text-white" />;
}

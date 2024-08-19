import Spinner from "../ui/Spinner";

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center py-8 w-full h-[300px]">
      <Spinner />
    </div>
  );
}

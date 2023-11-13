import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      className={
        "fixed inset-0 lg:pl-64 bg-black backdrop-blur flex justify-center items-center"
      }
    >
      <Loader2 className={"animate-spin"} size={40} />
    </div>
  );
}

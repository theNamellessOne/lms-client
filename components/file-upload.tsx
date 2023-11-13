"use client";

import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FileUpload({
  type = "image",
  onUpload,
}: {
  type?: "image" | "all";
  onUpload: (e: CldUploadWidgetResults) => void;
}) {
  const preset = type === "image" ? "kzbykxgk" : "hghvxoay";

  return (
    <Button variant={"outline"} type={"button"}>
      <Upload size={18} className={"mr-3"} />
      <CldUploadWidget onUpload={onUpload} uploadPreset={preset}>
        {({ open }) => {
          return <div onClick={() => open()}>Upload</div>;
        }}
      </CldUploadWidget>
    </Button>
  );
}

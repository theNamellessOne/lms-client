"use client";

import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { subscribe, unsubscribe } from "@/util/event-bus/event-bus";

type EditableProps = {
  title: string;
  body: ReactNode;
  value: ReactNode;
  onClose?: () => void;
};

export const Editable = ({
  title,
  value,
  body,
  onClose = () => {},
}: EditableProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    subscribe("course_updated", () => setOpen(false));
    return unsubscribe("course_updated", () => setOpen(false));
  }, []);

  return (
    <div>
      <div className={"flex items-center justify-between"}>
        <p className={"text-lg"}>{title}</p>
        {open ? (
          <Button
            variant={"ghost"}
            onClick={() => {
              onClose();
              setOpen(false);
            }}
          >
            <X className={"mr-2"} />
            exit
          </Button>
        ) : (
          <Button variant={"ghost"} onClick={() => setOpen(true)}>
            <Pencil size={18} className={"mr-3"} /> edit
          </Button>
        )}
      </div>

      <div className={"mt-3"}>{open ? body : value}</div>
    </div>
  );
};

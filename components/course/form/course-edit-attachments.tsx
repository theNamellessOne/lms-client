"use client";

import { AttachmentCreate } from "@/components/course/attachment/form/attachment-create";
import { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "@/util/event-bus/event-bus";
import { File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleAttachmentDelete } from "@/service/attachmnet-service";

type CourseEditAttachmentsFieldProps = {
  course: any;
};

export function CourseEditAttachments({
  course,
}: CourseEditAttachmentsFieldProps) {
  const [attachments, setAttachments] = useState(course["attachments"]);

  const onDelete = (payload: any) => {
    let spliced = [];

    for (const attachment of attachments) {
      if (attachment["id"] !== payload["id"]) {
        spliced.push(attachment);
      }
    }

    setAttachments(spliced);
  };

  const onCreate = (payload: any) => {
    setAttachments([...attachments, payload]);
  };

  useEffect(() => {
    subscribe("attachment_created", onCreate);
    subscribe("attachment_removed", onDelete);
    return () => {
      unsubscribe("attachment_created", onCreate);
      unsubscribe("attachment_removed", onDelete);
    };
  }, []);

  return (
    <div className={"flex flex-col gap-1 max-h-[300px] overflow-y-scroll"}>
      <AttachmentCreate courseId={course["id"]} />
      {attachments.length === 0 ? (
        <p className={"italic text-slate-600 dark:text-primary-foreground/30"}>
          No attachments
        </p>
      ) : null}
      {attachments?.map((attachment: any) => {
        return (
          <div
            className={
              "flex items-center justify-between rounded-xl p-2 text-primary bg-primary/20 dark:text-primary-foreground"
            }
            key={attachment["id"]}
          >
            <File size={24} className={"mr-3"} />
            <h2 className={"w-full"}>{attachment["name"]}</h2>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                handleAttachmentDelete(course["id"], attachment["id"]);
              }}
            >
              <X size={20} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

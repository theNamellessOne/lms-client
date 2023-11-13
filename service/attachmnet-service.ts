import * as z from "zod";
import { attachmentSchema } from "@/lib/schemas";
import { httpClient } from "@/lib/httpClient";
import toast from "react-hot-toast";
import { publish } from "@/util/event-bus/event-bus";

export const handleAttachmentPost = (
  values: z.infer<typeof attachmentSchema>,
) => {
  httpClient
    .post(`course/${values.courseId}/attachments`, values)
    .then((r) => {
      toast.success("attachment created");
      publish({ name: "attachment_created", payload: r.data });
    })
    .catch(() => toast.error("something went wrong"));
};

export const handleAttachmentDelete = (
  courseId: number,
  attachmentId: number,
) => {
  httpClient
    .delete(`course/${courseId}/attachments/${attachmentId}`)
    .then((r) => {
      toast.success("attachment removed");
      publish({ name: "attachment_removed", payload: r.data });
    })
    .catch(() => toast.error("something went wrong"));
};

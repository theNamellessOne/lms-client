import * as z from "zod";
import { chapterSchema } from "@/lib/schemas";
import { httpClient } from "@/lib/httpClient";
import toast from "react-hot-toast";
import { publish } from "@/util/event-bus/event-bus";

export const handleChapterPost = (values: z.infer<typeof chapterSchema>) => {
  httpClient
    .post(`course/${values.courseId}/chapters`, values)
    .then((r) => {
      toast.success("chapter created");
      publish({ name: "chapter_created", payload: r.data });
    })
    .catch(() => toast.error("something went wrong"));
};

export const handleChapterDelete = (courseId: number, chapterId: number) => {
  httpClient
    .delete(`course/${courseId}/chapters/${chapterId}`)
    .then((r) => {
      toast.success("chapter removed");
      publish({ name: "chapter_removed", payload: r.data });
    })
    .catch(() => toast.error("something went wrong"));
};

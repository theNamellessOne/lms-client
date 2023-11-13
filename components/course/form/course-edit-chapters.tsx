"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { httpClient } from "@/lib/httpClient";

export function CourseEditChapters({ courseId }: { courseId: number }) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    httpClient.get(`course/${courseId}/chapters`).then((r) => {
      setChapters(r.data);
    });
  }, []);

  return (
    <div
      className={
        "w-full rounded-xl p-4 bg-secondary dark:bg-secondary/30 max-h-[300px] overflow-y-scroll"
      }
    >
      <div className={"flex items-center justify-between"}>
        <p className={"text-lg"}>chapters</p>
        <Button variant={"ghost"}>
          <Plus size={18} className={"mr-3"} /> Add
        </Button>
      </div>

      <div className={"mt-3"}>
        {chapters.length === 0 ? (
          <p
            className={"italic text-slate-600 dark:text-primary-foreground/30"}
          >
            No chapters
          </p>
        ) : null}
      </div>
    </div>
  );
}

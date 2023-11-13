"use client";

import { useEffect, useState } from "react";
import { httpClient } from "@/lib/httpClient";
import { CourseCard } from "@/components/course/course-card";
import { Loader2 } from "lucide-react";

export default function BrowsePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<any>(null);

  useEffect(() => {
    httpClient.get("course/published").then((r) => {
      setCourses(r.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div
          className={
            "fixed inset-0 bg-black backdrop-blur flex justify-center items-center"
          }
        >
          <Loader2 className={"animate-spin"} size={40} />
        </div>
      ) : (
        <div
          className={
            "grid grid-cols-1  sm:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4"
          }
        >
          {courses?.map((course: any, idx: number) => {
            return (
              <CourseCard
                key={idx}
                price={course["price"]}
                title={course["title"]}
                imageUrl={course["imageUrl"]}
                description={course["description"]}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

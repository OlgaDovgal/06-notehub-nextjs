"use client";

import { fetchNoteById } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: note } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.tag}>{note?.tag}</p>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
        </div>
      </div>
    </main>
  );
};
export default NoteDetailsClient;

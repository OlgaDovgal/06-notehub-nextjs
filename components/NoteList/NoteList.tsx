import { QueryClient, useMutation } from "@tanstack/react-query";

import css from "./NoteList.module.css";
import toast from "react-hot-toast/headless";
import type { Note } from "../../types/note";
import { deleteNote } from "@/lib/api/api";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      toast.success("Note deleted successfully!");
    },
  });
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

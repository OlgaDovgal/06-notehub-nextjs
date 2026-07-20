"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";

const NotesClient = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });
  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setPage(1);
  }, 1000);
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {modalIsOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
};
export default NotesClient;

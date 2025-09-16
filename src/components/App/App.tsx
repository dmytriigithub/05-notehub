import css from "./App.module.css";

import { useState, useEffect } from "react";
import { fetchNotes, deleteNote } from "../../services/noteService";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    // enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data && data.notes.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const totalPages = data?.totalPages ?? 0;
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      toast.success("Note deleted!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDeleteNote = (noteId: string) => {
    mutationDelete.mutate(noteId);
  };

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    300
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox updateSearchQuery={updateSearchQuery} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDeleteNote} />
      )}
      {(isLoading || mutationDelete.isPending) && <Loader />}
      {isError && (
        <ErrorMessage>{"There was an error, please try again..."}</ErrorMessage>
      )}
      {mutationDelete.isError && (
        <ErrorMessage>{"An error occurred"}</ErrorMessage>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;

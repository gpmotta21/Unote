import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";
import colorI from "../../assets/img/color.png";

import {
  ColorList,
  Colors,
  ColorSelector,
  InputCounter,
  NoteHeader,
  NoteIcon,
  NoteMain,
  StyledNoteCreator,
} from "./NoteCreator";

import { i } from "../../assets/icons.js";
import { deleteNote, editNote, fetchAll } from "../../redux/userSlice";
import { useEffect } from "react";

function NoteList() {
  const { user } = useSelector((state) => state);

  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newColor, setNewColor] = useState("");
  const [selectedNote, setSelectedNote] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    if (!user.response) dispatch(fetchAll(config));
  }, []);

  const edit = (item) => {
    setNewColor(item.color);
    setNewTitle(item.title);
    setNewNote(item.note);

    !selectedNote ? setSelectedNote(item._id) : setSelectedNote(false);
  };

  const handleSave = (item) => {
    setSelectedNote(false);
    dispatch(editNote({ noteId: item._id, edit: { title: newTitle, note: newNote, color: newColor } }));
  };

  return (
    <>
      {user.response.notes &&
        user.response.notes.map((item, index) => {
          return (
            <StyledNoteList
              colorList={item._id == selectedNote ? newColor : item.color}
              selectedNote={selectedNote == item._id ? true : false}
            >
              <NoteHeader>
                <div>
                  <input
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                    disabled={selectedNote == item._id ? false : true}
                    value={selectedNote == item._id ? newTitle : item.title}
                    maxLength="15"
                  />
                  <InputCounter>
                    {selectedNote == item._id ? 15 - newTitle.length : 15 - item.title.length}
                  </InputCounter>
                </div>
                <ColorSelector style={{ pointerEvents: selectedNote == item._id ? "all" : "none" }}>
                  <img
                    src={colorI}
                    style={{
                      opacity: selectedNote == item._id ? "1" : ".4",
                    }}
                  />
                  <ColorList>
                    <Colors onClick={() => setNewColor("#FFB703")} style={{ background: "#FFB703" }}></Colors>
                    <Colors onClick={() => setNewColor("#6C63FF")} style={{ background: "#6C63FF" }}></Colors>
                    <Colors onClick={() => setNewColor("#06d6a0")} style={{ background: "#06d6a0" }}></Colors>
                    <Colors onClick={() => setNewColor("#ff002b")} style={{ background: "#ff002b" }}></Colors>
                    <Colors onClick={() => setNewColor("#603808")} style={{ background: "#603808" }}></Colors>
                    <Colors onClick={() => setNewColor("#9ef01a")} style={{ background: "#9ef01a" }}></Colors>
                  </ColorList>
                </ColorSelector>
              </NoteHeader>
              <NoteMain>
                <textarea
                  onChange={(e) => setNewNote(e.target.value)}
                  disabled={selectedNote == item._id ? false : true}
                  value={selectedNote == item._id ? newNote : item.note}
                  maxLength="200"
                />
                <InputCounter>{selectedNote == item._id ? 200 - newNote.length : 200 - item.note.length}</InputCounter>
              </NoteMain>

              <div>
                {user.loadingNotes ? (
                  <LoadingButton loading />
                ) : (
                  <NoteIcon
                    disabled={selectedNote}
                    onClick={() => {
                      dispatch(deleteNote({ userId: user.response._id, noteId: item._id }));
                    }}
                  >
                    {i.delete}
                    <span>Delete</span>
                  </NoteIcon>
                )}
                {selectedNote == item._id ? (
                  <NoteIcon onClick={() => handleSave(item)}>
                    {i.save}
                    <span>Save</span>
                  </NoteIcon>
                ) : (
                  ""
                )}
                {user.loadingNotes ? (
                  <LoadingButton loading />
                ) : (
                  <NoteIcon disabled={selectedNote !== false ? true : false} onClick={() => edit(item, index)}>
                    {i.edit}
                    <span>Edit</span>
                  </NoteIcon>
                )}
              </div>
            </StyledNoteList>
          );
        })}
    </>
  );
}

const StyledNoteList = styled(StyledNoteCreator)`
  background-color: ${(props) => props.colorList};
  ${InputCounter} {
    display: ${(props) => (props.selectedNote ? "flex" : "none")};
  }
`;

export default NoteList;

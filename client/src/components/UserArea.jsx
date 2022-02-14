import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatedPages } from "./AnimatedPages";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";

import { i } from "../assets/icons.js";
import { devices } from "../assets/devices";
import colorI from "../assets/img/color.png";
import { CreateNote, DeleteNote, EditNote } from "../redux/Actions/NoteActions";
import { FetchAll } from "../redux/Actions/UserActions";

function UserArea() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [color, setColor] = useState("#FFB703");
  const [listColor, setListColor] = useState("");

  const [liId, setLiId] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const UserReducer = useSelector((state) => state.UserReducer);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    dispatch(FetchAll(config));
  }, []);

  useEffect(() => {
    if (UserReducer.error || token == null) navigate("/error");
  }, [UserReducer]);

  const createNote = () => {
    dispatch(CreateNote({ title: title, note: note, color: color }, UserReducer.user._id));
    setTitle("");
    setNote("");
  };

  const edit = (item, index) => {
    setListColor(item.color);
    setTitle(item.title);
    setNote(item.note);

    !liId ? setLiId(item._id) : setLiId(false);
  };

  const saveEdit = (item) => {
    setLiId(false);
    dispatch(EditNote(item._id, { title: title, note: note, color: listColor }));
    setTitle("");
    setNote("");
  };

  const animations = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  };

  return (
    <StyledUser animations={animations}>
      <ul>
        <StyledNoteCreator color={color}>
          <div>
            <input disabled={liId} value={liId ? "" : title} onChange={(e) => setTitle(e.target.value)} />
            <ColorSelector style={{ pointerEvents: liId ? "none" : "all" }}>
              <img
                src={colorI}
                style={{
                  maxWidth: "30px",
                  opacity: !liId ? "1" : ".4",
                }}
              />

              <ColorList>
                <Colors onClick={() => setColor("#FFB703")} style={{ background: "#FFB703" }}></Colors>
                <Colors onClick={() => setColor("#6C63FF")} style={{ background: "#6C63FF" }}></Colors>
                <Colors onClick={() => setColor("#06d6a0")} style={{ background: "#06d6a0" }}></Colors>
                <Colors onClick={() => setColor("#ff002b")} style={{ background: "#ff002b" }}></Colors>
                <Colors onClick={() => setColor("#603808")} style={{ background: "#603808" }}></Colors>
                <Colors onClick={() => setColor("#9ef01a")} style={{ background: "#9ef01a" }}></Colors>
              </ColorList>
            </ColorSelector>
          </div>
          <textarea disabled={liId} value={liId ? "" : note} onChange={(e) => setNote(e.target.value)} />
          <div>
            {UserReducer.loadingNotes ? (
              <LoadingButton loading />
            ) : (
              <NoteIcon disabled={liId} onClick={createNote}>
                {i.add}
                <span>Add</span>
              </NoteIcon>
            )}
          </div>
        </StyledNoteCreator>
        {UserReducer.notes.map((item, index) => {
          return (
            <StyledNoteList
              colorList={item._id == liId ? listColor : item.color}
              isEdit={item._id == liId ? true : false}
            >
              <div>
                <input
                  style={{
                    border: liId == item._id ? "#2b2d42 solid 2px" : "none",
                  }}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={liId == item._id ? false : true}
                  value={liId == item._id ? title : item.title}
                />
                <ColorSelector style={{ pointerEvents: liId == item._id ? "all" : "none" }}>
                  <img
                    src={colorI}
                    style={{
                      maxWidth: "30px",
                      opacity: liId == item._id ? "1" : ".4",
                    }}
                  />
                  <ColorList>
                    <Colors onClick={() => setListColor("#FFB703")} style={{ background: "#FFB703" }}></Colors>
                    <Colors onClick={() => setListColor("#6C63FF")} style={{ background: "#6C63FF" }}></Colors>
                    <Colors onClick={() => setListColor("#06d6a0")} style={{ background: "#06d6a0" }}></Colors>
                    <Colors onClick={() => setListColor("#ff002b")} style={{ background: "#ff002b" }}></Colors>
                    <Colors onClick={() => setListColor("#603808")} style={{ background: "#603808" }}></Colors>
                    <Colors onClick={() => setListColor("#9ef01a")} style={{ background: "#9ef01a" }}></Colors>
                  </ColorList>
                </ColorSelector>
              </div>
              <textarea
                onChange={(e) => setNote(e.target.value)}
                disabled={liId == item._id ? false : true}
                value={liId == item._id ? note : item.note}
              />
              <div>
                {UserReducer.loadingNotes ? (
                  <LoadingButton loading />
                ) : (
                  <NoteIcon
                    disabled={liId}
                    onClick={() => {
                      setTitle("");
                      setNote("");
                      dispatch(DeleteNote(UserReducer.user._id, item._id));
                    }}
                  >
                    {i.delete}
                    <span>Delete</span>
                  </NoteIcon>
                )}
                {liId == item._id ? (
                  <NoteIcon onClick={() => saveEdit(item)}>
                    {i.save}
                    <span>Save</span>
                  </NoteIcon>
                ) : (
                  ""
                )}
                {UserReducer.loadingNotes ? (
                  <LoadingButton loading />
                ) : (
                  <NoteIcon disabled={liId !== false ? true : false} onClick={() => edit(item, index)}>
                    {i.edit}
                    <span>Edit</span>
                  </NoteIcon>
                )}
              </div>
            </StyledNoteList>
          );
        })}
      </ul>
    </StyledUser>
  );
}

const StyledUser = styled(AnimatedPages)`
  display: flex;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  * {
    font-family: "Nunito", sans-serif;
    font-size: 20px;
  }

  ul {
    display: flex;
    padding: 20px;
    gap: 5%;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  @media ${devices.tablet} {
    ul {
      gap: 10%;
    }
  }
`;

const StyledNoteCreator = styled.div`
  min-width: 30%;
  height: 350px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.color};
  background-color: ${(props) => props.color};
  transition: all 0.5s;

  > div:first-child,
  > div:last-child {
    height: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  input {
    width: 70%;
    height: 100%;
    border-radius: 8px;
    border: none;
    padding: 5px;
    background: var(--white);
    color: var(--black);
  }

  textarea {
    height: 65%;
    padding: 5px;
    border-radius: 8px;
    border: 2px solid #2b2d42;
    background: var(--white);
    color: var(--black);
    scrollbar-width: thin;
    scrollbar-color: #14213d #ced4da;
    resize: none;
  }

  textarea:disabled,
  input:disabled {
    background-color: rgb(255, 255, 255, 0.5);
  }

  @media ${devices.tablet} {
    width: 45%;
  }
  @media ${devices.mobile} {
    width: 100%;
  }
`;

const StyledNoteList = styled(StyledNoteCreator)`
  background-color: ${(props) => props.colorList};
  input:disabled {
    border-bottom: black 2px solid;
  }
`;

export const NoteIcon = styled(IconButton)`
  display: flex;
  flex-direction: column;

*{
  font-size: 30px;
}
  

  span {
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s;
    font-size: 14px;
  }
  :hover span {
    max-height: 30px;
  }

  @media ${devices.mobile} {
    span {
      max-height: 30px;
    }
  }
`;

const ColorSelector = styled.div`
  position: relative;
  width: 25%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  // The div down bellow is the Color List
  :hover > div {
    height: 200px;
    opacity: 1;
  }
`;

const ColorList = styled.div`
  gap: 5px;
  position: absolute;
  top: 0;
  left: 50%;
  height: 0;
  overflow: hidden;
  transition: all 0.5s;
  opacity: 0;
`;

const Colors = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 5px 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: solid black 2px;

  :hover {
    transform: scale(1.3);
  }
`;

export default UserArea;

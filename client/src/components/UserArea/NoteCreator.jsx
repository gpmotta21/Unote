import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createNote } from "../../redux/userSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import { i } from "../../assets/icons.js";
import { devices } from "../../assets/devices";
import colorI from "../../assets/img/color.png";

function NoteCreator() {
  const { user } = useSelector((state) => state);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [color, setColor] = useState("#FFB703");

  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(createNote({ title: title, note: note, color: color, userId: user.response._id }));
  };

  return (
    <StyledNoteCreator color={color}>
      <NoteHeader>
        <div>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            maxLength="15"
          ></input>
          <InputCounter>{15 - title.length}</InputCounter>
        </div>
        <ColorSelector>
          <img src={colorI} />

          <ColorList>
            <Colors onClick={() => setColor("#FFB703")} style={{ background: "#FFB703" }}></Colors>
            <Colors onClick={() => setColor("#6C63FF")} style={{ background: "#6C63FF" }}></Colors>
            <Colors onClick={() => setColor("#06d6a0")} style={{ background: "#06d6a0" }}></Colors>
            <Colors onClick={() => setColor("#ff002b")} style={{ background: "#ff002b" }}></Colors>
            <Colors onClick={() => setColor("#603808")} style={{ background: "#603808" }}></Colors>
            <Colors onClick={() => setColor("#9ef01a")} style={{ background: "#9ef01a" }}></Colors>
          </ColorList>
        </ColorSelector>
      </NoteHeader>
      <NoteMain>
        <textarea onChange={(e) => setNote(e.target.value)} maxLength="200" />
        <InputCounter>{200 - note.length}</InputCounter>
      </NoteMain>
      <div>
        {user.loadingNotes ? (
          <LoadingButton loading />
        ) : (
          <NoteIcon onClick={handleCreate}>
            {i.add}
            <span>Add</span>
          </NoteIcon>
        )}
      </div>
    </StyledNoteCreator>
  );
}

export const StyledNoteCreator = styled.div`
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

  > div:last-child {
    height: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  textarea,
  input {
    outline: none;
    border: none;
  }

  textarea:disabled,
  input:disabled {
    background-color: rgb(255, 255, 255, 0.5);
  }

  textarea:focus,
  input:focus {
    border: none;
    outline: none;
  }

  @media (max-width: 1083px) {
    min-width: 45%;
  }
  @media (max-width: 742px) {
    min-width: 90%;
  }
`;

export const NoteHeader = styled.div`
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div:first-child {
    position: relative;
    width: 70%;
    height: 100%;
  }

  span {
    left: 100%;
    top: 15%;
  }

  input {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: none;
    padding: 5px;
    background: var(--white);
    color: var(--black);
    font-size: 20px;
  }
`;

export const NoteMain = styled.div`
  height: 65%;
  position: relative;

  textarea {
    width: 100%;
    height: 100%;
    padding: 5px;
    border-radius: 8px;
    background: var(--white);
    color: var(--black);
    scrollbar-width: thin;
    ::-webkit-scrollbar-track {
      background: var(--white);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--black);
    }
    resize: none;
    font-size: 20px;
  }

  span {
    top: 100%;
    left: 97%;
  }
`;

export const NoteIcon = styled(IconButton)`
  display: flex;
  flex-direction: column;
  * {
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

export const ColorSelector = styled.div`
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

  img {
    max-width: 30px;
  }
`;

export const ColorList = styled.div`
  gap: 5px;
  position: absolute;
  top: 0;
  left: 50%;
  height: 0;
  overflow: hidden;
  transition: all 0.5s;
  opacity: 0;
  z-index: 2;
`;

export const Colors = styled.div`
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

export const InputCounter = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.color};
  color: ${(props) => props.theme.bG};
  border: ${(props) => props.theme.bG} 2px solid;
  border-radius: 50px;
  width: 30px;
  height: 30px;
  font-size: 12px;
`;

export default NoteCreator;

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatedPages } from "../AnimatedPages";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTransition } from "react-spring";
import { AnimatedMessage } from "../Homepage/Register";
import NoteList from "./NoteList";
import NoteCreator from "./NoteCreator";

function UserArea() {
  const { user } = useSelector((state) => state);

  const [noteErrorMessage, setNoteErrorMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.error) navigate("/error");
    if (user.response == "deleted") navigate("/");

    if (user.noteError) {
      setNoteErrorMessage(true);

      setTimeout(() => {
        setNoteErrorMessage(false);
      }, 4000);
    }
  }, [user]);

  const animations = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  };
  const noteMessage = useTransition(noteErrorMessage, {
    from: { x: 100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
  });

  return (
    <StyledUser animations={animations}>
      <ul>
        <NoteCreator />
        <NoteList />
      </ul>
      {noteMessage((style, item) => {
        return (
          item && (
            <AnimatedNoteMessage style={style}>
              Unote rules
              <li>Make sure title and note content are not empty</li>
              <li>Make sure title and note content dont surpass length limit</li>
            </AnimatedNoteMessage>
          )
        );
      })}
    </StyledUser>
  );
}

const StyledUser = styled(AnimatedPages)`
  display: flex;
  min-height: 80vh;
  overflow-x: hidden;
  position: relative;
  * {
    font-family: "Nunito", sans-serif;
  }

  ul {
    display: flex;
    padding: 20px;
    gap: 5%;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1083px) {
    ul {
      gap: 10%;
    }
  }

  @media (max-width: 742px) {
    ul {
      justify-content: center;
    }
  }
`;

const AnimatedNoteMessage = styled(AnimatedMessage)`
  height: auto;
  width: auto;
  top: 0;
  right: 5%;
  font-size: 12px;
  background: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.color};

  li {
    margin-top: 8px;
    list-style: disc !important;
  }
`;

export default UserArea;

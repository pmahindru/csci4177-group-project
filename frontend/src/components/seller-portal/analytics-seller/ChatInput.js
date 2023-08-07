// Created by Parth Patel
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container"></div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <SendButton type="submit">
          <IoMdSend />
        </SendButton>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1% 99%;
  background-color: white;
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #f2f2f2;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      @media screen and (max-width: 720px) {
        font-size: 14px;
      }

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }
  }
`;

const SendButton = styled.button`
  padding: 0.3rem 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6c4998;
  border: none;

  @media screen and (max-width: 720px) {
    padding: 0.3rem 1rem;
    svg {
      font-size: 1.5rem;
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.3rem 1rem;
    svg {
      font-size: 1rem;
    }
  }

  svg {
    font-size: 2rem;
    color: white;
  }
`;
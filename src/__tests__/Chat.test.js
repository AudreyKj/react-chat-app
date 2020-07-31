import React from "react";
import Chat from "../Chat.js";
import mockedAxios from "axios";
import { render, waitForElement } from "@testing-library/react";

it("shows loading message before GET request and displays messages upon success", async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: [
      {
        _id: 23456,
        author: "user",
        message: "hello",
        timestamp: 345643,
        token: "457778"
      }
    ]
  });

  const { getByTestId } = render(<Chat />);

  expect(getByTestId("loading")).toHaveTextContent("Loading...");

  const pastMessages = await waitForElement(() => getByTestId("past-messages"));

  expect(pastMessages).toHaveTextContent("hello");

  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
});

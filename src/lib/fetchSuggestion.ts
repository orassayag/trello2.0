import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);
  let res = null;
  try {
    res = await fetch("/api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos }),
    });
  } catch {}
  const gptData = await res?.json();
  const { content } = gptData;
  return content;
};

export default fetchSuggestion;

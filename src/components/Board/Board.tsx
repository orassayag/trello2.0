"use client";

import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "@/store/BoardStore";
import Column from "@/components/Column/Column";

export default function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // Check if the user dragged card outside the board.
    if (!destination) {
      return;
    }
    // Handle the column drag.
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const updatedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: updatedColumns,
      });
      return;
    }
    // This step is needed as the indexes are stored as numbers 0,1,2, etc. instead of the Ids's with DND library.
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];
    // Rebuild the columns indexes.
    const startCol: Column = {
      id: startColIndex[1].id,
      todos: startColIndex[1].todos,
    };
    const finishCol: Column = {
      id: finishColIndex[1].id,
      todos: finishColIndex[1].todos,
    };
    if (!startCol || !finishCol) {
      return;
    }
    if (source.index === destination.index && startCol === finishCol) {
      return;
    }
    const updatedToDos = startCol.todos;
    const [todoMoved] = updatedToDos.splice(source.index, 1);
    if (startCol.id === finishCol.id) {
      // Same column task drag.
      updatedToDos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: updatedToDos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({
        ...board,
        columns: newColumns,
      });
    } else {
      // Dragging to another column.
      const finishedTodos = Array.from(finishCol.todos);
      finishedTodos.splice(destination.index, 0, todoMoved);
      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: updatedToDos,
      };
      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishedTodos,
      });
      // Update in DB.
      updateTodoInDB(todoMoved, finishCol.id);
      setBoardState({
        ...board,
        columns: newColumns,
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
    >
      <Droppable
        droppableId="board"
        direction="horizontal"
        type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], i) => (
              <Column
                key={id}
                id={id as TypedColumn}
                todos={column.todos}
                index={i}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

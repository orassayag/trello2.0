import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "@/components/TodoCard/TodoCard";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn,
  todos: Todo[],
  index: number
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  'todo': 'To Do',
  'inprogress': 'In Progress',
  'done': 'Done'
};

export default function Column({ id, todos, index }: Props) {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);
  const toggleModal = useModalStore((state) => state.toggleModal);
  const handleAddTodo = () => {
    setNewTaskType(id);
    toggleModal();
  };
  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable
            droppableId={index.toString()}
            type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}
              >
                <h2 className="flex justify-between font-bold text-xl py-2">{idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                    {searchString ? todos.filter((item) => item.title.toLowerCase().includes(searchString.toLowerCase())).length : todos.length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {todos.map((item, i) => {
                    if (searchString && !item.title.toLowerCase().includes(searchString.toLowerCase())) {
                      return null;
                    }
                    return (
                      <Draggable
                        key={item.$id}
                        draggableId={item.$id}
                        index={i}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={item}
                            index={i}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}

                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2" >
                    <button
                      type="button"
                      className="text-green-500 hover:text-green-600"
                      onClick={handleAddTodo}
                    >
                      <PlusCircleIcon
                        className="h-10 w-10"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div >
      )
      }
    </Draggable >
  );
}

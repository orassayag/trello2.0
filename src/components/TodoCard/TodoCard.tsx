'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";
import { useBoardStore } from "@/store/BoardStore";
import getUrl from "@/lib/getUrl";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  innerRef: (element: HTMLElement | null) => void;
};

export default function TodoCard({
  todo,
  index,
  id,
  draggableProps,
  dragHandleProps,
  innerRef,
}: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          type="button"
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon
            className="ml-5 h-8 w-8"
            onClick={() => deleteTask(index, todo, id)}
          />
        </button>
      </div>
      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
            priority={true}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { useRef, Fragment, FormEvent } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useModalStore } from '@/store/ModalStore';
import { useBoardStore } from '@/store/BoardStore';
import TaskTypeRadioGroup from '@/components/TaskTypeRadioGroup/TaskTypeRadioGroup';

export default function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [newTaskInput, setNewTaskInput, newTaskType, image, setImage, addTask] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.newTaskType,
      state.image,
      state.setImage,
      state.addTask,
    ]);
  const [isOpen, toggleModal] = useModalStore((state) => [
    state.isOpen,
    state.toggleModal,
  ]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) {
      return;
    }
    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    toggleModal();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='form'
        className='relative z-10'
        onClose={toggleModal}
        onSubmit={handleSubmit}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-x-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='pb-2 text-lg font-medium leading-6 text-gray-900'
                >
                  Add a Task
                </Dialog.Title>
                <div className='mt-2'>
                  <input
                    type='text'
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder='Enter a task here...'
                    className='w-full rounded-md border border-gray-300 p-5 outline-none'
                  ></input>
                </div>
                <TaskTypeRadioGroup />
                <div className='mt-2'>
                  <button
                    type='button'
                    className='w-full rounded-md border border-gray-300 p-5 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={() => imagePickerRef.current?.click()}
                  >
                    <PhotoIcon className='mr-2 inline-block h-6 w-6' />
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      alt='Uploaded Image'
                      width={200}
                      height={200}
                      className='mt-2 h-44 w-full cursor-not-allowed object-cover filter transition-all duration-150 hover:grayscale'
                      src={URL.createObjectURL(image)}
                      onClick={() => setImage(null)}
                      priority={true}
                    />
                  )}
                  <input
                    type='file'
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      // Check if e is an image.
                      if (!e.target.files![0].type.startsWith('image/')) {
                        return;
                      }
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>
                <div className='mt-4'>
                  <button
                    type='submit'
                    disabled={!newTaskInput}
                    className='focus-visible: inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 ring-2 hover:bg-blue-200 focus:outline-none focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300'
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

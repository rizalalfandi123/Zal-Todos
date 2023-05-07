import type { DraggableLocation } from '@hello-pangea/dnd';
import { produce } from 'immer';
import type { SectionMap, Todo } from '../services';

import { useProjectStore } from '../services';

export function reorderTodos(args: { list: Todo[]; startIndex: number; endIndex: number }): Todo[] {
 const { list, startIndex, endIndex } = args;

 // TODO: Copy list array
 const todos = Array.from(list);

 // TODO: pick removed element
 const [pickElement] = todos.splice(startIndex, 1);

 todos.splice(endIndex, 0, pickElement);

 todos.forEach((_, index) => {
  return (todos[index].index = index);
 });

 return todos;
}

interface ReorderSectionMapArgs {
 sectionMap: SectionMap;
 source: DraggableLocation;
 destination: DraggableLocation;
}

interface ReorderSectionMapResult {
 sectionMap: SectionMap;
}

type ReorderSectionMapFunction = (args: ReorderSectionMapArgs) => ReorderSectionMapResult;

const setUpdatedTodos = useProjectStore.getState().setUpdatedTodos;

export const reorderSectionMap: ReorderSectionMapFunction = (args) => {
 const { destination, source, sectionMap } = args;

 const current: Todo[] = sectionMap[source.droppableId].todos;

 const next: Todo[] = sectionMap[destination.droppableId].todos;

 const target: Todo = current[source.index];

 // TODO: Moving same list
 if (source.droppableId === destination.droppableId) {
  const reorderedTodo: Todo[] = reorderTodos({ list: current, endIndex: destination.index, startIndex: source.index });

  const result: SectionMap = {
   ...sectionMap,
   [source.droppableId]: { ...sectionMap[source.droppableId], todos: reorderedTodo },
  };

  setUpdatedTodos(reorderedTodo);

  return {
   sectionMap: result,
  };
 }

 // TODO: Moving difference list

 // !: Update sectionId in target
 produce(() => {
  target['sectionId'] = destination.droppableId;
 });

 // !: Remove element from original list
 produce(() => {
  current.splice(source.index, 1);
 });

 // !: Insert element into next list
 produce(() => {
  next.splice(destination.index, 0, target);
 });

 next.forEach((_, index) => {
  next[index].index = index;
 });

 const result: SectionMap = {
  ...sectionMap,
  [source.droppableId]: { ...sectionMap[source.droppableId], todos: current },
  [destination.droppableId]: { ...sectionMap[destination.droppableId], todos: next },
 };

 setUpdatedTodos(next);

 return {
  sectionMap: result,
 };
};

function unfreezeObject<T extends object>(obj: T): T {
 if (typeof obj === 'object' && obj !== null) {
  Object.seal(obj);

  Object.entries(obj).forEach(([key, value]) => {
   if (typeof value === 'object') unfreezeObject(value);
  });
 }
 return obj;
}

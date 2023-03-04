import { useCallback, useRef } from "react";
import Sortable, { SortableEvent } from "sortablejs";

interface IProps {
  className?: string;
  children: React.ReactNode;
  groupName?: string;
  handleClassName?: string;
  disabled?: boolean;
  dragId?: number | string;
  onReorder(
    fromIndex: number,
    toIndex: number,
    fromId: string | undefined,
    toId: string | undefined
  ): Promise<{ success: boolean }>;
}

export const ReorderableList = ({
  className,
  groupName,
  handleClassName,
  children,
  dragId,
  disabled,
  onReorder,
}: IProps) => {
  const sortable = useRef<Sortable | null>(null);

  const onReorderEnd = useCallback(
    async (evt: SortableEvent) => {
      const fromId = evt.from.dataset.dragid;
      const toId = evt.to.dataset.dragid;

      const oldIndex = evt.oldDraggableIndex as number;
      const newIndex = evt.newDraggableIndex as number;

      if (oldIndex === newIndex && fromId === toId) {
        return undefined;
      }

      const { success } = await onReorder(oldIndex, newIndex, fromId, toId);

      if (success) {
        return undefined;
      }

      // undo
      const { tagName } = evt.item;
      const items = evt.from.getElementsByTagName(tagName);

      if (oldIndex > newIndex) {
        evt.from.insertBefore(evt.item, items[oldIndex + 1]);
      } else {
        evt.from.insertBefore(evt.item, items[oldIndex]);
      }

      return false;
    },
    [onReorder]
  );

  const onDivRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (!ref) {
        return;
      }

      if (sortable.current) {
        sortable.current.option("disabled", disabled);
        sortable.current.option("onEnd", onReorderEnd);
      } else {
        sortable.current = Sortable.create(ref, {
          group: groupName,
          animation: 150,
          handle: handleClassName ? `.${handleClassName}` : undefined,
          disabled,
          onEnd: onReorderEnd,
        });
      }
    },
    [disabled, groupName, handleClassName, onReorderEnd]
  );

  return (
    <div className={className} ref={onDivRef} data-dragid={dragId}>
      {children}
    </div>
  );
};

import { useCallback, useEffect, useRef } from "react";
import Sortable from "sortablejs";

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

  useEffect(() => {
    sortable.current?.option("disabled", disabled);
  }, [disabled]);

  const onDivRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (!ref || sortable.current) {
        return;
      }

      sortable.current = Sortable.create(ref, {
        group: groupName,
        animation: 150,
        handle: handleClassName ? `.${handleClassName}` : undefined,
        disabled,
        onEnd: async (evt) => {
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
      });
    },
    [disabled, groupName, handleClassName, onReorder]
  );

  return (
    <div className={className} ref={onDivRef} data-dragid={dragId}>
      {children}
    </div>
  );
};

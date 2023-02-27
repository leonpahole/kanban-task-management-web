interface IProps {
  onClick(): void;
}

export const ColumnAdd = ({ onClick }: IProps) => {
  return (
    <button
      className="mt-10 ml-6 mb-12 flex w-70 flex-shrink-0 items-center justify-center self-stretch rounded-md bg-add-column-gradient-light text-hxl text-gray-medium hover:text-purple-100 dark:bg-add-column-gradient-dark"
      type="button"
      onClick={onClick}
    >
      + New Column
    </button>
  );
};

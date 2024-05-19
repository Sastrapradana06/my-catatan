"use client";

import { useAppStore } from "@/utils/store";
import { useShallow } from "zustand/react/shallow";

const BtnCheckBox = ({ id }: { id: string | number }) => {
  const [selectedId, setSelectedId, isEdit] = useAppStore(
    useShallow((state: any) => [
      state.selectedId,
      state.setSelectedId,
      state.isEdit,
    ])
  );
  const handleCheck = () => {
    const isSelected = selectedId.includes(id);
    if (isSelected) {
      setSelectedId(selectedId.filter((item: any) => item !== id));
    } else {
      setSelectedId([...selectedId, id]);
    }
  };

  return (
    isEdit && (
      <button>
        <input type="checkbox" onClick={handleCheck} />
      </button>
    )
  );
};

export default BtnCheckBox;

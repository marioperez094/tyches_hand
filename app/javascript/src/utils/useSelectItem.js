import { useState } from "react";

export function useSelectItem() {
  const [selectedItem, setSelectedItem] = useState();
  const [source, setSource] = useState(null);

  function handleItemTap(item, source) {
    setSelectedItem(item)
    setSource(source)

    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
      setSource(null);
    }
  };
  
  return { selectedItem, setSelectedItem, source, setSource, handleItemTap };
};
export default function useItemManager() {
  function moveItems(source, target, items) {
    console.log(items)
    const updatedSource = source.filter((item) => !items.some((i) => i.id === item.id));
    const updatedTarget = [...items, ...target]

    return { updatedSource, updatedTarget };
  };

  function sortItemsByID(playerLoadout, playerCollection) {
    const updatedLoadout = playerLoadout.slice().sort((a, b) => a.id - b.id);
    const updatedCollection = playerCollection.slice().sort((a, b) => a.id - b.id);

    return { updatedLoadout, updatedCollection };
  };

  function clearLoadout(playerLoadout, playerCollection) {
    return { updatedSource: [], updatedTarget: [...playerLoadout, ...playerCollection] };
  };

  return { moveItems, sortItemsByID, clearLoadout };

};
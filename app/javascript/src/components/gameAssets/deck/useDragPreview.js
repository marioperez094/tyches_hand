import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Card from "@components/gameAssets/cards/card";

export function useDragPreview() {
  const [draggingItem, setDraggingItem] = useState(null);
  const [source, setSource] = useState("");


  function createDragImage(previewComponent) {
    const dragPreviewContainer = document.createElement("div");
    dragPreviewContainer.style.position = "absolute";
    dragPreviewContainer.style.top = "-9999px";
    dragPreviewContainer.style.left = "-9999px";
    document.body.appendChild(dragPreviewContainer);

    const root = ReactDOM.createRoot(dragPreviewContainer);
    root.render(previewComponent);

    return { dragPreviewContainer, root };
  };

  function handleDragStart(e, item, source, previewComponent) {
    setDraggingItem(item);
    setSource(source)

    const { dragPreviewContainer, root } = createDragImage(previewComponent);

    e.dataTransfer.setDragImage(dragPreviewContainer, 75, 100);

    setTimeout(() => {
      root.unmount();
      document.body.removeChild(dragPreviewContainer);
    }, 0);
  };

  function handleTouchStart(e, item, source, previewComponent) {
    setDraggingItem(item);
    setSource(source);

    const { dragPreviewContainer, root } = createDragImage(previewComponent);

    const dragEvent = new DragEvent("dragstart", {
      bubbles: true,
      cancelable: true,
    });

    dragEvent.dataTransfer.setDragImage(dragPreviewContainer, 75, 100);

    e.target.dispatchEvent(dragEvent);
    dragEvent.dataTransfer.setDragImage(dragPreviewContainer, 75, 100);

    setTimeout(() => {
      root.unmount();
      document.body.removeChild(dragPreviewContainer);
    }, 0);
  };
  

  return { draggingItem, source, setDraggingItem, handleDragStart, handleTouchStart };
}

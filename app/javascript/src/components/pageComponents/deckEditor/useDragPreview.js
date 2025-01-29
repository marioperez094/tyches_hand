import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Card from "@components/gameAssets/cards/card";

export function useDragPreview() {
  const [draggingCard, setDraggingCard] = useState(null);
  const [cardSource, setCardSource] = useState("");

  function handleDragStart(e, card, sourceStack) {
    setDraggingCard(card);
    setCardSource(sourceStack);

    const dragPreviewContainer = document.createElement("div");
    dragPreviewContainer.style.position = "absolute";
    dragPreviewContainer.style.top = "-9999px";
    dragPreviewContainer.style.left = "-9999px";
    document.body.appendChild(dragPreviewContainer);

    const root = ReactDOM.createRoot(dragPreviewContainer);
    root.render(<Card card={card} />);
    e.dataTransfer.setDragImage(dragPreviewContainer, 75, 100);

    setTimeout(() => {
      root.unmount();
      document.body.removeChild(dragPreviewContainer);
    }, 0);
  }

  return { draggingCard, cardSource, setDraggingCard, handleDragStart };
}

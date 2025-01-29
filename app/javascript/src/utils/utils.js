export function capitalizeFirstWord(string) {
  if (!string) return string;

  let newString = string.split("_").join(" ")
    
  return newString.charAt(0).toUpperCase() + newString.slice(1).toLowerCase();
};

export function filterGivenCards(cards, filters) {
  cards = cards.filter((card) => {
    if (filters[card.effect_type]) return true;
    if (filters["High cards"] && (isNaN(card.rank) || Number(card.rank) > 7)) return true;
    if (filters["Low cards"] && parseInt(card.rank) <= 7) return true;
    return false;
  })
  return cards
};
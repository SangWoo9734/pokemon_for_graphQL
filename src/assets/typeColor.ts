//color of type
export const TYPE = [
  "NORMAL",
  "FIRE",
  "WATER",
  "ELECTRIC",
  "GRASS",
  "FAIRY",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DRAGON",
  "DARK",
  "STEEL",
];

export const colorOfType = (type: string) => {
  switch (type) {
    case "NORMAL":
      return "#99999e";

    case "FIRE":
      return "#e4a36c";

    case "WATER":
      return "#6a8eca";

    case "ELECTRIC":
      return "#e9d36d";

    case "GRASS":
      return "#87b56f";

    case "FAIRY":
      return "#d297dc";

    case "ICE":
      return "#9bcac0";

    case "FIGHTING":
      return "#af526a";

    case "POISON":
      return "#9a70bd";

    case "GROUND":
      return "#bf8058";

    case "FLYING":
      return "#99a7d5";

    case "PSYCHIC":
      return "#d77e7c";

    case "BUG":
      return "#a2be5a";

    case "ROCK":
      return "#c1b793";

    case "GHOST":
      return "#5b68a2";

    case "DRAGON":
      return "#426bb8";

    case "DARK":
      return "#575364";

    case "STEEL":
      return "#6f8c9c";

    default:
      return "#ffffff";
  }
};

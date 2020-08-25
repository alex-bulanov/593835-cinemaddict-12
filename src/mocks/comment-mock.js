import {EMOJI} from "../const.js";
import {getRandomInteger} from "../utils.js";


const generateCommentDate = () => {
  return new Date();
};

export const createCommentDataTemplate = () => {
  return {
    author: `Tim Macoveev`,
    text: `Interesting setting and a good cast`,
    emoji: EMOJI[getRandomInteger(0, EMOJI.length - 1)],
    date: generateCommentDate(),
  };
};

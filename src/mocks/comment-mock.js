import {getRandomInteger} from "../utils.js";
import {nanoid} from 'nanoid';
import {EMOJI} from "../const.js";

const generateCommentDate = () => {
  return new Date();
};

export const createCommentDataTemplate = () => {
  return {
    id: nanoid(),
    author: `Tim Macoveev`,
    text: `Interesting setting and a good cast`,
    emoji: EMOJI[getRandomInteger(0, EMOJI.length - 1)],
    date: generateCommentDate(),
  };
};

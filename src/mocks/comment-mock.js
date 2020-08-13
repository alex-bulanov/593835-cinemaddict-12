import {EMOJI} from "../const.js";
import {getRandomInteger} from "../utils.js";

export const createCommentDataTemplate = () => {
  return {
    author: `Tim Macoveev`,
    text: `Interesting setting and a good cast`,
    emoji: EMOJI[getRandomInteger(0, EMOJI.length - 1)],
    date: `2019/12/31 23:59`
  };
};

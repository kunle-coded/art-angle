import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobal,
  removePadding,
  setPadding,
  setPosition,
} from "../reducers/globalSlice";

export default function useDropdown(labelRef, sortRef, type) {
  const { sortDropdown, mediumDropdown, rarityDropdown, priceDropdown } =
    useSelector(getGlobal);

  const dispatch = useDispatch();

  useEffect(() => {
    if (sortDropdown || mediumDropdown || rarityDropdown || priceDropdown) {
      const labelRect = labelRef.current.getBoundingClientRect();
      const sortRect = sortRef.current.getBoundingClientRect();

      const viewportHeight = window.innerHeight;
      const spaceAbove = labelRect.top;
      const spaceBelow = viewportHeight - labelRect.bottom;

      const posObj = { top: 0, left: 0 };
      if (spaceBelow > sortRect.height || spaceBelow > spaceAbove) {
        posObj.top = labelRect.bottom;

        if (type === "sort") {
          posObj.left = labelRect.right - sortRect.width;
        } else {
          posObj.left = labelRect.left;
        }

        dispatch(removePadding());
      } else {
        posObj.top = labelRect.top - sortRect.height;
        if (type === "sort") {
          posObj.left = labelRect.right - sortRect.width;
        } else {
          posObj.left = labelRect.left;
        }
        dispatch(setPadding());
      }

      dispatch(setPosition(posObj));
    }
  }, [
    dispatch,
    labelRef,
    mediumDropdown,
    priceDropdown,
    rarityDropdown,
    sortDropdown,
    sortRef,
    type,
  ]);
}

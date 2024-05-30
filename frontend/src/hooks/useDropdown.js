import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobal,
  removePadding,
  setPadding,
  setPosition,
} from "../reducers/globalSlice";

export default function useDropdown(labelRef, sortRef) {
  const { showSortDropdown } = useSelector(getGlobal);

  const dispatch = useDispatch();

  useEffect(() => {
    if (showSortDropdown) {
      const labelRect = labelRef.current.getBoundingClientRect();
      const sortRect = sortRef.current.getBoundingClientRect();

      const viewportHeight = window.innerHeight;
      const spaceAbove = labelRect.top;
      const spaceBelow = viewportHeight - labelRect.bottom;

      const posObj = { top: 0, left: 0 };
      if (spaceBelow > sortRect.height || spaceBelow > spaceAbove) {
        posObj.top = labelRect.bottom;
        posObj.left = labelRect.right - sortRect.width;
        dispatch(removePadding());
      } else {
        posObj.top = labelRect.top - sortRect.height;
        posObj.left = labelRect.right - sortRect.width;
        dispatch(setPadding());
      }

      dispatch(setPosition(posObj));
    }
  }, [dispatch, labelRef, showSortDropdown, sortRef]);
}

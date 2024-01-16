import { IApiResponse, api } from "@/models/interface-types";
import { useEffect, useState } from "react";

/**
 *
 * @param API
 * @param setUsers
 */
export const utils = (API: string) => {
  const [users, setUsers] = useState<Array<api>>([]);

  //   Fetching the user
  /**
   *
   * @param API
   */
  const fetchUsers = async (API: string) => {
    try {
      let res = await fetch(API);
      let data = await res.json();

      if (data.length > 0) {
        setUsers(data);
      }

      console.log("Received Data -> ", data);
    } catch (err) {
      console.log("Erro -> " + err);
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);

  // DropDown Option click-select logic
  /**
   *
   * @param id
   * @param setSelected
   */
  const handleClick = (
    id: number,
    setSelected: React.Dispatch<React.SetStateAction<api[]>>
  ) => {
    const res = users.find((obj) => id === obj?.id);
    setSelected((pre) => {
      return [...pre, res];
    });

    const filteredUser = users.filter((obj: api) => id !== obj?.id);
    setUsers(filteredUser);
  };

  // Remove Chip on cross-click logic
  /**
   *
   * @param rmObj
   * @param selected
   * @param setSelected
   */
  const removeChip = (
    rmObj: IApiResponse,
    selected: Array<api>,
    setSelected: React.Dispatch<React.SetStateAction<api[]>>
  ) => {
    const filteredUser = selected.filter((obj: api) => rmObj?.id !== obj?.id);
    setSelected(filteredUser);

    setUsers((pre) => {
      return [rmObj, ...pre];
    });
  };

  // Remove Chip on Backspace Press Logic
  /**
   *
   * @param e
   * @param inputState
   * @param selected
   * @param setSelected
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputState: string,
    selected: Array<api>,
    setSelected: React.Dispatch<React.SetStateAction<api[]>>
  ) => {
    if (e.key === "Backspace" && inputState.length === 0) {
      console.log("back space trigerred");
      const removedItem = selected.pop();
      setSelected(selected.filter((obj: api) => removedItem?.id !== obj?.id));

      setUsers((pre) => {
        return [removedItem, ...pre];
      });
    }
  };

  return { users, handleClick, removeChip, handleKeyDown };
};

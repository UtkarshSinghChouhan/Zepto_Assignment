import { IApiResponse, api } from "@/models/interface-types";
import React from "react";
import Image from "next/image";

export interface IChip {
  obj: api;
  removeChip: Function;
  selected: Array<api>;
  setSelected: React.Dispatch<React.SetStateAction<api[]>>;
}

const Chip = ({ obj, removeChip, selected, setSelected }: IChip) => {
  return (
    <div className="overflow-hidden relative flex gap-2 hover:bg-slate-200 items-center bg-slate-100 border border-slate-400 rounded-full px-4 py-2 shadow-sm">
      <span className="absolute flex items-center justify-center text-white left-0 p-2 w-10 h-10 mr-2 bg-slate-400 rounded-full font-semibold">
        {obj?.name[0]}
      </span>
      <span className="pl-7 whitespace-nowrap inline-block text-sm font-medium cursor-default">
        {obj?.name}
      </span>
      <span
        className="rounded-full p-2 text-xs font-normal hover:font-medium inline-block hover:bg-slate-300 bg-slate-200 cursor-pointer"
        onClick={() => removeChip(obj as IApiResponse, selected, setSelected)}
      >
        <Image
          src={`/cross-svgrepo-com.svg`}
          alt={`cross`}
          width={7}
          height={7}
        />
      </span>
    </div>
  );
};

export default Chip;

"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

const Search = () => {
  const [text, setText] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = {
      SearchQuery: text,
    };

    const url = queryString.stringifyUrl({ url: "/search", query }, { skipNull: true });

    router.push(url);
  };
  return (
    <form className="flex flex-row border-[1px] border-neutral-700 rounded-full overflow-hidden w-2/5" onSubmit={handleSearch}>
      <input type="text" placeholder="Search" className="w-full px-4 py-2 bg-neutral-900" onChange={(e) => setText(e.target.value)} value={text} />
      <button type="submit" className="px-3 bg-neutral-800 border-none ">
        <MdOutlineSearch className="h-6 w-6" />
      </button>
    </form>
  );
};

export default Search;

import { useState } from "react";

export default function useHandleInput(intialState: any) {
  const [input, setInput] = useState(intialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return [input, handleChange];
}

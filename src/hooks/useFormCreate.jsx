import { useState } from "react";

const useFormCreate = (originalState) => {
  const [state, setState] = useState(originalState);

  const handleChange = (event) => {
    setState((currentState) => {
      // console.log(event.target, event.target.type, event.target.files[0])
      return {
        ...currentState,
        [event.target.name]:
          event.target.type === "file"
            ? event.target?.files?.[0]
            : event.target.value,
      };
    });
  };

  const reset = () => {
    setState(originalState);
  };

  return [state, handleChange, reset];
};

export default useFormCreate;

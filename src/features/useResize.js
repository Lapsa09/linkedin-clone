const { useState, useEffect } = require("react");

export const useResize = (myRef, initialWidth) => {
  const [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth);
    };

    if (myRef.current) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return { width };
};

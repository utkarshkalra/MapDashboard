const isMobile = () => {
  // using navigator.userAgent to check if the user is on a mobile device
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return (
    toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    }) || window.innerWidth < 768
  );
};

export { isMobile };

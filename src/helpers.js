function getTime(date) {
  const d = new Date(date);

  function addNulls(n) { return n < 10 ? `0${n}` : n }

  return `
    ${addNulls(d.getHours())}:${addNulls(d.getMinutes())}:${addNulls(d.getSeconds())}
  `;
}

export {
  getTime
}

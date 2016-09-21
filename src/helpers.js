function getTime(date) {

  function addNulls(n) { return n < 10 ? `0${n}` : n }

  return `
    ${addNulls(date.getHours())}:${addNulls(date.getMinutes())}:${addNulls(date.getSeconds())}
  `;
}

export {
  getTime
}

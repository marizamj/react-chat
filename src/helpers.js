function getTime(date) {
  const d = new Date(date);

  function addNulls(n) { return n < 10 ? `0${n}` : n }

  return `
    ${addNulls(d.getHours())}:${addNulls(d.getMinutes())}:${addNulls(d.getSeconds())}
  `;
}

function isNameValid(name) {
  return /^[\w_-]+$/.test(name);
}

function isRepeat(name, activeUsers) {
  return activeUsers.find(user => user.name === name);
}

export {
  getTime,
  isNameValid,
  isRepeat
}

exports.randomAlphanumeric = (count) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < count; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

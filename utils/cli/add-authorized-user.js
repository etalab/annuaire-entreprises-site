const crypto = require('crypto');
const fs = require('fs');

process.argv.slice(2).forEach(function (val, index, array) {
  const emails = val.split(',');
  const hashToAdd = [];
  const ignoredEmails = [];

  const list = fs
    .readFileSync('public/authorized-agents.txt', 'utf8')
    .split('\n')
    .filter((e) => !!e);

  emails.forEach((email) => {
    const emailPattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailPattern.test(email)) {
      console.error(`❌ ${email} is not a valid email`);
      ignoredEmails.push(email);
      return;
    }

    const hash = crypto
      .createHash('sha256')
      .update((email || '').toLowerCase())
      .digest('hex');

    const alreadyAuthorized = list.indexOf(hash) > -1;

    if (alreadyAuthorized) {
      console.error(`❌ ${email} is already an authorized user`);
      ignoredEmails.push(email);
    } else {
      hashToAdd.push(hash);
    }
  });
  fs.writeFileSync(
    'public/authorized-agents.txt',
    [...list, ...hashToAdd].join('\n')
  );
  console.info(`🙈 Ignored : ${ignoredEmails.length} emails`);
  console.info(`🐣 Added : ${hashToAdd.length} emails`);
  console.info(
    `🌟 Total authorized agents : ${list.length + hashToAdd.length}`
  );
});
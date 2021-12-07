const post: string = `
---
title: "Hello GitHub Pages World"
categories:
  - Blog
  - coding practice
tags:
  - code highlighting
  - hello world
---

When you are doing the first steps of working on a coding related side project, what else would you dare to say other than: \`Hello World\`?

\`\`\`javascript
// Just testing the code highlighting features in markdown
let greeting = 'Hello World';
let imOnIt = true;
const tired = () => {
  let semiRandom = Math.floor(Math.random() * 10);
  semiRandom < 5 ? imOnIt = true : imOnIt = false;
}

while (imOnIt) {
  console.log(greeting);
  tired();
}
\`\`\`
`
export { post };

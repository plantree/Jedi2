function constructFeedItem(post, hostname) {
  const url = `${hostname}/blog${post.to}`;
  return {
    title: post.title,
    id: url,
    link: url,
    description: post.description,
    content: post.bodyPlainText
  }
}

async function create(feed, args) {
  const [filePath, ext] = args;
  const hostname = process.NODE_ENV === 'production' ? 'https://plantree.me' : 'http://localhost:3000';
  feed.options = {
    title: "Plantree",
    description: "Plantree's blog",
    link: `${hostname}/feed.${ext}`
  }
  const { $content } = require('@nuxt/content')
  const contents = await $content({ deep: true }).only(["title", "description", "bodyPlainText", "to", "extension"]).fetch();
  const posts = contents.filter((file) => (file.extension === ".md" && file.title !== 'About'));
  for (const post of posts) {
    const feedItem = constructFeedItem(post, hostname);
    feed.addItem(feedItem);
  }
  return feed;
}

export default create


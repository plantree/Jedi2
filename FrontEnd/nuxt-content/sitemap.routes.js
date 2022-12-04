import fs from 'fs'

export default async () => {
  const { $content } = require("@nuxt/content");
  const contents = await $content({ deep: true }).only(["path", "extension", "to"]).fetch();
  const files = contents.filter((file) => (file.extension === ".md"));
  // generate urls
  let urls = files.map((file) => {
    if (file.path.startsWith("/zh-CN")) {
      if (file.path.includes("about")) {
        return file.to
      } else {
        return "/blog" + file.to 
      }
    } else {
      if (file.path.includes("about")) {
        return file.path
      } else {
        return '/blog' + file.path
      }
    }
  });
  urls.push("/")

  // write urls.txt
  for (let url of urls) {
    fs.appendFileSync("dist/urls.txt", "https://www.plantree.me" + url + "\n")
  }

  return urls
};
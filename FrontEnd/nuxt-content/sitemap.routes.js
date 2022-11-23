export default async () => {
  const { $content } = require("@nuxt/content");
  const contents = await $content({ deep: true }).only(["path"]).fetch();
  const files = contents.filter((file) => (file.extension === ".md"));

  return files.map((file) => (file.path === "/index" ? "/" : "/blog" + file.path));
};
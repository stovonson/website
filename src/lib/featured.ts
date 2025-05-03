import type { ArticleFrontmatter, ProjectFrontmatter, ModFrontmatter } from "./types";
import { getShortDescription, processContentInDir } from "./utils";

export const featuredProjects = (
  await processContentInDir<ProjectFrontmatter, ProjectFrontmatter>(
    "projects",
    (data) => {
      const shortDescription = getShortDescription(
        data.frontmatter.description,
      );
      return {
        title: data.frontmatter.title,
        description: shortDescription,
        tags: data.frontmatter.tags,
        githubUrl: data.frontmatter.githubUrl,
        liveUrl: data.frontmatter.liveUrl,
        featured: data.frontmatter.featured,
        timestamp: data.frontmatter.timestamp,
        filename: `/projects/${data.frontmatter.filename}`,
      };
    },
  )
)
  .filter((project) => project.featured)
  .sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });

export const featuredArticles = (
    await processContentInDir<ArticleFrontmatter, ArticleFrontmatter>(
      "blog",
      (data) => {
        const shortDescription = getShortDescription(
          data.frontmatter.description,
        );
        return {
          title: data.frontmatter.title,
          description: shortDescription,
          tags: data.frontmatter.tags,
          time: data.frontmatter.time,
          featured: data.frontmatter.featured,
          timestamp: data.frontmatter.timestamp,
          filename: `/blog/${data.frontmatter.filename}`,
        };
      },
    ))
  .filter((article) => article.featured)
    .sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });

export const featuredMods = (
    await processContentInDir<ModFrontmatter, ModFrontmatter>(
      "mods",
      (data) => {
        const shortDescription = getShortDescription(
          data.frontmatter.description,
        );
        return {
          title: data.frontmatter.title,
          description: shortDescription,
          modrinthUrl: data.frontmatter.modrinthUrl,
          tags: data.frontmatter.tags,
          featured: data.frontmatter.featured,
          filename: `/mods/${data.frontmatter.filename}`,
        };
      },
    )
  ).filter((mod) => mod.featured)


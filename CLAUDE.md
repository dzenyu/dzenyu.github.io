# Repository instructions

## Git commit messages and PR titles

All git commit messages and pull request titles in this repository **must**
follow the [Conventional Commits](https://www.conventionalcommits.org/)
format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Common `type` values: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`,
`test`, `build`, `ci`, `chore`, `revert`.

Examples:
- `feat(blog): add featured graphics for remaining posts`
- `fix(search): show fallback note when pagefind index is unavailable in dev`
- `chore: restore start-site.sh for the Astro toolchain`

This applies to every commit and PR made in this repo, including ones
authored by Claude Code.

## Blog post voice and tone

When writing, reviewing, editing, or improving any post in
`src/content/blog/**/*.mdx`, follow the voice, structure, and content rules
in
[`.github/instructions/blog-writing.instructions.md`](.github/instructions/blog-writing.instructions.md).
That file is the source of truth for tone (no informal contractions),
structure (TL;DR, numbered takeaways, decision documentation, before/after
tables, Mermaid diagrams), and content requirements (quantitative context,
tradeoffs, failure transparency, anti-patterns). Read it before drafting or
editing a blog post.

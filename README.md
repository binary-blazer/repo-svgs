![repo-svgs](https://raw.githubusercontent.com/binary-blazer/repo-svgs/main/out/repo-svgs/image.svg)











# repo-svgs

> Software which allows to create unique head SVGs for your GitHub repositories. An example image is at the top of this README.

## 📦 Installation

1. Clone the repository or use it as template.
2. Setup the [repository secrets](../../settings/secrets/actions) with the following variables [.env](#env).
3. Run the workflow manually or wait for the next push.
4. Depending on your settings, the software will already update your repositories. If you did not configure that, you can set the SVGs manually with the following markdown example [Markdown](#markdown).

## 🚀 Usage

### Environment Variables

```env
# Your GitHub username
GIT_USERNAME="binary-blazer"

# Your repository name
GIT_REPO_NAME="repo-svgs"

# Ignore repositories by their name
# Separate each repository name by a comma
# Example: GITHUB_IGNORE_REPOS="repo1,repo2,repo3"
GIT_IGNORE_REPOS="binary-blazer"

# Your GitHub access token
GIT_ACCESS_TOKEN=""

# 1 for public, 2 for private, 3 for all
GIT_REPO_TYPE="1"

# Accept emojis from the repository description (must be at the beginning of the description)
# If not set, it will fallback to the "📦" emoji on the card
# Example Description including emojis: "🚀 A simple bot that does stuff" // right way
# Example Description including emojis: "A simple bot that does stuff 🚀" // wrong way
GIT_ACCEPT_EMOJIS="true"

# Let the code automatically update the repository README head with the image
# WARNING: This will overwrite the first 10 lines of your README.md file; use with caution
# REQUIRED: GIT_USERNAME, GIT_ACCESS_TOKEN
# INFO: Program will skip repositories that do not have a README.md file
GIT_UPDATE_README_HEAD="true"
```

### Markdown

```markdown
[
```

> Replace [YOUR_USERNAME](#env), [YOUR_REPO_NAME](#env), and [YOUR_GENERATED_REPO_FOLDER_NAME](#env) with your own values.

## 📝 License

[Apache-2.0](https://github.com/binary-blazer/repo-svgs/blob/main/LICENSE)

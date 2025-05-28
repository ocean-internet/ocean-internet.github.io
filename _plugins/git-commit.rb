# _plugins/git_commit.rb
module Jekyll
  class GitCommitGenerator < Generator
    safe true
    priority :high

    def generate(site)
      site.config['env'] ||= {}

      # Get the commit hash from git command
      git_hash = `git rev-parse HEAD`.strip rescue "local"

      # Set to site.env.COMMIT_REF
      site.config['env']['COMMIT_REF'] = git_hash
    end
  end
end
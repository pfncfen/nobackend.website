class GitHubService {
  constructor($http, configService) {
    'ngInject';

    this.$http = $http;
    this.configService = configService;
    this.github = configService.config.github;
    console.info('config from _config.yml:', this.github);
  }

  getPost(category, post) {
    return this._read(`${this.github.posts}/${category}/${post}.md`)
  }

  getIndex() {
    return this.$http.get(this.configService.api('index'), {cache: true})
  }

  _read(filename) {
    return this.$http.get(this._rawUrl(filename), {cache: true})
  }

  _rawUrl(path) {
    return `https://raw.githubusercontent.com/${this.github.user}/${this.github.repo}/${this.github.branch}/${path}`;
  }

  _url(path) {
    const token = '';
    const url = `https://api.github.com/repos/${this.github.user}/${this.github.repo}/contents/${path}?ref=${this.github.branch}`;
    return token === '' ? url : `${url}&access_token=${token}`;
  }
}

export default GitHubService;
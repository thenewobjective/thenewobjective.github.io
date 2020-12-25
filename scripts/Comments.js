import Component from "./Component.js";
import Comment from './Comment.js';

/**
 * @typedef {Object} GitUser
 * @property {string} login
 * @property {number} id
 * @property {string} node_id
 * @property {string} avatar_url
 * @property {string} gravatar_id
 * @property {string} url
 * @property {string} html_url
 * @property {string} followers_url
 * @property {string} following_url
 * @property {string} gists_url
 * @property {string} starred_url
 * @property {string} subscriptions_url
 * @property {string} organizations_url
 * @property {string} repos_url
 * @property {string} events_url
 * @property {string} received_events_url
 * @property {string} type
 * @property {boolean} site_admin
 */

 /**
  * @typedef {Object} GitComment
  * @property {string} url
  * @property {string} html_url
  * @property {string} issue_url
  * @property {number} id
  * @property {string} node_id
  * @property {GitUser} user
  * @property {string} created_at
  * @property {string} updated_at
  * @property {string} author_association
  * @property {string} body
  */

class Comments extends Component {
    /**
     * @type {GitComment[]}
     */
    comments = []

    constructor(options) {
        super(options)

        if(this.el) {
            this.elContent = this.el.querySelector('.comments-content')
            this.loadComments()
        }
    }

    /**
     * Loads comments from github
     */
    loadComments() {
        this.comments = []
        let id = Number(this.el.dataset.commentThreadId)
    
        if(Number.isNaN(id) || id <= 0)
            return;

        fetch(`https://api.github.com/repos/thenewobjective/thenewobjective.github.io/issues/${id}/comments`, {
            method: 'GET',
            headers: {
                // <https://developer.github.com/v3/media/#html>
                'Accept': 'application/vnd.github.v3.html+json'
            }
        }).then(response => {
            return response.json()
        }).catch(reason => {
            this.showError(reason)
        }).then(json => {
            if(json.message === "Not Found") {
                this.showError(`No comments available for this post`)
            } else {
                /**
                 * @type {GitComment[]}
                 */
                let comments = json
                this.comments = comments.map(item => {
                    let comment = new Comment({
                        authorName: item.user.login,
                        authorUrl: item.user.html_url,
                        authorImageUrl: item.user.avatar_url,
                        created: new Date(item.created_at),
                        content: item.body_html,
                        replyUrl: item.html_url
                    })

                    return comment
                })

                this.renderComments(json)  
            }
        })
    }

    /**
     * Renders comments to page
     */
    renderComments() {
        this.comments.forEach(comment => {
            this.elContent.appendChild(comment.el)
        })
    }

    /**
     * Show the error message
     * @param {string} reason
     */
    showError(reason) {
        this.el.innerHTML = `<span style="color:red;">${reason}</span>`
    }
}

export default Comments
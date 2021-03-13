import Component from './Component.js'

/**
 * @typedef {Object & import('./Component.js').ComponentOptions} CommentOptions
 * @property {string} authorName
 * @property {string} authorImageUrl
 * @property {string} authorUrl
 * @property {Date} created
 * @property {string} content
 * @property {string} replyUrl
 */

const commentTemplate = document.createElement('template')
commentTemplate.innerHTML = `<article class='comment'>
    <header class="comment-header">
        <img class="comment-author-image" alt="Author image">
        <div>
            <address class="comment-author"><a rel="author nofollow noopener external" href="#" target="_blank"></a></address>
            <time class="comment-date" pubdate datetime=""><a class="comment-permalink"></a></time>
        </div>
    </header>
    <section class="comment-body"></section>
    <footer>
        <a class="comment-reply" href="" rel="noopener external" target="_blank">Reply</a>
    </footer>
</article>`

class Comment extends Component {
    /**
     * 
     * @param {CommentOptions} options
     */
    constructor(options) {
        super(options)

        this.el = commentTemplate.content.cloneNode(true).querySelector('.comment')
        this.elAuthorImage = this.el.querySelector('.comment-author-image')
        this.elAuthorName = this.el.querySelector('.comment-author a')
        this.elCreated = this.el.querySelector('.comment-date')
        this.elPermalink = this.elCreated.querySelector('.comment-permalink')
        this.elBody = this.el.querySelector('.comment-body')
        this.elReply = this.el.querySelector('.comment-reply')

        Object.assign(this, {
            authorName: options.authorName || 'Anonymous',
            authorImageUrl: options.authorImageUrl,
            authorUrl: options.authorUrl,
            created: options.created,
            content: options.content,
            replyUrl: options.replyUrl
        })
    }

    get authorImageUrl() {
        return this.elAuthorImage.src
    }

    set authorImageUrl(value) {
        this.elAuthorImage.src = value
    }

    get authorName() {
        return this.elAuthorName.textContent
    }
    set authorName(value) {
        this.elAuthorName.textContent = value
    }

    get authorUrl() {
        return this.elAuthorName.href
    }
    set authorUrl(value) {
        if(value)
            this.elAuthorName.href = value
        else
            this.elAuthorName.removeAttribute('href')
    }

    get created() {
        return new Date(this.el.id)
    }

    set created(value) {
        this.el.id = value.toISOString()
        this.elPermalink.textContent = value.toDateString()
        this.elPermalink.href = `#${value.toISOString()}`
        this.elCreated.datetime = value.toISOString()
    }

    get content() {
        return this.elBody.innerHTML
    }

    set content(value) {
        let template = document.createElement('template')
        template.innerHTML = value
        let as = template.content.querySelectorAll('a')
        as.forEach(a => a.rel = "nofollow noopener")

        this.elBody.appendChild(template.content.cloneNode(true))
    }

    get replyUrl(){
        return this.elReply;
    }

    set replyUrl(value) {
        this.elReply.href = value;
    }
}

export default Comment
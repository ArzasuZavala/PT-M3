let posts = [];

let IdCounter = 0;

const STATUS_USER_ERROR = 422;

function Post(author, title, contents) {
    this.id = 0;
    this.author = author;
    this.title = title;
    this.contents = contents;
    this.autoID();
};
Post.prototype.autoID = () => {
    IdCounter++;
    this.id = IdCounter;
};
const createPost = (req, res) => {
    const { author, title, contents } = req.body;
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: 'No se recibieron los parámetros necesarios para crear el Post' })
    }
    let newPost = new Post(author, title, contents);
    posts.push(newPost);
    res.status(200).json(newPost);
};
const createPostAuthor = (req, res) => {
    // const { body } = req;
    // const { author } = req.params;
    let { author } = req.params;
    let { title, contents } = req.body;
    // if (!body.hasOwnProperty("title") || !body.hasOwnProperty("contents")) 
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
    }
    const newPost = new Post(author, title, contents);
    posts.push(newPost);
    res.status(200).json(newPost);
};
const readPost = (req, res) => {
    // const { query } = req;
    let { term } = req.query;
    // if (query.hasOwnProperty("term"))
    if (term) {
        return res.status(200)
            .json(posts.filter(p => p.title.includes(term) ||
                p.contents.includes(term)
            ));
    }
    res.status(200).json(posts);
};
const readPostAuthor = (req, res) => {
    const { author } = req.params;

    let result = posts.filter(p => p.author === author);
    if (result.length < 1) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: 'No existe ningun post del autor indicado' });
    }
    res.status(200).json(result);
};
const readPostAuthorTitle = (req, res) => {

    // let result = posts.filter(p => p.author === author && p.title === title);
    // if (result.length > 1) {
    //     return res.status(STATUS_USER_ERROR)
    //         .json({ error: 'No existe ningun post con dicho titulo y autor indicado' });
    // }
    // res.status(200).json(result);
    let { author, title } = req.params;
    if (author && title) {
        const newPost = posts.filter(p => p.author === author && p.title === title);
        if (newPost.length > 0) {
            res.json(newPost);
        } else {
            res
                .status(STATUS_USER_ERROR)
                .json({ error: "No existe ningun post con dicho titulo y autor indicado" });
        };
    } else {
        res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe ningun post con dicho titulo y autor indicado" });
    }
};
const updatePost = (req, res) => {
    const { body } = req;
    if (!body.hasOwnProperty("title") || !body.hasOwnProperty("contents") || !body.hasOwnProperty("id")) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: 'No se recibieron los parámetros necesarios para modificar el Post' });
    }
    let postFound = posts.find(p => p.id === parseInt(body.id));
    if (!postFound) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para modificar el Post" });
    }
    postFound.title = body.title;
    postFound.contents = body.contents;
    res.status(200).json(postFound);

};
const deletePost = (req, res) => {
    const { body } = req;
    if (!body.hasOwnProperty("id")) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: 'No se recibio parametro ID' });
    }
    let postFound = posts.find(p => p.id === parseInt(body.id));

    if (!postFound) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: 'No se recibio un ID valido' });
    };
    posts = posts.filter(p => p.id !== body.id);
    res.status(200).json({ success: true });
};
const deletePostsAuthor = (req, res) => {
    const { body } = req;
    if (!body.hasOwnProperty("author")) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: 'No existe el autor indicado' });
    }
    let postFound = posts.fin(p => p.author === body.author);
    if (!postFound) {
        return res.status(STATUS_USER_ERROR)
            .json({ error: 'No existe el autor indicado' });
    }
    let postsDeleted = posts.filter(p => p.author === body.author);
    posts = posts.filter(p => p.author !== body.author);
    res.status(200).json(postsDeleted);
};

module.exports = {
    posts,
    createPost,
    createPostAuthor,
    readPost,
    readPostAuthor,
    readPostAuthorTitle,
    deletePost,
    deletePostsAuthor,
    updatePost,
}
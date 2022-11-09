const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((previousValue, currentValue) => { return previousValue + currentValue.likes }, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((previousValue, currentValue) => {
    if (currentValue.likes > previousValue.likes) {
      return {
        title: currentValue.title,
        author: currentValue.author,
        likes: currentValue.likes
      }
    }
    return {
      title: previousValue.title,
      author: previousValue.author,
      likes: previousValue.likes
    }
  })
}

const mostBlogs = blogs => {
  let authorBlogs = {}
  let mostBlogs = {author: "", blogs: 0}
  blogs.forEach(blog => {
    if (Object.keys(authorBlogs).includes(blog.author)) authorBlogs[blog.author] += 1;
    else authorBlogs[blog.author] = 1;
  })
  Object.keys(authorBlogs).forEach(author => {
    if (authorBlogs[author] > mostBlogs.blogs) mostBlogs = {author, blogs: authorBlogs[author]}
  })
  return mostBlogs
}

const mostLikes = blogs => {
  let authorLikes = {}
  let mostLikes = {author: "", likes: 0}
  blogs.forEach(blog => {
    if (Object.keys(authorLikes).includes(blog.author)) authorLikes[blog.author] += blog.likes;
    else authorLikes[blog.author] = blog.likes;
  })
  Object.keys(authorLikes).forEach(author => {
    if (authorLikes[author] > mostLikes.likes) mostLikes = {author, likes: authorLikes[author]}
  })
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
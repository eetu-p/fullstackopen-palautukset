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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
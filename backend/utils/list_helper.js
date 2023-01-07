const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, element) => {
    return sum + element.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((biggest, element) => {
    if (biggest === null || element.likes > biggest.likes) {
      return element
    } else {
      return biggest
    }
  }, null)
}

const mostBlogs = (blogs) => {
  const authorList = []
  blogs.forEach(blog => {
    const author = authorList.find(authorObject => authorObject.author == blog.author)
    if (author === undefined) {
      const newAuthor = {
        author: blog.author,
        blogs: 1
      }
      authorList.push(newAuthor)
    } else {
      author.blogs += 1
    }
  })

  return authorList.reduce((biggest, element) => {
    if (biggest === null || element.blogs > biggest.blogs) {
      return element
    } else {
      return biggest
    }
  }, null)
}

const mostLikes = (blogs) => {
  const authorList = []
  blogs.forEach(blog => {
    const author = authorList.find(authorObject => authorObject.author === blog.author)
    if (author === undefined) {
      const newAuthor = {
        author: blog.author,
        likes: blog.likes
      }
      authorList.push(newAuthor)
    } else {
      author.likes += blog.likes
    }
  })

  return authorList.reduce((biggest, element) => {
    if (biggest === null || element.likes > biggest.likes) {
      return element
    } else {
      return biggest
    }
  }, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
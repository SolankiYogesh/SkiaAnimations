interface CommentType {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

interface VideoType {
  id: number
  url: string
}

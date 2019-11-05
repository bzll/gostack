import React, { Component } from 'react';

import PostItem from './PostItem';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: 'Carla Pacheco',
          avatar: 'https://i.pravatar.cc/150?img=30'
        },
        date: '30 Out 2019',
        content: 'Ser Jedi e impossivel?',
        comments: [
          {
            id: 2,
            author: {
              name: 'Ciro Bizelli',
              avatar: 'https://avatars1.githubusercontent.com/u/40134293?s=460&v=4'
            },
            date: '30 Out 2019',
            content:
              'A forca esta com voce padawan, acredite sempre na forca'
          },
          {
            id: 3,
            author: {
              name: 'Ciro Bizelli',
              avatar: 'https://avatars1.githubusercontent.com/u/40134293?s=460&v=4'
            },
            date: '30 Out 2019',
            content:
              'Always...'
          }
        ]
      },
      
    ]
  };
  
  render() {
    const { posts } = this.state;

    return (
      <div className="postlist">
        {posts.map(post => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    );
  }
}

export default PostList;
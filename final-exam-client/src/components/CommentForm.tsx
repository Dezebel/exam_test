import { useState } from 'react'

import { post } from '../http'
import type { Comment } from '../types/Comment'

type CommentFormProps = {
  postId: string
  onSaveSucceeded: (id: string, commentContent: string) => void
}

export default function CommentForm({
    postId,
  onSaveSucceeded,
}: CommentFormProps) {
  const [commentContent, setCommentContent] = useState('')
  const [error, setError] = useState<string | null>(null)  // To handle error

  const handleSaveComment = async () => {
    try {
      setError(null);  // Reset error state before making the request
  
      // Log the payload being sent
      console.log({
        postId,
        content: commentContent,
      });
  
      // Make an API request to save the comment
      const response = await post<{ postId: string; content: string }, Comment>(
        '/api/comments',
        {
          postId,
          content: commentContent,
        }
      );
  
      // After successful save, call onSaveSucceeded with comment ID and content
      onSaveSucceeded(response._id, commentContent);
  
      // Clear the input after saving
      setCommentContent('');
    } catch (err) {
      // Log the error for more details
      alert(postId);
      alert(commentContent);
      console.error('Error saving comment:', err);
  
      // Handle any errors that occur during the request
      setError('Failed to save the comment. Please try again.');
    }
  };
  

  
  return (
    <form
      onSubmit={(e) => {
        
        e.preventDefault()
        
        handleSaveComment()
      }}
    >
      <textarea
        cols={40}
        rows={8}
        placeholder="Your comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button type="submit" disabled={!commentContent}>
        Save
      </button>

      {/* Display error message if there is one */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

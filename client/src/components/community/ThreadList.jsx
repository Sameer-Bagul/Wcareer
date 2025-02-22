import Thread from './Thread';

export default function ThreadList({ threads, onAddComment }) {
  return (
    <div className="space-y-4">
      {threads.map(thread => (
        <Thread
          key={thread.id}
          thread={thread}
          onAddComment={(content) => onAddComment(thread.id, content)}
        />
      ))}
    </div>
  );
}
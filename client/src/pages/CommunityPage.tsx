import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Post {
  id: string
  author: string
  avatar: string
  timeAgo: string
  content: string
  commentsCount: number
}

export const CommunityPage: React.FC = () => {
  const { t } = useTranslation()

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Ananya S.',
      avatar: 'AS',
      timeAgo: '2 hours ago',
      content:
        'Finally managed to get out of bed, wash my face, and sit on the balcony for ten minutes. To anyone having a heavy morning: please do not rush yourself. Just being here counts.',
      commentsCount: 3,
    },
    {
      id: '2',
      author: 'Rahul K.',
      avatar: 'RK',
      timeAgo: '5 hours ago',
      content:
        'Today was my first day trying the box breathing exercise during an anxious work meeting. It really grounded me. Grateful for this quiet space.',
      commentsCount: 1,
    },
    {
      id: '3',
      author: 'Deepa V.',
      avatar: 'DV',
      timeAgo: 'Yesterday',
      content:
        'Friendly reminder: you don’t need to prove your productivity to anyone today. Your worth is not measured by a checklist.',
      commentsCount: 6,
    },
  ])

  const [newPostContent, setNewPostContent] = useState('')
  const [reportSuccess, setReportSuccess] = useState<string | null>(null)

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim()) return

    const newP: Post = {
      id: Date.now().toString(),
      author: 'You (Maya)',
      avatar: 'ML',
      timeAgo: 'Just now',
      content: newPostContent.trim(),
      commentsCount: 0,
    }

    setPosts([newP, ...posts])
    setNewPostContent('')
  }

  const handleReport = (postId: string) => {
    setReportSuccess(postId)
    setTimeout(() => setReportSuccess(null), 3000)
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-3xl animate-fade-in">
      {/* Header */}
      <section className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-teal"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-display">
            {t('sanctuarySpace')}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary">
          {t('communityTitle')}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">
          {t('communitySub')}
        </p>
      </section>

      {/* Trust & Non-Competitive Philosophy Badge */}
      <div className="p-4 rounded-2xl bg-secondary-container/40 border border-primary-teal/10 flex items-center gap-3 text-xs text-text-secondary">
        <span className="material-symbols-outlined text-primary-teal text-lg shrink-0">
          volunteer_activism
        </span>
        <span>
          Serenly has no follower counts, likes, or viral algorithms. We gather solely to support and listen without judgment.
        </span>
      </div>

      {/* Create Post Box */}
      <div className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-3">
        <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
          <textarea
            rows={3}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder={t('communitySharePrompt')}
            className="w-full bg-surface-oat rounded-2xl p-4 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:bg-surface-card border border-transparent focus:border-primary-teal/20 resize-none transition-colors"
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-text-muted">
              Moderated space. Be respectful and kind.
            </span>
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="px-5 py-2.5 rounded-full bg-primary-teal hover:bg-primary-forest text-white font-semibold text-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {t('btnPost')}
            </button>
          </div>
        </form>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-surface-card rounded-3xl p-6 shadow-sm border border-primary-forest/5 flex flex-col gap-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-container-sage text-primary-forest font-bold text-xs flex items-center justify-center">
                  {post.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs sm:text-sm text-text-primary">
                    {post.author}
                  </span>
                  <span className="text-[11px] text-text-muted">{post.timeAgo}</span>
                </div>
              </div>

              {/* Report button */}
              <button
                type="button"
                onClick={() => handleReport(post.id)}
                className="text-xs text-text-muted hover:text-emergency transition-colors cursor-pointer"
              >
                {reportSuccess === post.id ? 'Reported ✓' : t('reportPost')}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-text-primary leading-relaxed">
              {post.content}
            </p>

            <div className="flex items-center gap-4 pt-2 border-t border-surface-container-high text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">chat_bubble_outline</span>
                <span>{post.commentsCount} gentle responses</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

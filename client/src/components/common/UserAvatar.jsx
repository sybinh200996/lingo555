import React, { useState } from 'react';

/**
 * UserAvatar Component
 * Intelligently renders either an Image (Google/Facebook avatar URL)
 * or an Emoji (🐼, 🦉...) without ever leaking raw URL text strings into UI.
 */
export const UserAvatar = ({ 
  avatar, 
  name = 'User', 
  className = 'w-8 h-8 rounded-full', 
  textClassName = 'text-base' 
}) => {
  const [imgError, setImgError] = useState(false);

  const isUrl = typeof avatar === 'string' && (
    avatar.startsWith('http://') || 
    avatar.startsWith('https://') || 
    avatar.startsWith('data:image')
  );

  if (isUrl && !imgError) {
    return (
      <img
        src={avatar}
        alt={name}
        onError={() => setImgError(true)}
        className={`${className} object-cover shrink-0 select-none pointer-events-none`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Fallback to emoji or default '🐼'
  const displayEmoji = (typeof avatar === 'string' && avatar.length <= 4 && !avatar.includes('/')) 
    ? avatar 
    : '🐼';

  return (
    <span className={`inline-flex items-center justify-center leading-none shrink-0 select-none ${textClassName}`}>
      {displayEmoji}
    </span>
  );
};
